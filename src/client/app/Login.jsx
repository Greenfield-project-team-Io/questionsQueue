import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Maybe we shouldn't check if they're logged in here. This could be done in the router.
const LoginComponent = props => (
  props.loggedIn ? (
    <Redirect to="/questions" />
  ) : (
    <a href="/auth/github">
      Log in with github
    </a>
    // <button onClick={() => {
    //   props.login(() => {});
    // }}>Log In {props.name}</button>
  )
);
export default LoginComponent;
