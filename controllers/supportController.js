const Support = require('../models/Support');

const getSupportMetrics = async (req, res) => {
  try {
    let supportData = await Support.findOne().sort({ date: -1 });
    
    if (!supportData) {
      supportData = await generateSampleSupportData();
    }
    
    res.json({
      success: true,
      data: supportData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching support metrics',
      error: error.message
    });
  }
};

const addSupportMetrics = async (req, res) => {
  try {
    const { totalTickets, openTickets, responseTime } = req.body;
    
    const newSupport = new Support({
      totalTickets,
      openTickets,
      responseTime
    });
    
    const savedData = await newSupport.save();
    
    res.status(201).json({
      success: true,
      message: 'Support metrics added successfully',
      data: savedData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding support metrics',
      error: error.message
    });
  }
};

const generateSampleSupportData = async () => {
  const sampleData = {
    totalTickets: 154,
    openTickets: 28,
    responseTime: "1 Day"
  };
  
  await Support.deleteMany({});
  const createdData = await Support.create(sampleData);
  return createdData;
};

module.exports = { getSupportMetrics, addSupportMetrics };