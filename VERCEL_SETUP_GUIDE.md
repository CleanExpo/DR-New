# 🚀 Vercel Environment Variables Setup Guide

## Quick Reference - Updating Vercel Environment Variables

### Method 1: Vercel Dashboard (Recommended)

1. **Login to Vercel**

   - Go to: https://vercel.com/dashboard
   - Login with your account

2. **Select Your Project**

   - Find and click on: `dr-new-ten`

3. **Navigate to Environment Variables**

   - Click on "Settings" tab
   - Click on "Environment Variables" in the sidebar

4. **Add/Update Variables** For each variable below, click "Add New" or "Edit":

```
GOOGLE_CLIENT_ID
Value: [Your new Client ID from Google Cloud Console]
Environment: Production, Preview, Development
```

```
GOOGLE_CLIENT_SECRET
Value: [Your new Client Secret from Google Cloud Console]
Environment: Production, Preview, Development
```

```
GOOGLE_API_KEY
Value: [Your new API Key from Google Cloud Console]
Environment: Production, Preview, Development
```

```
GOOGLE_MAPS_API_KEY
Value: [Same as GOOGLE_API_KEY]
Environment: Production, Preview, Development
```

```
NEXTAUTH_SECRET
Value: [Your new NextAuth secret from rotation script]
Environment: Production, Preview, Development
```

```
NEXTAUTH_URL
Value: https://dr-new-ten.vercel.app
Environment: Production
```

```
NEXT_PUBLIC_APP_URL
Value: https://dr-new-ten.vercel.app
Environment: Production
```

```
GMB_EMAIL
Value: disasterrecovery8@gmail.com
Environment: Production, Preview, Development
```

5. **Save Changes**

   - Click "Save" for each variable

6. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." menu on the latest deployment
   - Click "Redeploy"
   - ✅ Check "Use existing Build Cache" for faster deployment
   - Click "Redeploy"

---

### Method 2: Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project (if not already linked)
vercel link

# Add environment variables
vercel env add GOOGLE_CLIENT_ID production
# Paste your value when prompted

vercel env add GOOGLE_CLIENT_SECRET production
# Paste your value when prompted

vercel env add GOOGLE_API_KEY production
# Paste your value when prompted

vercel env add NEXTAUTH_SECRET production
# Paste your value when prompted

# Pull environment variables to local (optional)
vercel env pull .env.local
```

---

## 🔐 Security Checklist After Update

- [ ] All new environment variables added to Vercel
- [ ] Variables set for all environments (Production, Preview, Development)
- [ ] Application redeployed successfully
- [ ] Tested production site and verified OAuth works
- [ ] Tested production site and verified Maps/GMB works
- [ ] Old Google OAuth credentials deleted from Google Cloud Console
- [ ] Old Google API Key deleted from Google Cloud Console
- [ ] Confirmed `.env.production` is not in Git repository
- [ ] Team members notified of changes (if applicable)

---

## 🧪 Testing Your Deployment

After redeployment, test these critical functions:

1. **Authentication Flow**

   - Visit: https://dr-new-ten.vercel.app
   - Try logging in with Google OAuth
   - Verify successful authentication

2. **Maps Functionality**

   - Navigate to pages using Google Maps
   - Verify maps load correctly
   - Check browser console for API errors

3. **GMB Integration** (if applicable)

   - Test any Google My Business features
   - Verify API calls succeed

4. **Monitor for Errors**
   - Check Vercel deployment logs
   - Check Sentry (if configured) for errors
   - Monitor for the first 24 hours

---

## ⚠️ Troubleshooting

### OAuth Not Working

**Symptom**: "Error: redirect_uri_mismatch" or OAuth fails

**Solution**:

1. Go to Google Cloud Console
2. Edit OAuth 2.0 Client ID
3. Verify authorized redirect URIs include:
   ```
   https://dr-new-ten.vercel.app/api/auth/callback
   https://dr-new-ten.vercel.app/api/gmb/callback
   ```

### Maps Not Loading

**Symptom**: "This page can't load Google Maps correctly"

**Solution**:

1. Go to Google Cloud Console
2. Edit API Key
3. Verify HTTP referrers include:
   ```
   https://dr-new-ten.vercel.app/*
   ```
4. Verify these APIs are enabled:
   - Maps JavaScript API
   - Geocoding API
   - Places API

### Environment Variables Not Updating

**Symptom**: Old values still being used after update

**Solution**:

1. Clear deployment cache
2. Redeploy WITHOUT "Use existing Build Cache"
3. Wait 5-10 minutes for global propagation
4. Hard refresh browser (Ctrl+Shift+R)

---

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs/environment-variables
- **Google Cloud Console**: https://console.cloud.google.com/
- **NextAuth Documentation**: https://next-auth.js.org/
- **Project Security Plan**: See `SECURITY_ROTATION_PLAN.md`

---

**Last Updated**: 2025-11-10 **Priority**: CRITICAL - Complete Before Production
Use
