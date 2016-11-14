var express = require('express');
var router = express.Router();
var Note = require('../models/note');
var Notebook = require('../models/notebook');

router.post('/', function(req, res){
  var note = new Note(req.body);
  note.userId = req.payload._id;

  note.save(function(err, note){
    res.json(note);
  });
});

router.get('/:id', function(req, res){
  Note.findOne({ userId: req.payload._id, _id: req.params.id })
    .populate("notebook")
    .exec(function(err, note){
      res.json(note);
    });
});

router.put('/:id', function(req, res){
  Note.update({ userId: req.payload._id, _id: req.params.id}, req.body, function(err, note){
    res.json(note);
  });
});

router.delete('/:id', function(req, res){
  Note.remove({ userId: req.payload._id, _id: req.params.id }, function(err) {
    res.json({status: 'ok'})
  });
});

module.exports = router;
