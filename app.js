var tmi = require('tmi.js');
var fs = require('fs');
var keys = require('./keys.js')
var VERSION_NUMBER = "v.0.1.1";
var options;
var debug = true;
var token = keys.tokoen;

console.log(token());

var options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: "AClassyGentleBot",
    password: token()
  },
  channels: ["A_Classy_Gentleman"]
};

var client = new tmi.client(options);
client.connect();

client.on('connected', function(address, port) {
  client.api({
    url: "/streams/A_Classy_Gentleman"
  }, function(err, res, body) {
    if (!err && res.statusCode === 200){
      var body = JSON.parse(body);
      if(body.stream !== null){
        //TODO Get current uptime.
      }
      else{
        console.log("Channel is offline. Please restart once stream is online.");
        if(!debug){
          process.exit(0);
        }
      }
    }
    else{
      console.log("Twitch API is down.");
      if(!debug){
        process.exit(0);
      }
    }
  })
  client.action("A_Classy_Gentleman", "GentleBot " + VERSION_NUMBER + " connected!")
});

client.on('subanniversary', function(channel, username, months) {
  client.action("A_Classy_Gentleman", username + ", THANKS FOR SUBBING FOR " +
    months + "MONTHS!")
});

//TODO Set up

client.on("chat", function(channel, user, message, self) {
  if(message.startsWith('!')){
    if(message.startsWith('!highlight')){
      console.log("HIGHLIGHT REQUESTED AT TIME: xx:xx:xx");
    }
  }
});
