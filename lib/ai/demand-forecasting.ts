/**
 * Demand Forecasting
 * Predict emergency call volume using ML techniques
 */

export interface DemandForecast {
  date: Date;
  predictedCalls: number;
  confidence: number;
  factors: {
    weather: number;
    seasonality: number;
    dayOfWeek: number;
    historical: number;
  };
  recommendations: string[];
}

export interface HistoricalData {
  date: Date;
  calls: number;
  serviceType?: string;
  weather?: 'clear' | 'rain' | 'storm' | 'extreme';
}

/**
 * Forecast demand for upcoming period
 */
export async function forecastDemand(
  historicalData: HistoricalData[],
  daysAhead: number = 7
): Promise<DemandForecast[]> {
  const forecasts: DemandForecast[] = [];
  const today = new Date();

  for (let i = 1; i <= daysAhead; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);

    const forecast = predictDayDemand(forecastDate, historicalData);
    forecasts.push(forecast);
  }

  return forecasts;
}

/**
 * Predict demand for specific day
 */
function predictDayDemand(
  date: Date,
  historicalData: HistoricalData[]
): DemandForecast {
  // Calculate baseline from historical average
  const avgCalls =
    historicalData.reduce((sum, d) => sum + d.calls, 0) /
    historicalData.length;

  // Day of week factor
  const dayOfWeek = date.getDay();
  const dayOfWeekFactor = getDayOfWeekFactor(dayOfWeek);

  // Seasonal factor
  const month = date.getMonth();
  const seasonalFactor = getSeasonalFactor(month);

  // Weather impact (would integrate with weather API in production)
  const weatherFactor = 1.0; // Placeholder

  // Historical pattern
  const historicalFactor = getHistoricalPattern(date, historicalData);

  // Calculate prediction
  let predictedCalls = avgCalls;
  predictedCalls *= dayOfWeekFactor;
  predictedCalls *= seasonalFactor;
  predictedCalls *= weatherFactor;
  predictedCalls *= historicalFactor;

  predictedCalls = Math.round(predictedCalls);

  // Calculate confidence based on data quality
  const confidence = calculateConfidence(historicalData);

  // Generate recommendations
  const recommendations = generateRecommendations(
    predictedCalls,
    avgCalls,
    dayOfWeek
  );

  return {
    date,
    predictedCalls,
    confidence,
    factors: {
      weather: weatherFactor,
      seasonality: seasonalFactor,
      dayOfWeek: dayOfWeekFactor,
      historical: historicalFactor,
    },
    recommendations,
  };
}

/**
 * Get day of week impact factor
 */
function getDayOfWeekFactor(dayOfWeek: number): number {
  // 0 = Sunday, 6 = Saturday
  const factors: Record<number, number> = {
    0: 1.2, // Sunday - higher emergency rates
    1: 0.9, // Monday
    2: 0.85, // Tuesday - lowest
    3: 0.9, // Wednesday
    4: 0.95, // Thursday
    5: 1.1, // Friday
    6: 1.3, // Saturday - highest emergency rates
  };

  return factors[dayOfWeek] || 1.0;
}

/**
 * Get seasonal factor
 */
function getSeasonalFactor(month: number): number {
  // 0 = January, 11 = December
  const factors: Record<number, number> = {
    0: 1.4, // January - storm season
    1: 1.5, // February - peak storm season
    2: 1.3, // March - storm season
    3: 1.1, // April
    4: 0.9, // May
    5: 0.8, // June - winter, fewer storms
    6: 0.8, // July - winter
    7: 0.9, // August
    8: 1.0, // September
    9: 1.1, // October - storm season starts
    10: 1.3, // November - storm season
    11: 1.5, // December - peak storm + fire season
  };

  return factors[month] || 1.0;
}

/**
 * Get historical pattern factor
 */
function getHistoricalPattern(
  date: Date,
  historicalData: HistoricalData[]
): number {
  // Find similar dates in history (same day of week, similar time of year)
  const dayOfWeek = date.getDay();
  const month = date.getMonth();

  const similarDays = historicalData.filter((d) => {
    const hDayOfWeek = d.date.getDay();
    const hMonth = d.date.getMonth();

    return (
      hDayOfWeek === dayOfWeek &&
      Math.abs(hMonth - month) <= 1 // Within 1 month
    );
  });

  if (similarDays.length === 0) {return 1.0;}

  const avgSimilar =
    similarDays.reduce((sum, d) => sum + d.calls, 0) / similarDays.length;
  const overallAvg =
    historicalData.reduce((sum, d) => sum + d.calls, 0) /
    historicalData.length;

  return avgSimilar / overallAvg;
}

