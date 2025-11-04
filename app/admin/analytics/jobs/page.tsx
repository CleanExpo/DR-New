'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/analytics/MetricCard';
import { JobPieChart } from '@/components/analytics/JobPieChart';
import { PerformanceBarChart } from '@/components/analytics/PerformanceBarChart';
import { RevenueLineChart } from '@/components/analytics/RevenueLineChart';
import {
  Briefcase,
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  BarChart3,
} from 'lucide-react';
import { formatDuration } from '@/lib/analytics-utils';

export default function JobAnalytics() {
  const [loading, setLoading] = useState(false);

  // Mock data
  const jobData = {
    summary: {
      totalJobs: 195,
      jobsChange: 8.5,
      avgDuration: 18.5,
      durationChange: -12.3,
      completionRate: 92.3,
      completionChange: 5.1,
      emergencyJobs: 34,
      emergencyChange: 15.2,
    },
    jobsByPriority: [
      { name: 'Emergency', value: 34, status: 'EMERGENCY' },
      { name: 'High', value: 58, status: 'HIGH' },
      { name: 'Medium', value: 67, status: 'MEDIUM' },
      { name: 'Low', value: 36, status: 'LOW' },
    ],
    jobsByLocation: [
      { name: 'Brisbane CBD', value: 42, lat: -27.4698, lng: 153.0251 },
      { name: 'Gold Coast', value: 35, lat: -28.0167, lng: 153.4000 },
      { name: 'Ipswich', value: 28, lat: -27.6119, lng: 152.7600 },
      { name: 'Logan', value: 24, lat: -27.6397, lng: 153.1097 },
      { name: 'Sunshine Coast', value: 20, lat: -26.6500, lng: 153.0667 },
      { name: 'Toowong', value: 15, lat: -27.4848, lng: 152.9899 },
      { name: 'West End', value: 12, lat: -27.4833, lng: 153.0081 },
      { name: 'New Farm', value: 10, lat: -27.4667, lng: 153.0500 },
      { name: 'Hamilton', value: 9, lat: -27.4392, lng: 153.0703 },
    ],
    completionRateTrend: [
      { name: 'Jan', value: 88.5 },
      { name: 'Feb', value: 89.2 },
      { name: 'Mar', value: 90.1 },
      { name: 'Apr', value: 89.8 },
      { name: 'May', value: 91.2 },
      { name: 'Jun', value: 91.8 },
      { name: 'Jul', value: 92.5 },
      { name: 'Aug', value: 91.9 },
      { name: 'Sep', value: 92.8 },
      { name: 'Oct', value: 93.2 },
      { name: 'Nov', value: 92.3 },
      { name: 'Dec', value: 92.7 },
    ],
    durationDistribution: [
      { name: '0-6 hrs', value: 24 },
      { name: '6-12 hrs', value: 42 },
      { name: '12-24 hrs', value: 58 },
      { name: '1-2 days', value: 35 },
      { name: '2-3 days', value: 22 },
      { name: '3-5 days', value: 10 },
      { name: '5+ days', value: 4 },
    ],
    jobTimeline: [
      {
        id: 'JOB-2024-195',
        name: 'Water Damage - Brisbane CBD',
        startDate: '2024-01-15',
        endDate: '2024-01-17',
        status: 'COMPLETED',
        duration: 2.5,
      },
      {
        id: 'JOB-2024-194',
        name: 'Fire Restoration - Gold Coast',
        startDate: '2024-01-14',
        endDate: '2024-01-18',
        status: 'IN_PROGRESS',
        duration: 4,
      },
      {
        id: 'JOB-2024-193',
        name: 'Mould Remediation - Ipswich',
        startDate: '2024-01-13',
        endDate: '2024-01-16',
        status: 'COMPLETED',
        duration: 3,
      },
      {
        id: 'JOB-2024-192',
        name: 'Biohazard Cleanup - Logan',
        startDate: '2024-01-12',
        endDate: '2024-01-13',
        status: 'COMPLETED',
        duration: 1,
      },
      {
        id: 'JOB-2024-191',
        name: 'Storm Damage - Sunshine Coast',
        startDate: '2024-01-11',
        endDate: '2024-01-15',
        status: 'COMPLETED',
        duration: 4,
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'IN_PROGRESS':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'SCHEDULED':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Job Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Job-specific insights and performance metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Jobs"
          value={jobData.summary.totalJobs}
          change={jobData.summary.jobsChange}
          icon={Briefcase}
          color="text-blue-600"
          description="All jobs"
          loading={loading}
        />
        <MetricCard
          title="Avg Duration"
          value={formatDuration(jobData.summary.avgDuration)}
          change={jobData.summary.durationChange}
          icon={Clock}
          color="text-purple-600"
          description="Time to complete"
          loading={loading}
        />
        <MetricCard
          title="Completion Rate"
          value={`${jobData.summary.completionRate}%`}
          change={jobData.summary.completionChange}
          icon={CheckCircle}
          color="text-green-600"
          description="Jobs completed on time"
          loading={loading}
        />
        <MetricCard
          title="Emergency Jobs"
          value={jobData.summary.emergencyJobs}
          change={jobData.summary.emergencyChange}
          icon={AlertTriangle}
          color="text-red-600"
          description="High priority jobs"
          loading={loading}
        />
      </div>

      {/* Job Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Recent Job Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
          ) : (
            <div className="space-y-3">
              {jobData.jobTimeline.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                        {job.id}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDuration(job.duration * 24)}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {job.name}
                  </h4>
                  <div className="relative">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>{new Date(job.startDate).toLocaleDateString('en-AU')}</span>
                      <span>{new Date(job.endDate).toLocaleDateString('en-AU')}</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          job.status === 'COMPLETED'
                            ? 'bg-green-500'
                            : job.status === 'IN_PROGRESS'
                            ? 'bg-blue-500'
                            : 'bg-purple-500'
                        }`}
                        style={{
                          width:
                            job.status === 'COMPLETED'
                              ? '100%'
                              : job.status === 'IN_PROGRESS'
                              ? '60%'
                              : '0%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Priority and Location Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <JobPieChart data={jobData.jobsByPriority} innerRadius={60} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Jobs by Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <div className="space-y-2 max-h-[350px] overflow-y-auto">
                {jobData.jobsByLocation.map((location, index) => (
                  <div
                    key={location.name}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {location.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {location.value} jobs
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Completion Rate and Duration Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Completion Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <RevenueLineChart
                data={jobData.completionRateTrend.map(d => ({
                  ...d,
                  total: d.value,
                }))}
                height={350}
                colors={{ total: '#10b981' }}
                showLegend={false}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Duration Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <PerformanceBarChart
                data={jobData.durationDistribution}
                orientation="vertical"
                gradientColors={true}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
