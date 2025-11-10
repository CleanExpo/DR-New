/**
 * Async Queue Implementation
 * FIFO queue with concurrency control and priority support
 */

interface QueueTask<T = any> {
  id: string;
  fn: () => Promise<T>;
  priority: number;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
  timeout?: number;
}

interface QueueOptions {
  concurrency?: number;
  timeout?: number;
  autoStart?: boolean;
}

/**
 * Async Queue with concurrency control
 */
export class AsyncQueue {
  private tasks: QueueTask[] = [];
  private running = 0;
  private concurrency: number;
  private defaultTimeout: number;
  private paused = false;
  private stats = {
    completed: 0,
    failed: 0,
    total: 0,
  };

  constructor(options: QueueOptions = {}) {
    this.concurrency = options.concurrency || 1;
    this.defaultTimeout = options.timeout || 30000;

    if (options.autoStart !== false) {
      this.start();
    }
  }

  /**
   * Add task to queue
   */
  async add<T>(
    fn: () => Promise<T>,
    options: {
      priority?: number;
      timeout?: number;
    } = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const task: QueueTask<T> = {
        id: `task-${Date.now()}-${Math.random()}`,
        fn,
        priority: options.priority || 0,
        resolve,
        reject,
        timeout: options.timeout || this.defaultTimeout,
      };

      this.tasks.push(task);
      this.stats.total++;

      // Sort by priority (higher priority first)
      this.tasks.sort((a, b) => b.priority - a.priority);

      this.process();
    });
  }

  /**
   * Process queue
   */
  private async process(): Promise<void> {
    if (this.paused || this.running >= this.concurrency || this.tasks.length === 0) {
      return;
    }

    const task = this.tasks.shift();
    if (!task) {return;}

    this.running++;

    try {
      const result = await this.executeTask(task);
      task.resolve(result);
      this.stats.completed++;
    } catch (error) {
      task.reject(error instanceof Error ? error : new Error(String(error)));
      this.stats.failed++;
    } finally {
      this.running--;
      this.process();
    }
  }

  /**
   * Execute single task
   */
  private async executeTask<T>(task: QueueTask<T>): Promise<T> {
    if (!task.timeout) {
      return task.fn();
    }

    return Promise.race([
      task.fn(),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Task ${task.id} timed out after ${task.timeout}ms`)),
          task.timeout
        )
      ),
    ]);
  }

  /**
   * Start queue processing
   */
  start(): void {
    this.paused = false;
    this.process();
  }

  /**
   * Pause queue processing
   */
  pause(): void {
    this.paused = true;
  }

  /**
   * Clear all pending tasks
   */
  clear(): void {
    this.tasks.forEach((task) => {
      task.reject(new Error('Task cancelled - queue cleared'));
    });
    this.tasks = [];
  }

  /**
   * Get queue statistics
   */
  getStats() {
    return {
      ...this.stats,
      pending: this.tasks.length,
      running: this.running,
    };
  }

  /**
   * Check if queue is idle
   */
  isIdle(): boolean {
    return this.tasks.length === 0 && this.running === 0;
  }

  /**
   * Wait for queue to be idle
   */
  async onIdle(): Promise<void> {
    if (this.isIdle()) {return;}

    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (this.isIdle()) {
          clearInterval(check);
          resolve();
        }
      }, 100);
    });
  }
}

/**
 * Priority Queue
 */
export class PriorityQueue<T = any> {
  private items: Array<{ value: T; priority: number }> = [];

  enqueue(value: T, priority = 0): void {
    this.items.push({ value, priority });
    this.items.sort((a, b) => b.priority - a.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.value;
  }

  peek(): T | undefined {
    return this.items[0]?.value;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}

/**
 * Rate Limited Queue
 */
export class RateLimitedQueue {
  private queue: AsyncQueue;
  private tokens: number;
  private maxTokens: number;
  private refillRate: number;
  private refillInterval: NodeJS.Timeout | null = null;

  constructor(options: {
    maxTokens?: number;
    refillRate?: number;
    refillIntervalMs?: number;
    concurrency?: number;
  } = {}) {
    this.maxTokens = options.maxTokens || 10;
    this.tokens = this.maxTokens;
    this.refillRate = options.refillRate || 1;

    this.queue = new AsyncQueue({
      concurrency: options.concurrency || 1,
      autoStart: false,
    });

    // Start token refill
    this.refillInterval = setInterval(() => {
      this.tokens = Math.min(this.tokens + this.refillRate, this.maxTokens);
      this.processQueue();
    }, options.refillIntervalMs || 1000);
  }

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return this.queue.add(async () => {
      await this.waitForToken();
      return fn();
    });
  }

  private async waitForToken(): Promise<void> {
    while (this.tokens < 1) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.tokens--;
  }

  private processQueue(): void {
    if (!this.queue.isIdle() && this.tokens >= 1) {
      this.queue.start();
    }
  }

  destroy(): void {
    if (this.refillInterval) {
      clearInterval(this.refillInterval);
      this.refillInterval = null;
    }
    this.queue.clear();
  }

  getStats() {
    return {
      ...this.queue.getStats(),
      tokens: this.tokens,
      maxTokens: this.maxTokens,
    };
  }
}
