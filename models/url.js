var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  url: String,
  shortener: String,
  date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', UrlSchema);
