import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { grey200 } from 'material-ui/styles/colors';
import TagArray from './TagArray.jsx';
// import QuestionModifyComponent from './QuestionModifyComponent.jsx';

const QuestionComponent = (props) => {
  const question = props.question;
  const user = props.user;

  const upVoteBtn = question.usersVoted.includes(user.username) ? (
    <FlatButton onClick={() => props.handleDownvote(question)}
      label="Voted"
      style={{ backgroundColor: '#e0e0e0' }}
      />
  ) : (
    <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" />
  );
  const answerBtn = <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" />;
  const deleteBtn = <FlatButton onClick={() => props.handleDelete(question)} label="Delete" />;
  const editBtn = <FlatButton onClick={() => props.handleEdit(question)} label="Edit" />;

  const buttons = [
    !question.answered
      ? upVoteBtn : null,
    user.username === question.username ||
      user.role === 'admin'
      ? editBtn : null,
    user.username === question.username ||
      user.role === 'admin'
      ? deleteBtn : null,
    user.role === 'admin'
      ? answerBtn : null,
  ];

  const tags = user.username === question.username || user.role === 'admin' ? (
    <TagArray tags={question.tags}
      question={question}
      handleTagDelete={props.handleTagDelete}
      />
  ) : (
    <TagArray tags={question.tags}
      question={question}
      />
  );
  const date = new Date(question.createdAt);
  return (
      <Card className="question">
        <CardText className="question-card-content">
        <div className="question-body">
          {question.questionText.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br/></span>
          ))}
        </div>
        {question.codeSnippet ? (
          <div className="question-snippet">
          {question.codeSnippet.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br/></span>
          ))}
          </div>) : null}
        <div className="tag-bar">{tags}</div>
        <div className="question-info-bar">
          <span className="votes-span">Votes: {question.votes}</span>
          <span className="timestamp-span">
            Asked on {`${months[date.getMonth()]} ${date.getDate()}`}
            </span>
        </div>
        </CardText>
        <CardActions>
          {buttons}
        </CardActions>
      </Card>
  );
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// <div>Tags: <TagArray tags={question.tags} /></div>
export default QuestionComponent;
