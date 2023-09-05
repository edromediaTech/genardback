const mongoose = require('mongoose');
const Universite = require('../models/universite');
const uniqueValidator = require('mongoose-unique-validator');

const anneeSchema = mongoose.Schema({
  nom: {type: String, required: true, trim: true }, 
  universite: {type:mongoose.Schema.Types.ObjectId, ref:"Universite"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

anneeSchema.plugin(uniqueValidator);
anneeSchema.index({ "nom": 1, "universite": 1 }, { unique: true });

module.exports = mongoose.model('Annee', anneeSchema);