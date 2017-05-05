import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

// Maybe we shouldn't check if they're logged in here. This could be done in the router.
const LoginComponent = props => (
  props.loggedIn ? (
    <Redirect to="/questions" />
  ) : (
    <MuiThemeProvider>
      <div styles= "background-color: blue">
        <AppBar title="Question Queue" showMenuIconButton={false}
          iconElementRight={
            <FlatButton label="Log In" href="/auth/github"/>
          }
          />
        </div>
      </MuiThemeProvider>
  )
);
export default LoginComponent;
