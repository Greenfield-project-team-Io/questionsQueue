import React from 'react';

class QuestionFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form onSubmit={(event) => {event.preventDefault();this.props.handleSubmit(this.state.questionText)}}>
        <textarea name="questionText" onChange={this.handleInputChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default QuestionFormComponent;
