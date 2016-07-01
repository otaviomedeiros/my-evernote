var express = require('express');
var router = express.Router();
var Note = require('../models/note');

router.post('/', function(req, res){
  var note = new Note(req.body);

  note.save(function(err, note){
    res.json(note);
  });
});

module.exports = router;
