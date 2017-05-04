const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const config = require('../../config');

passport.use(new GithubStrategy({
  clientID: config.githubID,
  clientSecret: config.githubSecret,
  callbackURL: '/auth/github/callback' },
  (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// ^^^^^^ this may be the place to check user in db ^^^^^

exports.checkAuth = (req, res, next) => {
  // console.log('Authenticated: ', req.isAuthenticated());
  // console.log('Headers: ', req.headers);
  if (req.isAuthenticated()) { return next(); }
  res.status(403).send();
  return 'appease airbnb';
};
