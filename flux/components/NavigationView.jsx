const React = require('react');
const { Link } = require('react-router');

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
    let links = this.props.data.videos.map((video) => {
      return (
        <li key={'video-' + video.id}>
          <Link to='video-details' params={{ id: video.id }}>
            {video.name}
          </Link>
        </li>
      );
    });

    return (
      <ul className='master'>
        {links}
        <Link to='index'>
          <small>(back to index)</small>
        </Link>
        <br />
        <Link to='landing'>
          <small>(landing)</small>
        </Link>
        <br />

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
