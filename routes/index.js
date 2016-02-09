var express = require('express');
var Url = require('../models/url.js');
var urlController = require('../models/controllers/url_controller.js');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.locals.protocol = req.protocol;
  res.locals.hostname = req.hostname;
  res.render('index');
});

router.get('/:urlId', urlController.findAndRedirect);

router.get('/new/:url(*)', urlController.saveUrl);

module.exports = router;
