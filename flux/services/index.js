'use strict';

const request = require('superagent');
const apiUrl = process.env.API_URL;

const { places, users } = require('./dummy-data');

module.exports.getVideos = function(payload, cb) {
  request
    .get(apiUrl + '/videos')
    .end(function(err, res) {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || []);
    });
};

module.exports.getVideoDetails = function(payload, cb) {
  request
    .get(apiUrl + '/videos/' + payload.params.id)
    .end(function(err, res) {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

module.exports.getSession = function(user, cb) {
  if (user) return setImmediate(cb.bind(null, null, user));

  request
    .get(apiUrl + '/session')
    .end(function(err, res) {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

module.exports.signUp = function(payload, cb) {
  request
    .post(apiUrl + '/signup')
    .send({
      email: payload.email,
      password: payload.password
    })
    .end(function(err, res) {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

module.exports.logIn = function(payload, cb) {
  request
    .post(apiUrl + '/session')
    .send({
      email: payload.email,
      password: payload.password
    })
    .end(function(err, res) {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

module.exports.logOut = function(payload, cb) {
  request
    .del(apiUrl + '/session')
    .end(function(err, res) {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};
