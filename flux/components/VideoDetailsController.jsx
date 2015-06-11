const React = require('react');
const Router = require('react-router');
const DocumentTitle = require('react-document-title');
const NotFoundView = require('./NotFoundView.jsx');
const LoadingView = require('./LoadingView.jsx');
const VideoDetailsView = require('./VideoDetailsView.jsx');

const VideoDetailsController = React.createClass({
  contextTypes: {
    RouterState: React.PropTypes.object.isRequired,
    Flux: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo(transition, params, query, done) {
      if (!transition.context.shouldUpdate) return done();
      
      transition.context.Actions.PopulateSelectedVideoData({
        params: params,
        query: query
      }, done);
    }
  },

  render() {
    if (this.props.State.VideoDetails.notFound) {
      return <NotFoundView/>;
    }
    
    if (this.props.State.VideoDetails.isLoading) {
      return <LoadingView/>;
    }

    return (
      <VideoDetailsView
        data={{
          name: this.props.State.VideoDetails.data.name,
          description: this.props.State.VideoDetails.data.description,
          id: this.props.State.VideoDetails.data.id,
          picture: this.props.State.VideoDetails.data.pictures.sizes[3].link
        }}
      />
    );
  }
});

module.exports = VideoDetailsController;
