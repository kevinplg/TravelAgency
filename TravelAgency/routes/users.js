const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

router.route('/register')
    .get(users.registerGet)
    .post(catchAsync(users.registerPost));

router.route('/login')
    .get(users.loginGet)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginPost)

router.get('/logout', users.logout)

module.exports = router;