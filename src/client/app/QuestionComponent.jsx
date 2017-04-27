import React from 'react';

const QuestionComponent = function(props) {
  return (
    <div>
      <div>{props.question.questionText}</div>
      <div>Votes: {props.question.votes}</div>
      <button>Vote</button>
      <button>Clear</button>
    </div>
  );
};

export default QuestionComponent;
