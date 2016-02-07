var express = require('express');
var Url = require('../models/url.js');

router = express.Router();

router.get('/all', function(req, res) {
  Url.find(function(err, urls) {
    if (err)
      res.send(err);
    else
      res.json(urls);
  });
});

router.get('/new/:url(*)', function(req, res) {
  var url_doc = new Url();
  url_doc.url = req.params.url;
  url_doc.save(function(err) {
    if (err && err.code === 11000) {
      Url.findOne().where({ url: req.params.url }).exec(function(err, url) {
        res.json({
          message: 'This url has already been saved',
          saved_url_data: url
        });
      });
    } else {
      Url.findOne().where({url:req.params.url}).exec(function(err, url) {
        res.json({
          message: req.params.url + ' has been saved',
          saved_urL_data: url
        });
      });
    }
  });
});

module.exports = router;
