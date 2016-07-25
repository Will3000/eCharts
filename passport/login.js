var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

var fbConfig = require('../config/fb');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){
		passport.use('facebook', new FacebookStrategy({
	  clientID        : fbConfig.appID,
	  clientSecret    : fbConfig.appSecret,
	  callbackURL     : fbConfig.callbackUrl,
		profileFields: ['id', 'displayName', 'photos', 'emails']
	},
	  // facebook will send back the tokens and profile
	  function(access_token, refresh_token, profile, done) {
	    // asynchronous
	    process.nextTick(function() {
	      // find the user in the database based on their facebook id
	      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
	        // if there is an error, stop everything and return that
	        // ie an error connecting to the database
	        if (err)
	          return done(err);
	          // if the user is found, then log them in
	          if (user) {
	            return done(null, user); // user found, return that user
	          } else {
	            // if there is no user found with that facebook id, create them
	            var newUser = new User();
							console.log('Profile' + profile.id);
	            // set all of the facebook information in our user model
	            newUser.facebook.id = profile.id; // set the users facebook id
	            newUser.facebook.token = access_token; // we will save the token that facebook provides to the user
	            newUser.facebook.name  = profile.displayName;
							console.log("==========================" + profile.emails[0].value);
	            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
	            // save our user to the database
	            newUser.save(function(err) {
	              if (err)
	                throw err;
	              // if successful, return the new user
	              return done(null, newUser);
	            });
	         }
	      });
	    });
	}));





	passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({ 'email' :  username },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with email '+ username);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

}
