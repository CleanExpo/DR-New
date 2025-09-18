'use client';

import dynamic from 'next/dynamic';

// Loading placeholder for charts
const ChartLoadingPlaceholder = () => (
  <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <span className="text-gray-500">Loading chart...</span>
  </div>
);

// Export individual components with type safety bypassed
export const LineChart = dynamic(
  () => import('recharts').then(mod => mod.LineChart as any),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const Line = dynamic(
  () => import('recharts').then(mod => mod.Line as any),
  { ssr: false }
) as any;

export const BarChart = dynamic(
  () => import('recharts').then(mod => mod.BarChart as any),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const Bar = dynamic(
  () => import('recharts').then(mod => mod.Bar as any),
  { ssr: false }
) as any;

export const PieChart = dynamic(
  () => import('recharts').then(mod => mod.PieChart as any),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const Pie = dynamic(
  () => import('recharts').then(mod => mod.Pie as any),
  { ssr: false }
) as any;

export const Cell = dynamic(
  () => import('recharts').then(mod => mod.Cell as any),
  { ssr: false }
) as any;

export const XAxis = dynamic(
  () => import('recharts').then(mod => mod.XAxis as any),
  { ssr: false }
) as any;

export const YAxis = dynamic(
  () => import('recharts').then(mod => mod.YAxis as any),
  { ssr: false }
) as any;

export const CartesianGrid = dynamic(
  () => import('recharts').then(mod => mod.CartesianGrid as any),
  { ssr: false }
) as any;

export const Tooltip = dynamic(
  () => import('recharts').then(mod => mod.Tooltip as any),
  { ssr: false }
) as any;

export const Legend = dynamic(
  () => import('recharts').then(mod => mod.Legend as any),
  { ssr: false }
) as any;

export const ResponsiveContainer = dynamic(
  () => import('recharts').then(mod => mod.ResponsiveContainer as any),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const Area = dynamic(
  () => import('recharts').then(mod => mod.Area as any),
  { ssr: false }
) as any;

export const AreaChart = dynamic(
  () => import('recharts').then(mod => mod.AreaChart as any),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const ComposedChart = dynamic(
  () => import('recharts').then(mod => mod.ComposedChart as any),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const RadarChart = dynamic(
  () => import('recharts').then(mod => mod.RadarChart as any),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const PolarGrid = dynamic(
  () => import('recharts').then(mod => mod.PolarGrid as any),
  { ssr: false }
) as any;

export const PolarAngleAxis = dynamic(
  () => import('recharts').then(mod => mod.PolarAngleAxis as any),
  { ssr: false }
) as any;

export const PolarRadiusAxis = dynamic(
  () => import('recharts').then(mod => mod.PolarRadiusAxis as any),
  { ssr: false }
) as any;

export const Radar = dynamic(
  () => import('recharts').then(mod => mod.Radar as any),
  { ssr: false }
) as any;