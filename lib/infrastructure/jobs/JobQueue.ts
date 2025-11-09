/**
 * Job Queue - Infrastructure Layer
 * Background job processing with retry logic
 */

export interface Job<T = any> {
  id: string;
  type: string;
  data: T;
  attempts: number;
  maxAttempts: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  createdAt: Date;
  processedAt?: Date;
  completedAt?: Date;
}

export interface JobProcessor<T = any> {
  process(job: Job<T>): Promise<void>;
}

export class JobQueue {
  private jobs: Map<string, Job> = new Map();
  private processors: Map<string, JobProcessor> = new Map();
  private isProcessing = false;
  private processingInterval?: NodeJS.Timeout;

  registerProcessor<T>(jobType: string, processor: JobProcessor<T>): void {
    this.processors.set(jobType, processor);
  }

  async enqueue<T>(jobType: string, data: T, maxAttempts = 3): Promise<string> {
    const job: Job<T> = {
      id: crypto.randomUUID(),
      type: jobType,
      data,
      attempts: 0,
      maxAttempts,
      status: 'pending',
      createdAt: new Date(),
    };

    this.jobs.set(job.id, job);

    // Start processing if not already running
    if (!this.isProcessing) {
      this.startProcessing();
    }

    return job.id;
  }

  async getJob(jobId: string): Promise<Job | undefined> {
    return this.jobs.get(jobId);
  }

  async getJobsByStatus(status: Job['status']): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.status === status);
  }

  private startProcessing(): void {
    this.isProcessing = true;
    this.processingInterval = setInterval(() => this.processNextJob(), 1000);
  }

  stopProcessing(): void {
    this.isProcessing = false;
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
  }

  private async processNextJob(): Promise<void> {
    const pendingJobs = Array.from(this.jobs.values())
      .filter(job => job.status === 'pending')
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    if (pendingJobs.length === 0) {
      return;
    }

    const job = pendingJobs[0];
    await this.processJob(job);
  }

  private async processJob(job: Job): Promise<void> {
    const processor = this.processors.get(job.type);
    if (!processor) {
      job.status = 'failed';
      job.error = `No processor registered for job type: ${job.type}`;
      return;
    }

    job.status = 'processing';
    job.processedAt = new Date();
    job.attempts++;

    try {
      await processor.process(job);
      job.status = 'completed';
      job.completedAt = new Date();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (job.attempts >= job.maxAttempts) {
        job.status = 'failed';
        job.error = errorMessage;
      } else {
        // Retry with exponential backoff
        const delay = Math.pow(2, job.attempts) * 1000;
        setTimeout(() => {
          job.status = 'pending';
        }, delay);
      }
    }
  }

  async clearCompleted(): Promise<void> {
    const completed = Array.from(this.jobs.entries())
      .filter(([, job]) => job.status === 'completed');

    completed.forEach(([id]) => this.jobs.delete(id));
  }

  getStats(): { pending: number; processing: number; completed: number; failed: number } {
    const jobs = Array.from(this.jobs.values());
    return {
      pending: jobs.filter(j => j.status === 'pending').length,
      processing: jobs.filter(j => j.status === 'processing').length,
      completed: jobs.filter(j => j.status === 'completed').length,
      failed: jobs.filter(j => j.status === 'failed').length,
    };
  }
}
