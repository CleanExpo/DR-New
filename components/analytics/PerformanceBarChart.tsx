'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  Cell,
} from 'recharts';
import { formatNumber } from '@/lib/analytics-utils';

interface PerformanceBarChartProps {
  data: any[];
  dataKey?: string;
  height?: number;
  orientation?: 'horizontal' | 'vertical';
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  gradientColors?: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600 dark:text-gray-400">
              {entry.name}:
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function PerformanceBarChart({
  data,
  dataKey = 'value',
  height = 350,
  orientation = 'vertical',
  colors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
  showGrid = true,
  showLegend = false,
  gradientColors = true,
}: PerformanceBarChartProps) {
  const Layout = orientation === 'horizontal' ? 'horizontal' : 'vertical';

  // Generate gradient colors based on value if enabled
  const getBarColor = (index: number, value: number) => {
    if (gradientColors && data.length > 1) {
      const maxValue = Math.max(...data.map(d => d[dataKey] || 0));
      const intensity = (value / maxValue) * 100;
      if (intensity > 75) return '#10b981'; // Green
      if (intensity > 50) return '#3b82f6'; // Blue
      if (intensity > 25) return '#f59e0b'; // Orange
      return '#ef4444'; // Red
    }
    return colors[index % colors.length];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={Layout}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-gray-200 dark:stroke-gray-700"
          />
        )}
        {orientation === 'vertical' ? (
          <>
            <XAxis
              dataKey="name"
              tick={{ fill: 'currentColor' }}
              className="text-xs text-gray-600 dark:text-gray-400"
            />
            <YAxis
              tick={{ fill: 'currentColor' }}
              className="text-xs text-gray-600 dark:text-gray-400"
              tickFormatter={(value) => formatNumber(value)}
            />
          </>
        ) : (
          <>
            <XAxis
              type="number"
              tick={{ fill: 'currentColor' }}
              className="text-xs text-gray-600 dark:text-gray-400"
              tickFormatter={(value) => formatNumber(value)}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: 'currentColor' }}
              className="text-xs text-gray-600 dark:text-gray-400"
              width={150}
            />
          </>
        )}
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend />}
        <Bar
          dataKey={dataKey}
          radius={[4, 4, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getBarColor(index, entry[dataKey] || 0)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
