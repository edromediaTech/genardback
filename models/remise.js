const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Devoir = require('./devoir');
const Etudiant = require('./etudiant');



const remiseSchema = mongoose.Schema({
  path:{ type: String, required: true},
  remarque:{ type: String, required: true, trim: true },
  dateremise:Date,
  devoir:{type:mongoose.Schema.Types.ObjectId,ref:"Devoir"},
  etudiant:{type:mongoose.Schema.Types.ObjectId,ref:"Etudiant"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
remiseSchema.plugin(uniqueValidator);
remiseSchema.index({ "path": 1,"devoir":1}, { unique: true });

module.exports = mongoose.model('Remise', remiseSchema);