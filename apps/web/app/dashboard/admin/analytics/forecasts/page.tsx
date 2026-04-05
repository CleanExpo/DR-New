'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Forecast {
  period: string;
  predicted: number;
  confidence: number;
  lower: number;
  upper: number;
}

interface ForecastResult {
  metric: string;
  currentValue: number;
  forecasts: Forecast[];
  accuracy: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  riskFactors: string[];
}

interface ForecastData {
  success: boolean;
  summary: {
    currentRevenue: number;
    currentDemand: number;
  };
  forecasts: {
    revenue: ForecastResult;
    demand: ForecastResult;
  };
  insights: {
    revenueTrend: string;
    demandTrend: string;
    revenueForecastAccuracy: number;
    demandForecastAccuracy: number;
  };
  warnings: string[];
}

export default function ForecastsAnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [periods, setPeriods] = useState(3);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'ADMIN') {
        router.push('/dashboard');
      } else {
        fetchForecastData();
      }
    }
  }, [status, session, router]);

  const fetchForecastData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/analytics/forecast?periods=${periods}`);

      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const forecastData = await response.json();
      setData(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching forecast data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchForecastData();
    }
  }, [periods, status]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return '↑';
      case 'decreasing':
        return '↓';
      case 'stable':
        return '→';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-green-600';
      case 'decreasing':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-600';
    if (confidence >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading predictive analytics...</p>
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Predictive Analytics</h1>
            <p className="text-gray-400 mt-2">Revenue and demand forecasting with confidence intervals</p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex gap-2">
          {[3, 6, 9, 12].map((p) => (
            <button
              key={p}
              onClick={() => setPeriods(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colours ${
                periods === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p} Periods
            </button>
          ))}
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
            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Current Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.summary.currentRevenue.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Current Demand</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.summary.currentDemand.toLocaleString('en-AU')} jobs
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Revenue Forecast Accuracy</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.insights.revenueForecastAccuracy.toFixed(1)}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full ${getConfidenceColor(data.insights.revenueForecastAccuracy)}`}
                    style={{ width: `${data.insights.revenueForecastAccuracy}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Demand Forecast Accuracy</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.insights.demandForecastAccuracy.toFixed(1)}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full ${getConfidenceColor(data.insights.demandForecastAccuracy)}`}
                    style={{ width: `${data.insights.demandForecastAccuracy}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Revenue Forecast Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Revenue Forecast</h2>
                  <p className="text-sm text-gray-400 mt-1">Predicted revenue for upcoming periods</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 font-medium">Trend</p>
                  <p className={`text-2xl font-bold ${getTrendColor(data.forecasts.revenue.trend)}`}>
                    {getTrendIcon(data.forecasts.revenue.trend)} {data.forecasts.revenue.trend}
                  </p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="space-y-4 mb-6">
                {data.forecasts.revenue.forecasts.map((forecast, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">{forecast.period}</span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${forecast.predicted.toLocaleString('en-AU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-xs text-gray-400">
                          {forecast.confidence.toFixed(1)}% confidence
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full ${getConfidenceColor(forecast.confidence)}`}
                        style={{ width: `${forecast.confidence}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>
                        Lower: ${forecast.lower.toLocaleString('en-AU', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span>
                        Upper: ${forecast.upper.toLocaleString('en-AU', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Revenue Risk Factors */}
              {data.forecasts.revenue.riskFactors.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-800 mb-2">Risk Factors</p>
                  <ul className="space-y-1">
                    {data.forecasts.revenue.riskFactors.map((risk, idx) => (
                      <li key={idx} className="text-xs text-yellow-700">
                        • {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Demand Forecast Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Demand Forecast</h2>
                  <p className="text-sm text-gray-400 mt-1">Predicted job demand for upcoming periods</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 font-medium">Trend</p>
                  <p className={`text-2xl font-bold ${getTrendColor(data.forecasts.demand.trend)}`}>
                    {getTrendIcon(data.forecasts.demand.trend)} {data.forecasts.demand.trend}
                  </p>
                </div>
              </div>

              {/* Demand Chart */}
              <div className="space-y-4 mb-6">
                {data.forecasts.demand.forecasts.map((forecast, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">{forecast.period}</span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {forecast.predicted.toLocaleString('en-AU')} jobs
                        </p>
                        <p className="text-xs text-gray-400">
                          {forecast.confidence.toFixed(1)}% confidence
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full ${getConfidenceColor(forecast.confidence)}`}
                        style={{ width: `${forecast.confidence}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>
                        Lower: {forecast.lower.toLocaleString('en-AU', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} jobs
                      </span>
                      <span>
                        Upper: {forecast.upper.toLocaleString('en-AU', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} jobs
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Demand Risk Factors */}
              {data.forecasts.demand.riskFactors.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-800 mb-2">Risk Factors</p>
                  <ul className="space-y-1">
                    {data.forecasts.demand.riskFactors.map((risk, idx) => (
                      <li key={idx} className="text-xs text-yellow-700">
                        • {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Forecast Details Table */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Forecast Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Predicted Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Confidence
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Range (95% CI)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.forecasts.revenue.forecasts.map((forecast, idx) => (
                      <tr key={`revenue-${idx}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Revenue
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {forecast.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          ${forecast.predicted.toLocaleString('en-AU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${getConfidenceColor(forecast.confidence)}`}
                                style={{ width: `${forecast.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{forecast.confidence.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          ${forecast.lower.toLocaleString('en-AU')} - ${forecast.upper.toLocaleString('en-AU')}
                        </td>
                      </tr>
                    ))}
                    {data.forecasts.demand.forecasts.map((forecast, idx) => (
                      <tr key={`demand-${idx}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Demand
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {forecast.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {forecast.predicted.toLocaleString('en-AU')} jobs
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${getConfidenceColor(forecast.confidence)}`}
                                style={{ width: `${forecast.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{forecast.confidence.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {Math.round(forecast.lower)} - {Math.round(forecast.upper)} jobs
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Revenue Trends</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className={`text-2xl mr-2 ${getTrendColor(data.forecasts.revenue.trend)}`}>
                        {getTrendIcon(data.forecasts.revenue.trend)}
                      </span>
                      <span className="text-sm text-gray-400">
                        Revenue is{' '}
                        <span className={`font-medium ${getTrendColor(data.forecasts.revenue.trend)}`}>
                          {data.forecasts.revenue.trend}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Current: ${data.forecasts.revenue.currentValue.toLocaleString('en-AU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-400">
                      Next period: ${data.forecasts.revenue.forecasts[0]?.predicted.toLocaleString('en-AU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Demand Trends</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className={`text-2xl mr-2 ${getTrendColor(data.forecasts.demand.trend)}`}>
                        {getTrendIcon(data.forecasts.demand.trend)}
                      </span>
                      <span className="text-sm text-gray-400">
                        Demand is{' '}
                        <span className={`font-medium ${getTrendColor(data.forecasts.demand.trend)}`}>
                          {data.forecasts.demand.trend}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Current: {data.forecasts.demand.currentValue.toLocaleString('en-AU')} jobs
                    </p>
                    <p className="text-xs text-gray-400">
                      Next period: {data.forecasts.demand.forecasts[0]?.predicted.toLocaleString('en-AU')} jobs
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Accuracy Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">Revenue Forecast Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.insights.revenueForecastAccuracy.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {data.insights.revenueForecastAccuracy >= 80
                        ? 'High confidence forecast'
                        : data.insights.revenueForecastAccuracy >= 60
                          ? 'Moderate confidence forecast'
                          : 'Low confidence - consider additional data'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">Demand Forecast Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.insights.demandForecastAccuracy.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {data.insights.demandForecastAccuracy >= 80
                        ? 'High confidence forecast'
                        : data.insights.demandForecastAccuracy >= 60
                          ? 'Moderate confidence forecast'
                          : 'Low confidence - consider additional data'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Warnings */}
              {data.warnings.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Warnings & Risk Factors</h3>
                  <ul className="space-y-1">
                    {data.warnings.map((warning, idx) => (
                      <li key={idx} className="text-xs text-red-700">
                        • {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
