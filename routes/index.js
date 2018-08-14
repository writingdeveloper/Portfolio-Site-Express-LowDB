var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function (req, res, next) {
  db.query('SELECT * FROM main', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results));
    var save =JSON.stringify(results);
  
    
    res.render('index', {
      title: 'Express',
      name: results[0].name,
      imageurl : save.imageurl
    });
    console.log(save.imageurl);
  });

  /* GET home page. */


});

module.exports = router;