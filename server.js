const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorMiddleware');
const rateLimit = require('express-rate-limit');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use(cors());

// Routes
app.use('/api/traffic', require('./routes/trafficRoutes'));
app.use('/api/revenue', require('./routes/revenueRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Digital Marketing Analytics Dashboard API',
    version: '1.0.0',
    endpoints: {
      traffic: '/api/traffic',
      revenue: '/api/revenue',
      campaigns: '/api/campaigns',
      support: '/api/support'
    }
  });
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🎯 Server running on port ${PORT}`);
  console.log(`📊 Digital Marketing Analytics Dashboard API`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🟢 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});