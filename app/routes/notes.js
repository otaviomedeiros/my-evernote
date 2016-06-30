var express = require('express');
var router = express.Router();
var Note = require('../models/note');

router.get('/', function(req, res){
  Note.find({}, function(err, notes){
    res.json(notes);
  });
});

router.post('/', function(req, res){
  var note = new Note(req.body);

  note.save(function(err){
    res.json(note);
  });
});

module.exports = router;
