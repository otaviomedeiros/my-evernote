var express = require('express');
var router = express.Router();
var Note = require('../models/note');

router.get('/', function(req, res){
  Note.find({}, function(err, notes){
    res.json(notes);
  });
});

module.exports = router;
