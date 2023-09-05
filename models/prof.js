const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Universite = require('./universite');
const Cour = require('./cour');

const profSchema = mongoose.Schema({  
  nom: {  type: String, required:true, trim: true },
  prenom: { type: String, required: true, trim: true },
  sexe: { type: Boolean, required: true , trim: true },
  nif: { type: String },
  email: { type: String },
  adresse: { type: String },
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  universite:{type:mongoose.Schema.Types.ObjectId, ref:"Universite"},
  telephone: { type: String, trim: true },
  photo:[{annee_id:{type: String},path:{type: String}}],
  cours:[{type:mongoose.Schema.Types.ObjectId,ref:"Cour"}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
profSchema.plugin(uniqueValidator);
profSchema.index({ "nom": 1,"prenom":1,"naissance":1,"sexe":1,"email":1}, { unique: true });

module.exports = mongoose.model('Prof', profSchema);