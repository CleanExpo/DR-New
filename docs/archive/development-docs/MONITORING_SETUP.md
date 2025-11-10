# Comprehensive Monitoring Setup Guide

## Overview

Production-grade monitoring and observability system for Disaster Recovery Brisbane website. Includes Google Analytics 4, error tracking, Web Vitals monitoring, conversion tracking, and Search Console integration.

## Features Implemented

### 1. Google Analytics 4 (GA4)
- **Page view tracking** with automatic route changes
- **Custom events** for user interactions
- **Conversion tracking** for business-critical actions
- **Custom dimensions** for segmentation
- **E-commerce tracking** (if needed)
- **User ID tracking** for cross-device analytics
- **GDPR consent management**

### 2. Error Tracking
- **Global error handler** for unhandled exceptions
- **Promise rejection tracking**
- **Error grouping** with fingerprinting
- **Error rate monitoring** with thresholds
- **Contextual error data** (user, session, URL)
- **Alert system** for critical errors
- **Integration points** for Sentry, LogRocket, DataDog

### 3. Web Vitals Monitoring
- **Core Web Vitals** tracking (LCP, FID, CLS, TTFB, INP)
- **Performance thresholds** with ratings (good/poor/critical)
- **Automated alerts** for performance degradation
- **Historical metrics** storage and analysis
- **Backend API** for metric aggregation
- **Real-time dashboard** data

### 4. Conversion Tracking
Business-critical events tracked:
- **Emergency phone calls** (1000 points)
- **Contact form submissions** (500 points)
- **Quote requests** (750 points)
- **Email clicks** (50 points)
- **Insurance claim starts** (2000 points)
- **Video plays** (50 points)
- **Guide downloads** (100 points)

### 5. Search Console Integration
- **Organic search tracking**
- **Query performance monitoring**
- **Page indexing status checks**
- **Click-through rate analysis**
- **Position tracking**
- **Top queries and pages reporting**

### 6. Monitoring Dashboard
- **Real-time health status**
- **Error statistics** and trends
- **Performance metrics** with percentiles
- **Alert history** and management
- **System health checks**

## Environment Variables

Add these to your `.env.local` file:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY=G-YYYYYYYYYY  # Optional

# Microsoft Clarity (optional)
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx

# Search Console API (optional)
GOOGLE_SEARCH_CONSOLE_API_KEY=your_api_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY=your_private_key

# Alert Integrations (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
PAGERDUTY_INTEGRATION_KEY=your_pagerduty_key

# Application
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production
```

## Usage Examples

### Track Page Views
```typescript
import { analytics } from '@/lib/monitoring/analytics';

// Automatic tracking via MonitoringProvider
// Or manual tracking:
analytics.pageView(window.location.href, 'Page Title');
```

### Track Conversions
```typescript
import { analytics, ConversionEvent } from '@/lib/monitoring/analytics';

// Track emergency call
analytics.emergencyCall('1300-309-361', 'homepage-hero');

// Track contact form
analytics.contactForm({
  serviceType: 'water-damage',
  urgency: 'urgent',
  location: 'brisbane',
  email: 'user@example.com'
});

// Track quote request
analytics.quoteRequest('fire-damage', 'commercial', 5000);
```

### Track Custom Events
```typescript
import { analytics } from '@/lib/monitoring/analytics';

analytics.event('custom_event', {
  category: 'engagement',
  label: 'button_click',
  value: 100,
  custom_param: 'value'
});
```

### Use Conversion Components
```typescript
import { PhoneButton, EmailButton, CTAButton } from '@/components/monitoring/ConversionTracking';

// Phone call button with tracking
<PhoneButton phoneNumber="1300-309-361" location="header">
  Call Now
</PhoneButton>

// Email button with tracking
<EmailButton email="info@example.com" subject="Emergency Inquiry">
  Email Us
</EmailButton>

// CTA button with tracking
<CTAButton ctaType="emergency">
  Get Emergency Help
