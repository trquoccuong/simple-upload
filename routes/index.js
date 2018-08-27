var express = require('express');
var router = express.Router();
var multer = require('multer');
var dotenv = require('dotenv');
var result = dotenv.config();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Upload' });
});

router.post('/upload', upload.any(), function (req, res, next) {

  if (!req.files || !req.files.length) {
    return res.send({
      "success": false,
      "error": "No file upload"
    });
  }
  res.send({
    "success": true,
    "error": ""
  });
});

module.exports = router;
