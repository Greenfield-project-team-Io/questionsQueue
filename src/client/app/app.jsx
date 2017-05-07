import { remove } from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import QueueComponent from './QueueComponent.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';
import SearchBar from './SearchBar.jsx';


const putRequest = (question) =>
  fetch('/api/questions', {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });

// Update an array of questions to include a modified question.
// Mutates array. Does not return a value.
const updateQuestions = (questions, newQ) => {
  const idx = questions.findIndex(i => i._id === newQ._id);
  questions[idx] = newQ;
};

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
      sortBy: 'createdAt',
      reverseSort: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleAnswered = this.handleAnswered.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.sortMethod = this.sortMethod.bind(this);
    this.handleReverse = this.handleReverse.bind(this);
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
      .then(questions => this.setState({ questions }))
      .catch(err => console.error('error', JSON.stringify(err)));
  }

  // Methods to update questions
  handleSubmit(text, code = null, tags = []) {
    fetch('/api/questions', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        code,
        tags,
        username: this.state.user.username,
      }),
    })
    .then(res => res.json())
    .then((data) => {
      this.setState((prevState) => {
        prevState.questions.push(data);
        return { questions: prevState.questions };
      });
    });
  }
  handleVote(question, n) {
    const q = question;
    q.votes += n;
    if (n === 1) {
      q.usersVoted.push(this.state.user.username);
    } else {
      remove(q.usersVoted, i => i === this.state.user.username);
    }
    putRequest(q)
      .then(res => res.json())
      .then((data) => {
        this.setState((prevState) => {
          const questions = prevState.questions;
          updateQuestions(questions, data);
          return { questions };
        });
      })
      .catch((err) => {
        console.error(err);
        q.votes -= n;
      });
    this.getQuestions();
  }
  handleUpvote(question) {
    this.handleVote(question, 1);
  }
  handleDownvote(question) {
    this.handleVote(question, -1);
  }
  handleAnswered(question) {
    const q = question;
    q.answered = true;
    putRequest(question)
      .then(res => res.json())
      .then((data) => {
        this.setState((prevState) => {
          const questions = prevState.questions;
          updateQuestions(questions, data);
          return { questions };
        });
      })
      .catch((err) => {
        console.error(err);
        q.answered = false;
      });
  }
  handleDelete(question) {
    const _id = question._id;
    fetch('/api/questions', {
      credentials: 'include',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    })
    .then(() => {
      this.setState((prevState) => {
        const questions = prevState.questions;
        remove(questions, (q) => q._id === _id);
        return { questions };
      });
    });
    this.getQuestions();
  }
  handleEdit(question) {
    putRequest(question)
      .then(res => res.json())
      .then((data) => {
        this.setState((prevState) => {
          const questions = prevState.questions;
          updateQuestions(questions, data);
          return { questions };
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleTagDelete(tag, question) {
    const q = question;
    remove(q.tags, t => t === tag);
    putRequest(q)
      .then((res) => {
        if (res.status === 200) {
          this.setState((prevState) => {
            const questions = prevState.questions;
            updateQuestions(questions, q);
            return { questions };
          });
        }
      })
      .catch(err => console.error(err));
  }

  // Search / Sort Methods
  handleSortByChange(sortBy) {
    this.setState({ sortBy });
  }
  sortMethod(a, b) {
    let order = a[this.state.sortBy] - b[this.state.sortBy];
    if (this.state.sortBy === 'votes') order = -order;
    if (this.state.reverseSort) order = -order;
    return order;
  }
  handleReverse() {
    const reverseSort = !this.state.reverseSort;
    this.setState({ reverseSort });
  }

  // Utility
  componentDidMount() {
    this.getQuestions();
    this.interval = setInterval(() => this.getQuestions(), 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
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
          <div className="app-body">
            <QuestionFormComponent
              handleSubmit={this.handleSubmit}
              user={this.state.user}
              />
            <SearchBar
              sortBy={this.state.sortBy}
              handleSortByChange={this.handleSortByChange}
              handleReverse={this.handleReverse}
              />
            <QueueComponent
              title="Pending Questions"
              expanded={true}
              questions={this.state.questions.filter(q => !q.answered && this.filterMethod(q))
                .sort(this.sortMethod)}
              handleUpvote={this.handleUpvote}
              handleDownvote={this.handleDownvote}
              handleAnswered={this.handleAnswered}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              handleTagDelete={this.handleTagDelete}
              user={this.state.user}
              />
            <QueueComponent
              title="Answered Questions"
              expanded={false}
              questions={this.state.questions.filter(q => q.answered && this.filterMethod(q))
                .sort(this.sortMethod)}
              handleDelete={this.handleDelete}
              handleTagDelete={this.handleTagDelete}
              user={this.state.user}
              />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
