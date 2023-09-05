const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Actualite = require('../models/actualite');

const commentSchema = mongoose.Schema({
  nom: {type: String, required: true},   
  email: {type: String, required: true},   
  body: {type: String, required: true},  
  approuve: {type: Boolean, default: false},   
  publie: {type: Boolean, default: false},   
  actualite:{type:mongoose.Schema.Types.ObjectId, ref:"Actualite"},
  //auteur:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

commentSchema.plugin(uniqueValidator);
commentSchema.index({ "body": 1,"actualite":1}, { unique: true });

module.exports = mongoose.model('Comment', commentSchema);