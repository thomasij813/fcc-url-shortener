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

exports.getAll = function(req, res) {
  Url.find(function(err, urls) {
    if (err || urls === 'null') {
      res.send('There was an error');
    } else {
      res.json(urls.map(function(url) {
        return {
          original_url: url.url,
          shortened_url: 'https://www.' + req.hostname + '/re/' + url._id
        };
      }));
    }
  });
};

exports.findAndRedirect = function(req, res) {
  Url.findOne({ '_id': req.params.urlId }, function(err, data) {
    if (err)
      res.send(err);
    else
      res.redirect(data.url);
  });
};

exports.deleteAll = function(req, res) {
  Url.remove({}, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("All records have been deleted");
    }
  });
};

function saveUrl(url, req, res) {
  var url_doc = new Url({ url: url});
  url_doc.save(function(err, url) {
    if (err && err.code === 11000) {
      err = err.toJSON();
      res.json({
        original_url: err.op.url,
        shortened_url: 'https://www.'+ req.hostname + '/re/' + err.op._id
      });
    } else {
      res.json({
        original_url: url.url,
        shortened_url: 'https://www.'+ req.hostname + '/re/' + url._id
      });
    }
  });
}
