var Url = require('../url.js');
var validUrl = require('valid-url');

exports.saveUrl = function(req, res) {
  var validatedUrl = validUrl.isWebUri(req.params.url);
  if (!validatedUrl) {
    res.json({message: req.params.url + ' is not a valid url'});
  } else {
    var url_doc = new Url({ url: validatedUrl });
    url_doc.save(function(err, url) {
      if (err && err.code === 11000) {
        err = err.toJSON();
        res.json({
          original_url: err.op.url,
          shortened_url: req.hostname + '/' + err.op._id
        });
      } else {
        res.json({
          original_url: url.url,
          shortened_url: url._id
        });
      }
    });
  }
};

exports.getAll = function(req, res) {
  Url.find(function(err, urls) {
    if (err) {
      res.send(err);
    } else {
      res.json(urls.map(function(url) {
        return {
          original_url: url.url,
          shortened_url: req.hostname + '/' + url._id
        };
      }));
    }
  });
};
