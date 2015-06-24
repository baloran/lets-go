/**
 * Auth.js
 * Middleware for authentification
 */


module.exports.needLogin = function (req, res, next) {

	if (req.session.email && req.session.connected) next();
	else res.redirect('/login');
}