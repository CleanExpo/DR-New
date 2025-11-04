'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRangePicker } from '@/components/analytics/DateRangePicker';
import {
  FileText,
  Download,
  Calendar,
  Settings,
  Trash2,
  FileSpreadsheet,
  FilePdf,
  FileJson,
} from 'lucide-react';
import { formatActivityTime } from '@/lib/analytics-utils';

interface Report {
  id: string;
  name: string;
  template: string;
  createdAt: Date;
  format: 'PDF' | 'CSV' | 'EXCEL' | 'JSON';
  size: string;
  downloadUrl: string;
}

const reportTemplates = [
  {
    value: 'monthly-summary',
    label: 'Monthly Business Summary',
    description: 'Comprehensive overview of monthly performance including revenue, jobs, and contractor metrics',
  },
  {
    value: 'contractor-performance',
    label: 'Contractor Performance Report',
    description: 'Detailed analysis of contractor performance, ratings, and job completion rates',
  },
  {
    value: 'financial-statement',
    label: 'Financial Statement',
    description: 'Complete financial breakdown including revenue, expenses, and profit margins',
  },
  {
    value: 'tax-report',
    label: 'Tax Report (GST)',
    description: 'GST breakdown and tax-related financial data for accounting purposes',
  },
  {
    value: 'client-activity',
    label: 'Client Activity Report',
    description: 'Client engagement metrics, job requests, and satisfaction scores',
  },
  {
    value: 'compliance',
    label: 'Compliance Report',
    description: 'IICRC certification status, insurance compliance, and regulatory requirements',
  },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'CSV' | 'EXCEL' | 'JSON'>('PDF');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>();
  const [filters, setFilters] = useState({
    contractor: '',
    serviceType: '',
    status: '',
  });

  // Mock saved reports
  const [savedReports, setSavedReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Monthly Business Summary - January 2024',
      template: 'monthly-summary',
      createdAt: new Date('2024-01-31'),
      format: 'PDF',
      size: '2.4 MB',
      downloadUrl: '#',
    },
    {
      id: '2',
      name: 'Contractor Performance Report - Q4 2023',
      template: 'contractor-performance',
      createdAt: new Date('2024-01-15'),
      format: 'EXCEL',
      size: '1.8 MB',
      downloadUrl: '#',
    },
    {
      id: '3',
      name: 'Financial Statement - December 2023',
      template: 'financial-statement',
      createdAt: new Date('2024-01-05'),
      format: 'PDF',
      size: '3.1 MB',
      downloadUrl: '#',
    },
    {
      id: '4',
      name: 'Tax Report (GST) - 2023 Full Year',
      template: 'tax-report',
      createdAt: new Date('2024-01-02'),
      format: 'CSV',
      size: '856 KB',
      downloadUrl: '#',
    },
  ]);

  const handleGenerateReport = async () => {
    if (!selectedTemplate) {
      alert('Please select a report template');
      return;
    }

    setLoading(true);

    // Simulate report generation
    setTimeout(() => {
      const template = reportTemplates.find(t => t.value === selectedTemplate);
      const newReport: Report = {
        id: Date.now().toString(),
        name: `${template?.label} - ${new Date().toLocaleDateString('en-AU')}`,
        template: selectedTemplate,
        createdAt: new Date(),
        format: selectedFormat,
        size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
        downloadUrl: '#',
      };

      setSavedReports([newReport, ...savedReports]);
      setLoading(false);
      alert('Report generated successfully!');
    }, 2000);
  };

  const handleDeleteReport = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setSavedReports(savedReports.filter(r => r.id !== reportId));
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return <FilePdf className="h-5 w-5 text-red-600" />;
      case 'EXCEL':
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case 'CSV':
        return <FileSpreadsheet className="h-5 w-5 text-blue-600" />;
      case 'JSON':
        return <FileJson className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const selectedTemplateInfo = reportTemplates.find(t => t.value === selectedTemplate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Generate and download comprehensive business reports
        </p>
      </div>

      {/* Report Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Generate New Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Report Template *
            </label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a report template" />
              </SelectTrigger>
              <SelectContent>
                {reportTemplates.map((template) => (
                  <SelectItem key={template.value} value={template.value}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTemplateInfo && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {selectedTemplateInfo.description}
              </p>
            )}
          </div>

          {/* Date Range */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Date Range *
            </label>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Contractor (Optional)
              </label>
              <Select
                value={filters.contractor}
                onValueChange={(value) => setFilters({ ...filters, contractor: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All contractors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contractors</SelectItem>
                  <SelectItem value="1">John Smith</SelectItem>
                  <SelectItem value="2">Sarah Johnson</SelectItem>
                  <SelectItem value="3">Mike Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Service Type (Optional)
              </label>
              <Select
                value={filters.serviceType}
                onValueChange={(value) => setFilters({ ...filters, serviceType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All service types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Service Types</SelectItem>
                  <SelectItem value="WATER_DAMAGE">Water Damage</SelectItem>
                  <SelectItem value="FIRE_RESTORATION">Fire Restoration</SelectItem>
                  <SelectItem value="MOULD_REMEDIATION">Mould Remediation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Status (Optional)
              </label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Export Format
            </label>
            <div className="flex gap-3">
              {['PDF', 'CSV', 'EXCEL', 'JSON'].map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    selectedFormat === format
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {getFormatIcon(format)}
                  <span className="text-sm font-medium">{format}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleGenerateReport}
              disabled={loading || !selectedTemplate}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Saved Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedReports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No saved reports yet. Generate your first report above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getFormatIcon(report.format)}
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {report.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatActivityTime(report.createdAt)}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span>{report.format}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(report.downloadUrl, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteReport(report.id)}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
