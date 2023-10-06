const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Option = require('../models/option')
const Universite = require('../models/universite')


const matierecSchema = mongoose.Schema({
  nom:{ type: String, required: true, trim: true },
  coef:{ type: Number },
  annee:{ type: String, required: true}, 
  option:{type:mongoose.Schema.Types.ObjectId,ref:"Option"},
  universite: {type:mongoose.Schema.Types.ObjectId,ref:"Universite"}, 
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

// matierecSchema.post('save', async function (doc,next) {
//   await Option.updateOne({ _id: doc.option }, { $push: { matierecs: doc} })
//   return next();
// });

matierecSchema.plugin(uniqueValidator);
matierecSchema.index({ "nom": 1,"option":1}, { unique: true });

module.exports = mongoose.model('Matierec', matierecSchema);