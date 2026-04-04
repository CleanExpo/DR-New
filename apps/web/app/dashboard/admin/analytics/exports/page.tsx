'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ExportRecord {
  id: string;
  name: string;
  format: 'CSV' | 'Excel' | 'PDF';
  dateGenerated: string;
  fileUrl: string;
  size: string;
}

interface ScheduledReport {
  id: string;
  name: string;
  reportType: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  recipients: string[];
  enabled: boolean;
  lastRun: string | null;
  nextRun: string;
}

const AVAILABLE_REPORTS = [
  { value: 'financial', label: 'Financial Report', description: 'Revenue, fees, and payouts' },
  { value: 'operational', label: 'Operational Report', description: 'Jobs, completion rates, metrics' },
  { value: 'revenue', label: 'Revenue Analysis', description: 'Detailed revenue breakdown' },
  { value: 'contractors', label: 'Contractor Performance', description: 'Contractor stats and earnings' },
  { value: 'clients', label: 'Client Activity', description: 'Client spending and jobs' },
  { value: 'payments', label: 'Payment Transactions', description: 'All payment activities' },
];

export default function AnalyticsExportsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Report generation form state
  const [reportType, setReportType] = useState('financial');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState<'CSV' | 'Excel' | 'PDF'>('CSV');
  const [generating, setGenerating] = useState(false);

  // Recent exports state
  const [recentExports, setRecentExports] = useState<ExportRecord[]>([]);
  const [loadingExports, setLoadingExports] = useState(false);

  // Scheduled reports state
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([]);
  const [loadingScheduled, setLoadingScheduled] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  // New scheduled report form
  const [newScheduleName, setNewScheduleName] = useState('');
  const [newScheduleType, setNewScheduleType] = useState('financial');
  const [newScheduleFrequency, setNewScheduleFrequency] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Quarterly'>('Monthly');
  const [newScheduleRecipients, setNewScheduleRecipients] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'ADMIN') {
        router.push('/dashboard');
      } else {
        setLoading(false);
        fetchRecentExports();
        fetchScheduledReports();
        // Set default date range (last 30 days)
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        setEndDate(end.toISOString().split('T')[0]);
        setStartDate(start.toISOString().split('T')[0]);
      }
    }
  }, [status, session, router]);

  const fetchRecentExports = async () => {
    try {
      setLoadingExports(true);
      // Mock data for now - replace with actual API call
      setTimeout(() => {
        setRecentExports([
          {
            id: '1',
            name: 'Financial Report - December 2025',
            format: 'Excel',
            dateGenerated: new Date().toISOString(),
            fileUrl: '/exports/financial-dec-2025.xlsx',
            size: '2.4 MB',
          },
          {
            id: '2',
            name: 'Operational Report - Q4 2025',
            format: 'PDF',
            dateGenerated: new Date(Date.now() - 86400000 * 2).toISOString(),
            fileUrl: '/exports/operational-q4-2025.pdf',
            size: '1.8 MB',
          },
          {
            id: '3',
            name: 'Contractor Performance - November 2025',
            format: 'CSV',
            dateGenerated: new Date(Date.now() - 86400000 * 7).toISOString(),
            fileUrl: '/exports/contractors-nov-2025.csv',
            size: '856 KB',
          },
        ]);
        setLoadingExports(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching exports:', err);
      setLoadingExports(false);
    }
  };

  const fetchScheduledReports = async () => {
    try {
      setLoadingScheduled(true);
      // Mock data for now - replace with actual API call
      setTimeout(() => {
        setScheduledReports([
          {
            id: '1',
            name: 'Monthly Financial Summary',
            reportType: 'financial',
            frequency: 'Monthly',
            recipients: ['admin@disasterrecovery.com.au', 'finance@disasterrecovery.com.au'],
            enabled: true,
            lastRun: new Date(Date.now() - 86400000 * 7).toISOString(),
            nextRun: new Date(Date.now() + 86400000 * 23).toISOString(),
          },
          {
            id: '2',
            name: 'Weekly Operational Metrics',
            reportType: 'operational',
            frequency: 'Weekly',
            recipients: ['admin@disasterrecovery.com.au', 'ops@disasterrecovery.com.au'],
            enabled: true,
            lastRun: new Date(Date.now() - 86400000 * 3).toISOString(),
            nextRun: new Date(Date.now() + 86400000 * 4).toISOString(),
          },
          {
            id: '3',
            name: 'Quarterly Revenue Analysis',
            reportType: 'revenue',
            frequency: 'Quarterly',
            recipients: ['admin@disasterrecovery.com.au'],
            enabled: false,
            lastRun: new Date(Date.now() - 86400000 * 90).toISOString(),
            nextRun: new Date(Date.now() + 86400000 * 5).toISOString(),
          },
        ]);
        setLoadingScheduled(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching scheduled reports:', err);
      setLoadingScheduled(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date must be before end date');
      return;
    }

    try {
      setGenerating(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/admin/analytics/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportType,
          startDate,
          endDate,
          format,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate report');
      }

      const data = await response.json();

      if (data.fileUrl) {
        // Download the file
        window.open(data.fileUrl, '_blank');
        setSuccess('Report generated successfully and download started');
      } else {
        setSuccess('Report generation started. You will receive an email when it is ready.');
      }

      // Refresh the recent exports list
      fetchRecentExports();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
      console.error('Error generating report:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleScheduledReport = async (id: string, enabled: boolean) => {
    try {
      // Mock API call - replace with actual implementation
      setScheduledReports((prev) =>
        prev.map((report) => (report.id === id ? { ...report, enabled } : report))
      );
      setSuccess(`Report ${enabled ? 'enabled' : 'disabled'} successfully`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update scheduled report');
    }
  };

  const handleDeleteScheduledReport = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scheduled report?')) {
      return;
    }

    try {
      // Mock API call - replace with actual implementation
      setScheduledReports((prev) => prev.filter((report) => report.id !== id));
      setSuccess('Scheduled report deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete scheduled report');
    }
  };

  const handleCreateScheduledReport = async () => {
    if (!newScheduleName || !newScheduleRecipients) {
      setError('Please fill in all required fields');
      return;
    }

    const recipients = newScheduleRecipients.split(',').map((email) => email.trim());

    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = recipients.filter((email) => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      setError(`Invalid email addresses: ${invalidEmails.join(', ')}`);
      return;
    }

    try {
      // Mock API call - replace with actual implementation
      const newReport: ScheduledReport = {
        id: String(Date.now()),
        name: newScheduleName,
        reportType: newScheduleType,
        frequency: newScheduleFrequency,
        recipients,
        enabled: true,
        lastRun: null,
        nextRun: new Date(Date.now() + 86400000).toISOString(),
      };

      setScheduledReports((prev) => [...prev, newReport]);
      setSuccess('Scheduled report created successfully');
      setTimeout(() => setSuccess(null), 3000);

      // Reset form
      setNewScheduleName('');
      setNewScheduleType('financial');
      setNewScheduleFrequency('Monthly');
      setNewScheduleRecipients('');
      setShowScheduleForm(false);
    } catch (err) {
      setError('Failed to create scheduled report');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading exports dashboard...</p>
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
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
          >
            ← Back to Analytics
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Export Reports</h1>
          <p className="text-gray-400 mt-2">Generate and download analytics reports</p>
        </div>

        {/* Error/Success Alerts */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
            <p className="font-medium">Success</p>
            <p className="text-sm">{success}</p>
          </div>
        )}

        {/* Available Reports Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AVAILABLE_REPORTS.map((report) => (
              <div
                key={report.value}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">{report.label}</h3>
                <p className="text-sm text-gray-400 mt-1">{report.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report Generation Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Report Type */}
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {AVAILABLE_REPORTS.map((report) => (
                  <option key={report.value} value={report.value}>
                    {report.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Format */}
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value as 'CSV' | 'Excel' | 'PDF')}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="CSV">CSV</option>
                <option value="Excel">Excel (.xlsx)</option>
                <option value="PDF">PDF</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              {generating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        </div>

        {/* Recent Exports */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Exports</h2>
          {loadingExports ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-400 text-sm">Loading exports...</p>
            </div>
          ) : recentExports.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No recent exports found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Export Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Format
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentExports.map((exportRecord) => (
                    <tr key={exportRecord.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {exportRecord.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {exportRecord.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {exportRecord.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(exportRecord.dateGenerated)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => window.open(exportRecord.fileUrl, '_blank')}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Scheduled Reports</h2>
            <button
              onClick={() => setShowScheduleForm(!showScheduleForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
            >
              {showScheduleForm ? 'Cancel' : '+ Add Scheduled Report'}
            </button>
          </div>

          {/* Add New Scheduled Report Form */}
          {showScheduleForm && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">New Scheduled Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Name
                  </label>
                  <input
                    type="text"
                    value={newScheduleName}
                    onChange={(e) => setNewScheduleName(e.target.value)}
                    placeholder="e.g., Monthly Financial Summary"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type
                  </label>
                  <select
                    value={newScheduleType}
                    onChange={(e) => setNewScheduleType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {AVAILABLE_REPORTS.map((report) => (
                      <option key={report.value} value={report.value}>
                        {report.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select
                    value={newScheduleFrequency}
                    onChange={(e) => setNewScheduleFrequency(e.target.value as 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients (comma-separated emails)
                  </label>
                  <input
                    type="text"
                    value={newScheduleRecipients}
                    onChange={(e) => setNewScheduleRecipients(e.target.value)}
                    placeholder="admin@example.com, finance@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCreateScheduledReport}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Create Scheduled Report
                </button>
              </div>
            </div>
          )}

          {/* Scheduled Reports Table */}
          {loadingScheduled ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-400 text-sm">Loading scheduled reports...</p>
            </div>
          ) : scheduledReports.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No scheduled reports configured</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Next Run
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scheduledReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {AVAILABLE_REPORTS.find((r) => r.value === report.reportType)?.label || report.reportType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {report.frequency}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        <div className="max-w-xs">
                          {report.recipients.length === 1 ? (
                            report.recipients[0]
                          ) : (
                            <details className="cursor-pointer">
                              <summary className="text-blue-600 hover:text-blue-700">
                                {report.recipients.length} recipients
                              </summary>
                              <ul className="mt-2 space-y-1 text-xs">
                                {report.recipients.map((recipient, idx) => (
                                  <li key={idx}>{recipient}</li>
                                ))}
                              </ul>
                            </details>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(report.nextRun).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleToggleScheduledReport(report.id, !report.enabled)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.enabled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {report.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button
                          onClick={() => handleToggleScheduledReport(report.id, !report.enabled)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {report.enabled ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => handleDeleteScheduledReport(report.id)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
