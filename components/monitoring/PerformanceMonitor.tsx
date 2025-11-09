/**
 * Real-time Performance Monitor Dashboard Component
 * Displays live Web Vitals and monitoring metrics
 */

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: string;
}

interface MonitoringData {
  webVitals: Record<string, {
    count: number;
    min: number;
    max: number;
    avg: number;
    p50: number;
    p75: number;
    p95: number;
    p99: number;
  }>;
  conversions: {
    total: number;
    totalValue: number;
  };
  alerts: Array<{
    id: string;
    type: string;
    severity: string;
    metric: string;
    value: number;
    threshold: number;
    timestamp: string;
  }>;
  period: {
    days: number;
    startDate: string;
    endDate: string;
  };
}

export function PerformanceMonitor() {
  const [data, setData] = useState<MonitoringData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  async function fetchMonitoringData() {
    try {
      const response = await fetch('/api/monitoring?days=7');
      if (!response.ok) throw new Error('Failed to fetch monitoring data');
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error loading monitoring data: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core Web Vitals */}
        {Object.entries(data.webVitals).map(([name, stats]) => (
          <Card key={name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{name}</CardTitle>
              <CardDescription className="text-xs">
                Last {data.period.days} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {Math.round(stats.p50)}{name === 'CLS' ? '' : 'ms'}
                </div>
                <div className="text-xs text-gray-500">
                  P50: {Math.round(stats.p50)} | P95: {Math.round(stats.p95)}
                </div>
                <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  getRatingColor(name, stats.p50)
                }`}>
                  {getRatingLabel(name, stats.p50)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conversions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Conversions</CardTitle>
            <CardDescription>Last {data.period.days} days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.conversions.total}</div>
            <p className="text-sm text-gray-500 mt-2">
              Total Value: ${data.conversions.totalValue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Unresolved performance issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.alerts.length}</div>
            {data.alerts.length > 0 && (
              <div className="mt-4 space-y-2">
                {data.alerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className={`text-xs p-2 rounded ${
                    alert.severity === 'critical' ? 'bg-red-50 text-red-700' :
                    alert.severity === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {alert.metric}: {Math.round(alert.value)} (threshold: {alert.threshold})
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getRatingColor(metric: string, value: number): string {
  const rating = getRatingLabel(metric, value);
  if (rating === 'Good') return 'bg-green-100 text-green-800';
  if (rating === 'Needs Improvement') return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function getRatingLabel(metric: string, value: number): string {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
    FCP: { good: 1800, poor: 3000 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'Unknown';

  if (value <= threshold.good) return 'Good';
  if (value <= threshold.poor) return 'Needs Improvement';
  return 'Poor';
}

export default PerformanceMonitor;
