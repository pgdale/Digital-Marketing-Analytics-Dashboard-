const express = require('express');
const router = express.Router();
const { getCampaigns, addCampaign } = require('../controllers/campaignController');

router.route('/')
  .get(getCampaigns)
  .post(addCampaign);

module.exports = router;