const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Universite = require('../models/universite');


const journalSchema = mongoose.Schema({
  titre: {type: String, required: true},   
  slug: {type: String, required: true},
  image: {type: String},      
  dokiman: {type: String},         
  universite:{type:mongoose.Schema.Types.ObjectId, ref:"Universite"},  
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

journalSchema.plugin(uniqueValidator);
journalSchema.index({ "titre": 1,"slug":1}, { unique: true });

module.exports = mongoose.model('Journal', journalSchema);