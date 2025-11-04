# Google Analytics 4 Setup - Disaster Recovery

## ✅ Dual Tracking Configuration Complete (Local)

**Primary GA4 Property**: `G-BWDWXDJM4Z` (Main Analytics)
**Secondary GA4 Property**: `G-RK33F1ZD1H` (NRPG Analytics)

### Benefits of Dual Tracking
- **Separate Dashboards**: Different teams can access their own GA4 property
- **Data Isolation**: Each property has independent settings and configurations
- **Redundancy**: Backup tracking in case one property has issues
- **Custom Goals**: Set different conversion goals per property

## Local Development Setup

Your `.env.local` file has been configured with:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BWDWXDJM4Z
NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY=G-RK33F1ZD1H
```

**All events automatically send to BOTH properties** via gtag.js.

## 🚨 REQUIRED: Vercel Production Setup

**Environment variables in `.env.local` are NOT deployed to Vercel.**

### Add to Vercel (3 minutes):

1. **Visit Vercel Dashboard**:
   - https://vercel.com/unite-group/dr-new/settings/environment-variables

2. **Add Primary GA4 Property**:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-BWDWXDJM4Z`
   - **Environments**: ✅ Production ✅ Preview ✅ Development
   - Click "Save"

3. **Add Secondary GA4 Property (NRPG)**:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY`
   - **Value**: `G-RK33F1ZD1H`
   - **Environments**: ✅ Production ✅ Preview ✅ Development
   - Click "Save"

4. **Redeploy**:
   - Go to: https://vercel.com/unite-group/dr-new
   - Click latest deployment → "Redeploy" button
   - Select "Use existing Build Cache"
   - Click "Redeploy"

### How Dual Tracking Works
Once deployed, all pageviews and events will automatically send to **both** GA4 properties:
- Primary property (G-BWDWXDJM4Z) receives all data
- Secondary property (G-RK33F1ZD1H) receives identical data
- No code changes needed - gtag.js handles distribution automatically

## Implementation Details

### Tracking Code Location
- **File**: `app/layout.tsx` (lines 208-235)
- **Strategy**: `afterInteractive` (loads after page becomes interactive)
- **Configuration**: Dual property tracking, page path tracking, cookie flags for security
- **Primary ID**: Loaded via gtag.js script
- **Secondary ID**: Configured in initialization script (conditional)

### Analytics Library
- **File**: `lib/analytics.ts`
- **Events Tracked**: 15+ custom conversion events
- **Functions**: All imported and ready to use
- **Dual Tracking**: All events automatically send to both GA4 properties
- **No Changes Needed**: Existing tracking functions work with both properties

## 📊 Events Being Tracked

### Emergency Conversions (High Priority)
- `emergency_phone_click` - Tracks all 1300 309 361 calls
- `emergency_form_submit` - Online emergency request forms
- `emergency_request` - Categorized by service type (water/fire/mould)

### Service Engagement
- `service_view` - Service page visits (water damage, fire damage, etc.)
- `location_engagement` - Location page interactions (Brisbane, Ipswich, suburbs)
- `suburb_page_view` - Suburb-specific page tracking

### Lead Quality
- `insurance_referral` - Insurance company link clicks
- `commercial_inquiry` - B2B lead form submissions
- `contractor_signup` - Partner application tracking

### User Journey
- `page_view` - Automatic page view tracking
- `outbound_click` - External links (directories, reviews)
- `file_download` - Resource downloads
- `video_engagement` - Play/pause/complete events
- `navigation_click` - Header/footer navigation

## Verify Setup (Post-Deployment)

### 1. Check Real-time Data (Both Properties)

**Primary Property (G-BWDWXDJM4Z)**:
1. Visit: https://analytics.google.com/
2. Select Primary property from account dropdown
3. Navigate to: **Reports → Real-time**
4. Open your website: https://dr-new-ten.vercel.app
5. Should see yourself as active user within 30 seconds

**Secondary Property (G-RK33F1ZD1H)**:
1. Switch to Secondary property in GA4
2. Navigate to: **Reports → Real-time**
3. Should see the same data (your active session)

### 2. Test Event Tracking (Dual Verification)
Visit your homepage and verify events appear in **BOTH** properties:
- ✅ Click phone number → Check for `phone_click` event in both properties
- ✅ Navigate to service page → Check for `service_view` event in both properties
- ✅ Click emergency button → Check for `emergency_request` event in both properties

### 3. Verify Tag Installation
1. Install: [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your site
3. Click extension → Should show "Google Analytics: GA4" tag firing
4. Check Network tab → Should see requests to both tracking IDs

## 🎯 Conversion Goals to Set Up in GA4

**Important**: Set up conversion goals in BOTH properties for consistent tracking.

### High-Value Conversions
1. **Emergency Phone Calls**
   - Event name: `emergency_phone_click`
   - Value: $550 (average lead value)

2. **Emergency Form Submissions**
   - Event name: `emergency_form_submit`
   - Value: $500

3. **Commercial Inquiries**
   - Event name: `commercial_inquiry`
   - Value: $2,000 (higher value commercial leads)

### Set as Key Events:
1. GA4 → **Admin → Events**
2. Find event → Toggle **"Mark as key event"**
3. Assign monetary value for ROI tracking

## 📈 Recommended Reports to Create

### 1. Emergency Response Dashboard
- Real-time emergency requests
- Phone vs form submission ratio
- Peak emergency hours
- Service type breakdown

### 2. Location Performance
- Brisbane vs Ipswich vs Logan traffic
- Top-performing suburbs
- Location page conversion rates
- Service area expansion opportunities

### 3. Lead Quality Analysis
- Insurance referrals vs direct inquiries
- Commercial vs residential split
- Contractor signup funnel
- Form abandonment rates

## 🔧 Technical Integration

### How Events Are Triggered

**Phone Click Example**:
```typescript
// In any component
import { trackPhoneClick } from '@/lib/analytics';

