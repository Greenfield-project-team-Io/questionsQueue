import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import TagArray from './TagArray.jsx';
// import QuestionModifyComponent from './QuestionModifyComponent.jsx';

const QuestionComponent = (props) => {
  const question = props.question;
  let buttons = <div><FlatButton onClick={() => props.handleDelete(question)} label="Delete" /></div>;
  if (!question.answered) {
    buttons = (
      <div>
        <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" />
        <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" />
        <FlatButton onClick={() => props.handleDelete(question)} label="Delete" />
        <FlatButton onClick={() => props.handleEdit(question)} label="Edit" />
      </div>

    );
  }
  // console.log(question.questionText);
  const lineBreak = question.questionText.replace('/n', '<br />');
  return (
      <Card className="question">
        <CardText>
        {lineBreak.split('\n').map((question, idx) => {
          return <span key={idx}>{question}<br/></span>
        })}
        <div>Code: {question.codeSnippet}</div>
        <div>Votes: {question.votes}</div>
        <div>Asked on {question.createdAt}</div>
        <div>Tags: <TagArray tags={question.tags} /></div>
        </CardText>
        <CardActions>
          {buttons}
        </CardActions>
      </Card>
  );
};

// <div>Tags: <TagArray tags={question.tags} /></div>
export default QuestionComponent;
