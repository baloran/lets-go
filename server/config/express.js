/**
 * Let's Go
 * 2015
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var moment = require('moment');
var bodyParser = require('body-parser');

module.exports = function (app) {

    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.locals.format = function (date) {
        return moment(date).format('L');
    }

    // Session
    app.use(session({
        secret: 'thegreatescape'
    }));

    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../../public')));

    // app.use(function(req, res, next) {
    //     res.render('404', {
    //         title: "404",
    //         err: "Not found"
    //     });
    // });

    app.use(function(req, res, next) {
        req.active = req.path.split('/')[1] // [0] will be empty since routes start with '/'
        next();
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
