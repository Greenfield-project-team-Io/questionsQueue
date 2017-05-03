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

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'src/client')));

app.get('/api/questions', (req, res) => {
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

app.post('/api/questions', (req, res) => {
  // add new questions to the DB
  const newQuestion = new Question({
    questionText: req.body.text,
    votes: 0,
    answered: false,
    // time : { type: Date, default: Date.now },
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
