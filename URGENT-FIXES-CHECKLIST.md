# URGENT FIXES CHECKLIST

## 🚨 CRITICAL - FIX IMMEDIATELY (BLOCKING)

### 1. Production Site Performance Crisis
**Status:** 🔴 SITE DOWN
**Impact:** Complete loss of all web traffic and conversions
**Time Estimate:** 1-4 hours

**Actions:**
```bash
# Step 1: Check Vercel deployment status
vercel logs --prod --limit 100

# Step 2: Check last successful deployment
vercel list

# Step 3: Rollback if needed
vercel promote [previous-working-deployment-url]

# Step 4: Check environment variables
vercel env ls

# Step 5: Monitor site
curl -w "@curl-format.txt" -o /dev/null -s https://disasterrecovery.com.au
```

**Investigation Checklist:**
- [ ] Check Vercel dashboard for errors
- [ ] Review deployment logs
- [ ] Check environment variables set correctly
- [ ] Test API routes individually
- [ ] Check database connection
- [ ] Review recent code changes
- [ ] Check DNS and SSL certificate
- [ ] Monitor server resource usage

**Success Criteria:**
- [ ] Site loads in < 3 seconds
- [ ] All pages accessible
- [ ] No timeout errors
- [ ] Vercel functions executing normally

---

## 🔴 HIGH PRIORITY - FIX TODAY (0-4 hours)

### 2. Contact Page Mobile Overflow
**File:** `src/app/contact/page.tsx`
**Time Estimate:** 15-30 minutes

**Fix:**
```tsx
// Find the form container or main wrapper
// Add these CSS classes or styles:

<div className="w-full max-w-full px-4 box-border">
  {/* Form content */}
</div>

// OR in CSS:
.contact-container {
  max-width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
}

// Check all child elements:
.contact-container * {
  max-width: 100%;
  box-sizing: border-box;
}
```

**Test:**
- [ ] View on mobile (375px width)
- [ ] No horizontal scroll bar
- [ ] All content visible without scrolling
- [ ] Form inputs don't extend beyond viewport
- [ ] Test on actual mobile device

---

### 3. Make Phone Numbers Clickable
**Files:**
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- All page components with phone numbers

**Time Estimate:** 30 minutes

**Find and Replace:**

**Current (WRONG):**
```tsx
<span>1300 309 361</span>
<p>Call us: 1300 309 361</p>
```

**New (CORRECT):**
```tsx
<a
  href="tel:1300309361"
  className="text-red-600 hover:text-red-700 font-bold"
  aria-label="Call emergency hotline: 1 3 0 0 3 0 9 3 6 1"
>
  1300 309 361
</a>
```

**Or create component:**
```tsx
// src/components/PhoneLink.tsx
export function PhoneLink({
  number = "1300309361",
  display = "1300 309 361",
  variant = "default"
}) {
  return (
    <a
      href={`tel:${number}`}
      className={cn(
        "font-semibold transition-colors",
        variant === "emergency" && "text-red-600 hover:text-red-700 text-lg",
        variant === "default" && "text-blue-600 hover:text-blue-700"
      )}
    >
      {display}
    </a>
  )
}
```

**Checklist:**
- [ ] Update header phone number
- [ ] Update footer phone number
- [ ] Update contact page phone numbers
- [ ] Update homepage phone numbers
- [ ] Update all service page phone numbers
- [ ] Test tel: links on mobile device
- [ ] Verify analytics tracking clicks

---

### 4. Add Emergency CTA to Header
**File:** `src/components/layout/Header.tsx`
**Time Estimate:** 30 minutes

**Implementation:**
```tsx
// Add to header, right side
<header className="...">
  <nav className="container mx-auto flex items-center justify-between">
    {/* Logo */}
    <Logo />

    {/* Navigation Links */}
    <div className="hidden md:flex items-center gap-6">
      <Link href="/services">Services</Link>
      <Link href="/locations/brisbane">Service Areas</Link>
      <Link href="/contact">Contact</Link>
    </div>

    {/* Emergency CTA - ALWAYS VISIBLE */}
    <a
      href="tel:1300309361"
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-all hover:scale-105"
    >
      <Phone className="w-4 h-4" />
      <span className="hidden sm:flex flex-col items-start text-sm">
        <span className="text-xs font-normal opacity-90">24/7 Emergency</span>
        <span className="text-base">1300 309 361</span>
      </span>
      <span className="sm:hidden">Call Now</span>
    </a>
  </nav>
</header>
```

