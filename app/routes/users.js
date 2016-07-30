var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/:id', function(req, res){
  User.findOne({ _id: req.payload._id }, function(err, user){
    res.json({ _id: user._id, email: user.email, name: user.name });
  });
});

router.put('/:id', function(req, res){
  User.findOne({ _id: req.payload._id }, function(err, user){
    user.name = req.body.name;

    if (req.body.password && req.body.password.length > 0){
      user.setPassword(req.body.password);
    }

    user.save(function(err, u){
      res.json(u);
    });
  });
});

module.exports = router;
