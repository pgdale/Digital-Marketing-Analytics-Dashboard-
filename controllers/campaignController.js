const Campaign = require('../models/Campaign');

const getCampaigns = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    
    let campaigns = await Campaign.find()
      .sort({ startDate: -1 })
      .skip(skip)
      .limit(limit);
    
    if (campaigns.length === 0) {
      campaigns = await generateSampleCampaignData();
    }
    
    const total = await Campaign.countDocuments();
    
    res.json({
      success: true,
      data: campaigns,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching campaigns',
      error: error.message
    });
  }
};

const addCampaign = async (req, res) => {
  try {
    const { name, leader, team, status, startDate } = req.body;
    
    const newCampaign = new Campaign({
      name,
      leader,
      team,
      status,
      startDate: new Date(startDate)
    });
    
    const savedCampaign = await newCampaign.save();
    
    res.status(201).json({
      success: true,
      message: 'Campaign added successfully',
      data: savedCampaign
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding campaign',
      error: error.message
    });
  }
};

const generateSampleCampaignData = async () => {
  const sampleData = [
    { name: "Website SEO", leader: "Eisen", team: "Eisen", status: 38, startDate: new Date("2021-05-10") },
    { name: "Social Banners", leader: "Owen", team: "Owen", status: 45, startDate: new Date("2021-01-03") },
    { name: "Lego Designs", leader: "Keith", team: "Keith", status: 92, startDate: new Date("2021-08-06") },
    { name: "IOS App Design", leader: "Marlina", team: "Marlina", status: 50, startDate: new Date("2021-04-16") },
    { name: "Figma Dashboards", leader: "Harmonia", team: "Harmonia", status: 25, startDate: new Date("2021-04-08") }
  ];
  
  await Campaign.deleteMany({});
  const createdData = await Campaign.insertMany(sampleData);
  return createdData;
};

module.exports = { getCampaigns, addCampaign };