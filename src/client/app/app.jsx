import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar'

import QueueComponent from './QueueComponent.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';

const putRequest = (question) =>
  fetch('/api/questions', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });

class App extends React.Component {
  constructor(props) {
    super(props);

    // This fixes an error of 'Unknown prop `onTouchTap`...' when using
    // expandable cards.
    // injectTapEventPlugin();

    this.state = {
      questions: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleAndwered = this.handleAnswered.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  getQuestions() {
    fetch('/api/questions', {})
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.props.logout(() => {});
          return null;
        }
      })
      .then(res => res.json())
      .then(json => this.setState({ questions: json }));
  }
  handleSubmit(text) {
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  }
  handleUpvote(question) {
    const q = question;
    q.votes += 1;
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
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });
  }
  componentDidMount() {
    this.getQuestions();
    this.interval = setInterval(() => this.getQuestions(), 2000);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Question Queue" showMenuIconButton={false} />
          <QuestionFormComponent handleSubmit={this.handleSubmit} />
          <QueueComponent
            title="Pending Questions"
            expanded={true}
            questions={this.state.questions.filter(q => !q.answered)}
            handleUpvote={this.handleUpvote}
            handleAnswered={this.handleAnswered}
            handleDelete={this.handleDelete}
            />
          <QueueComponent
            title="Answered Questions"
            expanded={false}
            questions={this.state.questions.filter(q => q.answered)}
            handleDelete={this.handleDelete}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
