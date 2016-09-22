var express = require('express');
var router = express.Router();
var Notebook = require('../models/notebook');
var Note = require('../models/note');

router.get('/', function(req, res){
  req.query.userId = req.payload._id;

  Notebook.find(req.query, function(err, notes){
    res.json(notes);
  });
});

router.post('/', function(req, res){
  var notebook = new Notebook(req.body);
  notebook.userId = req.payload._id;

  notebook.save(function(err){
    res.json(notebook);
  });
});

router.delete('/:id', function(req, res){
  Notebook.remove({ userId: req.payload._id, _id: req.params.id }, function(err) {
    res.json({status: 'ok'})
  });
});

router.get('/:id', function(req, res){
  Notebook.findOne({ userId: req.payload._id, _id: req.params.id }, function(err, note){
    res.json(note);
  });
});

router.put('/:id', function(req, res){
  Notebook.update({ userId: req.payload._id, _id: req.params.id }, req.body, function(err, note){
    res.json(note);
  });
});

router.get('/:id/notes', function(req, res){
  Note.find({ userId: req.payload._id, notebook: req.params.id }, function(err, notes){
    res.json(notes);
  });
});


module.exports = router;
