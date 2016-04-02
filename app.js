var req = require('tmi.js');

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "GentleBot",
        password: //TODO key here.
    },
    channels: ["A_Classy_Gentleman"]
};

var client = new tmi.client(options);
client.connect();