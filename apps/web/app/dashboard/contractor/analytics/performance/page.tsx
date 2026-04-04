'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PerformanceAnalyticsData {
  success: boolean;
  summary: {
    totalJobs: number;
    completedJobs: number;
    averageRating: number;
    totalEarnings: number;
    averageCompletionTime: number;
    acceptanceRate: number;
    disputes: number;
    refunds: number;
  };
  performance: {
    ratingDistribution: Array<{
      stars: number;
      count: number;
    }>;
    monthlyCompletionRate: number;
  };
  earnings: {
    monthlyTrend: Array<{
      month: string;
      amount: number;
      jobCount: number;
    }>;
  };
  services: {
    byType: Array<{
      serviceType: string;
      jobCount: number;
      averageRating: number;
      totalEarnings: number;
    }>;
  };
}

// New analytics data structure
interface ContractorAnalytics {
  success: boolean;
  analytics: {
    overview: {
      profileViews: number;
      profileViewsThisMonth: number;
      totalBookings: number;
      completedBookings: number;
      activeBookings: number;
      averageRating: number;
      totalRatings: number;
      conversionRate: number;
      memberSince: string;
    };
    bookingStats: {
      total: number;
      completed: number;
      active: number;
      cancelled: number;
      thisMonth: number;
      lastMonth: number;
      last30Days: number;
      completionRate: number;
      cancellationRate: number;
      monthOverMonthGrowth: number;
    };
    ratingStats: {
      totalRatings: number;
      averageRating: number;
      ratingsLast30Days: number;
      distribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
      };
      positiveRatingPercentage: number;
    };
    performance: {
      averageResponseTimeMinutes: number;
      completedJobs: number;
      quoteRequestCount: number;
      quoteAcceptanceRate: number;
      directBookingRequests: number;
    };
    trends: {
      viewTrend: {
        last7Days: number;
        percentageChange: string;
      };
      bookingGrowth: {
        thisMonth: number;
        lastMonth: number;
        percentageChange: string;
      };
    };
    recent: {
      bookings: Array<{
        id: string;
        status: string;
        serviceType: string;
        createdAt: string;
        scheduledDate?: string;
        completedAt?: string;
        totalCost?: number;
      }>;
      ratings: Array<{
        id: string;
        rating: number;
        comment?: string;
        createdAt: string;
      }>;
    };
  };
}

export default function ContractorPerformanceAnalytics() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PerformanceAnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Set default date range (last 6 months)
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 6);

    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'CONTRACTOR') {
        router.push('/dashboard');
      } else if (startDate && endDate) {
        fetchPerformanceData();
      }
    }
  }, [status, session, router, startDate, endDate]);

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        startDate,
        endDate,
      });

      const response = await fetch(`/api/contractor/analytics/performance?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch performance data');
      }

      const performanceData = await response.json();
      setData(performanceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching performance data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilterApply = () => {
    if (startDate && endDate) {
      fetchPerformanceData();
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading performance analytics...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== 'CONTRACTOR') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Unauthorized access</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link
            href="/dashboard/contractor/analytics"
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
          >
            ← Back to Analytics Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Detailed Performance Analysis</h1>
          <p className="text-gray-400 mt-2">Comprehensive view of your performance metrics and trends</p>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Date Range Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleDateFilterApply}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Apply Filter
              </button>
            </div>
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
            {/* Performance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Total Jobs */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{data.summary.totalJobs}</p>
                <p className="text-xs text-gray-400 mt-1">{data.summary.completedJobs} completed</p>
              </div>

              {/* Average Rating */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold text-yellow-500 mt-2">
                  {data.summary.averageRating.toFixed(1)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(data.summary.averageRating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Total Earnings */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.summary.totalEarnings.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-400 mt-1">In selected period</p>
              </div>

              {/* Acceptance Rate */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Acceptance Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.summary.acceptanceRate.toFixed(1)}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${data.summary.acceptanceRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Avg Completion Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {data.summary.averageCompletionTime.toFixed(1)} days
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Disputes</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{data.summary.disputes}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Refunds</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{data.summary.refunds}</p>
              </div>
            </div>

            {/* Rating Distribution & Monthly Earnings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Rating Distribution */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Rating Distribution</h2>
                <div className="space-y-4">
                  {data.performance.ratingDistribution
                    .sort((a, b) => b.stars - a.stars)
                    .map((rating) => {
                      const total = data.performance.ratingDistribution.reduce(
                        (sum, r) => sum + r.count,
                        0
                      );
                      const percentage = total > 0 ? (rating.count / total) * 100 : 0;

                      return (
                        <div key={rating.stars} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-20">
                            <span className="text-sm font-medium text-gray-900">{rating.stars}</span>
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-4">
                                <div
                                  className="bg-yellow-400 h-4 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900 w-16 text-right">
                                {rating.count} ({percentage.toFixed(0)}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Monthly Completion Rate */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Completion Metrics</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 font-medium">Monthly Completion Rate</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {data.performance.monthlyCompletionRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${data.performance.monthlyCompletionRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-400 mb-2">Performance Summary</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Completed</span>
                        <span className="font-medium text-gray-900">{data.summary.completedJobs}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total</span>
                        <span className="font-medium text-gray-900">{data.summary.totalJobs}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Success Rate</span>
                        <span className="font-medium text-green-600">
                          {data.summary.totalJobs > 0
                            ? ((data.summary.completedJobs / data.summary.totalJobs) * 100).toFixed(1)
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Earnings Trend */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Earnings Trend</h2>
              {data.earnings.monthlyTrend.length > 0 ? (
                <div className="space-y-3">
                  {data.earnings.monthlyTrend.map((item, idx) => {
                    const maxAmount = Math.max(...data.earnings.monthlyTrend.map((t) => t.amount));
                    const barWidth = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;

                    return (
                      <div key={idx} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(item.month).toLocaleDateString('en-AU', {
                                year: 'numeric',
                                month: 'long',
                              })}
                            </p>
                            <p className="text-xs text-gray-400">{item.jobCount} jobs</p>
                          </div>
                          <span className="font-bold text-gray-900">
                            ${item.amount.toLocaleString('en-AU', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${barWidth}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No earnings data available for the selected period</p>
              )}
            </div>

            {/* Service Type Breakdown */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Performance by Service Type</h2>
              {data.services.byType.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Service Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Job Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Avg Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Total Earnings
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.services.byType.map((service, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {service.serviceType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {service.jobCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium text-gray-900">
                                {service.averageRating.toFixed(1)}
                              </span>
                              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${service.totalEarnings.toLocaleString('en-AU', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No service data available</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
