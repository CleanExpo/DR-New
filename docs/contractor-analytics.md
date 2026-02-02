# Contractor Profile Analytics System

## Overview

The contractor profile analytics system tracks key performance metrics including profile views, bookings, ratings, and performance indicators. This data helps contractors understand their visibility and performance on the platform.

## Features

- **Profile Views Tracking**: Automatically track when users view contractor profiles
- **Booking Analytics**: Track booking trends, completion rates, and conversion metrics
- **Rating Analytics**: Analyze rating distribution and positive review percentages
- **Performance Metrics**: Monitor response times, quote acceptance rates, and more
- **Monthly Tracking**: Automatic monthly reset for profile views
- **Real-time Updates**: Analytics update in real-time as bookings and ratings change

## Components

### 1. API Endpoints

#### GET /api/contractor/analytics

Retrieves comprehensive analytics for the authenticated contractor.

**Authentication**: Required (CONTRACTOR or ADMIN role)

**Response**:
```json
{
  "success": true,
  "analytics": {
    "overview": {
      "profileViews": 1250,
      "profileViewsThisMonth": 87,
      "totalBookings": 42,
      "completedBookings": 38,
      "activeBookings": 4,
      "averageRating": 4.7,
      "totalRatings": 35,
      "conversionRate": 3.36,
      "memberSince": "2024-01-15T00:00:00.000Z"
    },
    "bookingStats": {
      "total": 42,
      "completed": 38,
      "active": 4,
      "cancelled": 2,
      "thisMonth": 5,
      "lastMonth": 6,
      "last30Days": 8,
      "completionRate": 90.5,
      "cancellationRate": 4.8,
      "monthOverMonthGrowth": -16.7
    },
    "ratingStats": {
      "totalRatings": 35,
      "averageRating": 4.7,
      "ratingsLast30Days": 6,
      "distribution": {
        "1": 0,
        "2": 1,
        "3": 3,
        "4": 10,
        "5": 21
      },
      "positiveRatingPercentage": 89
    },
    "performance": {
      "averageResponseTimeMinutes": 45,
      "completedJobs": 38,
      "quoteRequestCount": 52,
      "quoteAcceptanceRate": 80.77,
      "directBookingRequests": 15
    },
    "trends": {
      "viewTrend": {
        "last7Days": 61,
        "percentageChange": "+0%"
      },
      "bookingGrowth": {
        "thisMonth": 5,
        "lastMonth": 6,
        "percentageChange": "-16.7"
      }
    },
    "recent": {
      "bookings": [...],
      "ratings": [...]
    }
  }
}
```

#### POST /api/contractor/[contractorId]/track-view

Tracks a profile view for analytics purposes. Can be called anonymously.

**Authentication**: Not required (public endpoint)

**Request**: POST to `/api/contractor/abc123/track-view`

**Response**:
```json
{
  "success": true,
  "message": "Profile view tracked",
  "views": {
    "total": 1251,
    "thisMonth": 88
  }
}
```

**Features**:
- Automatically resets monthly views when a new month begins
- Tracks `lastProfileViewReset` timestamp
- Increments both `profileViews` (lifetime) and `profileViewsThisMonth` (current month)

### 2. React Components

#### ContractorAnalyticsWidget

A reusable component that displays contractor analytics.

**Import**:
```tsx
import { ContractorAnalyticsWidget } from '@/components/contractor/analytics-widget';
```

**Usage**:
```tsx
// Compact variant (recommended for dashboards)
<ContractorAnalyticsWidget variant="compact" />

// Full variant (for dedicated analytics pages)
<ContractorAnalyticsWidget variant="full" />
```

**Props**:
- `variant?: 'full' | 'compact'` - Display variant (default: 'compact')

**Features**:
- Automatic data fetching from `/api/contractor/analytics`
- Loading states and error handling
- Responsive grid layout
- Link to detailed analytics page

#### ProfileViewTracker

A component that automatically tracks profile views when users view contractor profiles.

