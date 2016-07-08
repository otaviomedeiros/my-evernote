var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notebookSchema = new Schema({
  userId: String,
  name: String
});

module.exports = mongoose.model('Notebook', notebookSchema);
