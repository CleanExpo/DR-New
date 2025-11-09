import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use edge runtime for faster responses

interface WebVitalsPayload {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
  url: string;
  timestamp: number;
}

// In-memory store for vitals (use a database in production)
const vitalsStore: WebVitalsPayload[] = [];

export async function POST(request: NextRequest) {
  try {
    const payload: WebVitalsPayload = await request.json();

    // Validate payload
    if (!payload.metric || typeof payload.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    // Store vitals data
    vitalsStore.push({
      ...payload,
      timestamp: Date.now(),
    });

    // Keep only last 1000 entries in memory
    if (vitalsStore.length > 1000) {
      vitalsStore.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', {
        metric: payload.metric,
        value: payload.value,
        rating: payload.rating,
        url: payload.url,
      });
    }

    // In production, you would send this to your analytics service
    // Examples:
    // - Google Analytics
    // - DataDog RUM
    // - New Relic
    // - Custom analytics endpoint

    return NextResponse.json(
      { success: true, message: 'Vitals recorded' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('[Web Vitals API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric');
    const url = searchParams.get('url');

    let filteredVitals = vitalsStore;

    // Filter by metric
    if (metric) {
      filteredVitals = filteredVitals.filter((v) => v.metric === metric);
    }

    // Filter by URL
    if (url) {
      filteredVitals = filteredVitals.filter((v) => v.url === url);
    }

    // Calculate aggregates
    const aggregates: Record<string, any> = {};

    ['LCP', 'FID', 'CLS', 'FCP', 'TTFB', 'INP'].forEach((metricName) => {
      const metricVitals = filteredVitals.filter((v) => v.metric === metricName);

      if (metricVitals.length > 0) {
        const values = metricVitals.map((v) => v.value);
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);

        // Calculate percentiles
        const sorted = [...values].sort((a, b) => a - b);
        const p50 = sorted[Math.floor(sorted.length * 0.5)];
        const p75 = sorted[Math.floor(sorted.length * 0.75)];
        const p95 = sorted[Math.floor(sorted.length * 0.95)];
        const p99 = sorted[Math.floor(sorted.length * 0.99)];

        // Count by rating
        const good = metricVitals.filter((v) => v.rating === 'good').length;
        const needsImprovement = metricVitals.filter((v) => v.rating === 'needs-improvement').length;
        const poor = metricVitals.filter((v) => v.rating === 'poor').length;

        aggregates[metricName] = {
          count: metricVitals.length,
          avg: Math.round(avg * 100) / 100,
          min: Math.round(min * 100) / 100,
          max: Math.round(max * 100) / 100,
          p50: Math.round(p50 * 100) / 100,
          p75: Math.round(p75 * 100) / 100,
          p95: Math.round(p95 * 100) / 100,
          p99: Math.round(p99 * 100) / 100,
          ratings: {
            good,
            needsImprovement,
            poor,
            goodPercent: Math.round((good / metricVitals.length) * 100),
            needsImprovementPercent: Math.round((needsImprovement / metricVitals.length) * 100),
            poorPercent: Math.round((poor / metricVitals.length) * 100),
          },
        };
      }
    });

    return NextResponse.json(
      {
        vitals: filteredVitals.slice(-100), // Return last 100 entries
        aggregates,
        totalCount: filteredVitals.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('[Web Vitals API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}