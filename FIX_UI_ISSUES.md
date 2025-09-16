# UI/UX Fixes Implementation Plan

## Issues to Fix:
1. ✅ Remove "1 Hour" response claims
2. Change to Australian English spelling
3. Fix intrusive weather alert positioning
4. Fix React hydration errors
5. Implement proper triage timeline

## Files to Update:

### 1. HeroPremium.tsx - Remove 1 Hour Claims & Fix Spelling
```tsx
// Line 14: Change from
description: '24/7 Emergency Response • 1 Hour Arrival • IICRC Certified',
// To:
description: '24/7 Emergency Response • Rapid Triage System • IICRC Certified',

// Line 46: Change response time stat
{ number: '60min', label: 'Response Time', icon: '⏱️' },
// To:
{ number: 'Rapid', label: 'Triage System', icon: '⏱️' },
```

### 2. PersonalizedHero.tsx - Fix Weather Alert Position
```tsx
// Lines 96-113: Move weather alert to bottom corner, less intrusive
{weatherContent?.hasActiveWeatherEvent && (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed bottom-4 right-4 z-30 bg-amber-500/90 text-white p-3 rounded-lg shadow-lg max-w-xs"
    style={{ fontSize: '0.875rem' }}
  >
    <button
      onClick={() => setShowWeatherAlert(false)}
      className="absolute top-1 right-1 text-white/70 hover:text-white"
    >×</button>
    <div className="flex items-start gap-2">
      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-sm">Weather Update</p>
        <p className="text-xs mt-1 opacity-90">
          {weatherContent.condition} conditions in your area
        </p>
      </div>
    </div>
  </motion.div>
)}
```

### 3. Australian English Spelling Updates
Files to update:
- Replace "Organization" with "Organisation"
- Replace "Personalization" with "Personalisation"
- Replace "Optimize" with "Optimise"
- Replace "Minimize" with "Minimise"
- Replace "Prioritize" with "Prioritise"
- Replace "Specialized" with "Specialised"
- Replace "Authorized" with "Authorised"
- Replace "Color" with "Colour" (in user-facing text)

### 4. Triage Timeline Implementation
Instead of "1 hour response", implement:
- Priority 1: Life-threatening emergencies - Immediate dispatch
- Priority 2: Major property damage - Within 2 hours
- Priority 3: Non-urgent restoration - Within 4-6 hours
- Priority 4: Preventative services - Scheduled appointment

### 5. Fix Hydration Error
The issue is in HeroPremium.tsx with dynamic content rendering differently on server vs client.

Add suppressHydrationWarning to dynamic elements:
```tsx
<motion.div
  suppressHydrationWarning
  key={currentSlide}
  // ... rest of props
>
```

## Implementation Order:
1. Fix all "1 hour" references first (critical)
2. Fix weather alert positioning (UX improvement)
3. Update to Australian spelling (localisation)
4. Fix hydration errors (performance)
5. Implement triage timeline (business requirement)