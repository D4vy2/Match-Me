'use strict'
var connection = require('../config/connection');

exports.create = function(userId, targetId) {
    connection.query('INSERT INTO blocks SET userId = ?, targetId = ?', [userId, targetId], function(err) {
        if (err) throw err
    })
}

exports.delete = function(userId, targetId) {
    connection.query('DELETE FROM blocks WHERE userId = ? AND targetId = ?', [userId, targetId], function(err) {
        if (err) throw err
        else {
            console.log('Unlike with success!');
        }
    })
}

// Il faut check ensuite si (rows.length == 2) DONC les 2 users ont block
exports.checkBoth = function(userId, targetId, callback) {
    connection.query('SELECT * FROM blocks WHERE (userId = ? AND targetId = ?) OR (userId = ? AND targetId = ?)', [userId, targetId, targetId, userId], function(err, rows) {
        if (err) throw err;
        callback(rows);
    })
}

exports.checkIfBlocked = function(userId, targetId, callback) {
    connection.query('SELECT * FROM blocks WHERE userId = ? AND targetId = ?', [userId, targetId], function(err, rows) {
        if (err) throw err;
        callback (rows);
    })
}

// exports.checkIfBlockedWithLogin = function(login1, login2, callback) {
//     connection.query('SELECT blocks.* FROM blocks WHERE userId = (SELECT userId FROM users WHERE login = ? ) AND targetId = (SELECT userId FROM users WHERE login = ?)', [login1, login2], function(err, rows) {
//         if (err) throw err;
//         callback (rows);
//     })
// }
