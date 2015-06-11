const React = require('react');
const qs = require('qs');

const SignupView = require('./SignupView.jsx');

const apiUrl = process.env.API_URL;
const successRedirect = 'http://localhost:3000/videos';

const SignUpController = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <SignupView
        data={{
          apiUrl: apiUrl,
          alerts: this.props.State.Alerts,
          serverRedirect: qs.stringify({
            redirect: successRedirect
          })
        }}
        actions={{
          attemptSignup: this.context.Flux.Actions.AttemptSignup,
          dismissAlerts: this.context.Flux.Actions.DismissAlerts
        }}
      />
    );
  }
});

module.exports = SignUpController;
