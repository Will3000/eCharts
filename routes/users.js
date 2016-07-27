var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/login', function(req, res) {
  	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/users/profile',
		failureRedirect: '/users/login',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/users/profile',
		failureRedirect: '/users/signup',
		failureFlash : true
	}));

	/* GET profile Page */
	router.get('/profile', isAuthenticated, function(req, res){
		res.render('profile', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

	router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),
  	function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

	return router;
}
