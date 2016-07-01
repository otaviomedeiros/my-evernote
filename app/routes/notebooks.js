var express = require('express');
var router = express.Router();
var Notebook = require('../models/notebook');

router.get('/', function(req, res){
  Notebook.find({}, function(err, notes){
    res.json(notes);
  });
});

router.post('/', function(req, res){
  var note = new Notebook(req.body);

  note.save(function(err){
    res.json(note);
  });
});

router.delete('/:id', function(req, res){
  Notebook.remove({ _id: req.params.id }, function(err) {
    res.json({status: 'ok'})
  });
});

router.get('/:id', function(req, res){
  Notebook.findById(req.params.id, function(err, note){
    res.json(note);
  });
});

router.put('/:id', function(req, res){
  Notebook.update({_id: req.params.id}, req.body, function(err, note){
    res.json(note);
  });
});


module.exports = router;
