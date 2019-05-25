const express        = require('express');
const cors           = require('cors');
const router         = express.Router();
const verifyToken    = require('../tokenVerify/tokenVerificator');
const tokenGenerator = require ('../tokenGenerate/tokenGenerator');
const passport       = require('../config/passport');

router.use(cors({credentials: true, origin: '*'}));


router.post('/token-local', passport.authenticate('local', {session: false}), function (req, res) {
  let token = tokenGenerator.access(req.user)
  let refresh = tokenGenerator.refresh(token)
  //res.header("Authorization", "Bearer " + token)
  res.json("Bearer "+ token);
});


router.get('/token-google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']}));

router.get('/token-google/callback', passport.authenticate('google', {}), function (req, res) {
  let token = tokenGenerator.access(req.user)
  let refresh = tokenGenerator.refresh(token)
  res.header("Authorization", "Bearer " + token)
  res.json(refresh);
  //res.redirect("http://localhost:8081/");
});

router.post('/verify-token', function (req, res) {

  let message = verifyToken.access(req.headers.authorization);
  if(!verifyToken.access(req.headers.authorization)){
      res.sendStatus(401)
  }
  res.json(message);
});

router.post('/refresh-token', function (req, res) {
  let user = verifyToken.refresh(req.headers.refreshtoken);
  if(user){
      user = JSON.parse(Buffer.from(user.access_token.split(".")[1], 'base64').toString("ascii"))
      console.log("token refresh")
      let token = tokenGenerator.access(user)
      let refresh = tokenGenerator.refresh(token)
      res.header("Authorization", "Bearer " + token)
      res.json(refresh);
  }else{
      res.sendStatus(401)
  }
});

module.exports = router;
