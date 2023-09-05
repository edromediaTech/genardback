const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Faculte = require('./faculte');
const Poste = require('./poste');

const admfacSchema = mongoose.Schema({  
  nom: {  type: String, required:true, trim: true },
  prenom: { type: String, required: true, trim: true },
  sexe: { type: Boolean, required: true , trim: true },
  nif: { type: String },
  email: { type: String },
  adresse: { type: String },
  naissance: { type: Date, required: true , trim: true },
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  telephone: { type: String, trim: true },
  postes:[{type:mongoose.Schema.Types.ObjectId,ref:"Poste", date: {type: Date, required: true}}],
  faculte:{type:mongoose.Schema.Types.ObjectId, ref:"Faculte"},
  photo:[{annee_id:{type: String},path:{type: String}}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
admfacSchema.plugin(uniqueValidator);
admfacSchema.index({ "nom": 1,"prenom":1,"naissance":1,"sexe":1,"email":1}, { unique: true });

module.exports = mongoose.model('Admfac', admfacSchema);