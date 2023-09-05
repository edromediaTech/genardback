const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Cour = require('./cour');
const Remise = require('../models/remise');


const devoirSchema = mongoose.Schema({
  libelle:{ type: String, required: true, trim: true },
  document:{ type: String, required: true, trim: true },
  remarque:{ type: String, required: true, trim: true },
  dateremise:Date,
  annee:{ type: String, required: true, trim: true },
  cour:{type:mongoose.Schema.Types.ObjectId,ref:"Cour"},
  remises:[{type:mongoose.Schema.Types.ObjectId,ref:"Remise"}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
devoirSchema.plugin(uniqueValidator);
devoirSchema.index({ "libelle": 1,"document":1}, { unique: true });

module.exports = mongoose.model('Devoir', devoirSchema);