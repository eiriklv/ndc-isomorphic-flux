'use strict';

var url = require('url');
var util = require('util');
var config = require('./env');
var debug = require('debug')('app:config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cachebuster = require('./cachebuster');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var methodOverride = require('method-override');

var app = express();

function createSessionStore() {
  var authObject;

  if ('production' == config.get('env')) {
    var parsedUrl = url.parse(config.get('redis.url'));

    authObject = {
      prefix: config.get('redis.session.prefix'),
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      db: config.get('redis.db'),
      pass: parsedUrl.auth ? parsedUrl.auth.split(":")[1] : null,
      secret: config.get('session.secret')
    };

    return new RedisStore(authObject);
  } else {
    return (new session.MemoryStore());
  }
};

module.exports.init = function() {
  app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cookieParser());

  app.use(methodOverride('_method'));

  app.use(session({
    secret: config.get('session.secret'),
    store: createSessionStore(),
    name: config.get('session.key'),
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  var publicPath = path.join(__dirname, '/../public');

  app.use(express.static(publicPath));

  if (app.get('env') === 'production') {
    app.get(
      cachebuster.path,
      cachebuster.remove,
      express.static(publicPath),
      cachebuster.restore
    );
  }

  if (app.get('env') === 'development') {
    require('./dev-tools');

    app.use('/js', function(req, res) {
      res.redirect('http://localhost:3001/js' + req.path);
    });
  }

  return app;
};

module.exports.handleErrors = function(app) {
  app.use(function(err, req, res, next) {
    res.status(500);
    console.log('error handler:', util.inspect(err));
    res.send('<pre>' + err.stack + '</pre>');
  });
}

module.exports.startServer = function(app, port) {
  app.listen(config.get('port'), function() {
    debug('Express ' + config.get('env') + ' server listening on port ' + this.address().port);
  });
};

module.exports.connectToDatabase = function(url) {
  function connect() {
    mongoose.connect(url);
  }

  mongoose.connection.on('open', function(ref) {
    debug('open connection to mongo server.');
  });

  mongoose.connection.on('connected', function(ref) {
    debug('connected to mongo server.');
  });

  mongoose.connection.on('disconnected', function(ref) {
    debug('disconnected from mongo server.');

    debug('retrying connection in 2 seconds..');
    setTimeout(function() {
      connect();
    }.bind(this), 2000);
  });

  mongoose.connection.on('close', function(ref) {
    debug('closed connection to mongo server');
  });

  mongoose.connection.on('error', function(err) {
    debug('error connection to mongo server!');
    debug(err);
  });

  mongoose.connection.on('reconnect', function(ref) {
    debug('reconnect to mongo server.');
  });

  connect();
};