**Import**:
```tsx
import { ProfileViewTracker } from '@/components/contractor/profile-view-tracker';
```

**Usage**:
```tsx
// Basic usage (tracks after 3 seconds)
<ProfileViewTracker contractorId={contractor.id} />

// Custom tracking delay (5 seconds)
<ProfileViewTracker
  contractorId={contractor.id}
  trackingDelay={5000}
/>

// Track every time (not recommended)
<ProfileViewTracker
  contractorId={contractor.id}
  trackOncePerSession={false}
/>
```

**Props**:
- `contractorId: string` - The contractor's ID (required)
- `trackingDelay?: number` - Delay before tracking (default: 3000ms)
- `trackOncePerSession?: boolean` - Track only once per session (default: true)

**Features**:
- Silent failure (doesn't disrupt user experience)
- Session-based deduplication
- Configurable tracking delay to ensure genuine views
- Works for both authenticated and anonymous users

#### useProfileViewTracking Hook

A custom hook for manual profile view tracking.

**Import**:
```tsx
import { useProfileViewTracking } from '@/components/contractor/profile-view-tracker';
```

**Usage**:
```tsx
function ContractorCard({ contractor }) {
  const { trackView } = useProfileViewTracking();

  const handleClick = async () => {
    await trackView(contractor.id);
    router.push(`/contractors/${contractor.id}`);
  };

  return (
    <div onClick={handleClick}>
      {contractor.businessName}
    </div>
  );
}
```

## Integration Examples

### 1. Add Analytics Widget to Contractor Dashboard

**File**: `apps/web/app/dashboard/contractor/page.tsx`

```tsx
import { ContractorAnalyticsWidget } from '@/components/contractor/analytics-widget';

export default function ContractorDashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Add compact analytics widget */}
      <ContractorAnalyticsWidget variant="compact" />

      {/* Rest of dashboard content */}
    </div>
  );
}
```

### 2. Track Views on Public Contractor Profile Page

**File**: `apps/web/app/contractors/[id]/page.tsx`

```tsx
import { ProfileViewTracker } from '@/components/contractor/profile-view-tracker';

export default function ContractorProfilePage({ params }) {
  const { id } = params;

  return (
    <div>
      {/* Track profile views automatically */}
      <ProfileViewTracker contractorId={id} />

      {/* Profile content */}
      <h1>Contractor Profile</h1>
      {/* ... */}
    </div>
  );
}
```

### 3. Create Dedicated Analytics Page

**File**: `apps/web/app/dashboard/contractor/analytics/overview/page.tsx`

```tsx
import { ContractorAnalyticsWidget } from '@/components/contractor/analytics-widget';

export default function AnalyticsOverviewPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Performance Analytics</h1>

      {/* Full analytics widget with all details */}
      <ContractorAnalyticsWidget variant="full" />
    </div>
  );
}
```

### 4. Track Views on Contractor Directory/Search Results

**File**: `apps/web/app/contractors/page.tsx`

```tsx
import Link from 'next/link';
import { useProfileViewTracking } from '@/components/contractor/profile-view-tracker';

export default function ContractorDirectory() {
  const { trackView } = useProfileViewTracking();

  const handleContractorClick = async (contractorId: string) => {
    // Track view when user clicks to view profile
    await trackView(contractorId);
  };

  return (
    <div>
      {contractors.map(contractor => (
        <Link
          key={contractor.id}
          href={`/contractors/${contractor.id}`}
          onClick={() => handleContractorClick(contractor.id)}
        >
          <div className="contractor-card">
            {contractor.businessName}
          </div>
        </Link>
      ))}
    </div>
  );
}
```

## Database Schema

The analytics system uses existing fields in the `Contractor` model:

```prisma
model Contractor {
  // Profile Analytics
  profileViews                  Int       @default(0)
  profileViewsThisMonth         Int       @default(0)
  lastProfileViewReset          DateTime?
  directBookingRequests         Int       @default(0)
  quoteRequestCount             Int       @default(0)
  quoteAcceptanceRate           Decimal   @default(0.00)

  // Performance Metrics
  completedJobs                 Int       @default(0)
  averageRating                 Decimal   @default(0.00)
  averageResponseTimeMinutes    Int       @default(0)

  // Relations
  bookings                      Booking[]
  ratings                       Rating[]
}
```

## Metrics Explained

### Profile Metrics

- **profileViews**: Total lifetime profile views
- **profileViewsThisMonth**: Views in the current calendar month (resets automatically)
- **conversionRate**: Percentage of profile views that result in bookings

### Booking Metrics

- **completionRate**: Percentage of bookings successfully completed
- **cancellationRate**: Percentage of bookings cancelled
- **monthOverMonthGrowth**: Percentage change in bookings from last month to this month

### Rating Metrics

- **averageRating**: Mean rating (1-5 stars)
- **positiveRatingPercentage**: Percentage of 4-5 star ratings
- **distribution**: Breakdown of ratings by star count

### Performance Metrics

- **averageResponseTimeMinutes**: Average time to respond to inquiries
- **quoteAcceptanceRate**: Percentage of quotes that are accepted
- **directBookingRequests**: Number of direct booking requests (vs quotes)

## Best Practices

### 1. Profile View Tracking

**Do**:
- Use `ProfileViewTracker` component on public contractor profiles
- Set a reasonable `trackingDelay` (3-5 seconds) to ensure genuine views
- Use `trackOncePerSession={true}` to prevent duplicate counting

**Don't**:
- Track views on contractor list/search pages (only on detail pages)
- Call tracking API directly without delay
- Track views for the contractor's own profile

### 2. Analytics Display

**Do**:
- Show compact widget on main dashboard
- Link to detailed analytics page for full metrics
- Update analytics in real-time when possible
- Show trends and growth percentages

**Don't**:
- Overwhelm contractors with too many metrics at once
- Show analytics to non-contractors
- Display analytics that might be discouraging (keep positive)

### 3. Performance Optimization

**Do**:
- Cache analytics data for short periods (1-5 minutes)
- Use loading states while fetching data
- Handle errors gracefully (show fallback content)
- Lazy load analytics components when not immediately visible

**Don't**:
- Fetch analytics on every page load
- Block page rendering while loading analytics
- Show stale data without refresh option

## Future Enhancements

Potential improvements to the analytics system:

1. **Historical Tracking**: Store daily analytics in a separate `ContractorAnalyticsHistory` table for trend charts
2. **Comparison**: Compare performance with similar contractors or platform averages
3. **Alerts**: Notify contractors of significant changes (sudden view spike, rating drop)
4. **Detailed Views**: Break down views by source (search, directory, direct link, social media)
5. **Booking Sources**: Track where bookings come from (profile view, quote request, direct contact)
6. **Revenue Analytics**: Track earnings alongside bookings
7. **Geographic Analytics**: Show which service areas generate most bookings
8. **Time-based Analytics**: Best performing days/times for bookings

## Testing

### Unit Tests

```typescript
describe('Profile View Tracking', () => {
  it('should increment profile views', async () => {
    // Test implementation
  });

  it('should reset monthly views on new month', async () => {
    // Test implementation
  });

  it('should handle concurrent view tracking', async () => {
    // Test implementation
  });
});
```

### Integration Tests

See `apps/web/src/__tests__/integration/contractor-verification.test.ts` for examples of testing analytics-related features.

## Support

For questions or issues with the contractor analytics system:

1. Check this documentation first
2. Review API endpoint responses in browser DevTools
3. Check contractor profile in database to verify analytics fields
4. Contact the development team

## Changelog

### Version 1.0.0 (Current)
- Initial analytics system implementation
- Profile view tracking
- Booking and rating analytics
- React components and hooks
- API endpoints

---

**Last Updated**: 2025-01-28
**Maintained By**: DR-NRPG Development Team
