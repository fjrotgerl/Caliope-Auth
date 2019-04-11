const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy  = require('passport-local').Strategy;
const User           = require('../model/user');
const constants      = require('../constants.js');

//Deserializators
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
    
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  //Strategy Config Google Auth
passport.use(new GoogleStrategy({
    clientID: constants.CLIENT_ID,
    clientSecret: constants.CLIENT_SECRET,
    callbackURL: constants.CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    console.log("new token");
    User.findOne({
        'googleId': profile.id
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            user = new User({
                "googleId": profile.id,
                "name": profile.name.givenName,
                "username": profile.displayName,
                "surname": profile.name.familyName,
                "rols": [{"id": "user"}]
            });
            user.save(function (err, newUser) {
                if (err) console.log(err);
                return done(null, newUser);
            });
        } else {
            return done(null, user);
        }
    });
  }
));

passport.use(new LocalStrategy(
  function (username, password, done) {
      User.findOne({'username': username}, function (err, user) {
          if (err) {
              return done(err);
          }
          if (!user || !user.validPassword(password)) {
              return done(null, false);
          }
          return done(null, user);
      });
  }
));

module.exports = passport;