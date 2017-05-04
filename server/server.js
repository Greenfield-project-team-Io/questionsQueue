const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Question = require('./db/db-schema');
const morgan = require('morgan');

const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const config = require('../config');
const session = require('express-session');
const router = require('./routs');

passport.use(new GithubStrategy({
  clientID: config.githubID,
  clientSecret: config.githubSecret,
  callbackURL: '/auth/github/callback' },
  (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// ^^^^^^ this may be the place to check user in db ^^^^^

function ensureAuth(req, res, next) {
  console.log('Authenticated: ', req.isAuthenticated());
  console.log('Headers: ', req.headers);
  if (req.isAuthenticated()) { return next(); }
  res.status(403).send();
  return 'appease airbnb';
}

const port = process.env.PORT || 8080;
const app = express();

// configure passport to run on all requests
app.use(session({ secret: config.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../src/client')));
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
