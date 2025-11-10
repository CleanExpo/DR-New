/**
 * Web Vitals Monitoring API Endpoint
 * Stores Core Web Vitals metrics for analysis
 */

import { NextRequest, NextResponse } from 'next/server';

interface WebVitalMetric {
  name: string;
  value: number;
  rating?: string;
  delta?: number;
  id: string;
  url: string;
  timestamp: string;
  userAgent?: string;
}

// In-memory storage (replace with database in production)
const metricsStore: WebVitalMetric[] = [];
const MAX_METRICS = 1000;

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();

    // Validate metric
    if (!metric.name || !metric.value || !metric.id) {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      );
    }

    // Store metric
    metricsStore.push({
      ...metric,
      userAgent: request.headers.get('user-agent') || undefined,
    });

    // Keep only last MAX_METRICS
    if (metricsStore.length > MAX_METRICS) {
      metricsStore.shift();
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital recorded:', {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        url: metric.url,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing web vital:', error);
    return NextResponse.json(
      { error: 'Failed to store metric' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metricName = searchParams.get('name');
    const url = searchParams.get('url');

    let metrics = metricsStore;

    // Filter by name
    if (metricName) {
      metrics = metrics.filter(m => m.name === metricName);
    }

    // Filter by URL
    if (url) {
      metrics = metrics.filter(m => m.url === url);
    }

    // Calculate statistics
    const stats = calculateStats(metrics);

    return NextResponse.json({
      total: metrics.length,
      stats,
      recent: metrics.slice(-10).reverse(),
    });
  } catch (error) {
    console.error('Error retrieving web vitals:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve metrics' },
      { status: 500 }
    );
  }
}

function calculateStats(metrics: WebVitalMetric[]) {
  if (metrics.length === 0) {return null;}

  const values = metrics.map(m => m.value).sort((a, b) => a - b);

  return {
    count: metrics.length,
    min: values[0],
    max: values[values.length - 1],
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    median: values[Math.floor(values.length / 2)],
    p75: values[Math.floor(values.length * 0.75)],
    p95: values[Math.floor(values.length * 0.95)],
    p99: values[Math.floor(values.length * 0.99)],
  };
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
