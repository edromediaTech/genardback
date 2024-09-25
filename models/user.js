const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  name: {type: String , required:true},
  user_level: {type: Number , default:0},
  email: { type: String, required: true},
  code: { type: String, required: true},
  password: { type: String, required: true },
  checInsc: { type: Boolean, default: false }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default:Date.now}  
});

userSchema.plugin(uniqueValidator);
userSchema.index({"email":1, "universite": 1}, { unique: true });
module.exports = mongoose.model('User', userSchema);