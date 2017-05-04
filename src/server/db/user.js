const db = require('./db-config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  cohort: String,
  avatarURL: String,
});

module.exports = mongoose.model('User', userSchema);
