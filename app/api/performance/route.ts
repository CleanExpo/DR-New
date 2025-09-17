import { NextResponse } from 'next/server';

// In-memory storage for performance metrics
const performanceMetrics: any[] = [];
const MAX_METRICS = 1000;

export async function POST(request: Request) {
  try {
    const metrics = await request.json();

    // Add timestamp if not present
    const timestampedMetrics = {
      ...metrics,
      timestamp: metrics.timestamp || new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Store metrics (FIFO with size limit)
    performanceMetrics.push(timestampedMetrics);
    if (performanceMetrics.length > MAX_METRICS) {
      performanceMetrics.shift();
    }

    return NextResponse.json({
      success: true,
      message: 'Performance metrics recorded'
    });
  } catch (error) {
    console.error('Error recording performance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to record performance metrics' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return recent metrics for monitoring
    const recentMetrics = performanceMetrics.slice(-100);

    // Calculate averages
    const averages = calculateAverages(recentMetrics);

    return NextResponse.json({
      metrics: recentMetrics,
      averages,
      total: performanceMetrics.length
    });
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch performance metrics' },
      { status: 500 }
    );
  }
}

function calculateAverages(metrics: any[]) {
  if (metrics.length === 0) return null;

  const sums = metrics.reduce((acc, metric) => {
    Object.keys(metric).forEach(key => {
      if (typeof metric[key] === 'number') {
        acc[key] = (acc[key] || 0) + metric[key];
      }
    });
    return acc;
  }, {});

  const averages: any = {};
  Object.keys(sums).forEach(key => {
    averages[key] = sums[key] / metrics.length;
  });

  return averages;
}