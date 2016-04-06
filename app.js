var tmi = require('tmi.js');
var fs = require('fs');
var VERSION_NUMBER = "v.0.1.0";
var KEYS;
var options;

fs.readFile('keys.txt', 'utf8', function(err, data) {
  if(err){
    return console.log(err);
  }
  KEYS = data.slice(0, data.length - 1);
  createOptions();
});

console.log(KEYS);
function createOptions() {
  options = {
      options: {
          debug: true
      },
      connection: {
          cluster: "aws",
          reconnect: true
      },
      identity: {
          username: "AClassyGentleBot",
          password: KEYS
      },
      channels: ["A_Classy_Gentleman"]
  };
  createClient();
}

function createClient() {
  var client = new tmi.client(options);
  client.connect();

  client.on('connected', function(address, port) {
    client.action("A_Classy_Gentleman", "GentleBot " + VERSION_NUMBER + " connected!")
  });

  client.on('subanniversary', function(channel, username, months) {
    client.action("A_Classy_Gentleman", username + ", THANKS FOR SUBBING FOR " +
      months + "MONTHS!")
  });
}

//TODO Set up
