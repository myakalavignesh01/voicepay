const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/2fa/enable', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.twoFactorEnabled = true;
    await user.save();
    res.json({ message: '2FA enabled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/status', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      twoFactorEnabled: user.twoFactorEnabled,
      biometricEnabled: user.biometricEnabled,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      kycVerified: user.kycVerified
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
