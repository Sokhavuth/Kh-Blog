/* users.js */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var session = require('express-session');
var ifLogedin = require('connect-ensure-login');
var db = require('../db');

passport.use(new Strategy(
  function(username, password, cb) {
    db.authors.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
  db.authors.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

  router.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  router.use(passport.initialize());
  router.use(passport.session());

/* កំណត់ផ្លូវ​ទៅ​កាន់​ទំព័រ​គ្រប់គ្រង */
router.get('/',
  function(req, res) {
    res.render('login');
});
  
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/users' }),
  function(req, res) {
    res.redirect('/users/dashboard');
});
  
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/dashboard',
  ifLogedin.ensureLoggedIn('/users'),
  function(req, res){
    res.render('users', { user: req.user, title:"​ចុះ​ផ្សាយ" });
});

router.get('/dashboard/model',
  ifLogedin.ensureLoggedIn('/users'),
  function(req, res){
    res.render('model', { user: req.user, title:"​​គំរូ​ទិន្នន័យ" });
});

router.post('/dashboard/posts',
  ifLogedin.ensureLoggedIn('/users'),
  function(req, res) {
    db.posting(req, res);
});

router.get('/dashboard/posts',
  ifLogedin.ensureLoggedIn('/users'),
  function(req, res){
    db.postlist(req,res);
});

module.exports = router;