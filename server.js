var express = require('express');
var app = express();
var notesRouter = require('./app/routes/notes');

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/myevernote');

app.use('/', express.static(__dirname + '/public'));
app.use('/api/notes', notesRouter);

app.listen(3000);
