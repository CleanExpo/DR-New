/**
 * Chart Utilities
 *
 * Helper functions for D3 data formatting, scaling, and chart operations
 */

import * as d3 from 'd3';
import { chartColors, chartSizes, chartMargins, chartBreakpoints } from './chart-config';

/**
 * Get responsive chart width based on container width
 */
export function getResponsiveWidth(containerWidth: number, type: keyof typeof chartSizes = 'dashboard'): number {
  if (containerWidth < chartBreakpoints.mobile) {
    return Math.min(containerWidth - 20, 300);
  }
  if (containerWidth < chartBreakpoints.tablet) {
    return Math.min(containerWidth - 20, 500);
  }
  return Math.min(containerWidth - 20, chartSizes[type].width);
}

/**
 * Get responsive chart height with aspect ratio
 */
export function getResponsiveHeight(width: number, type: keyof typeof chartSizes = 'dashboard'): number {
  const aspectRatio = chartSizes[type].height / chartSizes[type].width;
  return width * aspectRatio;
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-AU').format(Math.round(value));
}

/**
 * Format currency (AUD)
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
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-AU', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  }).format(d);
}

/**
 * Format date-time for tooltips
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-AU', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/**
 * Parse CSV data to array of objects
 */
export function parseCSV<T extends Record<string, any>>(csv: string): T[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj: Record<string, any> = {};
    headers.forEach((header, i) => {
      const value = values[i];
      // Try to parse as number
      obj[header] = isNaN(Number(value)) ? value : Number(value);
    });
    return obj as T;
  });
}

/**
 * Aggregate data by time period
 */
export function aggregateByPeriod(
  data: Array<{ date: Date | string; value: number }>,
  period: 'day' | 'week' | 'month' | 'year'
): Array<{ date: Date; value: number }> {
  const grouped = d3.group(
    data,
    (d) => {
      const date = typeof d.date === 'string' ? new Date(d.date) : d.date;
      switch (period) {
        case 'day':
          return d3.timeDay.floor(date);
        case 'week':
          return d3.timeWeek.floor(date);
        case 'month':
          return d3.timeMonth.floor(date);
        case 'year':
          return d3.timeYear.floor(date);
      }
    }
  );

  return Array.from(grouped, ([date, values]) => ({
    date,
    value: d3.sum(values, d => d.value),
  })).sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Create linear scale
 */
export function createLinearScale(
  data: number[],
  range: [number, number] = [0, 100]
): d3.ScaleLinear<number, number> {
  const min = Math.min(...data);
  const max = Math.max(...data);
  return d3.scaleLinear().domain([min, max]).range(range);
}

/**
 * Create time scale
 */
export function createTimeScale(
  data: Date[],
  range: [number, number] = [0, 100]
): d3.ScaleTime<number, number> {
  const min = new Date(Math.min(...data.map(d => d.getTime())));
  const max = new Date(Math.max(...data.map(d => d.getTime())));
  return d3.scaleTime().domain([min, max]).range(range);
}

/**
 * Create ordinal scale
 */
export function createOrdinalScale(
  data: string[],
  range: [number, number] = [0, 100]
): d3.ScaleBand<string> {
  return d3.scaleBand()
    .domain(data)
    .range(range)
    .padding(0.1);
}

/**
 * Get color from palette
 */
export function getChartColor(key: keyof typeof chartColors): string {
  return chartColors[key] as unknown as string;
}

/**
 * Get service color
 */
export function getServiceColor(service: 'water' | 'fire' | 'mold' | 'biohazard'): string {
  return chartColors.services[service];
}

/**
 * Get series color by index
 */
export function getSeriesColor(index: number): string {
  return chartColors.series[index % chartColors.series.length];
}

/**
 * Calculate percentage change
 */
export function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/**
 * Generate smooth line path (SVG)
 */
export function generateLinePath(
  data: Array<{ x: number; y: number }>,
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>
): string {
  const line = d3.line<{ x: number; y: number }>()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveMonotoneX);  // Smooth curve

  return line(data) || '';
}

/**
 * Calculate moving average
 */
export function calculateMovingAverage(data: number[], window: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - Math.floor(window / 2));
    const end = Math.min(data.length, i + Math.ceil(window / 2));
    const avg = d3.mean(data.slice(start, end)) || 0;
    result.push(avg);
  }
  return result;
}

/**
 * Normalize data to 0-1 range
 */
export function normalizeData(data: number[]): number[] {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map(d => (d - min) / range);
}

/**
 * Get axis label with smart formatting
 */
export function formatAxisLabel(value: number, type: 'currency' | 'number' | 'percent' = 'number'): string {
  if (type === 'currency') {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  }
  if (type === 'percent') return `${Math.round(value * 100)}%`;

  // Number
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return Math.round(value).toString();
}
