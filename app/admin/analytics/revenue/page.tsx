'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/analytics/MetricCard';
import { RevenueLineChart } from '@/components/analytics/RevenueLineChart';
import { JobPieChart } from '@/components/analytics/JobPieChart';
import { AreaChartComponent } from '@/components/analytics/AreaChartComponent';
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  PiggyBank,
} from 'lucide-react';
import {
  formatCurrency,
  generateMockRevenueData,
} from '@/lib/analytics-utils';

export default function RevenueAnalytics() {
  const [loading, setLoading] = useState(false);

  // Mock data
  const revenueData = {
    summary: {
      totalRevenue: 487500,
      revenueChange: 12.5,
      subscriptions: 168000,
      subscriptionsChange: 8.3,
      jobPayments: 289500,
      jobPaymentsChange: 15.2,
      outstanding: 42000,
      outstandingChange: -5.1,
      refunded: 12000,
      refundedChange: 3.2,
      netProfit: 365000,
      profitChange: 14.8,
    },
    revenueBreakdown: generateMockRevenueData(30).map(item => ({
      ...item,
      name: item.name.split(' ')[0], // Just month abbreviation
    })),
    paymentMethods: [
      { name: 'Credit Card', value: 245000, status: 'CREDIT_CARD' },
      { name: 'Bank Transfer', value: 189500, status: 'BANK_TRANSFER' },
      { name: 'Direct Debit', value: 53000, status: 'DIRECT_DEBIT' },
    ],
    topRevenueGenerators: [
      { name: 'Brisbane CBD', revenue: 87500, jobs: 45 },
      { name: 'Gold Coast', revenue: 72000, jobs: 38 },
      { name: 'Ipswich', revenue: 65000, jobs: 42 },
      { name: 'Logan', revenue: 58000, jobs: 35 },
      { name: 'Sunshine Coast', revenue: 52000, jobs: 28 },
      { name: 'Toowong', revenue: 45000, jobs: 24 },
      { name: 'West End', revenue: 38000, jobs: 22 },
      { name: 'New Farm', revenue: 32000, jobs: 18 },
      { name: 'Bulimba', revenue: 28000, jobs: 16 },
      { name: 'Hamilton', revenue: 24500, jobs: 14 },
    ],
    forecastData: [
      { name: 'Jan', actual: 38000, forecast: 35000 },
      { name: 'Feb', actual: 42000, forecast: 38000 },
      { name: 'Mar', actual: 45000, forecast: 42000 },
      { name: 'Apr', actual: 41000, forecast: 43000 },
      { name: 'May', actual: 48000, forecast: 45000 },
      { name: 'Jun', actual: 52000, forecast: 48000 },
      { name: 'Jul', actual: 49000, forecast: 50000 },
      { name: 'Aug', forecast: 52000 },
      { name: 'Sep', forecast: 55000 },
      { name: 'Oct', forecast: 58000 },
      { name: 'Nov', forecast: 60000 },
      { name: 'Dec', forecast: 62000 },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Revenue Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Deep dive into financial metrics and revenue streams
        </p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(revenueData.summary.totalRevenue)}
          change={revenueData.summary.revenueChange}
          icon={DollarSign}
          color="text-green-600"
          description="All revenue sources"
          loading={loading}
        />
        <MetricCard
          title="Subscription Revenue"
          value={formatCurrency(revenueData.summary.subscriptions)}
          change={revenueData.summary.subscriptionsChange}
          icon={RefreshCw}
          color="text-blue-600"
          description="Recurring revenue"
          loading={loading}
        />
        <MetricCard
          title="Job Payments"
          value={formatCurrency(revenueData.summary.jobPayments)}
          change={revenueData.summary.jobPaymentsChange}
          icon={CreditCard}
          color="text-purple-600"
          description="One-time payments"
          loading={loading}
        />
        <MetricCard
          title="Outstanding"
          value={formatCurrency(revenueData.summary.outstanding)}
          change={revenueData.summary.outstandingChange}
          icon={AlertCircle}
          color="text-orange-600"
          description="Awaiting payment"
          loading={loading}
        />
        <MetricCard
          title="Refunded"
          value={formatCurrency(revenueData.summary.refunded)}
          change={revenueData.summary.refundedChange}
          icon={RefreshCw}
          color="text-red-600"
          description="Total refunds"
          loading={loading}
        />
        <MetricCard
          title="Net Profit"
          value={formatCurrency(revenueData.summary.netProfit)}
          change={revenueData.summary.profitChange}
          icon={PiggyBank}
          color="text-green-600"
          description="After expenses"
          loading={loading}
        />
      </div>

      {/* Revenue Breakdown Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Revenue Breakdown (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
          ) : (
            <AreaChartComponent
              data={revenueData.revenueBreakdown}
              height={400}
              dataKeys={[
                { key: 'subscriptions', name: 'Subscriptions', color: '#10b981' },
                { key: 'jobPayments', name: 'Job Payments', color: '#3b82f6' },
                { key: 'materials', name: 'Materials', color: '#8b5cf6' },
              ]}
            />
          )}
        </CardContent>
      </Card>

      {/* Payment Methods and Top Revenue Generators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <div className="space-y-4">
                <JobPieChart
                  data={revenueData.paymentMethods}
                  height={250}
                  innerRadius={60}
                />
                <div className="space-y-2">
                  {revenueData.paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {method.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(method.value)}
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
            <CardTitle>Top Revenue Generators</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            ) : (
              <div className="space-y-2">
                {revenueData.topRevenueGenerators.map((generator, index) => (
                  <div
                    key={generator.name}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {generator.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {generator.jobs} jobs
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(generator.revenue)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatCurrency(generator.revenue / generator.jobs)} avg
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Revenue Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
          ) : (
            <div className="space-y-4">
              <RevenueLineChart
                data={revenueData.forecastData}
                height={400}
                colors={{
                  total: '#3b82f6',
                  subscriptions: '#10b981',
                  jobPayments: '#8b5cf6',
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current Month
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {formatCurrency(49000)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Forecasted (3 months)
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {formatCurrency(165000)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Growth Rate
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                    +12.5%
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
