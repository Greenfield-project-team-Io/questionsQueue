var mongoose = require('mongoose');

//mLab API key for the database is :


mongoose.connect('mongodb://localhost:0000/app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

module.exports = db;
