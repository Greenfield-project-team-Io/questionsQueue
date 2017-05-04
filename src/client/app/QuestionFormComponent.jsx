import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Syntax from 'syntax';

class QuestionFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
      codeSnippet: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.questionText, this.state.codeSnippet);
    this.setState({
      questionText: '',
      codeSnippet: '',
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
            </div>
          <RaisedButton type="submit" disabled={!this.state.questionText} label="Submit" />
        </form>
      </Paper>
    );
  }
}

export default QuestionFormComponent;
