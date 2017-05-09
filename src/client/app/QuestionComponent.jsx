import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText, CardHeader } from 'material-ui/Card';
import { grey200 } from 'material-ui/styles/colors';
import TagArray from './TagArray.jsx';
import EditComponent from './EditComponent.jsx';
import CodeToggle from './CodeToggle.jsx';

const QuestionComponent = (props) => {
  const question = props.question;
  const user = props.user;

  const upVoteBtn = question.usersVoted.includes(user.username) ? (
    <FlatButton onClick={() => props.handleDownvote(question)}
      label="Voted"
      style={{ backgroundColor: '#e0e0e0' }}
      key={'vote'}
      />
  ) : (
    <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" key={'vote'}/>
  );
  const answerBtn = <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" key={'answer'}/>;
  const deleteBtn = <FlatButton onClick={() => props.handleDelete(question)} label={'delete'} key="delete"/>;
  const editBtn = <EditComponent question={question} handleEdit={props.handleEdit} key={'edit'}/>;

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

  const snippet = question.codeSnippet ? (
      <CodeToggle codeSnippet={question.codeSnippet}
      readOnly='nocursor' />
    ) : null;

  const date = new Date(question.createdAt);
  return (
      <Card className="question" initiallyExpanded={false}>

        <CardText className="question-card-content">
        <div className="question-body">
          {question.questionText.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br/></span>
          ))}
        </div>
        {snippet}
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

export default QuestionComponent;
