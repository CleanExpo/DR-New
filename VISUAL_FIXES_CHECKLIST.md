# VISUAL FIXES CHECKLIST
## Disaster Recovery Brisbane - WCAG AAA Compliance

**Use this checklist to track implementation progress**
**Estimated Total Time**: 6-7 hours

---

## PRIORITY 1: CRITICAL FIXES (1-2 hours)

### Global Setup (5 minutes)
- [ ] Import `src/styles/contrast-aaa-fixes.css` in `src/styles/globals.css`
- [ ] Update Tailwind config emergency colors (emergency-600 → 700)
- [ ] Update Tailwind config primary colors (primary-600 → 700)
- [ ] Verify import order: design-system → contrast-fixes → micro-interactions

### EmergencyCTA Component (5 minutes)
**File**: `components/EmergencyCTA-Enhanced.tsx`

- [ ] Line 36: Desktop gradient `from-emergency-600` → `from-emergency-700`
- [ ] Line 36: Desktop gradient `to-emergency-700` → `to-emergency-800`
- [ ] Line 92: Tablet gradient `from-emergency-600` → `from-emergency-700`
- [ ] Line 92: Tablet gradient `to-emergency-700` → `to-emergency-800`
- [ ] Line 125: Mobile gradient `from-emergency-600` → `from-emergency-700`
- [ ] Line 125: Mobile gradient `to-emergency-700` → `to-emergency-800`
- [ ] Line 154: Icon color `text-emergency-600` → `text-emergency-800`
- [ ] Add `motion-reduce:animate-none` to all pulse animations

### Header Component (5 minutes)
**File**: `components/Header-Enhanced.tsx`

- [ ] Line 29: Emergency bar gradient `from-emergency-600` → `from-emergency-700`
- [ ] Line 29: Emergency bar gradient `to-emergency-700` → `to-emergency-800`
- [ ] Line 103: Desktop CTA `from-emergency-600` → `from-emergency-700`
- [ ] Line 103: Desktop CTA `to-emergency-700` → `to-emergency-800`
- [ ] Line 115: Mobile CTA `from-emergency-600` → `from-emergency-700`
- [ ] Line 115: Mobile CTA `to-emergency-700` → `to-emergency-800`
- [ ] Line 148: Mobile menu hover `bg-primary-50` → `bg-primary-100`
- [ ] Line 148: Mobile menu hover `text-primary-700` → `text-primary-900`
- [ ] Line 176: Book button `bg-primary-600` → `bg-primary-700`
- [ ] Line 176: Book button hover `hover:bg-primary-700` → `hover:bg-primary-800`

### Footer Component (10 minutes)
**File**: `components/Footer-Enhanced.tsx`

- [ ] Line 28: Description `text-neutral-400` → `text-neutral-300`
- [ ] Lines 56-150: All links `text-neutral-400` → `text-neutral-300` (use find/replace)
- [ ] Line 207: Copyright `text-neutral-500` → `text-neutral-300`
- [ ] Line 211: Meta info `text-neutral-600` → `text-neutral-400`
- [ ] Line 219: Bottom links `text-neutral-500` → `text-neutral-300`
- [ ] Line 242: Emergency strip `from-emergency-600` → `from-emergency-700`
- [ ] Line 242: Emergency strip `to-emergency-700` → `to-emergency-800`

### Homepage - Hero Section (5 minutes)
**File**: `app/page.tsx`

- [ ] Line 18: Hero overlay `from-black/75` → `from-black/85`
- [ ] Line 18: Hero overlay `to-black/55` → `to-black/70`
- [ ] Line 22: Master badge `bg-yellow-500 text-black` → `bg-premium-700 text-white`
- [ ] Line 43: Emergency button `bg-red-600` → `bg-emergency-700`
- [ ] Line 43: Emergency button hover `hover:bg-red-700` → `hover:bg-emergency-800`
- [ ] Line 51: Quote button `bg-yellow-500 text-black` → `bg-premium-700 text-white`
- [ ] Line 51: Quote button hover `hover:bg-yellow-400` → `hover:bg-premium-800`

