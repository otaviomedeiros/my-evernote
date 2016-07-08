var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagSchema = new Schema({tagId: String, text: String});
var notesSchema = new Schema({
  userId: String,
  title: String,
  notebookId: String,
  content: String,
  tags: [tagSchema]
});

module.exports = mongoose.model('Note', notesSchema);
