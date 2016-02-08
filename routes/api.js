var express = require('express');
var validUrl = require('valid-url');
var Url = require('../models/url.js');
var url_controller = require('../models/controllers/url_controller.js');

router = express.Router();

router.get('/all', function(req, res) {
  Url.find(function(err, urls) {
    if (err)
      res.send(err);
    else
      res.json(urls);
  });
});

router.get('/new/:url(*)', url_controller.saveUrl);

router.get('/latest', function(req, res) {
  Url.findOne({}, {}, { sort: { 'date_created': -1 }}, function(err, url) {
    res.json(url);
  });
});

router.get('/delete_all', function(req, res) {
  Url.remove({}, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("All records have been deleted");
    }
  });
});

module.exports = router;
