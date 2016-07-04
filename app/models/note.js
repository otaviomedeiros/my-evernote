var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagSchema = new Schema({tagId: String});
var notesSchema = new Schema({
  title: String,
  notebookId: String,
  content: String,
  tags: [tagSchema]
});

module.exports = mongoose.model('Note', notesSchema);
