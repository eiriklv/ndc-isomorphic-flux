'use strict';

module.exports = function(context, payload, done=(()=>{})) {
  context.Dispatcher.emit('SET_VIDEOS_AS_LOADING');

  context.Services.getVideos({
    params: payload.params,
    query: payload.query,
    userId: context.User ? context.User.id : null
  }, function(err, videos) {
    if (err || !videos) {
      context.Dispatcher.emit('POPULATE_VIDEOS_DATA', []);
      context.Dispatcher.emit('ADD_ALERT', err);
      return done();
    }
    
    context.Dispatcher.emit('POPULATE_VIDEOS_DATA', videos);
    done();
  });
};
