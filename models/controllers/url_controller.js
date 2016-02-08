var Url = require('../url.js');
var validUrl = require('valid-url');

exports.saveUrl = function(req, res) {
  Url.findOne({}, {}, { sort: { 'date_created': -1 }}, function(err, url) {
    return url;
  }).exec(function(err, url) {
    var validatedUrl = validUrl.isWebUri(req.params.url);
    if (!validatedUrl) {
      res.json({message: req.params.url + ' is not a valid url'});
    } else {
      var url_doc = new Url();
      url_doc.url = validatedUrl;
      url_doc.shortener = (url === null) ? 'a' : shortenUrl(url.shortener);
      url_doc.save(function(err) {
        if (err && err.code === 11000) {
          Url.findOne().where({ url: req.params.url }).exec(function(err, url) {
            res.json({
              message: 'This url has already been saved',
              original_url: url.url,
              shortened_url: req.hostname + '/' + url.shortener
            });
          });
        } else {
          Url.findOne().where({url:req.params.url}).exec(function(err, url) {
            res.json({
              message: req.params.url + ' has been saved',
              original_url: url.url,
              shortened_url: req.hostname + '/' + url.shortener
            });
          });
        }
      });
    }
  });
};

function shortenUrl(prevShortenedUrl) {
  var stringArray = prevShortenedUrl.split('');
  var lastCharCode = stringArray.shift().charCodeAt();
  if (lastCharCode !== 122) {
    var newChar = String.fromCharCode(lastCharCode + 1);
    stringArray.unshift(newChar);
    return stringArray.join('');
  } else if (lastCharCode === 122) {
    return stringArray.unshift('a').join('');
  } else {
    return 'error';
  }
}
