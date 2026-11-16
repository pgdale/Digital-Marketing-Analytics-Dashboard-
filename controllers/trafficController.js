const Traffic = require('../models/Traffic');

const getTrafficData = async (req, res) => {
  try {
    let trafficData = await Traffic.find().sort({ date: -1 }).limit(7);
    
    if (trafficData.length === 0) {
      trafficData = await generateSampleTrafficData();
    }
    
    res.json({
      success: true,
      data: trafficData,
      totalVisitors: trafficData.reduce((sum, item) => sum + item.visitors, 0)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching traffic data',
      error: error.message
    });
  }
};

const addTrafficData = async (req, res) => {
  try {
    const { source, visitors, percentage } = req.body;
    
    const newTraffic = new Traffic({
      source,
      visitors,
      percentage
    });
    
    const savedData = await newTraffic.save();
    
    res.status(201).json({
      success: true,
      message: 'Traffic data added successfully',
      data: savedData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding traffic data',
      error: error.message
    });
  }
};

const generateSampleTrafficData = async () => {
  const sampleData = [
    { source: 'Direct', visitors: 1254, percentage: 35.4 },
    { source: 'Organic', visitors: 890, percentage: 25.8 },
    { source: 'Social', visitors: 567, percentage: 16.2 },
    { source: 'Email', visitors: 423, percentage: 11.9 },
    { source: 'Referral', visitors: 289, percentage: 8.9 },
    { source: 'ADVT', visitors: 156, percentage: 4.5 },
    { source: 'Other', visitors: 89, percentage: 2.3 }
  ];
  
  await Traffic.deleteMany({});
  const createdData = await Traffic.insertMany(sampleData);
  return createdData;
};

module.exports = { getTrafficData, addTrafficData };