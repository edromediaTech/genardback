const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: String,
  email: String,
  phone: String,
  address: String,
  totalDebt: { type: Number, default: 0 }, // Total de la dette du fournisseur
});

module.exports = mongoose.model("Supplier", supplierSchema);
