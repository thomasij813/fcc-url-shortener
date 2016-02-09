var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var index_route = require('./routes/index.js');
var api_route = require('./routes/api.js');

var app = express();

var mongoUri = 'mongodb://heroku_h85gcvlv:kes8b1a2bb8cs6rfn167p6n57j@ds059125.mongolab.com:59125/heroku_h85gcvlv';
mongoose.connect(mongoUri);
var port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_route);
app.use('/api', api_route);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
