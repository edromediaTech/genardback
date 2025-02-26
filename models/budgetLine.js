const mongoose = require('mongoose');

const budgetLineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: String,
    enum: ['expense', 'revenue'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('BudgetLine', budgetLineSchema);