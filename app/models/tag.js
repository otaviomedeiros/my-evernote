var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: String
});

module.exports = mongoose.model('Tag', tagSchema);
