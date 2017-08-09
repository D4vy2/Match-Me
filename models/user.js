'use strict'
var connection = require('../config/connection');

var User = function(firstName, lastName, age, login, email, gender, bio, sexpref, geoloc, position) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.login = login;
  this.email = email;
  this.gender = gender;
  this.bio = bio;
  this.sexpref = sexpref;
  this.geoloc = geoloc;
  this.position = position;
}

// Create user in the database
exports.create = function(user, callback) {
  var post = {
    gender : 'Male',
    firstName : user.firstName,
    lastName : user.lastName,
    login : user.login,
    email : user.email,
    password : user.password,
    sexpref : 'Bisexual'
  }
  connection.query('INSERT INTO users SET ?', [post], function (err, result) {
    if (err) callback(err);
    else {
      callback('created');
      console.log('User created');
    }
  })
};

// Get a particular user from its userId
exports.getById = function(userId, callback) {
  connection.query('SELECT * FROM users WHERE userId = ?', [userId], function(err, rows, fiels) {
    if (err) throw err
    else {
      let user = new User(rows[0].firstName, rows[0].lastName, rows[0].age, rows[0].login, rows[0].email, rows[0].gender, rows[0].bio, rows[0].sexpref, rows[0].geoloc, rows[0].position);
      callback(user)
    }
  })
};  

exports.getAllById = function(userId, callback) {
  connection.query('SELECT * FROM users WHERE userId = ?', [userId], function(err, rows, fiels) {
    if (err) throw err
    else {
      callback(rows)
    }
  })
};  

exports.getMainPic = function(userId, user, callback) {
    connection.query('SELECT name FROM images WHERE profil = 1 AND userId = ?', [userId], function(err, rows) {
        if (err) callback(err)
        else {
            let newuser = Object.assign(user, rows[0]);
            callback(newuser);
        }
    })
}

exports.getProfil = function(userId, callback) {
  connection.query('SELECT name FROM images WHERE userId = ? AND profil = 1', [userId], function(err, rows, fiels) {
    if (err) throw err
    else {
      let user = new User(rows[0].firstName, rows[0].lastName, rows[0].login, rows[0].email, rows[0].gender, rows[0].bio, rows[0].sexpref);
      callback(user)
    }
  })
};  

// Get a particular user from its login
exports.getByLogin = function(login, callback) {
  connection.query('SELECT * FROM users WHERE login = ?', [login], function(err, rows, fiels) {
    if (err) throw err
    callback(rows[0])
  })
};

exports.getId = function(login, callback) {
  connection.query('SELECT userId FROM users WHERE login = ?', [login], function(err, rows, fiels) {
    if (err) throw err
    callback(rows[0])
  })
};

// Get a particular user from its email adress
exports.getByMail = function(email, callback) {
  connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows, fiels) {
    if (err) throw err
    callback(rows[0])
  })
};

// Get all user
exports.getAll = function(callback) {
  connection.query('SELECT * FROM `users` INNER JOIN images ON users.userId = images.userId WHERE images.profil = 1', function(err, rows, fiels) {
    if (err) throw err
    callback(rows)
  })
};

