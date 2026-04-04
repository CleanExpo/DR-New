'use client';

import { useEffect, useState } from 'react';

interface XeroData {
  connected: boolean;
  profitAndLoss?: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    period: { from: string; to: string };
  } | null;
  invoiceSummary?: {
    total: number;
    totalOutstanding: number;
    byStatus: Record<string, { count: number; amount: number }>;
  } | null;
  overdue?: {
    count: number;
    totalAmount: number;
  } | null;
}

/**
 * Xero Accounting Widget for the Admin Financial Dashboard.
 *
 * Displays: revenue this month, outstanding invoices count + total,
 * overdue alerts. Teal (#0d9488) for positive values, red (#FF4444) for overdue.
 */
export default function XeroWidget() {
  const [data, setData] = useState<XeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchXeroData();
  }, []);

  const fetchXeroData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [financialsRes, invoicesRes, overdueRes] = await Promise.allSettled([
        fetch('/api/xero/financials'),
        fetch('/api/xero/invoices?status=AUTHORISED'),
        fetch('/api/xero/overdue'),
      ]);

      // Check if Xero is connected
      const financials = financialsRes.status === 'fulfilled' ? await financialsRes.value.json() : null;

      if (financials && !financials.connected && financials.error === 'Xero not connected') {
        setData({ connected: false });
        return;
      }

      const invoices = invoicesRes.status === 'fulfilled' ? await invoicesRes.value.json() : null;
      const overdue = overdueRes.status === 'fulfilled' ? await overdueRes.value.json() : null;

      setData({
        connected: true,
        profitAndLoss: financials?.profitAndLoss || null,
        invoiceSummary: invoices?.summary || null,
        overdue: overdue?.overdue || null,
      });
    } catch (err) {
      console.error('XeroWidget fetch error:', err);
      setError('Failed to load Xero data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-7 bg-gray-200 rounded w-28 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Xero Accounting</h3>
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={fetchXeroData}
          className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  // Not connected state
  if (!data?.connected) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-300">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Xero Accounting</h3>
        <p className="text-sm text-gray-400 mb-4">
          Connect your Xero account to view financial data from your organisation.
        </p>
        <a
          href="/api/xero/auth"
          className="inline-flex items-center px-4 py-2 bg-[#13B5EA] text-white text-sm font-medium rounded-md hover:bg-[#0d9fce] transition-colours"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.29 7.27L6.77 12l-3.48 4.73c-.35.47-.35 1.1 0 1.57.35.47.97.47 1.32 0L8.29 13.4l3.68 4.9c.35.47.97.47 1.32 0 .35-.47.35-1.1 0-1.57L9.81 12l3.48-4.73c.35-.47.35-1.1 0-1.57-.35-.47-.97-.47-1.32 0L8.29 10.6 4.61 5.7c-.35-.47-.97-.47-1.32 0-.35.47-.35 1.1 0 1.57zm10.42 0L17.19 12l-3.48 4.73c-.35.47-.35 1.1 0 1.57.35.47.97.47 1.32 0l3.68-4.9 3.68 4.9c.35.47.97.47 1.32 0 .35-.47.35-1.1 0-1.57L20.23 12l3.48-4.73c.35-.47.35-1.1 0-1.57-.35-.47-.97-.47-1.32 0l-3.68 4.9-3.68-4.9c-.35-.47-.97-.47-1.32 0-.35.47-.35 1.1 0 1.57z" />
          </svg>
          Connect to Xero
        </a>
      </div>
    );
  }

  // Connected — show financial data
  const hasOverdue = data.overdue && data.overdue.count > 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">Xero Accounting</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            Connected
          </span>
        </div>
        <button
          onClick={fetchXeroData}
          className="text-sm text-gray-400 hover:text-gray-700"
          title="Refresh Xero data"
        >
          Refresh
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Revenue This Month */}
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Revenue This Month
          </p>
          <p className="mt-1 text-2xl font-bold" style={{ color: '#0d9488' }}>
            {data.profitAndLoss
              ? formatCurrency(data.profitAndLoss.totalIncome)
              : '--'}
          </p>
        </div>

        {/* Net Profit */}
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Net Profit
          </p>
          <p
            className="mt-1 text-2xl font-bold"
            style={{
              color: data.profitAndLoss && data.profitAndLoss.netProfit >= 0
                ? '#0d9488'
                : '#FF4444',
            }}
          >
            {data.profitAndLoss
              ? formatCurrency(data.profitAndLoss.netProfit)
              : '--'}
          </p>
        </div>

        {/* Outstanding Invoices */}
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Outstanding Invoices
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {data.invoiceSummary ? data.invoiceSummary.total : '--'}
          </p>
          <p className="text-xs text-gray-400">
            {data.invoiceSummary
              ? formatCurrency(data.invoiceSummary.totalOutstanding)
              : ''}
          </p>
        </div>

        {/* Overdue Invoices */}
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Overdue
          </p>
          <p
            className="mt-1 text-2xl font-bold"
            style={{ color: hasOverdue ? '#FF4444' : '#0d9488' }}
          >
            {data.overdue ? data.overdue.count : '0'}
          </p>
          {hasOverdue && (
            <p className="text-xs" style={{ color: '#FF4444' }}>
              {formatCurrency(data.overdue!.totalAmount)} overdue
            </p>
          )}
        </div>
      </div>

      {/* Overdue Alert Banner */}
      {hasOverdue && (
        <div
          className="mt-2 p-3 rounded-md"
          style={{ backgroundColor: '#FFF5F5', borderLeft: '3px solid #FF4444' }}
        >
          <p className="text-sm font-medium" style={{ color: '#FF4444' }}>
            {data.overdue!.count} overdue invoice{data.overdue!.count !== 1 ? 's' : ''} totalling{' '}
            {formatCurrency(data.overdue!.totalAmount)}
          </p>
          <a
            href="/dashboard/admin/financials"
            className="text-xs text-gray-400 hover:text-gray-800 mt-1 inline-block"
          >
            View details
          </a>
        </div>
      )}

      {/* Disconnect link */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Data sourced from Xero.{' '}
          <button
            onClick={async () => {
              if (confirm('Disconnect Xero integration? You can reconnect at any time.')) {
                await fetch('/api/xero/disconnect', { method: 'POST' });
                setData({ connected: false });
              }
            }}
            className="text-gray-400 hover:text-red-500 underline"
          >
            Disconnect
          </button>
        </p>
      </div>
    </div>
  );
}
