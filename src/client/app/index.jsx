import React from 'react';
import {render} from 'react-dom';

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
    this.getQuestions = this.getQuestions.bind(this);
  }
  getQuestions() {
    fetch('/api/questions')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        /* I'm assuming the JSON is just an array. Modify this if that is not the case.
         */
        this.setState({
          questions: json,
        });
      })
    ;
  }
  componentDidMount() {
    /*
     * Make a GET request to /api/questions and populate this.state.questions with the response data (using setState?)
     */
     this.getQuestions();
  }
  render () {
    return (
      <div>
        <h1>
          Questions Queue
        </h1>
        <QuestionFormComponent />
        <h2>Pending Questions</h2>
        <QueueComponent questions={this.state.questions.filter(q => !q.answered)} />
          <h2>Answered Questions</h2>
          <QueueComponent questions={this.state.questions.filter(q => q.answered)} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
