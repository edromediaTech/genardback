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
  devise: {
    type: String,
    enum: ['gourde', 'dollar', 'peso'],
    default:"gourde",
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
    default:"cash",
    required: true
  },
  achat: { type: mongoose.Schema.Types.ObjectId, ref: "Achat" }, // Optionnel si paiement lié à un achat spécifique
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);