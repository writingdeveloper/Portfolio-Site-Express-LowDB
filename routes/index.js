let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let path = require("path");
let fs = require("fs");

const mysql = require("mysql");

var db = mysql.createConnection({
  host: "175.115.237.238",
  user: "sangumee",
  password: "sihung84265@",
  database: "portfolio"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Routes to portFolioData.js
let portfolioDataRouter = require("./portfolioData");
router.use("/", portfolioDataRouter);

router.use(bodyParser.json()); // to support JSON-encoded bodies
router.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
// Favicon Server Dependency
let favicon = require("serve-favicon");
router.use(favicon(path.join(__dirname, "../public/images", "favicon.ico")));

/* GET home page. */
router.get("/", function(req, res, next) {
  db.query(`SELECT * FROM Personal_Data`, function(error, data) {
    if (error) {
      throw error;
    }
    // Log Data
    console.log(data);
    res.render("index", {
      dataarray: data,
      userId: userId
      // id: data.id,
      // type: data.type,
      // name: data.name,
      // url: data.url,
      // sumlang: data.sumlang,
      // explanation: data.explanation
      // imgurl: checkImg
    });
  });
});

// LowDB Module
// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const shortid = require("shortid");
// // Save DB in db.json
// const adapter = new FileSync("./public/db.json");
// const db = low(adapter);

// Default DB Set
// db.defaults({
//   project: [],
//   cert: [],
//   education: []
// });

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   let data = db.get("project").value();
//   let sid = shortid.generate();
//   let checkImg;

//   for (i = 0; i < data.length; i++) {
//     // Check the Certificate Image Exist and type is Certificate
//     if (data[i].imgurl === "app/404.png" && data[i].type === "Certificate") {
//       // Type is Certificate but No Image then USE this link
//       data[i].imgurl = "app/Certificate.png";
//     }
//     if (data[i].imgurl === "app/404.png" && data[i].type === "Education") {
//       // Type is Certificate but No Image then USE this link
//       data[i].imgurl = "app/Education.png";
//     }
//     // Check Image URL is Exist
//     if (data[i].imgurl) {
//       console.log(data[i].imgurl + " Has Data");
//       // If Image URL not exist use 404 Image
//     } else {
//       data[i].imgurl = "app/404.png";
//       checkImg = data[i].imgurl;
//       console.log(checkImg);
//     }
//   }

//   res.render("index", {
//     dataarray: data,
//     id: sid,
//     type: data.type,
//     name: data.name,
//     url: data.url,
//     sumlang: data.sumlang,
//     explanation: data.explanation,
//     imgurl: checkImg
//   });
// });

module.exports = router;
