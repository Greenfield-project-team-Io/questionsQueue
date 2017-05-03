// "use-strict";

/*
[x] set up server
[x] serve static files
[x] connect to DB
[x] handle GET for previously asked questions
[x] handle POST for new questions
[x] handle PUT for manipulating stored questions
[] configure middleware & routing
*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Question = require('./src/db/db-schema');
const morgan = require('morgan');

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'src/client')));

app.get('/api/questions', (req, res) => {
  // request all question data form DB, send data in response
  Question.find({}, (err, questions) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.status(200).send(questions);
    }
  });
});

app.post('/api/questions', (req, res) => {
  // add new questions to the DB
  const newQuestion = new Question({
    questionText: req.body.text,
    votes: 0,
    answered: false,
  });

  newQuestion.save((err, question) => {
    if (err) {
      console.log('ERRROR!', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(question);
    }
  });
});

app.put('/api/questions', (req, res) => {
  const id = req.body._id;
  // make edits to stored questions, return new version
  Question.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
    if (err) console.error(err);
    res.send(data);
  });
});

app.delete('/api/questions', (req, res) => {
  Question.findByIdAndRemove(req.body)
  .then(() => res.status(202).send());
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
