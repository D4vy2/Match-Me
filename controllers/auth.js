var express = require('express');
var router = express.Router();
var session = require('express-session');
var User = require('../models/user');
var checkValidity = require('../middlewares/checkValidity');
var mailer = require('express-mailer');
var generator = require('generate-password');
var bcrypt = require('bcrypt');
var salt = '$2a$10$p1oU4fo8HVhn/.PHm84k/.';
var fs = require('fs');
var dateformat = require('dateformat');

// SIGN IN
router.get('/', function(req, res) {
  if (req.session.userId == undefined) {
    var err = {error : req.session.error}
    delete req.session.error;
    res.render('pages/signin', err);
  }
  else
    res.redirect('/users/myprofil');
    // res.render('pages/home');
});

router.post('/', function(req, res) {
  let form = {
    login : req.body.login,
    password : bcrypt.hashSync(req.body.password, salt)
  }
  User.authenticate(form.login, form.password, function(rows) {
    if (rows) {
      User.saveLastConnection(rows.userId, dateformat("mediumDate"));
      req.session.userId = rows.userId;
    }
    else {
      req.session.error = 'Invalid username or password';
    }
    res.redirect('/');
  });
});

// SIGN UP
router.get('/register', function(req, res) {
  console.log(__dirname);
  if (req.session.userId != undefined) {
    res.redirect('/users/home');
  } else {
      let err = {error : req.session.error}
      delete req.session.error;
      res.render('pages/signup', err);
  }
});

router.post('/register', checkValidity, function(req, res, next) {
  let error = res.locals.error;
  if (error != undefined) {
      req.session.error = error;
      res.redirect('/auth/register');
  } else {
    let user = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      login : req.body.login,
      email : req.body.email,
      password : bcrypt.hashSync(req.body.password, salt),
    }
    User.create(user, function(err) {
      if (err != 'created') {
        req.session.error = 'This login already exists.';
        res.redirect('/auth/register');
      } else {
        if (!fs.existsSync('public/gallery/' + user.login))
          fs.mkdirSync('public/gallery/' + user.login);
        res.redirect('/');
      } 
    });
  };
});

// RESET PASSWORD
router.get('/resetPassword', function(req, res) {
  if (req.session.userId != undefined) {
    res.redirect('/users/myprofil');
  } else {
      var err = {error : req.session.error, success: req.session.success}
      delete req.session.error;
      delete req.session.success;
      res.render('pages/resetPassword', err);
  }
});

router.post('/resetPassword', function(req, res) {
  if (req.body.email.trim() != "") {
    User.getByMail(req.body.email, function(rows) {
      if (rows == undefined) {
        req.session.error = 'User account does not exist.'
      }
      else {
        let password = generator.generate({length: 8, numbers: true, symbols: true});
        let hashPassword =  bcrypt.hashSync(password, salt);
        User.setPassword(req.body.email, hashPassword);
        res.mailer.send('pages/email', {
          to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
          subject: 'Your new password', // REQUIRED. 
          password: password// All additional properties are also passed to the template as local variables. 
        }, function (err) {
          if (err) {
            console.log('Error while sending the email')
            return;
          }
          console.log('Email sent!');
        });
        req.session.success = 'A new password has been sent to your email adress!';
      }
      res.redirect('/auth/resetPassword');
    })
  } else {
    req.session.error = `Please... enter a valid email adress.`
    res.redirect('/auth/resetPassword');
  }
  // res.render('pages/resetPassword', {error: req.session.error});
});


// LOGOUT
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/auth');
});

module.exports = router;