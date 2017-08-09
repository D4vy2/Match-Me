var express = require('express');
var router = express.Router();
var session = require('express-session');
var User = require('../models/user');
var Image = require('../models/image');
var Like = require('../models/like');
var Tag = require('../models/tag');
var Block = require('../models/block');
var Notification = require('../models/notification');
var fs = require('fs');
var fileUpload = require('express-fileupload');
var async = require('async');
var geolib = require('geolib');
var userhelper = require('../helpers/userhelpers');

exports.calculDistance = function(currentUserPosition, arr) {
    let currentCoords = currentUserPosition.split(',');
    for (var i = 0; i < arr.length; i++) {
        let coords = arr[i].position.split(',');
        arr[i].distance = Math.round(geolib.getDistance({latitude: currentCoords[0], longitude: currentCoords[1]},{latitude: coords[0], longitude: coords[1]}) / 1000);
    }
}

exports.removeCurrentUser = function(userName, arr) {
    for(var i = 0; i < arr.length; i++) {
        if (arr[i].login == userName) {
            arr.splice(i, 1);
        }
    }
}

exports.countCommonsTags = function(arr1, arr2) {
	var nbTags = 0;
	if (arr1.length > arr2.length) {
		var tmp;
		tmp = arr1;
		arr1 = arr2;
		arr2 = tmp;
	}
	for (var i = 0; i < arr2.length; i++) {
		for (var j = 0; j < arr1.length; j++) {
			if (arr2[i] == arr1[j]) {
				nbTags++;
			}
		}
		j = 0;
	}
    return (nbTags);
}

exports.getTagsFromUser = function(req, res, all, search) {
    async.eachSeries(all, function(elem, callback) {
        Tag.getUserTags(elem, function(rows, user) {
            var tags = rows.map(function(elem) {
                return (elem['name']);
            });
            elem.tags = tags;
            elem.commons = userhelper.countCommonsTags(req.session.currentUser.tags.split(','), tags);
            Like.countLikesNumber(elem, elem.userId, function(number) {
                elem.popularity = number * 3;
                callback(false);
            });
        })
    }, function(err) {
        if (err) {
            console.log('AN ERROR HAS OCCURED');
        }
        userhelper.calculDistance(req.session.currentUser.position, all);
        req.session.userList = all;
        Notification.get(req.session.userId, function(rows) {
            if (search === false)
                res.render('pages/match', {users: all, currentUser: req.session.currentUser.login, notification: rows});
            else
                res.render('pages/search', {search: true, currentUser: req.session.currentUser.login, notification: rows});
        })
    })
}

exports.sortBy = function(req, res, arr) {
    if (req.body.sort === 'age') {
        arr.sort(function (a, b) {
            return (a.age - b.age);
        })
    } else if (req.body.sort == 'location') {
        arr.sort(function (a, b) {
            return (a.distance - b.distance);
        })
    } else if (req.body.sort == 'popularity') {
        arr.sort(function (a, b) {
            return (b.popularity - a.popularity);
        })
    } else if (req.body.sort == 'commonstags') {
        arr.sort(function (a, b) {
            return (b.commons - a.commons);
        })
    } else {
        Notification.get(req.session.userId, function(rows) {
            res.render('pages/search', {users: arr, currentUser: req.session.currentUser.login, notification: rows});
            return;
        })
    }
}

exports.filterBy = function(filterName, filterValue, arr) {
    var newArr = [];
    if (filterName === 'tags') filterName = 'commons';
    var range = filterValue.split('-');
    var min = range[0];
    var max = range[1];
    for (var i = 0; i < arr.length; i++) {
        let elem = arr[i];
        if (elem[filterName] >= min && elem[filterName] <= max)
            newArr.push(elem);
    }
    return (newArr);
};

exports.checkEmptyField = function(obj) {
    for (var i in obj) {
        if (obj[i] == "" || obj[i] == "NULL" || obj[i] == undefined)
            return (false);
    }
    return (true);
}
