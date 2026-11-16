const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  totalTickets: {
    type: Number,
    required: true
  },
  openTickets: {
    type: Number,
    required: true
  },
  responseTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Support', supportSchema);