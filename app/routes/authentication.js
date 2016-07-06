var express = require('express');
var router = express.Router();
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

module.exports = router;
