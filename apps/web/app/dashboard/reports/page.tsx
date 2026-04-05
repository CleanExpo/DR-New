'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  DollarSign,
  Clock,
  FileText,
  Briefcase,
  Download,
  Loader2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import jsPDF from 'jspdf';

// ============================================================================
// Types
// ============================================================================

interface ReportSummary {
  totalJobs: number;
  avgCompletionDays: number;
  totalRevenue: number;
  outstandingAmount: number;
}

interface RevenueMonth {
  month: string;
  revenue: number;
}

interface OutstandingInvoice {
  id: string;
  jobNumber: string;
  property: string;
  amount: number;
  daysOutstanding: number;
}

interface ContractorPerformance {
  id: string;
  businessName: string;
  jobsCompleted: number;
  avgCompletionDays: number;
  totalRevenue: number;
  avgRating: number;
}

interface ReportData {
  summary: ReportSummary;
  jobsByStatus: Record<string, number>;
  revenueByMonth: RevenueMonth[];
  outstandingInvoices: OutstandingInvoice[];
  contractorPerformance: ContractorPerformance[];
}

// ============================================================================
// Constants
// ============================================================================

const STATUS_COLOURS: Record<string, string> = {
  PENDING: '#FFB800',
  ASSIGNED: '#00F5FF',
  IN_PROGRESS: '#0d9488',
  COMPLETED: '#00FF88',
  INVOICED: '#FF00FF',
  PAID: '#00F5FF',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  INVOICED: 'Invoiced',
  PAID: 'Paid',
};

const formatAUD = (value: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);

// ============================================================================
// Component
// ============================================================================

