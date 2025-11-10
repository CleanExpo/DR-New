/**
 * JavaScript Performance Monitoring
 * Comprehensive performance tracking for JavaScript execution
 */

import {
  mark,
  measure,
  timeAsync,
  LongTaskObserver,
  MemoryMonitor,
  FPSMonitor,
} from '../utils/performance';

interface JavaScriptError {
  message: string;
  stack?: string;
  filename?: string;
  line?: number;
  column?: number;
  timestamp: number;
}

interface PerformanceMetrics {
  longTasks: number;
  memoryLeaks: number;
  javascriptErrors: number;
  averageFPS: number;
  slowestOperations: Array<{ name: string; duration: number }>;
}

/**
 * JavaScript Performance Monitor
 */
export class JavaScriptPerformanceMonitor {
  private longTaskObserver: LongTaskObserver | null = null;
  private memoryMonitor: MemoryMonitor | null = null;
  private fpsMonitor: FPSMonitor | null = null;
  private errors: JavaScriptError[] = [];
  private longTasks: PerformanceEntry[] = [];
  private memoryLeaks: any[] = [];
  private fpsHistory: number[] = [];
  private operations: Map<string, number[]> = new Map();

  constructor() {
    this.initErrorTracking();
  }

  /**
   * Initialize error tracking
   */
  private initErrorTracking(): void {
    if (typeof window === 'undefined') {return;}

    // Track uncaught errors
    window.addEventListener('error', (event) => {
      this.errors.push({
        message: event.message,
        stack: event.error?.stack,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        timestamp: Date.now(),
      });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.errors.push({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        timestamp: Date.now(),
      });
    });
  }

  /**
   * Start monitoring
   */
  start(): void {
    // Monitor long tasks
    this.longTaskObserver = new LongTaskObserver(50, (entries) => {
      this.longTasks.push(...entries);

      // Log warning if task is very long
      entries.forEach((entry) => {
        if (entry.duration > 100) {
          console.warn(`Long task detected: ${entry.name} (${entry.duration.toFixed(2)}ms)`);
        }
      });
    });
    this.longTaskObserver.start();

    // Monitor memory
    this.memoryMonitor = new MemoryMonitor(50, (info) => {
      this.memoryLeaks.push(info);

      console.warn(
        `Potential memory leak detected: +${(info.delta / 1024 / 1024).toFixed(2)}MB (${info.deltaPercent.toFixed(1)}%)`
      );
    });
    this.memoryMonitor.start();

    // Monitor FPS
    this.fpsMonitor = new FPSMonitor((fps) => {
      this.fpsHistory.push(fps);

      // Keep last 60 samples (1 minute)
      if (this.fpsHistory.length > 60) {
        this.fpsHistory.shift();
      }

      // Log warning if FPS drops below 30
      if (fps < 30) {
        console.warn(`Low FPS detected: ${fps}`);
      }
    });
    this.fpsMonitor.start();
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    this.longTaskObserver?.stop();
    this.memoryMonitor?.stop();
    this.fpsMonitor?.stop();
  }

  /**
   * Track operation performance
   */
  async trackOperation<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const { result, duration } = await timeAsync(name, fn);

    if (!this.operations.has(name)) {
      this.operations.set(name, []);
    }

    this.operations.get(name)!.push(duration);

    // Log warning if operation is slow
    if (duration > 1000) {
      console.warn(`Slow operation: ${name} (${duration.toFixed(2)}ms)`);
    }

    return result;
  }

  /**
   * Get performance metrics
   */
  getMetrics(): PerformanceMetrics {
    const averageFPS =
      this.fpsHistory.length > 0
        ? this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length
        : 60;

    // Get slowest operations
    const slowestOperations = Array.from(this.operations.entries())
      .map(([name, durations]) => ({
        name,
        duration: Math.max(...durations),
        average: durations.reduce((a, b) => a + b, 0) / durations.length,
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10);

    return {
      longTasks: this.longTasks.length,
      memoryLeaks: this.memoryLeaks.length,
      javascriptErrors: this.errors.length,
      averageFPS,
      slowestOperations: slowestOperations.map(({ name, duration }) => ({
        name,
        duration,
      })),
    };
  }

  /**
   * Get JavaScript errors
   */
  getErrors(): JavaScriptError[] {
    return [...this.errors];
  }

  /**
   * Clear metrics
   */
  clear(): void {
    this.errors = [];
    this.longTasks = [];
    this.memoryLeaks = [];
    this.fpsHistory = [];
    this.operations.clear();
  }

  /**
   * Export metrics for analysis
   */
  exportMetrics(): string {
    const metrics = this.getMetrics();

    return JSON.stringify(
      {
        metrics,
        errors: this.errors,
        longTasks: this.longTasks.map((t) => ({
          name: t.name,
          duration: t.duration,
          startTime: t.startTime,
        })),
        memoryLeaks: this.memoryLeaks,
        operations: Object.fromEntries(
          Array.from(this.operations.entries()).map(([name, durations]) => [
            name,
            {
              count: durations.length,
              min: Math.min(...durations),
              max: Math.max(...durations),
              avg: durations.reduce((a, b) => a + b, 0) / durations.length,
            },
          ])
        ),
      },
      null,
      2
    );
  }
}

/**
 * Global performance monitor instance
 */
let globalMonitor: JavaScriptPerformanceMonitor | null = null;

/**
 * Get global performance monitor
 */
export function getPerformanceMonitor(): JavaScriptPerformanceMonitor {
  if (!globalMonitor) {
    globalMonitor = new JavaScriptPerformanceMonitor();
  }
  return globalMonitor;
}

/**
 * Start performance monitoring
 */
export function startPerformanceMonitoring(): void {
  const monitor = getPerformanceMonitor();
  monitor.start();
}

/**
 * Stop performance monitoring
 */
export function stopPerformanceMonitoring(): void {
  if (globalMonitor) {
    globalMonitor.stop();
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  const monitor = getPerformanceMonitor();
  return monitor.getMetrics();
}
