const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/process', authMiddleware, async (req, res) => {
  try {
    const { text, language = 'en-IN' } = req.body;

    // Parse voice command
    const lowerText = text.toLowerCase();
    const amountMatch = lowerText.match(/(\d+)/);
    const amount = amountMatch ? parseInt(amountMatch[1]) : null;

    res.json({
      message: 'Voice processed',
      command: text,
      confidence: 0.95,
      parsed: { amount, raw: text }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/settings', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      voiceEnabled: user.voiceEnabled,
      language: user.voiceLanguage,
      accuracy: user.voiceAccuracy
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/settings', authMiddleware, async (req, res) => {
  try {
    const { voiceEnabled, language } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { voiceEnabled, voiceLanguage: language },
      { new: true }
    );
    res.json({ message: 'Settings updated', settings: { voiceEnabled, language } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
