# Monitoring Implementation Guide - Step-by-Step

This guide provides copy-paste ready code for implementing the monitoring enhancements identified in the Observability Assessment.

---

## Phase 1: Database Schema (15 minutes)

### Step 1: Update Prisma Schema

Add these models to `D:\DR New\prisma\schema.prisma`:

```prisma
// ============================================
// SEO & Performance Monitoring Models
// ============================================

model WebVitalMetric {
  id            String   @id @default(uuid())
  metricName    String   // LCP, FID, CLS, TTFB, INP, FCP
  value         Float
  rating        String   // good, needs-improvement, poor
  page          String   // URL path
  deviceType    String   // mobile, desktop, tablet
  userAgent     String?
  timestamp     DateTime @default(now())

  @@index([metricName, timestamp])
  @@index([page, metricName])
  @@index([rating, timestamp])
}

model SEOMetric {
  id                String   @id @default(uuid())
  date              DateTime @default(now())

  // Search Console Data
  organicClicks     Int      @default(0)
  organicImpressions Int     @default(0)
  organicCTR        Float    @default(0)
  averagePosition   Float    @default(0)

  // Page-specific (nullable for site-wide metrics)
  page              String?
  keyword           String?

  // Geographic segmentation
  serviceArea       String?  // Brisbane, Ipswich, Logan
  suburb            String?  // Hamilton, Ascot, New Farm, etc.

  // Metadata
  timestamp         DateTime @default(now())

  @@index([date])
  @@index([page, date])
  @@index([keyword, date])
  @@index([serviceArea, date])
}

model ConversionMetric {
  id              String   @id @default(uuid())

  // Conversion Details
  conversionType  String   // emergency_call, contact_form, quote_request, insurance_claim
  value           Float    // AUD value

  // Traffic Attribution
  source          String   // organic, direct, referral, social
  medium          String   // organic, cpc, referral, email
  campaign        String?
  keyword         String?

  // Page Context
  page            String   // Landing page
  referrer        String?

  // Geographic & Service Context
  serviceArea     String?  // Brisbane, Ipswich, Logan
  suburb          String?  // Specific suburb if identified
  serviceType     String?  // water, fire, mould, storm, biohazard

  // Lead Quality
  leadScore       Int?     // 0-100
  leadQuality     String?  // high, medium, low
  urgencyLevel    String?  // emergency, urgent, standard

  // Device & User Context
  deviceType      String?  // mobile, desktop, tablet
  userAgent       String?
  ipAddress       String?

  timestamp       DateTime @default(now())

  @@index([conversionType, timestamp])
  @@index([source, timestamp])
  @@index([serviceArea, timestamp])
  @@index([serviceType, timestamp])
  @@index([leadQuality, timestamp])
}

model PagePerformance {
  id          String   @id @default(uuid())
  page        String   // URL path
  date        DateTime @default(now())

  // Aggregated Web Vitals for the day
  avgLCP      Float?
  p95LCP      Float?
  avgFID      Float?
  avgINP      Float?
  avgCLS      Float?
  avgTTFB     Float?

  // Traffic Metrics
  pageviews   Int      @default(0)
  uniqueViews Int      @default(0)
  bounceRate  Float?

  // Engagement Metrics
  avgTimeOnPage Float?  // seconds
  scrollDepth75 Int     @default(0)  // Users who scrolled 75%
  scrollDepth100 Int    @default(0)  // Users who scrolled 100%

  // Device Breakdown
  mobileViews  Int     @default(0)
  desktopViews Int     @default(0)
  tabletViews  Int     @default(0)

  @@unique([page, date])
  @@index([date])
  @@index([page])
}

model KeywordRanking {
  id            String   @id @default(uuid())
  keyword       String
  position      Float
  previousPosition Float?

  // Context
  page          String?  // Ranking URL
  searchVolume  Int?
  difficulty    Int?     // 0-100 (from SEO tools)

  // Geographic
  location      String   @default("Brisbane, QLD, Australia")
  deviceType    String   @default("mobile")  // mobile, desktop

  // Tracking
  date          DateTime @default(now())
  source        String   @default("manual")  // manual, api, scraper

  @@index([keyword, date])
  @@index([date])
  @@index([position])
}

model CrawlError {
  id            String   @id @default(uuid())
  url           String
  errorType     String   // 404, 500, redirect_chain, soft_404, etc.
  statusCode    Int?
  severity      String   // critical, warning, info

  // Details
  referrer      String?
  errorMessage  String?
  firstDetected DateTime @default(now())
  lastSeen      DateTime @default(now())

  // Status
  resolved      Boolean  @default(false)
  resolvedAt    DateTime?
  resolvedBy    String?

  @@index([url])
  @@index([errorType, resolved])
  @@index([severity, resolved])
}

model PerformanceAlert {
  id            String   @id @default(uuid())
  alertType     String   // web_vital_degradation, organic_traffic_drop, conversion_drop
  severity      String   // critical, warning, info
  metric        String   // LCP, organic_clicks, conversion_rate
  value         Float
  threshold     Float

  // Context
  page          String?
  deviceType    String?
  timeWindow    String?  // 1h, 24h, 7d

  // Alert Management
  triggered     Boolean  @default(true)
  acknowledged  Boolean  @default(false)
  acknowledgedBy String?
  acknowledgedAt DateTime?
  resolved      Boolean  @default(false)
  resolvedAt    DateTime?

  // Notification
  notified      Boolean  @default(false)
  notificationMethod String?  // email, sms, slack

  timestamp     DateTime @default(now())

  @@index([severity, resolved])
  @@index([alertType, timestamp])
}

model UserSession {
  id            String   @id @default(uuid())
  sessionId     String   @unique

  // Traffic Source
  source        String?  // organic, direct, referral
  medium        String?
  campaign      String?
  keyword       String?
  referrer      String?

  // Device & Location
  deviceType    String?
  browser       String?
  os            String?
  ipAddress     String?
  city          String?
  region        String?

  // Session Metrics
  landingPage   String
  exitPage      String?
  pagesViewed   Int      @default(1)
  duration      Int?     // seconds
  bounced       Boolean  @default(false)

  // Conversions
  converted     Boolean  @default(false)
  conversionType String?
  conversionValue Float?

  startTime     DateTime @default(now())
  endTime       DateTime?

  @@index([sessionId])
  @@index([source, startTime])
  @@index([converted, startTime])
}
```

