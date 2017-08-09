'use strict'
var connection = require('../config/connection');

exports.create = function(userId, targetId) {
    connection.query('INSERT INTO likes SET userId = ?, targetId = ?', [userId, targetId], function(err) {
        if (err) throw err
    })
}

exports.delete = function(userId, targetId) {
    connection.query('DELETE FROM likes WHERE userId = ? AND targetId = ?', [userId, targetId], function(err) {
        if (err) throw err
        else {
            console.log('Unlike with success!');
        }
    })
}

// Il faut check ensuite si (rows.length == 2) DONC les 2 users ont like
exports.checkBoth = function(userId, targetId, callback) {
    connection.query('SELECT * FROM likes WHERE (userId = ? AND targetId = ?) OR (userId = ? AND targetId = ?)', [userId, targetId, targetId, userId], function(err, rows) {
        if (err) throw err;
        callback(rows);
    })
}

exports.checkIfLiked = function(userId, targetId, callback) {
    connection.query('SELECT * FROM likes WHERE userId = ? AND targetId = ?', [userId, targetId], function(err, rows) {
        if (err) throw err;
        callback (rows);
    })
}

// Same as the previous method but other name for better comprehension
exports.checkLikeMe = function(userId, targetId, callback) {
    connection.query('SELECT * FROM likes WHERE userId = ? AND targetId = ?', [userId, targetId], function(err, rows) {
        if (err) throw err;
        callback (rows);
    })
}

exports.countLikesNumber = function(userObject, targetId, callback) {
    connection.query('SELECT COUNT (*) AS number FROM Likes WHERE targetId = ?', [targetId], function(err, row) {
        if (err) throw err;
        callback(row[0].number);
    })
}