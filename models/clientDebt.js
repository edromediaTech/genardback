const mongoose = require('mongoose');

const clientDebtSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientUser',
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

module.exports = mongoose.model('ClientDebt', clientDebtSchema);