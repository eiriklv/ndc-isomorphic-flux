module.exports = function(context, payload, done=(()=>{})) {
  context.Services.logIn(payload, (err, result) => {
    if (err) {
      context.Dispatcher.emit('ADD_ALERT', err);
      return done();
    }

    if (result.info) {
      context.Dispatcher.emit('ADD_ALERT', result.info);
    }

    if (result.user) {
      context.Dispatcher.emit('SET_USER_AS_LOGGED_IN', result);
      context.Dispatcher.emit('DISMISS_ALL_ALERTS');
      context.Router.transitionTo('/videos');
    } else {
      context.Dispatcher.emit('SET_USER_AS_LOGGED_OUT');
    }

    done();
  });
};
