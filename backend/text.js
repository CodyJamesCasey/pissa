var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
  send: function(number){
    client.messages.create({
      body: "It's pizza party time!!!",
      to: "+1" + number.toString(),
      from: "+14242215392"
    }, function(err, message){
      console.log(message.sid)
    })
  }
}
