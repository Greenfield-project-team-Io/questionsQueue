import React from 'react';
import { render } from 'react-dom';

import QueueComponent from './QueueComponent.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          questionText: 'What is a question?',
          votes: 0,
          answered: true,
          createdAt: Date.now()
        },
        {
          id: 2,
          questionText: 'Why is the sky blue?',
          votes: 1,
          answered: false,
          createdAt: Date.now()
        },
        {
          id: 3,
          questionText: 'Why are you building your project in React?',
          votes: 15,
          answered: false,
          createdAt: Date.now()
        }

      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
  }
  getQuestions() {
    fetch('/api/questions')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState({
          questions: json,
        });
      })
    ;
  }
  handleUpvote(question) {
    // increment the count of votes
    question.votes++
    // make a PUT request to /api/questions with the updated question object
    fetch('/api/questions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    })
    // if the request is not successful, decrement the vote count
    .catch((err) => {
      question.votes -= 1;
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
