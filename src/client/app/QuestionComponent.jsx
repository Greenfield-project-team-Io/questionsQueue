import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
// import QuestionModifyComponent from './QuestionModifyComponent.jsx';


const QuestionComponent = (props) => {
  const question = props.question;
  // let buttons = <div><FlatButton onClick={() => props.handleDelete(question)} label="Delete" /></div>;
  // if (!question.answered) {
  //   buttons = (
  //     <div>
  //       <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" />
  //       <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" />
  //       <FlatButton onClick={() => props.handleDelete(question)} label="Delete" />
  //       <FlatButton onClick={() => props.handleEdit(question)} label="Edit" />
  //     </div>
  //
  //   );
  // }
  const upVoteBtn = <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" />;
  const answerBtn = <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" />;
  const deleteBtn = <FlatButton onClick={() => props.handleDelete(question)} label="Delete" />;
  const editBtn = <FlatButton onClick={() => props.handleEdit(question)} label="Edit" />;

  let buttons;
  console.log(props.user.role)
  if (question.answered) {
    if (props.user.role === 'admin') {
      buttons = [deleteBtn];
    } else {
      buttons = [];
    }
  } else {
    if (props.user.role === 'admin') {
      buttons = [upVoteBtn, answerBtn, deleteBtn, editBtn];
    } else {
      buttons = [upVoteBtn, editBtn];
    }
  }
  // console.log(question.questionText);
  var lineBreak = question.questionText.replace('/n', '<br />');

  return (
      <Card className="question">
        <CardText>
        {lineBreak.split('\n').map((question, idx) => {
          return <span key={idx}>{question}<br/></span>
        })}
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
