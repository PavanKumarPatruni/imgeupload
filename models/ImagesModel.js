var mongoose = require('mongoose');

var imagesSchema = new mongoose.Schema({
	images : [],
	timestamp : String
});

var Images = mongoose.model('Images', imagesSchema);

module.exports = Images;