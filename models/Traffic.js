const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    enum: ['Direct', 'Organic', 'Social', 'Email', 'Referral', 'ADVT', 'Other']
  },
  visitors: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Traffic', trafficSchema);