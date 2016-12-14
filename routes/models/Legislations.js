// News.js
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Legislations = new Schema({
    'title': String,
    'url': String,
    'creation_date': Date,
    'publication_date': Date,
    'body': String
});

Legislations.virtual('id')
.get(function() {
    return this._id.toHexString();
});

Legislations.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('presave', this);
    next();
});

module.exports = mongoose.model('Legislations', Legislations);