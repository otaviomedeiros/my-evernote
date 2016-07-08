var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notebookSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: String
});

module.exports = mongoose.model('Notebook', notebookSchema);
