var express = require('express');
var router = express.Router();

var imageUpload = require('./imageUpload.js');
router.post('/uploadImages', imageUpload.uploadImages);
router.post('/uploadImage', imageUpload.uploadImage);
router.get('/getImages', imageUpload.getImages);

module.exports = router;