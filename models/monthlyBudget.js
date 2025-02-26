const mongoose = require('mongoose');

const monthlyBudgetSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true
  },
  budgetLines: [{
    line: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BudgetLine',
      required: true
    },
    allocatedAmount: {
      type: Number,
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('MonthlyBudget', monthlyBudgetSchema);