/**
 * NRPG Growth Portal - Stats Card Component
 *
 * Magazine-style metric card with:
 * - Large numeric display
 * - Trend indicator
 * - Progress bar option
 * - Hover lift effect
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  status?: {
    label: string;
    variant: 'success' | 'warning' | 'info';
  };
  progress?: number;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  status,
  progress,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'bg-portal-card rounded-xl p-6 border border-portal-border shadow-lg',
        'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <p className="text-portal-muted text-sm font-medium font-heading uppercase tracking-wider">
          {title}
        </p>
        {trend && (
          <span
            className={cn(
              'text-sm font-bold flex items-center gap-1 font-heading',
              trend.direction === 'up' && 'text-portal-success',
              trend.direction === 'down' && 'text-red-500',
              trend.direction === 'neutral' && 'text-portal-muted'
            )}
          >
            {trend.direction === 'up' && <TrendingUp className="size-4" />}
            {trend.direction === 'down' && <TrendingDown className="size-4" />}
            {trend.value}
          </span>
        )}
        {status && (
          <span
            className={cn(
              'text-sm font-bold flex items-center gap-1 font-heading',
              status.variant === 'success' && 'text-earth-primary',
              status.variant === 'warning' && 'text-amber-500',
              status.variant === 'info' && 'text-nrpg-teal'
            )}
          >
            <Star className="size-4" />
            {status.label}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mt-4">
        <p className="text-5xl font-black text-portal-text font-heading">{value}</p>
        {subtitle && (
          <p className="text-portal-muted text-xs mt-1 font-body">{subtitle}</p>
        )}
      </div>

      {/* Progress Bar */}
      {typeof progress === 'number' && (
        <div className="mt-6 h-1 w-full bg-portal-border rounded-full overflow-hidden">
          <div
            className="h-full bg-nrpg-teal rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default StatsCard;
