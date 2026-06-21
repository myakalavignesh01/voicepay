const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const transactions = await Transaction.find({ senderId: req.userId, status: 'completed' });
    
    const insights = [];
    
    if (user.walletBalance < 10000) {
      insights.push('Consider building an emergency fund of at least ₹10,000.');
    }
    
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const avgMonthly = totalSpent / Math.max(transactions.length / 30, 1);
    if (avgMonthly > 50000) {
      insights.push('Your monthly spending is high. Consider reviewing expenses.');
    }
    
    res.json({ insights });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
