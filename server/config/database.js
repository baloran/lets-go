var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the database connection
mongoose.connect('mongodb://localhost:27017/letsgo');


// When connection success
mongoose.connection.on('connected', function () {

  console.log('Mongoose db connection opened');

});

// If the connection throws an error
mongoose.connection.on('error', function (err) {

  console.log('Mongoose db connection error: ' + err);

});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {

  console.log('Mongoose db connection disconnected');

});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {

  mongoose.connection.close(function () {

    console.log('Mongoose db connection disconnected through app termination');
    process.exit(0);

  });

});

/**
 * Expose
 */
require('../model/User');