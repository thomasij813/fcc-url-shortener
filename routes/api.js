var express = require('express');
var Url = require('../models/url.js');
var urlController = require('../models/controllers/url_controller.js');

router = express.Router();

router.get('/all', urlController.getAll);

router.get('/new/:url(*)', urlController.saveUrl);

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
