/**
 * Web Worker Pool Management
 * Provides efficient worker pool for parallel processing
 */

interface WorkerTask<T = any> {
  id: string;
  type: string;
  data: any;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
  timeout?: number;
}

interface WorkerPoolOptions {
  maxWorkers?: number;
  workerScript: string;
  timeout?: number;
}

interface WorkerInstance {
  worker: Worker;
  busy: boolean;
  taskCount: number;
}

/**
 * Worker Pool for parallel task processing
 */
export class WorkerPool {
  private workers: WorkerInstance[] = [];
  private queue: WorkerTask[] = [];
  private maxWorkers: number;
  private workerScript: string;
  private defaultTimeout: number;
  private activeWorkers = 0;

  constructor(options: WorkerPoolOptions) {
    this.maxWorkers = options.maxWorkers || navigator.hardwareConcurrency || 4;
    this.workerScript = options.workerScript;
    this.defaultTimeout = options.timeout || 30000; // 30 seconds default
  }

  /**
   * Initialize worker pool
   */
  private initWorker(): WorkerInstance {
    const worker = new Worker(this.workerScript);
    const instance: WorkerInstance = {
      worker,
      busy: false,
      taskCount: 0,
    };

    worker.addEventListener('message', (event) => {
      const { type } = event.data;

      if (type === 'READY') {
        // Worker is ready to accept tasks
        this.processQueue();
      }
    });

    worker.addEventListener('error', (error) => {
      console.error('Worker error:', error);
      this.handleWorkerError(instance, error);
    });

    this.workers.push(instance);
    return instance;
  }

  /**
   * Get available worker from pool
   */
  private getAvailableWorker(): WorkerInstance | null {
    // Try to find idle worker
    const idle = this.workers.find((w) => !w.busy);
    if (idle) {return idle;}

    // Create new worker if under limit
    if (this.workers.length < this.maxWorkers) {
      return this.initWorker();
    }

    // All workers busy
    return null;
  }

  /**
   * Execute task on worker
   */
  async execute<T = any>(
    type: string,
    data: any,
    timeout?: number
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const task: WorkerTask<T> = {
        id: `task-${Date.now()}-${Math.random()}`,
        type,
        data,
        resolve,
        reject,
        timeout: timeout || this.defaultTimeout,
      };

      this.queue.push(task);
      this.processQueue();
    });
  }

  /**
   * Process queued tasks
   */
  private processQueue(): void {
    if (this.queue.length === 0) {return;}

    const worker = this.getAvailableWorker();
    if (!worker) {return;}

    const task = this.queue.shift();
    if (!task) {return;}

    this.executeTask(worker, task);

    // Continue processing queue
    if (this.queue.length > 0) {
      this.processQueue();
    }
  }

  /**
   * Execute single task on worker
   */
  private executeTask(workerInstance: WorkerInstance, task: WorkerTask): void {
    const { worker } = workerInstance;
    workerInstance.busy = true;
    workerInstance.taskCount++;
    this.activeWorkers++;

    let timeoutId: NodeJS.Timeout | null = null;

    // Set up timeout
    if (task.timeout) {
      timeoutId = setTimeout(() => {
        task.reject(new Error(`Task ${task.id} timed out after ${task.timeout}ms`));
        this.releaseWorker(workerInstance);
      }, task.timeout);
    }

    // Set up message handler
    const handleMessage = (event: MessageEvent) => {
      const { type, data, error } = event.data;

      // Ignore progress messages
      if (type.includes('PROGRESS')) {return;}

      // Clear timeout
      if (timeoutId) {clearTimeout(timeoutId);}

      // Remove listener
      worker.removeEventListener('message', handleMessage);

      // Handle response
      if (type === 'ERROR' || error) {
        task.reject(new Error(error?.message || 'Worker task failed'));
      } else {
        task.resolve(data);
      }

      // Release worker for next task
      this.releaseWorker(workerInstance);
    };

    worker.addEventListener('message', handleMessage);

    // Send task to worker
    worker.postMessage({
      type: task.type,
      data: task.data,
    });
  }

  /**
   * Release worker back to pool
   */
  private releaseWorker(workerInstance: WorkerInstance): void {
    workerInstance.busy = false;
    this.activeWorkers--;

    // Process next task if queue has items
    if (this.queue.length > 0) {
      this.processQueue();
    }
  }

  /**
   * Handle worker error
   */
  private handleWorkerError(workerInstance: WorkerInstance, error: any): void {
    console.error('Worker error:', error);

    // Remove failed worker
    const index = this.workers.indexOf(workerInstance);
    if (index !== -1) {
      this.workers.splice(index, 1);
      workerInstance.worker.terminate();
    }

    // Create replacement worker
    if (this.workers.length < this.maxWorkers) {
      this.initWorker();
    }
  }

  /**
   * Get pool statistics
   */
  getStats() {
    return {
      totalWorkers: this.workers.length,
      activeWorkers: this.activeWorkers,
      queueLength: this.queue.length,
      workerStats: this.workers.map((w) => ({
        busy: w.busy,
        taskCount: w.taskCount,
      })),
    };
  }

  /**
   * Terminate all workers and clear queue
   */
  terminate(): void {
    // Reject all queued tasks
    this.queue.forEach((task) => {
      task.reject(new Error('Worker pool terminated'));
    });
    this.queue = [];

    // Terminate all workers
    this.workers.forEach((w) => w.worker.terminate());
    this.workers = [];
    this.activeWorkers = 0;
  }
}

/**
 * Create worker pool for quote calculations
 */
export function createQuoteWorkerPool(maxWorkers?: number): WorkerPool {
  return new WorkerPool({
    maxWorkers,
    workerScript: '/workers/quote-calculator.worker.js',
    timeout: 10000, // 10 seconds for quote calculations
  });
}

/**
 * Create worker pool for image processing
 */
export function createImageWorkerPool(maxWorkers?: number): WorkerPool {
  return new WorkerPool({
    maxWorkers,
    workerScript: '/workers/image-processor.worker.js',
    timeout: 60000, // 60 seconds for image processing
  });
}

/**
 * Simple worker wrapper for one-off tasks
 */
export async function runWorkerTask<T = any>(
  workerScript: string,
  type: string,
  data: any,
  timeout = 30000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerScript);
    let timeoutId: NodeJS.Timeout | null = null;

    // Set timeout
    if (timeout) {
      timeoutId = setTimeout(() => {
        worker.terminate();
        reject(new Error(`Worker task timed out after ${timeout}ms`));
      }, timeout);
    }

    worker.addEventListener('message', (event) => {
      const { type: messageType, data: responseData, error } = event.data;

      if (messageType === 'READY') {return;}

      if (timeoutId) {clearTimeout(timeoutId);}

      worker.terminate();

      if (messageType === 'ERROR' || error) {
        reject(new Error(error?.message || 'Worker task failed'));
      } else {
        resolve(responseData);
      }
    });

    worker.addEventListener('error', (error) => {
      if (timeoutId) {clearTimeout(timeoutId);}
      worker.terminate();
      reject(error);
    });

    worker.postMessage({ type, data });
  });
}
