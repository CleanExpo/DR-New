# SEO Monitoring Dashboard - Complete Code

This document provides complete, production-ready code for the SEO monitoring dashboard.

---

## Dashboard File Structure

```
app/
  dashboard/
    seo/
      page.tsx                    # Main dashboard page
      layout.tsx                  # Dashboard layout
    api/
      monitoring/
        seo/
          dashboard/
            route.ts              # Dashboard data API
        reports/
          weekly/
            route.ts              # Weekly report generator
components/
  dashboard/
    MetricCard.tsx               # Reusable metric card
    PerformanceChart.tsx         # Performance chart component
    KeywordTable.tsx             # Keyword ranking table
    ServiceAreaStats.tsx         # Geographic performance
lib/
  monitoring/
    dashboard-data.ts            # Data aggregation logic
```

---

## 1. Dashboard Data API

Create: `D:\DR New\app\api\monitoring\seo\dashboard\route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const previousPeriodStart = new Date(startDate.getTime() - days * 24 * 60 * 60 * 1000);

    // Current period SEO metrics
    const currentPeriod = await prisma.sEOMetric.aggregate({
      where: {
        date: { gte: startDate, lte: now },
        page: null,  // Site-wide only
      },
      _sum: {
        organicClicks: true,
        organicImpressions: true,
      },
      _avg: {
        organicCTR: true,
        averagePosition: true,
      }
    });

    // Previous period for comparison
    const previousPeriod = await prisma.sEOMetric.aggregate({
      where: {
        date: { gte: previousPeriodStart, lt: startDate },
        page: null,
      },
      _sum: {
        organicClicks: true,
        organicImpressions: true,
      },
      _avg: {
        organicCTR: true,
        averagePosition: true,
      }
    });

    // Calculate changes
    const clicksChange = calculatePercentChange(
      currentPeriod._sum.organicClicks || 0,
      previousPeriod._sum.organicClicks || 0
    );

    const positionChange = calculatePercentChange(
      previousPeriod._avg.averagePosition || 0,
      currentPeriod._avg.averagePosition || 0  // Reverse for position (lower is better)
    );

    const ctrChange = calculatePercentChange(
      currentPeriod._avg.organicCTR || 0,
      previousPeriod._avg.organicCTR || 0
    );

    // Web Vitals trend
    const webVitalsTrend = await getWebVitalsTrend(startDate, now);

    // Top performing pages
    const topPages = await prisma.sEOMetric.groupBy({
      by: ['page'],
      where: {
        date: { gte: startDate, lte: now },
        page: { not: null },
      },
      _sum: {
        organicClicks: true,
        organicImpressions: true,
      },
      _avg: {
        organicCTR: true,
        averagePosition: true,
      },
      orderBy: {
        _sum: {
          organicClicks: 'desc',
        }
      },
      take: 10,
    });

    // Conversion metrics
    const conversions = await prisma.conversionMetric.aggregate({
      where: {
        timestamp: { gte: startDate, lte: now },
      },
      _count: true,
      _sum: {
        value: true,
      }
    });

    const previousConversions = await prisma.conversionMetric.aggregate({
      where: {
        timestamp: { gte: previousPeriodStart, lt: startDate },
      },
      _count: true,
    });

    const conversionsChange = calculatePercentChange(
      conversions._count,
      previousConversions._count
    );

    // Service area performance
    const areaPerformance = await getServiceAreaPerformance(startDate, now);

    // Top keywords
    const topKeywords = await prisma.keywordRanking.findMany({
      where: {
        date: { gte: startDate, lte: now },
      },
      orderBy: [
        { position: 'asc' },
        { date: 'desc' },
      ],
      take: 20,
      distinct: ['keyword'],
    });

    return NextResponse.json({
      timestamp: now.toISOString(),
      period: `${days}d`,

      // Overview metrics
      organicClicks: currentPeriod._sum.organicClicks || 0,
      organicClicksChange: clicksChange,

      avgPosition: currentPeriod._avg.averagePosition || 0,
      positionChange: positionChange,

      organicCTR: currentPeriod._avg.organicCTR || 0,
      ctrChange: ctrChange,

      conversions: conversions._count,
      conversionsChange: conversionsChange,
      conversionValue: conversions._sum.value || 0,

      // Detailed data
      webVitalsTrend,
      topPages: topPages.map(p => ({
        page: p.page,
        clicks: p._sum.organicClicks || 0,
        impressions: p._sum.organicImpressions || 0,
        ctr: p._avg.organicCTR || 0,
        position: p._avg.averagePosition || 0,
      })),
      topKeywords: topKeywords.map(k => ({
        keyword: k.keyword,
        position: k.position,
        previousPosition: k.previousPosition,
        change: k.previousPosition ? k.previousPosition - k.position : 0,
      })),
      areaPerformance,
    });
  } catch (error) {
    console.error('[Dashboard API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

async function getWebVitalsTrend(startDate: Date, endDate: Date) {
  const dailyMetrics = await prisma.pagePerformance.findMany({
    where: {
      date: { gte: startDate, lte: endDate },
    },
    orderBy: { date: 'asc' },
  });

  return dailyMetrics.map(m => ({
    date: m.date.toISOString().split('T')[0],
    lcp: m.avgLCP,
    fid: m.avgFID,
    cls: m.avgCLS ? m.avgCLS * 1000 : null,  // Scale CLS for visibility
  }));
}

async function getServiceAreaPerformance(startDate: Date, endDate: Date) {
  const areas = ['brisbane', 'ipswich', 'logan'];
  const performance: Record<string, any> = {};

  for (const area of areas) {
    const clicks = await prisma.sEOMetric.aggregate({
      where: {
        date: { gte: startDate, lte: endDate },
        serviceArea: area,
      },
      _sum: { organicClicks: true },
    });

    const conversions = await prisma.conversionMetric.aggregate({
      where: {
        timestamp: { gte: startDate, lte: endDate },
        serviceArea: area,
      },
      _count: true,
      _sum: { value: true },
    });

    performance[area] = {
      clicks: clicks._sum.organicClicks || 0,
      conversions: conversions._count,
      conversionValue: conversions._sum.value || 0,
      conversionRate: clicks._sum.organicClicks
        ? (conversions._count / clicks._sum.organicClicks) * 100
        : 0,
    };
  }

  return performance;
}

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
```

