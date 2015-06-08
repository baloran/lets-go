var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports.loginView = function (req, res) {

  User.find({}, function (err, data) {

    if (err) return console.log(err);

    console.log(data);
  });

  res.render('login');

};

module.exports.processLogin = function (req, res) {

  console.log(req.body);

};

module.exports.register = function (req, res) {

  res.render('register');
};

module.exports.processRegister = function (req, res) {

  console.log(req.body);

  if (req.body.password === req.body.re_password) {

  };

  var user = new User(req.body);

  user.save(function (err) {
    if (err) throw err;
  });
};

module.exports.homeView = function (req, res) {

  io.on('connection', function (socket) {

    io.emit('news', {title: 'test'});

    socket.on('private message', function (from, msg) {
      console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
      io.emit('user disconnected');
    });
  });

  res.render('home');
};
