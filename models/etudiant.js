const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Faculte = require('../models/faculte');
const Option = require('../models/option');
const Note = require('../models/note');
const Remise = require('../models/remise');
const User = require('../models/user');


const etudiantSchema = mongoose.Schema({
  code:{  type: String, required:true, trim: true,unique:true },
  nom: {  type: String, required:true, trim: true },
  prenom: { type: String, required: true, trim: true },
  sexe: { type: Boolean, required: true , trim: true },
  adresse: { type: String },
  naissance: { type: Date, required: true , trim: true },
  telephone: { type: String, trim: true },
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  photo:[{annee_id:{type: String},path:{type: String}}],
  faculte: {type:mongoose.Schema.Types.ObjectId,ref:"Faculte"}, 
  option: {type:mongoose.Schema.Types.ObjectId,ref:"Option", default:null}, 
  notes:[{type:mongoose.Schema.Types.ObjectId,ref:"Note"}],
  remises:[{type:mongoose.Schema.Types.ObjectId,ref:"Remise"}],
  niveaux:[{niveau:{type:Number,required:true}, annee: {type: String, required: true}}], 
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
etudiantSchema.plugin(uniqueValidator);
etudiantSchema.index({ "nom": 1,"prenom":1,"naissance":1,"sexe":1,"telephone":1}, { unique: true });

module.exports = mongoose.model('Etudiant', etudiantSchema);