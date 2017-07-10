const routes = require('express').Router();
const controllers = require('./controllers');
const passport = require('passport');
const User = require('./db/user');

routes.get('/auth/github', passport.authenticate('github'));
routes.get('/auth/github/callback',
            passport.authenticate('github', { failureRedirect: '/auth/github' }),
              (req, res) => {
                User.findOne({ username: req.user.username })
                  .then((user) => {
                    if (user === null) {
                      user = {
                        username: req.user.username,
                        role: 'admin',
                        cohort: 'hrnyc-7',
                      };
                      const newUser = new User(user);
                      newUser.save((err, savedUser) => {
                        if (err) console.log(err);
                        else console.log('user added: ', savedUser);
                      });
                    }
                    res.cookie('username', user.username);
                    res.cookie('role', user.role);
                    res.cookie('loggedIn', '1');
                    res.redirect('/');
                  })
                  .catch((err) => {
                    req.logout();
                    res.redirect('/');
                  });
              });

routes.get('/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('loggedIn').redirect('/');
});

routes.route('/api/questions')
  .get(controllers.getQuestions)
  .post(controllers.postQuestion)
  .put(controllers.updateQuestion)
  .delete(controllers.deleteQuestion);

module.exports = routes;
