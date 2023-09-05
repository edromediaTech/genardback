const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Faculte = require('../models/faculte')
const  Cour = require('../models/cour')

const matiereSchema = mongoose.Schema({
  nom:{ type: String, required: true, trim: true },
  faculte:{type:mongoose.Schema.Types.ObjectId,ref:"Faculte"},
  cours:[{type:mongoose.Schema.Types.ObjectId,ref:"Cour"}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
matiereSchema.plugin(uniqueValidator);
matiereSchema.index({ "nom": 1,"faculte":1}, { unique: true });

module.exports = mongoose.model('Matiere', matiereSchema);