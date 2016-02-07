var express = require('express');
var Url = require('../models/url.js');

router = express.Router();

router.get('/all', function(req, res) {
  Url.find(function(err, urls) {
    if (err)
      res.send(err);
    res.json(urls);
  });
});

router.get('/new/:url(*)', function(req, res) {
  var url_doc = new Url();
  url_doc.url = req.params.url;
  url_doc.save(function(err) {
    if (err)
      res.send(err);
    res.json({status: req.params.url + ' saved'});
  });
});

module.exports = router;