exports.getAllBySexPref = function(gender, sexpref, userId, callback) {
  // REVERIFIER TOUT LES CAS POSSIBLE POUR BISEXUAL
  let query = "";
  if (gender === 'Male' && sexpref === 'Bisexual') {
    query = "SELECT *, users.userId FROM `users` INNER JOIN images ON users.userId = images.userId LEFT OUTER JOIN blocks ON users.userId = blocks.targetId WHERE images.profil = 1 AND (users.sexpref = 'Bisexual' OR (users.gender = 'Male' AND users.sexpref = 'Gay') OR (users.gender = 'Female' AND users.sexpref = 'Straight')) AND users.userId NOT IN (SELECT targetId FROM blocks WHERE userId = ?)";
    connection.query(query, [userId], function(err, rows, fiels) {
      if (err) throw err
      callback(rows)
    })
  } else if (gender === 'Female' && sexpref === 'Bisexual') {
    query = "SELECT *, users.userId FROM `users` INNER JOIN images ON users.userId = images.userId LEFT OUTER JOIN blocks ON users.userId = blocks.targetId WHERE images.profil = 1 AND (users.sexpref = 'Bisexual' OR (users.gender = 'Male' AND users.sexpref = 'Straight') OR (users.gender = 'Female' AND users.sexpref = 'Gay')) AND users.userId NOT IN (SELECT targetId FROM blocks WHERE userId = ?)";
    connection.query(query, [userId], function(err, rows, fiels) {
      if (err) throw err
      callback(rows)
    })
  } else if (gender === 'Male' && sexpref === 'Straight') {
    query = "SELECT *, users.userId FROM `users` INNER JOIN images ON users.userId = images.userId LEFT OUTER JOIN blocks ON users.userId = blocks.targetId WHERE images.profil = 1 AND users.gender = 'Female' AND (users.sexpref = 'Bisexual' OR users.sexpref = 'Straight') AND users.userId NOT IN (SELECT targetId FROM blocks WHERE userId = ?)";
    connection.query(query, [userId], function(err, rows, fiels) {
      if (err) throw err
      callback(rows)
    })
  } else if (gender === 'Female' && sexpref === 'Straight') {
    query = "SELECT *, users.userId FROM `users` INNER JOIN images ON users.userId = images.userId LEFT OUTER JOIN blocks ON users.userId = blocks.targetId WHERE images.profil = 1 AND users.gender = 'Male' AND (users.sexpref = 'Bisexual' OR users.sexpref = 'Straight') AND users.userId NOT IN (SELECT targetId FROM blocks WHERE userId = ?)";
    connection.query(query, [userId], function(err, rows, fiels) {
      if (err) throw err
      callback(rows)
    })
  } else if (gender === 'Male' && sexpref === 'Gay') {
    query = "SELECT *, users.userId FROM `users` INNER JOIN images ON users.userId = images.userId LEFT OUTER JOIN blocks ON users.userId = blocks.targetId WHERE images.profil = 1 AND users.gender = 'Male' AND (users.sexpref = 'Bisexual' OR users.sexpref = 'Gay') AND users.userId NOT IN (SELECT targetId FROM blocks WHERE userId = ?)";
    connection.query(query, [userId], function(err, rows, fiels) {
      if (err) throw err
      callback(rows)
    })
  } else if (gender === 'Female' && sexpref === 'Gay') {
    query = "SELECT *, users.userId FROM `users` INNER JOIN images ON users.userId = images.userId LEFT OUTER JOIN blocks ON users.userId = blocks.targetId WHERE images.profil = 1 AND users.gender = 'Female' AND (users.sexpref = 'Bisexual' OR users.sexpref = 'Gay') AND users.userId NOT IN (SELECT targetId FROM blocks WHERE userId = ?)";
    connection.query(query, [userId], function(err, rows, fiels) {
      if (err) throw err
      callback(rows)
    })
  }
};

exports.getAllByAge = function(callback) {
  connection.query('SELECT * FROM `users` INNER JOIN images ON users.userId = images.userId WHERE images.profil = 1 ORDER BY users.age', function(err, rows, fiels) {
    if (err) throw err
    callback(rows)
  })
};

// Authenticate with login and password
exports.authenticate = function(login, password, callback) {
  connection.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], function(err, rows, fiels) {
    if (err) throw err
    callback(rows[0])
  })
};

exports.saveLastConnection = function(userId, dateformat) {
  connection.query('UPDATE users SET lastConnection = ? WHERE userId = ?', [dateformat, userId], function(err, rows, fiels) {
    if (err) throw err
  })
};

exports.setPassword = function(email, password) {
  connection.query('UPDATE users SET password = ? WHERE email = ?', [password, email], function(err) {
    if (err) throw err
    console.log('New email sent!');
  })
};

exports.save = function(profil, userId) {
  var post = {
    firstName : profil.firstName,
    lastName : profil.lastName,
    age : profil.age,
    email : profil.email,
    gender : profil.gender,
    sexpref : profil.sexpref,
    bio : profil.bio,
    geoloc : profil.geoloc,
    position : profil.position
  }
  connection.query('UPDATE users SET ? WHERE userId = ?', [post, userId], function (err) {
    if (err) console.log(err);
    else {
      console.log('Profil updated!');
    }
  })
};