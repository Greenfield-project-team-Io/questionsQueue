const mongoose = require('mongoose');
const config = require('../../../config');

mongoose.connect(`mongodb://${config.user}:${config.password}@ds123311.mlab.com:23311/questionsqueue`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});

module.exports = db;
