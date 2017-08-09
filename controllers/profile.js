// 'use strict'

var express = require('express');
var router = express.Router();
var session = require('express-session');
var User = require('../models/user');
var Image = require('../models/image');
var Tag = require('../models/tag');
var Like = require('../models/like');
var Block = require('../models/block');
var Message = require('../models/message');
var Notification = require('../models/notification');
var mailer = require('express-mailer');
var fs = require('fs');
var fileUpload = require('express-fileupload');
var async = require('async');
var io = require('socket.io');

router.get('/', function(req, res) {
    res.render('pages/error', {error: "This pages doesn't exist"});
})

router.get('/:login', function(req, res) {
    if (req.session.userId == undefined) {
      res.render('pages/error', {error : "This page doesn't exist"});
      return;
    }
    if (req.session.userId && req.session.userId != undefined) {
            if (req.session.profilCompleted == 0) {
                    res.render('pages/error', {error: "Please complete your profiles at first to use this feature ;)"});
                    return ;
            } else {
                if (req.session.mainPic == 0) {
                    res.render('pages/error', {error: "Set profile main picture first to see others profiles ;)"});
                    return ;
                }
            }
    }
    User.getByLogin(req.params.login, function(user) {
        if (user != undefined) {
            req.session.targetId = user.userId;
            var url = 'http://localhost:8888/profile/' + req.params.login;
            Image.getAllByUserId(user.userId, function(images) {
                Image.getMain(user.userId, function(mainpix) {
                    Tag.getMine(user.userId, function(tags) {
                        Like.checkIfLiked(req.session.userId, user.userId, function(likeRows) {
                            if (likeRows.length > 0)
                                var likeStatus = true;
                            Block.checkIfBlocked(req.session.userId, user.userId, function(blockRows) {
                                if (blockRows.length > 0)
                                    var blockStatus = true;
                                Like.checkBoth(req.session.userId, user.userId, function(likes) {
                                    if (likes.length == 2) 
                                      var connected = true;
                                    Like.checkLikeMe(user.userId, req.session.userId, function(rows) {
                                        if (rows.length == 1) {
                                            var likeMe = true;
                                        }
                                        Like.countLikesNumber(user, user.userId, function(number) {
                                            user.popularity = number * 3;
                                            Notification.get(req.session.userId, function(notifRows) {
                                                Block.checkIfBlocked(user.userId, req.session.userId, function(result) {
                                                    if (result.length == 0)
                                                        Notification.create(req.session.userId, user.userId, 'Visit');
                                                    console.log('IMAGE = ' + JSON.stringify(images));
                                                    res.render('pages/profile', {user: user, images: images, mainpix: mainpix, tags: tags, like: likeStatus, block: blockStatus, connected: connected, likeMe: likeMe, currentUser: req.session.currentUser.login, notification: notifRows, url: url});
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        } else {
            res.render('pages/error', {error : "This page doesn't exist"});
        }
    });
})

router.post('/:login/like', function(req, res) {
    console.log('TARGET = ' + req.session.targetId);
    Like.checkLikeMe(req.session.targetId, req.session.userId, function(rows) {
        Block.checkIfBlocked(req.session.targetId, req.session.userId, function(results) {
            if (results.length == 0) {
                if (rows.length > 0) {
                    Notification.create(req.session.userId, req.session.targetId, 'LikeBack');
                } else {
                    Notification.create(req.session.userId, req.session.targetId, 'Like');
                }
            }
            Like.create(req.session.userId, req.session.targetId);
            res.end();
        })
    })
})

router.post('/:login/unlike', function(req, res) {
    Like.delete(req.session.userId, req.session.targetId);
    Block.checkIfBlocked(req.session.targetId, req.session.userId, function(results) {
        if (results.length == 0)
            Notification.create(req.session.userId, req.session.targetId, 'Unlike');
        res.end();
    })
})

router.post('/:login/block', function(req, res) {
    Block.create(req.session.userId, req.session.targetId);
    res.end();
})

router.post('/:login/unblock', function(req, res) {
    Block.delete(req.session.userId, req.session.targetId);
    res.end();
})

router.post('/:login/report', function(req, res) {
    res.mailer.send('pages/report', {
      to: 'admin@mail.com', // put adress admin  
      subject: 'Reported user',  
      reporter: req.session.currentUser.login,
      reported: req.params.login,
      url: req.protocol + ':\/\/' + req.get('Host') + '/profile/' + req.params.login
    }, function (err) {
        if (err) {
            throw err;
        }
        console.log('Email sent !')
        res.end();
    })
})

var createRoom = function(s1, s2) {
    var arr = [];
    arr.push(s1);
    arr.push(s2);
    arr.sort();
    var roomName = arr.join("");
    return (roomName);
}

router.get('/:login/chat', function(req, res) {
    Like.checkBoth(req.session.userId, req.session.targetId, function(rows) {
        if (rows.length !== 2) {
            res.render('pages/error', {error: "You are not authorized to chat with this profile :)"});
            return;
        } else {
            console.log('CONTINUE');
            let roomName = createRoom(req.session.currentUser.login, req.params.login);
            User.getId(req.params.login, function(row) {
                req.session.chatId = row.userId;
                Message.getConversation(req.session.userId, req.session.chatId, function(rows) {
                    Notification.get(req.session.userId, function(notifRows) {
                        res.render('pages/chat', {conversation: rows, room: roomName, currentUser: req.session.currentUser.login, notification: notifRows, dest: req.params.login});
                    })
                });
            })
        }
    })
})

router.post('/:login/chat', function(req, res) {
    if (req.body.content.trim() == "") {
        console.log('Empty msg');
        res.redirect('/profile/' + req.params.login + '/chat');
        return;
    }
    Message.create(req.session.userId, req.session.chatId, req.body.content);
    Block.checkIfBlocked(req.session.chatId, req.session.userId, function(rows) {
        if (rows.length == 0) {
            Notification.create(req.session.userId, req.session.chatId, 'Message');
        }
        res.redirect('/profile/' + req.params.login + '/chat');
    })
})

module.exports = router;