### Homepage - Trust Signals (3 minutes)
**File**: `app/page.tsx`

- [ ] Line 71: Section background replace with solid `bg-primary-900`
- [ ] Line 75: Description `text-blue-200` → `text-primary-100`
- [ ] Verify all trust signal cards have white text

### Homepage - Service Cards (10 minutes)
**File**: `app/page.tsx` (lines 126-179)

- [ ] Water icon: `text-blue-600` → `text-primary-700`
- [ ] Fire icon: `text-red-600` → `text-emergency-700`
- [ ] Mould icon: `text-green-600` → `text-success-700`
- [ ] Water link: `text-blue-600` → `text-primary-700`
- [ ] Water link hover: `hover:text-blue-700` → `hover:text-primary-800`
- [ ] Fire link: `text-red-600` → `text-emergency-700`
- [ ] Fire link hover: `hover:text-red-700` → `hover:text-emergency-800`
- [ ] Mould link: `text-green-600` → `text-success-700`
- [ ] Mould link hover: `hover:text-green-700` → `hover:text-success-800`

### Homepage - Final CTA (10 minutes)
**File**: `app/page.tsx` (lines 391-444)

- [ ] Line 391: Section `from-red-600` → `from-emergency-700`
- [ ] Line 391: Section `via-red-700` → `via-emergency-800`
- [ ] Line 391: Section `to-red-800` → `to-emergency-900`
- [ ] Line 395: Badge `bg-yellow-500 text-black` → `bg-premium-700 text-white`
- [ ] Line 395: Add `motion-reduce:animate-none` to pulse
- [ ] Line 403: Text `text-red-100` → `text-white`
- [ ] Line 405: Text `text-red-100` → `text-white`
- [ ] Line 411: Button text `text-red-600` → `text-emergency-800`
- [ ] Line 418: Button `bg-yellow-500 text-black` → `bg-premium-700 text-white`
- [ ] Line 418: Button hover `hover:bg-yellow-400` → `hover:bg-premium-800`
- [ ] Lines 427, 439: Labels `text-red-100` → `text-white`

### Test Priority 1 Fixes
- [ ] Run local dev server: `npm run dev`
- [ ] Open homepage: `http://localhost:3000`
- [ ] Test emergency CTA visibility (mobile + desktop)
- [ ] Test header emergency bar readability
- [ ] Test footer text readability
- [ ] Test all buttons on homepage
- [ ] Check contrast with browser DevTools
- [ ] Test at 200% zoom
- [ ] Run Lighthouse accessibility audit: Should be >90

---

## PRIORITY 2: GLOBAL STANDARDIZATION (30 minutes)

### VS Code Find & Replace
**Settings**: Match Whole Word: ON, Match Case: ON

#### Emergency Colors
- [ ] Find: `bg-red-600` Replace: `bg-emergency-700`
- [ ] Find: `bg-red-700` Replace: `bg-emergency-800`
- [ ] Find: `text-red-600` Replace: `text-emergency-700`
- [ ] Find: `text-red-700` Replace: `text-emergency-800`
- [ ] Find: `from-red-600` Replace: `from-emergency-700`
- [ ] Find: `via-red-700` Replace: `via-emergency-800`
- [ ] Find: `to-red-800` Replace: `to-emergency-900`
- [ ] Find: `border-red-600` Replace: `border-emergency-700`
- [ ] Find: `hover:bg-red-700` Replace: `hover:bg-emergency-800`

#### Primary Colors
- [ ] Find: `bg-blue-600` Replace: `bg-primary-700`
- [ ] Find: `bg-blue-900` Replace: `bg-primary-900`
- [ ] Find: `text-blue-600` Replace: `text-primary-700`
- [ ] Find: `text-blue-200` Replace: `text-primary-100`
- [ ] Find: `from-blue-600` Replace: `from-primary-700`
- [ ] Find: `border-blue-600` Replace: `border-primary-700`
- [ ] Find: `hover:text-blue-700` Replace: `hover:text-primary-800`

