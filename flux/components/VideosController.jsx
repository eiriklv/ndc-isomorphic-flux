const React = require('react');
const DocumentTitle = require('react-document-title');
const { RouteHandler } = require('react-router');

const NavigationController = require('./NavigationController.jsx');
const Header = require('./Header.jsx');
const Footer = require('./Footer.jsx');

const VideosController = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo(transition, params, query, done) {
      if (!transition.context.shouldUpdate) return done();
      
      transition.context.Actions.PopulateVideosData({
        params: params,
        query: query
      }, done);
    }
  },

  render() {
    return (
      <DocumentTitle title={this.props.State.App.title}>
        <div className='HolyGrail'>
          <Header
            title={this.props.State.App.title}
          />
          <main className='row'>
            <nav className='three columns'>
              <NavigationController
                State={this.props.State}
              />
            </nav>
            <article className='nine columns'>
              <RouteHandler
                State={this.props.State}
              />
            </article>
          </main>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = VideosController;
