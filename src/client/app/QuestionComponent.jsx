import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
<<<<<<< HEAD
// import QuestionModifyComponent from './QuestionModifyComponent.jsx';
=======
>>>>>>> Merge onto dev

const QuestionComponent = (props) => {
  const question = props.question;
  let buttons = <div><FlatButton onClick={() => props.handleDelete(question)} label="Delete" /></div>;
  if (!question.answered) {
    buttons = (
      <div>
        <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" />
        <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" />
        <FlatButton onClick={() => props.handleDelete(question)} label="Delete" />
<<<<<<< HEAD
        <FlatButton onClick={() => props.handleEdit(question)} label="Edit" />
=======
>>>>>>> Merge onto dev
      </div>

    );
  }
  return (
<<<<<<< HEAD
      <Card className="question">
        <CardText>
          {question.questionText}
        <div>Votes: {question.votes}</div>
        <div>Asked on { Date("createdAt": 'created_at') }</div>
=======
    <div style={{ margin: '10px' }}>
      <Card>
        <CardText>
          {question.questionText}
        <div>Votes: {question.votes}</div>
        <div>Asked on {Date(question.createdAt)}</div>
>>>>>>> Merge onto dev
        </CardText>
        <CardActions>
          {buttons}
        </CardActions>
      </Card>
<<<<<<< HEAD
=======
    </div>
>>>>>>> Merge onto dev
  );
};

export default QuestionComponent;
