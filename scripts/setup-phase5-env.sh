#!/bin/bash

# Phase 5 Environment Variables Setup Script
# This script sets up all Phase 5 security and monitoring environment variables in Vercel

set -e  # Exit on error

echo "=========================================="
echo "Phase 5 Environment Variables Setup"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI found"
echo ""

# Change to project directory
cd "$(dirname "$0")/.." || exit 1

# Check if project is linked
if [ ! -d ".vercel" ]; then
    echo "⚠️  Project not linked to Vercel. Linking now..."
    vercel link --yes || true
fi

echo ""
echo "Setting up Phase 5 environment variables..."
echo ""

# Critical Variables
echo "1️⃣  Setting CSRF_SECRET (CRITICAL)..."
: "${CSRF_SECRET:?Set CSRF_SECRET securely in the current shell before running this script}"
printf '%s\n' "$CSRF_SECRET" | vercel env add CSRF_SECRET production

echo "2️⃣  Setting SECURITY_ALERT_EMAIL..."
echo "security@disasterrecovery.com.au" | vercel env add SECURITY_ALERT_EMAIL production || true

echo "3️⃣  Setting FAILED_LOGIN_THRESHOLD..."
echo "5" | vercel env add FAILED_LOGIN_THRESHOLD production || true

echo "4️⃣  Setting FAILED_LOGIN_WINDOW..."
echo "15" | vercel env add FAILED_LOGIN_WINDOW production || true

echo "5️⃣  Setting ACCOUNT_LOCKOUT_DURATION..."
echo "30" | vercel env add ACCOUNT_LOCKOUT_DURATION production || true

# File Upload Security
echo "6️⃣  Setting MAX_FILE_UPLOAD_SIZE..."
echo "10485760" | vercel env add MAX_FILE_UPLOAD_SIZE production || true

echo "7️⃣  Setting ALLOWED_FILE_TYPES..."
echo "image/jpeg,image/png,image/webp,application/pdf" | vercel env add ALLOWED_FILE_TYPES production || true

# Session Security
echo "8️⃣  Setting MAX_CONCURRENT_SESSIONS..."
echo "3" | vercel env add MAX_CONCURRENT_SESSIONS production || true

echo "9️⃣  Setting SESSION_DEVICE_TRACKING..."
echo "true" | vercel env add SESSION_DEVICE_TRACKING production || true

echo ""
echo "✅ Phase 5 environment variables set successfully!"
echo ""
echo "Optional variables to set manually (optional):"
echo "  - VIRUS_SCAN_API_KEY (VirusTotal)"
echo "  - NEXT_PUBLIC_GA4_MEASUREMENT_ID (Google Analytics)"
echo "  - SENTRY_DSN (Sentry error tracking)"
echo "  - TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER (SMS notifications)"
echo ""
echo "To set these manually, use:"
echo "  vercel env add VARIABLE_NAME production"
echo ""
echo "Then redeploy with:"
echo "  git push origin main"
echo ""
