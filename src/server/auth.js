const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const config = process.env.GITHUBID ? {
  githubID: process.env.GITHUBID,
  githubSecret: process.env.GITHUBSECRET,
} : require('../../config');

const baseURL = process.env.BASEURL || '';

passport.use(new GithubStrategy({
  clientID: config.githubID,
  clientSecret: config.githubSecret,
  callbackURL: `${baseURL}/auth/github/callback` },
  (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// ^^^^^^ this may be the place to check user in db ^^^^^

exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.status(403).send();
  return 'appease airbnb';
};
