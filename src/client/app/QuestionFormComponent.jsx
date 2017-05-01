import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';

class QuestionFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
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
    this.props.handleSubmit(this.state.questionText);
    this.setState({
      questionText: '',
    });
    this.refs.textBox.value = '';
  }

  render() {
    return (
      <Paper>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              name="questionText"
              ref="textBox"
              multiLine={true}
              floatingLabelText="Ask a question..."
              onChange={this.handleInputChange} />
            </div>
          <RaisedButton type="submit" label="Submit" />
        </form>
      </Paper>
    );
  }
}

export default QuestionFormComponent;
