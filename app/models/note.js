var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notesSchema = new Schema({title: String, notebookId: String, content: String});

module.exports = mongoose.model('Note', notesSchema);
