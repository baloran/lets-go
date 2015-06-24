/**
 * User.model
 * Database
 */

var mongoose 			= require('mongoose');
var Schema 				= mongoose.Schema;
var ObjectId 			= Schema.Types.ObjectId;

var bcrypt 				= require('bcrypt');
var SALT_WORK_FACTOR 	= 10;

// Schema Mongoose
var gameSchema = new mongoose.Schema({
  id: {
  	type: String,
  	required: true,
  	index: {
  		unique: true
  	}
  },
  host: {
  	type: String,
  	require: true
  },
  size: {
    type: String
  },
  player: {
    type: String,
    require: true
  },
  game: {
    type: Array,
  },
  chaines: {
    type: Array
  },
  status: {
    type: String,
    default: 'invited'
  },
  type: {
    type: String
  },
  stones: {
    type: Array
  }
});


var Game = mongoose.model('Game', gameSchema);
