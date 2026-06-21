const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  upiId: { type: String, unique: true, sparse: true },
  profileImage: String,
  accountStatus: { type: String, enum: ['active', 'suspended'], default: 'active' },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  kycVerified: { type: Boolean, default: false },
  biometricEnabled: { type: Boolean, default: false },
  twoFactorEnabled: { type: Boolean, default: false },
  walletBalance: { type: Number, default: 0 },
  monthlyTransactionLimit: { type: Number, default: 100000 },
  dailyTransactionLimit: { type: Number, default: 10000 },
  totalTransactions: { type: Number, default: 0 },
  totalVolume: { type: Number, default: 0 },
  voiceEnabled: { type: Boolean, default: true },
  voiceLanguage: { type: String, default: 'en-IN' },
  voiceAccuracy: { type: Number, default: 0 },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: true },
    push: { type: Boolean, default: true }
  },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: Date
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
