const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ['rooms', 'restaurant', 'bar', 'events', 'services'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Revenue', revenueSchema);