**Checklist:**
- [ ] Add emergency CTA to header
- [ ] Visible on all screen sizes
- [ ] Clickable phone link
- [ ] Red color for urgency
- [ ] Shows "24/7 Emergency" text
- [ ] Responsive layout (mobile shows "Call Now")
- [ ] Hover state works
- [ ] Test on mobile and desktop

---

## 🟠 HIGH PRIORITY - FIX THIS WEEK (4-12 hours)

### 5. Fix Broken Images on Water Damage Page
**File:** `src/app/services/water-damage/page.tsx`
**Time Estimate:** 30-60 minutes

**Issue:** Images reference `/images/optimised/` but should be `/images/optimized/`

**Option 1: Fix Image Paths in Code**
```tsx
// Find all image imports/references:
// WRONG:
src="/images/optimised/damage/3D Water Damage.png"

// CORRECT:
src="/images/optimized/damage/3D Water Damage.png"

// Create helper:
const getImagePath = (category: string, filename: string) =>
  `/images/optimized/${category}/${filename}`

// Usage:
<Image
  src={getImagePath('damage', '3D Water Damage.png')}
  alt="Water damage to residential property"
  width={800}
  height={600}
/>
```

**Option 2: Rename Directories (if optimized doesn't exist)**
```bash
# Check which spelling exists:
ls "D:\DR New\public\images"

# If only optimised exists, either:
# A) Keep British spelling and fix code
# B) Rename to American spelling (recommended for SEO)
```

**Checklist:**
- [ ] Identify all broken image paths
- [ ] Choose spelling standard (optimized recommended)
- [ ] Update all image references
- [ ] Test all images load
- [ ] Check image alt text present
- [ ] Verify responsive sizing works
- [ ] Test on all viewports

---

### 6. Add H1 to Water Damage Page
**File:** `src/app/services/water-damage/page.tsx`
**Time Estimate:** 10 minutes

**Add prominent H1:**
```tsx
export default function WaterDamagePage() {
  return (
    <main>
      {/* Hero section with H1 */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Emergency Water Damage Restoration Brisbane
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            24/7 Response | IICRC Certified Master Restorer | Rapid Response Team
          </p>
          <a
            href="tel:1300309361"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-lg font-bold transition-all"
          >
            <Phone className="w-6 h-6" />
            Call Now: 1300 309 361
          </a>
        </div>
      </section>

      {/* Rest of page content */}
    </main>
  )
}
```

**H1 Best Practices:**
- [ ] Only ONE H1 per page
- [ ] Include primary keyword ("water damage restoration")
- [ ] Include location ("Brisbane", "Ipswich")
- [ ] Include unique value ("24/7", "Master Restorer")
- [ ] Visible above the fold
- [ ] Clear, descriptive, under 70 characters
- [ ] Matches page title tag

---

### 7. Fix Heading Hierarchy (Multiple Pages)
**Files:**
- `src/app/services/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/services/commercial/page.tsx`

**Time Estimate:** 30 minutes

**Problem:** Headings jump from H1 to H3, skipping H2

**Fix Pattern:**
```tsx
// WRONG:
<h1>Main Page Title</h1>
<h3>Water Damage Restoration</h3> {/* Skips H2! */}

// CORRECT:
<h1>Main Page Title</h1>
<h2>Water Damage Restoration</h2> {/* Proper hierarchy */}
<h3>Emergency Response Process</h3> {/* H3 for subsections */}
```

**Services Page Fix:**
```tsx
<h1>Professional Restoration Services</h1>

<section>
  <h2>Water Damage Restoration</h2> {/* Changed from H3 */}
  <p>Professional water damage repair...</p>

  <h3>Our Water Damage Process</h3> {/* H3 for subsections */}
</section>

<section>
  <h2>Fire Damage Restoration</h2> {/* Changed from H3 */}
  <p>Expert fire damage recovery...</p>
</section>
```

**Contact Page Fix:**
```tsx
<h1>Contact Us - 24/7 Emergency Response</h1>

<section>
  <h2>24/7 Online Support</h2> {/* Changed from H3 */}
  <p>We're available around the clock...</p>
</section>
```

**Checklist:**
- [ ] Fix services page hierarchy
- [ ] Fix contact page hierarchy
- [ ] Fix commercial page hierarchy
- [ ] Verify no H1 → H3 jumps
- [ ] Ensure only one H1 per page
- [ ] Test with screen reader
- [ ] Run accessibility audit

---

### 8. Increase Small Font Sizes
**Files:**
- `src/app/globals.css`
- Component-specific styles
- `tailwind.config.js`

**Time Estimate:** 30 minutes

**Current Problem:** Font sizes below 14px detected

**Fix in globals.css:**
```css
/* Ensure minimum readable sizes */
body {
  font-size: 16px;
  line-height: 1.6;
}

p {
  font-size: 1rem; /* 16px */
  line-height: 1.6;
}

.text-small {
  font-size: 0.875rem; /* 14px - MINIMUM */
}

/* Update any .text-xs usage */
.text-xs {
  font-size: 0.813rem; /* 13px - use very sparingly */
}

/* Mobile adjustments - DON'T go smaller */
@media (max-width: 768px) {
  body {
    font-size: 16px; /* Keep 16px minimum on mobile */
  }
}
```

**Tailwind Config:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      xs: '0.813rem',   // 13px - captions only
      sm: '0.875rem',   // 14px - minimum body
      base: '1rem',     // 16px - standard
      lg: '1.125rem',   // 18px - large body
      xl: '1.25rem',    // 20px
      // ... rest
    }
  }
}
```

**Find and Fix:**
```bash
# Search for small font sizes
grep -r "text-xs" src/
grep -r "font-size: 12px" src/
grep -r "font-size: 11px" src/

