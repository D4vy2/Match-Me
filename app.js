'use strict'

var express = require('express');
var app = express();
var user = require('./models/user');
var bodyParser = require('body-parser');
var connection = require('./config/connection');
var favicon = require('serve-favicon');
var session = require('express-session');
var hbs = require('express-handlebars');
var helpers = require('handlebars-helpers');
var fs = require('fs');
var path = require('path');
var fileUpload = require('express-fileupload');
var mailer = require('express-mailer');
var comparison = helpers.comparison();

var http = require('http').Server(app);
var server = app.listen(8888);
var io = require('socket.io')(server);

mailer.extend(app, {
  from: 'matcha42@mail.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'your_email',
    pass: 'your_password'
  }
});

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/pages/', partialsDir: 'views/pages/partials/'}));
app.set('view engine', 'hbs');


// Middlewares
app.use('/static', express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(session({
  secret : 's4Kur4_2',
  name : 'sessionMatcha',
  resave : true,
  saveUninitialized : true,
}));
app.use(require('./controllers'));


io.on('connection', function(socket) {
  console.log('user connected for chat');

  socket.on('create', function(roomName) {
    socket.join(roomName);
  })

  socket.on('message', function(message, roomName) {
    io.to(roomName).emit('server-message', message);
  })

  socket.on('disconnect', function() {
    console.log('user disconnected');
  })

  socket.on('online req', function(login) {
    socket.broadcast.emit('online check', login)
  })

  socket.on('online resp', function(login) {
    socket.broadcast.emit('online')
  })

  socket.on('notif', function(dest) {
    socket.broadcast.emit('notif resp', dest);
  })

  socket.on('notif-chat', function(obj) {
    socket.broadcast.emit('notif-chat resp', obj);
  })

})

/* handle 404 ERROR */
app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/img/404.png')
});
