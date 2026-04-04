'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SpendingData {
  success: boolean;
  dateRange: {
    start: string;
    end: string;
  };
  summary: {
    totalSpent: number;
    totalFailed: number;
    totalRefunded: number;
    transactionCount: number;
    successfulTransactions: number;
    averageTransactionValue: number;
  };
  breakdown: {
    byContractor: Array<{
      contractor: string;
      amount: number;
      count: number;
    }>;
    byServiceType: Array<{
      serviceType: string;
      amount: number;
      count: number;
    }>;
  };
  trends: {
    monthly: Array<{
      month: string;
      amount: number;
    }>;
  };
  recentPayments: Array<{
    id: string;
    date: string;
    amount: number;
    status: string;
    serviceType: string;
    contractor: string;
  }>;
}

export default function SpendingAnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SpendingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'CLIENT') {
        router.push('/dashboard');
      } else {
        fetchSpendingData();
      }
    }
  }, [status, session, router]);

  const fetchSpendingData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (dateRange.start) params.append('startDate', dateRange.start);
      if (dateRange.end) params.append('endDate', dateRange.end);

      const response = await fetch(`/api/client/analytics/spending?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch spending data');
      }

      const spendingData = await response.json();
      setData(spendingData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching spending data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    const newRange = { ...dateRange, [type]: value };
    setDateRange(newRange);
    if (newRange.start && newRange.end) {
      // Refetch data when both dates are selected
      setData(null);
      setTimeout(() => {
        fetchSpendingData();
      }, 100);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading spending analytics...</p>
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
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
          >
            ← Back to Analytics
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Detailed Spending Analysis</h1>
          <p className="text-gray-400 mt-2">Comprehensive breakdown of your spending by contractor and service type</p>
        </div>

        {/* Date Range Filter */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.summary.totalSpent.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Average Per Transaction</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.summary.averageTransactionValue.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Successful Transactions</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{data.summary.successfulTransactions}</p>
                <p className="text-xs text-gray-400 mt-1">of {data.summary.transactionCount} total</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Refunded Amount</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  ${data.summary.totalRefunded.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Spending Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* By Contractor */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Top Contractors</h2>
                {data.breakdown.byContractor.length > 0 ? (
                  <div className="space-y-3">
                    {data.breakdown.byContractor.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-3 border-b last:border-b-0 last:pb-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.contractor}</p>
                          <p className="text-xs text-gray-400">{item.count} job{item.count !== 1 ? 's' : ''}</p>
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
                  <p className="text-sm text-gray-400">No contractor data available</p>
                )}
              </div>

              {/* By Service Type */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Spending by Service Type</h2>
                {data.breakdown.byServiceType.length > 0 ? (
                  <div className="space-y-3">
                    {data.breakdown.byServiceType.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-3 border-b last:border-b-0 last:pb-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.serviceType}</p>
                          <p className="text-xs text-gray-400">{item.count} job{item.count !== 1 ? 's' : ''}</p>
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
                  <p className="text-sm text-gray-400">No service type data available</p>
                )}
              </div>
            </div>

            {/* Monthly Trend */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Spending Trend</h2>
              {data.trends.monthly.length > 0 ? (
                <div className="space-y-2">
                  {data.trends.monthly.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-400 font-medium">{item.month}</span>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (item.amount /
                                  Math.max(...data.trends.monthly.map((m) => m.amount))) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="font-bold text-gray-900 min-w-fit">
                          ${item.amount.toLocaleString('en-AU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No trend data available</p>
              )}
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Payments</h2>
              {data.recentPayments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Service Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Contractor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentPayments.map((payment) => (
                        <tr key={payment.id} className="border-b last:border-b-0">
                          <td className="py-3 px-4 text-gray-900">
                            {new Date(payment.date).toLocaleDateString('en-AU')}
                          </td>
                          <td className="py-3 px-4 text-gray-400">{payment.serviceType || 'N/A'}</td>
                          <td className="py-3 px-4 text-gray-400">{payment.contractor || 'N/A'}</td>
                          <td className="py-3 px-4 font-bold text-gray-900">
                            ${payment.amount.toLocaleString('en-AU', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                payment.status === 'COMPLETED'
                                  ? 'bg-green-100 text-green-800'
                                  : payment.status === 'FAILED'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No payment history available</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
