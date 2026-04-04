'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import XeroWidget from '@/components/dashboard/XeroWidget';

interface FinancialData {
  revenue: {
    totalRevenue: number;
    totalGST: number;
    totalGrossBilling: number;
    monthRevenue: number;
    averageBookingValue: number;
    totalBookings: number;
  };
  payouts: {
    totalContractorEarnings: number;
    platformFeesCollected: number;
    platformFeePercentage: number;
    monthPayouts: number;
    remainingDisputed: number;
  };
  performance: {
    paymentSuccessRate: number;
    totalPayments: number;
    failedPayments: number;
    averagePaymentTime: string;
  };
  serviceTypes: Array<{
    type: string;
    jobCount: number;
    revenue: number;
    payouts: number;
    platformFee: number;
  }>;
  topContractors: Array<{
    contractorId: string;
    businessName: string;
    jobCount: number;
    earnings: number;
    payouts: number;
    platformFee: number;
  }>;
  pendingPayments: Array<{
    id: string;
    amount: number;
    createdAt: string;
    bookingType: string;
  }>;
  financialHealth: {
    platformCashFlow: number;
    outstandingPayouts: number;
    healthStatus: string;
  };
}

export default function AdminFinancialsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated' && session?.user.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user.role === 'ADMIN') {
      fetchFinancialData();
    }
  }, [status, session]);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/financials/dashboard');
      const result = await response.json();

      if (result.success) {
        setData(result);
      } else {
        setError(result.error || 'Failed to load financial data');
      }
    } catch (err) {
      console.error('Error fetching financial data:', err);
      setError('Failed to fetch financial data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'EXCELLENT':
        return 'bg-green-100 text-green-800';
      case 'GOOD':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600" />
          <p className="text-gray-400">Loading financial dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchFinancialData}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="mt-2 text-gray-400">
            Real-time revenue, payouts, and platform metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(data.revenue.totalRevenue)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {data.revenue.totalBookings} bookings
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-400 text-sm font-medium">Platform Fees</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {formatCurrency(data.payouts.platformFeesCollected)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {data.payouts.platformFeePercentage}% commission
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-400 text-sm font-medium">Contractor Payouts</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {formatCurrency(data.payouts.totalContractorEarnings)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Outstanding: {formatCurrency(data.payouts.remainingDisputed)}
            </p>
          </div>

          <div className={`rounded-lg shadow p-6 ${getHealthStatusColor(data.financialHealth.healthStatus)}`}>
            <p className="text-sm font-medium opacity-75">Health Status</p>
            <p className="mt-2 text-3xl font-bold">
              {data.financialHealth.healthStatus}
            </p>
            <p className="mt-1 text-xs opacity-75">
              {(data.performance.paymentSuccessRate).toFixed(1)}% success rate
            </p>
          </div>
        </div>

        {/* Payment Performance */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {data.performance.paymentSuccessRate.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Payments</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {data.performance.totalPayments}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Failed Payments</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {data.performance.failedPayments}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Payment Time</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {data.performance.averagePaymentTime}
              </p>
            </div>
          </div>
        </div>

        {/* Revenue by Service Type */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Revenue by Service Type
            </h2>
            <div className="space-y-4">
              {data.serviceTypes.map((service) => (
                <div key={service.type} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {service.type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-gray-400">{service.jobCount} jobs</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(service.revenue)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Fee: {formatCurrency(service.platformFee)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top Contractors
            </h2>
            <div className="space-y-4">
              {data.topContractors.slice(0, 5).map((contractor) => (
                <div key={contractor.contractorId} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {contractor.businessName}
                    </p>
                    <p className="text-sm text-gray-400">{contractor.jobCount} jobs</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(contractor.earnings)}
                    </p>
                    <p className="text-sm text-green-600">
                      {formatCurrency(contractor.payouts)} paid
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Payments Alert */}
        {data.pendingPayments.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-yellow-900 mb-4">
              Pending Payments ({data.pendingPayments.length})
            </h2>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {data.pendingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between bg-white p-3 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {payment.bookingType?.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {formatDate(payment.createdAt)}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(payment.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Xero Accounting Integration */}
        <div className="mb-8">
          <XeroWidget />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/admin/financials/revenue"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Detailed Revenue</h3>
            <p className="text-gray-400 text-sm">View revenue breakdown by period</p>
          </Link>

          <Link
            href="/dashboard/admin/financials/payouts"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Payout Tracking</h3>
            <p className="text-gray-400 text-sm">Monitor contractor payments</p>
          </Link>

          <Link
            href="/dashboard/admin"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
            <p className="text-gray-400 text-sm">Back to main dashboard</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
