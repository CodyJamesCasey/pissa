var request = require('request');

module.exports = {
  get: function(lat, lon, cb){
    var BASE_URL = 'http://api.open-notify.org/iss-pass.json';

    var options = {
      lat: lat,
      lon: lon
    };

    request({url: BASE_URL, qs: options}, function(err, res, body){
      if(!err && res.statusCode === 200){
        cb(body)
      } else {
        cb(res.statusCode)
      }
    });
  }
}
