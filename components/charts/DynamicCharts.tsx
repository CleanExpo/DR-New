'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Loading placeholder for charts
const ChartLoadingPlaceholder = () => (
  <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <span className="text-gray-500">Loading chart...</span>
  </div>
);

// Dynamically import recharts components with no SSR
// This ensures they're only loaded when the admin dashboard is accessed
export const LineChart = dynamic(
  () => import('recharts').then(mod => mod.LineChart),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const Line = dynamic(
  () => import('recharts').then(mod => mod.Line),
  { ssr: false }
) as any;

export const BarChart = dynamic(
  () => import('recharts').then(mod => mod.BarChart),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const Bar = dynamic(
  () => import('recharts').then(mod => mod.Bar),
  { ssr: false }
) as any;

export const PieChart = dynamic(
  () => import('recharts').then(mod => mod.PieChart),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const Pie = dynamic(
  () => import('recharts').then(mod => mod.Pie),
  { ssr: false }
) as any;

export const Cell = dynamic(
  () => import('recharts').then(mod => mod.Cell),
  { ssr: false }
) as any;

export const XAxis = dynamic(
  () => import('recharts').then(mod => mod.XAxis),
  { ssr: false }
) as any;

export const YAxis = dynamic(
  () => import('recharts').then(mod => mod.YAxis),
  { ssr: false }
) as any;

export const CartesianGrid = dynamic(
  () => import('recharts').then(mod => mod.CartesianGrid),
  { ssr: false }
) as any;

export const Tooltip = dynamic(
  () => import('recharts').then(mod => mod.Tooltip),
  { ssr: false }
) as any;

export const Legend = dynamic(
  () => import('recharts').then(mod => mod.Legend),
  { ssr: false }
) as any;

export const ResponsiveContainer = dynamic(
  () => import('recharts').then(mod => mod.ResponsiveContainer),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;

export const Area = dynamic(
  () => import('recharts').then(mod => mod.Area),
  { ssr: false }
) as any;

export const AreaChart = dynamic(
  () => import('recharts').then(mod => mod.AreaChart),
  { ssr: false, loading: ChartLoadingPlaceholder }
) as any;