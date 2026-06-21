# VoicePay Backend API

Complete backend API for VoicePay - Voice-based Payment Platform

## 🚀 Features

✅ User authentication with JWT
✅ Payment processing & transaction management
✅ Voice command processing
✅ Contact management
✅ Analytics & insights
✅ Security with 2FA & biometric support
✅ Fraud detection system
✅ Real-time updates with WebSocket

## 📋 Installation

```bash
cd backend
npm install
cp .env.example .env
```

## 🏃 Running

```bash
npm run dev
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token
- `GET /api/auth/me` - Get user profile

### Payments
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/:transactionId/process` - Process payment

### Voice
- `POST /api/voice/process` - Process voice command
- `GET /api/voice/settings` - Get voice settings
- `PUT /api/voice/settings` - Update voice settings

### Transactions
- `GET /api/transactions` - Get transactions
- `GET /api/transactions/:transactionId` - Get transaction details

### Analytics
- `GET /api/analytics/dashboard` - Get analytics dashboard

### Insights
- `GET /api/insights` - Get personalized insights

### Security
- `POST /api/security/2fa/enable` - Enable 2FA
- `GET /api/security/status` - Get security status

## 📊 Database Models

- **User** - User account & profile
- **Transaction** - Payment transactions
- **Contact** - Saved contacts

## 🔐 Security

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Fraud detection

## 📄 License

MIT
