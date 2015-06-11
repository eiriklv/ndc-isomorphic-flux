const request = require('superagent');
const urlJoin = require('url-join');

const apiUrl = process.env.API_URL;

module.exports.getVideos = function(payload, cb) {
  request
    .get(urlJoin(apiUrl, '/videos'))
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || []);
    });
};

module.exports.getVideoDetails = function(payload, cb) {
  request
    .get(urlJoin(apiUrl, '/videos/', payload.params.id))
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

module.exports.getSession = function(user, cb) {
  if (user) return setImmediate(cb.bind(null, null, user));

  request
    .get(urlJoin(apiUrl, '/session'))
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

module.exports.signUp = function(payload, cb) {
  request
    .post(urlJoin(apiUrl, '/signup'))
    .send({
      email: payload.email,
      password: payload.password
    })
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

module.exports.logIn = function(payload, cb) {
  request
    .post(urlJoin(apiUrl, '/session'))
    .send({
      email: payload.email,
      password: payload.password
    })
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

module.exports.logOut = function(payload, cb) {
  request
    .del(urlJoin(apiUrl, '/session'))
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};
