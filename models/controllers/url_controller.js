var Url = require('../url.js');
var validUrl = require('valid-url');
var http = require('http');

exports.saveUrl = function(req, res) {
  var validatedUrl = validUrl.isWebUri(req.params.url);
  if (!validatedUrl)
    res.json({message: req.params.url + ' is not a valid url'});
  else
    saveUrl(validatedUrl, req, res);
};

exports.findAndRedirect = function(req, res) {
  Url.findOne({ '_id': req.params.urlId }, function(err, data) {
    if (err)
      res.send(err);
    else
      res.redirect(data.url);
  });
};

function saveUrl(url, req, res) {
  var url_doc = new Url({ url: url});
  url_doc.save(function(err, url) {
    if (err && err.code === 11000) {
      Url.findOne({'url': url_doc.url}, function(err, data) {
        if (err) {
          res.send('There was an error');
        } else {
          res.json({
            original_url: data.url,
            shortened_url: 'https://' + req.hostname + '/' + data._id
          });
        }
      });
    } else {
      res.json({
        original_url: url.url,
        shortened_url: 'https://'+ req.hostname + '/' + url._id
      });
    }
  });
}