#### Premium/Gold Colors
- [ ] Find: `bg-yellow-500 text-black` Replace: `bg-premium-700 text-white`
- [ ] Find: `bg-yellow-400` Replace: `bg-premium-700`
- [ ] Find: `text-yellow-500` Replace: `text-premium-700`
- [ ] Find: `bg-premium-500` Replace: `bg-premium-700`
- [ ] Find: `bg-premium-600` Replace: `bg-premium-700`

#### Success Colors
- [ ] Find: `text-green-600` Replace: `text-success-700`
- [ ] Find: `bg-green-600` Replace: `bg-success-700`

#### Other Color Fixes
- [ ] Find: `text-orange-600` Replace: `text-warning-700`
- [ ] Find: `text-purple-600` Replace: `text-purple-700`

### Verify Replacements
- [ ] Search for remaining `red-600` instances (should be 0)
- [ ] Search for remaining `blue-600` instances (should be 0)
- [ ] Search for remaining `yellow-` instances (should be minimal)
- [ ] Review git diff for unintended changes

---

## PRIORITY 3: MOTION PREFERENCES (20 minutes)

### Add motion-reduce Classes

#### Components with Pulse Animations
**Files to update**:

1. **EmergencyCTA-Enhanced.tsx**
   - [ ] Line 43: `animate-ping` → `animate-ping motion-reduce:hidden`
   - [ ] Line 49: `group-hover:animate-pulse` → `group-hover:animate-pulse motion-reduce:animate-none`
   - [ ] Line 56: `animate-pulse` → `animate-pulse motion-reduce:animate-none`
   - [ ] Line 130: `animate-ping` → `animate-ping motion-reduce:hidden`

2. **Header-Enhanced.tsx**
   - [ ] Line 33: `animate-pulse` → `animate-pulse motion-reduce:animate-none`
   - [ ] Line 105: `group-hover:animate-pulse` → `group-hover:animate-pulse motion-reduce:animate-none`

3. **Footer-Enhanced.tsx**
   - [ ] Line 168: `group-hover:animate-pulse` → `group-hover:animate-pulse motion-reduce:animate-none`
   - [ ] Line 246: `animate-pulse` → `animate-pulse motion-reduce:animate-none`

4. **app/page.tsx**
   - [ ] Line 45: `animate-pulse` → `animate-pulse motion-reduce:animate-none`
   - [ ] Line 395: `animate-pulse` → `animate-pulse motion-reduce:animate-none`
   - [ ] Line 413: `animate-pulse` → `animate-pulse motion-reduce:animate-none`

#### Components with Transform Animations
- [ ] All hover:-translate-y → add `motion-reduce:hover:translate-y-0`
- [ ] All hover:scale → add `motion-reduce:hover:scale-100`
- [ ] All transition-transform → add `motion-reduce:transition-none`

### Test Motion Preferences
- [ ] Enable "Reduce motion" in OS settings (Windows/Mac)
- [ ] Verify all pulse animations stop
- [ ] Verify all hover transforms disabled
- [ ] Verify page remains usable without animations

---

## PRIORITY 4: COMPONENT UPDATES (1-2 hours)

### Button Component System
**File**: `components/ui/button.tsx`

- [ ] Line 14: `bg-primary-600` → `bg-primary-700`
- [ ] Line 14: `hover:bg-primary-700` → `hover:bg-primary-800`
- [ ] Line 18: `bg-emergency-600` → `bg-emergency-700`
- [ ] Line 18: `hover:bg-emergency-700` → `hover:bg-emergency-800`
- [ ] Line 42: Premium gradient `from-premium-500` → `from-premium-700`
- [ ] Line 42: Premium gradient `via-primary-600` → `via-primary-700`
- [ ] Line 42: Premium gradient `to-success-600` → `to-success-700`
- [ ] Add `motion-reduce` classes to all transform animations

