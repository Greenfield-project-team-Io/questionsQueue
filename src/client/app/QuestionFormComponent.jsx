import React from 'react';

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
      <form onSubmit={this.handleSubmit}>
        <textarea name="questionText" ref="textBox" onChange={this.handleInputChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default QuestionFormComponent;
