const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Contact = require('../models/Contact');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.userId });
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, upiId } = req.body;
    const contact = new Contact({ userId: req.userId, name, phone, upiId });
    await contact.save();
    res.status(201).json({ message: 'Contact added', contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:contactId', authMiddleware, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.contactId);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
