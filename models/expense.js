const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budgetLine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BudgetLine',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank', 'credit'],
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);