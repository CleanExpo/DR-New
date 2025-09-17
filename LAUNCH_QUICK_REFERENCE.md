# ⚡ LAUNCH DAY QUICK REFERENCE

## 🔴 STOP! Fix These First (4 Hours Total)

### 1. Hero Image (30 min) - CRITICAL
```bash
# The 2MB image is killing performance!
# Go to: https://squoosh.app
# Upload: public/images/hero/hero-disaster-tornado.png
# Settings:
  - Resize: 1920px width
  - Format: WebP
  - Quality: 85%
  - Save as: hero-disaster-tornado.webp
# Replace in code
```

### 2. SSL Certificate (2 hours)
```bash
# EASIEST: Deploy to Vercel
1. Push code to GitHub
2. Import to Vercel
3. Add custom domain
4. SSL auto-configured!

# OR traditional hosting:
- Get cert from Let's Encrypt
- Install on server
```

### 3. Other Hero Images (30 min)
```bash
# Convert these to WebP:
- biohazard-remediation-services.png (880KB)
- sewage-remediation-services.png (640KB)
# Use same process as above
```

### 4. Test & Deploy (1 hour)
```bash
npm run build     # Should work now
npm run start     # Test locally
git push main     # Deploy
```

---

## ✅ Already Fixed Today
- Removed 7 heavy dependencies (saved 150MB!)
- Fixed build errors
- Created optimized components
- Updated Next.js config

---

## 📱 Mobile Sticky CTA (10 min)
Add to `app/layout.tsx`:
```tsx
import MobileStickyCAT from '@/components/ui/MobileStickyCAT';

// In body:
<MobileStickyCAT />
```

---

## 🚀 Commands You Need
```bash
# Development
npm run dev              # Start dev server

# Testing
npm run build           # Build for production
npm run start          # Test production build
npm run lighthouse     # Check performance

# Deploy
git add .
git commit -m "Launch optimizations"
git push origin main
```

---

## 🎯 Performance Targets
- Load Time: < 2 seconds ✅
- Hero Images: < 300KB each ✅
- Bundle Size: < 300KB ✅
- Mobile Score: 90+ ✅

---

## ⏱️ Time Estimate
- Image optimization: 1 hour
- SSL setup: 2 hours
- Testing: 30 minutes
- Deployment: 30 minutes
**TOTAL: 4 hours to launch-ready**

---

## 🆘 If Something Breaks
1. Check `LAUNCH_DAY_AUDIT_REPORT.md` for details
2. Run `npm run build` to see errors
3. Image issues? Use TinyPNG as backup
4. SSL issues? Use Vercel for easy fix

---

**REMEMBER**: DO NOT launch without SSL and optimized images!