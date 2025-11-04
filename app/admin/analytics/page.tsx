'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/analytics/MetricCard';
import { RevenueLineChart } from '@/components/analytics/RevenueLineChart';
import { JobPieChart } from '@/components/analytics/JobPieChart';
import { PerformanceBarChart } from '@/components/analytics/PerformanceBarChart';
import { AreaChartComponent } from '@/components/analytics/AreaChartComponent';
import { FilterPanel } from '@/components/analytics/FilterPanel';
import {
  DollarSign,
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  Activity,
} from 'lucide-react';
import {
  formatCurrency,
  formatDuration,
  generateMockRevenueData,
  exportToCSV,
  formatActivityTime,
} from '@/lib/analytics-utils';

interface FilterValues {
  contractors: string[];
  serviceTypes: string[];
  statuses: string[];
  dateRange?: { from: Date; to: Date };
}

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterValues>({
    contractors: [],
    serviceTypes: [],
    statuses: [],
  });

  // Mock data - replace with API calls
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      totalRevenue: 487500,
      revenueChange: 12.5,
      activeJobs: 34,
      jobsChange: -5.2,
      totalContractors: 28,
      contractorsChange: 8.3,
      avgCompletionTime: 18.5,
      completionChange: -15.4,
    },
    revenueData: generateMockRevenueData(12),
    jobStatusData: [
      { name: 'Draft', value: 8, status: 'DRAFT' },
      { name: 'Scheduled', value: 12, status: 'SCHEDULED' },
      { name: 'In Progress', value: 14, status: 'IN_PROGRESS' },
      { name: 'Completed', value: 156, status: 'COMPLETED' },
      { name: 'Cancelled', value: 5, status: 'CANCELLED' },
    ],
    jobsByServiceType: [
      { name: 'Water Damage', value: 67 },
      { name: 'Fire Restoration', value: 45 },
      { name: 'Mould Remediation', value: 34 },
      { name: 'Biohazard', value: 12 },
      { name: 'Storm Damage', value: 28 },
      { name: 'Sewage Cleanup', value: 15 },
      { name: 'Commercial', value: 22 },
    ],
    contractorPerformance: [
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
    ],
    monthlyTrends: [
      { name: 'Jan', created: 18, completed: 15 },
      { name: 'Feb', created: 22, completed: 19 },
      { name: 'Mar', created: 25, completed: 23 },
      { name: 'Apr', created: 20, completed: 21 },
      { name: 'May', created: 28, completed: 25 },
      { name: 'Jun', created: 30, completed: 28 },
      { name: 'Jul', created: 26, completed: 27 },
      { name: 'Aug', created: 24, completed: 25 },
      { name: 'Sep', created: 29, completed: 26 },
      { name: 'Oct', created: 32, completed: 30 },
      { name: 'Nov', created: 28, completed: 29 },
      { name: 'Dec', created: 25, completed: 24 },
    ],
    recentActivity: [
      {
        id: 1,
        timestamp: new Date(Date.now() - 5 * 60000),
        user: 'Admin User',
        action: 'Job Created',
        description: 'Water damage job #JOB-2024-156',
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 15 * 60000),
        user: 'John Smith',
        action: 'Job Completed',
        description: 'Fire restoration job #JOB-2024-155',
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 30 * 60000),
        user: 'Admin User',
        action: 'Contractor Added',
        description: 'New contractor: Michael Brown',
      },
      {
        id: 4,
        timestamp: new Date(Date.now() - 60 * 60000),
        user: 'Sarah Johnson',
        action: 'Job Updated',
        description: 'Mould remediation job #JOB-2024-154',
      },
      {
        id: 5,
        timestamp: new Date(Date.now() - 120 * 60000),
        user: 'Admin User',
        action: 'Payment Received',
        description: 'Payment for job #JOB-2024-153 - $4,500',
      },
    ],
  });

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleExport = () => {
    // Export dashboard data to CSV
    const exportData = dashboardData.recentActivity.map(activity => ({
      Timestamp: activity.timestamp.toLocaleString('en-AU'),
      User: activity.user,
      Action: activity.action,
      Description: activity.description,
    }));

    exportToCSV(exportData, `analytics-dashboard-${new Date().toISOString().split('T')[0]}`);
  };

  const filterConfig = {
    contractors: [
      { value: '1', label: 'John Smith' },
      { value: '2', label: 'Sarah Johnson' },
      { value: '3', label: 'Mike Williams' },
    ],
    serviceTypes: [
      { value: 'WATER_DAMAGE', label: 'Water Damage' },
      { value: 'FIRE_RESTORATION', label: 'Fire Restoration' },
      { value: 'MOULD_REMEDIATION', label: 'Mould Remediation' },
    ],
    statuses: [
      { value: 'DRAFT', label: 'Draft' },
      { value: 'SCHEDULED', label: 'Scheduled' },
      { value: 'IN_PROGRESS', label: 'In Progress' },
      { value: 'COMPLETED', label: 'Completed' },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Comprehensive business intelligence and reporting
        </p>
      </div>

      {/* Filters */}
      <FilterPanel
        config={filterConfig}
        values={filters}
        onChange={setFilters}
        onExport={handleExport}
        loading={loading}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(dashboardData.kpis.totalRevenue)}
          change={dashboardData.kpis.revenueChange}
          icon={DollarSign}
          color="text-green-600"
          description="Year to date"
          loading={loading}
        />
        <MetricCard
          title="Active Jobs"
          value={dashboardData.kpis.activeJobs}
          change={dashboardData.kpis.jobsChange}
          icon={Briefcase}
          color="text-blue-600"
          description="Currently in progress"
          loading={loading}
        />
        <MetricCard
          title="Contractors"
          value={dashboardData.kpis.totalContractors}
          change={dashboardData.kpis.contractorsChange}
          icon={Users}
          color="text-purple-600"
          description="Active contractors"
          loading={loading}
        />
        <MetricCard
          title="Avg Completion Time"
          value={formatDuration(dashboardData.kpis.avgCompletionTime)}
          change={dashboardData.kpis.completionChange}
          icon={Clock}
          color="text-orange-600"
          description="Time to complete jobs"
          loading={loading}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <RevenueLineChart data={dashboardData.revenueData} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Job Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <JobPieChart data={dashboardData.jobStatusData} innerRadius={60} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Service Type</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <PerformanceBarChart
                data={dashboardData.jobsByServiceType}
                orientation="horizontal"
                gradientColors={true}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Contractor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <PerformanceBarChart
                data={dashboardData.contractorPerformance}
                orientation="horizontal"
                gradientColors={true}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Job Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <AreaChartComponent
                data={dashboardData.monthlyTrends}
                dataKeys={[
                  { key: 'created', name: 'Jobs Created', color: '#3b82f6' },
                  { key: 'completed', name: 'Jobs Completed', color: '#10b981' },
                ]}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))
              ) : (
                dashboardData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.description}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatActivityTime(activity.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        By {activity.user}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
