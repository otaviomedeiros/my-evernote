var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagSchema = new Schema({tagId: String, text: String});
var notesSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: String,
  notebook: { type: Schema.Types.ObjectId, ref: 'Notebook' },
  content: String,
  tags: [tagSchema]
});

module.exports = mongoose.model('Note', notesSchema);
