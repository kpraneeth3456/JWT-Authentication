const Authentication = require('../controllers/authentication');
const passportService = require('../services/strategies');
const passport = require('passport');

//Jwt Strategy to protect the routes
const requireAuth = passport.authenticate('jwt',{ session : false });
//Passport Strategy to protect the routes
const requireSignIn = passport.authenticate('local',{ session : false });

//This function is to handle routing
module.exports = function(app) {
    app.get('/',requireAuth, function(req, res) {
      res.send( { message : 'This is a secret code' });
    });
    //Route for sigining in a user
    app.post('/signin', requireSignIn, Authentication.signin);
    //Route for sihningup a user
    app.post('/signup', Authentication.signup);
  }
