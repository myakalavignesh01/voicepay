# VoicePay - Render Deployment Guide

## 🚀 ONE-CLICK DEPLOYMENT TO RENDER.COM

Render is the **BEST choice** because:
- ✅ **Completely Free** (with free tier)
- ✅ **Auto-deploys** from GitHub
- ✅ **Includes Free PostgreSQL/MongoDB** options
- ✅ **Custom domains** available
- ✅ **SSL/HTTPS** included
- ✅ **Auto-scaling** on paid plans
- ✅ **Environment variables** management
- ✅ **GitHub integration** (auto-redeploy on push)

---

## 📋 STEP-BY-STEP SETUP (5 MINUTES)

### Step 1: Go to Render Dashboard
```
👉 https://render.com
```

### Step 2: Sign Up with GitHub
- Click **Sign Up**
- Select **Sign up with GitHub**
- Authorize Render to access your repositories
- Select your **voicepay** repository

### Step 3: Create Backend Service

**URL:** https://dashboard.render.com/new/web

1. Click **New** → **Web Service**
2. Connect your **voicepay** repository
3. Fill in details:

```
Name: voicepay-api
Environment: Node
Build Command: cd backend && npm install
Start Command: npm start
Branch: feature/full-stack-app (or main)
Plan: Free
```

4. Click **Advanced**
5. Add Environment Variables:

```env
NODE_ENV = production
PORT = 8000
DATABASE_URL = mongodb+srv://username:password@cluster.mongodb.net/voicepay
JWT_SECRET = your_super_secret_jwt_key_12345
RAZORPAY_KEY_ID = rzp_test_xxxxxxx
RAZORPAY_KEY_SECRET = your_razorpay_secret
```

6. Click **Create Web Service**
7. **Wait 3-5 minutes for deployment**

**Your Backend URL:** `https://voicepay-api.onrender.com` ✅

---

### Step 4: Create Frontend Service

1. Click **New** → **Web Service** again
2. Same repository
3. Fill in details:

```
Name: voicepay-desktop
Environment: Node
Build Command: cd desktop && npm install && npm run build
Start Command: npx serve -s build -l 3000
Branch: feature/full-stack-app (or main)
Plan: Free
```

4. Add Environment Variables:

```env
REACT_APP_API_URL = https://voicepay-api.onrender.com
```

5. Click **Create Web Service**

**Your Frontend URL:** `https://voicepay-desktop.onrender.com` ✅

---

### Step 5: Set Up MongoDB Atlas (FREE DATABASE)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Sign Up**
3. Create account
4. Click **Create a Deployment**
5. Select **FREE (M0)** tier
6. Create cluster
7. Click **Connect**
8. Copy connection string
9. Replace username:password with your credentials
10. Add `/voicepay` to database name
11. Copy full URL and paste in Render environment variables

**Example:**
```
mongodb+srv://myuser:mypassword@cluster.mongodb.net/voicepay?retryWrites=true&w=majority
```

---

## 🎉 YOUR LIVE LINKS

After deployment completes:

```
🔗 Backend API:  https://voicepay-api.onrender.com
🔗 Web App:      https://voicepay-desktop.onrender.com
🔗 API Health:   https://voicepay-api.onrender.com/api/health
```

---

## ✅ TEST YOUR DEPLOYMENT

### 1. Test Backend Health
```bash
curl https://voicepay-api.onrender.com/api/health
```

Expected Response:
```json
{
  "status": "OK",
  "timestamp": "2024-06-21T10:30:00.000Z"
}
```

### 2. Register a User
```bash
curl -X POST https://voicepay-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### 3. Login
```bash
curl -X POST https://voicepay-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

You'll get a response with a **token** - Save this!

### 4. Access Your Profile
```bash
curl https://voicepay-api.onrender.com/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🌐 VISIT YOUR LIVE APP

Open in browser:
```
https://voicepay-desktop.onrender.com
```

You'll see:
- ✅ Login page
- ✅ Register form
- ✅ Dashboard (after login)
- ✅ Payment management
- ✅ Settings page

---

## 🔄 AUTO-DEPLOYMENT

Every time you push to GitHub:
```bash
git push origin feature/full-stack-app
```

Render **automatically redeploys** your app! ✅

---

## 📊 MONITOR YOUR DEPLOYMENT

### View Logs
1. Go to https://dashboard.render.com
2. Click your service
3. Click **Logs** tab
4. See real-time logs

### Restart Service
1. Go to service dashboard
2. Click **Settings** → **Restart**

---

## 🚨 TROUBLESHOOTING

### Service not deploying?
```bash
# Check build command is correct
cd backend && npm install  # This should work locally first
```

### Database connection failed?
```
1. Check MongoDB Atlas IP whitelist
2. Click Network Access
3. Add 0.0.0.0/0 (allow all IPs)
4. Update DATABASE_URL in Render
```

### 503 Service Unavailable?
```
1. Check Backend API logs
2. Restart the service
3. Wait 2-3 minutes
```

### Frontend can't reach API?
```
1. Check REACT_APP_API_URL is correct
2. Rebuild desktop service
3. Check CORS is enabled in backend
```

---

## 💰 PRICING

**FREE TIER (Recommended):**
- ✅ 2 Web Services
- ✅ 0.5 GB RAM each
- ✅ Auto-sleep after 15 min inactivity
- ✅ Free SSL
- ✅ GitHub integration

**Pro ($7/month per service):**
- ✅ Always running (no auto-sleep)
- ✅ 1 GB RAM
- ✅ Custom domain
- ✅ Priority support

---

## 🎯 NEXT STEPS

1. ✅ Deploy Backend to Render
2. ✅ Deploy Frontend to Render
3. ✅ Set up MongoDB Atlas
4. ✅ Test API endpoints
5. ✅ Visit live app
6. ✅ Share your links!

---

## 📱 MOBILE APP

For mobile app deployment:
```bash
cd frontend
eas build --platform ios   # For iOS
eas build --platform android  # For Android
```

Then submit to:
- Apple App Store
- Google Play Store

---

## 🔐 PRODUCTION SECURITY

Before going live:
- [ ] Change JWT_SECRET to random 32-char string
- [ ] Enable HTTPS (automatic on Render)
- [ ] Set strong database password
- [ ] Add API rate limiting
- [ ] Enable 2FA
- [ ] Set up backups

---

## ✨ CUSTOM DOMAIN (Optional)

Want `voicepay.com` instead of `voicepay-api.onrender.com`?

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Render Dashboard → Settings
3. Add custom domain
4. Update DNS records
5. Verify domain

---

**🎉 Congratulations! Your VoicePay App is LIVE!**

```
🟢 Backend:  https://voicepay-api.onrender.com
🟢 Frontend: https://voicepay-desktop.onrender.com
🟢 Mobile:   Ready for App Store/Play Store
```

**Share these links with your team!**

---

Need help? Check Render docs: https://render.com/docs