# Replace with appropriate sizes
text-xs → text-sm (in most cases)
font-size: 12px → font-size: 14px
```

**Checklist:**
- [ ] Audit all font-size declarations
- [ ] Update base body font size
- [ ] Update Tailwind config
- [ ] Replace text-xs with text-sm where appropriate
- [ ] Test readability on mobile
- [ ] Verify no text below 13px
- [ ] Run Lighthouse accessibility audit

---

### 9. Add Emergency CTAs to All Pages
**Files:** All page components
**Time Estimate:** 1-2 hours

**Create Reusable Component:**
```tsx
// src/components/EmergencyCTA.tsx
import { Phone } from 'lucide-react'

interface EmergencyCTAProps {
  variant?: 'hero' | 'inline' | 'sticky'
  className?: string
}

export function EmergencyCTA({
  variant = 'inline',
  className = ''
}: EmergencyCTAProps) {
  const baseClasses = "flex items-center gap-2 font-bold transition-all"

  const variants = {
    hero: "bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-xl shadow-xl hover:scale-105",
    inline: "bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg",
    sticky: "fixed bottom-4 right-4 md:hidden bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-pulse"
  }

  return (
    <a
      href="tel:1300309361"
      className={`${baseClasses} ${variants[variant]} ${className}`}
      aria-label="Call 24/7 emergency hotline: 1 3 0 0 3 0 9 3 6 1"
    >
      <Phone className="w-5 h-5" />
      <span className="flex flex-col items-start">
        <span className="text-xs font-normal opacity-90">24/7 Emergency</span>
        <span>1300 309 361</span>
      </span>
    </a>
  )
}
```

**Add to Each Page:**
```tsx
import { EmergencyCTA } from '@/components/EmergencyCTA'

