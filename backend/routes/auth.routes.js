const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const user = new User({ firstName, lastName, email, phone, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, fullName: `${user.firstName} ${user.lastName}`, email, phone }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        email,
        phone,
        walletBalance: user.walletBalance
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json({ valid: true, userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
