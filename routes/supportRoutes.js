const express = require('express');
const router = express.Router();
const { getSupportMetrics, addSupportMetrics } = require('../controllers/supportController');

router.route('/')
  .get(getSupportMetrics)
  .post(addSupportMetrics);

module.exports = router;