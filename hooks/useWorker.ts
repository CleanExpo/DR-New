/**
 * React Hook for Web Workers
 * Simplifies worker usage in React components
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { WorkerPool } from '../lib/utils/workers';

interface UseWorkerOptions {
  maxWorkers?: number;
  timeout?: number;
  autoTerminate?: boolean;
}

interface UseWorkerReturn<T> {
  execute: (type: string, data: any) => Promise<T>;
  isExecuting: boolean;
  error: Error | null;
  stats: {
    totalWorkers: number;
    activeWorkers: number;
    queueLength: number;
  };
  terminate: () => void;
}

/**
 * Hook for using Web Workers in React components
 */
export function useWorker<T = any>(
  workerScript: string,
  options: UseWorkerOptions = {}
): UseWorkerReturn<T> {
  const poolRef = useRef<WorkerPool | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState({
    totalWorkers: 0,
    activeWorkers: 0,
    queueLength: 0,
  });

  // Initialize worker pool
  useEffect(() => {
    poolRef.current = new WorkerPool({
      workerScript,
      maxWorkers: options.maxWorkers,
      timeout: options.timeout,
    });

    return () => {
      if (options.autoTerminate !== false) {
        poolRef.current?.terminate();
      }
    };
  }, [workerScript, options.maxWorkers, options.timeout, options.autoTerminate]);

  // Execute task on worker
  const execute = useCallback(
    async (type: string, data: any): Promise<T> => {
      if (!poolRef.current) {
        throw new Error('Worker pool not initialized');
      }

      setIsExecuting(true);
      setError(null);

      try {
        const result = await poolRef.current.execute<T>(type, data, options.timeout);
        setStats(poolRef.current.getStats());
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsExecuting(false);
      }
    },
    [options.timeout]
  );

  // Terminate worker pool
  const terminate = useCallback(() => {
    poolRef.current?.terminate();
    poolRef.current = null;
  }, []);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (poolRef.current) {
        setStats(poolRef.current.getStats());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    execute,
    isExecuting,
    error,
    stats,
    terminate,
  };
}

/**
 * Hook for quote calculation worker
 */
export function useQuoteWorker() {
  return useWorker<any>('/workers/quote-calculator.worker.js', {
    maxWorkers: 2,
    timeout: 10000,
  });
}

/**
 * Hook for image processing worker
 */
export function useImageWorker() {
  return useWorker<any>('/workers/image-processor.worker.js', {
    maxWorkers: navigator.hardwareConcurrency || 4,
    timeout: 60000,
  });
}
