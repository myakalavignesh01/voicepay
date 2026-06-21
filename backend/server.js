require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/voicepay')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/payments', require('./routes/payments.routes'));
app.use('/api/voice', require('./routes/voice.routes'));
app.use('/api/contacts', require('./routes/contacts.routes'));
app.use('/api/transactions', require('./routes/transactions.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/insights', require('./routes/insights.routes'));
app.use('/api/security', require('./routes/security.routes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
