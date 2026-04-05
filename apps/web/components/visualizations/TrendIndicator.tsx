'use client';

/**
 * Trend Indicator Component
 *
 * Shows metric trends with visual indicators and percentage change
 * Displays up/down arrow with color-coded styling
 *
 * Usage:
 * ```tsx
 * <TrendIndicator
 *   current={1250}
 *   previous={1000}
 *   label="Response Time"
 *   unit="minutes"
 *   higherIsBetter={false}
 * />
 * ```
 */

import React from 'react';
import { TrendData } from '@/lib/charts/chart-types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendIndicatorProps {
  current: number;
  previous: number;
  label: string;
  unit?: string;
  format?: 'number' | 'currency' | 'percent';
  higherIsBetter?: boolean;
  className?: string;
}

export function TrendIndicator({
  current,
  previous,
  label,
  unit,
  format = 'number',
  higherIsBetter = true,
  className = '',
}: TrendIndicatorProps) {
  const change = current - previous;
  const percentChange = previous !== 0 ? ((change / previous) * 100) : 0;
  const isPositive = change > 0;

  // Determine if trend is good or bad
  const isGoodTrend = higherIsBetter ? isPositive : !isPositive;

  const formatValue = (value: number): string => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    if (format === 'percent') {
      return `${(value * 100).toFixed(0)}%`;
    }
    return new Intl.NumberFormat('en-AU').format(Math.round(value));
  };

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-lg font-semibold text-gray-900">
          {formatValue(current)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {percentChange === 0 ? (
          <>
            <Minus className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-400">No change</span>
          </>
        ) : (
          <>
            {isPositive ? (
              <TrendingUp
                className={`h-4 w-4 ${
                  isGoodTrend ? 'text-green-600' : 'text-red-600'
                }`}
              />
            ) : (
              <TrendingDown
                className={`h-4 w-4 ${
                  isGoodTrend ? 'text-green-600' : 'text-red-600'
                }`}
              />
            )}
            <span
              className={`text-xs font-medium ${
                isGoodTrend ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {Math.abs(percentChange).toFixed(1)}% {isPositive ? 'up' : 'down'}
            </span>
          </>
        )}

        {unit && (
          <span className="text-xs text-gray-400">per {unit}</span>
        )}
      </div>

      <div className="text-xs text-gray-400">
        Previous: {formatValue(previous)}
      </div>
    </div>
  );
}
