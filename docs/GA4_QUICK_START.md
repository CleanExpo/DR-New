# GA4 Quick Start - 5 Minute Implementation
Disaster Recovery Services Analytics Setup

## Step 1: Get Your GA4 ID (2 minutes)

1. Visit: https://analytics.google.com
2. Select or create property for "disasterrecovery.com.au"
3. Find **Measurement ID** (looks like: `G-1A2B3C4D5E`)
4. Copy it

## Step 2: Add to Environment (1 minute)

Edit `.env.local` in project root:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_ACTUAL_ID
```

Replace `G-YOUR_ACTUAL_ID` with your actual ID from Step 1.

## Step 3: Deploy (2 minutes)

**Production (Vercel):**
1. Go to: https://vercel.com/dashboard
2. Select "dr-new" project
3. Settings > Environment Variables
4. Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_ACTUAL_ID`
5. Redeploy

**Local Development:**
1. Restart dev server: `npm run dev`
2. GA will use placeholder until real ID added

## Step 4: Verify It Works (0 minutes)

Open https://disasterrecovery.com.au/

Right-click > Inspect > Console, paste:
```javascript
console.log(window.gtag ? 'GA Loaded' : 'GA Not Loaded')
```

Should show: `GA Loaded`

## Step 5: Check in BrightLocal

Run BrightLocal SEO audit again - should now show:
```
Analytics Tag Found: Yes
Measurement ID: G-YOUR_ID
```

## That's It!

GA4 is now tracking:
- Page views
- Scroll depth
- Time on page
- Core Web Vitals

## Add Custom Tracking (Optional)

### Track Phone Clicks
```tsx
// In any component with phone link
import { trackPhoneClick } from '@/lib/analytics';

<a
  href="tel:1300309361"
  onClick={() => trackPhoneClick({
    phoneNumber: '1300309361',
    context: 'homepage_hero',
    isEmergency: true
  })}
>
  1300 309 361
</a>
```

### Track Form Submissions
```tsx
// In your form submit handler
import { trackFormSubmission } from '@/lib/analytics';

trackFormSubmission({
  formName: 'contact_form',
  serviceType: data.service,
  location: data.location
});
```

### Track Emergency Requests
```tsx
import { trackEmergencyRequest } from '@/lib/analytics';

trackEmergencyRequest('water_damage', 'Brisbane');
```

## Monitor in GA4

1. Go to: https://analytics.google.com
2. Select your property
3. **Real time** > See traffic in real-time
4. **Reports** > See aggregated data

## Enable Conversion Tracking

1. GA4 > Admin > **Conversions**
2. Click "Create conversion"
3. Select event: **form_submit**
4. Name: "Contact Form"
5. Save

This will track form submissions as conversions!

## Troubleshooting

### Not seeing data?
1. Verify ID is in `.env.local`
2. Rebuild with `npm run build`
3. Wait 5-10 minutes for data to appear
4. Check: https://analytics.google.com/analytics/web/ > Real Time

### Still not working?
1. Check browser console for errors
2. Verify GA script loaded (Network tab)
3. Check measurement ID format (starts with G-)
4. Ask DevOps to verify Vercel env vars

## File Locations

- **GA Configuration:** `app/layout.tsx` (lines 208-223)
- **Tracking Functions:** `lib/analytics.ts`
- **Full Documentation:** `docs/GOOGLE_ANALYTICS_IMPLEMENTATION.md`

## Next: Advanced Tracking

See full guide: `docs/GOOGLE_ANALYTICS_IMPLEMENTATION.md`

For:
- Service page tracking
- Location page tracking
- Insurance referral tracking
- Content download tracking
- Video engagement tracking

---

**Status:** Ready to Deploy
**Estimated Setup Time:** 5 minutes
**Support:** See GOOGLE_ANALYTICS_IMPLEMENTATION.md for details
