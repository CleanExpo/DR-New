'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ComparisonData {
  success: boolean;
  periods: {
    current: { start: string; end: string };
    previous: { start: string; end: string };
  };
  comparison: {
    revenue: { current: number; previous: number; change: { value: number; percentage: number; trend: string } };
    platformFees: { current: number; previous: number; change: { value: number; percentage: number; trend: string } };
    contractorPayouts: { current: number; previous: number; change: { value: number; percentage: number; trend: string } };
    jobsCompleted: { current: number; previous: number; change: { value: number; percentage: number; trend: string } };
    avgTransactionValue: { current: number; previous: number; change: { value: number; percentage: number; trend: string } };
    avgJobValue: { current: number; previous: number; change: { value: number; percentage: number; trend: string } };
    transactionCount: { current: number; previous: number; change: { value: number; percentage: number; trend: string } };
  };
  summary: {
    totalRevenuePeriod1: number;
    totalRevenuePeriod2: number;
    revenueGrowth: number;
    jobsGrowth: number;
  };
}

export default function ComparisonDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ComparisonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [period1Start, setPeriod1Start] = useState('');
  const [period1End, setPeriod1End] = useState('');
  const [period2Start, setPeriod2Start] = useState('');
  const [period2End, setPeriod2End] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'ADMIN') {
        router.push('/dashboard');
      }
    }
  }, [status, session, router]);

  const handleCompare = async () => {
    if (!period1Start || !period1End || !period2Start || !period2End) {
      setError('Please select both periods to compare');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        period1Start,
        period1End,
        period2Start,
        period2End,
      });

      const response = await fetch(`/api/admin/analytics/comparison?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch comparison data');
      }

      const comparisonData = await response.json();
      setData(comparisonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching comparison data:', err);
    } finally {
      setLoading(false);
    }
  };

  const MetricComparison = ({ label, current, previous, change }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-400 text-sm font-medium">{label}</p>
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">Current Period</p>
          <p className="text-2xl font-bold text-gray-900">
            {typeof current === 'number' && current > 100
              ? `$${current.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : current.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Previous Period</p>
          <p className="text-2xl font-bold text-gray-400">
            {typeof previous === 'number' && previous > 100
              ? `$${previous.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : previous.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="pt-2 border-t">
          <p
            className={`text-lg font-bold ${
              change.trend === 'up' ? 'text-green-600' : change.trend === 'down' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            {change.trend === 'up' ? '↑' : change.trend === 'down' ? '↓' : '→'} {change.percentage.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-400">
            {change.trend === 'up' ? 'Increase' : change.trend === 'down' ? 'Decrease' : 'No change'}
          </p>
        </div>
      </div>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Period Comparison</h1>
            <p className="text-gray-400 mt-2">Compare metrics between two custom periods</p>
          </div>
        </div>

        {/* Period Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select Periods to Compare</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Period 1 */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Current Period</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={period1Start}
                    onChange={(e) => setPeriod1Start(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={period1End}
                    onChange={(e) => setPeriod1End(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Period 2 */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Previous Period</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={period2Start}
                    onChange={(e) => setPeriod2Start(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={period2End}
                    onChange={(e) => setPeriod2End(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCompare}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Comparing...' : 'Compare Periods'}
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Comparison Results */}
        {data && !error && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Total Revenue Growth</p>
                <p
                  className={`text-4xl font-bold mt-3 ${
                    data.summary.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {data.summary.revenueGrowth > 0 ? '↑' : '↓'} {Math.abs(data.summary.revenueGrowth).toFixed(1)}%
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Jobs Completed Growth</p>
                <p
                  className={`text-4xl font-bold mt-3 ${
                    data.summary.jobsGrowth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {data.summary.jobsGrowth > 0 ? '↑' : '↓'} {Math.abs(data.summary.jobsGrowth).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Metric Comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <MetricComparison label="Total Revenue" current={data.comparison.revenue.current} previous={data.comparison.revenue.previous} change={data.comparison.revenue.change} />
              <MetricComparison label="Platform Fees" current={data.comparison.platformFees.current} previous={data.comparison.platformFees.previous} change={data.comparison.platformFees.change} />
              <MetricComparison label="Contractor Payouts" current={data.comparison.contractorPayouts.current} previous={data.comparison.contractorPayouts.previous} change={data.comparison.contractorPayouts.change} />
              <MetricComparison label="Jobs Completed" current={data.comparison.jobsCompleted.current} previous={data.comparison.jobsCompleted.previous} change={data.comparison.jobsCompleted.change} />
              <MetricComparison label="Avg Transaction Value" current={data.comparison.avgTransactionValue.current} previous={data.comparison.avgTransactionValue.previous} change={data.comparison.avgTransactionValue.change} />
              <MetricComparison label="Avg Job Value" current={data.comparison.avgJobValue.current} previous={data.comparison.avgJobValue.previous} change={data.comparison.avgJobValue.change} />
            </div>

            {/* Transaction Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Transaction Volume</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Current Period</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{data.comparison.transactionCount.current}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Previous Period</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{data.comparison.transactionCount.previous}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
