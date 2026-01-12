/**
 * Forecasting Engine
 * Predicts future trends and demand
 */

export interface Forecast {
  period: string;
  predicted: number;
  confidence: number; // 0-100
  lower: number; // 95% confidence interval
  upper: number;
}

export interface ForecastResult {
  metric: string;
  currentValue: number;
  forecasts: Forecast[];
  accuracy: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  riskFactors: string[];
}

/**
 * Simple linear regression forecast
 */
export function linearRegression(values: number[]): { slope: number; intercept: number } {
  const n = values.length;
  const x = Array.from({ length: n }, (_, i) => i);

  const xMean = x.reduce((a, b) => a + b) / n;
  const yMean = values.reduce((a, b) => a + b) / n;

  const numerator = x.reduce((sum, xi, i) => sum + (xi - xMean) * (values[i] - yMean), 0);
  const denominator = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0);

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = yMean - slope * xMean;

  return { slope, intercept };
}

/**
 * Exponential smoothing forecast
 */
export function exponentialSmoothing(values: number[], alpha: number = 0.3): number[] {
  if (values.length === 0) return [];

  const smoothed: number[] = [values[0]];

  for (let i = 1; i < values.length; i++) {
    const newValue = alpha * values[i] + (1 - alpha) * smoothed[i - 1];
    smoothed.push(newValue);
  }

  return smoothed;
}

/**
 * Calculate moving average
 */
export function movingAverage(values: number[], period: number = 3): number[] {
  const result: number[] = [];

  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - period + 1);
    const subset = values.slice(start, i + 1);
    const avg = subset.reduce((a, b) => a + b, 0) / subset.length;
    result.push(avg);
  }

  return result;
}

/**
 * Calculate mean absolute percentage error
 */
export function calculateMAPE(actual: number[], predicted: number[]): number {
  if (actual.length !== predicted.length || actual.length === 0) {
    return 0;
  }

  const errors = actual.map((a, i) => {
    if (a === 0) return 0;
    return Math.abs((a - predicted[i]) / a);
  });

  const mape = (errors.reduce((a, b) => a + b, 0) / errors.length) * 100;
  return Math.min(100, mape);
}

/**
 * Forecast revenue for next periods
 */
export function forecastRevenue(historicalRevenue: number[], periods: number = 3): Forecast[] {
  if (historicalRevenue.length < 2) return [];

  const { slope, intercept } = linearRegression(historicalRevenue);
  const startPeriod = historicalRevenue.length;
  const currentValue = historicalRevenue[historicalRevenue.length - 1];

  const forecasts: Forecast[] = [];
  const stdDev = calculateStdDev(historicalRevenue);

  for (let i = 1; i <= periods; i++) {
    const predicted = slope * (startPeriod + i) + intercept;
    const adjustedPredicted = Math.max(0, predicted);

    // 95% confidence interval
    const marginOfError = 1.96 * stdDev;
    const lower = Math.max(0, adjustedPredicted - marginOfError);
    const upper = adjustedPredicted + marginOfError;

    // Confidence decreases with distance
    const confidence = Math.max(50, 100 - i * 10);

    forecasts.push({
      period: `Period +${i}`,
      predicted: parseFloat(adjustedPredicted.toFixed(2)),
      confidence: parseFloat(confidence.toFixed(1)),
      lower: parseFloat(lower.toFixed(2)),
      upper: parseFloat(upper.toFixed(2)),
    });
  }

  return forecasts;
}

/**
 * Forecast job demand
 */
export function forecastDemand(historicalJobs: number[], periods: number = 3): Forecast[] {
  if (historicalJobs.length < 2) return [];

  const smoothed = exponentialSmoothing(historicalJobs, 0.4);
  const { slope, intercept } = linearRegression(smoothed);
  const startPeriod = historicalJobs.length;

  const forecasts: Forecast[] = [];
  const stdDev = calculateStdDev(historicalJobs);

  for (let i = 1; i <= periods; i++) {
    const predicted = Math.round(slope * (startPeriod + i) + intercept);
    const adjustedPredicted = Math.max(0, predicted);

    const marginOfError = 1.96 * stdDev;
    const lower = Math.max(0, adjustedPredicted - marginOfError);
    const upper = adjustedPredicted + marginOfError;

    const confidence = Math.max(50, 100 - i * 10);

    forecasts.push({
      period: `Period +${i}`,
      predicted: adjustedPredicted,
      confidence: parseFloat(confidence.toFixed(1)),
      lower: parseFloat(lower.toFixed(2)),
      upper: parseFloat(upper.toFixed(2)),
    });
  }

  return forecasts;
}

/**
 * Calculate standard deviation
 */
export function calculateStdDev(values: number[]): number {
  if (values.length === 0) return 0;

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;

  return Math.sqrt(variance);
}

/**
 * Determine trend direction
 */
export function determineTrend(values: number[]): 'increasing' | 'decreasing' | 'stable' {
  if (values.length < 2) return 'stable';

  const recent = values.slice(-5);
  const older = values.slice(0, Math.max(1, values.length - 5));

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;

  const change = ((recentAvg - olderAvg) / olderAvg) * 100;

  if (change > 5) return 'increasing';
  if (change < -5) return 'decreasing';
  return 'stable';
}

/**
 * Identify risk factors
 */
export function identifyRiskFactors(historicalData: number[]): string[] {
  const risks: string[] = [];

  if (historicalData.length < 3) {
    risks.push('Insufficient historical data for reliable forecast');
  }

  const stdDev = calculateStdDev(historicalData);
  const mean = historicalData.reduce((a, b) => a + b, 0) / historicalData.length;

  if (stdDev > mean * 0.5) {
    risks.push('High volatility detected - forecast may be less accurate');
  }

  const recent = historicalData.slice(-3);
  const recentChange = Math.abs((recent[recent.length - 1] - recent[0]) / recent[0]) * 100;

  if (recentChange > 50) {
    risks.push('Significant recent fluctuation - trend may not continue');
  }

  return risks;
}

/**
 * Generate comprehensive forecast
 */
export function generateForecast(
  metric: string,
  historicalValues: number[],
  periods: number = 3
): ForecastResult {
  const currentValue = historicalValues[historicalValues.length - 1];
  const forecasts = metric.includes('revenue')
    ? forecastRevenue(historicalValues, periods)
    : forecastDemand(historicalValues, periods);

  const trend = determineTrend(historicalValues);
  const riskFactors = identifyRiskFactors(historicalValues);

  // Estimate accuracy based on data quality
  const accuracy = Math.max(65, 100 - riskFactors.length * 15);

  return {
    metric,
    currentValue,
    forecasts,
    accuracy: parseFloat(accuracy.toFixed(1)),
    trend,
    riskFactors,
  };
}

/**
 * Forecast churn risk
 */
export function forecastChurnRisk(
  contractorMetrics: Array<{ acceptanceRate: number; rating: number; income: number }>
): Array<{ index: number; riskScore: number; factors: string[] }> {
  return contractorMetrics.map((metric, idx) => {
    let riskScore = 0;
    const factors: string[] = [];

    if (metric.acceptanceRate < 60) {
      riskScore += 30;
      factors.push('Low acceptance rate');
    }

    if (metric.rating < 3.5) {
      riskScore += 25;
      factors.push('Low customer rating');
    }

    if (metric.income < 1000) {
      riskScore += 20;
      factors.push('Low monthly income');
    }

    return {
      index: idx,
      riskScore: parseFloat(Math.min(100, riskScore).toFixed(1)),
      factors,
    };
  });
}
