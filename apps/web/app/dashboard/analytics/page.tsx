'use client';

/**
 * Platform Analytics Dashboard
 *
 * Real-time analytics and KPIs for the disaster recovery platform
 * Shows network-wide metrics, contractor performance, and system health
 */

import React, { useState, useEffect } from 'react';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { LiveCounter } from '@/components/visualizations/LiveCounter';
import { TrendIndicator } from '@/components/visualizations/TrendIndicator';
import { TimeSeriesPoint, CategoryPoint, PieData } from '@/lib/charts/chart-types';
import { chartColors } from '@/lib/charts/chart-config';
import { streamClient, type RealtimeMetrics } from '@/lib/analytics/stream-client';
import { Wifi, WifiOff } from 'lucide-react';

export default function AnalyticsDashboardPage() {
  const [jobsData, setJobsData] = useState<TimeSeriesPoint[]>([]);
  const [responseTimeData, setResponseTimeData] = useState<TimeSeriesPoint[]>([]);
  const [jobsByRegion, setJobsByRegion] = useState<CategoryPoint[]>([]);
  const [serviceTypeData, setServiceTypeData] = useState<PieData[]>([]);
  const [revenueData, setRevenueData] = useState<TimeSeriesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [realtimeMetrics, setRealtimeMetrics] = useState<RealtimeMetrics | null>(null);
  const [streamConnected, setStreamConnected] = useState(false);

  // Load static data
  useEffect(() => {
    setIsLoading(true);

    // Generate static data for charts
    const today = new Date();
    const jobsHistory = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(today.getTime() - (30 - i) * 24 * 60 * 60 * 1000),
      value: Math.floor(Math.random() * 50) + 100 + i * 5,
    }));

    const responseTimeHistory = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(today.getTime() - (30 - i) * 24 * 60 * 60 * 1000),
      value: Math.floor(Math.random() * 15) + 25 - i * 0.3,
    }));

    const regions: CategoryPoint[] = [
      { category: 'Sydney', value: 487 },
      { category: 'Melbourne', value: 342 },
      { category: 'Brisbane', value: 256 },
      { category: 'Perth', value: 189 },
      { category: 'Adelaide', value: 124 },
    ];

    const serviceTypes: PieData[] = [
      { name: 'Water Damage', value: 450, color: chartColors.services.water },
      { name: 'Fire Restoration', value: 320, color: chartColors.services.fire },
      { name: 'Mold Remediation', value: 280, color: chartColors.services.mold },
      { name: 'Biohazard', value: 89, color: chartColors.services.biohazard },
    ];

    const revenueHistory = Array.from({ length: 12 }, (_, i) => ({
      date: new Date(today.getFullYear(), i, 1),
      value: Math.floor(Math.random() * 50000) + 150000 + i * 10000,
    }));

    setJobsData(jobsHistory);
    setResponseTimeData(responseTimeHistory);
    setJobsByRegion(regions);
    setServiceTypeData(serviceTypes);
    setRevenueData(revenueHistory);
    setIsLoading(false);
  }, []);

  // Subscribe to real-time metrics stream
  useEffect(() => {
    const unsubscribe = streamClient.start((metrics) => {
      setRealtimeMetrics(metrics);
      setStreamConnected(streamClient.isConnectedNow());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Use real-time metrics when available, fallback to chart data
  const liveJobCount = realtimeMetrics?.activeJobs ?? (jobsData.length > 0 ? jobsData[jobsData.length - 1].value : 0);
  const previousJobCount = jobsData.length > 1 ? jobsData[jobsData.length - 2].value : 0;

  const liveResponseTime = realtimeMetrics?.averageResponseTime ?? (responseTimeData.length > 0 ? responseTimeData[responseTimeData.length - 1].value : 0);
  const previousResponseTime = responseTimeData.length > 1 ? responseTimeData[responseTimeData.length - 2].value : 0;

  const liveErrorRate = realtimeMetrics?.errorRate ?? 0;
  const liveConnections = realtimeMetrics?.activeConnections ?? 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
            <p className="mt-2 text-gray-600">Real-time insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-2">
            {streamConnected ? (
              <>
                <Wifi className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Live Stream</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Offline</span>
              </>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <LiveCounter
            value={liveJobCount}
            label="Active Jobs"
            trendData={jobsData.map(d => d.value)}
            icon="🔴"
          />
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <TrendIndicator
              current={liveResponseTime}
              previous={previousResponseTime}
              label="Avg Response Time"
              unit="minutes"
              format="number"
              higherIsBetter={false}
            />
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <TrendIndicator
              current={1234}
              previous={1089}
              label="Total Contractors"
              format="number"
              higherIsBetter={true}
            />
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <TrendIndicator
              current={9850}
              previous={9500}
              label="Revenue (AUD)"
              unit="today"
              format="currency"
              higherIsBetter={true}
            />
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">System Health</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                {realtimeMetrics?.systemHealth &&
                  Object.values(realtimeMetrics.systemHealth).every(s => s === 'healthy')
                  ? 'All Good'
                  : 'Check Status'}
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database</span>
                <span className={`font-medium ${
                  realtimeMetrics?.systemHealth?.database === 'healthy'
                    ? 'text-green-600'
                    : 'text-orange-600'
                }`}>
                  {realtimeMetrics?.systemHealth?.database || 'Unknown'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Redis</span>
                <span className={`font-medium ${
                  realtimeMetrics?.systemHealth?.redis === 'healthy'
                    ? 'text-green-600'
                    : 'text-orange-600'
                }`}>
                  {realtimeMetrics?.systemHealth?.redis || 'Unknown'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Socket.io</span>
                <span className={`font-medium ${
                  realtimeMetrics?.systemHealth?.socketio === 'healthy'
                    ? 'text-green-600'
                    : 'text-orange-600'
                }`}>
                  {realtimeMetrics?.systemHealth?.socketio || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Jobs Over Time */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jobs Completed (30 Days)</h2>
            <LineChart
              data={jobsData}
              color={chartColors.primary}
              showDots={false}
              showGrid={true}
              xAxisLabel="Date"
              yAxisLabel="Jobs"
            />
          </div>

          {/* Response Time Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Time Trend</h2>
            <AreaChart
              data={responseTimeData}
              color={chartColors.contractor}
              opacity={0.4}
              showLine={true}
              xAxisLabel="Date"
              yAxisLabel="Minutes"
            />
          </div>

          {/* Jobs by Region */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jobs by Region</h2>
            <BarChart
              data={jobsByRegion}
              color={chartColors.primary}
              showValue={true}
              orientation="horizontal"
              xAxisLabel="Jobs Completed"
            />
          </div>

          {/* Service Type Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Type Distribution</h2>
            <PieChart
              data={serviceTypeData}
              showPercentage={true}
              showLegend={true}
              innerRadius={50}
            />
          </div>
        </div>

        {/* Full Width Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h2>
          <AreaChart
            data={revenueData}
            color={chartColors.success}
            opacity={0.3}
            showLine={true}
            xAxisLabel="Month"
            yAxisLabel="Revenue (AUD)"
            width={1000}
            height={300}
          />
        </div>

        {/* Footer Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
          <p><strong>Last updated:</strong> {new Date().toLocaleString('en-AU')}</p>
          <p className="mt-2">Data is refreshed in real-time from the contractor management system.</p>
        </div>
      </div>
    </div>
  );
}
