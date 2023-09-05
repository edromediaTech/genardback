const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Cour = require('../models/cour');
const Etudiant = require('../models/etudiant');



const noteSchema = mongoose.Schema({
  exam:{ type: String, required: true},
  valeur:{ type: Number, required: true},
  annee:{ type: String, required: true},  
  cour:{type:mongoose.Schema.Types.ObjectId,ref:"Cour"},
  etudiant:{type:mongoose.Schema.Types.ObjectId,ref:"Etudiant"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
noteSchema.plugin(uniqueValidator);
noteSchema.index({ "exam": 1,"cour":1,"annee":1,"etudiant":1}, { unique: true });

module.exports = mongoose.model('Note', noteSchema);