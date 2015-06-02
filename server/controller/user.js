

module.exports.loginView = function (req, res) {

  res.render('login');
}

module.exports.processLogin = function (req, res) {

  console.log("salut");
}

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
