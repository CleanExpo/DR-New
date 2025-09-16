# 🔧 BUILD REFERENCE - Disaster Recovery Brisbane

## ✅ CURRENT WORKING STATE (December 2024)
**Last Verified:** Website fully functional on localhost:3002
**Repository:** https://github.com/CleanExpo/DR-New.git
**Last Commit:** All fixes applied and tested

---

## 🚀 STANDARD BUILD PROCEDURE

### ALWAYS Follow This Sequence:

```bash
# 1. PULL LATEST CHANGES
git pull origin main

# 2. INSTALL DEPENDENCIES (if package.json changed)
npm install

# 3. CLEAR CACHE (IMPORTANT - prevents webpack errors)
rm -rf .next

# 4. START DEVELOPMENT SERVER
npm run dev

# 5. VERIFY IN BROWSER
# Open: http://localhost:3000 (or 3001, 3002 if ports in use)
```

---

## 🛠 CRITICAL FIXES REFERENCE

### 1. WEBPACK ERROR FIX
**Error:** `Cannot read properties of undefined (reading 'call')`
```bash
# SOLUTION:
rm -rf .next
npm run dev
```

### 2. HYDRATION ERROR FIX
**Location:** `components/sections/HeroPremium.tsx`
```jsx
// Add mounted state check
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

// Use conditional rendering
style={isMounted ? { transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` } : {}}
suppressHydrationWarning
```

### 3. MISSING LOGO FIX
**File:** `public/images/logo.svg`
- Created SVG logo file
- Updated Header.tsx to reference logo.svg

### 4. CSP/CSRF FIX
**File:** `middleware.ts`
```typescript
// Allow WebSocket for development
"connect-src 'self' ws://localhost:* wss://localhost:* ..."

// Skip CSRF in development
if (process.env.NODE_ENV === 'development') {
  return true;
}
```

---

## 📋 PRE-CHANGE CHECKLIST

### BEFORE Making Changes:
```bash
# 1. Check current branch
git status

# 2. Pull latest
git pull origin main

# 3. Create feature branch (optional)
git checkout -b feature/your-feature-name
```

### AFTER Making Changes:
```bash
# 1. Test locally
npm run dev
# Open http://localhost:3000

# 2. Run lint
npm run lint

# 3. Build test
npm run build

# 4. Commit changes
git add -A
git commit -m "Your descriptive message"

# 5. Push to GitHub
git push origin main
```

---

## 🔍 TESTING CHECKLIST

### Pages to Test:
- [ ] Homepage: `/`
- [ ] Pricing: `/pricing`
- [ ] Water Damage: `/services/water-damage-restoration`
- [ ] Fire Damage: `/services/fire-damage-restoration`
- [ ] FAQ: `/faq`
- [ ] Contact: `/contact`

### Elements to Verify:
- [ ] Logo displays correctly
- [ ] Navigation menu works
- [ ] "Rapid Triage System" (NOT "60min Response")
- [ ] Phone number: 1300 309 361
- [ ] Pricing tiers: $330, $880, $2,750, $3,300, $4,400
- [ ] All buttons clickable
- [ ] No console errors

---

## 🏗 PROJECT STRUCTURE

```
DR-New/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── pricing/           # Pricing page
│   └── services/          # Service pages
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, Services, etc.
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and integrations
│   ├── analytics/         # Analytics system
│   ├── chatbot/           # AI chatbot
│   ├── integration/       # Master integration
│   └── personalization/   # User personalization
├── public/
│   └── images/            # Static images
│       └── logo.svg       # Company logo
├── middleware.ts          # Security & routing
└── package.json          # Dependencies

```

---

## 🔴 COMMON ISSUES & SOLUTIONS

### Issue: "Port 3000 is in use"
```bash
# Server will auto-increment to 3001, 3002, etc.
# Or kill the process:
netstat -ano | grep 3000  # Find PID
kill [PID]                 # Kill process
```

### Issue: "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Issue: "Hydration mismatch"
- Check for dynamic content without suppressHydrationWarning
- Ensure consistent server/client rendering
- Add isMounted checks for client-only code

### Issue: "API 403/404 errors"
- Check middleware.ts for CSRF settings
- Verify API routes exist in app/api/
- Check for rate limiting

---

## 📦 DEPENDENCIES TO MAINTAIN

### Core Dependencies:
```json
{
  "next": "14.2.5",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "framer-motion": "^11.0.3"
}
```

### Key Libraries:
- shadcn/ui components
- Radix UI primitives
- Lucide React icons
- Socket.io client

---

## 🚨 CRITICAL BUSINESS RULES

### MUST MAINTAIN:
1. **Phone:** 1300 309 361 (everywhere)
2. **Messaging:** "Rapid Triage System" (NOT "1 hour")
3. **Spelling:** Australian English
   - organise (not organize)
   - colour (not color)
   - centre (not center)
4. **Service Areas:** Brisbane, Ipswich, Logan
5. **Pricing:** $330 - $4,400 range

### NEVER CHANGE:
- Company name: "Disaster Recovery Brisbane"
- We are a DIRECT SERVICE PROVIDER (not a platform)
- IICRC Certified messaging
- 24/7 Emergency Response

---

## 🎯 QUICK START COMMANDS

```bash
# Fresh start (use when errors occur)
rm -rf .next node_modules
npm install
npm run dev

# Normal development
git pull && npm install && npm run dev

# Production build test
npm run build && npm run start

# Full test suite
npm run lint && npm run build

# Commit and push
git add -A
git commit -m "Your message"
git push origin main
```

---

## 📱 CONTACT FOR ISSUES

**GitHub Repository:** https://github.com/CleanExpo/DR-New.git
**Check Issues:** https://github.com/CleanExpo/DR-New/issues

---

## ✅ VERIFICATION SCRIPT

Run this after any changes:
```bash
#!/bin/bash
echo "🔍 Verifying build..."
rm -rf .next
npm run build
if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  npm run dev
else
  echo "❌ Build failed - check errors above"
fi
```

---

**IMPORTANT:** Always test on localhost after changes!
**REMEMBER:** Clear .next cache if webpack errors occur!

---

Last Updated: December 2024
Status: WORKING ✅