/**
 * PerformanceMonitor - React DevTools Profiler integration
 * Track component render performance in development
 */

'use client';

import { Profiler, ProfilerOnRenderCallback, ReactNode } from 'react';

interface PerformanceMetrics {
  id: string;
  phase: 'mount' | 'update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
}

const metrics: PerformanceMetrics[] = [];

const onRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  const metric: PerformanceMetrics = {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  };

  metrics.push(metric);

  // Log slow renders (> 16ms = below 60fps)
  if (actualDuration > 16) {
    console.warn(`[Performance] Slow render detected in ${id}:`, {
      phase,
      duration: `${actualDuration.toFixed(2)}ms`,
      threshold: '16ms (60fps)',
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Profiler] ${id} (${phase}):`, {
      actualDuration: `${actualDuration.toFixed(2)}ms`,
      baseDuration: `${baseDuration.toFixed(2)}ms`,
    });
  }
};

interface PerformanceMonitorProps {
  id: string;
  children: ReactNode;
  enabled?: boolean;
}

export function PerformanceMonitor({
  id,
  children,
  enabled = process.env.NODE_ENV === 'development',
}: PerformanceMonitorProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics() {
  return metrics;
}

/**
 * Get average render time for component
 */
export function getAverageRenderTime(componentId: string) {
  const componentMetrics = metrics.filter((m) => m.id === componentId);

  if (componentMetrics.length === 0) return 0;

  const total = componentMetrics.reduce((sum, m) => sum + m.actualDuration, 0);
  return total / componentMetrics.length;
}

/**
 * Get slowest components
 */
export function getSlowestComponents(limit = 10) {
  const averages = new Map<string, number>();

  metrics.forEach((m) => {
    const current = averages.get(m.id) || 0;
    averages.set(m.id, current + m.actualDuration);
  });

  return Array.from(averages.entries())
    .map(([id, total]) => ({
      id,
      averageTime: total / metrics.filter((m) => m.id === id).length,
    }))
    .sort((a, b) => b.averageTime - a.averageTime)
    .slice(0, limit);
}

/**
 * Clear metrics
 */
export function clearPerformanceMetrics() {
  metrics.length = 0;
}

/**
 * Export metrics to console
 */
export function logPerformanceReport() {
  console.group('📊 Performance Report');

  console.log('Total renders:', metrics.length);

  const slowest = getSlowestComponents(5);
  console.table(slowest);

  console.groupEnd();
}

/**
 * Usage:
 *
 * import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';
 *
 * function MyComponent() {
 *   return (
 *     <PerformanceMonitor id="MyComponent">
 *       <ExpensiveComponent />
 *     </PerformanceMonitor>
 *   );
 * }
 *
 * // In console:
 * import { logPerformanceReport } from '@/components/performance/PerformanceMonitor';
 * logPerformanceReport();
 */
