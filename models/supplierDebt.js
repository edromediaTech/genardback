const mongoose = require('mongoose');

const supplierDebtSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  description: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('SupplierDebt', supplierDebtSchema);