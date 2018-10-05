let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let path = require('path');
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

// Multer Module
var multer = require('multer'); // multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({
  storage: storage
})

// Default DB Set
db.defaults({
  project: [],
  cert: [],
  education: []
})


/* GET home page. */
router.get('/', function (req, res, next) {
  let data = db.get('project').value();
  let sid = shortid.generate();
  // console.log(data);
  res.render('index', {
    dataarray: data,
    id: sid,
    name: data.name,
    url: data.url,
    explanation: data.explanation,
    imgurl: data.imgurl
  });
});

/* GET Create Page */
router.get('/create', function (req, res, next) {
  res.render('create', {});
});

/* POST Create_Process Page */
router.post('/create_process', upload.single('projectImg'), function (req, res, next) {
  let sid = shortid.generate();
  // files information are in req.file object
  // console.log(req.file);
  // DB Write
  db.get('project').push({
    id: sid,
    name: req.body.projectName,
    url: req.body.projectUrl,
    explanation: req.body.projectExplanation,
    imgurl: req.file.originalname
  }).write();
  res.redirect(`/create`);
});

router.get('/:id', (req, res, next) => {
  // GET URL params and put it into :id
  var id = req.params.id;
  let data = db.get('project').find({id:id}).value();
  console.log(data);
  console.log(id);
  res.render('detail', {
    dataarray: data,
    name: data.name,
    url: data.url,
    explanation: data.explanation,
    imgurl: data.imgurl
  });
});

module.exports = router;