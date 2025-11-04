# Google Analytics 4 Implementation Guide
Disaster Recovery Services - BrightLocal SEO Audit Fix

## Overview
This guide provides complete instructions for implementing Google Analytics 4 (GA4) tracking on the Disaster Recovery website, addressing the BrightLocal audit finding: "Analytics Tag Found: No"

## Quick Start

### 1. Get Your GA4 Measurement ID
1. Go to [Google Analytics 4](https://analytics.google.com)
2. Create a new GA4 property or use existing
3. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add to Environment Variables
Update `.env.local`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Verify Installation
- [ ] Analytics scripts load in page source
- [ ] BrightLocal shows "Analytics Tag Found: Yes"
- [ ] Google Analytics shows real-time data
- [ ] Conversion events are being tracked

## Current Implementation Status

### Already Configured:
- [x] Root layout GA script injection (`app/layout.tsx`)
- [x] Google Analytics component (`components/analytics/GoogleAnalytics.tsx`)
- [x] Basic event tracking functions
- [x] Environment variable placeholders

### New Files Added:
- [x] `lib/analytics.ts` - Comprehensive conversion tracking utility
- [x] `docs/GOOGLE_ANALYTICS_IMPLEMENTATION.md` - This guide

## Architecture

### GA4 Scripts Location
**File:** `D:\DR New\app\layout.tsx` (lines 208-223)

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  `}
</Script>
```

### Tracking Component
**File:** `D:\DR New\components\analytics\GoogleAnalytics.tsx`
- Tracks page views automatically
- Monitors scroll depth
- Measures engagement time
- Reports Web Vitals to GA4

### Conversion Tracking Utility
**File:** `D:\DR New\lib\analytics.ts`

Functions for tracking:
- Phone clicks (1300 309 361)
- Form submissions
- Quote requests
- Emergency requests
- Service page views
- Location engagement
- Insurance referrals
- Content downloads
- Video engagement
- Social shares

## Business Conversions to Track

### Primary Conversions (High Priority)

#### 1. Phone Call Clicks
Track clicks on emergency number: **1300 309 361**

**Implementation:**
```tsx
import { trackPhoneClick } from '@/lib/analytics';

<a
  href="tel:1300309361"
  onClick={() => trackPhoneClick({
    phoneNumber: '1300309361',
    context: 'hero_section',
    pageTitle: document.title,
    isEmergency: true
  })}
>
  1300 309 361
</a>
```

#### 2. Contact Form Submissions
Track all contact/quote form submissions

**Implementation:**
```tsx
import { trackFormSubmission } from '@/lib/analytics';

const handleSubmit = async (formData) => {
  trackFormSubmission({
    formName: 'emergency_response',
    formType: 'emergency',
    serviceType: formData.serviceType,
    location: formData.location
  });
  // Submit form...
};
```

#### 3. Emergency Service Requests
Track dedicated emergency form completions

**Implementation:**
```tsx
import { trackEmergencyRequest } from '@/lib/analytics';

trackEmergencyRequest(
  'water_damage',
  'Brisbane',
  'within_1_hour'
);
```

### Secondary Conversions (Medium Priority)

#### 4. Quote Requests
```tsx
import { trackQuoteRequest } from '@/lib/analytics';

trackQuoteRequest('fire_damage', 'Ipswich');
```

#### 5. Service Page Views
```tsx
import { trackServiceView } from '@/lib/analytics';

trackServiceView(
  'Water Damage Restoration',
  'Brisbane',
  'residential'
);
```

#### 6. Location Page Engagement
```tsx
import { trackLocationEngagement } from '@/lib/analytics';

trackLocationEngagement('Hamilton', 'click', 'view_service_details');
```

#### 7. Insurance Referrals
```tsx
import { trackInsuranceReferral } from '@/lib/analytics';

trackInsuranceReferral('Allianz', 'water_damage_claim');
```

### Tertiary Conversions (Low Priority)

#### 8. Content Engagement
```tsx
import { trackContentDownload, trackVideoEngagement } from '@/lib/analytics';

// Track guide downloads
trackContentDownload('Water Damage Guide', 'pdf', 'restoration_guide');

// Track video views
trackVideoEngagement('Before & After Gallery', 'complete', 180);
```

## Conversion Events Data

### Custom Dimensions
Set in GA4 dashboard or via event parameters:

| Dimension | Purpose | Examples |
|-----------|---------|----------|
| `service_type` | Service category | water_damage, fire_damage, mould, storm |
| `location` | Service area | Brisbane, Ipswich, Logan |
| `user_type` | Customer segment | insurance, residential, commercial |
| `page_type` | Page category | service, location, insurance, guide |
| `engagement_type` | User action type | click, scroll, video_play, download |

### Event Categories
| Category | Events |
|----------|--------|
| Contact | phone_click, form_submit, live_chat |
| Conversion | emergency_request, quote_request, contact_form |
| Service | view_service, service_click |
| Location | location_view, location_click, location_scroll |
| Insurance | insurance_click, claim_info_view |
| Engagement | scroll, video_play, video_complete, file_download |
| Web Vitals | LCP, FID, CLS, TTFB, FCP |

## Integration with Components

### Emergency CTA Button
File: `D:\DR New\components\ui\emergency-cta.tsx`

Add tracking:
```tsx
import { trackPhoneClick } from '@/lib/analytics';

const EmergencyCTA = () => (
  <button
    onClick={() => trackPhoneClick({
      phoneNumber: '1300309361',
      context: 'emergency_cta_button',
      isEmergency: true
    })}
  >
    Call Now: 1300 309 361
  </button>
);
```

### Service Pages
File: `D:\DR New\components\services\ServicesGrid.tsx`

Add tracking:
```tsx
import { trackServiceView } from '@/lib/analytics';

useEffect(() => {
  trackServiceView(serviceName, location, category);
}, [serviceName, location, category]);
```

### Location Pages
File: `D:\DR New\components\location-service-page.tsx`

Add tracking:
```tsx
import { trackLocationEngagement, initializePageTracking } from '@/lib/analytics';

useEffect(() => {
  initializePageTracking({
    pageType: 'location',
    location: suburb,
    serviceType: services[0]
  });
}, [suburb, services]);
```

### Forms
File: `D:\DR New\components\forms\EmergencyLeadForm.tsx`

Add tracking:
```tsx
import { trackFormSubmission } from '@/lib/analytics';

const onSubmit = (data) => {
  trackFormSubmission({
    formName: 'emergency_lead',
    formType: 'emergency',
    serviceType: data.serviceType,
    location: data.location,
    formData: data
  });
};
```

## WordPress/SEO Plugin Configuration

### Yoast SEO
**Note:** This is a Next.js app, not WordPress, but if you integrate:

1. Install Yoast Analytics add-on
2. Connect to GA4 property
3. Set up conversions in Yoast:
   - Primary: Phone clicks
   - Secondary: Form submissions
   - Tertiary: Service views

### RankMath
If using RankMath in admin:

1. Go to RankMath > Analytics
2. Select Google Analytics 4
3. Connect your property
4. Configure Goals:
   - "Emergency Call" (event: phone_click)
   - "Form Submission" (event: form_submit)
   - "Quote Request" (event: quote_request)

## GA4 Configuration in Dashboard

### Create Conversion Events

1. **Admin > Conversions**
2. Create new conversion for each event:

#### Conversion 1: Emergency Phone Click
```
Event name: phone_click
Mark as conversion: Yes
Icon/Color: Red (emergency)
```

#### Conversion 2: Form Submission
```
Event name: form_submit
Mark as conversion: Yes
Icon/Color: Green (success)
```

#### Conversion 3: Emergency Request
```
Event name: emergency_request
Mark as conversion: Yes
Icon/Color: Red (emergency)
```

#### Conversion 4: Quote Request
```
Event name: quote_request
Mark as conversion: Yes
Icon/Color: Blue (inquiry)
```

### Create Custom Events

1. **Admin > Custom definitions > Create new event**
2. Configure:
   - Event name (matching your trackEvent calls)
   - Description
   - Parameter mappings

### Set Up Segments

**Insurance Industry Segment:**
- Condition: `user_type` = insurance
- Description: Insurance company traffic

**Emergency Traffic Segment:**
- Condition: `is_emergency` = true
- Description: Emergency service requests

**Location Segment (e.g., Brisbane):**
- Condition: `location` = Brisbane
- Description: Brisbane area traffic

## Testing & Validation

### 1. Real-time Data Validation
1. Open GA4 dashboard
2. Go to **Real time** report
3. Trigger events (click phone, submit form)
4. Verify events appear within 5 seconds

### 2. BrightLocal Audit Check
1. Run BrightLocal audit
2. Check for "Analytics Tag Found: Yes"
3. Verify measurement ID detected correctly

### 3. Event Testing
Use GA4 DebugView:
1. Go to **Admin > Debug view**
2. Open website in incognito
3. Trigger events
4. Watch real-time event stream

### 4. Conversion Tracking
1. Complete form submission
2. GA4 > Conversions > Check count increases
3. Enable conversion in GA4 admin
4. Check conversion report

## Performance Optimization

### Script Loading Strategy
- `strategy="afterInteractive"` - Loads after page interactive (non-blocking)
- Prevents CLS (Cumulative Layout Shift)
- No impact on Core Web Vitals

### Data Privacy
```typescript
// Cookie configuration in layout.tsx
cookie_flags: 'SameSite=None;Secure'
```

### GDPR Compliance
- GA4 consent mode ready
- Cookie disclosure required
- Privacy policy must mention GA4

## Troubleshooting

### GA4 Not Showing Data
1. Check GA4 ID is correct format (G-XXXXXXXXXX)
2. Verify .env.local has `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Rebuild Next.js: `npm run build`
4. Check browser console for gtag errors
5. Wait 24 hours for initial data processing

### Events Not Appearing
1. Verify event name matches exactly in code
2. Check event category is correct
3. Enable DebugView to see events in real-time
4. Confirm gtag is defined: `window.gtag` in console

### Conversion Not Tracking
1. Mark event as conversion in GA4 admin
2. Allow 24 hours for conversion to be processed
3. Check parameter names match schema
4. Verify form is actually submitting

### BrightLocal Still Shows "No"
1. Wait 24 hours for Google crawl
2. Manually trigger crawl: Google Search Console > Fetch as Google
3. Verify script has valid measurement ID
4. Check no CSP (Content Security Policy) blocks gtag

## Monitoring & Reporting

### Daily Monitoring
- Check Real-time reports for traffic
- Monitor conversion rate
- Alert on no traffic 12+ hours

### Weekly Reports
- Conversion trends
- Service popularity
- Location performance
- Top CTAs

### Monthly Analysis
- Conversion attribution
- Customer journey analysis
- ROI calculation
- Optimization recommendations

## Advanced: Google Tag Manager (GTM)

If advanced needs arise, implement GTM:

**File:** `D:\DR New\app\layout.tsx`

```typescript
<Script
  id="gtm-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
    `,
  }}
/>
```

GTM advantages:
- No code redeploy for tag changes
- Built-in consent management
- Advanced trigger conditions
- A/B testing

## Files Modified/Created

### Modified Files:
- `D:\DR New\.env.local` - Added GA4 measurement ID
- `D:\DR New\.env.example` - Added GA4 config template
- `D:\DR New\app\layout.tsx` - Updated GA script configuration

### Created Files:
- `D:\DR New\lib\analytics.ts` - Comprehensive tracking utility
- `D:\DR New\docs\GOOGLE_ANALYTICS_IMPLEMENTATION.md` - This guide

## Next Steps

1. **Immediate (This Week):**
   - [ ] Get GA4 Measurement ID from Google
   - [ ] Add to `.env.local`
   - [ ] Deploy to production
   - [ ] Verify analytics tag in BrightLocal

2. **Week 1-2:**
   - [ ] Add phone click tracking to all CTA buttons
   - [ ] Add form tracking to contact forms
   - [ ] Test events in GA4 DebugView
   - [ ] Mark conversions in GA4 admin

3. **Week 2-4:**
   - [ ] Add service view tracking
   - [ ] Add location page tracking
   - [ ] Set up custom segments
   - [ ] Create GA4 dashboard
   - [ ] Set up automated alerts

4. **Month 2:**
   - [ ] Analyze conversion data
   - [ ] Identify optimization opportunities
   - [ ] Implement GA4 insights
   - [ ] Monthly reporting setup

## Support & Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Types](https://support.google.com/analytics/answer/9322688)
- [BrightLocal SEO Audit](https://www.brightlocal.com)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)

## Contact
For implementation questions, contact the development team.

---

**Status:** Complete Implementation
**Last Updated:** 2025-11-04
**Version:** 1.0
