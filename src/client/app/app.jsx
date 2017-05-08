import { remove } from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import QueueComponent from './QueueComponent.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';
import SearchBar from './SearchBar.jsx';

<<<<<<< HEAD
const putRequest = (question) =>
=======

const putRequest = question =>
>>>>>>> progress
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
      searchText: '',
      filterBy: 'all',
      snackMessage: '',
      snackbackgroundColor: '#536DFE',
      snackbar: false,
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
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterByChange = this.handleFilterByChange.bind(this);
    this.filterMethod = this.filterMethod.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
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
        return {
          questions: prevState.questions,
          snackMessage: 'Your Question was added to Queue',
          snackbackgroundColor: '#536DFE',
          snackbar: true,
        };
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
    this.setState({
      snackMessage: 'Your Vote Applied !',
      snackbackgroundColor: '#388E3C',
      snackbar: true,
    });
  }
  handleDownvote(question) {
    this.handleVote(question, -1);
    this.setState({
      snackMessage: 'Your Vote Removed !',
      snackbackgroundColor: '#FF7043',
      snackbar: true,
    });
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
          return { questions,
            snackMessage: 'Question cleared and moved to answered Queue',
            snackbackgroundColor: '#18FFFF',
            snackbar: true,
          }
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
        return {
          questions,
          snackMessage: 'Your Question was deleted from Queue',
          snackbackgroundColor: '#E53935',
          snackbar: true,
        };
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
          return { questions,
            snackMessage: 'Your Question was edited and applied to Queue',
            snackbackgroundColor: '#FBC02D',
            snackbar: true,
          };
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

  // Search and Sort Methods
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
  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }
  handleFilterByChange(filterBy) {
    this.setState({ filterBy });
  }
  filterMethod(q) {
    const query = this.state.searchText.toLowerCase();
    if (this.state.filterBy === 'all') {
      const joined = q.questionText + q.codeSnippet + q.tags.join(' ');
      return joined.toLowerCase().includes(query);
    }
    if (this.state.filterBy === 'tags') {
      return q.tags.join(' ').toLowerCase().includes(query);
    }
    return q[this.state.filterBy].toLowerCase().includes(query);
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
  closeSnackbar() {
    this.setState({
      snackbar: false,
      snackMessage: '',
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Question Queue"
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
              reverseSort={this.state.reverseSort}
              handleReverse={this.handleReverse}
              searchText={this.state.searchText}
              handleSearchChange={this.handleSearchChange}
              filterBy={this.state.filterBy}
              handleFilterByChange={this.handleFilterByChange}
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
          <Snackbar
            bodyStyle={{ background: this.state.snackbackgroundColor }}
            open={this.state.snackbar}
            message={this.state.snackMessage}
            autoHideDuration={4000}
            onRequestClose={this.closeSnackbar}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