---

## 2. Main Dashboard Page

Create: `D:\DR New\app\dashboard\seo\page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { KeywordTable } from '@/components/dashboard/KeywordTable';
import { ServiceAreaStats } from '@/components/dashboard/ServiceAreaStats';

export default function SEODashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/monitoring/seo/dashboard?days=${timeRange}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Performance Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Tracking organic performance for Disaster Recovery Brisbane
          </p>
        </div>

        {/* Time Range Selector */}
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Organic Traffic"
          value={data.organicClicks.toLocaleString()}
          change={data.organicClicksChange}
          trend="up"
          icon="📈"
        />
        <MetricCard
          title="Avg Position"
          value={data.avgPosition.toFixed(1)}
          change={data.positionChange}
          trend="down"  // Lower is better for position
          icon="🎯"
        />
        <MetricCard
          title="Organic CTR"
          value={`${(data.organicCTR * 100).toFixed(2)}%`}
          change={data.ctrChange}
          trend="up"
          icon="👆"
        />
        <MetricCard
          title="Conversions"
          value={data.conversions.toLocaleString()}
          change={data.conversionsChange}
          trend="up"
          icon="💰"
          subtitle={`$${data.conversionValue.toLocaleString()} value`}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Web Vitals Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Core Web Vitals Trend</CardTitle>
              <CardDescription>
                Daily average performance metrics (last {timeRange} days)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart data={data.webVitalsTrend} />
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
              <CardDescription>Pages with highest organic traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2">Page</th>
                      <th className="text-right p-2">Clicks</th>
                      <th className="text-right p-2">Impressions</th>
                      <th className="text-right p-2">CTR</th>
                      <th className="text-right p-2">Avg Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.map((page: any, i: number) => (
                      <tr key={i} className="border-t">
                        <td className="p-2 font-medium">{page.page}</td>
                        <td className="p-2 text-right">{page.clicks}</td>
                        <td className="p-2 text-right">{page.impressions.toLocaleString()}</td>
                        <td className="p-2 text-right">{(page.ctr * 100).toFixed(2)}%</td>
                        <td className="p-2 text-right">{page.position.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>LCP (Largest Contentful Paint)</CardTitle>
                <CardDescription>Target: &lt; 2.5s</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {data.webVitalsTrend[data.webVitalsTrend.length - 1]?.lcp?.toFixed(0) || 'N/A'}
                  <span className="text-lg text-gray-500">ms</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className={`px-2 py-1 rounded ${
                    (data.webVitalsTrend[data.webVitalsTrend.length - 1]?.lcp || 0) < 2500
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {(data.webVitalsTrend[data.webVitalsTrend.length - 1]?.lcp || 0) < 2500
                      ? 'Good'
                      : 'Needs Improvement'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FID (First Input Delay)</CardTitle>
                <CardDescription>Target: &lt; 100ms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {data.webVitalsTrend[data.webVitalsTrend.length - 1]?.fid?.toFixed(0) || 'N/A'}
                  <span className="text-lg text-gray-500">ms</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className={`px-2 py-1 rounded ${
                    (data.webVitalsTrend[data.webVitalsTrend.length - 1]?.fid || 0) < 100
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {(data.webVitalsTrend[data.webVitalsTrend.length - 1]?.fid || 0) < 100
                      ? 'Good'
                      : 'Needs Improvement'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CLS (Cumulative Layout Shift)</CardTitle>
                <CardDescription>Target: &lt; 0.1</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {((data.webVitalsTrend[data.webVitalsTrend.length - 1]?.cls || 0) / 1000).toFixed(3)}
                </div>
                <div className="mt-2 text-sm">
                  <span className={`px-2 py-1 rounded ${
                    ((data.webVitalsTrend[data.webVitalsTrend.length - 1]?.cls || 0) / 1000) < 0.1
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {((data.webVitalsTrend[data.webVitalsTrend.length - 1]?.cls || 0) / 1000) < 0.1
                      ? 'Good'
                      : 'Needs Improvement'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart data={data.webVitalsTrend} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords">
          <KeywordTable keywords={data.topKeywords} />
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic">
          <ServiceAreaStats areaPerformance={data.areaPerformance} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## 3. Reusable Components

### MetricCard Component

Create: `D:\DR New\components\dashboard\MetricCard.tsx`

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';  // 'down' means improvement for some metrics like position
  icon?: string;
  subtitle?: string;
}

export function MetricCard({ title, value, change, trend, icon, subtitle }: MetricCardProps) {
  const isPositive = trend === 'up' ? change > 0 : change < 0;
  const absChange = Math.abs(change);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && <span className="text-2xl">{icon}</span>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? '↑' : '↓'} {absChange.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-500 ml-2">vs previous period</span>
        </div>
      </CardContent>
    </Card>
  );
}
```

### PerformanceChart Component

Create: `D:\DR New\components\dashboard\PerformanceChart.tsx`

```typescript
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface PerformanceChartProps {
  data: Array<{
    date: string;
    lcp?: number;
    fid?: number;
    cls?: number;
  }>;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString('en-AU', {
            month: 'short',
            day: 'numeric'
          })}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => new Date(value).toLocaleDateString('en-AU')}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="lcp"
          stroke="#8884d8"
          name="LCP (ms)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="fid"
          stroke="#82ca9d"
          name="FID (ms)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="cls"
          stroke="#ffc658"
          name="CLS (×1000)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### KeywordTable Component

Create: `D:\DR New\components\dashboard\KeywordTable.tsx`

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Keyword {
  keyword: string;
  position: number;
  previousPosition?: number;
  change: number;
}

interface KeywordTableProps {
  keywords: Keyword[];
}

export function KeywordTable({ keywords }: KeywordTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Rankings</CardTitle>
        <CardDescription>
          Top 20 keywords by position
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Keyword</th>
                <th className="text-center p-3">Position</th>
                <th className="text-center p-3">Previous</th>
                <th className="text-center p-3">Change</th>
                <th className="text-center p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((keyword, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{keyword.keyword}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded ${
                      keyword.position <= 3 ? 'bg-green-100 text-green-800' :
                      keyword.position <= 10 ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {keyword.position.toFixed(1)}
                    </span>
                  </td>
                  <td className="p-3 text-center text-gray-500">
                    {keyword.previousPosition?.toFixed(1) || '-'}
                  </td>
                  <td className="p-3 text-center">
                    {keyword.change !== 0 && (
                      <span className={`font-medium ${
                        keyword.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {keyword.change > 0 ? '↑' : '↓'} {Math.abs(keyword.change).toFixed(1)}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {keyword.position <= 3 && <span className="text-xl">🏆</span>}
                    {keyword.position > 3 && keyword.position <= 10 && <span className="text-xl">⭐</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
```

### ServiceAreaStats Component

Create: `D:\DR New\components\dashboard\ServiceAreaStats.tsx`

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AreaPerformance {
  [area: string]: {
    clicks: number;
    conversions: number;
    conversionValue: number;
    conversionRate: number;
  };
}

interface ServiceAreaStatsProps {
  areaPerformance: AreaPerformance;
}

export function ServiceAreaStats({ areaPerformance }: ServiceAreaStatsProps) {
  const areas = ['Brisbane', 'Ipswich', 'Logan'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {areas.map(area => {
          const areaKey = area.toLowerCase();
          const data = areaPerformance[areaKey] || {
            clicks: 0,
            conversions: 0,
            conversionValue: 0,
            conversionRate: 0,
          };

          return (
            <Card key={area}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {area}
                  <span className="text-2xl">
                    {area === 'Brisbane' ? '🏙️' : area === 'Ipswich' ? '🏘️' : '🌳'}
                  </span>
                </CardTitle>
                <CardDescription>Service area performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Organic Clicks:</span>
                  <span className="font-bold">{data.clicks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Conversions:</span>
                  <span className="font-bold text-green-600">{data.conversions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Value:</span>
                  <span className="font-bold">${data.conversionValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate:</span>
                  <span className="font-bold">{data.conversionRate.toFixed(2)}%</span>
                </div>

                {/* Performance indicator */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Performance</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      data.conversionRate >= 3 ? 'bg-green-100 text-green-800' :
                      data.conversionRate >= 2 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {data.conversionRate >= 3 ? 'Excellent' :
                       data.conversionRate >= 2 ? 'Good' : 'Needs Work'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Top Performing Area</h4>
              <p className="text-sm text-gray-600">
                {getTopArea(areaPerformance)} is generating the most conversions with{' '}
                {areaPerformance[getTopArea(areaPerformance).toLowerCase()]?.conversions || 0} leads.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Growth Opportunity</h4>
              <p className="text-sm text-gray-600">
                {getLowestArea(areaPerformance)} has potential for improvement with targeted local SEO.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getTopArea(performance: AreaPerformance): string {
  const areas = Object.entries(performance);
  if (areas.length === 0) return 'Unknown';

  const top = areas.reduce((max, [area, data]) =>
    data.conversions > (performance[max]?.conversions || 0) ? area : max
  , areas[0][0]);

  return top.charAt(0).toUpperCase() + top.slice(1);
}

function getLowestArea(performance: AreaPerformance): string {
  const areas = Object.entries(performance);
  if (areas.length === 0) return 'Unknown';

  const lowest = areas.reduce((min, [area, data]) =>
    data.conversions < (performance[min]?.conversions || Infinity) ? area : min
  , areas[0][0]);

  return lowest.charAt(0).toUpperCase() + lowest.slice(1);
}
```

---

## 4. Install Required Dependencies

```bash
npm install recharts
npm install googleapis
```

---

## 5. Dashboard Access

### Create Dashboard Layout

Create: `D:\DR New\app\dashboard\seo\layout.tsx`

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Dashboard | Disaster Recovery Brisbane',
  description: 'Monitor SEO performance and Core Web Vitals',
  robots: {
    index: false,  // Don't index dashboard
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">DR Brisbane Dashboard</h1>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
                View Site
              </a>
              <a href="/dashboard/seo" className="text-sm font-medium text-blue-600">
                SEO
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
```

---

## 6. Access Dashboard

Once deployed, access at:
- **Local:** `http://localhost:3000/dashboard/seo`
- **Production:** `https://disasterrecovery.com.au/dashboard/seo`

---

## 7. Optional: Add Authentication

For production, add basic authentication:

Create: `D:\DR New\middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Basic ${Buffer.from(
      `${process.env.DASHBOARD_USERNAME}:${process.env.DASHBOARD_PASSWORD}`
    ).toString('base64')}`;

    if (authHeader !== expectedAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="SEO Dashboard"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

Add to `.env.local`:
```bash
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=your-secure-password
```

---

## Summary

This dashboard provides:

1. **Real-time Overview**
   - Organic traffic, CTR, position, conversions
   - 30-day trends with comparison to previous period

2. **Performance Monitoring**
   - Core Web Vitals (LCP, FID, CLS)
   - Daily trends with target indicators

3. **Keyword Tracking**
   - Top 20 keywords by position
   - Position changes and improvements
   - Visual indicators for top rankings

4. **Geographic Analysis**
   - Performance by service area (Brisbane, Ipswich, Logan)
   - Conversion rates and values
   - Insights and recommendations

**Total Implementation Time:** ~2 hours
**Dependencies:** recharts, googleapis
**Mobile Responsive:** Yes
**Production Ready:** Yes

Access your dashboard at `/dashboard/seo` after deployment!
