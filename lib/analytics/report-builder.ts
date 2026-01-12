/**
 * Custom Report Builder
 * Allows admins to create custom analytics reports
 */

export type ReportMetric = 'revenue' | 'jobs' | 'contractors' | 'clients' | 'ratings' | 'payouts';
export type VisualizationType = 'table' | 'line' | 'bar' | 'pie';
export type ReportFilterOperator = '>' | '<' | '=' | 'in' | 'between';

export interface ReportFilter {
  metric: string;
  operator: ReportFilterOperator;
  value: any;
}

export interface CustomReport {
  id?: string;
  name: string;
  description?: string;
  createdBy: string;
  metrics: ReportMetric[];
  filters: ReportFilter[];
  visualization: VisualizationType;
  groupBy?: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReportTemplate {
  name: string;
  description: string;
  metrics: ReportMetric[];
  visualization: VisualizationType;
}

/**
 * Available report templates
 */
export const REPORT_TEMPLATES: Record<string, ReportTemplate> = {
  revenue_summary: {
    name: 'Revenue Summary',
    description: 'Total revenue with period comparison',
    metrics: ['revenue', 'payouts'],
    visualization: 'line',
  },
  contractor_performance: {
    name: 'Contractor Performance',
    description: 'Top contractors by earnings and ratings',
    metrics: ['contractors', 'revenue', 'ratings'],
    visualization: 'bar',
  },
  client_spending: {
    name: 'Client Spending',
    description: 'Top clients by spending',
    metrics: ['clients', 'revenue', 'jobs'],
    visualization: 'pie',
  },
  jobs_overview: {
    name: 'Jobs Overview',
    description: 'Job completion metrics',
    metrics: ['jobs', 'revenue', 'ratings'],
    visualization: 'table',
  },
};

/**
 * Available metrics for report building
 */
export const AVAILABLE_METRICS: Record<ReportMetric, { label: string; unit: string }> = {
  revenue: { label: 'Total Revenue', unit: 'AUD' },
  jobs: { label: 'Jobs Completed', unit: 'count' },
  contractors: { label: 'Active Contractors', unit: 'count' },
  clients: { label: 'Active Clients', unit: 'count' },
  ratings: { label: 'Average Rating', unit: 'stars' },
  payouts: { label: 'Contractor Payouts', unit: 'AUD' },
};

/**
 * Create a new custom report
 */
export function createCustomReport(
  name: string,
  createdBy: string,
  metrics: ReportMetric[],
  visualization: VisualizationType = 'table'
): CustomReport {
  return {
    name,
    createdBy,
    metrics,
    filters: [],
    visualization,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Clone a template into a custom report
 */
export function createFromTemplate(templateKey: string, createdBy: string): CustomReport | null {
  const template = REPORT_TEMPLATES[templateKey];
  if (!template) return null;

  return {
    name: template.name,
    description: template.description,
    createdBy,
    metrics: template.metrics,
    filters: [],
    visualization: template.visualization,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Add metric to report
 */
export function addMetric(report: CustomReport, metric: ReportMetric): CustomReport {
  if (!report.metrics.includes(metric)) {
    report.metrics.push(metric);
  }
  report.updatedAt = new Date();
  return report;
}

/**
 * Remove metric from report
 */
export function removeMetric(report: CustomReport, metric: ReportMetric): CustomReport {
  report.metrics = report.metrics.filter((m) => m !== metric);
  report.updatedAt = new Date();
  return report;
}

/**
 * Add filter to report
 */
export function addFilter(report: CustomReport, filter: ReportFilter): CustomReport {
  report.filters.push(filter);
  report.updatedAt = new Date();
  return report;
}

/**
 * Remove filter from report
 */
export function removeFilter(report: CustomReport, filterIndex: number): CustomReport {
  report.filters.splice(filterIndex, 1);
  report.updatedAt = new Date();
  return report;
}

/**
 * Validate report configuration
 */
export function validateReport(report: CustomReport): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!report.name || report.name.trim().length === 0) {
    errors.push('Report name is required');
  }

  if (report.metrics.length === 0) {
    errors.push('At least one metric must be selected');
  }

  if (!report.visualization) {
    errors.push('Visualization type is required');
  }

  // Validate visualization matches metrics
  if (report.visualization === 'pie' && report.metrics.length > 1) {
    errors.push('Pie chart can only display one metric');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get recommended visualization based on metrics
 */
export function getRecommendedVisualization(metrics: ReportMetric[]): VisualizationType {
  if (metrics.length === 1) {
    return 'pie';
  }

  if (metrics.includes('revenue') && metrics.includes('jobs')) {
    return 'line';
  }

  if (metrics.includes('contractors')) {
    return 'bar';
  }

  return 'table';
}

/**
 * Generate report SQL-like query (simplified)
 */
export function buildReportQuery(report: CustomReport): string {
  const selectMetrics = report.metrics.map((m) => AVAILABLE_METRICS[m].label).join(', ');
  let query = `SELECT ${selectMetrics} FROM analytics`;

  if (report.filters.length > 0) {
    const filterConditions = report.filters.map((f) => `${f.metric} ${f.operator} '${f.value}'`).join(' AND ');
    query += ` WHERE ${filterConditions}`;
  }

  if (report.groupBy) {
    query += ` GROUP BY ${report.groupBy}`;
  }

  return query;
}

/**
 * Export report as JSON
 */
export function exportReportConfig(report: CustomReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * Import report from JSON
 */
export function importReportConfig(json: string, createdBy: string): CustomReport | null {
  try {
    const parsed = JSON.parse(json);
    parsed.createdBy = createdBy;
    parsed.createdAt = new Date(parsed.createdAt);
    parsed.updatedAt = new Date();
    return parsed as CustomReport;
  } catch {
    return null;
  }
}

/**
 * Get filter options for a metric
 */
export function getFilterOptionsForMetric(metric: string): ReportFilterOperator[] {
  const numericMetrics = ['revenue', 'jobs', 'contractors', 'clients'];
  const ratingMetrics = ['ratings'];

  if (ratingMetrics.includes(metric)) {
    return ['>', '<', '=', 'between'];
  }

  if (numericMetrics.includes(metric)) {
    return ['>', '<', '=', 'between'];
  }

  return ['=', 'in'];
}
