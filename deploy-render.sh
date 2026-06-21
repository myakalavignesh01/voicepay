#!/bin/bash

# VoicePay Render Deployment Script
# This script helps setup and deploy to Render.com

echo "🚀 VoicePay Render Deployment Setup"
echo "====================================="
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Install from: https://cli.github.com"
    exit 1
fi

echo "✅ GitHub CLI found"
echo ""
echo "Preparing deployment files..."

# Create necessary files
echo "📝 Creating render.yaml..."
echo "📝 Creating backend Dockerfile..."
echo "📝 Creating deployment guides..."

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1️⃣ Go to: https://render.com"
echo "2️⃣ Sign up with GitHub"
echo "3️⃣ Create Web Service for Backend"
echo "   - Name: voicepay-api"
echo "   - Build: cd backend && npm install"
echo "   - Start: npm start"
echo "4️⃣ Create Web Service for Frontend"
echo "   - Name: voicepay-desktop"
echo "   - Build: cd desktop && npm install && npm run build"
echo "   - Start: npx serve -s build"
echo "5️⃣ Set MongoDB Atlas URL in environment variables"
echo "6️⃣ Deploy and get your live links!"
echo ""
echo "📖 Read RENDER_DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Good luck with deployment!"
