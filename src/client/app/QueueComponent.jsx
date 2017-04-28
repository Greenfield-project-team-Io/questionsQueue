import React from 'react';
import QuestionComponent from './QuestionComponent.jsx';

const QueueComponent = function (props) {
  const questions = props.questions.map(q => {
    return <QuestionComponent question={q} key={q.id} />;
  });
  return (
    <div>
      This is a queue component
      {questions}
    </div>
  );
};

export default QueueComponent;
