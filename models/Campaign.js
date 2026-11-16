const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  leader: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  startDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);