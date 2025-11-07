/**
 * Performance Optimization Utilities
 * Provides tools for optimizing React and Next.js application performance
 */

import { useEffect, useRef, useCallback, useMemo, useState } from 'react';

/**
 * Debounce hook for optimizing frequent function calls
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Throttle hook for limiting function execution frequency
 */
export function useThrottle<T extends (...args: unknown[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;

      if (timeSinceLastRun >= delay) {
        lastRun.current = now;
        return callback(...args);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        lastRun.current = Date.now();
        callback(...args);
      }, delay - timeSinceLastRun);
    }) as T,
    [callback, delay]
  );
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  options?: IntersectionObserverInit
): [
  (element: Element | null) => void,
  IntersectionObserverEntry | undefined
] {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [element, setElement] = useState<Element | null>(null);

  const updateEntry = useCallback(
    ([entry]: IntersectionObserverEntry[]): void => {
      setEntry(entry);
    },
    []
  );

  useEffect(() => {
    if (!element) {
      return;
    }

    const hasSupport = 'IntersectionObserver' in window;
    if (!hasSupport) {
      return;
    }

    const observer = new IntersectionObserver(updateEntry, options);
    observer.observe(element);

    return () => observer.disconnect();
  }, [element, updateEntry, options]);

  return [setElement, entry];
}

/**
 * Lazy load images with placeholder
 */
export function useLazyImage(
  src: string,
  placeholder?: string
): {
  imgSrc: string;
  isLoading: boolean;
  error: Error | null;
} {
  const [imgSrc, setImgSrc] = useState(placeholder || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const img = new Image();

    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(new Error(`Failed to load image: ${src}`));
      setIsLoading(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { imgSrc, isLoading, error };
}

/**
 * Memoize expensive computations
 */
export function memoize<T extends (...args: unknown[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback =
  typeof window !== 'undefined' && window.requestIdleCallback
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback): number =>
        window.setTimeout(() => cb({ timeRemaining: () => 1, didTimeout: false }), 1);

export const cancelIdleCallback =
  typeof window !== 'undefined' && window.cancelIdleCallback
    ? window.cancelIdleCallback
    : (id: number): void => window.clearTimeout(id);

/**
 * Defer non-critical work
 */
export function useIdleCallback(
  callback: () => void,
  options?: IdleRequestOptions
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handle = requestIdleCallback(() => callbackRef.current(), options);
    return () => cancelIdleCallback(handle);
  }, [options]);
}

/**
 * Virtual scrolling helper
 */
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan = 3
): {
  visibleItems: T[];
  totalHeight: number;
  offsetY: number;
  startIndex: number;
  endIndex: number;
} {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
  };
}

/**
 * Batch DOM updates
 */
export function batchUpdates<T>(
  updates: Array<() => T>
): Promise<T[]> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const results = updates.map(update => update());
      resolve(results);
    });
  });
}

/**
 * Preload resources
 */
export function preloadResource(
  url: string,
  type: 'image' | 'script' | 'style' | 'font'
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;

  switch (type) {
    case 'image':
      link.as = 'image';
      break;
    case 'script':
      link.as = 'script';
      break;
    case 'style':
      link.as = 'style';
      break;
    case 'font':
      link.as = 'font';
      link.crossOrigin = 'anonymous';
      break;
  }

  document.head.appendChild(link);
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  private marks = new Map<string, number>();
  private measures = new Map<string, number>();

  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  measure(name: string, startMark: string, endMark?: string): number {
    const start = this.marks.get(startMark);
    const end = endMark ? this.marks.get(endMark) : performance.now();

    if (start === undefined || end === undefined) {
      throw new Error(`Mark not found: ${startMark}${endMark ? ` or ${endMark}` : ''}`);
    }

    const duration = end - start;
    this.measures.set(name, duration);

    return duration;
  }

  getMeasure(name: string): number | undefined {
    return this.measures.get(name);
  }

  getAllMeasures(): Record<string, number> {
    return Object.fromEntries(this.measures);
  }

  clear(): void {
    this.marks.clear();
    this.measures.clear();
  }
}

/**
 * Web Vitals tracking
 */
export interface WebVitals {
  FCP?: number;  // First Contentful Paint
  LCP?: number;  // Largest Contentful Paint
  FID?: number;  // First Input Delay
  CLS?: number;  // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

export function trackWebVitals(callback: (vitals: WebVitals) => void): void {
  if (typeof window === 'undefined') {
    return;
  }

  const vitals: WebVitals = {};

  // Observe paint timings
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'paint') {
        if (entry.name === 'first-contentful-paint') {
          vitals.FCP = entry.startTime;
        }
      } else if (entry.entryType === 'largest-contentful-paint') {
        vitals.LCP = entry.startTime;
      }
    }
    callback(vitals);
  });

  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

  // Track Time to First Byte
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationEntry) {
    vitals.TTFB = navigationEntry.responseStart - navigationEntry.fetchStart;
  }

  callback(vitals);
}