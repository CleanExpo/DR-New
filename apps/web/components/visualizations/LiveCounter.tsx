'use client';

/**
 * Live Counter Component
 *
 * Animated counter with optional sparkline for displaying live metrics
 * Used for homepage hero stats, real-time job counters, etc.
 *
 * Usage:
 * ```tsx
 * <LiveCounter
 *   value={487}
 *   label="Active Jobs"
 *   trendData={[100, 150, 180, 200, 250, 300, 350, 400, 450, 487]}
 * />
 * ```
 */

import React from 'react';
import { AnimatedNumber } from './AnimatedNumber';
import { Sparkline } from '@/components/charts/Sparkline';
import { chartColors } from '@/lib/charts/chart-config';
import { TrendingUp } from 'lucide-react';

interface LiveCounterProps {
  value: number;
  label: string;
  trendData?: number[];
  unit?: string;
  format?: 'number' | 'currency' | 'percent';
  className?: string;
  showTrendline?: boolean;
  icon?: React.ReactNode;
}

export function LiveCounter({
  value,
  label,
  trendData,
  unit,
  format = 'number',
  className = '',
  showTrendline = true,
  icon,
}: LiveCounterProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            <AnimatedNumber
              value={value}
              format={format}
              duration={1500}
            />
          </p>
        </div>
        <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0" />
      </div>

      {/* Sparkline */}
      {showTrendline && trendData && trendData.length > 0 && (
        <div className="mb-3">
          <Sparkline
            data={trendData}
            width={280}
            height={40}
            color={chartColors.primary}
            showCurve={true}
            showDots={false}
          />
        </div>
      )}

      {/* Unit info */}
      {unit && (
        <p className="text-xs text-gray-500">
          Per {unit}
        </p>
      )}

      {/* Live indicator */}
      <div className="flex items-center gap-2 mt-3">
        <span className="inline-flex h-2 w-2 rounded-full bg-green-600 animate-pulse" />
        <span className="text-xs text-green-600 font-medium">Live</span>
      </div>
    </div>
  );
}
