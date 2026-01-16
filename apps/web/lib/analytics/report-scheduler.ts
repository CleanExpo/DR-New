/**
 * Report Scheduler
 * Manages scheduled report generation and delivery
 */

export interface ScheduledReportConfig {
  id?: string;
  name: string;
  reportType: 'financial' | 'operational' | 'performance' | 'custom';
  frequency: 'daily' | 'weekly' | 'monthly';
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  timeOfDay?: string; // HH:MM format
  recipients: string[];
  format: 'csv' | 'excel' | 'pdf';
  includeCharts: boolean;
  isActive: boolean;
  createdAt?: Date;
  nextGenerationAt?: Date;
  lastGeneratedAt?: Date;
}

/**
 * Calculate next generation time based on frequency
 */
export function calculateNextGenerationTime(config: ScheduledReportConfig): Date {
  const now = new Date();
  const [hours = 0, minutes = 0] = (config.timeOfDay || '00:00').split(':').map(Number);

  let nextTime = new Date(now);
  nextTime.setHours(hours, minutes, 0, 0);

  // If the time has already passed today, move to next period
  if (nextTime <= now) {
    switch (config.frequency) {
      case 'daily':
        nextTime.setDate(nextTime.getDate() + 1);
        break;
      case 'weekly':
        const daysUntilNextOccurrence = ((config.dayOfWeek || 0) - nextTime.getDay() + 7) % 7 || 7;
        nextTime.setDate(nextTime.getDate() + daysUntilNextOccurrence);
        break;
      case 'monthly':
        nextTime.setMonth(nextTime.getMonth() + 1);
        nextTime.setDate(config.dayOfMonth || 1);
        break;
    }
  }

  return nextTime;
}

/**
 * Check if a report should be generated now
 */
export function shouldGenerateReport(config: ScheduledReportConfig): boolean {
  if (!config.isActive) return false;

  const now = new Date();
  const nextGen = config.nextGenerationAt || calculateNextGenerationTime(config);

  return now >= nextGen;
}

/**
 * Get frequency display text
 */
export function getFrequencyDisplayText(frequency: string, dayOfWeek?: number, dayOfMonth?: number): string {
  switch (frequency) {
    case 'daily':
      return 'Every day';
    case 'weekly':
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `Every ${days[dayOfWeek || 0]}`;
    case 'monthly':
      return `Every month on day ${dayOfMonth || 1}`;
    default:
      return 'Unknown';
  }
}

/**
 * Generate report template based on type
 */
export function getReportTemplate(reportType: string): { title: string; description: string; defaultMetrics: string[] } {
  const templates: Record<string, any> = {
    financial: {
      title: 'Financial Report',
      description: 'Revenue, fees, and payout analysis',
      defaultMetrics: ['totalRevenue', 'platformFees', 'contractorPayouts', 'paymentSuccessRate'],
    },
    operational: {
      title: 'Operational Report',
      description: 'Job completion and contractor utilization metrics',
      defaultMetrics: ['jobsCompleted', 'completionRate', 'avgCompletionTime', 'activeContractors'],
    },
    performance: {
      title: 'Performance Report',
      description: 'Contractor and service performance analysis',
      defaultMetrics: ['topContractors', 'topServices', 'averageRating', 'successRate'],
    },
    custom: {
      title: 'Custom Report',
      description: 'User-defined report with selected metrics',
      defaultMetrics: [],
    },
  };

  return templates[reportType] || templates.custom;
}

/**
 * Format report data
 */
export function formatReportData(data: any, format: 'csv' | 'excel' | 'pdf'): any {
  switch (format) {
    case 'csv':
      return {
        mimeType: 'text/csv',
        extension: 'csv',
      };
    case 'excel':
      return {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extension: 'xlsx',
      };
    case 'pdf':
      return {
        mimeType: 'application/pdf',
        extension: 'pdf',
      };
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

/**
 * Build report email subject
 */
export function buildReportEmailSubject(config: ScheduledReportConfig): string {
  const template = getReportTemplate(config.reportType);
  const dateStr = new Date().toLocaleDateString('en-AU');
  return `${template.title} - ${dateStr}`;
}

/**
 * Build report email body
 */
export function buildReportEmailBody(config: ScheduledReportConfig, metrics: any): string {
  const template = getReportTemplate(config.reportType);
  const dateStr = new Date().toLocaleDateString('en-AU');

  let body = `
Hello,

Please find your scheduled ${template.title.toLowerCase()} attached.

Report Details:
- Type: ${template.title}
- Generated: ${dateStr}
- Frequency: ${getFrequencyDisplayText(config.frequency)}

Key Metrics:
`;

  // Add key metrics summary
  if (metrics.totalRevenue !== undefined) {
    body += `- Total Revenue: $${metrics.totalRevenue.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n`;
  }
  if (metrics.jobsCompleted !== undefined) {
    body += `- Jobs Completed: ${metrics.jobsCompleted}\n`;
  }

  body += `
For more details, log in to your dashboard.

Best regards,
Disaster Recovery Platform Team
`;

  return body.trim();
}

/**
 * Validate report configuration
 */
export function validateReportConfig(config: ScheduledReportConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.name || config.name.trim().length === 0) {
    errors.push('Report name is required');
  }

  if (!config.reportType) {
    errors.push('Report type is required');
  }

  if (!config.frequency) {
    errors.push('Frequency is required');
  }

  if (!config.recipients || config.recipients.length === 0) {
    errors.push('At least one recipient is required');
  }

  if (config.recipients.some((email) => !isValidEmail(email))) {
    errors.push('One or more invalid email addresses');
  }

  if (!config.format) {
    errors.push('Export format is required');
  }

  if (config.frequency === 'weekly' && config.dayOfWeek === undefined) {
    errors.push('Day of week is required for weekly reports');
  }

  if (config.frequency === 'monthly' && (!config.dayOfMonth || config.dayOfMonth < 1 || config.dayOfMonth > 31)) {
    errors.push('Valid day of month (1-31) is required for monthly reports');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate email address
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Create a new scheduled report
 */
export function createScheduledReport(config: Partial<ScheduledReportConfig>): ScheduledReportConfig {
  const report: ScheduledReportConfig = {
    name: config.name || 'Untitled Report',
    reportType: config.reportType || 'financial',
    frequency: config.frequency || 'monthly',
    recipients: config.recipients || [],
    format: config.format || 'pdf',
    includeCharts: config.includeCharts !== false,
    isActive: config.isActive !== false,
    createdAt: config.createdAt || new Date(),
    nextGenerationAt: calculateNextGenerationTime(config as ScheduledReportConfig),
  };

  return report;
}

/**
 * Update scheduled report
 */
export function updateScheduledReport(
  currentConfig: ScheduledReportConfig,
  updates: Partial<ScheduledReportConfig>
): ScheduledReportConfig {
  const updated = { ...currentConfig, ...updates };
  updated.nextGenerationAt = calculateNextGenerationTime(updated);
  return updated;
}

/**
 * Disable a scheduled report
 */
export function disableScheduledReport(config: ScheduledReportConfig): ScheduledReportConfig {
  return { ...config, isActive: false };
}

/**
 * Enable a scheduled report
 */
export function enableScheduledReport(config: ScheduledReportConfig): ScheduledReportConfig {
  return {
    ...config,
    isActive: true,
    nextGenerationAt: calculateNextGenerationTime(config),
  };
}
