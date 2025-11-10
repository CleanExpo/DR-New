/**
 * Server-side Monitoring Endpoint
 * Aggregates and serves monitoring data from database and in-memory stores
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Fetch Web Vitals summary
    const webVitals = await prisma.webVitalMetric.findMany({
      where: { timestamp: { gte: startDate } },
      orderBy: { timestamp: 'desc' },
      take: 1000,
    });

    // Calculate Web Vitals aggregates
    const webVitalsSummary = calculateWebVitalsSummary(webVitals);

    // Fetch conversion metrics
    const conversions = await prisma.conversionMetric.aggregate({
      where: { timestamp: { gte: startDate } },
      _sum: { value: true },
      _count: true,
    });

    // Fetch performance alerts
    const alerts = await prisma.performanceAlert.findMany({
      where: {
        timestamp: { gte: startDate },
        resolved: false,
      },
      orderBy: { timestamp: 'desc' },
      take: 20,
    });

    return NextResponse.json({
      webVitals: webVitalsSummary,
      conversions: {
        total: conversions._count || 0,
        totalValue: conversions._sum.value || 0,
      },
      alerts: alerts.map(a => ({
        id: a.id,
        type: a.alertType,
        severity: a.severity,
        metric: a.metric,
        value: a.value,
        threshold: a.threshold,
        timestamp: a.timestamp,
      })),
      period: {
        days,
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Failed to fetch monitoring data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monitoring data' },
      { status: 500 }
    );
  }
}

function calculateWebVitalsSummary(metrics: any[]) {
  const byMetric: Record<string, number[]> = {};

  metrics.forEach(m => {
    if (!byMetric[m.metricName]) {
      byMetric[m.metricName] = [];
    }
    byMetric[m.metricName].push(m.value);
  });

  const summary: Record<string, any> = {};

  Object.entries(byMetric).forEach(([name, values]) => {
    if (values.length === 0) {return;}

    const sorted = [...values].sort((a, b) => a - b);
    summary[name] = {
      count: values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: sorted.reduce((a, b) => a + b, 0) / sorted.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p75: sorted[Math.floor(sorted.length * 0.75)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  });

  return summary;
}

export const runtime = 'nodejs';
