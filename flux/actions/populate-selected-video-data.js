module.exports = function(context, payload, done=(()=>{})) {
  context.Dispatcher.emit('SET_SELECTED_VIDEO_AS_LOADING');

  // check if the video/data requested already exists in
  // the videos store and fetch it from there. If not,
  // fetch directly from the database
  let videos = context.Stores.Videos.getState().data || [];

  let video = videos.reduce((res, cur) => {
    if (cur.id === payload.params.id) res.push(cur);
    return res;
  }, [])[0];

  if (video) {
    context.Dispatcher.emit('POPULATE_SELECTED_VIDEO_DATA', video);
    return done();
  }

  context.Services.getVideoDetails({
    params: payload.params,
    query: payload.query,
    userId: context.User ? context.User.id : null
  }, (err, video) => {
    if (err || !video) {
      context.Dispatcher.emit('SET_SELECTED_VIDEO_AS_NOT_FOUND');
      context.Dispatcher.emit('ADD_ALERT', err);
      return done();
    }

    context.Dispatcher.emit('POPULATE_SELECTED_VIDEO_DATA', video);
    done();
  });
};
