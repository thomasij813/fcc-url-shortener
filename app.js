var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var index_route = require('./routes/index.js');

var app = express();

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
mongoose.connect(mongoUri);
var port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_route);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
