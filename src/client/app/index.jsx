import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import AuthExample from './Routes.jsx';
import LoginComponent from './Login.jsx';
import App from './app.jsx';

// const fakeAuth = {
//   loggedIn: false,
//   authenticate(cb) {
//     this.loggedIn = true;
//     setTimeout(cb, 100);
//   },
//   signout(cb) {
//     this.loggedIn = false;
//     setTimeout(cb, 100);
//   },
// };

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }
  login(cb) {
    /*
     *setState is async, so place callback in an anonymous function?
     */
    this.setState({
      loggedIn: true,
    });
    cb();
  }
  logout(cb) {
    this.setState({
      loggedIn: false,
    });
    this.getQuestions();
  }
    cb();
  }
  render() {
    console.log(this.state.loggedIn);
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            this.state.loggedIn ? (
              <Redirect to="/questions" />
            ) : (
              <Redirect push to="/login" />
            )
          )} />
          <Route path="/questions"
            render={ () => (
              this.state.loggedIn ? (
                <App logout={this.logout}
                  login={this.login}
                />
              ) : (
                <Redirect to="/" />
              )
            )
          }
            />
          <Route path="/login" render={() => (
            <LoginComponent
              login={this.login}
              loggedIn={this.state.loggedIn} />
          )}/>
          </div>
      </Router>
    );
  }
}

injectTapEventPlugin();
render(<Main />, document.getElementById('app'));
