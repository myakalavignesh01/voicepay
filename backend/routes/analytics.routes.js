const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;
    const startDate = new Date();
    
    if (timeframe === '7d') startDate.setDate(startDate.getDate() - 7);
    else if (timeframe === '30d') startDate.setDate(startDate.getDate() - 30);
    else if (timeframe === '90d') startDate.setDate(startDate.getDate() - 90);
    
    const transactions = await Transaction.find({
      senderId: req.userId,
      createdAt: { $gte: startDate },
      status: 'completed'
    });
    
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const categoryBreakdown = {};
    
    transactions.forEach(t => {
      const cat = t.category || 'other';
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + t.amount;
    });
    
    res.json({
      summary: {
        totalSpent,
        totalTransactions: transactions.length,
        averageTransaction: transactions.length > 0 ? totalSpent / transactions.length : 0,
        timeframe
      },
      categoryBreakdown,
      transactions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
