/**
 * Lets'Go
 * Route
 */




// Controller
var user = require('../controller/user');

module.exports = function (app) {

  app.get('/', user.homeView);

  app.get('/login', user.loginView);
  app.post('/login', user.processLogin);
}