### Card Component System
**File**: `components/ui/card.tsx`

- [ ] Verify title uses `text-neutral-900` (16.2:1 ✓)
- [ ] Verify description uses `text-neutral-600` (9.2:1 ✓)
- [ ] Add motion-reduce to hover transforms

### Badge Components
**Find all badge usages and verify**:

- [ ] Emergency badges use `bg-emergency-700`
- [ ] Success badges use `bg-success-700`
- [ ] Premium badges use `bg-premium-700`
- [ ] No yellow-500 badges remain

---

## PRIORITY 5: SERVICE PAGES (30 minutes)

### Water Damage Emergency Page
**File**: `app/emergency/water-damage-brisbane/page.tsx`

- [ ] Update all blue colors to primary-700
- [ ] Fix emergency CTA colors
- [ ] Test contrast on all sections

### Fire Damage Emergency Page
**File**: `app/emergency/fire-damage-brisbane/page.tsx`

- [ ] Update all red colors to emergency-700
- [ ] Fix hero overlay opacity
- [ ] Test CTA visibility

### Storm Damage Page
**File**: `app/emergency/storm-damage-queensland/page.tsx`

- [ ] Update purple colors to ensure 7:1+ contrast
- [ ] Fix any gradient overlays
- [ ] Test emergency CTAs

### Service Category Pages
- [ ] `/services/water-damage-restoration`
- [ ] `/services/fire-damage-restoration`
- [ ] `/services/mould-remediation`
- [ ] `/services/storm-damage`
- [ ] `/services/commercial`

**For each page**:
- [ ] Check hero overlay opacity
- [ ] Fix icon colors
- [ ] Fix CTA button colors
- [ ] Test contrast on all sections

---

## TESTING CHECKLIST

### Automated Testing
- [ ] Run: `npm run dev`
- [ ] Open Lighthouse DevTools
- [ ] Run accessibility audit on homepage
- [ ] Score should be >95 (up from ~75)
- [ ] Install: `npm install -D @axe-core/cli`
- [ ] Run: `npx axe http://localhost:3000`
- [ ] Should show 0 critical issues (down from 15)
- [ ] Test all emergency pages
- [ ] Test all service pages

### Manual Testing - Desktop
- [ ] Homepage contrast check (all sections)
- [ ] Emergency CTA visible and readable
- [ ] Header emergency bar readable
- [ ] Footer text readable at normal size
- [ ] Footer text readable at 200% zoom
- [ ] All buttons clearly visible
- [ ] All icons clearly visible
- [ ] Service cards readable
- [ ] No horizontal scroll at any size
- [ ] Focus indicators clearly visible

### Manual Testing - Tablet
- [ ] Emergency CTA side button visible
- [ ] All text readable at normal size
- [ ] Layout doesn't break
- [ ] Touch targets meet 44px minimum
- [ ] Gradients maintain contrast

### Manual Testing - Mobile
- [ ] Emergency CTA bottom bar visible
- [ ] Bottom bar text readable
- [ ] Header emergency bar readable (small screen)
- [ ] Footer text readable
- [ ] All buttons meet touch target size
- [ ] Mobile menu readable
- [ ] No text cutoff
- [ ] No layout shift when loading

### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Accessibility Testing
- [ ] Test with keyboard only (Tab navigation)
- [ ] Focus order is logical
- [ ] All interactive elements reachable
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] All content announced correctly
- [ ] Images have alt text
- [ ] Test with 200% zoom
- [ ] No horizontal scroll
- [ ] All text readable
- [ ] Test with Windows High Contrast
- [ ] All content remains visible
- [ ] Test with Reduced Motion enabled
- [ ] No animations play
- [ ] Site remains functional

### Color Contrast Verification
- [ ] Use WebAIM Contrast Checker on 10 random text combinations
- [ ] All should show 7:1 or higher
- [ ] Emergency buttons: 7.8:1 ✓
- [ ] Primary buttons: 8.1:1 ✓
- [ ] Footer text: 7.8:1 ✓
- [ ] Service icons: 7.5:1+ ✓

