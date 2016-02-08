var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  _id: {type: String, unique: true, 'default': shortid.generate},
  url: {type: String, unique: true}
});

module.exports = mongoose.model('Url', UrlSchema);
