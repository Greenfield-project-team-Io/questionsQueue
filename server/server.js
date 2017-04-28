/*
[x] set up server
[x] serve static files
[] connect to DB
[] configure middleware & routing
[x] handle GET for previously asked questions
[x] handle POST for new questions
[] handle PUT
*/

const express = require('express');
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname, + '../src/client'))
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))

// ==========

//Set up default mongoose connection
var mongoDB = '';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

// ==========

// configure server with all the middleware & routing, if necessary

// ==========

app.get('/api/questions', (req, res) => {
  console.log('GET req received');
  // request all question data form DB, send data in response
  Question.find({}, (err, questions) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.send(err);
    } else {
      res.status(200).res.send(questions);
    }
  })
});

app.post('/api/questions', (req, res) => {
  console.log('POST req received');
  // add new questions to the DB
  let newQuestion = new Question(req.body.data)
  });
  newQuestion.save(err, question) => {
    if (err) {
      console.log('ERRROR!', err);
      res.status(500).res.send(err);
    }
  } else {
    res.status(200).res.send();
  }

  // Question.findById(id, function (err, question) {
  //   if (err) return handleError(err);
  //
  //   question.text = 'req.body.data';
  //   question.save(function (err, updatedQuestion) {
  //     if (err) return handleError(err);
  //     res.send(updatedQuestion);
  //   });
  // });

  app.put('/api/questions', err, data) => {
    console.log('POST req received');

    Question.findByIdAndUpdate(id, { $set: { text: 'req.body.data' }}, { new: true }, function (err, data) {
      if (err) return handleError(err);
      res.send(data);
  }
});

// set app to listen for any changes on a specific port
app.listen(port, () => {
  console.log('Listening to port...' + port);
});
