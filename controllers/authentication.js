const User = require('../models/usermodel');
const jwt = require('jwt-simple');
const config = require('../config');

//function to return token to the user when sigining in
function tokenForUser(user) {
  var timeStamp = new Date().getTime();
  return jwt.encode({ sub:user.id, iat: timeStamp}, config.secret);
}

//Signing in a user
exports.signin = function(req, res, next) {    //username and password are authenticated
  //Sending the token back if everything is perfect
  res.send({ token: tokenForUser(req.user) });
}

//Signing up a user
exports.signup = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  //Handling error condition
  if(!email || !password) {
    return res.status(422).send({ error: 'please enter both email and password'});
  }

    //Checking if a user with the given mail exists
    User.findOne({ email:email }, function(err, existingUser) {
      if(err) { return next(err); }

    //If the user exists , return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email already in use'});
    }

    //If the user with that Email does not exist create and save to the database
    var user = new User({
      email: email,
      password: password
    });

    //Saving the user to the database
    user.save(function(err) {
      if(err) { return next(err); }

      //Response to client saying user is created
      res.json({token: tokenForUser(user)});
    });
  });
}
