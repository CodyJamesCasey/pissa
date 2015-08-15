var express = require('express');
var path = require('path');
var PF = require('port-friends');

var app = express();

app.use('/static', express.static(path.join(__dirname, '..', 'dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.set('port', process.env.PORT || 3000);

PF.listen(app);
