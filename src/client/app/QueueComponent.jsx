import React from 'react';
import QuestionComponent from './QuestionComponent.jsx';

const QueueComponent = (props) => {
  const questions = props.questions.map(q => (
      <QuestionComponent question={q} key={q._id}
        handleUpvote={props.handleUpvote}
        handleAnswered={props.handleAnswered}
        handleDelete={props.handleDelete}
        />
    ));
  return (
    <div>
      This is a queue component
      {questions}
    </div>
  );
};

export default QueueComponent;
