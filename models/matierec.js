const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Option = require('../models/option')


const matierecSchema = mongoose.Schema({
  nom:{ type: String, required: true, trim: true },
  option:{type:mongoose.Schema.Types.ObjectId,ref:"Option"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
matierecSchema.plugin(uniqueValidator);
matierecSchema.index({ "nom": 1,"faculte":1}, { unique: true });

module.exports = mongoose.model('Matierec', matierecSchema);