<a
  href="tel:1300309361"
  onClick={() => trackPhoneClick('1300309361')}
>
  Call Now
</a>
```

**Form Submission Example**:
```typescript
import { trackFormSubmission } from '@/lib/analytics';

const handleSubmit = (data) => {
  trackFormSubmission('emergency-request', {
    serviceType: data.serviceType,
    location: data.suburb,
    urgency: 'immediate'
  });
};
```

## Security & Privacy

### Cookie Configuration
- **SameSite**: `None;Secure` for cross-domain tracking
- **Anonymize IP**: Enabled by default in GA4
- **Consent Mode**: Ready for cookie consent implementation

### Data Retention
- **User data**: 14 months (GA4 default)
- **Event data**: 14 months
- **Can be adjusted** in GA4 Admin settings

## Troubleshooting

### Events Not Appearing?
1. **Check Console**: Open DevTools → Console for errors
2. **Verify ID**: Confirm `G-BWDWXDJM4Z` in Vercel environment
3. **Ad Blockers**: Disable for testing
4. **Wait Time**: New events take 24-48 hours to appear in standard reports (but show immediately in Real-time)

### Tag Not Loading?
1. View page source: Search for `gtag/js?id=G-BWDWXDJM4Z`
2. Check Network tab: Should see request to `www.googletagmanager.com`
3. Verify environment variable: `echo $NEXT_PUBLIC_GA_MEASUREMENT_ID`

## Next Steps

1. ✅ **Add to Vercel** (see instructions above)
2. ✅ **Redeploy** to production
3. ✅ **Verify real-time tracking** (within 30 seconds)
4. ⏳ **Wait 24-48 hours** for first conversion data
5. ⏳ **Create custom dashboards** (after 7 days of data)
6. ⏳ **Set up conversion goals** with monetary values
7. ⏳ **Weekly reporting** on emergency conversion rates

## Support

- **GA4 Setup Issues**: https://support.google.com/analytics/
- **Event Tracking**: See `lib/analytics.ts` for all available functions
- **Custom Events**: Add to `lib/analytics.ts` following existing patterns

---

**Last Updated**: November 4, 2025
**Primary Tracking ID**: G-BWDWXDJM4Z (Main Analytics)
**Secondary Tracking ID**: G-RK33F1ZD1H (NRPG Analytics)
**Implementation Status**: ✅ Dual Tracking - Local Complete | ⏳ Vercel Pending (2 environment variables required)
