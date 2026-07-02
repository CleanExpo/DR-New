'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ContractorAnalyticsData {
  success: boolean;
  overview: {
    totalEarnings: number;
    monthlyEarnings: number;
    averagePerJob: number;
    completedJobs: number;
    activeJobs: number;
  };
  performance: {
    averageRating: number;
    ratingsCount: number;
    acceptanceRate: number;
    completionRate: number;
  };
  earnings: {
    byServiceType: Array<{
      serviceType: string;
      amount: number;
      count: number;
    }>;
    pendingPayouts: number;
    lastPayoutDate: string | null;
  };
}

export default function ContractorAnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ContractorAnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'CONTRACTOR') {
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

      const response = await fetch('/api/contractor/analytics/dashboard');

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
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== 'CONTRACTOR') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <p className="text-red-400">Unauthorized access</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Your Analytics</h1>
          <p className="text-gray-400 mt-2">Track your earnings, performance, and job metrics</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {data && !error && (
          <>
            {/* Earnings Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {/* Total Earnings Card */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
                <p className="text-gray-400 text-sm font-medium">Total Earnings</p>
                <p className="text-3xl font-bold text-white mt-2">
                  ${data.overview.totalEarnings.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-400 mt-1">All-time earnings</p>
              </div>

              {/* This Month Card */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
                <p className="text-gray-400 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold text-white mt-2">
                  ${data.overview.monthlyEarnings.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-400 mt-1">Current month earnings</p>
              </div>

              {/* Average Per Job Card */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
                <p className="text-gray-400 text-sm font-medium">Avg Per Job</p>
                <p className="text-3xl font-bold text-white mt-2">
                  ${data.overview.averagePerJob.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-400 mt-1">Average job value</p>
              </div>

              {/* Completed Jobs Card */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
                <p className="text-gray-400 text-sm font-medium">Completed Jobs</p>
                <p className="text-3xl font-bold text-white mt-2">{data.overview.completedJobs}</p>
                <p className="text-xs text-gray-400 mt-1">Total completed</p>
              </div>

              {/* Active Jobs Card */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
                <p className="text-gray-400 text-sm font-medium">Active Jobs</p>
                <p className="text-3xl font-bold text-white mt-2">{data.overview.activeJobs}</p>
                <p className="text-xs text-gray-400 mt-1">In progress</p>
              </div>
            </div>

            {/* Performance & Payout Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Performance Metrics */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
                <h2 className="text-lg font-bold text-white mb-4">Performance Metrics</h2>
                <div className="space-y-4">
                  {/* Average Rating */}
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gray-400 font-medium">Average Rating</span>
                      <span className="text-2xl font-bold text-yellow-500">
                        {data.performance.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(data.performance.averageRating) ? 'text-yellow-400' : 'text-white/20'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Based on {data.performance.ratingsCount} ratings</p>
                  </div>

                  {/* Acceptance Rate */}
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 font-medium">Acceptance Rate</span>
                      <span className="text-xl font-bold text-white">
                        {data.performance.acceptanceRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${data.performance.acceptanceRate}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Completion Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 font-medium">Completion Rate</span>
                      <span className="text-xl font-bold text-white">
                        {data.performance.completionRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${data.performance.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payout Status */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
                <h2 className="text-lg font-bold text-white mb-4">Payout Status</h2>
                <div className="space-y-4">
                  {/* Pending Payouts */}
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 font-medium">Pending Payouts</span>
                      <span className="text-2xl font-bold text-white">
                        ${data.earnings.pendingPayouts.toLocaleString('en-AU', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    {data.earnings.pendingPayouts > 0 ? (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 text-sm text-yellow-400">
                        <p className="font-medium">Awaiting processing</p>
                        <p className="text-xs mt-1">Payouts typically process within 3-5 business days</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No pending payouts</p>
                    )}
                  </div>

                  {/* Last Payout */}
                  <div>
                    <span className="text-gray-400 font-medium block mb-2">Last Payout</span>
                    {data.earnings.lastPayoutDate ? (
                      <p className="text-lg font-semibold text-white">
                        {new Date(data.earnings.lastPayoutDate).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">No payouts yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings by Service Type */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6 mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Earnings by Service Type</h2>
              {data.earnings.byServiceType.length > 0 ? (
                <div className="space-y-3">
                  {data.earnings.byServiceType.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                      <div>
                        <p className="text-sm font-medium text-white">{item.serviceType}</p>
                        <p className="text-xs text-gray-400">{item.count} job{item.count !== 1 ? 's' : ''}</p>
                      </div>
                      <span className="font-bold text-white">
                        ${item.amount.toLocaleString('en-AU', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No earnings data available</p>
              )}
            </div>

            {/* Detailed Analytics Link */}
            <div className="mb-8">
              <Link
                href="/dashboard/contractor/analytics/performance"
                className="block bg-white/[0.03] hover:bg-white/5 border border-white/[0.06] rounded-lg p-6 transition-colors"
              >
                <p className="text-lg font-bold text-white">Detailed Performance Analysis</p>
                <p className="text-sm text-gray-400 mt-2">
                  View rating distribution, monthly trends, completion time metrics, and historical data
                </p>
                <p className="text-xs text-blue-400 mt-3 font-medium">View Details →</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
