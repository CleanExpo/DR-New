/**
 * Async Utility Functions
 * Promise utilities, retry logic, timeout handling, and error boundaries
 */

/**
 * Async error handling wrapper
 * Returns [error, data] tuple for clean error handling
 */
export async function asyncCatch<T>(
  promise: Promise<T>
): Promise<[null, T] | [Error, null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
}

/**
 * Retry async function with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
    shouldRetry?: (error: Error) => boolean;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2,
    shouldRetry = () => true,
    onRetry,
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if we should retry
      if (attempt === maxAttempts || !shouldRetry(lastError)) {
        throw lastError;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        initialDelay * Math.pow(backoffMultiplier, attempt - 1),
        maxDelay
      );

      // Call onRetry callback
      if (onRetry) {
        onRetry(attempt, lastError);
      }

      // Wait before retry
      await sleep(delay);
    }
  }

  throw lastError!;
}

/**
 * Add timeout to promise
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutError?: Error
): Promise<T> {
  return Promise.race([
    promise,
    sleep(timeoutMs).then(() => {
      throw timeoutError || new Error(`Operation timed out after ${timeoutMs}ms`);
    }),
  ]);
}

/**
 * Sleep for specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce async function
 */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: NodeJS.Timeout | null = null;
  let pendingPromise: Promise<ReturnType<T>> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!pendingPromise) {
      pendingPromise = new Promise<ReturnType<T>>((resolve, reject) => {
        timeoutId = setTimeout(async () => {
          try {
            const result = await fn(...args);
            resolve(result);
          } catch (error) {
            reject(error);
          } finally {
            pendingPromise = null;
            timeoutId = null;
          }
        }, delayMs);
      });
    }

    return pendingPromise;
  };
}

/**
 * Throttle async function
 */
export function throttleAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  limitMs: number
): (...args: Parameters<T>) => Promise<ReturnType<T> | null> {
  let lastRun = 0;
  let pendingPromise: Promise<ReturnType<T>> | null = null;

  return async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
    const now = Date.now();

    if (now - lastRun >= limitMs) {
      lastRun = now;
      return fn(...args);
    }

    if (pendingPromise) {
      return pendingPromise;
    }

    pendingPromise = new Promise<ReturnType<T>>((resolve) => {
      setTimeout(async () => {
        lastRun = Date.now();
        const result = await fn(...args);
        pendingPromise = null;
        resolve(result);
      }, limitMs - (now - lastRun));
    });

    return pendingPromise;
  };
}

/**
 * Batch async operations
 */
export async function batchAsync<T, R>(
  items: T[],
  fn: (batch: T[]) => Promise<R>,
  batchSize = 10
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const result = await fn(batch);
    results.push(result);
  }

  return results;
}

/**
 * Run async operations in parallel with concurrency limit
 */
export async function parallelAsync<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency = 5
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  const executing: Promise<void>[] = [];

  for (let i = 0; i < items.length; i++) {
    const promise = fn(items[i]).then((result) => {
      results[i] = result;
    });

    executing.push(promise);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex((p) => p === promise),
        1
      );
    }
  }

  await Promise.all(executing);
  return results;
}

/**
 * Deduplicate concurrent requests
 */
export class RequestDeduplicator<T = any> {
  private pending = new Map<string, Promise<T>>();

  async dedupe(key: string, fn: () => Promise<T>): Promise<T> {
    // Return pending request if exists
    if (this.pending.has(key)) {
      return this.pending.get(key)!;
    }

    // Create new request
    const promise = fn().finally(() => {
      this.pending.delete(key);
    });

    this.pending.set(key, promise);
    return promise;
  }

  clear(key?: string): void {
    if (key) {
      this.pending.delete(key);
    } else {
      this.pending.clear();
    }
  }

  has(key: string): boolean {
    return this.pending.has(key);
  }
}

/**
 * Memoize async function with cache
 */
export function memoizeAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: {
    ttl?: number;
    keyFn?: (...args: Parameters<T>) => string;
  } = {}
): T {
  const cache = new Map<string, { value: any; timestamp: number }>();
  const { ttl, keyFn = (...args) => JSON.stringify(args) } = options;

  return (async (...args: Parameters<T>) => {
    const key = keyFn(...args);

    // Check cache
    if (cache.has(key)) {
      const cached = cache.get(key)!;

      // Check if expired
      if (!ttl || Date.now() - cached.timestamp < ttl) {
        return cached.value;
      }

      cache.delete(key);
    }

    // Execute function
    const value = await fn(...args);

    // Store in cache
    cache.set(key, { value, timestamp: Date.now() });

    return value;
  }) as T;
}

/**
 * Create cancelable promise
 */
export function cancelablePromise<T>(
  promise: Promise<T>
): {
  promise: Promise<T>;
  cancel: () => void;
} {
  let isCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((value) => {
        if (!isCanceled) resolve(value);
      })
      .catch((error) => {
        if (!isCanceled) reject(error);
      });
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCanceled = true;
    },
  };
}

/**
 * Poll async function until condition is met
 */
export async function pollAsync<T>(
  fn: () => Promise<T>,
  options: {
    interval?: number;
    timeout?: number;
    condition?: (result: T) => boolean;
  } = {}
): Promise<T> {
  const { interval = 1000, timeout = 30000, condition = () => true } = options;

  const startTime = Date.now();

  while (true) {
    const result = await fn();

    if (condition(result)) {
      return result;
    }

    if (Date.now() - startTime >= timeout) {
      throw new Error(`Polling timed out after ${timeout}ms`);
    }

    await sleep(interval);
  }
}

/**
 * Promise.allSettled polyfill for older environments
 */
export async function allSettled<T>(
  promises: Promise<T>[]
): Promise<Array<{ status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any }>> {
  return Promise.all(
    promises.map((promise) =>
      promise
        .then((value) => ({ status: 'fulfilled' as const, value }))
        .catch((reason) => ({ status: 'rejected' as const, reason }))
    )
  );
}
