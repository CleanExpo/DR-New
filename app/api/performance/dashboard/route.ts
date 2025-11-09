import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface PerformanceMetrics {
  timestamp: number;
  url: string;
  metrics: {
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
    ttfb: number;
    inp: number;
  };
  device: string;
  connection: string;
}

// In-memory store (use Redis or database in production)
const metricsStore: PerformanceMetrics[] = [];

export async function POST(request: NextRequest) {
  try {
    const metrics: PerformanceMetrics = await request.json();

    // Validate metrics
    if (!metrics.url || !metrics.metrics) {
      return NextResponse.json(
        { error: 'Invalid metrics payload' },
        { status: 400 }
      );
    }

    // Store metrics
    metricsStore.push({
      ...metrics,
      timestamp: Date.now(),
    });

    // Keep only last 10000 entries
    if (metricsStore.length > 10000) {
      metricsStore.shift();
    }

    return NextResponse.json(
      { success: true, message: 'Metrics stored' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Performance Dashboard] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const period = searchParams.get('period') || '24h'; // 24h, 7d, 30d

    // Filter metrics by URL if provided
    let filteredMetrics = url
      ? metricsStore.filter((m) => m.url === url)
      : metricsStore;

    // Filter by period
    const now = Date.now();
    const periodMs = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    }[period] || 24 * 60 * 60 * 1000;

    filteredMetrics = filteredMetrics.filter(
      (m) => now - m.timestamp < periodMs
    );

    // Calculate aggregates
    const aggregates = calculateAggregates(filteredMetrics);

    // Get performance score
    const score = calculatePerformanceScore(aggregates);

    // Get trends
    const trends = calculateTrends(filteredMetrics);

    // Get device breakdown
    const deviceBreakdown = calculateDeviceBreakdown(filteredMetrics);

    return NextResponse.json(
      {
        period,
        dataPoints: filteredMetrics.length,
        score,
        aggregates,
        trends,
        deviceBreakdown,
        timestamp: Date.now(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('[Performance Dashboard] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateAggregates(metrics: PerformanceMetrics[]) {
  const metricNames = ['lcp', 'fid', 'cls', 'fcp', 'ttfb', 'inp'] as const;
  const aggregates: any = {};

  metricNames.forEach((metricName) => {
    const values = metrics
      .map((m) => m.metrics[metricName])
      .filter((v) => v !== undefined && v !== null);

    if (values.length > 0) {
      const sorted = [...values].sort((a, b) => a - b);
      const sum = values.reduce((a, b) => a + b, 0);

      aggregates[metricName] = {
        avg: Math.round((sum / values.length) * 100) / 100,
        min: Math.round(Math.min(...values) * 100) / 100,
        max: Math.round(Math.max(...values) * 100) / 100,
        p50: sorted[Math.floor(sorted.length * 0.5)],
        p75: sorted[Math.floor(sorted.length * 0.75)],
        p95: sorted[Math.floor(sorted.length * 0.95)],
        p99: sorted[Math.floor(sorted.length * 0.99)],
        count: values.length,
      };
    }
  });

  return aggregates;
}

function calculatePerformanceScore(aggregates: any): number {
  // Calculate weighted performance score (0-100)
  const weights = {
    lcp: 0.25,
    fid: 0.25,
    cls: 0.25,
    fcp: 0.15,
    ttfb: 0.1,
  };

  const thresholds = {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 },
  };

  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(weights).forEach(([metric, weight]) => {
    if (aggregates[metric]) {
      const value = aggregates[metric].p75;
      const threshold = thresholds[metric as keyof typeof thresholds];

      let score = 100;
      if (value > threshold.poor) {
        score = 0;
      } else if (value > threshold.good) {
        const range = threshold.poor - threshold.good;
        const position = value - threshold.good;
        score = 50 * (1 - position / range);
      }

      totalScore += score * weight;
      totalWeight += weight;
    }
  });

  return Math.round(totalScore / totalWeight);
}

function calculateTrends(metrics: PerformanceMetrics[]) {
  // Calculate hour-by-hour trends for the last 24 hours
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;
  const trends: any[] = [];

  for (let i = 23; i >= 0; i--) {
    const hourStart = now - i * hourMs;
    const hourEnd = hourStart + hourMs;

    const hourMetrics = metrics.filter(
      (m) => m.timestamp >= hourStart && m.timestamp < hourEnd
    );

    if (hourMetrics.length > 0) {
      const hourAggregates = calculateAggregates(hourMetrics);
      trends.push({
        hour: new Date(hourStart).toISOString(),
        count: hourMetrics.length,
        lcp: hourAggregates.lcp?.p75 || 0,
        fid: hourAggregates.fid?.p75 || 0,
        cls: hourAggregates.cls?.p75 || 0,
      });
    }
  }

  return trends;
}

function calculateDeviceBreakdown(metrics: PerformanceMetrics[]) {
  const devices: Record<string, number> = {};

  metrics.forEach((m) => {
    const device = m.device || 'unknown';
    devices[device] = (devices[device] || 0) + 1;
  });

  return Object.entries(devices).map(([device, count]) => ({
    device,
    count,
    percentage: Math.round((count / metrics.length) * 100),
  }));
}