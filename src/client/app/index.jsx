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
          questionText: 'What is a question?',
          votes: 0,
          answered: false,
          createAt: Date.now()
        }
      ]
    };
  }
  componentDidMount() {
    /*
     * Make a GET request to /api/questions and populate this.state.questions with the response data (using setState?)
     */
  }
  render () {
    return (
      <div>
        <h1>
          Questions Queue
        </h1>
        <QuestionFormComponent />
        <QueueComponent questions={this.state.questions} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
