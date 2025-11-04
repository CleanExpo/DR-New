'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { formatNumber } from '@/lib/analytics-utils';

interface AreaChartComponentProps {
  data: any[];
  height?: number;
  colors?: string[];
  gradientId?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  dataKeys?: { key: string; name: string; color: string }[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600 dark:text-gray-400">
                {entry.name}:
              </span>
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {formatNumber(entry.value as number)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AreaChartComponent({
  data,
  height = 350,
  colors = ['#2563eb', '#10b981'],
  gradientId = 'colorGradient',
  showGrid = true,
  showLegend = true,
  dataKeys = [
    { key: 'value1', name: 'Series 1', color: '#2563eb' },
    { key: 'value2', name: 'Series 2', color: '#10b981' },
  ],
}: AreaChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {dataKeys.map((item, index) => (
            <linearGradient
              key={item.key}
              id={`${gradientId}-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={item.color}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={item.color}
                stopOpacity={0.1}
              />
            </linearGradient>
          ))}
        </defs>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-gray-200 dark:stroke-gray-700"
          />
        )}
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
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
          />
        )}
        {dataKeys.map((item, index) => (
          <Area
            key={item.key}
            type="monotone"
            dataKey={item.key}
            name={item.name}
            stroke={item.color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId}-${index})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
