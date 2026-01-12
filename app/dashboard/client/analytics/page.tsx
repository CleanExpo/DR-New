'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ClientAnalyticsData {
  success: boolean;
  overview: {
    totalSpent: number;
    averageSpend: number;
    jobsCompleted: number;
    activeServiceRequests: number;
    upcomingBookings: number;
  };
  spending: {
    total: number;
    byServiceType: Array<{
      serviceType: string;
      amount: number;
      count: number;
    }>;
    monthlyTotal: number;
  };
  quality: {
    averageRating: number;
    ratingsCount: number;
    disputes: number;
  };
}

export default function ClientAnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ClientAnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'CLIENT') {
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

      const response = await fetch('/api/client/analytics/dashboard');

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

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== 'CLIENT') {
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
          <h1 className="text-3xl font-bold text-gray-900">Your Analytics</h1>
          <p className="text-gray-600 mt-2">Track your spending, service history, and quality metrics</p>
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
            {/* Spending Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {/* Total Spent Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.overview.totalSpent.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-600 mt-1">All-time spending</p>
              </div>

              {/* Average Spend Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-medium">Average Per Job</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.overview.averageSpend.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-600 mt-1">Across {data.spending.total} transactions</p>
              </div>

              {/* Jobs Completed Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-medium">Jobs Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{data.overview.jobsCompleted}</p>
                <p className="text-xs text-gray-600 mt-1">Successful projects</p>
              </div>

              {/* Active Requests Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-medium">Active Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{data.overview.activeServiceRequests}</p>
                <p className="text-xs text-gray-600 mt-1">Open or matched</p>
              </div>

              {/* Upcoming Bookings Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-medium">Upcoming Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{data.overview.upcomingBookings}</p>
                <p className="text-xs text-gray-600 mt-1">Scheduled work</p>
              </div>
            </div>

            {/* Service Quality & Spending Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Quality Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Service Quality</h2>
                <div className="space-y-4">
                  {/* Average Rating */}
                  <div className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gray-600 font-medium">Average Contractor Rating</span>
                      <span className="text-2xl font-bold text-yellow-500">
                        {data.quality.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(data.quality.averageRating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Based on {data.quality.ratingsCount} ratings</p>
                  </div>

                  {/* Disputes */}
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Disputes or Refunds</span>
                      <span className="text-2xl font-bold text-gray-900">{data.quality.disputes}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {data.quality.disputes === 0 ? '✓ No issues on record' : 'Items requiring attention'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Spending by Service Type */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Spending by Service Type</h2>
                {data.spending.byServiceType.length > 0 ? (
                  <div className="space-y-3">
                    {data.spending.byServiceType.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-2 border-b last:border-b-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.serviceType}</p>
                          <p className="text-xs text-gray-600">{item.count} job{item.count !== 1 ? 's' : ''}</p>
                        </div>
                        <span className="font-bold text-gray-900">
                          ${item.amount.toLocaleString('en-AU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No spending data available</p>
                )}
              </div>
            </div>

            {/* Detailed Analytics Links */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/dashboard/client/analytics/spending"
                className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-6 transition-colors"
              >
                <p className="text-lg font-bold text-gray-900">Detailed Spending Analysis</p>
                <p className="text-sm text-gray-600 mt-2">View spending trends, monthly breakdown, and contractor analysis</p>
                <p className="text-xs text-blue-600 mt-3 font-medium">View Details →</p>
              </Link>

              <div className="bg-white border border-gray-300 rounded-lg p-6">
                <p className="text-lg font-bold text-gray-900">Monthly Current</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${data.spending.monthlyTotal.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-600 mt-2">This month's spending</p>
              </div>
            </div>

            {/* Recent Activity Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{data.spending.total}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Services Used</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{data.spending.byServiceType.length}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {data.spending.total > 0
                      ? ((data.overview.jobsCompleted / data.overview.activeServiceRequests || 1) * 100).toFixed(0)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
