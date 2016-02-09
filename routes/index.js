var express = require('express');
var Url = require('../models/url.js');
var urlController = require('../models/controllers/url_controller.js');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

//router.get('/:urlId', urlController.findAndRedirect);

module.exports = router;
