/**
 * RenderTracker - Track component re-renders
 * Helps identify unnecessary re-renders
 */

'use client';

import { useEffect, useRef } from 'react';

interface RenderInfo {
  component: string;
  renderCount: number;
  lastRender: number;
  props?: any;
}

const renderCounts = new Map<string, RenderInfo>();

export function useRenderTracker(
  componentName: string,
  props?: Record<string, any>,
  logThreshold = 5
) {
  const renderCountRef = useRef(0);
  const prevPropsRef = useRef<any>(props);

  useEffect(() => {
    renderCountRef.current += 1;
    const count = renderCountRef.current;

    // Update global tracking
    renderCounts.set(componentName, {
      component: componentName,
      renderCount: count,
      lastRender: Date.now(),
      props,
    });

    // Log if exceeds threshold
    if (count > logThreshold) {
      console.warn(
        `[RenderTracker] ${componentName} has re-rendered ${count} times`,
        {
          currentProps: props,
          previousProps: prevPropsRef.current,
        }
      );
    }

    // Detect prop changes
    if (process.env.NODE_ENV === 'development' && props) {
      const changedProps = Object.keys(props).filter(
        (key) => props[key] !== prevPropsRef.current?.[key]
      );

      if (changedProps.length > 0 && count > 1) {
        console.log(`[RenderTracker] ${componentName} re-rendered due to:`, {
          changedProps,
          newValues: changedProps.reduce((acc, key) => {
            acc[key] = props[key];
            return acc;
          }, {} as any),
        });
      }

      prevPropsRef.current = props;
    }
  });

  return renderCountRef.current;
}

/**
 * Get render counts for all tracked components
 */
export function getRenderCounts() {
  return Array.from(renderCounts.values());
}

/**
 * Get most re-rendered components
 */
export function getMostRenderedComponents(limit = 10) {
  return Array.from(renderCounts.values())
    .sort((a, b) => b.renderCount - a.renderCount)
    .slice(0, limit);
}

/**
 * Clear render tracking
 */
export function clearRenderCounts() {
  renderCounts.clear();
}

/**
 * Log render report
 */
export function logRenderReport() {
  console.group('🔄 Render Report');

  const counts = getRenderCounts();
  console.log(`Total tracked components: ${counts.length}`);

  const mostRendered = getMostRenderedComponents(10);
  console.table(
    mostRendered.map((info) => ({
      Component: info.component,
      'Render Count': info.renderCount,
      'Last Render': new Date(info.lastRender).toLocaleTimeString(),
    }))
  );

  console.groupEnd();
}

/**
 * Usage:
 *
 * function MyComponent({ name, count }) {
 *   useRenderTracker('MyComponent', { name, count });
 *
 *   return <div>{name}: {count}</div>;
 * }
 *
 * // In console:
 * import { logRenderReport } from '@/components/performance/RenderTracker';
 * logRenderReport();
 */