### Step 2: Run Migration

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name add_monitoring_tables

# Push to database
npx prisma db push
```

---

## Phase 2: API Endpoints (30 minutes)

### Create Web Vitals Persistence Endpoint

Create: `D:\DR New\app\api\monitoring\web-vitals\persist\route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.metricName || !data.value || !data.page) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store in database
    await prisma.webVitalMetric.create({
      data: {
        metricName: data.metricName,
        value: parseFloat(data.value),
        rating: data.rating || 'unknown',
        page: data.page,
        deviceType: data.deviceType || 'unknown',
        userAgent: request.headers.get('user-agent') || undefined,
        timestamp: new Date(data.timestamp || Date.now()),
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to persist web vital:', error);
    return NextResponse.json(
      { error: 'Failed to persist metric' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
```

### Create SEO Metrics Endpoint

Create: `D:\DR New\app\api\monitoring\seo\metrics\route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await prisma.sEOMetric.create({
      data: {
        date: new Date(data.date || Date.now()),
        organicClicks: parseInt(data.organicClicks || 0),
        organicImpressions: parseInt(data.organicImpressions || 0),
        organicCTR: parseFloat(data.organicCTR || 0),
        averagePosition: parseFloat(data.averagePosition || 0),
        page: data.page || null,
        keyword: data.keyword || null,
        serviceArea: data.serviceArea || null,
        suburb: data.suburb || null,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to persist SEO metric:', error);
    return NextResponse.json(
      { error: 'Failed to persist metric' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const page = searchParams.get('page');
    const serviceArea = searchParams.get('serviceArea');

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const where: any = {
      date: { gte: startDate }
    };

    if (page) where.page = page;
    if (serviceArea) where.serviceArea = serviceArea;

    const metrics = await prisma.sEOMetric.findMany({
      where,
      orderBy: { date: 'desc' },
      take: 100,
    });

    // Calculate aggregates
    const aggregate = await prisma.sEOMetric.aggregate({
      where,
      _sum: {
        organicClicks: true,
        organicImpressions: true,
      },
      _avg: {
        organicCTR: true,
        averagePosition: true,
      }
    });

    return NextResponse.json({
      metrics,
      summary: {
        totalClicks: aggregate._sum.organicClicks || 0,
        totalImpressions: aggregate._sum.organicImpressions || 0,
        avgCTR: aggregate._avg.organicCTR || 0,
        avgPosition: aggregate._avg.averagePosition || 0,
      }
    });
  } catch (error) {
    console.error('Failed to fetch SEO metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
```

### Create Conversion Tracking Endpoint

Create: `D:\DR New\app\api\monitoring\conversions\route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await prisma.conversionMetric.create({
      data: {
        conversionType: data.conversionType,
        value: parseFloat(data.value),
        source: data.source || 'unknown',
        medium: data.medium || 'unknown',
        campaign: data.campaign || null,
        keyword: data.keyword || null,
        page: data.page,
        referrer: data.referrer || null,
        serviceArea: data.serviceArea || null,
        suburb: data.suburb || null,
        serviceType: data.serviceType || null,
        leadScore: data.leadScore ? parseInt(data.leadScore) : null,
        leadQuality: data.leadQuality || null,
        urgencyLevel: data.urgencyLevel || null,
        deviceType: data.deviceType || null,
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: request.headers.get('x-forwarded-for') || request.ip || undefined,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to persist conversion:', error);
    return NextResponse.json(
      { error: 'Failed to persist conversion' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const conversionType = searchParams.get('type');
    const serviceArea = searchParams.get('serviceArea');

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const where: any = {
      timestamp: { gte: startDate }
    };

    if (conversionType) where.conversionType = conversionType;
    if (serviceArea) where.serviceArea = serviceArea;

    const conversions = await prisma.conversionMetric.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    // Calculate revenue by source
    const bySource = await prisma.conversionMetric.groupBy({
      by: ['source'],
      where,
      _sum: { value: true },
      _count: true,
    });

    return NextResponse.json({
      conversions,
      bySource: bySource.map(s => ({
        source: s.source,
        totalValue: s._sum.value || 0,
        count: s._count,
      })),
      totalValue: conversions.reduce((sum, c) => sum + c.value, 0),
    });
  } catch (error) {
    console.error('Failed to fetch conversions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversions' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
```

---

## Phase 3: Enhanced Client-Side Tracking (20 minutes)

### Update Web Vitals Tracking

Update: `D:\DR New\lib\monitoring\comprehensive-monitoring.ts`

Add this method to the `ComprehensiveMonitoring` class (around line 270):

```typescript
/**
 * Record Web Vital metric (enhanced with persistence)
 */
private recordWebVital(metric: Metric): void {
  if (!this.metrics.has('web_vitals')) {
    this.metrics.set('web_vitals', []);
  }

  this.metrics.get('web_vitals')!.push({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    timestamp: Date.now(),
  });

  // Send to backend for persistence
  if (this.shouldSample()) {
    // Original backend (in-memory)
    this.sendToBackend('/api/monitoring/web-vitals', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      url: window.location.pathname,
      timestamp: new Date().toISOString(),
    });

    // NEW: Persist to database
    this.persistWebVital(metric);
  }
}

/**
 * Persist Web Vital to database
 */
private async persistWebVital(metric: Metric): Promise<void> {
  try {
    await fetch('/api/monitoring/web-vitals/persist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metricName: metric.name,
        value: metric.value,
        rating: metric.rating,
        page: window.location.pathname,
        deviceType: this.getDeviceType(),
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    });
  } catch (error) {
    // Fail silently - don't impact user experience
    console.error('[Monitoring] Failed to persist web vital:', error);
  }
}

/**
 * Get device type
 */
private getDeviceType(): string {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}
```

### Enhanced Conversion Tracking

Update: `D:\DR New\lib\monitoring/analytics.ts`

Add this enhanced tracking function (around line 160):

```typescript
/**
 * Track emergency phone calls with full context
 */
export function trackEmergencyCall(
  phoneNumber: string,
  location?: string
): void {
  // Original GA4 tracking
  trackConversion(ConversionEvent.EMERGENCY_CALL, 1000, {
    phone_number: phoneNumber,
    call_location: location || 'unknown',
    emergency_type: 'urgent',
    lead_quality: 'high',
  });

  // NEW: Persist to database for revenue attribution
  persistConversion({
    conversionType: 'emergency_call',
    value: 1000,
    source: getTrafficSource(),
    medium: getTrafficMedium(),
    campaign: getCampaign(),
    keyword: getReferrerKeyword(),
    page: window.location.pathname,
    referrer: document.referrer,
    serviceArea: extractServiceArea(window.location.pathname),
    serviceType: extractServiceType(window.location.pathname),
    leadScore: 90,
    leadQuality: 'high',
    urgencyLevel: 'emergency',
    deviceType: getDeviceType(),
  });
}

/**
 * Persist conversion to database
 */
async function persistConversion(data: any): Promise<void> {
  try {
    await fetch('/api/monitoring/conversions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true,
    });
  } catch (error) {
    console.error('[Analytics] Failed to persist conversion:', error);
  }
}

/**
 * Get traffic source from URL parameters or referrer
 */
function getTrafficSource(): string {
  const params = new URLSearchParams(window.location.search);

  // UTM source
  if (params.has('utm_source')) {
    return params.get('utm_source')!;
  }

  // Referrer-based detection
  const referrer = document.referrer;
  if (!referrer) return 'direct';

  const referrerHost = new URL(referrer).hostname;

  if (referrerHost.includes('google')) return 'google';
  if (referrerHost.includes('facebook')) return 'facebook';
  if (referrerHost.includes('instagram')) return 'instagram';
  if (referrerHost.includes('linkedin')) return 'linkedin';

  return 'referral';
}

/**
 * Get traffic medium
 */
function getTrafficMedium(): string {
  const params = new URLSearchParams(window.location.search);

  if (params.has('utm_medium')) {
    return params.get('utm_medium')!;
  }

  const source = getTrafficSource();
  if (source === 'google' || source === 'bing') return 'organic';
  if (source === 'direct') return 'none';

  return 'referral';
}

/**
 * Get campaign name
 */
function getCampaign(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('utm_campaign');
}

/**
 * Extract keyword from referrer (Google search)
 */
function getReferrerKeyword(): string | null {
  const referrer = document.referrer;
  if (!referrer) return null;

  try {
    const url = new URL(referrer);
    if (url.hostname.includes('google')) {
      return url.searchParams.get('q');
    }
    if (url.hostname.includes('bing')) {
      return url.searchParams.get('q');
    }
  } catch (e) {
    return null;
  }

  return null;
}

/**
 * Get device type
 */
function getDeviceType(): string {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Extract service area from pathname
 */
function extractServiceArea(pathname: string): string | null {
  const areas = ['brisbane', 'ipswich', 'logan'];
  const path = pathname.toLowerCase();

  for (const area of areas) {
    if (path.includes(area)) {
      return area;
    }
  }

  return null;
}

/**
 * Extract service type from pathname
 */
function extractServiceType(pathname: string): string | null {
  const services = ['water', 'fire', 'mould', 'mold', 'storm', 'flood', 'biohazard'];
  const path = pathname.toLowerCase();

  for (const service of services) {
    if (path.includes(service)) {
      return service === 'mold' ? 'mould' : service;
    }
  }

  return null;
}
```

---

## Phase 4: Search Console Integration (45 minutes)

### Step 1: Set Up Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google Search Console API
4. Create Service Account:
   - Go to IAM & Admin > Service Accounts
   - Create new service account
   - Download JSON key file
5. Add service account email to Search Console:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Settings > Users and permissions
   - Add user (service account email) with "Full" permission

### Step 2: Configure Environment Variables

Add to `.env.local`:

```bash
# Google Search Console API
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://disasterrecovery.com.au
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"

# Cron Job Secret (generate random string)
CRON_SECRET=your-random-secret-here-generate-with-openssl
```

### Step 3: Create Search Console Data Collector

Create: `D:\DR New\lib\monitoring\search-console-collector.ts`

```typescript
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Collect daily SEO metrics from Google Search Console
 */
export async function collectDailySEOMetrics(): Promise<void> {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({
      version: 'v1',
      auth,
    });

    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL!;
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    // Fetch site-wide data
    const siteWideData = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 1000,
      },
    });

    // Store site-wide metrics
    for (const row of siteWideData.data.rows || []) {
      await prisma.sEOMetric.create({
        data: {
          date: new Date(row.keys![0]),
          organicClicks: row.clicks || 0,
          organicImpressions: row.impressions || 0,
          organicCTR: row.ctr || 0,
          averagePosition: row.position || 0,
        }
      });
    }

    // Fetch page-level data
    const pageData = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 100,
      },
    });

    // Store page-level metrics
    for (const row of pageData.data.rows || []) {
      const page = row.keys![0];
      const pathname = new URL(page).pathname;

      await prisma.sEOMetric.create({
        data: {
          date: new Date(),
          page: pathname,
          organicClicks: row.clicks || 0,
          organicImpressions: row.impressions || 0,
          organicCTR: row.ctr || 0,
          averagePosition: row.position || 0,
          serviceArea: extractServiceArea(pathname),
        }
      });
    }

    // Fetch keyword data
    const keywordData = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 100,
      },
    });

    // Store keyword metrics
    for (const row of keywordData.data.rows || []) {
      const keyword = row.keys![0];

      await prisma.sEOMetric.create({
        data: {
          date: new Date(),
          keyword: keyword,
          organicClicks: row.clicks || 0,
          organicImpressions: row.impressions || 0,
          organicCTR: row.ctr || 0,
          averagePosition: row.position || 0,
        }
      });

      // Also store in KeywordRanking for historical tracking
      await prisma.keywordRanking.create({
        data: {
          keyword: keyword,
          position: row.position || 0,
          searchVolume: row.impressions || null,
          date: new Date(),
          source: 'google_search_console',
        }
      });
    }

    console.log('[Search Console] Daily metrics collected successfully');
  } catch (error) {
    console.error('[Search Console] Failed to collect metrics:', error);
    throw error;
  }
}

function extractServiceArea(pathname: string): string | null {
  const areas = ['brisbane', 'ipswich', 'logan'];
  const path = pathname.toLowerCase();

  for (const area of areas) {
    if (path.includes(area)) {
      return area;
    }
  }

  return null;
}
```

### Step 4: Create Cron Job Endpoint

Create: `D:\DR New\app\api\cron\collect-seo-metrics\route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { collectDailySEOMetrics } from '@/lib/monitoring/search-console-collector';

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedAuth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await collectDailySEOMetrics();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Cron] Failed to collect SEO metrics:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
```

### Step 5: Configure Vercel Cron

Create: `D:\DR New\vercel.json` (or update existing)

```json
{
  "crons": [
    {
      "path": "/api/cron/collect-seo-metrics",
      "schedule": "0 2 * * *"
    }
  ]
}
```

This runs daily at 2:00 AM UTC (12:00 PM Brisbane time).

---

## Phase 5: Testing & Verification

### Test Web Vitals Persistence

```javascript
// Open browser console on your site
// Manually trigger a web vital recording

fetch('/api/monitoring/web-vitals/persist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    metricName: 'LCP',
    value: 2300,
    rating: 'good',
    page: window.location.pathname,
    deviceType: 'desktop',
    timestamp: new Date().toISOString(),
  })
}).then(r => r.json()).then(console.log);
```

### Test Conversion Tracking

```javascript
// Test emergency call tracking
fetch('/api/monitoring/conversions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    conversionType: 'emergency_call',
    value: 1000,
    source: 'organic',
    medium: 'organic',
    page: '/services/water-damage-brisbane',
    serviceArea: 'brisbane',
    serviceType: 'water',
    leadScore: 90,
    leadQuality: 'high',
    urgencyLevel: 'emergency',
    deviceType: 'mobile',
  })
}).then(r => r.json()).then(console.log);
```

### Test SEO Metrics Retrieval

```javascript
// Fetch last 30 days of SEO metrics
fetch('/api/monitoring/seo/metrics?days=30')
  .then(r => r.json())
  .then(console.log);
