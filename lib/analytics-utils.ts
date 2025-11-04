/**
 * Analytics Utility Functions
 * Formatting and data transformation for analytics dashboard
 */

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

/**
 * Format currency for Australian dollars
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format currency with decimals
 */
export function formatCurrencyDetailed(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format large numbers (1.2K, 1.5M)
 */
export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

/**
 * Calculate percentage change between two values
 */
export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Get color based on change value (red for negative, green for positive)
 */
export function getChangeColor(change: number): string {
  if (change > 0) return 'text-green-600 dark:text-green-400';
  if (change < 0) return 'text-red-600 dark:text-red-400';
  return 'text-gray-600 dark:text-gray-400';
}

/**
 * Get background color for change indicators
 */
export function getChangeBgColor(change: number): string {
  if (change > 0) return 'bg-green-100 dark:bg-green-900/20';
  if (change < 0) return 'bg-red-100 dark:bg-red-900/20';
  return 'bg-gray-100 dark:bg-gray-900/20';
}

/**
 * Transform revenue data for chart format
 */
export function transformRevenueData(data: any[]): ChartData[] {
  return data.map(item => ({
    name: item.month || item.date || item.label,
    total: item.total || 0,
    subscriptions: item.subscriptions || 0,
    jobPayments: item.jobPayments || item.job_payments || 0,
    materials: item.materials || 0,
  }));
}

/**
 * Transform job status data for pie chart
 */
export function transformJobStatusData(data: any): ChartData[] {
  return Object.entries(data).map(([status, count]) => ({
    name: formatJobStatus(status),
    value: count as number,
    status,
  }));
}

/**
 * Transform contractor performance data
 */
export function transformContractorData(data: any[]): ChartData[] {
  return data.map(contractor => ({
    name: contractor.name || `${contractor.firstName} ${contractor.lastName}`,
    value: contractor.completedJobs || contractor.completed_jobs || 0,
    revenue: contractor.revenue || 0,
    rating: contractor.rating || 0,
  }));
}

/**
 * Format job status for display
 */
export function formatJobStatus(status: string): string {
  const statusMap: Record<string, string> = {
    DRAFT: 'Draft',
    SCHEDULED: 'Scheduled',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    ON_HOLD: 'On Hold',
  };
  return statusMap[status] || status;
}

/**
 * Format service type for display
 */
export function formatServiceType(type: string): string {
  const typeMap: Record<string, string> = {
    WATER_DAMAGE: 'Water Damage',
    FIRE_RESTORATION: 'Fire Restoration',
    MOULD_REMEDIATION: 'Mould Remediation',
    BIOHAZARD: 'Biohazard',
    STORM_DAMAGE: 'Storm Damage',
    SEWAGE_CLEANUP: 'Sewage Cleanup',
    COMMERCIAL: 'Commercial',
    CONTENTS_RESTORATION: 'Contents Restoration',
  };
  return typeMap[type] || type;
}

/**
 * Get chart colors for different themes
 */
export const CHART_COLORS = {
  light: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
    grid: '#e5e7eb',
    text: '#6b7280',
    tooltip: '#ffffff',
  },
  dark: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
    info: '#22d3ee',
    grid: '#374151',
    text: '#9ca3af',
    tooltip: '#1f2937',
  },
};

/**
 * Get status color for charts
 */
export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    DRAFT: '#6b7280',
    SCHEDULED: '#3b82f6',
    IN_PROGRESS: '#f59e0b',
    COMPLETED: '#10b981',
    CANCELLED: '#ef4444',
    ON_HOLD: '#8b5cf6',
  };
  return colorMap[status] || '#6b7280';
}

/**
 * Get service type color for charts
 */
export function getServiceTypeColor(type: string): string {
  const colorMap: Record<string, string> = {
    WATER_DAMAGE: '#3b82f6',
    FIRE_RESTORATION: '#ef4444',
    MOULD_REMEDIATION: '#10b981',
    BIOHAZARD: '#8b5cf6',
    STORM_DAMAGE: '#06b6d4',
    SEWAGE_CLEANUP: '#f59e0b',
    COMMERCIAL: '#6366f1',
    CONTENTS_RESTORATION: '#ec4899',
  };
  return colorMap[type] || '#6b7280';
}

/**
 * Format date for charts
 */
export function formatChartDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'short') {
    return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
  }

  return d.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Format duration in hours
 */
export function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} mins`;
  }
  if (hours < 24) {
    return `${hours.toFixed(1)} hrs`;
  }
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours % 24);
  return `${days}d ${remainingHours}h`;
}

/**
 * Generate mock data for development
 */
export function generateMockRevenueData(months: number = 12): ChartData[] {
  const data: ChartData[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const subscriptions = Math.floor(Math.random() * 50000) + 30000;
    const jobPayments = Math.floor(Math.random() * 80000) + 40000;
    const materials = Math.floor(Math.random() * 20000) + 10000;

    data.push({
      name: date.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' }),
      subscriptions,
      jobPayments,
      materials,
      total: subscriptions + jobPayments + materials,
    });
  }

  return data;
}

/**
 * Export data to CSV
 */
export function exportToCSV(data: any[], filename: string) {
  if (typeof window === 'undefined') return;

  const Papa = require('papaparse');
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Calculate trend direction
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

export function getTrendDirection(change: number): TrendDirection {
  if (change > 0) return 'up';
  if (change < 0) return 'down';
  return 'neutral';
}

/**
 * Format activity timestamp
 */
export function formatActivityTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}
