import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    fetch('/api/questions')
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
          <h1>
            Questions Queue
          </h1>
          <QuestionFormComponent handleSubmit={this.handleSubmit} />
          <h2>Pending Questions</h2>
          <QueueComponent
            questions={this.state.questions.filter(q => !q.answered)}
            handleUpvote={this.handleUpvote}
            handleAnswered={this.handleAnswered}
            handleDelete={this.handleDelete}
            />
          <h2>Answered Questions</h2>
          <QueueComponent questions={this.state.questions.filter(q => q.answered)}
            handleDelete={this.handleDelete}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById('app'));
