var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.post('/register', function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    res.json({ "token": user.generateJwt() });
  });
});

router.post('/login', function(req, res){
  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user){
      res.json({ "token" : user.generateJwt() });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
});

module.exports = router;
