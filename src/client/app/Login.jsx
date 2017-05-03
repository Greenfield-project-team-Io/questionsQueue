import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// const LoginComponent = props => (
//     <button onClick={() => {
//       props.login(() => {});
//     }}>Log In</button>
// );

// Maybe we shouldn't check if they're logged in here. This could be done in the router.
const LoginComponent = props => (
  props.loggedIn ? (
    <Redirect to="/questions" />
  ) : (
    <button onClick={() => {
      props.login(() => {});
    }}>Log In</button>
  )
);
export default LoginComponent;
