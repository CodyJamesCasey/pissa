var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
  send: function(number, cb){
    client.messages.create({
      body: "Grab your binoculars, gather your friends. It's pISSa party time!!!",
      to: "+1" + number.toString(),
      from: "+14242215392"
    }, function(err, message){
      cb(err, message)
    })
  },
  conference: function(host, number, cb){
    client.makeCall({
      to: '+1' + number.toString(),
      from: "+14242215392",
      url:  'http://52.10.230.107/stuffs/conference.xml'
    }, function(err, message){
      cb(err, message)
    })
  }
}
