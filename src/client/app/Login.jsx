import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Maybe we shouldn't check if they're logged in here. This could be done in the router.

// var divStyle = {
//   resizeMode: 'stretch',
//   // WebkitTransition: 'all', // note the capital 'W' here
//   // msTransition: 'all' // 'ms' is the only lowercase vendor prefix
// };
// <img src='../images/hack-reactor-logo.png'></img>
  // <a href="/auth/github" class="button">Sign In</a>
  // <p>You are not signed in.</p>
const LoginComponent = props => (
  props.loggedIn ? (
    <Redirect to="/questions" />
  ) : (
    <div>
      <MuiThemeProvider>
      <AppBar title="Question Queue" showMenuIconButton={false}
        iconElementRight={
          <FlatButton label="Log In" href="/auth/github"/>
        }
      />
      </MuiThemeProvider>
        <img src='../images/loginBack.png'></img>
    </div>
  )
);
export default LoginComponent;
