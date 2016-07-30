var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/:id', function(req, res){
  User.findOne({ _id: req.payload._id }, function(err, user){
    res.json({ _id: user._id, email: user.email, name: user.name });
  });
});

router.put('/:id', function(req, res){
  User.update({ _id: req.payload._id }, req.body, function(err, user){
    res.json(user);
  });
});

module.exports = router;
