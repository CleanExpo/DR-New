'use client';

import { useEffect, ReactNode } from 'react';

interface CLSOptimizerProps {
  children: ReactNode;
  className?: string;
  aspectRatio?: string;
  minHeight?: string;
}

/**
 * CLS Optimizer Component
 * Prevents Cumulative Layout Shift by:
 * - Reserving space for content
 * - Using aspect ratios
 * - Setting minimum heights
 * - Monitoring layout shifts
 */
export function CLSOptimizer({
  children,
  className = '',
  aspectRatio,
  minHeight,
}: CLSOptimizerProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      let clsValue = 0;
      let clsEntries: any[] = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Only count layout shifts without recent user input
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            clsEntries.push(entry);

            // Log significant layout shifts
            if ((entry as any).value > 0.1) {
              console.warn('[CLS] Significant layout shift detected:', {
                value: (entry as any).value,
                sources: (entry as any).sources,
                startTime: entry.startTime,
              });

              // Send to analytics
              if (window.gtag) {
                window.gtag('event', 'cls_issue', {
                  event_category: 'Performance',
                  event_label: 'Layout Shift',
                  value: Math.round((entry as any).value * 1000),
                  non_interaction: true,
                });
              }
            }
          }
        }

        // Report cumulative CLS
        if (clsValue > 0.1) {
          console.log('[CLS] Cumulative Layout Shift:', {
            value: clsValue,
            entries: clsEntries.length,
          });
        }
      });

      observer.observe({ type: 'layout-shift', buffered: true });

      return () => observer.disconnect();
    } catch (e) {
      // Performance observer not supported
    }
  }, []);

  const containerStyle: React.CSSProperties = {
    ...(aspectRatio && { aspectRatio }),
    ...(minHeight && { minHeight }),
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
}

/**
 * Skeleton Loader Component
 * Prevents CLS by showing placeholders while content loads
 */
export function SkeletonLoader({
  width = '100%',
  height = '200px',
  aspectRatio,
  className = '',
}: {
  width?: string;
  height?: string;
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{
        width,
        height: aspectRatio ? 'auto' : height,
        aspectRatio,
      }}
    />
  );
}

/**
 * Reserved Space Component
 * Reserves space for async content to prevent layout shifts
 */
export function ReservedSpace({
  children,
  width,
  height,
  aspectRatio,
  className = '',
}: {
  children: ReactNode;
  width?: string;
  height?: string;
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: width || '100%',
        height: aspectRatio ? 'auto' : height,
        aspectRatio,
      }}
    >
      {children}
    </div>
  );
}

export default CLSOptimizer;