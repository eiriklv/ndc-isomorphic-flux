'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');

const VideoDetailsView = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      picture: React.PropTypes.string.isRequired
    })
  },

  getDefaultProps() {
    return {
      description: ''
    };
  },

  render() {
    return (
      <DocumentTitle title={this.props.data.name}>
        <div className='place-details-box'>
          <h2>{this.props.data.name}</h2>
          <img src={this.props.data.picture}/>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = VideoDetailsView;
