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
      loggedIn: false,
    };
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> auth in progress
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleAndwered = this.handleAnswered.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  getQuestions() {
    fetch('/api/questions', { credentials: 'include' })
      .then(res => res.json())
      .then(json => this.setState({ questions: json }));
  }
  handleSubmit(text) {
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    .then(question => this.setState((prevState) => {
      prevState.questions.push(question);
      return {
        question: prevState.questions,
      };
    },
  ));
<<<<<<< HEAD
=======
>>>>>>> auth in progress
>>>>>>> auth in progress
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
            component={App}
            logout={this.logout.bind(this)}
            />
          <Route path="/login" render={() => (
            <LoginComponent
              name="Leo"
              login={this.login.bind(this)}
              loggedIn={this.state.loggedIn} />
          )}/>
          </div>
      </Router>
    );
  }
}

render(<Main />, document.getElementById('app'));
