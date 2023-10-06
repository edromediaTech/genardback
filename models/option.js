const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Faculte = require('../models/faculte');
const Matierec = require('../models/matierec');

const optionSchema = mongoose.Schema({
  nom: {type: String, required: true}, 
  nbannee: {type: Number},
  description: {type: String, required: true }, 
  faculte:{type:mongoose.Schema.Types.ObjectId, ref:"Faculte"},
  matierecs:[{type:mongoose.Schema.Types.ObjectId, ref:"Matierec"}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

optionSchema.plugin(uniqueValidator);
optionSchema.index({ "nom": 1,"faculte":1}, { unique: true });

module.exports = mongoose.model('Option', optionSchema);