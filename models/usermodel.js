const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Defining user model
const userSchema = new Schema({
  email     : { type: String, unique: true, lowercase: true},
  password  : String
});

//Before saving to the database hash and encrypt the data
userSchema.pre('save', function(next) {  //Before saving it to the database execute this
    const user = this;

    //Salting the data
    bcrypt.genSalt(10, function(err, salt){
      if(err) { return next(err); }

      //Hashing the data
      bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

//Comparing the password in the database with the password entered by the user
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }

    callback(null, isMatch);
  });
}

//Creating the model class
const ModelClass = mongoose.model('user', userSchema);

//Exporting the model
module.exports = ModelClass;
