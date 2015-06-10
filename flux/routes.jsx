'use strict';

const React = require('react');

const { Route, DefaultRoute, NotFoundRoute } = require('react-router');

const App = require('./components/App.jsx');
const HomeController = require('./components/HomeController.jsx');
const VideosController = require('./components/VideosController.jsx');
const LoginController = require('./components/LoginController.jsx');
const SignUpController = require('./components/SignUpController.jsx');
const LandingView = require('./components/LandingView.jsx');
const IndexView = require('./components/IndexView.jsx');
const VideoDetailsController = require('./components/VideoDetailsController.jsx');
const NotFoundView = require('./components/NotFoundView.jsx');

const routes = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='landing' handler={LandingView} />
    <Route name='login' path='/login' handler={LoginController} />
    <Route name='signup' path='/signup' handler={SignUpController} />
    <Route name='home' handler={HomeController}>
      <NotFoundRoute handler={NotFoundView} />
      <Route name='videos' path='/videos' handler={VideosController}>
        <DefaultRoute name='index' handler={IndexView} />
        <Route name='video-details' path='/videos/:id' handler={VideoDetailsController} />
        <NotFoundRoute name='notfound' handler={NotFoundView} />
      </Route>
    </Route>
    <NotFoundRoute handler={NotFoundView} />
  </Route>
);

module.exports = routes;
