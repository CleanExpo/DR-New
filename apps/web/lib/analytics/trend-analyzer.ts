/**
 * Trend Analysis Engine
 * Calculates trends, comparisons, and anomalies in analytics data
 */

interface MetricValue {
  value: number;
  date?: Date;
}

interface TrendResult {
  current: number;
  previous: number;
  change: number;
  percentageChange: number;
  trend: 'up' | 'down' | 'stable';
  trend_indicator: string;
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Calculate trend comparison for a metric
 */
export function calculateTrend(current: number, previous: number): TrendResult {
  const change = current - previous;
  const percentageChange = calculatePercentageChange(current, previous);

  let trend: 'up' | 'down' | 'stable' = 'stable';
  let trend_indicator = '→';

  if (percentageChange > 5) {
    trend = 'up';
    trend_indicator = '↑';
  } else if (percentageChange < -5) {
    trend = 'down';
    trend_indicator = '↓';
  }

  return {
    current,
    previous,
    change,
    percentageChange: parseFloat(percentageChange.toFixed(2)),
    trend,
    trend_indicator,
  };
}

/**
 * Calculate moving average
 */
export function calculateMovingAverage(values: number[], period: number = 3): number[] {
  const result: number[] = [];

  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - period + 1);
    const subset = values.slice(start, i + 1);
    const avg = subset.reduce((a, b) => a + b, 0) / subset.length;
    result.push(parseFloat(avg.toFixed(2)));
  }

  return result;
}

/**
 * Detect anomalies in a data series
 */
export function detectAnomalies(values: number[], threshold: number = 2): number[] {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  const anomalies: number[] = [];

  values.forEach((value, index) => {
    const zScore = Math.abs((value - mean) / stdDev);
    if (zScore > threshold) {
      anomalies.push(index);
    }
  });

  return anomalies;
}

/**
 * Calculate year-over-year comparison
 */
export function calculateYoYComparison(
  currentYear: number[],
  previousYear: number[]
): TrendResult {
  const currentTotal = currentYear.reduce((a, b) => a + b, 0);
  const previousTotal = previousYear.reduce((a, b) => a + b, 0);

  return calculateTrend(currentTotal, previousTotal);
}

/**
 * Calculate month-over-month growth
 */
export function calculateMoMGrowth(monthlyValues: number[]): number[] {
  const growth: number[] = [0]; // First month has no comparison

  for (let i = 1; i < monthlyValues.length; i++) {
    const change = calculatePercentageChange(monthlyValues[i], monthlyValues[i - 1]);
    growth.push(parseFloat(change.toFixed(2)));
  }

  return growth;
}

/**
 * Detect seasonal patterns
 */
export function detectSeasonalPattern(
  monthlyData: number[],
  minimumPeriod: number = 12
): Record<number, number> {
  if (monthlyData.length < minimumPeriod) {
    return {};
  }

  const patterns: Record<number, number[]> = {};

  // Group data by month position (1-12)
  for (let i = 0; i < monthlyData.length; i++) {
    const monthPosition = (i % 12) + 1;
    if (!patterns[monthPosition]) {
      patterns[monthPosition] = [];
    }
    patterns[monthPosition].push(monthlyData[i]);
  }

  // Calculate average for each month position
  const seasonalPatterns: Record<number, number> = {};
  Object.entries(patterns).forEach(([month, values]) => {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    seasonalPatterns[parseInt(month)] = parseFloat(avg.toFixed(2));
  });

  return seasonalPatterns;
}

/**
 * Calculate compound annual growth rate (CAGR)
 */
export function calculateCAGR(beginningValue: number, endingValue: number, years: number): number {
  if (beginningValue <= 0 || years <= 0) {
    return 0;
  }

  const cagr = Math.pow(endingValue / beginningValue, 1 / years) - 1;
  return parseFloat((cagr * 100).toFixed(2));
}

/**
 * Project future values based on historical trend
 */
export function projectValues(
  historicalValues: number[],
  periods: number = 3
): number[] {
  if (historicalValues.length < 2) {
    return [];
  }

  const projections: number[] = [];
  const growthRate = calculateMoMGrowth(historicalValues);
  const avgGrowthRate =
    growthRate.slice(1).reduce((a, b) => a + b, 0) / (growthRate.length - 1);

  let lastValue = historicalValues[historicalValues.length - 1];

  for (let i = 0; i < periods; i++) {
    const projected = lastValue * (1 + avgGrowthRate / 100);
    projections.push(parseFloat(projected.toFixed(2)));
    lastValue = projected;
  }

  return projections;
}

/**
 * Compare two periods with detailed metrics
 */
export function comparePeriods(
  currentMetrics: Record<string, number>,
  previousMetrics: Record<string, number>
): Record<string, TrendResult> {
  const comparison: Record<string, TrendResult> = {};

  Object.entries(currentMetrics).forEach(([key, value]) => {
    if (previousMetrics[key] !== undefined) {
      comparison[key] = calculateTrend(value, previousMetrics[key]);
    }
  });

  return comparison;
}

/**
 * Calculate trend consistency (how consistent is the trend over time)
 */
export function calculateTrendConsistency(values: number[]): number {
  if (values.length < 2) {
    return 0;
  }

  const growth = calculateMoMGrowth(values);
  const signs = growth.slice(1).map((g) => (g > 0 ? 1 : g < 0 ? -1 : 0));

  // Count consistent direction changes
  let consistency = 0;
  const dominantSign = signs.reduce((a, b) => a + b, 0) > 0 ? 1 : -1;

  signs.forEach((sign) => {
    if (sign === dominantSign) {
      consistency++;
    }
  });

  return parseFloat(((consistency / signs.length) * 100).toFixed(2));
}

/**
 * Identify inflection points (significant trend changes)
 */
export function identifyInflectionPoints(values: number[], threshold: number = 10): number[] {
  const growth = calculateMoMGrowth(values);
  const inflectionPoints: number[] = [];

  for (let i = 1; i < growth.length; i++) {
    const previousGrowth = growth[i - 1];
    const currentGrowth = growth[i];

    // Significant direction change
    if (previousGrowth > 0 && currentGrowth < -threshold) {
      inflectionPoints.push(i);
    } else if (previousGrowth < 0 && currentGrowth > threshold) {
      inflectionPoints.push(i);
    }
  }

  return inflectionPoints;
}
