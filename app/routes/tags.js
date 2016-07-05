var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');
var Note = require('../models/note');


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

router.get('/:id/notes', function(req, res){
  Note.find({'tags.tagId': req.params.id}, function(err, notes){
    res.json(notes);
  });
});

module.exports = router;
