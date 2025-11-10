/**
 * Performance Optimization Utilities
 * User Timing API integration, performance marks, measures, and monitoring
 */

import { useEffect, useRef, useCallback, useMemo, useState } from 'react';

/**
 * Performance mark wrapper
 */
export function mark(name: string): void {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name);
  }
}

/**
 * Performance measure wrapper
 */
export function measure(
  name: string,
  startMark?: string,
  endMark?: string
): PerformanceMeasure | null {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      return performance.measure(name, startMark, endMark);
    } catch (error) {
      console.warn(`Failed to measure ${name}:`, error);
      return null;
    }
  }
  return null;
}

/**
 * Clear performance marks
 */
export function clearMarks(name?: string): void {
  if (typeof performance !== 'undefined' && performance.clearMarks) {
    performance.clearMarks(name);
  }
}

/**
 * Clear performance measures
 */
export function clearMeasures(name?: string): void {
  if (typeof performance !== 'undefined' && performance.clearMeasures) {
    performance.clearMeasures(name);
  }
}

/**
 * Get performance entries
 */
export function getEntries(type?: string): PerformanceEntry[] {
  if (typeof performance !== 'undefined' && performance.getEntries) {
    if (type) {
      return performance.getEntriesByType(type);
    }
    return performance.getEntries();
  }
  return [];
}

/**
 * Time async function execution
 */
export async function timeAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<{ result: T; duration: number }> {
  const startMark = `${name}-start`;
  const endMark = `${name}-end`;
  const measureName = `${name}-duration`;

  mark(startMark);
  const result = await fn();
  mark(endMark);

  const measurement = measure(measureName, startMark, endMark);
  const duration = measurement?.duration || 0;

  clearMarks(startMark);
  clearMarks(endMark);
  clearMeasures(measureName);

  return { result, duration };
}

/**
 * Time sync function execution
 */
export function timeSync<T>(
  name: string,
  fn: () => T
): { result: T; duration: number } {
  const startMark = `${name}-start`;
  const endMark = `${name}-end`;
  const measureName = `${name}-duration`;

  mark(startMark);
  const result = fn();
  mark(endMark);

  const measurement = measure(measureName, startMark, endMark);
  const duration = measurement?.duration || 0;

  clearMarks(startMark);
  clearMarks(endMark);
  clearMeasures(measureName);

  return { result, duration };
}

/**
 * Performance observer for long tasks
 */
export class LongTaskObserver {
  private observer: PerformanceObserver | null = null;
  private threshold: number;
  private callback: (entries: PerformanceEntry[]) => void;

  constructor(
    threshold = 50,
    callback: (entries: PerformanceEntry[]) => void
  ) {
    this.threshold = threshold;
    this.callback = callback;
  }

  start(): void {
    if (typeof PerformanceObserver === 'undefined') {
      console.warn('PerformanceObserver not supported');
      return;
    }

    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries().filter(
          (entry) => entry.duration > this.threshold
        );

        if (entries.length > 0) {
          this.callback(entries);
        }
      });

      // Observe different entry types
      const entryTypes = ['measure', 'navigation', 'resource'];

      entryTypes.forEach((type) => {
        try {
          this.observer?.observe({ entryTypes: [type] });
        } catch (e) {
          // Type not supported, skip
        }
      });
    } catch (error) {
      console.warn('Failed to start long task observer:', error);
    }
  }

  stop(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

/**
 * Memory leak detection
 */
export class MemoryMonitor {
  private baseline: number | null = null;
  private threshold: number;
  private callback: (info: MemoryInfo) => void;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(
    threshold = 50, // MB
    callback: (info: MemoryInfo) => void
  ) {
    this.threshold = threshold * 1024 * 1024; // Convert to bytes
    this.callback = callback;
  }

  start(intervalMs = 10000): void {
    if (!this.supportsMemoryAPI()) {
      console.warn('Memory API not supported');
      return;
    }

    // Set baseline
    this.baseline = this.getMemoryUsage();

    // Start monitoring
    this.intervalId = setInterval(() => {
      const current = this.getMemoryUsage();

      if (this.baseline && current - this.baseline > this.threshold) {
        this.callback({
          baseline: this.baseline,
          current,
          delta: current - this.baseline,
          deltaPercent: ((current - this.baseline) / this.baseline) * 100,
        });
      }
    }, intervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private supportsMemoryAPI(): boolean {
    return (
      typeof performance !== 'undefined' &&
      'memory' in performance &&
      typeof (performance as any).memory === 'object'
    );
  }

  private getMemoryUsage(): number {
    if (!this.supportsMemoryAPI()) {return 0;}
    return (performance as any).memory.usedJSHeapSize;
  }
}

interface MemoryInfo {
  baseline: number;
  current: number;
  delta: number;
  deltaPercent: number;
}

/**
 * Request batching utility
 */
export class RequestBatcher<T, R> {
  private batch: T[] = [];
  private timeoutId: NodeJS.Timeout | null = null;
  private batchSize: number;
  private batchDelay: number;
  private processFn: (batch: T[]) => Promise<R[]>;

  constructor(
    processFn: (batch: T[]) => Promise<R[]>,
    options: {
      batchSize?: number;
      batchDelay?: number;
    } = {}
  ) {
    this.processFn = processFn;
    this.batchSize = options.batchSize || 10;
    this.batchDelay = options.batchDelay || 50;
  }

  async add(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      const index = this.batch.length;
      this.batch.push(item);

      // Schedule batch processing
      if (this.batch.length >= this.batchSize) {
        this.flush().then((results) => {
          resolve(results[index]);
        }).catch(reject);
      } else {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
          this.flush().then((results) => {
            resolve(results[index]);
          }).catch(reject);
        }, this.batchDelay);
      }
    });
  }

  async flush(): Promise<R[]> {
    if (this.batch.length === 0) {return [];}

    const currentBatch = [...this.batch];
    this.batch = [];

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    return this.processFn(currentBatch);
  }
}

/**
 * Debounce function (non-async)
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delayMs);
  };
}

/**
 * Throttle function (non-async)
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limitMs: number
): (...args: Parameters<T>) => void {
  let lastRun = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastRun >= limitMs) {
      lastRun = now;
      fn(...args);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        lastRun = Date.now();
        fn(...args);
      }, limitMs - (now - lastRun));
    }
  };
}

/**
 * Create passive event listener
 */
export function addPassiveListener(
  target: EventTarget,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): void {
  const passive = { passive: true, ...options };
  target.addEventListener(event, handler, passive);
}

/**
 * FPS monitor
 */
export class FPSMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;
  private rafId: number | null = null;
  private callback: (fps: number) => void;

  constructor(callback: (fps: number) => void) {
    this.callback = callback;
  }

  start(): void {
    const loop = () => {
      this.frameCount++;
      const currentTime = performance.now();

      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.callback(this.fps);

        this.frameCount = 0;
        this.lastTime = currentTime;
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  getFPS(): number {
    return this.fps;
  }
}

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