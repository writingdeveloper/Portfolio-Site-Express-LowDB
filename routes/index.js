var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json()); // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
// LowDB Module
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
// Save DB in db.json
const adapter = new FileSync('./public/db.json');
const db = low(adapter)

/* GET home page. */
router.get('/', function (req, res, next) {
  let data = db.get('project').find().value();
  console.log(data);
  res.render('index', {
    // Project Data
    title: data.name,
    url: data.url,
    explanation: data.explanation,
    imgurl: data.imgurl
  });
});

// db.defaults({
//   project: [],
//   cert: [],
//   education: []
// }).write()

router.get('/create', function (req, res) {
  res.render('create', {
    title: 'Create Page'
  });
});

router.post('/post', function (req, res) {
  let pjName = req.body.projectName;
  let pjURL = req.body.projectURL;
  let pjExplanation = req.body.projectExplanation;
  let pjImgURL = req.body.projectImgURL;

  db.get('project').push({
      name: pjName,
      url: pjURL,
      explanation: pjExplanation,
      imgurl: pjImgURL
    })
    .write();
  res.redirect('/');
});



module.exports = router;