const db = require('./db-config');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  codeSnippet: String,
  votes: Number,
  answered: Boolean,
  createdAt: Date,
  tags: Array,
});

// exporting the questionQueue schema with questionQueue instance
module.exports = mongoose.model('Question', questionSchema);
