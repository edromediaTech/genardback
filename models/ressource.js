const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Cour = require('../models/cour');


const ressourceSchema = mongoose.Schema({
  libelle:{ type: String, required: true, trim: true },
  path:[{ type: String, required: true, trim: true }],
  remarque:{ type: String, required: true, trim: true },  
  cour:{type:mongoose.Schema.Types.ObjectId,ref:"Cour"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
ressourceSchema.plugin(uniqueValidator);
ressourceSchema.index({ "libelle": 1,"path":1}, { unique: true });

module.exports = mongoose.model('Ressource', ressourceSchema);