```

### Test Search Console Cron (Local)

```bash
# Generate cron secret
openssl rand -base64 32

# Add to .env.local
# CRON_SECRET=<generated-secret>

# Test cron endpoint
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/cron/collect-seo-metrics
```

---

## Phase 6: Deploy & Monitor

### Pre-Deployment Checklist

- [ ] Prisma schema updated and migrated
- [ ] All API endpoints created
- [ ] Environment variables configured
- [ ] Google Service Account set up
- [ ] Service account added to Search Console
- [ ] Vercel cron configured
- [ ] Local testing completed

### Deploy to Vercel

```bash
# Ensure environment variables are set in Vercel dashboard
# Vercel Dashboard > Project > Settings > Environment Variables

# Deploy
vercel --prod

# Verify cron is registered
# Check Vercel Dashboard > Project > Settings > Crons
```

### Post-Deployment Verification

1. **Check database tables created:**
   ```sql
   -- Run in Prisma Studio or database tool
   SELECT name FROM sqlite_master WHERE type='table';
   -- Should see: WebVitalMetric, SEOMetric, ConversionMetric, etc.
   ```

2. **Verify Web Vitals are being stored:**
   ```sql
   SELECT * FROM WebVitalMetric ORDER BY timestamp DESC LIMIT 10;
   ```

3. **Check cron job execution:**
   - Vercel Dashboard > Deployments > Cron Jobs
   - Should see scheduled execution at 2 AM UTC

4. **Monitor for errors:**
   - Vercel Dashboard > Logs
   - Filter by `/api/monitoring` and `/api/cron`

---

## Phase 7: Next Steps

Once basic tracking is working:

1. **Build SEO Dashboard** (see OBSERVABILITY_ASSESSMENT.md Section 3D)
2. **Set up automated email reports** (Section 3E)
3. **Configure alerts** (Section 6)
4. **Add keyword tracking** (Section 3F)

---

## Troubleshooting

### Common Issues

**Issue:** Prisma migration fails
```bash
# Solution: Reset database (WARNING: deletes all data)
npx prisma migrate reset --force
npx prisma generate
npx prisma db push
```

**Issue:** Search Console API returns 403
```bash
# Solution: Verify service account has access
1. Check service account email is added to Search Console
2. Verify private key is correctly formatted in .env.local
3. Check scopes include 'webmasters.readonly'
```

**Issue:** Cron job not executing
```bash
# Solution: Verify Vercel configuration
1. Check vercel.json is committed to repo
2. Verify CRON_SECRET is set in Vercel environment variables
3. Check Vercel Dashboard > Settings > Crons shows the job
```

---

**Implementation Time Estimate:**
- Phase 1: 15 minutes
- Phase 2: 30 minutes
- Phase 3: 20 minutes
- Phase 4: 45 minutes
- Phase 5: 15 minutes
- Phase 6: 10 minutes

**Total: ~2.5 hours**

This gets you from "good monitoring" to "enterprise-grade observability" for your SEO optimizations!
