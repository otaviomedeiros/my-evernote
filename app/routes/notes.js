var express = require('express');
var router = express.Router();
var Note = require('../models/note');

router.post('/', function(req, res){
  var note = new Note(req.body);

  note.save(function(err, note){
    res.json(note);
  });
});

router.get('/:id', function(req, res){
  Note.findById(req.params.id, function(err, note){
    res.json(note);
  });
});

router.put('/:id', function(req, res){
  Note.update({_id: req.params.id}, req.body, function(err, note){
    res.json(note);
  });
});

router.delete('/:id', function(req, res){
  Note.remove({ _id: req.params.id }, function(err) {
    res.json({status: 'ok'})
  });
});

module.exports = router;
