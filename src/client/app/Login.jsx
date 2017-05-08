import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// const styles = {
//   uploadButton: {
//     verticalAlign: 'middle',
//   },
//   uploadInput: {
//     cursor: 'pointer',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     right: 0,
//     left: 0,
//     width: '100%',
//     opacity: 0,
//   },
// };

// https://github.com/callemall/material-ui

const LoginComponent = props => (
  props.loggedIn ? (
    <Redirect to="/questions" />
  ) : (
      <MuiThemeProvider>
        <div>
          <AppBar title="Question Queue" showMenuIconButton={false}
            iconElementRight={
              <FlatButton label="Log In" href="/auth/github"/>
            }
          />
          <h1 className='welcomeText'>Welcome to Question Queue!</h1>
          <div style={{margin: 'auto', textAlign: 'center'}}>
            <FlatButton
              style= {{
                // width: '100%',
                margin: '0px auto',

                // border: '2px solid #FF9800',
                // backgroundColor: '#ffd699',
              }}
              href="/auth/github"
              target="_blank"
              label="Login with your GitHub"
              secondary={true}
              icon={ <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50"><path fill-rule="evenodd" clip-rule="evenodd" fill="#181616" d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"/></svg>
                </SvgIcon> }
            />
          </div>
        </div>
      </MuiThemeProvider>
  )
);
export default LoginComponent;
