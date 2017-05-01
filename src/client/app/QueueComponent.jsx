import React from 'react';
import { Card, CardText, CardHeader, CardTitle } from 'material-ui/Card';
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
    <Card className="queue">
      <CardHeader title={props.title}
        actAsExpander={true}
        showExpandableButton={true}
        />
      <CardText expandable={true}>
        {questions}
      </CardText>
    </Card>
  );
};

export default QueueComponent;
