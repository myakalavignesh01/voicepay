const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  upiId: String,
  profileImage: String,
  lastTransaction: Date,
  totalTransactions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

contactSchema.index({ userId: 1 });

module.exports = mongoose.model('Contact', contactSchema);
