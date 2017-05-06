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
    this.handleAndwered = this.handleAnswered.bind(this);
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
    this.getQuestions();
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
    this.getQuestions();
  }
  handleEdit(question) {
    const q = question;
    const preText = q.questionText;
    const editedText = prompt('Edit Your Question Here..', preText);
    if (editedText !== null && editedText!== '' && preText !== editedText) {
      q.questionText = editedText;
      putRequest(question)
        .catch((err) => {
          console.error(err);
        });
    }
    console.log(typeof question.createdAt);
  }
  handleTagDelete(tag, question) {
    const q = question;
    const idx = question.tags.indexOf(tag);
    q.tags.splice(idx, 1);
    putRequest(q)
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
            questions={this.state.questions.filter(q => !q.answered).sort(this.sortMethod)}
            handleUpvote={this.handleUpvote}
            handleAnswered={this.handleAnswered}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleTagDelete={this.handleTagDelete}
            user={this.state.user}
            />
          <QueueComponent
            title="Answered Questions"
            expanded={false}
            questions={this.state.questions.filter(q => q.answered)}
            handleDelete={this.handleDelete}
            handleTagDelete={this.handleTagDelete}
            user={this.state.user}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
