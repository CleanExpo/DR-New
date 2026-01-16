'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Earning {
  id: string;
  jobAmount: number;
  gst: number;
  totalAmount: number;
  platformFee: number;
  payoutAmount: number;
  status: string;
  processedAt: string | null;
  completedAt: string | null;
  booking: {
    id: string;
    serviceType: string;
    location: string;
  } | null;
}

interface EarningsSummary {
  totalEarnings: number;
  totalPaidOut: number;
  pendingPayout: number;
  paymentCount: number;
  lastPayment: string | null;
  platformFeePercentage: number;
  contractorPayoutPercentage: number;
}

interface PeriodEarnings {
  period: string;
  totalAmount: number;
  totalPayout: number;
  jobCount: number;
  averageJobValue: number;
}

export default function ContractorEarningsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [summary, setSummary] = useState<EarningsSummary | null>(null);
  const [periodEarnings, setPeriodEarnings] = useState<PeriodEarnings | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('all_time');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEarnings();
    }
  }, [status, period]);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/contractor/earnings', window.location.origin);
      url.searchParams.set('period', period);

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setEarnings(data.earnings);
        setSummary(data.summary);
        setPeriodEarnings(data.periodEarnings);
      }
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600" />
          <p className="text-gray-600">Loading earnings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Earnings</h1>
            <p className="mt-2 text-gray-600">Track your income and payouts</p>
          </div>
          <Link
            href="/dashboard/contractor/payout-settings"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Payout Settings
          </Link>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(summary.totalEarnings)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {summary.paymentCount} jobs
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total Paid Out</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {formatCurrency(summary.totalPaidOut)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {summary.contractorPayoutPercentage}% of earnings
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Pending Payout</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {formatCurrency(summary.pendingPayout)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                After {summary.platformFeePercentage}% platform fee
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Last Payment</p>
              <p className="mt-2 text-lg font-bold text-gray-900">
                {summary.lastPayment ? formatDate(summary.lastPayment) : 'N/A'}
              </p>
            </div>
          </div>
        )}

        {/* Period Summary */}
        {periodEarnings && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {periodEarnings.period === 'all_time'
                ? 'All-Time Summary'
                : periodEarnings.period === 'current_month'
                ? 'This Month'
                : 'This Year'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(periodEarnings.totalAmount)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Your Payout</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(periodEarnings.totalPayout)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Job Count</p>
                <p className="text-2xl font-bold text-gray-900">
                  {periodEarnings.jobCount}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Average Job Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(periodEarnings.averageJobValue)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Period Filter */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setPeriod('all_time')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              period === 'all_time'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setPeriod('current_year')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              period === 'current_year'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            This Year
          </button>
          <button
            onClick={() => setPeriod('current_month')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              period === 'current_month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            This Month
          </button>
        </div>

        {/* Earnings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {earnings.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">No earnings in this period</p>
              <Link
                href="/dashboard/contractor"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View available jobs →
              </Link>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your Payout
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {earnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <p className="font-medium text-gray-900">
                        {earning.booking?.serviceType.replace(/_/g, ' ')}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {earning.booking?.id}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {earning.booking?.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(earning.processedAt || earning.completedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(earning.totalAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Fee: {formatCurrency(earning.platformFee)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(earning.payoutAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          earning.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {earning.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
