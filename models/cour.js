const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const matiere = require('../models/matiere');
const Horaire = require('../models/horaire');
const Devoir = require('../models/devoir');
const Ressource = require('../models/ressource');

const courSchema = mongoose.Schema({
  matiere: {type:mongoose.Schema.Types.ObjectId, ref:"Matiere"},
  niveau:Number,
  semestre:Number,
  prof:{type:mongoose.Schema.Types.ObjectId, ref:"Prof"},
  coef: {type: Number},
  passage:Number,
  annee:{type: String, required: true },
  description: {type: String }, 
  horaires:[{type:mongoose.Schema.Types.ObjectId, ref:"Horaire"}],
  devoirs:[{type:mongoose.Schema.Types.ObjectId, ref:"Devoir"}],
  ressources:[{type:mongoose.Schema.Types.ObjectId, ref:"Ressource"}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

courSchema.plugin(uniqueValidator);
courSchema.index({ "matiere": 1,"niveau":1, "semestre":1,"annee":1,"prof":1}, { unique: true });

module.exports = mongoose.model('Cour', courSchema);