import React from 'react';

const QuestionComponent = (props) => {
  const question = props.question;
  return (
    <div>
      <div>{question.questionText}</div>
      <div>Votes: {question.votes}</div>
      <div>Asked on {Date(question.createdAt)}</div>
      <button onClick={() => props.handleUpvote(question)}>Vote</button>
      <button onClick={() => props.handleAnswered(question)}>Clear</button>
      <button onClick={() => props.handleDelete(question)}>Delete</button>
    </div>
  );
};

export default QuestionComponent;
