const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');

const routes = require('./routes');
const auth = require('./auth');
const config = require('../../config');

const app = express();

// configure passport to run on all requests
app.use(session({ secret: config.secret }));
app.use(passport.initialize());
app.use(passport.session());
// protect api routes
app.use('/api', auth.checkAuth);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));
app.use(routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
