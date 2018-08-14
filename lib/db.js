var mysql = require('mysql');
var db = mysql.createConnection({
  host: '43.255.154.68',
  user: 'sangumee',
  password: 'votmdnjem123@',
  database: 'sangumee_portfolio'
});
db.connect();

module.exports = db;