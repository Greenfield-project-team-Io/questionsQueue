import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';

import QueueComponent from './QueueComponent.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';

const putRequest = (question) =>
  fetch('/api/questions', {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });

class App extends React.Component {
  constructor(props) {
    super(props);


    // Parse cookie to set up a user object with user's name and role
    const user = {};
    document.cookie.split(';').forEach((str) => {
      const [k, v] = str.split('=').map(s => s.trim());
      if (k === 'username' || k === 'role') {
        user[k] = v;
      }
    });

    this.state = {
      questions: [],
      user,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleAndwered = this.handleAnswered.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  getQuestions() {
    const props = this.props;
    fetch('/api/questions', { credentials: 'include' })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          // props.login(() => {});
          return res.json();
        } else if (res.status === 403) {
          this.props.logout(() => {});
          return null;
        }
      })
      .then(json => this.setState({ questions: json }))
      .catch(err => {
        console.error(err);
        // props.logout(() => {});
      });
  }
  handleSubmit(text) {
    fetch('/api/questions', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, username: this.state.user.username }),
    });
  }
  handleUpvote(question) {
    const q = question;
    q.votes += 1;
    q.usersVoted.push(this.state.user.username);
    putRequest(question)
      .catch((err) => {
        console.error(err);
        q.votes -= 1;
      });
  }
  handleAnswered(question) {
    const q = question;
    q.answered = true;
    putRequest(question)
      .catch((err) => {
        console.error(err);
        q.answered = false;
      });
  }
  handleDelete(question) {
    const _id = question._id;
    console.log(_id);
    fetch('/api/questions', {
      credentials: 'include',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });
  }
  handleEdit(question) {
    const q = question;
    const preText = q.questionText;
    const editedText = prompt('Edit Your Question Here..', preText);
    if (editedText !== null && editedText!== "" && preText !== editedText) {
      q.questionText = editedText;
      putRequest(question)
        .catch((err) => {
          console.error(err);
        });
    }
  }
  componentDidMount() {
    this.getQuestions();
    this.interval = setInterval(() => this.getQuestions(), 2000);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Question Queue" showMenuIconButton={false}
            iconElementRight={
              <FlatButton label="Log Out"
                href="/auth/logout"
                />
            }
            />
          <QuestionFormComponent handleSubmit={this.handleSubmit} />
          <QueueComponent
            title="Pending Questions"
            expanded={true}
            questions={this.state.questions.filter(q => !q.answered)}
            handleUpvote={this.handleUpvote}
            handleAnswered={this.handleAnswered}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            user={this.state.user}
            />
          <QueueComponent
            title="Answered Questions"
            expanded={false}
            questions={this.state.questions.filter(q => q.answered)}
            handleDelete={this.handleDelete}
            user={this.state.user}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
