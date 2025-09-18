'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from '@/components/charts/DynamicCharts'
import {
  TrendingUp, TrendingDown, DollarSign, Users, Activity,
  PhoneCall, Clock, Target, AlertCircle, CheckCircle
} from 'lucide-react'
import { realtimeAnalytics } from '@/lib/analytics/realtime'
// Removed date-fns - using native Date functions
const subDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const formatDate = (date: Date, pattern: string) => {
  if (pattern === 'MMM dd') {
    return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' });
  }
  return date.toLocaleDateString('en-AU');
};

// KPI Card Component
function KPICard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  target,
  format: formatValue = (v: any) => v
}: any) {
  const isPositive = change >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown
  const hasMetTarget = target ? parseFloat(value) >= target : true

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{formatValue(value)}</p>

          <div className="mt-4 flex items-center space-x-2">
            <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
            {trend && (
              <span className="text-sm text-gray-500">vs last period</span>
            )}
          </div>

          {target && (
            <div className="mt-2 flex items-center">
              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className={`h-2 rounded-full ${hasMetTarget ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${Math.min((parseFloat(value) / target) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                Target: {formatValue(target)}
              </span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-lg ${hasMetTarget ? 'bg-blue-50' : 'bg-yellow-50'}`}>
          <Icon className={`h-6 w-6 ${hasMetTarget ? 'text-blue-600' : 'text-yellow-600'}`} />
        </div>
      </div>
    </Card>
  )
}

export default function ExecutiveDashboard() {
  const [metrics, setMetrics] = useState<any>({
    activeVisitors: 0,
    revenueToday: 0,
    conversionsToday: 0,
    avgResponseTime: 0,
    customerSatisfaction: 0,
    emergencyCalls: 0,
  })

  const [chartData, setChartData] = useState<any>({
    revenue: [],
    conversions: [],
    traffic: [],
    funnel: [],
    geographic: [],
    serviceBreakdown: [],
  })

  useEffect(() => {
    // Subscribe to real-time metrics
    const unsubscribe = realtimeAnalytics.subscribe('metrics', (data) => {
      setMetrics({
        activeVisitors: data.activeVisitors,
        revenueToday: data.revenueToday,
        conversionsToday: data.activeConversions,
        avgResponseTime: data.avgResponseTime,
        customerSatisfaction: 4.8, // Mock data
        emergencyCalls: data.emergencyCalls,
      })
    })

    // Load initial data
    loadChartData()

    // Refresh chart data every minute
    const interval = setInterval(loadChartData, 60000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])

  const loadChartData = async () => {
    // Generate mock data for demonstration
    const days = 30
    const revenue = Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - i - 1)
      return {
        date: formatDate(date, 'MMM dd'),
        revenue: Math.floor(Math.random() * 50000) + 30000,
        target: 45000,
        conversions: Math.floor(Math.random() * 50) + 20,
        calls: Math.floor(Math.random() * 30) + 10,
      }
    })

    const traffic = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      visitors: Math.floor(Math.random() * 100) + 20,
      pageViews: Math.floor(Math.random() * 300) + 50,
    }))

    const funnel = [
      { stage: 'Homepage', visitors: 10000, percentage: 100 },
      { stage: 'Service Page', visitors: 6000, percentage: 60 },
      { stage: 'Contact Form', visitors: 2000, percentage: 20 },
      { stage: 'Form Submit', visitors: 800, percentage: 8 },
      { stage: 'Conversion', visitors: 400, percentage: 4 },
    ]

    const geographic = [
      { location: 'Brisbane CBD', value: 35, jobs: 450 },
      { location: 'South Brisbane', value: 25, jobs: 320 },
      { location: 'North Brisbane', value: 20, jobs: 260 },
      { location: 'Ipswich', value: 12, jobs: 155 },
      { location: 'Logan', value: 8, jobs: 105 },
    ]

    const serviceBreakdown = [
      { name: 'Water Damage', value: 35, revenue: 450000, color: '#3B82F6' },
      { name: 'Fire Restoration', value: 25, revenue: 320000, color: '#EF4444' },
      { name: 'Mould Remediation', value: 20, revenue: 260000, color: '#10B981' },
      { name: 'Storm Damage', value: 12, revenue: 155000, color: '#F59E0B' },
      { name: 'Biohazard', value: 8, revenue: 105000, color: '#8B5CF6' },
    ]

    setChartData({
      revenue,
      traffic,
      funnel,
      geographic,
      serviceBreakdown,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">Executive Overview</h2>
        <p className="text-blue-100 mt-2">
          Real-time business intelligence and performance metrics
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">All Systems Operational</span>
          </div>
          <div className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            <span className="text-sm">{metrics.activeVisitors} Active Visitors</span>
          </div>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Revenue Today"
          value={metrics.revenueToday}
          change={12.5}
          icon={DollarSign}
          trend="up"
          target={50000}
          format={formatCurrency}
        />
        <KPICard
          title="Conversions"
          value={metrics.conversionsToday}
          change={8.3}
          icon={Target}
          trend="up"
          target={50}
        />
        <KPICard
          title="Avg Response Time"
          value={metrics.avgResponseTime}
          change={-15.2}
          icon={Clock}
          trend="down"
          target={60}
          format={formatTime}
        />
        <KPICard
          title="Emergency Calls"
          value={metrics.emergencyCalls}
          change={25.0}
          icon={PhoneCall}
          trend="up"
        />
        <KPICard
          title="Active Visitors"
          value={metrics.activeVisitors}
          change={18.7}
          icon={Users}
          trend="up"
        />
        <KPICard
          title="Satisfaction"
          value={metrics.customerSatisfaction}
          change={2.1}
          icon={Activity}
          trend="up"
          target={4.5}
          format={(v: number) => v.toFixed(1)}
        />
      </div>

      {/* Revenue & Conversions Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend (30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#888" fontSize={12} />
              <YAxis yAxisId="left" stroke="#888" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={12} />
              <Tooltip
                formatter={(value: any, name: string) => {
                  if (name === 'revenue' || name === 'target') {
                    return formatCurrency(value)
                  }
                  return value
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="target"
                stroke="#EF4444"
                strokeDasharray="5 5"
                dot={false}
              />
              <Bar
                yAxisId="right"
                dataKey="conversions"
                fill="#10B981"
                opacity={0.8}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.funnel} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#888" fontSize={12} />
              <YAxis dataKey="stage" type="category" stroke="#888" fontSize={12} width={100} />
              <Tooltip />
              <Bar dataKey="visitors" fill="#3B82F6">
                {chartData.funnel.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={`rgba(59, 130, 246, ${1 - index * 0.15})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Service Performance & Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Service Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.serviceBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.serviceBreakdown.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Geographic Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.geographic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="location" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip />
              <Bar dataKey="jobs" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Hourly Traffic Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData.traffic.slice(-12)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="visitors"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="pageViews"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Performance Indicators */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Conversion Rate', value: '4.2%', status: 'good', target: '4%' },
            { label: 'Bounce Rate', value: '32%', status: 'good', target: '<40%' },
            { label: 'Avg Session Duration', value: '3m 45s', status: 'good', target: '>3m' },
            { label: 'Page Load Speed', value: '1.8s', status: 'good', target: '<2s' },
            { label: 'Customer Lifetime Value', value: '$8,450', status: 'good', target: '>$8k' },
            { label: 'Cost Per Acquisition', value: '$125', status: 'warning', target: '<$100' },
            { label: 'Return on Ad Spend', value: '4.2x', status: 'good', target: '>4x' },
            { label: 'Net Promoter Score', value: '72', status: 'good', target: '>70' },
          ].map((kpi, index) => (
            <div key={index} className="border rounded-lg p-4">
              <p className="text-sm text-gray-600">{kpi.label}</p>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">Target: {kpi.target}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  kpi.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {kpi.status === 'good' ? 'On Track' : 'Needs Attention'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}