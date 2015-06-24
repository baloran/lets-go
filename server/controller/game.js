/**
 * Game.js
 * Controller for generate game
 */

var mongoose = require('mongoose');
var _ = require('underscore');

var Game = mongoose.model('Game');
var auth = require('../helper/auth');

module.exports.generateView = function (req, res) {

  if (req.params.type == "multi") {

    if (!req.session.connected) {
      res.redirect('/login');
    };
  };

  res.render('generate', {
    type: req.params.type
  });
};

module.exports.generate = function (req, res) {

  var id = guid();

  console.log('Generate: ', req.body);

  var opt = {
    size: req.body.size,
    player: req.body.player2,
    type: req.params.type,
    id: id,
    size: req.body.size
  };

  opt.host = (req.session.email) ? req.session.email : req.body.player1;

  var game = new Game(opt);

  game.save(function (err, data) {

    if (err) return console.log(err);

    res.redirect('/game/' + id);
  });
};

module.exports.letsGo = function (req, res) {

  Game.findOne({id: req.params.id}, function (err, data) {

    if (err) return console.log(err);

    if (data.type == "multi") {

      if (!req.session.connected && (req.session.email != data.player || req.session.email != data.host)) {

        res.redirect('/login');
      } else {

        res.render('game', {
          data: data
        });
      };
    }

    res.render('game', {
      data: data
    });
  });
};

module.exports.getParty = function (req, res) {

  Game.findOne({id: req.params.id}, function (err, data) {

    if (err) return console.log(err);

    res.json(data);
  });
};

module.exports.updateParty = function (req, res) {  

  var d = req.body;

  Game.findOne({id: req.params.id}, function (err, game) {

    if (err) return console.log(err);
    if (game.length < 0) return console.log("No game.");

    console.log(req.body);

    game.update({
        $push: {stones: d}
    }, function (err, row) {

      if (err) return console.log(err);

      return true;
    });
  });
};

// Generate ID
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}