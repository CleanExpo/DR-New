/**
 * Export Generator
 * Generates CSV, Excel, and PDF exports of analytics data
 */

export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  filename: string;
  includeTimestamp: boolean;
  sheetName?: string;
}

/**
 * Convert object array to CSV string
 */
export function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV header row
  const csvHeaders = headers.map((h) => `"${h}"`).join(',');

  // Create CSV data rows
  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        // Escape quotes and wrap in quotes
        const escaped = String(value).replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(',')
  );

  return [csvHeaders, ...csvRows].join('\n');
}

/**
 * Format currency for export
 */
export function formatCurrency(value: number): string {
  return `$${value.toLocaleString('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format date for export
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-AU');
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

/**
 * Generate CSV export from analytics data
 */
export function generateCSVExport(data: any[], options: ExportOptions): string {
  const csv = convertToCSV(data);
  const filename = options.includeTimestamp
    ? `${options.filename}-${new Date().toISOString().slice(0, 10)}.csv`
    : `${options.filename}.csv`;

  return csv;
}

/**
 * Generate Excel export (simplified - returns CSV format for now)
 * In production, use a library like xlsx or exceljs
 */
export function generateExcelExport(data: any[], options: ExportOptions): string {
  const csv = convertToCSV(data);
  const filename = options.includeTimestamp
    ? `${options.filename}-${new Date().toISOString().slice(0, 10)}.xlsx`
    : `${options.filename}.xlsx`;

  return csv;
}

/**
 * Generate PDF export (simplified - returns JSON for API to handle)
 * In production, use a library like pdfkit or puppeteer
 */
export function generatePDFExport(data: any[], options: ExportOptions): any {
  const filename = options.includeTimestamp
    ? `${options.filename}-${new Date().toISOString().slice(0, 10)}.pdf`
    : `${options.filename}.pdf`;

  return {
    format: 'pdf',
    filename,
    data,
    sheetName: options.sheetName || options.filename,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Prepare financial report data
 */
export function prepareFinancialReport(metrics: any): any[] {
  return [
    {
      'Report Type': 'Financial Summary',
      'Generated': formatDate(new Date()),
      'Total Revenue': formatCurrency(metrics.totalRevenue || 0),
      'Platform Fees': formatCurrency(metrics.platformFees || 0),
      'Contractor Payouts': formatCurrency(metrics.contractorPayouts || 0),
      'Success Rate': formatPercentage(metrics.paymentSuccessRate || 0),
    },
  ];
}

/**
 * Prepare operational report data
 */
export function prepareOperationalReport(metrics: any): any[] {
  return [
    {
      'Report Type': 'Operational Summary',
      'Generated': formatDate(new Date()),
      'Jobs Completed': metrics.jobsCompleted || 0,
      'Jobs Requested': metrics.jobsRequested || 0,
      'Completion Rate': formatPercentage(metrics.completionRate || 0),
      'Avg Completion Time (hrs)': (metrics.avgCompletionTime || 0).toFixed(2),
      'Active Contractors': metrics.activeContractors || 0,
    },
  ];
}

/**
 * Prepare contractor performance report
 */
export function prepareContractorReport(contractors: any[]): any[] {
  return contractors.map((c) => ({
    'Contractor ID': c.contractorId,
    'Jobs Completed': c.jobsCompleted || 0,
    'Total Earnings': formatCurrency(c.earnings || 0),
    'Avg Rating': (c.avgRating || 0).toFixed(2),
    'Acceptance Rate': formatPercentage(c.acceptanceRate || 0),
  }));
}

/**
 * Prepare client spending report
 */
export function prepareClientReport(clients: any[]): any[] {
  return clients.map((c) => ({
    'Client ID': c.clientId,
    'Total Spent': formatCurrency(c.totalSpent || 0),
    'Jobs Completed': c.jobsCompleted || 0,
    'Avg Job Value': formatCurrency(c.avgJobValue || 0),
    'Last Activity': formatDate(c.lastActivity || new Date()),
  }));
}

/**
 * Prepare monthly trend report
 */
export function prepareMonthlyTrendReport(trends: any[]): any[] {
  return trends.map((t) => ({
    'Month': t.month,
    'Revenue': formatCurrency(t.revenue || 0),
    'Jobs Completed': t.jobsCompleted || 0,
    'Growth %': formatPercentage(t.growth || 0),
    'Avg Job Value': formatCurrency(t.avgJobValue || 0),
  }));
}

/**
 * Create a downloadable file from content
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export analytics data in specified format
 */
export async function exportAnalyticsData(
  data: any[],
  format: 'csv' | 'excel' | 'pdf',
  filename: string
): Promise<string> {
  const options: ExportOptions = {
    format,
    filename,
    includeTimestamp: true,
  };

  switch (format) {
    case 'csv':
      return generateCSVExport(data, options);
    case 'excel':
      return generateExcelExport(data, options);
    case 'pdf':
      const pdfData = generatePDFExport(data, options);
      return JSON.stringify(pdfData);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

/**
 * Generate summary statistics for export
 */
export function generateExportSummary(metrics: any): string {
  const summary = `
Analytics Export Summary
Generated: ${formatDate(new Date())}

Key Metrics:
- Total Revenue: ${formatCurrency(metrics.totalRevenue || 0)}
- Platform Fees: ${formatCurrency(metrics.platformFees || 0)}
- Contractor Payouts: ${formatCurrency(metrics.contractorPayouts || 0)}
- Jobs Completed: ${metrics.jobsCompleted || 0}
- Payment Success Rate: ${formatPercentage(metrics.paymentSuccessRate || 0)}
- Active Contractors: ${metrics.activeContractors || 0}
- Avg Completion Time: ${(metrics.avgCompletionTime || 0).toFixed(2)} hours
`;
  return summary.trim();
}
