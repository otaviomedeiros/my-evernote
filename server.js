var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var notebooksRouter = require('./app/routes/notebooks');
var notesRouter = require('./app/routes/notes');
var tagsRouter = require('./app/routes/tags');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/api/notebooks', notebooksRouter);
app.use('/api/notes', notesRouter);
app.use('/api/tags', tagsRouter);

app.listen(process.env.APP_PORT);
