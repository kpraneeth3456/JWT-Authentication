const passport = require('passport');
const User = require('../models/usermodel');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Setup Local Strategy
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //Verify username and password , call done with the user
  //if the user has correct usename and password
  //Or call 'done' with false
  User.findOne({ email:email }, function(err, user) {
    if(err) { return done(err); }

    if(!user) { return done(null, false); }

    //Compare the password and user.password
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'),
  secretOrKey : config.secret
};

//Create JWT Strategy
const jwtlogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //See if the ID in the payload exists in our database
  //If it does call 'done' with the user
  //Or call done without a user object

  User.findById(payload.sub, function(err, user) {
    if(err){ return done(err, false); }

    if(user){
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

//Tell passport to use the Strategy
passport.use(localLogin);
passport.use(jwtlogin);