export default function ServicePage() {
  return (
    <main>
      {/* Hero section */}
      <section className="hero">
        <h1>Service Name</h1>
        <p>Description</p>
        <EmergencyCTA variant="hero" />
      </section>

      {/* Content sections */}

      {/* Sticky mobile CTA */}
      <EmergencyCTA variant="sticky" />
    </main>
  )
}
```

**Pages to Update:**
- [ ] Homepage (/)
- [ ] Services (/services)
- [ ] Water Damage (/services/water-damage)
- [ ] Fire Damage (/services/fire-damage)
- [ ] Mould Remediation (/services/mould-remediation)
- [ ] Storm Damage (/services/storm-damage)
- [ ] Commercial (/services/commercial)
- [ ] Residential (/residential)
- [ ] Brisbane Location (/locations/brisbane)
- [ ] Ipswich Location (/locations/ipswich)
- [ ] Logan Location (/locations/logan)
- [ ] Insurance Claims (/insurance-claims)
- [ ] Contact (/contact)

**Placement Guidelines:**
- **Hero section:** Prominent, large variant
- **Above fold:** Always visible without scrolling
- **Mobile sticky:** Bottom-right floating button
- **In-content:** Inline CTAs in relevant sections

---

## 🟡 MEDIUM PRIORITY - NEXT 2 WEEKS

### 10. Add Sticky Emergency Bar (Mobile)
```tsx
// src/components/StickyEmergencyBar.tsx
export function StickyEmergencyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-red-600 text-white py-3 px-4 shadow-2xl z-50 animate-pulse">
      <a
        href="tel:1300309361"
        className="flex items-center justify-between"
      >
        <span className="font-bold">Emergency? Call Now 24/7</span>
        <span className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-full font-bold">
          <Phone className="w-4 h-4" />
          Call
        </span>
      </a>
    </div>
  )
}
```

### 11. Add Trust Badges to Header
- IICRC Master Restorer badge
- 24/7 Service badge
- Insurance Approved badge

### 12. Implement LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Disaster Recovery",
  "description": "24/7 Emergency Disaster Recovery Services in Brisbane, Ipswich, and Logan",
  "telephone": "1300-309-361",
  "priceRange": "$$",
  "openingHours": "Mo-Su 00:00-24:00",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brisbane",
    "addressRegion": "QLD",
    "addressCountry": "AU"
  }
}
```

---

## Testing Checklist

### Before Each Deployment
- [ ] Test on mobile device (real device, not emulator)
- [ ] Test all emergency CTAs clickable
- [ ] Test phone links open dialer
- [ ] Verify no horizontal scroll
- [ ] Check all images load
- [ ] Verify proper heading hierarchy
- [ ] Test keyboard navigation
- [ ] Run Lighthouse audit (target 90+)
- [ ] Check Core Web Vitals
- [ ] Test on Chrome, Safari, Firefox

### After Deployment
- [ ] Monitor Vercel deployment logs
- [ ] Check production site loads
- [ ] Test emergency CTAs on production
- [ ] Monitor error tracking (if set up)
- [ ] Check Google Search Console
- [ ] Track phone link click events
- [ ] Monitor page load times

---

## Success Metrics

### Immediate (Week 1)
- [ ] Production site loads in < 3 seconds
- [ ] 0 mobile overflow issues
- [ ] 100% phone numbers clickable
- [ ] Emergency CTAs on 100% of pages
- [ ] 0 broken images

### Short Term (Month 1)
- [ ] Mobile conversion rate: +20%
- [ ] Phone click rate: 15%+ on mobile
- [ ] Emergency CTA click rate: 10%+
- [ ] Bounce rate: -15%
- [ ] Lighthouse score: 90+

---

## Quick Command Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production locally
npm run start

# Deploy to Vercel
vercel deploy --prod

# Check production logs
vercel logs --prod

# Run Lighthouse audit
npx lighthouse https://disasterrecovery.com.au --view

# Check image paths
ls "D:\DR New\public\images"

# Search for phone numbers
grep -r "1300 309 361" src/

# Search for small fonts
grep -r "text-xs" src/
```

---

## Files Modified Summary

### Critical Files (Today)
1. `src/app/contact/page.tsx` - Fix mobile overflow
2. `src/components/layout/Header.tsx` - Add emergency CTA + clickable phone
3. `src/components/layout/Footer.tsx` - Make phone clickable

### High Priority Files (This Week)
4. `src/app/services/water-damage/page.tsx` - Add H1, fix images, add CTA
5. `src/app/services/page.tsx` - Fix heading hierarchy, add CTAs
6. `src/app/contact/page.tsx` - Fix heading hierarchy
7. `src/app/services/commercial/page.tsx` - Fix heading hierarchy
8. `src/app/globals.css` - Fix font sizes
9. `src/components/EmergencyCTA.tsx` - NEW component
10. `src/components/PhoneLink.tsx` - NEW component

### All Pages (Add CTAs)
11. `src/app/page.tsx` (homepage)
12. `src/app/residential/page.tsx`
13. `src/app/insurance-claims/page.tsx`
14. `src/app/locations/brisbane/page.tsx`
15. `src/app/locations/ipswich/page.tsx`
16. `src/app/locations/logan/page.tsx`

---

**Time Estimate:** 8-12 hours total for all critical and high priority fixes
**Expected Impact:** +30-40% conversion improvement, +20-30% SEO improvement
**Priority:** START IMMEDIATELY with production site investigation

---

Last Updated: November 6, 2025
