import { prisma } from './connection';
import { cacheClient } from '../cache/redis';
import { queryMonitor } from './query-optimizer';

/**
 * Database and cache performance monitoring
 */

export interface PerformanceMetrics {
  database: {
    activeConnections: number;
    slowQueries: Array<{ query: string; duration: number }>;
    averageQueryTime: number;
    queriesPerSecond: number;
  };
  cache: {
    enabled: boolean;
    connected: boolean;
    hitRate: number;
    keyCount: number;
    memoryUsed: string;
  };
  timestamp: Date;
}

class PerformanceMonitor {
  private queryCount = 0;
  private cacheHits = 0;
  private cacheMisses = 0;
  private queryTimes: number[] = [];
  private readonly MAX_QUERY_TIMES = 1000;

  /**
   * Record query execution
   */
  recordQuery(duration: number) {
    this.queryCount++;
    this.queryTimes.push(duration);

    // Keep only recent queries
    if (this.queryTimes.length > this.MAX_QUERY_TIMES) {
      this.queryTimes.shift();
    }

    queryMonitor.logQuery('query', duration);
  }

  /**
   * Record cache hit
   */
  recordCacheHit() {
    this.cacheHits++;
  }

  /**
   * Record cache miss
   */
  recordCacheMiss() {
    this.cacheMisses++;
  }

  /**
   * Get performance metrics
   */
  async getMetrics(): Promise<PerformanceMetrics> {
    const cacheStats = await cacheClient.getStats();
    const slowQueries = queryMonitor.getSlowQueries(10);

    const averageQueryTime =
      this.queryTimes.length > 0
        ? this.queryTimes.reduce((a, b) => a + b, 0) / this.queryTimes.length
        : 0;

    const totalCacheRequests = this.cacheHits + this.cacheMisses;
    const hitRate =
      totalCacheRequests > 0 ? (this.cacheHits / totalCacheRequests) * 100 : 0;

    return {
      database: {
        activeConnections: 0, // Would need database-specific implementation
        slowQueries,
        averageQueryTime: Math.round(averageQueryTime * 100) / 100,
        queriesPerSecond: 0, // Would need time-based tracking
      },
      cache: {
        enabled: cacheStats.enabled,
        connected: cacheStats.connected,
        hitRate: Math.round(hitRate * 100) / 100,
        keyCount: cacheStats.keyCount,
        memoryUsed: cacheStats.memoryUsed,
      },
      timestamp: new Date(),
    };
  }

  /**
   * Reset metrics
   */
  reset() {
    this.queryCount = 0;
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.queryTimes = [];
    queryMonitor.clearLog();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    const total = this.cacheHits + this.cacheMisses;
    return {
      hits: this.cacheHits,
      misses: this.cacheMisses,
      total,
      hitRate: total > 0 ? (this.cacheHits / total) * 100 : 0,
    };
  }

  /**
   * Get query statistics
   */
  getQueryStats() {
    const total = this.queryTimes.length;
    const avg =
      total > 0
        ? this.queryTimes.reduce((a, b) => a + b, 0) / total
        : 0;
    const min = total > 0 ? Math.min(...this.queryTimes) : 0;
    const max = total > 0 ? Math.max(...this.queryTimes) : 0;

    return {
      count: this.queryCount,
      averageTime: Math.round(avg * 100) / 100,
      minTime: Math.round(min * 100) / 100,
      maxTime: Math.round(max * 100) / 100,
    };
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Middleware to track query performance
 */
export function trackQueryPerformance<T>(
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();

  return fn().finally(() => {
    const duration = Date.now() - start;
    performanceMonitor.recordQuery(duration);
  });
}

/**
 * Middleware to track cache performance
 */
export function trackCachePerformance<T>(
  fn: () => Promise<{ data: T | null; cached: boolean }>
): Promise<{ data: T | null; cached: boolean }> {
  return fn().then(result => {
    if (result.cached) {
      performanceMonitor.recordCacheHit();
    } else {
      performanceMonitor.recordCacheMiss();
    }
    return result;
  });
}

/**
 * Health check for database and cache
 */
export async function healthCheck(): Promise<{
  database: { status: 'healthy' | 'unhealthy'; message?: string };
  cache: { status: 'healthy' | 'unhealthy'; message?: string };
}> {
  const results = {
    database: { status: 'healthy' as const, message: undefined as string | undefined },
    cache: { status: 'healthy' as const, message: undefined as string | undefined },
  };

  // Check database
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    results.database = {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Database connection failed',
    };
  }

  // Check cache
  try {
    const stats = await cacheClient.getStats();
    if (!stats.connected) {
      results.cache = {
        status: 'unhealthy',
        message: 'Cache not connected',
      };
    }
  } catch (error) {
    results.cache = {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Cache connection failed',
    };
  }

  return results;
}

/**
 * Performance dashboard data
 */
export async function getPerformanceDashboard() {
  const [metrics, health, cacheStats, queryStats] = await Promise.all([
    performanceMonitor.getMetrics(),
    healthCheck(),
    cacheClient.getStats(),
    Promise.resolve(performanceMonitor.getQueryStats()),
  ]);

  return {
    health,
    metrics,
    cache: {
      ...cacheStats,
      performance: performanceMonitor.getCacheStats(),
    },
    queries: queryStats,
    timestamp: new Date(),
  };
}
