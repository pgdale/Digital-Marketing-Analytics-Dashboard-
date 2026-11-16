const express = require('express');
const router = express.Router();
const { getTrafficData, addTrafficData } = require('../controllers/trafficController');

router.route('/')
  .get(getTrafficData)
  .post(addTrafficData);

module.exports = router;