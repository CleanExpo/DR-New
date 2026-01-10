'use client';

/**
 * Contractor Analytics Dashboard
 *
 * Individual contractor performance metrics and insights
 * Shows job history, ratings, revenue, and specializations
 */

import React, { useState, useEffect } from 'react';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { Sparkline } from '@/components/charts/Sparkline';
import { TrendIndicator } from '@/components/visualizations/TrendIndicator';
import { TimeSeriesPoint, CategoryPoint, PieData } from '@/lib/charts/chart-types';
import { chartColors } from '@/lib/charts/chart-config';
import { Star, Clock, DollarSign, AlertCircle } from 'lucide-react';

export default function ContractorAnalyticsDashboardPage() {
  const [revenueData, setRevenueData] = useState<TimeSeriesPoint[]>([]);
  const [jobCompletionData, setJobCompletionData] = useState<CategoryPoint[]>([]);
  const [specializationData, setSpecializationData] = useState<PieData[]>([]);
  const [ratingTrend, setRatingTrend] = useState<number[]>([]);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mock data
  useEffect(() => {
    setIsLoading(true);

    // Revenue by month
    const today = new Date();
    const revenue = Array.from({ length: 12 }, (_, i) => ({
      date: new Date(today.getFullYear(), i, 1),
      value: Math.floor(Math.random() * 10000) + 20000 + i * 500,
    }));

    // Jobs by type
    const jobsByType: CategoryPoint[] = [
      { category: 'Water Damage', value: 45 },
      { category: 'Fire Restoration', value: 32 },
      { category: 'Mold Remediation', value: 28 },
      { category: 'Biohazard', value: 8 },
    ];

    // Specialization breakdown
    const specializations: PieData[] = [
      { name: 'Water Damage', value: 45, color: chartColors.services.water },
      { name: 'Fire Restoration', value: 32, color: chartColors.services.fire },
      { name: 'Mold Remediation', value: 28, color: chartColors.services.mold },
      { name: 'Biohazard', value: 8, color: chartColors.services.biohazard },
    ];

    // Rating trend (0-5 scale)
    const ratings = Array.from({ length: 30 }, () => Math.random() * 0.5 + 4.2);

    // Response times (minutes)
    const times = Array.from({ length: 24 }, () => Math.random() * 10 + 15);

    setRevenueData(revenue);
    setJobCompletionData(jobsByType);
    setSpecializationData(specializations);
    setRatingTrend(ratings);
    setResponseTimes(times);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
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
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              👨‍🔧
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">John Smith</h1>
              <p className="text-gray-600">IICRC Professional • Sydney, NSW</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Average Rating</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8/5.0</p>
            <p className="text-xs text-gray-600">Based on 127 reviews</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Avg Response</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">18 min</p>
            <div className="mt-2">
              <Sparkline
                data={responseTimes}
                width={200}
                height={30}
                color={chartColors.primary}
                showCurve={true}
                showDots={false}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Month Revenue</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$24,500</p>
            <p className="text-xs text-green-600">+15% vs last month</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Jobs (30d)</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">113</p>
            <p className="text-xs text-gray-600">Completion rate: 98.2%</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h2>
            <LineChart
              data={revenueData}
              color={chartColors.success}
              showDots={true}
              dotSize={4}
              showGrid={true}
              xAxisLabel="Month"
              yAxisLabel="Revenue (AUD)"
              height={300}
            />
          </div>

          {/* Rating Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Rating Trend (30 Days)</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-yellow-600">Based on latest reviews</p>
              </div>
              <Sparkline
                data={ratingTrend}
                width={150}
                height={50}
                color={chartColors.primary}
                showCurve={true}
                showDots={false}
              />
            </div>
          </div>

          {/* Jobs by Type */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jobs by Type</h2>
            <BarChart
              data={jobCompletionData}
              color={chartColors.primary}
              showValue={true}
              orientation="vertical"
              yAxisLabel="Jobs Completed"
            />
          </div>

          {/* Specialization */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Specialization Breakdown</h2>
            <PieChart
              data={specializationData}
              showPercentage={true}
              showLegend={true}
            />
          </div>
        </div>

        {/* Performance Trends */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <TrendIndicator
                current={95}
                previous={92}
                label="Completion Rate"
                format="percent"
                higherIsBetter={true}
              />
              <TrendIndicator
                current={18}
                previous={22}
                label="Avg Response Time"
                unit="minutes"
                format="number"
                higherIsBetter={false}
              />
              <TrendIndicator
                current={24500}
                previous={21300}
                label="Monthly Revenue"
                format="currency"
                higherIsBetter={true}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-lg">✓</span>
                <div>
                  <p className="font-medium text-gray-900">IICRC Professional</p>
                  <p className="text-xs text-gray-600">Expires: Jun 30, 2025</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">✓</span>
                <div>
                  <p className="font-medium text-gray-900">Water Damage Specialist</p>
                  <p className="text-xs text-gray-600">Expires: Dec 15, 2025</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">✓</span>
                <div>
                  <p className="font-medium text-gray-900">Mold Remediation Expert</p>
                  <p className="text-xs text-gray-600">Expires: Mar 30, 2026</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
          <p><strong>Last updated:</strong> {new Date().toLocaleString('en-AU')}</p>
        </div>
      </div>
    </div>
  );
}
