'use strict'

var connection = require('../config/connection');

exports.create = function(userId, targetId, eventName) {
    connection.query('INSERT INTO notifications SET userId = ?, targetId = ?, eventName = ?', [userId, targetId, eventName], function(err) {
        if (err) throw err;
    })
}

exports.checkExist = function(userId, targetId, eventName, callback) {
    connection.query('SELECT * FROM notifications WHERE userId = ?, targetId = ?, eventName = ?', [userId, targetId, eventName], function(err, rows) {
        if (err) throw err;
        callback(rows);
    })
}

exports.get = function(targetId, callback) {
    connection.query('SELECT id, eventName, login, status FROM notifications INNER JOIN users ON notifications.userId = users.userId WHERE targetId = ? ORDER BY id DESC LIMIT 10', [targetId], function(err, rows) {
        if (err) throw err;
        callback(rows);
    })
}

exports.getHistory = function(targetId, callback) {
    connection.query('SELECT id, status, eventName, login FROM notifications INNER JOIN users ON notifications.userId = users.userId WHERE targetId = ? ORDER BY id DESC LIMIT 40', [targetId], function(err, rows) {
        if (err) throw err;
        callback(rows);
    })
}

exports.update = function(id) {
    connection.query('UPDATE notifications SET status = 1 WHERE id = ?', [id], function(err) {
        if (err) throw err;
    })
}