var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports.gameChoice = function (req, res) {

  res.render('choice');
};

module.exports.loginView = function (req, res) {

  res.render('login');

};

module.exports.processLogin = function (req, res) {

  User.login(req.body, function (err, match) {
    
    if (err) return console.log(err);

    if (match) {

      req.session.email = req.body.email;
      req.session.connected = true;

      req.session.save();

      res.redirect('/');
      
    } else {

      res.redirect('/login');
    }
  });

};

module.exports.register = function (req, res) {

  res.render('register');
};

module.exports.processRegister = function (req, res) {



  var user = new User(req.body);

  user.save(function (err) {
    if (err) throw err;
  });
};

module.exports.homeView = function (req, res) {

  res.render('home');
};

module.exports.search = function (req, res) {

  var name = req.body.name;

  User.findOne({email: new RegExp('^'+name+'$', "i")}, function(err, data) {
    
    res.json(data);
  });
};
