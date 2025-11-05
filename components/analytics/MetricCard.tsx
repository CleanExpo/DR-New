'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, LucideIcon } from 'lucide-react';
import { formatPercentage, getChangeColor, getChangeBgColor, getTrendDirection } from '@/lib/analytics-utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  color?: string;
  description?: string;
  loading?: boolean;
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  color = 'text-blue-600',
  description,
  loading = false,
}: MetricCardProps) {
  const trend = change !== undefined ? getTrendDirection(change) : 'neutral';

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-centre justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </CardTitle>
          {Icon && (
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          )}
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-centre justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className={`h-4 w-4 ${color}`} />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </div>
        {change !== undefined && (
          <div className="flex items-centre mt-1">
            <span className={`inline-flex items-centre px-2 py-0.5 rounded text-xs font-medium ${getChangeBgColor(change)}`}>
              {trend === 'up' && <ArrowUpIcon className="h-3 w-3 mr-1" />}
              {trend === 'down' && <ArrowDownIcon className="h-3 w-3 mr-1" />}
              {trend === 'neutral' && <MinusIcon className="h-3 w-3 mr-1" />}
              <span className={getChangeColor(change)}>
                {formatPercentage(Math.abs(change))}
              </span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              vs last period
            </span>
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
