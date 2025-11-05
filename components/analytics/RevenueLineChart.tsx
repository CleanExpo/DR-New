'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { formatCurrency } from '@/lib/analytics-utils';

interface RevenueLineChartProps {
  data: any[];
  height?: number;
  colors?: {
    total?: string;
    subscriptions?: string;
    jobPayments?: string;
    materials?: string;
  };
  showLegend?: boolean;
  showGrid?: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-centre justify-between gap-4 text-sm">
            <span className="flex items-centre">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600 dark:text-gray-400">
                {entry.name}:
              </span>
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {formatCurrency(entry.value as number)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueLineChart({
  data,
  height = 350,
  colors = {
    total: '#2563eb',
    subscriptions: '#10b981',
    jobPayments: '#f59e0b',
    materials: '#8b5cf6',
  },
  showLegend = true,
  showGrid = true,
}: RevenueLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
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
          tickFormatter={(value) => formatCurrency(value)}
        />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
            iconType="line"
          />
        )}
        <Line
          type="monotone"
          dataKey="total"
          name="Total Revenue"
          stroke={colors.total}
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="subscriptions"
          name="Subscriptions"
          stroke={colors.subscriptions}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="jobPayments"
          name="Job Payments"
          stroke={colors.jobPayments}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        {data.some(d => d.materials) && (
          <Line
            type="monotone"
            dataKey="materials"
            name="Materials"
            stroke={colors.materials}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
