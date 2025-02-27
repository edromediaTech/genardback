const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  
  accountName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  devise: {
    type: String,
    default: "Gourde"
  },
 
  bank: {
    type: String,
    
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
    auteur: {
      type: String     
    },
    source: {
      type: String,
      enum: ['Cash', 'Cheque','Virement'],
      default: "Cash",
      required: true
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal'],
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('BankAccount', bankAccountSchema);