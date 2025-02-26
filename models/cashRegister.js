const mongoose = require('mongoose');

const cashRegisterSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0
  },
  transactions: [{
    date: {
      type: Date,
      default: Date.now
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('CashRegister', cashRegisterSchema);