const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Faculte = require('../models/faculte');
const Universite = require('../models/universite');
const Option = require('../models/option');
const Notec = require('../models/notec');

const inscriptionSchema = mongoose.Schema({
  code:{  type: String, required:true, trim: true,unique:true },
  nom: {  type: String, required:true, trim: true },
  prenom: { type: String, required: true, trim: true },
  sexe: { type: Boolean, required: true , trim: true },
  adresse: { type: String },
  naissance: { type: Date, required: true , trim: true },
  telephone: { type: String, trim: true },
  email: { type: String, trim: true, unique:true },
  annee: { type: String, trim: true },
  complete: { type: Boolean, default: false },
  photo:[{annee_id:{type: String},path:{type: String}}], 
  universite: {type:mongoose.Schema.Types.ObjectId,ref:"Universite"}, 
  faculte: {type:mongoose.Schema.Types.ObjectId,ref:"Faculte"}, 
  notecs: [{type:mongoose.Schema.Types.ObjectId,ref:"Notec"}], 
  option: {type:mongoose.Schema.Types.ObjectId,ref:"Option", default:null}, 
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

// inscriptionSchema.post('save', async function (doc,next) {
//     await Faculte.updateOne({ _id: doc.faculte }, { $push: { inscriptions: doc} })
//     return next();
// });
inscriptionSchema.plugin(uniqueValidator);
inscriptionSchema.index({ "nom": 1,"prenom":1,"naissance":1,"sexe":1,"email":1}, { unique: true });

module.exports = mongoose.model('Inscription', inscriptionSchema);