// News.js
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Galeries = new Schema({
    'title': String,
    'url': String,
    'creation_date': Date,
    'publication_date': Date,
    'body': String
});

Galeries.virtual('id')
.get(function() {
    return this._id.toHexString();
});

Galeries.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('presave', this);
    next();
});


module.exports = mongoose.model('Galeries', Galeries);
