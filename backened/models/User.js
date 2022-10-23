const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema logical collection of database 

const UserSchema = new Schema({

    name:{
        type: String, // String is shorthand for {type: String}
        required: true 
    }, 

    email:{
        type: String, 
        required: true, 
        unique: true
    }, 

    password:{
        type: String,
        required: true,
    }, 

    date:{
        type: Date, 
        default: Date.now
    }
  });

  const User = mongoose.model('user', UserSchema);
//   User.createIndexes() --> Ignore
  module.exports = User