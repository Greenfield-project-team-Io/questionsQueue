import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';

const QuestionComponent = (props) => {
  const question = props.question;
  let buttons = <div><FlatButton onClick={() => props.handleDelete(question)} label="Delete" /></div>;
  if (!question.answered) {
    buttons = (
      <div>
        <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" />
        <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" />
        <FlatButton onClick={() => props.handleDelete(question)} label="Delete" />
      </div>
    );
  }
  return (
      <Card className="question">
        <CardText>
          {question.questionText}
        <div>Votes: {question.votes}</div>
        <div>Asked on {Date(question.createdAt)}</div>
        </CardText>
        <CardActions>
          {buttons}
        </CardActions>
      </Card>
  );
};

export default QuestionComponent;
