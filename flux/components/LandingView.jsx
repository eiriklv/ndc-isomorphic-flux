const React = require('react');
const DocumentTitle = require('react-document-title');
const { Link } = require('react-router');

const LandingView = React.createClass({
  render() {
    return (
      <DocumentTitle title={'Landing'}>
        <div className='section'>
          <div className='container'>
            <h3 className='section-heading'>{'NDC Video Web-app'}</h3>
            <p className='section-description'>{'Wanna see all the videos?'}</p>
            <Link
              className='button button-primary'
              to='videos'
            >
              {'Enter here!'}
            </Link>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = LandingView;
