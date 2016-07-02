var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');


router.get('/', function(req, res){
  Tag.find({}, function(err, tags){
    res.json(tags);
  });
});

router.post('/', function(req, res){
  var tag = new Tag(req.body);

  tag.save(function(err, tag){
    res.json(tag);
  });
});

module.exports = router;
