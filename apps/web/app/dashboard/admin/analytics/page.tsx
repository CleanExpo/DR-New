'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardData {
  success: boolean;
  period: string;
  dateRange: {
    start: string;
    end: string;
  };
  kpis: {
    revenue: any;
    platformFees: any;
    contractorPayouts: any;
    jobsCompleted: any;
    paymentSuccessRate: any;
    activeContractors: number;
    avgCompletionTime: string;
  };
  comparison: {
    current: any;
    previous: any;
  };
  topContractors: any[];
  topClients: any[];
  serviceTypeBreakdown: any[];
}

export default function AdminAnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [period, setPeriod] = useState('month');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not admin
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'ADMIN') {
        router.push('/dashboard');
      } else {
        fetchDashboardData();
      }
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/analytics/dashboard?period=${period}`);

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [period, status]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics dashboard...</p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-2">Real-time business metrics and performance insights</p>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex gap-2">
          {['today', 'week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
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
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Revenue Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.kpis.revenue.value.toLocaleString('en-AU')}
                </p>
                <div
                  className={`mt-2 text-sm font-medium ${
                    data.kpis.revenue.trend === 'up'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.kpis.revenue.trend === 'up' ? '↑' : '↓'}{' '}
                  {Math.abs(data.kpis.revenue.change).toFixed(1)}% vs previous period
                </div>
              </div>

              {/* Platform Fees Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Platform Fees</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.kpis.platformFees.value.toLocaleString('en-AU')}
                </p>
                <div
                  className={`mt-2 text-sm font-medium ${
                    data.kpis.platformFees.trend === 'up'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.kpis.platformFees.trend === 'up' ? '↑' : '↓'}{' '}
                  {Math.abs(data.kpis.platformFees.change).toFixed(1)}% vs previous period
                </div>
              </div>

              {/* Jobs Completed Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Jobs Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.kpis.jobsCompleted.value}
                </p>
                <div
                  className={`mt-2 text-sm font-medium ${
                    data.kpis.jobsCompleted.trend === 'up'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.kpis.jobsCompleted.trend === 'up' ? '↑' : '↓'}{' '}
                  {Math.abs(data.kpis.jobsCompleted.change).toFixed(1)}% vs previous period
                </div>
              </div>

              {/* Success Rate Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Payment Success Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.kpis.paymentSuccessRate.value.toFixed(1)}%
                </p>
                <div
                  className={`mt-2 text-sm font-medium ${
                    data.kpis.paymentSuccessRate.trend === 'up'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.kpis.paymentSuccessRate.trend === 'up' ? '↑' : '↓'}{' '}
                  {Math.abs(data.kpis.paymentSuccessRate.change).toFixed(1)}pp vs previous period
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Active Contractors</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {data.kpis.activeContractors}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Avg Completion Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {data.kpis.avgCompletionTime}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Contractor Payouts</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${data.kpis.contractorPayouts.value.toLocaleString('en-AU')}
                </p>
              </div>
            </div>

            {/* Detailed Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Navigation Links */}
              <div className="col-span-full mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/dashboard/admin/analytics/revenue"
                  className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-4 text-center transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900">Revenue Analysis</p>
                  <p className="text-xs text-gray-400 mt-1">Detailed breakdown</p>
                </Link>
                <Link
                  href="/dashboard/admin/analytics/operational"
                  className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-4 text-center transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900">Operational Metrics</p>
                  <p className="text-xs text-gray-400 mt-1">Job performance</p>
                </Link>
                <Link
                  href="/dashboard/admin/analytics/trends"
                  className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-4 text-center transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900">Trends & Comparison</p>
                  <p className="text-xs text-gray-400 mt-1">Period analysis</p>
                </Link>
                <Link
                  href="/dashboard/admin/analytics/exports"
                  className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-4 text-center transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900">Export Reports</p>
                  <p className="text-xs text-gray-400 mt-1">Download data</p>
                </Link>
              </div>

              {/* Top Contractors */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Top Contractors</h2>
                <div className="space-y-3">
                  {data.topContractors.length > 0 ? (
                    data.topContractors.map((contractor, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center pb-2 border-b last:border-b-0"
                      >
                        <span className="text-sm text-gray-400">
                          #{idx + 1} - {contractor.contractorId}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${(contractor._sum.amountAUD || 0).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No data available</p>
                  )}
                </div>
              </div>

              {/* Top Clients */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Top Clients</h2>
                <div className="space-y-3">
                  {data.topClients.length > 0 ? (
                    data.topClients.map((client, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center pb-2 border-b last:border-b-0"
                      >
                        <span className="text-sm text-gray-400">
                          #{idx + 1} - {client.clientId}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${(client._sum.amountAUD || 0).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No data available</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
