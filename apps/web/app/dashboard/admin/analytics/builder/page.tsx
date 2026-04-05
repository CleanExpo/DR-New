'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  metrics: string[];
  visualization: string;
  filters: Record<string, unknown>;
}

interface SavedReport {
  id: string;
  name: string;
  metrics: string[];
  visualization: string;
  filters: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface BuilderData {
  success: boolean;
  templates: ReportTemplate[];
  savedReports: SavedReport[];
  availableMetrics: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  availableFilters: Array<{
    field: string;
    label: string;
    type: string;
    operators: string[];
  }>;
}

interface ReportFilter {
  field: string;
  operator: string;
  value: string;
}

export default function ReportBuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BuilderData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [reportName, setReportName] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [visualization, setVisualization] = useState('table');
  const [filters, setFilters] = useState<ReportFilter[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'ADMIN') {
        router.push('/dashboard');
      } else {
        fetchBuilderData();
      }
    }
  }, [status, session, router]);

  const fetchBuilderData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/analytics/builder');

      if (!response.ok) {
        throw new Error('Failed to fetch builder data');
      }

      const builderData = await response.json();
      setData(builderData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching builder data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricId)
        ? prev.filter((id) => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleAddFilter = () => {
    if (data?.availableFilters && data.availableFilters.length > 0) {
      const firstFilter = data.availableFilters[0];
      setFilters((prev) => [
        ...prev,
        {
          field: firstFilter.field,
          operator: firstFilter.operators[0],
          value: '',
        },
      ]);
    }
  };

  const handleRemoveFilter = (index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFilterChange = (
    index: number,
    field: keyof ReportFilter,
    value: string
  ) => {
    setFilters((prev) =>
      prev.map((filter, i) => (i === index ? { ...filter, [field]: value } : filter))
    );
  };

  const handleCreateReport = async () => {
    if (!reportName.trim() || selectedMetrics.length === 0) {
      alert('Please enter a report name and select at least one metric');
      return;
    }

    try {
      setSaving(true);
      const response = await fetch('/api/admin/analytics/builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: reportName,
          metrics: selectedMetrics,
          visualization,
          filters,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create report');
      }

      // Reset form and refresh data
      setReportName('');
      setSelectedMetrics([]);
      setVisualization('table');
      setFilters([]);
      await fetchBuilderData();
      alert('Report created successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create report');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/analytics/builder?id=${reportId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }

      await fetchBuilderData();
      alert('Report deleted successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete report');
    }
  };

  const handleUseTemplate = (template: ReportTemplate) => {
    setReportName(template.name);
    setSelectedMetrics(template.metrics);
    setVisualization(template.visualization);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading report builder...</p>
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
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Custom Report Builder</h1>
          <p className="text-gray-400 mt-2">
            Create custom analytics reports with your chosen metrics and visualisations
          </p>
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
            {/* Report Templates */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Report Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.templates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{template.metrics.length} metrics</span>
                      <span className="capitalize">{template.visualization}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Creation Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Report</h2>

              {/* Report Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Name
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g., Monthly Revenue Summary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Metrics Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Metrics
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.availableMetrics.map((metric) => (
                    <label
                      key={metric.id}
                      className="flex items-start space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric.id)}
                        onChange={() => handleMetricToggle(metric.id)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                        <p className="text-xs text-gray-400">{metric.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Visualization Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visualisation Type
                </label>
                <select
                  value={visualization}
                  onChange={(e) => setVisualization(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="table">Table</option>
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>

              {/* Filters */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Filters</label>
                  <button
                    onClick={handleAddFilter}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Filter
                  </button>
                </div>

                {filters.length > 0 ? (
                  <div className="space-y-3">
                    {filters.map((filter, index) => {
                      const filterConfig = data.availableFilters.find(
                        (f) => f.field === filter.field
                      );

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg"
                        >
                          <select
                            value={filter.field}
                            onChange={(e) =>
                              handleFilterChange(index, 'field', e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                          >
                            {data.availableFilters.map((f) => (
                              <option key={f.field} value={f.field}>
                                {f.label}
                              </option>
                            ))}
                          </select>

                          <select
                            value={filter.operator}
                            onChange={(e) =>
                              handleFilterChange(index, 'operator', e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                          >
                            {filterConfig?.operators.map((op) => (
                              <option key={op} value={op}>
                                {op}
                              </option>
                            ))}
                          </select>

                          <input
                            type={filterConfig?.type === 'number' ? 'number' : 'text'}
                            value={filter.value}
                            onChange={(e) =>
                              handleFilterChange(index, 'value', e.target.value)
                            }
                            placeholder="Value"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                          />

                          <button
                            onClick={() => handleRemoveFilter(index)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm px-3"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No filters added. Click &quot;Add Filter&quot; to add one.
                  </p>
                )}
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreateReport}
                disabled={saving || !reportName.trim() || selectedMetrics.length === 0}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Creating Report...' : 'Create Report'}
              </button>
            </div>

            {/* Saved Reports */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Saved Reports</h2>

              {data.savedReports.length > 0 ? (
                <div className="space-y-3">
                  {data.savedReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{report.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                          <span>{report.metrics.length} metrics</span>
                          <span className="capitalize">{report.visualization}</span>
                          <span>
                            Created {new Date(report.createdAt).toLocaleDateString('en-AU')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/dashboard/admin/analytics/reports/${report.id}`)}
                          className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => handleUseTemplate(report as any)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  No saved reports yet. Create your first report above!
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
