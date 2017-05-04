const router = require('express').Router();
const controllers = require('./controllers');
const passport = require('passport');
const path = require('path');
const express = require('express');


// router.use(express.static(path.join(__dirname, '../client')));

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
    (req, res) => res.redirect('/'));

router.route('/')
  .get((req, res) => {
    console.log(path.join(__dirname, '../client'));
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

router.route('/api/questions')
  .get(controllers.getQuestions)
  .post(controllers.postQuestion)
  .put(controllers.updateQuestion)
  .delete(controllers.deleteQuestion);

module.exports = router;
