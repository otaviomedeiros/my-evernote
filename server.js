var express = require('express');
var app = express();
var notesRouter = require('./app/routes/notes');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

app.use('/', express.static(__dirname + '/public'));
app.use('/api/notes', notesRouter);

app.listen(process.env.APP_PORT);
