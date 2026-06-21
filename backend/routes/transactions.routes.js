const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = { senderId: req.userId };
    if (status) filter.status = status;
    
    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Transaction.countDocuments(filter);
    res.json({ transactions, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:transactionId', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      transactionId: req.params.transactionId,
      senderId: req.userId
    });
    if (!transaction) return res.status(404).json({ error: 'Not found' });
    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
