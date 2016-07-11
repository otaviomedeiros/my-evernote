var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');
var Note = require('../models/note');


router.get('/', function(req, res){
  req.query.userId = req.payload._id;

  Tag.find(req.query, function(err, tags){
    res.json(tags);
  });
});

router.post('/', function(req, res){
  var tag = new Tag(req.body);
  tag.userId = req.payload._id;

  tag.save(function(err, tag){
    res.json(tag);
  });
});

router.get('/:id/notes', function(req, res){
  Note.find({ userId: req.payload._id, 'tags.tagId': req.params.id }, function(err, notes){
    res.json(notes);
  });
});

router.delete('/:id', function(req, res){
  Tag.remove({ userId: req.payload._id, _id: req.params.id }, function(err) {
    res.json({status: 'ok'})
  });
});

module.exports = router;
