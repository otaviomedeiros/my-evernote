var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');
var Note = require('../models/note');
var auth = require('../config/jwtAuth');


router.get('/', auth, function(req, res){
  Tag.find({}, function(err, tags){
    res.json(tags);
  });
});

router.post('/', auth, function(req, res){
  var tag = new Tag(req.body);

  tag.save(function(err, tag){
    res.json(tag);
  });
});

router.get('/:id/notes', auth, function(req, res){
  Note.find({'tags.tagId': req.params.id}, function(err, notes){
    res.json(notes);
  });
});

module.exports = router;
