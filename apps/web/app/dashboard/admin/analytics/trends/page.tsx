'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface TrendData {
  success: boolean;
  analysis: {
    dateRange: {
      start: string;
      end: string;
    };
    dataPoints: number;
  };
  trends: {
    monthly: Array<{
      month: string;
      revenue: number;
      jobsCompleted: number;
      revenueGrowth: number;
      jobGrowth: number;
    }>;
    yoy: {
      current: number;
      previous: number;
      change: number;
      percentageChange: number;
    } | null;
  };
  metrics: {
    revenue: {
      consistency: number;
      inflectionPoints: Array<{
        month: string;
        value: number;
      }>;
    };
    jobs: {
      consistency: number;
      inflectionPoints: Array<{
        month: string;
        jobs: number;
      }>;
    };
  };
  seasonality: {
    pattern: Record<string, number>;
  };
}

export default function TrendsAnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TrendData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'ADMIN') {
        router.push('/dashboard');
      } else {
        fetchTrendData();
      }
    }
  }, [status, session, router]);

  const fetchTrendData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/analytics/trends?period=year');

      if (!response.ok) {
        throw new Error('Failed to fetch trend data');
      }

      const trendData = await response.json();
      setData(trendData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching trend data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading trend analysis...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Unauthorized access</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Trends & Analysis</h1>
            <p className="text-gray-400 mt-2">Historical trends and growth analysis</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {data && !error && (
          <>
            {/* Year-over-Year Comparison */}
            {data.trends.yoy && (
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Year-over-Year Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Current Year Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      ${data.trends.yoy.current.toLocaleString('en-AU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm font-medium">Previous Year Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      ${data.trends.yoy.previous.toLocaleString('en-AU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm font-medium">Year-over-Year Growth</p>
                    <p
                      className={`text-3xl font-bold mt-2 ${
                        data.trends.yoy.percentageChange > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {data.trends.yoy.percentageChange > 0 ? '↑' : '↓'} {Math.abs(data.trends.yoy.percentageChange)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Trend Consistency */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend Consistency</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">Consistency Score</p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full ${
                          data.metrics.revenue.consistency > 70
                            ? 'bg-green-600'
                            : data.metrics.revenue.consistency > 40
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                        }`}
                        style={{ width: `${data.metrics.revenue.consistency}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">{data.metrics.revenue.consistency.toFixed(1)}%</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {data.metrics.revenue.consistency > 70
                      ? 'Strong upward trend'
                      : data.metrics.revenue.consistency > 40
                        ? 'Moderate trend with volatility'
                        : 'Volatile trend with reversals'}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Jobs Completion Trend</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">Consistency Score</p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full ${
                          data.metrics.jobs.consistency > 70
                            ? 'bg-green-600'
                            : data.metrics.jobs.consistency > 40
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                        }`}
                        style={{ width: `${data.metrics.jobs.consistency}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">{data.metrics.jobs.consistency.toFixed(1)}%</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {data.metrics.jobs.consistency > 70
                      ? 'Strong upward trend'
                      : data.metrics.jobs.consistency > 40
                        ? 'Moderate trend with volatility'
                        : 'Volatile trend with reversals'}
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Trend */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Revenue Trend</h2>
              <div className="space-y-3">
                {data.trends.monthly.slice(-12).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 font-medium min-w-fit w-20">{item.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (item.revenue / Math.max(...data.trends.monthly.map((m) => m.revenue))) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-right min-w-fit">
                      <p className="font-bold text-gray-900">
                        ${item.revenue.toLocaleString('en-AU', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          item.revenueGrowth > 0 ? 'text-green-600' : item.revenueGrowth < 0 ? 'text-red-600' : 'text-gray-400'
                        }`}
                      >
                        {item.revenueGrowth > 0 ? '↑' : item.revenueGrowth < 0 ? '↓' : '→'} {Math.abs(item.revenueGrowth).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inflection Points */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Inflection Points</h2>
                {data.metrics.revenue.inflectionPoints.length > 0 ? (
                  <div className="space-y-2">
                    {data.metrics.revenue.inflectionPoints.map((point, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-400">{point.month}</span>
                        <span className="font-bold text-gray-900">
                          ${point.value.toLocaleString('en-AU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No significant inflection points detected</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Jobs Completion Inflection Points</h2>
                {data.metrics.jobs.inflectionPoints.length > 0 ? (
                  <div className="space-y-2">
                    {data.metrics.jobs.inflectionPoints.map((point, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-400">{point.month}</span>
                        <span className="font-bold text-gray-900">{point.jobs} jobs</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No significant inflection points detected</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
