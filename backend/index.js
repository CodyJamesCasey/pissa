require('dotenv').load()
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var PF = require('port-friends');

var iss = require('./iss.js');
var phone = require('./phone.js')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use('/static', express.static(path.join(__dirname, '..', 'dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.post('/stuffs/conference.xml', function(req, res){
  res.sendFile(path.join(__dirname, 'conf.xml'));
})

app.post('/iss', function (req, res){
  iss.get(req.body.lat, req.body.lon, function(rez){
    var money = JSON.parse(rez);

    res.send(money.response[0].risetime.toString())
  })
});

app.post('/stuffs/song', function(req, res){
  res.sendFile(path.join(__dirname, 'song.mp3'))
})

app.post('/callmemaybe', function(req, res){
  if (req.body.phone === '2152849823'){
    console.log('yep');
    phone.conference(req.headers.host, req.body.phone, function(err, message){
      if (!err){
        res.status(200).end();
      } else {
        res.status(500).end();
      }
    })
  } else {
    console.log('nope')
    phone.send(req.body.phone, function(err, message){
      if (!err){
        res.status(200).end();
      } else {
        res.status(500).end();
      }
    });
  }
})

app.set('port', process.env.PORT || 3000);

PF.listen(app);
