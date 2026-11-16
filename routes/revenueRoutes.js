const express = require('express');
const router = express.Router();
const { getRevenueData, addRevenueData } = require('../controllers/revenueController');

router.route('/')
  .get(getRevenueData)
  .post(addRevenueData);

module.exports = router;