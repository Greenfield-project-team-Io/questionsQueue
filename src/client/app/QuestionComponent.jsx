import React from 'react';

const QuestionComponent = function(props) {
  const question = props.question;
  return (
    <div>
      <div>{question.questionText}</div>
      <div>Votes: {question.votes}</div>
      <div>Asked on {Date(question.createdAt)}</div>
      <button onClick={() => props.handleUpvote(question)}>Vote</button>
      <button>Clear</button>
    </div>
  );
};

export default QuestionComponent;
