const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  nom: {type: String , required:true},
  prenom: {type: String , required:true},  
  user_level: {type: Number , default:0},
  tel: { type: String, required: true},
  email: { type: String}, 
  code: { type: String, required: true},
  checInsc: { type: Boolean, default: false }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default:Date.now}  
});

userSchema.plugin(uniqueValidator);
userSchema.index({"nom":1, "prenom": 1, "intermediaire":1}, { unique: true });
module.exports = mongoose.model('User', userSchema);