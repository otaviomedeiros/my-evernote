var express = require('express');
var router = express.Router();
var Notebook = require('../models/notebook');
var Note = require('../models/note');
var auth = require('../config/jwtAuth');

router.get('/', auth, function(req, res){
  Notebook.find({}, function(err, notes){
    res.json(notes);
  });
});

router.post('/', auth, function(req, res){
  var note = new Notebook(req.body);

  note.save(function(err){
    res.json(note);
  });
});

router.delete('/:id', auth, function(req, res){
  Notebook.remove({ _id: req.params.id }, function(err) {
    res.json({status: 'ok'})
  });
});

router.get('/:id', auth, function(req, res){
  Notebook.findById(req.params.id, function(err, note){
    res.json(note);
  });
});

router.put('/:id', auth, function(req, res){
  Notebook.update({_id: req.params.id}, req.body, function(err, note){
    res.json(note);
  });
});

router.get('/:id/notes', auth, function(req, res){
  Note.find({notebookId: req.params.id}, function(err, notes){
    res.json(notes);
  });
});


module.exports = router;
