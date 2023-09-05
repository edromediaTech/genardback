const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Universite = require('./universite');
const Poste = require('./poste');

const administrationSchema = mongoose.Schema({  
  nom: {  type: String, required:true, trim: true },
  prenom: { type: String, required: true, trim: true },
  sexe: { type: Boolean, required: true , trim: true },
  nif: { type: String },
  email: { type: String },
  adresse: { type: String },
  naissance: { type: Date, required: true , trim: true },
  telephone: { type: String, trim: true },
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  postes:[{type:mongoose.Schema.Types.ObjectId,ref:"Poste", date: {type: Date, required: true}}],
  universite:{type:mongoose.Schema.Types.ObjectId, ref:"Universite"},
  photo:[{annee_id:{type: String},path:{type: String}}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
administrationSchema.plugin(uniqueValidator);
administrationSchema.index({ "nom": 1,"prenom":1,"naissance":1,"sexe":1,"email":1}, { unique: true });

module.exports = mongoose.model('Administration', administrationSchema);