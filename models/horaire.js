const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Cour = require('../models/cour')

const horaireSchema = mongoose.Schema({
  jour:{ type: String, required: true, trim: true },
  hdebut:{ type: String, required: true, trim: true },
  hfin:{ type: String, required: true, trim: true },  
  cour:{type:mongoose.Schema.Types.ObjectId,ref:"Cour"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
horaireSchema.plugin(uniqueValidator);
horaireSchema.index({ "jour": 1,"hdebut":1,"cour":1}, { unique: true });

module.exports = mongoose.model('Horaire', horaireSchema);