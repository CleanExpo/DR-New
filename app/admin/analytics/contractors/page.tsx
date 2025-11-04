'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/analytics/MetricCard';
import { JobPieChart } from '@/components/analytics/JobPieChart';
import { PerformanceBarChart } from '@/components/analytics/PerformanceBarChart';
import {
  Users,
  Star,
  Clock,
  TrendingUp,
  MapPin,
  Award,
} from 'lucide-react';
import { formatCurrency, formatDuration } from '@/lib/analytics-utils';

export default function ContractorAnalytics() {
  const [loading, setLoading] = useState(false);

  // Mock data
  const contractorData = {
    summary: {
      totalContractors: 28,
      contractorsChange: 8.3,
      avgRating: 4.7,
      ratingChange: 2.1,
      avgResponseTime: 1.5,
      responseChange: -12.3,
      utilizationRate: 78,
      utilizationChange: 5.4,
    },
    leaderboard: {
      byJobs: [
        { name: 'John Smith', value: 23, rating: 4.9, revenue: 87500, responseTime: 1.2 },
        { name: 'Sarah Johnson', value: 21, rating: 4.8, revenue: 82000, responseTime: 1.4 },
        { name: 'Mike Williams', value: 19, rating: 4.7, revenue: 75000, responseTime: 1.3 },
        { name: 'Emma Brown', value: 17, rating: 4.9, revenue: 68000, responseTime: 1.1 },
        { name: 'David Jones', value: 15, rating: 4.6, revenue: 62000, responseTime: 1.6 },
        { name: 'Lisa Davis', value: 14, rating: 4.8, revenue: 58000, responseTime: 1.5 },
        { name: 'Tom Wilson', value: 12, rating: 4.5, revenue: 52000, responseTime: 1.8 },
        { name: 'Rachel Lee', value: 11, rating: 4.7, revenue: 48000, responseTime: 1.4 },
        { name: 'Chris Taylor', value: 10, rating: 4.6, revenue: 45000, responseTime: 1.7 },
        { name: 'Amy Martin', value: 9, rating: 4.8, revenue: 42000, responseTime: 1.3 },
      ],
      byRevenue: [
        { name: 'John Smith', value: 87500, jobs: 23, rating: 4.9 },
        { name: 'Sarah Johnson', value: 82000, jobs: 21, rating: 4.8 },
        { name: 'Mike Williams', value: 75000, jobs: 19, rating: 4.7 },
        { name: 'Emma Brown', value: 68000, jobs: 17, rating: 4.9 },
        { name: 'David Jones', value: 62000, jobs: 15, rating: 4.6 },
        { name: 'Lisa Davis', value: 58000, jobs: 14, rating: 4.8 },
        { name: 'Tom Wilson', value: 52000, jobs: 12, rating: 4.5 },
        { name: 'Rachel Lee', value: 48000, jobs: 11, rating: 4.7 },
        { name: 'Chris Taylor', value: 45000, jobs: 10, rating: 4.6 },
        { name: 'Amy Martin', value: 42000, jobs: 9, rating: 4.8 },
      ],
      byRating: [
        { name: 'John Smith', value: 4.9, jobs: 23, revenue: 87500 },
        { name: 'Emma Brown', value: 4.9, jobs: 17, revenue: 68000 },
        { name: 'Sarah Johnson', value: 4.8, jobs: 21, revenue: 82000 },
        { name: 'Lisa Davis', value: 4.8, jobs: 14, revenue: 58000 },
        { name: 'Amy Martin', value: 4.8, jobs: 9, revenue: 42000 },
        { name: 'Mike Williams', value: 4.7, jobs: 19, revenue: 75000 },
        { name: 'Rachel Lee', value: 4.7, jobs: 11, revenue: 48000 },
        { name: 'David Jones', value: 4.6, jobs: 15, revenue: 62000 },
        { name: 'Chris Taylor', value: 4.6, jobs: 10, revenue: 45000 },
        { name: 'Tom Wilson', value: 4.5, jobs: 12, revenue: 52000 },
      ],
    },
    subscriptionDistribution: [
      { name: '25km Tier', value: 8, status: 'TIER_25KM' },
      { name: '50km Tier', value: 12, status: 'TIER_50KM' },
      { name: '100km Tier', value: 6, status: 'TIER_100KM' },
      { name: 'Rural Tier', value: 2, status: 'TIER_RURAL' },
    ],
    utilizationData: [
      { name: 'John Smith', value: 23 },
      { name: 'Sarah Johnson', value: 21 },
      { name: 'Mike Williams', value: 19 },
      { name: 'Emma Brown', value: 17 },
      { name: 'David Jones', value: 15 },
      { name: 'Lisa Davis', value: 14 },
      { name: 'Tom Wilson', value: 12 },
      { name: 'Rachel Lee', value: 11 },
      { name: 'Chris Taylor', value: 10 },
      { name: 'Amy Martin', value: 9 },
      { name: 'Steve Anderson', value: 8 },
      { name: 'Kate Thompson', value: 7 },
    ],
  };

  const [selectedView, setSelectedView] = useState<'jobs' | 'revenue' | 'rating'>('jobs');

  const getLeaderboardData = () => {
    switch (selectedView) {
      case 'revenue':
        return contractorData.leaderboard.byRevenue;
      case 'rating':
        return contractorData.leaderboard.byRating;
      default:
        return contractorData.leaderboard.byJobs;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Contractor Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Performance metrics and contractor management insights
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Contractors"
          value={contractorData.summary.totalContractors}
          change={contractorData.summary.contractorsChange}
          icon={Users}
          color="text-blue-600"
          description="Active contractors"
          loading={loading}
        />
        <MetricCard
          title="Average Rating"
          value={contractorData.summary.avgRating.toFixed(1)}
          change={contractorData.summary.ratingChange}
          icon={Star}
          color="text-yellow-600"
          description="Out of 5.0"
          loading={loading}
        />
        <MetricCard
          title="Avg Response Time"
          value={formatDuration(contractorData.summary.avgResponseTime)}
          change={contractorData.summary.responseChange}
          icon={Clock}
          color="text-green-600"
          description="Time to accept job"
          loading={loading}
        />
        <MetricCard
          title="Utilization Rate"
          value={`${contractorData.summary.utilizationRate}%`}
          change={contractorData.summary.utilizationChange}
          icon={TrendingUp}
          color="text-purple-600"
          description="Contractor capacity used"
          loading={loading}
        />
      </div>

      {/* Contractor Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Contractor Leaderboard
            </CardTitle>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedView('jobs')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedView === 'jobs'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                By Jobs
              </button>
              <button
                onClick={() => setSelectedView('revenue')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedView === 'revenue'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                By Revenue
              </button>
              <button
                onClick={() => setSelectedView('rating')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedView === 'rating'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                By Rating
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
          ) : (
            <div className="space-y-2">
              {getLeaderboardData().map((contractor, index) => (
                <div
                  key={contractor.name}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                        index === 0
                          ? 'bg-yellow-500'
                          : index === 1
                          ? 'bg-gray-400'
                          : index === 2
                          ? 'bg-orange-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {contractor.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {selectedView !== 'jobs' && (
                          <span>{contractor.jobs} jobs</span>
                        )}
                        {selectedView !== 'revenue' && (
                          <span>{formatCurrency(contractor.revenue)}</span>
                        )}
                        {selectedView !== 'rating' && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {contractor.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {selectedView === 'revenue'
                        ? formatCurrency(contractor.value)
                        : selectedView === 'rating'
                        ? contractor.value.toFixed(1)
                        : contractor.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedView === 'revenue'
                        ? 'Total Revenue'
                        : selectedView === 'rating'
                        ? 'Rating'
                        : 'Completed Jobs'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Distribution and Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Subscription Tier Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <div className="space-y-4">
                <JobPieChart
                  data={contractorData.subscriptionDistribution}
                  height={250}
                  innerRadius={60}
                />
                <div className="space-y-2">
                  {contractorData.subscriptionDistribution.map((tier) => (
                    <div
                      key={tier.name}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {tier.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {tier.value} contractors
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contractor Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <PerformanceBarChart
                data={contractorData.utilizationData}
                orientation="horizontal"
                gradientColors={true}
                height={380}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
