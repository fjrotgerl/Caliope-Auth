const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy  = require('passport-local').Strategy;
const constants      = require('../constants.js');
const fetch          = require("node-fetch");
const moment         = require("moment");
const md5            = require("md5");
const nodemailer       = require('nodemailer');

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
      function auth() {
          user = fetch(constants.API_URL + "/getUsuarioByEmail/" + profile.emails[0].value)
              .then(response => response.json())
              .catch( error => {

                  let password = Math.floor((Math.random() * 100000) + 999999);
                  let name   = profile.emails[0].value.substring(0, profile.emails[0].value.lastIndexOf("@"));


                  var transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                          user: 'caliope.no.reply@gmail.com',
                          pass: 'caliope123'
                      }
                  });

                  var mailOptions = {
                      from: 'caliope.no.reply@gmail.com',
                      to: profile.emails[0].value,
                      subject: 'Contraseña temporal Caliope',
                      text: 'Te hemos asignado una contraseña temporal. Es: ' + password
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                          console.log(error);
                      } else {
                          console.log('Email sent: ' + info.response);
                      }
                  });


                  fetch(constants.API_URL + "/registro", {
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          username         : name,
                          email            : profile.emails[0].value,
                          contraseña       : password,
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
            console.log("xd");
            return done(null, varUser);
        }
        return done(null, false);
    }
    auth();
  }
));

module.exports = passport;