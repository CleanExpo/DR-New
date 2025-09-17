import { NextResponse } from 'next/server';

// Storage for aggregated performance data
const aggregatedData = new Map<string, any>();

export async function POST(request: Request) {
  try {
    const metrics = await request.json();

    // Get or create aggregation bucket (hourly)
    const bucketKey = getBucketKey(new Date());
    const bucket = aggregatedData.get(bucketKey) || createNewBucket();

    // Update aggregated metrics
    updateBucket(bucket, metrics);

    // Store updated bucket
    aggregatedData.set(bucketKey, bucket);

    // Clean old buckets (keep last 24 hours)
    cleanOldBuckets();

    return NextResponse.json({
      success: true,
      message: 'Performance metrics aggregated',
      bucket: bucketKey
    });
  } catch (error) {
    console.error('Error aggregating performance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to aggregate performance metrics' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hours = parseInt(searchParams.get('hours') || '24');

    // Get buckets for requested time range
    const now = new Date();
    const buckets = [];

    for (let i = 0; i < hours; i++) {
      const date = new Date(now.getTime() - i * 60 * 60 * 1000);
      const key = getBucketKey(date);
      const bucket = aggregatedData.get(key);

      if (bucket) {
        buckets.push({
          ...bucket,
          hour: key
        });
      }
    }

    // Calculate overall statistics
    const stats = calculateStats(buckets);

    return NextResponse.json({
      success: true,
      buckets: buckets.reverse(),
      stats,
      totalBuckets: buckets.length
    });
  } catch (error) {
    console.error('Error fetching aggregated metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch aggregated metrics' },
      { status: 500 }
    );
  }
}

function getBucketKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}`;
}

function createNewBucket() {
  return {
    count: 0,
    ttfb: { sum: 0, count: 0, min: Infinity, max: 0 },
    fcp: { sum: 0, count: 0, min: Infinity, max: 0 },
    lcp: { sum: 0, count: 0, min: Infinity, max: 0 },
    cls: { sum: 0, count: 0, min: Infinity, max: 0 },
    fid: { sum: 0, count: 0, min: Infinity, max: 0 },
    tti: { sum: 0, count: 0, min: Infinity, max: 0 },
  };
}

function updateBucket(bucket: any, metrics: any) {
  bucket.count++;

  // Update each metric type
  ['ttfb', 'fcp', 'lcp', 'cls', 'fid', 'tti'].forEach(metric => {
    if (metrics[metric] !== undefined && !isNaN(metrics[metric])) {
      const value = metrics[metric];
      bucket[metric].sum += value;
      bucket[metric].count++;
      bucket[metric].min = Math.min(bucket[metric].min, value);
      bucket[metric].max = Math.max(bucket[metric].max, value);
    }
  });
}

function cleanOldBuckets() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  for (const [key, _] of aggregatedData.entries()) {
    const [year, month, day, hour] = key.split('-').map(Number);
    const bucketDate = new Date(year, month - 1, day, hour);

    if (bucketDate < cutoff) {
      aggregatedData.delete(key);
    }
  }
}

function calculateStats(buckets: any[]) {
  if (buckets.length === 0) return null;

  const stats: any = {};

  ['ttfb', 'fcp', 'lcp', 'cls', 'fid', 'tti'].forEach(metric => {
    const values = buckets
      .filter(b => b[metric]?.count > 0)
      .map(b => b[metric].sum / b[metric].count);

    if (values.length > 0) {
      stats[metric] = {
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        p50: percentile(values, 0.5),
        p75: percentile(values, 0.75),
        p90: percentile(values, 0.9),
      };
    }
  });

  return stats;
}

function percentile(arr: number[], p: number): number {
  const sorted = arr.sort((a, b) => a - b);
  const index = Math.ceil(sorted.length * p) - 1;
  return sorted[Math.max(0, index)];
}