const React = require('react');
const { Link } = require('react-router');
const truncate = require('truncate');

const NavigationView = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      videos: React.PropTypes.array.isRequired,
      apiUrl: React.PropTypes.string.isRequired,
      serverRedirect: React.PropTypes.string.isRequired
    }),
    actions: React.PropTypes.shape({
      attemptLogout: React.PropTypes.func.isRequired
    })
  },

  attemptLogout(e) {
    e.preventDefault();
    this.props.actions.attemptLogout();
  },

  render() {
    let videoLinks = this.props.data.videos.map((video) => {
      return (
        <li key={'video-' + video.id}>
          <Link className='button button-primary' style={{width: '250px', overflow: 'hidden'}} to='video-details' params={{ id: video.id }}>
            {truncate(video.name, 25)}
          </Link>
        </li>
      );
    });

    return (
      <ul className='nav-list'>
        <li key='index'>
          <Link className='button' to='index'>
            Index
          </Link>
        </li>

        {videoLinks}

        <li key='landing'>
          <Link className='button' to='landing'>
            Back to landing
          </Link>
        </li>

        <form
          method='POST'
          action={this.props.apiUrl + '/session?_method=DELETE&' + this.props.serverRedirect}
        >
          <input
            onClick={this.attemptLogout}
            type='submit'
            value='Log out'
          />
        </form>
      </ul>
    );
  }
});

module.exports = NavigationView;