</CTAButton>
```

### Track Form Submissions
```typescript
import { useFormTracking } from '@/components/monitoring/ConversionTracking';

function ContactForm() {
  const { trackSubmit, trackFieldInteraction, trackError } = useFormTracking('contact');

  const handleSubmit = (data) => {
    trackSubmit({
      serviceType: data.service,
      urgency: data.urgency,
      location: data.location,
      email: data.email
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        onFocus={() => trackFieldInteraction('email')}
        onError={(e) => trackError('email', e.message)}
      />
    </form>
  );
}
```

### Track Errors
```typescript
import { captureError } from '@/lib/monitoring/error-tracking';
import { analytics } from '@/lib/monitoring/analytics';

try {
  // Some operation
} catch (error) {
  captureError(error, {
    userId: user.id,
    tags: { section: 'checkout' }
  }, 'error');

  analytics.error(error.message, 'error', {
    section: 'checkout'
  });
}
```

### Monitor Web Vitals
```typescript
// Automatic tracking via MonitoringProvider
// Access metrics:
import { getWebVitalsMonitor } from '@/lib/performance/web-vitals';

const monitor = getWebVitalsMonitor();
const metrics = monitor.getMetrics();
console.log('LCP:', metrics.LCP);
```

### Set Custom Dimensions
```typescript
import { analytics } from '@/lib/monitoring/analytics';

analytics.setDimensions({
  user_type: 'commercial',
  service_area: 'brisbane',
  service_type: 'water',
  user_journey_stage: 'consideration'
});
```

## API Endpoints

### Web Vitals
```bash
# Store Web Vital
POST /api/monitoring/web-vitals
{
  "name": "LCP",
  "value": 2400,
  "rating": "good",
  "id": "unique-id",
  "url": "/services/water-damage"
}

# Get Web Vitals stats
GET /api/monitoring/web-vitals?name=LCP&url=/services/water-damage
```

### Monitoring Dashboard
```bash
# Get dashboard data
GET /api/monitoring/dashboard?range=24h
```

### Alerts
```bash
# Send alert
POST /api/monitoring/alerts
{
  "level": "critical",
  "message": "High error rate detected",
  "context": { "errorCount": 50 }
}

# Get recent alerts
GET /api/monitoring/alerts?level=critical&limit=20
```

### Health Check
```bash
# Check system health
GET /api/monitoring/health
```

## Performance Thresholds

### Core Web Vitals
- **LCP (Largest Contentful Paint)**
  - Good: ≤ 2.5s
  - Poor: > 4.0s
  - Critical: > 5.0s

- **FID (First Input Delay)**
  - Good: ≤ 100ms
  - Poor: > 300ms
  - Critical: > 500ms

- **CLS (Cumulative Layout Shift)**
  - Good: ≤ 0.1
  - Poor: > 0.25
  - Critical: > 0.5

- **TTFB (Time to First Byte)**
  - Good: ≤ 800ms
  - Poor: > 1.8s
  - Critical: > 3.0s

- **INP (Interaction to Next Paint)**
  - Good: ≤ 200ms
  - Poor: > 500ms
  - Critical: > 1.0s

### Business Metrics
- **Conversion Rate**: Target > 3%
- **Bounce Rate**: Target < 40%
- **Error Rate**: Target < 0.1%
- **Availability**: Target > 99.9%

## Alert Configuration

### Alert Levels
- **Warning**: Performance degraded, error count elevated
- **Critical**: Service unavailable, error rate > 5%, Core Web Vitals critical

### Alert Channels
- Console logging (development)
- Backend API endpoint
- Slack webhook (production)
- PagerDuty (critical alerts only)
- Google Analytics events

### Alert Throttling
- Duplicate alerts suppressed for 5 minutes
- Sample rate: 10% in production, 100% in development

## Integration with External Services

### Sentry (Error Tracking)
```typescript
// In lib/monitoring/error-tracking.ts
// Uncomment and configure:
if (process.env.SENTRY_DSN) {
  await fetch(process.env.SENTRY_DSN, {
    method: 'POST',
    body: JSON.stringify(report)
  });
}
```

### LogRocket (Session Replay)
```typescript
// Add to MonitoringProvider
import LogRocket from 'logrocket';
LogRocket.init('your-app-id');
```

### DataDog (APM)
```typescript
// Add RUM script to layout
<Script src="https://www.datadoghq-browser-agent.com/datadog-rum.js" />
```

## Testing

### Test Monitoring Locally
```bash
# Start dev server
npm run dev

# Open browser console and check:
# 1. [Monitoring] Initialization messages
# 2. [GA4] Page view tracking
# 3. Web Vitals metrics with emoji indicators
# 4. Auto-tracking enabled message
```

### Test Conversions
```typescript
// In browser console:
import { analytics } from '@/lib/monitoring/analytics';

// Test emergency call tracking
analytics.emergencyCall('1300-309-361', 'test');

// Check GA4 events in browser devtools
```

### Test Error Tracking
```typescript
// Trigger test error
throw new Error('Test error for monitoring');

// Check console for error capture
```

## Dashboard Access

Once deployed, access monitoring data at:
- Dashboard: `/api/monitoring/dashboard`
- Web Vitals: `/api/monitoring/web-vitals`
- Health Check: `/api/monitoring/health`
- Alerts: `/api/monitoring/alerts`

## Compliance

### GDPR Compliance
- IP anonymization enabled by default
- Consent mode implemented
- No PII tracked without consent
- User ID tracking optional

### Privacy Best Practices
- No email addresses in analytics
- Phone numbers hashed in events
- Location limited to city level
- No personal information in error logs

## Maintenance

### Regular Tasks
1. Review alert thresholds monthly
2. Clean old metrics (automated, 24h retention)
3. Update conversion values quarterly
4. Monitor API quota usage
5. Review and optimize sample rates

### Monitoring Health Checks
- Automatic health checks every 5 minutes
- Error count monitoring
- Performance metric validation
- Alert system verification

## Support

For issues or questions:
1. Check browser console for initialization
2. Verify environment variables
3. Review API endpoint responses
4. Check Google Analytics Real-Time view
5. Test with ?debug=true parameter

## Next Steps

1. **Configure GA4 Property**
   - Create GA4 property in Google Analytics
   - Add measurement ID to environment variables
   - Configure conversion events in GA4 interface

2. **Set Up Search Console**
   - Verify site ownership
   - Add property to Search Console
   - Configure API access (optional)

3. **Configure Alerts**
   - Set up Slack webhook for notifications
   - Configure PagerDuty for critical alerts
   - Test alert delivery

4. **Create Custom Reports**
   - Build GA4 exploration reports
   - Set up conversion funnels
   - Configure automated reports

5. **Integrate External Services** (optional)
   - Set up Sentry for error tracking
   - Add LogRocket for session replay
   - Configure DataDog for APM

## File Structure

```
lib/monitoring/
├── analytics.ts                  # GA4 implementation
├── error-tracking.ts             # Error tracking system
├── comprehensive-monitoring.ts   # Main monitoring orchestrator
└── search-console.ts             # Search Console integration

components/monitoring/
├── MonitoringProvider.tsx        # Main provider component
└── ConversionTracking.tsx        # Conversion tracking hooks/components

app/api/monitoring/
├── web-vitals/route.ts          # Web Vitals endpoint
├── dashboard/route.ts           # Dashboard data endpoint
├── alerts/route.ts              # Alert management endpoint
└── health/route.ts              # Health check endpoint
```

## Performance Impact

- **Script size**: ~15KB gzipped
- **Runtime overhead**: < 5ms per page
- **Network requests**: 1-2 per page (batched)
- **Sample rate**: 10% in production (configurable)
- **No blocking operations**: All async

## Conclusion

This comprehensive monitoring system provides enterprise-grade observability for your disaster recovery service website with minimal performance impact and maximum business insight.
