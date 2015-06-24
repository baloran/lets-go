/**
 * Lets'Go
 * Route
 */




// Controller
var user = require('../controller/user');
var game = require('../controller/game');
var auth = require('../helper/auth');

module.exports = function (app) {

  app.get('/', user.gameChoice);
  app.get('/game', user.homeView);
  app.post('/api/search', user.search);

  app.get('/login', user.loginView);
  app.post('/login', user.processLogin);
  app.get('/register', user.register);
  app.post('/register', user.processRegister);

  app.get('/generate/:type', game.generateView);
  app.post('/generate/:type', game.generate);
  app.get('/game/:id', game.letsGo);
  app.get('/getParty/:id', game.getParty);
  app.post('/updateParty/:id', game.updateParty);
}
