import React from 'react';
import { render } from 'react-dom';

import QueueComponent from './QueueComponent.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';

const putRequest = (question) => {
  return fetch('/api/questions', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });
};

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
  }
  getQuestions() {
    fetch('/api/questions')
      .then(res => res.json())
      .then((json) => {
        this.setState({
          questions: json,
        });
      })
    ;
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
  componentDidMount() {
    this.getQuestions();
    this.interval = setInterval(() => {
      this.getQuestions();
    }, 2000);
  }
  render() {
    return (
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
          />
          <h2>Answered Questions</h2>
          <QueueComponent questions={this.state.questions.filter(q => q.answered)} />
      </div>
    );
  }
  handleSubmit(text) {
    fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: text,
      }),
    });
  }
}

render(<App />, document.getElementById('app'));
