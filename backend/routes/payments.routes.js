const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/initiate', authMiddleware, async (req, res) => {
  try {
    const { amount, recipientUPI, description, paymentMethod } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const transaction = new Transaction({
      transactionId: `VP-${uuidv4()}`,
      senderId: req.userId,
      amount,
      description,
      paymentMethod: paymentMethod || 'upi',
      status: 'pending'
    });

    await transaction.save();

    res.status(201).json({
      message: 'Payment initiated',
      transaction: {
        transactionId: transaction.transactionId,
        amount: transaction.amount,
        status: transaction.status
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:transactionId/process', authMiddleware, async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findOne({ transactionId, senderId: req.userId });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const fraudScore = Math.random() * 0.5;
    transaction.fraudDetectionScore = fraudScore;

    if (fraudScore > 0.8) {
      transaction.status = 'failed';
      transaction.failureReason = 'High fraud score';
      await transaction.save();
      return res.status(403).json({ error: 'Transaction blocked' });
    }

    transaction.status = 'completed';
    transaction.completedAt = new Date();
    transaction.securityChecksPassed = true;
    await transaction.save();

    res.json({ message: 'Payment processed', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
