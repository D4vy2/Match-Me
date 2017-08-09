var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'matcha_db',
  port: 3307
});

var db = connection.query('CREATE DATABASE IF NOT EXISTS matcha_db', function(err, rows, fiels) {
  // if (err) throw err
  console.log('Database matcha_db created...');
});
// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected...');
// });

module.exports = connection;
