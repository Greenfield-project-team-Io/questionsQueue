const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const morgan = require('morgan');

app.use(bodyParser.json());
app.use(express.static('./src/client'));

app.get('/api/questions', (req, res) => {
  console.log('GET request at /api/questions');
  const dummyQuestions = [
    {
      id: 1,
      questionText: 'Does the GET request work?',
      votes: 0,
      answered: true,
      createdAt: Date.now()
    },
    {
      id: 2,
      questionText: 'What is an API?',
      votes: 1,
      answered: false,
      createdAt: Date.now()
    },
    {
      id: 3,
      questionText: 'Why are you building your project in React?',
      votes: 15,
      answered: false,
      createdAt: Date.now()
    },
  ];
  res.status(200).send(dummyQuestions);
})

app.listen(process.env.PORT || 8080);
