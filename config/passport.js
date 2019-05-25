const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy  = require('passport-local').Strategy;
const constants      = require('../constants.js');
const fetch          = require("node-fetch");
const moment         = require("moment");

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
    
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

passport.use(new GoogleStrategy({
    clientID: constants.CLIENT_ID,
    clientSecret: constants.CLIENT_SECRET,
    callbackURL: constants.CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
      let user;
      async function auth() {
        user = await fetch(constants.API_URL + "/getUsuarioByEmail/" + profile.emails[0].value)
        .then(response => response.json())
        .catch(async error => {
            await fetch(constants.API_URL + "/registro", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username         : "user-" + Math.random() * 100000000000000000, 
                    email            : profile.emails[0].value,
                    contraseña       : '',
                    nombre           : profile.name.givenName,
                    apellidos        : profile.name.familyName,
                    permiso          : 1,
                    numeroSeguidores : 0,
                    numeroSeguidos   : 0,
                    fechaRegistro    : moment().format("YYYY-MM-DD"),
                    googleId         : profile.id
                })
            })
            .then(response => done(null, response))
        });
        return done(null, user);
      }
      auth();
  }
));

passport.use(new LocalStrategy(
  function (username, password, done) {
      if (username === null || username === "" || password === null || password === "") { return; }

    async function auth() {
        let varUser = await fetch(constants.API_URL + "/getUsuarioById/" + username)
        .then(response => response.json())
        .catch(error => done(error));

        if (varUser.username === username && varUser.contraseña === password) {
            return done(null, varUser);
        }
        return done(null, false);
    }
    auth();
  }
));

module.exports = passport;