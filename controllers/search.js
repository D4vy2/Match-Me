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
var userhelper = require('../helpers/userhelpers')

router.get('/', function(req, res) {
// DECOMMENTER AVANT DE RENDRE LE PROJECT
    if (req.session.userId && req.session.userId != undefined) {
        if (req.session.profilCompleted == 0) {
            res.render('pages/error', {error: "Please complete your profiles at first to use this feature ;)"});
            return ;
        } else if (req.session.mainPic == 0) {
            res.render('pages/error', {error: "You need to set a main picture to see other profiles ;)"});
            return ;
        } else {
            User.getAllBySexPref(req.session.currentUser.gender, req.session.currentUser.sexpref, req.session.userId, function(all) {
                userhelper.removeCurrentUser(req.session.currentUser.login, all)
                userhelper.getTagsFromUser(req, res, all, true);
            });
        }
    } else {
        res.redirect('/');
    }
})

router.post('/', function(req, res) {
    let arr = req.session.userList;
    let newArr = [];
    Notification.get(req.session.userId, function(rows) {
        if (req.body.searchDistance) {
            newArr = userhelper.filterBy('distance', req.body.searchDistance, arr);
            if (newArr.length == 0)
                return res.render('pages/search', {users: newArr, empty: true, currentUser: req.session.currentUser.login, notification: rows})
        }
        else
            newArr = arr;
        if (req.body.searchAge) {
            newArr = userhelper.filterBy('age', req.body.searchAge, newArr);
            if (newArr.length == 0)
                return res.render('pages/search', {users: newArr, empty: true, currentUser: req.session.currentUser.login, notification: rows})
        }
        if (req.body.searchTags) {
            newArr = userhelper.filterBy('tags', req.body.searchTags, newArr);
            if (newArr.length == 0)
                return res.render('pages/search', {users: newArr, empty: true, currentUser: req.session.currentUser.login, notification: rows})
        }
        if (req.body.searchPopularity) {
            newArr = userhelper.filterBy('popularity', req.body.searchPopularity, newArr);
            if (newArr.length == 0)
                return res.render('pages/search', {users: newArr, empty: true, currentUser: req.session.currentUser.login, notification: rows})
        }
        req.session.userListTemp = newArr;
        res.render('pages/search', {users: newArr, temp: true, currentUser: req.session.currentUser.login, notification: rows})
    })
})

router.get('/sort', function(req, res) {
    res.redirect('/search');
});


router.post('/sort', function(req, res) {
    let arr = req.session.userListTemp;
    if (arr == undefined) {
        res.redirect('/search');
    }
    else {
        userhelper.sortBy(req, res, arr);
        Notification.get(req.session.userId, function(rows) {
            res.render('pages/search', {users: arr, currentUser: req.session.currentUser.login, notification: rows});
        })
    }
})

router.get('/filter', function(req, res) {
    res.redirect('/search');
})

router.post('/filter', function(req, res) {
    let arr = req.session.userListTemp;
    if (arr == undefined) {
        res.redirect('/search');
        return;
    }
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
        res.render('pages/search', {users: newArr, currentUser: req.session.currentUser.login, notification: rows});
    })
})

module.exports = router;