const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Universite = require('../models/universite');
const Option = require('../models/option');
const Admfac = require('../models/admfac');
const Inscription = require('../models/inscription');
const Etudiant = require('../models/etudiant');
const Matiere = require('../models/matiere');

const faculteSchema = mongoose.Schema({
  nom: {type: String, required: true},   
  description: {type: String }, 
  universite:{type:mongoose.Schema.Types.ObjectId, ref:"Universite"},
  options:[{type:mongoose.Schema.Types.ObjectId, ref:"Option"}],
  etudiants:[{type:mongoose.Schema.Types.ObjectId, ref:"Etudiant"}],
  admfacs:[{type:mongoose.Schema.Types.ObjectId, ref:"Admfac"}],
  matieres:[{type:mongoose.Schema.Types.ObjectId, ref:"Matiere"}],
  inscriptions:[{type:mongoose.Schema.Types.ObjectId, ref:"Inscription"}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

faculteSchema.plugin(uniqueValidator);
faculteSchema.index({ "nom": 1,"universite":1}, { unique: true });

module.exports = mongoose.model('Faculte', faculteSchema);