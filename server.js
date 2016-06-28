var express = require('express');
var app = express();
var notesRouter = require('./app/routes/notes');

app.use('/api/notes', notesRouter);

app.listen(3000);