export default function ReportsPage() {
  const router = useRouter();
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/reports');
      if (res.status === 401 || res.status === 403) {
        router.push('/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to load report data');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  // PDF export
  const handleExportPDF = async () => {
    if (!data) return;
    setExporting(true);

    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      let y = 20;

      // Header
      doc.setFillColor(5, 5, 5);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(13, 148, 136);
      doc.setFontSize(22);
      doc.text('NRPG Management Report', 14, 18);
      doc.setFontSize(10);
      doc.setTextColor(156, 163, 175);
      doc.text(`Generated: ${formatDate(new Date())}`, 14, 26);
      doc.text('Disaster Recovery - NRPG Platform', 14, 32);

      y = 50;

      // Summary
      doc.setTextColor(13, 148, 136);
      doc.setFontSize(14);
      doc.text('Summary', 14, y);
      y += 8;

      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      const summaryLines = [
        `Total Jobs: ${data.summary.totalJobs}`,
        `Average Completion: ${data.summary.avgCompletionDays} days`,
        `Total Revenue: ${formatAUD(data.summary.totalRevenue)}`,
        `Outstanding: ${formatAUD(data.summary.outstandingAmount)}`,
      ];
      for (const line of summaryLines) {
        doc.text(line, 14, y);
        y += 6;
      }

      y += 6;

      // Jobs by status
      doc.setTextColor(13, 148, 136);
      doc.setFontSize(14);
      doc.text('Jobs by Status', 14, y);
      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const statusOrder = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'INVOICED', 'PAID'];
      for (const status of statusOrder) {
        const count = data.jobsByStatus[status] || 0;
        doc.text(`${STATUS_LABELS[status]}: ${count}`, 14, y);
        y += 6;
      }

      y += 6;

      // Revenue by month
      doc.setTextColor(13, 148, 136);
      doc.setFontSize(14);
      doc.text('Revenue by Month (Last 6 Months)', 14, y);
      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      for (const m of data.revenueByMonth) {
        doc.text(`${m.month}: ${formatAUD(m.revenue)}`, 14, y);
        y += 6;
      }

      y += 6;

      // Contractor performance
      if (data.contractorPerformance.length > 0) {
        if (y > 230) { doc.addPage(); y = 20; }

        doc.setTextColor(13, 148, 136);
        doc.setFontSize(14);
        doc.text('Contractor Performance', 14, y);
        y += 8;

        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('Business Name', 14, y);
        doc.text('Jobs', 90, y);
        doc.text('Avg Days', 110, y);
        doc.text('Revenue', 140, y);
        doc.text('Rating', 175, y);
        y += 2;
        doc.setDrawColor(200, 200, 200);
        doc.line(14, y, pageWidth - 14, y);
        y += 5;

        doc.setTextColor(60, 60, 60);
        for (const c of data.contractorPerformance) {
          if (y > 270) { doc.addPage(); y = 20; }
          const name = c.businessName.length > 30 ? c.businessName.substring(0, 30) + '...' : c.businessName;
          doc.text(name, 14, y);
          doc.text(String(c.jobsCompleted), 90, y);
          doc.text(String(c.avgCompletionDays), 110, y);
          doc.text(formatAUD(c.totalRevenue), 140, y);
          doc.text(c.avgRating > 0 ? c.avgRating.toFixed(1) : '-', 175, y);
          y += 6;
        }
      }

      y += 6;

      // Outstanding invoices
      if (data.outstandingInvoices.length > 0) {
        if (y > 230) { doc.addPage(); y = 20; }

        doc.setTextColor(13, 148, 136);
        doc.setFontSize(14);
        doc.text('Outstanding Invoices', 14, y);
        y += 8;

        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('Job #', 14, y);
        doc.text('Property', 50, y);
        doc.text('Amount', 140, y);
        doc.text('Days', 175, y);
        y += 2;
        doc.line(14, y, pageWidth - 14, y);
        y += 5;

        doc.setTextColor(60, 60, 60);
        for (const inv of data.outstandingInvoices) {
          if (y > 270) { doc.addPage(); y = 20; }
          doc.text(inv.jobNumber, 14, y);
          const prop = inv.property.length > 35 ? inv.property.substring(0, 35) + '...' : inv.property;
          doc.text(prop, 50, y);
          doc.text(formatAUD(inv.amount), 140, y);
          doc.text(String(inv.daysOutstanding), 175, y);
          y += 6;
        }
      }

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175);
        doc.text(
          `NRPG Management Report  |  Page ${i} of ${totalPages}  |  Confidential`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }

      doc.save(`NRPG-Report-${formatDate(new Date()).replace(/\//g, '-')}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      setError('PDF export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#050505' }}>
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#0d9488' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4" style={{ backgroundColor: '#050505' }}>
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-gray-400">{error}</p>
        <button
          onClick={fetchReport}
          className="rounded-sm px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#0d9488' }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const statusChartData = Object.entries(data.jobsByStatus).map(([status, count]) => ({
    name: STATUS_LABELS[status] || status,
    count,
    fill: STATUS_COLOURS[status] || '#0d9488',
  }));

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8" style={{ backgroundColor: '#050505' }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Management Reports</h1>
            <p className="mt-1 text-sm text-gray-400">
              Job completion, revenue &amp; contractor performance
            </p>
          </div>
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#0d9488' }}
          >
            {exporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Export PDF
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<Briefcase className="h-5 w-5" />}
            label="Total Jobs"
            value={String(data.summary.totalJobs)}
            colour="#00F5FF"
          />
          <SummaryCard
            icon={<Clock className="h-5 w-5" />}
            label="Avg Completion"
            value={`${data.summary.avgCompletionDays} days`}
            colour="#00FF88"
          />
          <SummaryCard
            icon={<DollarSign className="h-5 w-5" />}
            label="Total Revenue"
            value={formatAUD(data.summary.totalRevenue)}
            colour="#0d9488"
          />
          <SummaryCard
            icon={<FileText className="h-5 w-5" />}
            label="Outstanding"
            value={formatAUD(data.summary.outstandingAmount)}
            colour="#FFB800"
          />
        </div>

        {/* Charts Row */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Jobs by Status */}
          <div className="rounded-sm border border-gray-800 p-6" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" style={{ color: '#0d9488' }} />
              <h2 className="text-lg font-semibold text-white">Jobs by Status</h2>
            </div>
            {statusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={statusChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '4px' }}
                    labelStyle={{ color: '#e5e7eb' }}
                    itemStyle={{ color: '#0d9488' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {statusChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-16 text-center text-sm text-gray-400">No job data available</p>
            )}
          </div>

          {/* Revenue by Month */}
          <div className="rounded-sm border border-gray-800 p-6" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" style={{ color: '#0d9488' }} />
              <h2 className="text-lg font-semibold text-white">Revenue (Last 6 Months)</h2>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.revenueByMonth} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '4px' }}
                  labelStyle={{ color: '#e5e7eb' }}
                  formatter={(value: number) => [formatAUD(value), 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contractor Performance Table */}
        <div className="mb-8 rounded-sm border border-gray-800 p-6" style={{ backgroundColor: '#0a0a0a' }}>
          <h2 className="mb-4 text-lg font-semibold text-white">Contractor Performance</h2>
          {data.contractorPerformance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="pb-3 pr-4 font-medium">Business Name</th>
                    <th className="pb-3 pr-4 font-medium text-right">Jobs</th>
                    <th className="pb-3 pr-4 font-medium text-right">Avg Days</th>
                    <th className="pb-3 pr-4 font-medium text-right">Revenue</th>
                    <th className="pb-3 font-medium text-right">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {data.contractorPerformance.map((c) => (
                    <tr key={c.id} className="border-b border-gray-800/50 text-gray-300">
                      <td className="py-3 pr-4 font-medium text-white">{c.businessName}</td>
                      <td className="py-3 pr-4 text-right">{c.jobsCompleted}</td>
                      <td className="py-3 pr-4 text-right">{c.avgCompletionDays}</td>
                      <td className="py-3 pr-4 text-right" style={{ color: '#00FF88' }}>
                        {formatAUD(c.totalRevenue)}
                      </td>
                      <td className="py-3 text-right" style={{ color: '#FFB800' }}>
                        {c.avgRating > 0 ? c.avgRating.toFixed(1) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">No contractor data available</p>
          )}
        </div>

        {/* Outstanding Invoices Table */}
        <div className="rounded-sm border border-gray-800 p-6" style={{ backgroundColor: '#0a0a0a' }}>
          <h2 className="mb-4 text-lg font-semibold text-white">Outstanding Invoices</h2>
          {data.outstandingInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="pb-3 pr-4 font-medium">Job #</th>
                    <th className="pb-3 pr-4 font-medium">Property</th>
                    <th className="pb-3 pr-4 font-medium text-right">Amount</th>
                    <th className="pb-3 font-medium text-right">Days Outstanding</th>
                  </tr>
                </thead>
                <tbody>
                  {data.outstandingInvoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-gray-800/50 text-gray-300">
                      <td className="py-3 pr-4 font-mono text-sm" style={{ color: '#00F5FF' }}>
                        {inv.jobNumber}
                      </td>
                      <td className="py-3 pr-4">{inv.property}</td>
                      <td className="py-3 pr-4 text-right">{formatAUD(inv.amount)}</td>
                      <td className="py-3 text-right">
                        <span
                          className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: inv.daysOutstanding > 30 ? 'rgba(255, 68, 68, 0.15)' : 'rgba(255, 184, 0, 0.15)',
                            color: inv.daysOutstanding > 30 ? '#FF4444' : '#FFB800',
                          }}
                        >
                          {inv.daysOutstanding}d
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">No outstanding invoices</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function SummaryCard({
  icon,
  label,
  value,
  colour,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  colour: string;
}) {
  return (
    <div
      className="rounded-sm border border-gray-800 p-5"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span style={{ color: colour }}>{icon}</span>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

