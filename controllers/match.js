'use strict'

var express = require('express');
var router = express.Router();
var session = require('express-session');
var User = require('../models/user');
var Image = require('../models/image');
var Tag = require('../models/tag');
var Notification = require('../models/notification');
var fs = require('fs');
var fileUpload = require('express-fileupload');
var async = require('async');
var geolib = require('geolib');
var userhelper = require('../helpers/userhelpers');

router.get('/', function(req, res) {
    if (req.session.userId && req.session.userId != undefined) {
            if (req.session.profilCompleted == 0) {
                    res.render('pages/error', {error: "Please complete your profiles at first to use this feature ;)"});
                    return ;
            } else {
                if (req.session.mainPic == 0) {
                    res.render('pages/error', {error: "Set profile main picture first to see others profiles ;)"});
                    return ;
                } else {
                    req.session.userListTemp = undefined;
                    User.getAllBySexPref(req.session.currentUser.gender, req.session.currentUser.sexpref, req.session.userId, function(all) {
                        userhelper.removeCurrentUser(req.session.currentUser.login, all)
                        userhelper.getTagsFromUser(req, res, all, false);
                    });
                }
            }
    } else {
        res.redirect('/');
    }
})

router.get('/sort', function(req, res) {
    res.redirect('/match');
});

router.post('/sort', function(req, res) {
    let arr = req.session.userList;
    userhelper.sortBy(req, res, arr);
    Notification.get(req.session.userId, function(rows) {
        res.render('pages/match', {users: arr, currentUser: req.session.currentUser.login, notification: rows});
    })
})

router.get('/filter', function(req, res) {
    res.redirect('/match');
})

router.post('/filter', function(req, res) {
    let arr = req.session.userList;
    let newArr = [];
    if (req.body.filterAge)
        newArr = userhelper.filterBy('age', req.body.filterAge, arr);
    else if (req.body.filterDistance)
        newArr = userhelper.filterBy('distance', req.body.filterDistance, arr);
    else if (req.body.filterPopularity)
        newArr = userhelper.filterBy('popularity', req.body.filterPopularity, arr);
    else if (req.body.filterTags)
        newArr = userhelper.filterBy('tags', req.body.filterTags, arr);
    Notification.get(req.session.userId, function(rows) {
        res.render('pages/match', {users: newArr, currentUser: req.session.currentUser.login, notification: rows});
    })
})

module.exports = router;