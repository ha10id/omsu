// Menu.js
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Menu = new Schema({
	'title': String,
	'url': String,
	'children': []
});

Menu.virtual('id')
.get(function() {
	return this._id.toHexString();
});

Menu.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('presave', this);
    next();
});

module.exports = mongoose.model('Menu', Menu);
