var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var PF = require('port-friends');

var iss = require('./iss.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use('/static', express.static(path.join(__dirname, '..', 'dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.post('/iss', function (req, res){
  iss.get(req.body.lat, req.body.lon, function(rez){
    var money = JSON.parse(rez);

    res.send(money.response[0].risetime.toString())
  })
})

app.set('port', process.env.PORT || 3000);

PF.listen(app);
