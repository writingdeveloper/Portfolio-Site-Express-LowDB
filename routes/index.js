let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');
router.use(bodyParser.json()); // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
// Favicon Server Dependency
let favicon = require('serve-favicon');
router.use(favicon(path.join(__dirname, '../public/images', 'favicon.ico')));

// Parsing Dependency
let cheerio = require('cheerio');
let request = require('request');

// LowDB Module
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
// Save DB in db.json
const adapter = new FileSync('./public/db.json');
const db = low(adapter)

// Multer Module
let multer = require('multer'); // multer모듈 적용 (for 파일업로드)
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
let upload = multer({
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
  let checkImg;

  for (i = 0; i < data.length; i++) {
    // Check the Certificate Image Exist and type is Certificate
    if (data[i].imgurl === 'app/404.png' && data[i].type === 'Certificate') {
      // Type is Certificate but No Image then USE this link
      data[i].imgurl = 'app/Certificate.png';
    }
    if (data[i].imgurl === 'app/404.png' && data[i].type === 'Education') {
      // Type is Certificate but No Image then USE this link
      data[i].imgurl = 'app/Education.png';
    }
    // Check Image URL is Exist
    if (data[i].imgurl) {
      console.log(data[i].imgurl + ' Has Data');
      // If Image URL not exist use 404 Image
    } else {
      data[i].imgurl = 'app/404.png';
      checkImg = data[i].imgurl;
      console.log(checkImg);
    }
  }

  res.render('index', {
    dataarray: data,
    id: sid,
    type: data.type,
    name: data.name,
    url: data.url,
    sumlang: data.sumlang,
    explanation: data.explanation,
    imgurl: checkImg
  });
});

/* GET Create Page */
router.get('/create', function (req, res, next) {
  res.render('create', {
    // Sample Image
    imgurl: 'https://via.placeholder.com/730x444?text=Portfolio Image will be display here!'
  });
});

/* POST Create_Process Page */
router.post('/create_process', upload.single('projectImg'), function (req, res, next) {
  let sid = shortid.generate();
  // files information are in req.file object
  console.log(req.file);

  // Check Image Process
  let checkImg = req.file;
  // If there is no image use 404.png iamge
  if (checkImg === undefined) {
    checkImg = 'app/404.png';
    console.log(checkImg);
  } else {
    // If Image is exist put original name
    checkImg = req.file.originalname;
  }

  // DB Write
  db.get('project').push({
    id: sid,
    name: req.body.projectName,
    type: req.body.portType,
    url: req.body.projectUrl,
    explanation: req.body.projectExplanation,
    imgurl: checkImg,
    sumlang: req.body.sumLang,
    pjdate1: req.body.pjdate1,
    pjdate2: req.body.pjdate2,
    githuburl: req.body.githuburl
  }).write();
  res.redirect(`/`);
});

/* Delete Process */
router.post('/delete_process/:userId', function (req, res, next) {
  // GET userId
  let id = req.params.userId;
  // TO GET Image File Information
  let data = db.get('project').find({
    id: id
  }).value();
  let deleteFileName = data.imgurl;
  console.log(deleteFileName);

  console.log('ITEM : ' + id + 'DELETED!');
  // Delete Process
  db.get('project').remove({
    id: id
  }).write();

  // Prevent Delete Default Image
  if (deleteFileName === 'app/404.png' || deleteFileName === 'app/Certificate.png' || deleteFileName === 'app/Education.png') {
    console.log('This DB has no Image, Do nothing with files');
  } else {

    // Delete Image File
    fs.unlink('./public/images/' + deleteFileName, function (err) {
      if (err) {
        throw err;
      }
      console.log(deleteFileName + 'Deleted!')
    });
  };

  res.redirect('/');
});

/* GET Update Page */
router.get('/update/:pageId', function (req, res) {
  let id = req.params.pageId;
  console.log('ID PARAMETER IS : ' + id);
  let data = db.get('project').find({
    id: id
  }).value();
  // console.log(data);
  res.render('update', {
    id: id,
    name: data.name,
    type: data.type,
    url: data.url,
    explanation: data.explanation,
    imgurl: data.imgurl,
    startDate: data.pjdate1,
    endDate: data.pjdate2,
    githuburl: data.githuburl,
    sumlang: data.sumlang
  });
});

/* POST Update Page */
router.post('/update_process/:pageId', upload.single('projectImg'), function (req, res) {
  let id = req.params.pageId;
  // console.log(id);
  // console.log(req.file);
  let data = db.get('project').find({
    id: id
  }).value();
  // console.log(data);

  console.log(req.file);

  let checkImg;
  // If there is no image use 404.png iamge
  if (data.imgurl === undefined && data.imgurl === 'app/404.png' && req.file === undefined) {
    checkImg = 'app/404.png';
    console.log(data.imgurl);
  } else if (req.file === undefined) {
    checkImg = data.imgurl;
    console.log(checkImg);
  } else {
    checkImg = req.file.originalname;
  }

  db.get('project').find({
    id: id
  }).assign({
    id: id,
    name: req.body.projectName,
    type: req.body.portType,
    url: req.body.projectUrl,
    explanation: req.body.projectExplanation,
    imgurl: checkImg,
    sumlang: req.body.sumLang,
    pjdate1: req.body.pjdate1,
    pjdate2: req.body.pjdate2,
    githuburl: req.body.githuburl
  }).write();
  res.redirect('/' + id);
});

router.get('/resumeeng', function (req, res, next) {
  console.log('Hello');
  res.render('resumeeng', {});
});
router.get('/resumekor', function (req, res, next) {
  console.log('Hello');
  res.render('resumekor', {});
});


/* GET Detail View Page */
router.get('/:pageId', (req, res, next) => {
  // GET URL params and put it into :pageId
  let id = req.params.pageId;
  // console.log(id);
  // GET data id to use Object
  let data = db.get('project').find({
    id: id
  }).value();

  // Check Image Process
  let checkImg = data.imgurl;
  let checkType = data.type;
  // Check Image Validate
  if (checkImg === 'app/404.png' || checkType === 'Certificate') {
    // Type is Certificate but No Image then USE this link
    checkImg = 'app/Certificate.png';
  }
  if (checkImg === 'app/404.png' && checkType === 'Education') {
    // Type is Certificate but No Image then USE this link
    checkImg = 'app/Education.png';
  }
  // If there is no image use 404.png iamge
  if (checkImg === undefined) {
    checkImg = 'sample.png';
    console.log(checkImg);
  } else {
    checkImg = data.imgurl;
  }

  // Get github URL
  let url = data.githuburl;
  // Use Request Module to parsing Web page
  request(url, function (error, response, html) {
    // If Error with parsing Github README.md
    if (error) {
      console.log('Have Some problem with Reading Github README.md file!');
      console.log(error);
      readme = '<div>This Page has no Github README.md or if there are Error Check the server Console</div>';
      console.log(readme + 'ERROR');
    } else {
      // Parsing readme ID in github page
      let $ = cheerio.load(html);
      $('#readme').each(function () {
        // save to readme Variable
        readme = $(this).html();
      })
    }

    // Rendering
    console.log('No Problem with Detail Pages data');
    res.render('detail', {
      id: data.id,
      dataarray: data,
      type: data.type,
      name: data.name,
      url: data.url,
      explanation: data.explanation,
      imgurl: checkImg,
      markdown: readme,
      startDate: data.pjdate1,
      endDate: data.pjdate2,
      githuburl: data.githuburl,
      sumlang: data.sumlang
    });
  })
});

module.exports = router;