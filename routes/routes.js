const express        = require('express');
const cors           = require('cors');
const router         = express.Router();
const verifyToken    = require('../tokenVerify/tokenVerificator');
const tokenGenerator = require ('../tokenGenerate/tokenGenerator');
const passport       = require('../config/passport');
const url            = require('url');
const constants      = require('../constants');
const mailer         = require('../mailer');


router.use(cors({credentials: true, origin: '*'}));


router.post('/token-local', passport.authenticate('local', {session: false}), function (req, res) {
  let token = tokenGenerator.access(req.user);
  let refresh = tokenGenerator.refresh(token);
  // res.header("Authorization", "Bearer " + token)
  res.json("Bearer "+ token);
});


router.get('/token-google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']}));

router.get('/token-google/callback', passport.authenticate('google', {}), async function (req, res) {
  let token = tokenGenerator.access(req.user);
  let refresh = tokenGenerator.refresh(token);

  let user = await req.user;

  if (user !== undefined) {
      res.redirect(url.format({
          pathname: constants.CLIENT_URL + "/check",
          query: {
              "refreshToken": token,
              "user": user.username
          }
      }));
  } else {
      res.redirect(constants.CLIENT_URL);
  }

});

router.post('/verify-token', function (req, res) {
    let message = verifyToken.access(req.headers.authorization);
    if(!verifyToken.access(req.headers.authorization)){
      res.sendStatus(401)
  }
  // res.json(message);
});

router.post('/refresh-token', function (req, res) {
  let user = verifyToken.refresh(req.headers.refreshtoken);
  if(user){
      user = JSON.parse(Buffer.from(user.access_token.split(".")[1], 'base64').toString("ascii"))
      let token = tokenGenerator.access(user);
      let refresh = tokenGenerator.refresh(token);
      // res.header("Authorization", "Bearer " + token)
      res.json(refresh);
  }else{
      res.sendStatus(401)
  }
});

router.post("/sendmail", function (req, res) {
    let msg = req.body.mail;
    mailer(msg.to, msg.subject, msg.message);
});


module.exports = router;
