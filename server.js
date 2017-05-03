// "use-strict";

/*
[x] set up server
[x] serve static files
[x] connect to DB
[x] handle GET for previously asked questions
[x] handle POST for new questions
[x] handle PUT for manipulating stored questions
[] configure middleware & routing
*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Question = require('./src/db/db-schema');
const morgan = require('morgan');

const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const config = require('./config');
const session = require('express-session');

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
  res.redirect('/auth/github');
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
app.use(express.static(path.resolve(__dirname, './src/client')));

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
    (req, res) => res.redirect('/'));

app.get('/', ensureAuth, (req, res) => res.send('logged in'));

app.get('/api/questions', ensureAuth, (req, res) => {
  // request all question data form DB, send data in response
  Question.find({}, (err, questions) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.status(200).send(questions);
    }
  });
});

app.post('/api/questions', ensureAuth, (req, res) => {
  // add new questions to the DB
  const newQuestion = new Question({
    questionText: req.body.text,
    votes: 0,
    answered: false,
  });

  newQuestion.save((err, question) => {
    if (err) {
      console.log('ERRROR!', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(question);
    }
  });
});

app.put('/api/questions', (req, res) => {
  const id = req.body._id;
  // make edits to stored questions, return new version
  Question.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
    if (err) console.error(err);
    res.send(data);
  });
});

app.delete('/api/questions', (req, res) => {
  Question.findByIdAndRemove(req.body)
  .then(() => res.status(202).send());
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
