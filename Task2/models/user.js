let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },

  email:{
    type:String,
    required: true
  },

  username:{
    type:String,
    required: true
  },
  role:{
    type:String,
    required: true
  },

  password:{
    type:String,
    required: true
  }
});


let User = module.exports = mongoose.model('User', UserSchema);
