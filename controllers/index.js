'use strict'

var express = require('express');
var router = express.Router();
var session = require('express-session');
var User = require('../models/user');
var io = require('socket.io');

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/profile', require('./profile'));
router.use('/match', require('./match'));
router.use('/search', require('./search'));

router.get('/', function(req, res) {
  if (req.session.userId == undefined)
    res.redirect('/auth');
  else
    res.redirect('/users/myprofil');
});

module.exports = router;