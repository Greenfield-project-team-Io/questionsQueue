const mongoose = require('mongoose');
const password = require('../../../credentials');

mongoose.connect(`mongodb://io:${password}@ds123311.mlab.com:23311/questionsqueue`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});

module.exports = db;
