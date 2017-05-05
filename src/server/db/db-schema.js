const db = require('./db-config');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  votes: Number,
  answered: Boolean,
  username: { type: String, required: true },
  usersVoted: [String],
  // timestamps: { createdAt: 'created_at' },
});

// exporting the questionQueue schema with questionQueue instance
module.exports = mongoose.model('Question', questionSchema);