---

## PRE-DEPLOYMENT CHECKLIST

### Code Quality
- [ ] No console errors in browser
- [ ] No React warnings in console
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No ESLint errors: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] All tests pass: `npm run test`

### Git
- [ ] Review all changes: `git diff`
- [ ] Stage fixes: `git add .`
- [ ] Commit: `git commit -m "fix: WCAG AAA compliance - all contrast issues resolved"`
- [ ] Push to branch: `git push origin visual-fixes`

### Staging Deployment
- [ ] Deploy to staging: `vercel --env staging`
- [ ] Test staging URL with Lighthouse
- [ ] Test staging URL with axe
- [ ] Manual testing on staging
- [ ] Get approval from stakeholders

### Production Deployment
- [ ] Final review of changes
- [ ] Deploy to production: `vercel --prod`
- [ ] Verify production URL
- [ ] Run final Lighthouse audit
- [ ] Monitor for errors (first 30 minutes)
- [ ] Update documentation

---

## POST-DEPLOYMENT VERIFICATION

### Immediate (First Hour)
- [ ] Homepage loads correctly
- [ ] Emergency CTA visible on mobile
- [ ] Emergency CTA visible on desktop
- [ ] Footer text readable
- [ ] No console errors
- [ ] Analytics tracking working

### First 24 Hours
- [ ] Monitor error rates
- [ ] Check conversion rates
- [ ] Review user feedback
- [ ] Check bounce rates
- [ ] Verify SEO rankings stable

### First Week
- [ ] Run comprehensive accessibility audit
- [ ] Gather user feedback
- [ ] Review analytics data
- [ ] Check for any reported issues
- [ ] Document lessons learned

---

## SUCCESS METRICS

### Before Fixes
- WCAG AAA Compliance: 42%
- Lighthouse Accessibility: ~75
- axe Critical Issues: 15
- Contrast Failures: 15

### After Fixes (Target)
- WCAG AAA Compliance: 100%
- Lighthouse Accessibility: 95+
- axe Critical Issues: 0
- Contrast Failures: 0

### Monitor
- [ ] Lighthouse score >95 ✓
- [ ] axe shows 0 critical issues ✓
- [ ] All manual tests pass ✓
- [ ] No user complaints about readability ✓
- [ ] Conversion rates stable or improved ✓

---

## COMPLETION SIGN-OFF

### Development Team
- [ ] All Priority 1 fixes completed
- [ ] All Priority 2 fixes completed
- [ ] All Priority 3 fixes completed
- [ ] All tests passed
- [ ] Code reviewed
- [ ] Deployed to staging

**Developer**: ___________________ Date: ___________

### QA Team
- [ ] Manual testing completed
- [ ] Automated tests passed
- [ ] Cross-browser testing completed
- [ ] Accessibility testing completed
- [ ] No critical issues found

**QA Lead**: ___________________ Date: ___________

### Project Manager
- [ ] All deliverables completed
- [ ] Timeline met
- [ ] Budget within estimate
- [ ] Stakeholders informed
- [ ] Approved for production

**PM**: ___________________ Date: ___________

### Production Deployment
- [ ] Staging approved
- [ ] Production deployed
- [ ] Verification completed
- [ ] Monitoring in place
- [ ] Documentation updated

**Deploy Engineer**: ___________________ Date: ___________

---

## ROLLBACK PLAN

If critical issues found after deployment:

1. **Immediate**: `vercel rollback` to previous version
2. **Document**: Log all issues found
3. **Fix**: Address issues in development
4. **Re-test**: Complete testing cycle again
5. **Re-deploy**: When fixes verified

**Emergency Contact**: [Your Contact Info]

---

**CHECKLIST COMPLETE** ✓

**Total Items**: 150+
**Estimated Time**: 6-7 hours
**Priority Level**: CRITICAL

---

**Save progress regularly by checking off completed items!**
