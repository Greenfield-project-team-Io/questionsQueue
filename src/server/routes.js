const routs = require('express').Router();
const controllers = require('./controllers');
const passport = require('passport');

routs.get('/auth/github', passport.authenticate('github'));
routs.get('/auth/github/callback',
            passport.authenticate('github', { failureRedirect: '/auth/github' }),
            (req, res) => res.redirect('/'));

routs.route('/api/questions')
  .get(controllers.getQuestions)
  .post(controllers.postQuestion)
  .put(controllers.updateQuestion)
  .delete(controllers.deleteQuestion);

module.exports = routs;
