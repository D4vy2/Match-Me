var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'matcha_db',
  port: 3307,
  multipleStatements: true
});

// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected to database mysql...');
// });

module.exports = connection;