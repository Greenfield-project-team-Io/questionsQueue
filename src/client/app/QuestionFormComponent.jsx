import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import TagArray from './TagArray.jsx';

const allTags = ['Node', 'Express', 'React', 'Angular', 'Closures', 'Promises'];

class QuestionFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
      codeSnippet: '',
      allTags: allTags,
      appliedTags: [],
      dialogOpen: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagAdd = this.handleTagAdd.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleTagAdd(tag) {
    const appliedTags = this.state.appliedTags;
    if (appliedTags.includes(tag)) return;
    this.setState({ pendingTag: tag })
    if (!this.state.allTags.includes(tag)) {
      this.openDialog();
      return;
    }
    this.confirmNewTag();
  }

  confirmNewTag() {
    const tag = this.state.pendingTag;
    const appliedTags = this.state.appliedTags;
    appliedTags.push(tag);
    // add tag to list of available tags if not present
    const allTags = this.state.allTags;
    if (!allTags.includes(tag)) allTags.push(tag);
    this.setState({ appliedTags, allTags });
    this.refs.tagBar.setState({ searchText: '' });
  }

  handleTagDelete(tag) {
    const appliedTags = this.state.appliedTags;
    const tagToDelete = appliedTags.indexOf(tag);
    appliedTags.splice(tagToDelete, 1);
    this.setState({ appliedTags });
  }

  openDialog() { this.setState({ dialogOpen: true }); }
  closeDialog() { this.setState({ dialogOpen: false }); }


  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.questionText,
                            this.state.codeSnippet,
                            this.state.appliedTags);
    this.setState({
      questionText: '',
      codeSnippet: '',
      appliedTags: [],
    });
    this.refs.tagBar.setState({ searchText: '' });
  }

  render() {
    // options for dialog pop-up
    // there may be a better place to put these
    const dialogActions = [
      <FlatButton
      label="Cancel"
      onTouchTap={this.closeDialog}
      />,
      <FlatButton
      label="Submit"
      onTouchTap={() => {
        this.confirmNewTag();
        this.closeDialog();
      }}
      primary={true}
      />,
    ];

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
              ref="tagBar"
              floatingLabelText="Add tags..."
              filter={AutoComplete.fuzzyFilter}
              dataSource={allTags}
              onNewRequest={chosenRequest => this.handleTagAdd(chosenRequest)}
              maxSearchResults={5}/>
            <TagArray
              tags={this.state.appliedTags}
              handleTagDelete={this.handleTagDelete} />
            </div>
          <RaisedButton type="submit" disabled={!this.state.questionText} label="Submit" />
        </form>
        <Dialog
        actions={dialogActions}
        modal={false}
        open={this.state.dialogOpen}
        onRequestClose={this.closeDialog}
        >Are you sure you want to create a new tag?</Dialog>
      </Paper>
    );
  }
}

export default QuestionFormComponent;
