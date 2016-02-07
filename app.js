var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var index_route = require('./routes/index.js');
var api_route = require('./routes/api.js');

var app = express();

var mongodb_uri = 'mongodb://thomasij813:mongo@apollo.modulusmongo.net:27017/Yzo4wago';
mongoose.connect(mongodb_uri);

var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_route);
app.use('/api', api_route);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
