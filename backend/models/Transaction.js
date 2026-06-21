const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentMethod: { type: String, enum: ['upi', 'card', 'wallet'], required: true },
  description: String,
  category: { type: String, enum: ['transfer', 'bill', 'shopping', 'food', 'transport', 'other'] },
  tags: [String],
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'], default: 'pending' },
  failureReason: String,
  voiceInitiated: { type: Boolean, default: false },
  voiceAccuracy: Number,
  voiceCommand: String,
  fraudDetectionScore: { type: Number, default: 0 },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  securityChecksPassed: { type: Boolean, default: false },
  ipAddress: String,
  gatewayTransactionId: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completedAt: Date
});

transactionSchema.index({ senderId: 1, createdAt: -1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
