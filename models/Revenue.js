const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    enum: ['Direct', 'Organic', 'Referral', 'Cancelled']
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Revenue', revenueSchema);