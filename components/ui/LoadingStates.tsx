'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ===== SPINNER ===== */
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <Loader2
      className={cn('animate-spin text-primary-600', sizeClasses[size], className)}
      aria-hidden="true"
    />
  );
};

/* ===== LOADING OVERLAY ===== */
interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

export const LoadingOverlay = ({
  isLoading,
  message = 'Loading...',
  className,
}: LoadingOverlayProps) => {
  if (!isLoading) {return null;}

  return (
    <div
      className={cn(
        'fixed inset-0 z-[var(--z-modal)] flex items-center justify-center',
        'bg-neutral-900/50 backdrop-blur-sm',
        'animate-in fade-in duration-200',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-4 bg-white rounded-2xl shadow-2xl p-8">
        <Spinner size="xl" />
        <p className="text-lg font-semibold text-neutral-900">{message}</p>
      </div>
    </div>
  );
};

/* ===== SKELETON ===== */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = ({ className, variant = 'rectangular', ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200',
        'bg-[length:200%_100%]',
        {
          'rounded-full': variant === 'circular',
          'rounded-md h-4': variant === 'text',
          'rounded-lg': variant === 'rectangular',
        },
        className
      )}
      style={{
        animation: 'skeleton-shimmer 2s ease-in-out infinite',
      }}
      {...props}
    />
  );
};

/* ===== SKELETON TEXT ===== */
interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText = ({ lines = 3, className }: SkeletonTextProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={cn('h-4', index === lines - 1 && 'w-4/5')}
        />
      ))}
    </div>
  );
};

/* ===== SKELETON CARD ===== */
export const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn('rounded-xl border-2 border-neutral-200 bg-white p-6 space-y-4', className)}>
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-1/4" />
          <Skeleton variant="text" className="w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

/* ===== SKELETON GRID ===== */
interface SkeletonGridProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const SkeletonGrid = ({ count = 6, columns = 3, className }: SkeletonGridProps) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridClasses[columns], className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

/* ===== PROGRESS BAR ===== */
interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'emergency';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = true,
  className,
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    emergency: 'bg-emergency-600',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">Progress</span>
          <span className="text-sm font-semibold text-neutral-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn('w-full bg-neutral-200 rounded-full overflow-hidden', sizeClasses[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/* ===== CIRCULAR PROGRESS ===== */
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'emergency';
  showLabel?: boolean;
  className?: string;
}

export const CircularProgress = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  className,
}: CircularProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    default: 'var(--color-primary-600)',
    success: 'var(--color-success-600)',
    warning: 'var(--color-warning-600)',
    emergency: 'var(--color-emergency-600)',
  };

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-neutral-200)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={variantColors[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-neutral-900">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
};

/* ===== DOTS LOADER ===== */
export const DotsLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)} role="status">
      {[0, 1, 2].map(index => (
        <div
          key={index}
          className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"
          style={{
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/* ===== PULSE LOADER ===== */
export const PulseLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center', className)} role="status">
      <div className="relative w-16 h-16">
        {[0, 1].map(index => (
          <div
            key={index}
            className="absolute inset-0 rounded-full bg-primary-600 opacity-60 animate-ping"
            style={{
              animationDelay: `${index * 0.4}s`,
              animationDuration: '2s',
            }}
          />
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/* Add to globals.css */
/*
@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
*/
