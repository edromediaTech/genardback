const mongoose = require('mongoose');
const Universite = require('../models/universite');
const uniqueValidator = require('mongoose-unique-validator');

const posteSchema = mongoose.Schema({
  nom: {type: String, required: true}, 
  description: {type: String, required: true }, 
  niveau: {type: Number, required: true }, 
  universite_id:{type:mongoose.Schema.Types.ObjectId, ref:"Universite"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

posteSchema.plugin(uniqueValidator);
posteSchema.index({"nom":1, "universite_id": 1}, { unique: true });

module.exports = mongoose.model('Poste', posteSchema);