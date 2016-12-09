// News.js
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var News = new Schema({
	'title': String,
	'url': String,
	'thumbnail' : String,
	'publication_date': Date,
	'body': String
});

News.virtual('id')
.get(function() {
	return this._id.toHexString();
});

News.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('presave', this);
    next();
});


module.exports = mongoose.model('News', News);
