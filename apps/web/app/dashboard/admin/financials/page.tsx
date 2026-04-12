'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
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

interface ReconciliationIssue {
  type: 'MISSING_IN_STRIPE' | 'MISSING_IN_DB' | 'AMOUNT_MISMATCH' | 'STATUS_MISMATCH';
  paymentId?: string;
  stripeId?: string;
  dbAmount?: number;
  stripeAmount?: number;
  dbStatus?: string;
  stripeStatus?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
}

interface ReconciliationReport {
  generatedAt: string;
  period: { startDate: string; endDate: string };
  statistics: {
    totalPaymentsInDB: number;
    totalPaymentsInStripe: number;
    totalAmountInDB: number;
    totalAmountInStripe: number;
    matchingPayments: number;
    discrepancies: number;
  };
  issues: ReconciliationIssue[];
  summary: { reconciliationRate: number; status: 'HEALTHY' | 'WARNING' | 'CRITICAL' };
  issueCount: { total: number; critical: number; warning: number; info: number };
}

export default function AdminFinancialsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // CONN-015: Reconciliation state
  const today = new Date().toISOString().slice(0, 10);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const [reconcileStart, setReconcileStart] = useState(thirtyDaysAgo);
  const [reconcileEnd, setReconcileEnd] = useState(today);
  const [reconcileLoading, setReconcileLoading] = useState(false);
  const [reconcileReport, setReconcileReport] = useState<ReconciliationReport | null>(null);

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

  // CONN-015: run reconciliation
  const runReconciliation = useCallback(async () => {
    setReconcileLoading(true);
    try {
      const params = new URLSearchParams({ startDate: reconcileStart, endDate: reconcileEnd });
      const res = await fetch(`/api/admin/payments/reconcile?${params.toString()}`);
      const result = await res.json();
      if (res.ok && result.success) {
        setReconcileReport(result.report);
        const count = result.report.issueCount.total;
        if (count === 0) {
          toast.success('Reconciliation complete', { description: 'No discrepancies found.' });
        } else {
          toast.warning(`${count} discrepanc${count === 1 ? 'y' : 'ies'} found`, {
            description: `${result.report.issueCount.critical} HIGH severity`,
          });
        }
      } else {
        toast.error('Reconciliation failed', { description: result.error });
      }
    } catch {
      toast.error('Reconciliation request failed');
    } finally {
      setReconcileLoading(false);
    }
  }, [reconcileStart, reconcileEnd]);

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

        {/* CONN-015: Payment Reconciliation Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Payment Reconciliation</h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Compare DB payments against Stripe to find discrepancies
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={reconcileStart}
                onChange={(e) => setReconcileStart(e.target.value)}
                className="border rounded px-2 py-1 text-sm text-gray-700"
              />
              <span className="text-gray-400 text-sm">–</span>
              <input
                type="date"
                value={reconcileEnd}
                onChange={(e) => setReconcileEnd(e.target.value)}
                className="border rounded px-2 py-1 text-sm text-gray-700"
              />
              <button
                onClick={runReconciliation}
                disabled={reconcileLoading}
                className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50 flex items-center gap-2"
              >
                {reconcileLoading ? (
                  <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                ) : null}
                Run Reconciliation
              </button>
            </div>
          </div>

          {reconcileReport && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-xs text-gray-400 uppercase font-medium">DB Payments</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {reconcileReport.statistics.totalPaymentsInDB}
                  </p>
                </div>
                <div className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-xs text-gray-400 uppercase font-medium">Stripe Payments</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {reconcileReport.statistics.totalPaymentsInStripe}
                  </p>
                </div>
                <div className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-xs text-gray-400 uppercase font-medium">Match Rate</p>
                  <p className={`text-xl font-bold mt-1 ${
                    reconcileReport.summary.reconciliationRate >= 0.98
                      ? 'text-green-600'
                      : reconcileReport.summary.reconciliationRate >= 0.95
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}>
                    {(reconcileReport.summary.reconciliationRate * 100).toFixed(1)}%
                  </p>
                </div>
                <div className={`rounded p-3 text-center ${
                  reconcileReport.summary.status === 'HEALTHY'
                    ? 'bg-green-50'
                    : reconcileReport.summary.status === 'WARNING'
                    ? 'bg-amber-50'
                    : 'bg-red-50'
                }`}>
                  <p className="text-xs text-gray-400 uppercase font-medium">Status</p>
                  <p className={`text-sm font-bold mt-1 ${
                    reconcileReport.summary.status === 'HEALTHY'
                      ? 'text-green-700'
                      : reconcileReport.summary.status === 'WARNING'
                      ? 'text-amber-700'
                      : 'text-red-700'
                  }`}>
                    {reconcileReport.summary.status}
                  </p>
                </div>
              </div>

              {/* Issues */}
              {reconcileReport.issues.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Discrepancies ({reconcileReport.issueCount.total})
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {reconcileReport.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded border text-sm ${
                          issue.severity === 'HIGH'
                            ? 'border-red-200 bg-red-50'
                            : issue.severity === 'MEDIUM'
                            ? 'border-amber-200 bg-amber-50'
                            : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                          issue.severity === 'HIGH'
                            ? 'bg-red-200 text-red-800'
                            : issue.severity === 'MEDIUM'
                            ? 'bg-amber-200 text-amber-800'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {issue.severity}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">
                            {issue.type.replace(/_/g, ' ')}
                          </p>
                          <p className="text-gray-500 text-xs mt-0.5">{issue.description}</p>
                          {issue.paymentId && (
                            <p className="text-xs text-gray-400 mt-0.5 font-mono">
                              {issue.paymentId}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reconcileReport.issues.length === 0 && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded p-3">
                  <span className="text-lg">✅</span>
                  <p className="text-sm font-medium">All payments reconciled. No discrepancies found.</p>
                </div>
              )}
            </div>
          )}
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
