// Usefuls.js
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Usefuls = new Schema({
    'title': String,
    'url': String,
    'creation_date': Date,
    'publication_date': Date,
    'body': String
});

Usefuls.virtual('id')
.get(function() {
    return this._id.toHexString();
});

Usefuls.pre('save', function(next) {
    console.log('presave', this);
    next();
});

module.exports = mongoose.model('Usefuls', Usefuls);