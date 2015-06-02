var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server);

require("./config/express.js")(app);
require("./config/routes.js")(app);
require("./config/database.js");

var port = process.env.PORT || 3000;
server.listen(port);

console.log('Let\' Go on port: ' + port);

exports = module.exports = app;
exports = module.exports = io;

global.io = io;
