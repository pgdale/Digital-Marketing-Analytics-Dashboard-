const Revenue = require('../models/Revenue');

const getRevenueData = async (req, res) => {
  try {
    let revenueData = await Revenue.find().sort({ date: -1 }).limit(4);
    
    if (revenueData.length === 0) {
      revenueData = await generateSampleRevenueData();
    }
    
    res.json({
      success: true,
      data: revenueData,
      totalRevenue: revenueData.reduce((sum, item) => sum + item.amount, 0)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue data',
      error: error.message
    });
  }
};

const addRevenueData = async (req, res) => {
  try {
    const { source, amount } = req.body;
    
    const newRevenue = new Revenue({
      source,
      amount
    });
    
    const savedData = await newRevenue.save();
    
    res.status(201).json({
      success: true,
      message: 'Revenue data added successfully',
      data: savedData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding revenue data',
      error: error.message
    });
  }
};

const generateSampleRevenueData = async () => {
  const sampleData = [
    { source: 'Direct', amount: 266 },
    { source: 'Organic', amount: 890 },
    { source: 'Referral', amount: 62 },
    { source: 'Cancelled', amount: 1200 }
  ];
  
  await Revenue.deleteMany({});
  const createdData = await Revenue.insertMany(sampleData);
  return createdData;
};

module.exports = { getRevenueData, addRevenueData };