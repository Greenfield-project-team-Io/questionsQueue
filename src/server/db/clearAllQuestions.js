const Question = require('./db-schema');

Question.remove({}, (err, res) => {
  if (err) console.log(err);
  else console.log('Success: ', res);
});
