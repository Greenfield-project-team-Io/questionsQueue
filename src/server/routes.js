const router = require('express').Router();
const controllers = require('./controllers');
const passport = require('passport');

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
    (req, res) => res.redirect('/'));

router.route('/api/questions')
  .get(controllers.getQuestions)
  .post(controllers.postQuestion)
  .put(controllers.updateQuestion)
  .delete(controllers.deleteQuestion);

module.exports = router;