/**
 * Calculate prediction confidence
 */
function calculateConfidence(historicalData: HistoricalData[]): number {
  if (historicalData.length < 30) {return 0.5;} // Low confidence
  if (historicalData.length < 90) {return 0.7;} // Medium confidence
  if (historicalData.length < 365) {return 0.85;} // High confidence

  return 0.95; // Very high confidence with 1+ year of data
}

/**
 * Generate staffing recommendations
 */
function generateRecommendations(
  predictedCalls: number,
  avgCalls: number,
  dayOfWeek: number
): string[] {
  const recommendations: string[] = [];
  const variance = ((predictedCalls - avgCalls) / avgCalls) * 100;

  // High demand recommendations
  if (variance > 30) {
    recommendations.push(
      'Schedule additional technicians for expected high demand'
    );
    recommendations.push('Ensure backup equipment is ready');
    recommendations.push('Pre-position emergency response vehicles');
  } else if (variance > 15) {
    recommendations.push('Consider scheduling an extra technician on-call');
    recommendations.push('Review equipment inventory');
  }

  // Weekend recommendations
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    recommendations.push(
      'Weekend operations - ensure full emergency response capability'
    );
  }

  // Low demand recommendations
  if (variance < -20) {
    recommendations.push(
      'Lower expected demand - opportunity for equipment maintenance'
    );
    recommendations.push('Good time for staff training or certification updates');
  }

  // Emergency preparedness
  if (predictedCalls > avgCalls * 1.5) {
    recommendations.push('Alert: High demand predicted - review emergency protocols');
    recommendations.push('Coordinate with insurance partners for potential claim surge');
  }

  return recommendations;
}

/**
 * Analyze demand by service type
 */
export function analyzeServiceTypeDemand(
  historicalData: HistoricalData[]
): Record<
  string,
  {
    totalCalls: number;
    averagePerDay: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    peakMonth: number;
  }
> {
  const serviceTypes = [
    'water-damage',
    'fire-damage',
    'mould',
    'storm-damage',
  ];
  const analysis: Record<string, any> = {};

  for (const serviceType of serviceTypes) {
    const serviceData = historicalData.filter(
      (d) => d.serviceType === serviceType
    );

    if (serviceData.length === 0) {continue;}

    const totalCalls = serviceData.reduce((sum, d) => sum + d.calls, 0);
    const averagePerDay = totalCalls / serviceData.length;

    // Calculate trend
    const recentData = serviceData.slice(-30);
    const olderData = serviceData.slice(-60, -30);

    const recentAvg =
      recentData.reduce((sum, d) => sum + d.calls, 0) / recentData.length;
    const olderAvg =
      olderData.reduce((sum, d) => sum + d.calls, 0) / olderData.length;

    let trend: 'increasing' | 'stable' | 'decreasing' = 'stable';
    if (recentAvg > olderAvg * 1.1) {trend = 'increasing';}
    else if (recentAvg < olderAvg * 0.9) {trend = 'decreasing';}

    // Find peak month
    const monthCounts: Record<number, number> = {};
    serviceData.forEach((d) => {
      const month = d.date.getMonth();
      monthCounts[month] = (monthCounts[month] || 0) + d.calls;
    });

    const peakMonth = parseInt(
      Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '0'
    );

    analysis[serviceType] = {
      totalCalls,
      averagePerDay,
      trend,
      peakMonth,
    };
  }

  return analysis;
}

/**
 * Predict emergency surge events
 */
export function predictSurgeEvents(
  historicalData: HistoricalData[],
  threshold: number = 2.0 // 2x average
): Array<{ date: Date; probability: number; expectedCalls: number }> {
  const avgCalls =
    historicalData.reduce((sum, d) => sum + d.calls, 0) /
    historicalData.length;

  const surgeEvents: Array<{
    date: Date;
    probability: number;
    expectedCalls: number;
  }> = [];

  // Analyze next 30 days
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const forecast = predictDayDemand(date, historicalData);

    if (forecast.predictedCalls > avgCalls * threshold) {
      surgeEvents.push({
        date,
        probability: forecast.confidence,
        expectedCalls: forecast.predictedCalls,
      });
    }
  }

  return surgeEvents;
}
