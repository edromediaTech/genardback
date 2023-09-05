const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Universite = require('../models/universite');

const pictureSchema = mongoose.Schema({
  nom: {type: String, required: true, trim: true, unique:true }, 
  path: {type: String, required: true }, 
  section: {type: String, required: true }, 
  description: {type: String, required: true }, 
  universite_id:{type:mongoose.Schema.Types.ObjectId, ref:"Universite"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

pictureSchema.plugin(uniqueValidator);
pictureSchema.index({"nom":1,"path":1 ,"section":1}, { unique: true });

module.exports = mongoose.model('Picture', pictureSchema);