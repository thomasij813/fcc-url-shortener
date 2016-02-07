var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  url: {type: String, index: {unique: true}},
  shortener: {type: String, index: {unique: true}},
  date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', UrlSchema);
