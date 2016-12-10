var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
var fs = require('fs');
var mkdirp = require('mkdirp');
var db = require('../db/db.js');
var Images = require('../models/ImagesModel.js');
var resHandler = require('../utils/responseHandler.js');

exports.uploadImage = function(req, res){
  var image = req.body.image;
  var id = req.body.id;
  var base64Data = image.replace(/^data:image\/png;base64,/, "");
  base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  var timeStamp = Math.floor(Date.now() / 1000);
  var newDir = "/Users/Pavan/NodeJS/ImageUpload/uploads/images/" + timeStamp;

  mkdirp(newDir, function (err) {
    if (err) {
      console.error(err);
      resHandler(res, 500, false, "Upload Failed", err);
    } else {
      var filePath = newDir +  "/" + Math.floor(Date.now() / 1000) + ".jpeg";
      fs.writeFile( filePath, base64Data, 'base64', function (err, data) {
        if (err)
          resHandler(res, 500, false, "Upload Failed", err);
        else {
          filePaths.push(filePath);
          var imagesCollection = new Images({
            images : filePaths,
            timestamp : timeStamp
          });
          imagesCollection.save(function(err, imagesCollection) {
            if (err) resHandler(res, 500, false, "Upload Failed", err);
            else
              resHandler(res, 200, true, "Uploaded Successfully", imagesCollection);
          });
        }
      });
    }
  });
}

exports.uploadImages = function(req, res){
	var images = req.body.images;
  var timeStamp = Math.floor(Date.now() / 1000);
  var filePaths = [];
  var count = 0;
  var newDir = "/Users/Pavan/NodeJS/ImageUpload/uploads/images/" + timeStamp;

  mkdirp(newDir, function (err) {
    if (err) {
      console.error(err);
      resHandler(res, 500, false, "Upload Failed", err);
    } else {
      for (var index = 0; index < images.length; index++) {
        base64Data = images[index].replace(/^data:image\/png;base64,/, "");
        base64Data = images[index].replace(/^data:image\/jpeg;base64,/, "");

        var filePath = newDir + "/" + timeStamp + "_" + index + ".jpeg";

        filePaths.push(filePath);

        fs.writeFile(filePath, base64Data, 'base64', function (err, data) {
          if (err)
            console.log(err);
          else {
            count++;
            if (count == images.length) {
              var imagesCollection = new Images({
                images : filePaths,
                timestamp : timeStamp
              });
              imagesCollection.save(function(err, imagesCollection) {
                if (err) resHandler(res, 500, false, "Upload Failed", err);
                else
                  resHandler(res, 200, true, "Uploaded Successfully", imagesCollection);
              });
            }
          }
        }); 
      }
    }
  });
}

exports.getImages = function(req, res){
  var id = req.query.id;
  
  Images.find({_id : new ObjectId(id)}, function(err, Images){
    if (err) resHandler(res, 500, false, "Fetching Failed", err);
    else resHandler(res, 200, true, "Fetched Successfully", Images);
  });
};