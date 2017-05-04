const Question = require('./db/db-schema');

exports.getQuestions = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) res.status(404).send(err);
    else res.status(200).send(questions);
  });
};

exports.postQuestion = (req, res) => {
  const newQuestion = new Question({
    questionText: req.body.text,
    votes: 0,
    answered: false,
  });
  newQuestion.save((err, question) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(question);
  });
};

exports.updateQuestion = (req, res) => {
  const id = req.body._id;
  Question.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
    if (err) res.status(500).send(err);
    res.send(data);
  });
};

exports.deleteQuestion = (req, res) => {
  Question.findByIdAndRemove(req.body)
  .then(() => res.status(202).send());
};
