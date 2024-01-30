const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type:String,
    required:true,
    unique:true
  },
  firstName : {
    type:String,
    required:true,
    trim:true
  },
  lastName : {
    type:String,
    required:true,
    trim:true
  },
  password:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model("User",userSchema);