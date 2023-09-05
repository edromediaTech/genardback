const mongoose = require('mongoose');
const Universite = require('../models/universite');

const contactSchema = mongoose.Schema({
  nom: {type: String, required: true}, 
  email: {type: String, required: true }, 
  message: {type: String, required: true }, 
  universite_id:{type:mongoose.Schema.Types.ObjectId, ref:"Universite"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});


module.exports = mongoose.model('Contact', contactSchema);