var express = require('express');
var app = express();
var notesRouter = require('./app/routes/notes');

var mongoose = require('mongoose');
mongoose.connect('mongodb://orders:orders@ds023064.mlab.com:23064/orders');

app.use('/', express.static(__dirname + '/public'));
app.use('/api/notes', notesRouter);

app.listen(3000);
