import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
// import Syntax from 'syntax';
import AutoComplete from 'material-ui/AutoComplete';
import TagArray from './components/TagArray.jsx';
import TagBar from './components/TagBar.jsx';

const allTags = ['Node', 'Express', 'React', 'Angular', 'Closures', 'Promises'];

class QuestionFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
      codeSnippet: '',
      tagText: '',
      allTags,
      appliedTags: [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'JQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'ReactJS' },
      ],
      nextTagKey: 4,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagAdd = this.handleTagAdd.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleTagAdd(label) {
    const appliedTags = this.state.appliedTags;
    const key = this.state.nextTagKey || 0;
    appliedTags.push({ key, label });
    this.setState({ appliedTags, nextTagKey: key + 1 });
  }

  handleTagDelete(key) {
    const appliedTags = this.state.appliedTags;
    const tagToDelete = appliedTags.map(tag => tag.key).indexOf(key);
    appliedTags.splice(tagToDelete, 1);
    this.setState({ appliedTags });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.questionText, this.state.codeSnippet);
    this.setState({
      questionText: '',
      codeSnippet: '',
      tagText: '',
      appliedTags: [],
    });
  }

  render() {
    return (
      <Paper className="question-form" >
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              name="questionText"
              className="question-text-form"
              fullWidth={true}
              value={this.state.questionText}
              multiLine={true}
              floatingLabelText="Ask a question..."
              onChange={this.handleInputChange} />
            <TextField
              name="codeSnippet"
              className="code-text-form"
              fullWidth={true}
              value={this.state.codeSnippet}
              multiLine={true}
              floatingLabelText="Add a code snippet (optional)"
              onChange={this.handleInputChange} />
            <AutoComplete
              floatingLabelText="Add tags..."
              filter={AutoComplete.fuzzyFilter}
              dataSource={allTags}
              value={this.state.tagText}
              onNewRequest={chosenRequest => this.handleTagAdd(chosenRequest)}
              maxSearchResults={5}
              onChange={this.handleInputChange}
            />
            <TagArray
              tags={this.state.appliedTags}
              handleTagDelete={this.handleTagDelete}
            />
            </div>
          <RaisedButton type="submit" disabled={!this.state.questionText} label="Submit" />
        </form>
      </Paper>
    );
  }
}

export default QuestionFormComponent;
