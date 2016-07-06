var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var notebooksRouter = require('./app/routes/notebooks');
var notesRouter = require('./app/routes/notes');
var tagsRouter = require('./app/routes/tags');
var authenticationRouter = require('./app/routes/authentication');
require('./app/config/passport');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/api/authentication', authenticationRouter);

app.use('/api/notebooks', notebooksRouter);
app.use('/api/notes', notesRouter);
app.use('/api/tags', tagsRouter);


// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


app.listen(process.env.APP_PORT);
