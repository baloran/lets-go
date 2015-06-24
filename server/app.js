var app = require('express')();
var server = require('http').Server(app);

require("./config/express.js")(app);
require("./config/database.js");
require("./config/routes.js")(app);

var port = process.env.PORT || 3100;
server.listen(port);

console.log('Let\' Go on port: ' + port);

exports = module.exports = app;
