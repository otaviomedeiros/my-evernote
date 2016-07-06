var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = this.generateHash(password, this.salt);
};

userSchema.methods.validPassword = function(password) {
  var hash = this.generateHash(password, this.salt);
  return this.hash === hash;
};

userSchema.methods.generateHash = function(password, salt){
  return crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); 
};

module.exports = mongoose.model('User', userSchema);
