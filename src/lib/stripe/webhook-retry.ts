/**
 * Stripe Webhook Retry Logic with Exponential Backoff
 *
 * Implements retry logic for transient failures in webhook processing.
 * This complements Stripe's built-in retry mechanism by handling:
 * - Database connection timeouts
 * - Temporary locks
 * - Rate limiting
 *
 * Note: Idempotency (webhook-idempotency.ts) ensures safe retries without duplicates
 */

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxRetries: number; // Number of retry attempts
  initialDelayMs: number; // Initial backoff delay in milliseconds
  maxDelayMs: number; // Maximum backoff delay
  backoffMultiplier: number; // Exponential backoff multiplier
}

/**
 * Default retry configuration
 * - 3 retries: initial 100ms → 200ms → 400ms
 * - Max delay: 1000ms (1 second)
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 100,
  maxDelayMs: 1000,
  backoffMultiplier: 2,
};

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate backoff delay with exponential backoff
 */
function calculateBackoffDelay(attempt: number, config: RetryConfig): number {
  const exponentialDelay = config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt);
  return Math.min(exponentialDelay, config.maxDelayMs);
}

/**
 * Check if an error is retryable (transient failure)
 */
function isRetryableError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  // Prisma transient errors
  if (message.includes('connection') || message.includes('timeout') || message.includes('econnrefused')) {
    return true;
  }

  // Database lock/deadlock
  if (message.includes('deadlock') || message.includes('locked')) {
    return true;
  }

  // Rate limiting
  if (message.includes('rate') || message.includes('too many')) {
    return true;
  }

  // Service unavailable
  if (message.includes('unavailable') || message.includes('econnreset')) {
    return true;
  }

  return false;
}

/**
 * Execute a function with exponential backoff retry logic
 *
 * @param fn - Async function to execute
 * @param config - Retry configuration
 * @param context - Optional context for logging
 * @returns Result of the function
 * @throws Error if all retries fail
 *
 * @example
 * await retryWithBackoff(
 *   () => prisma.payment.update({ ... }),
 *   { maxRetries: 3, initialDelayMs: 100 },
 *   'mark-payment-complete'
 * );
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG,
  context?: string
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if error is retryable
      if (!isRetryableError(error)) {
        // Non-retryable error, throw immediately
        throw error;
      }

      // If this was the last attempt, throw
      if (attempt === config.maxRetries) {
        console.error(
          `Retry limit exceeded for ${context || 'webhook operation'} after ${config.maxRetries} attempts`,
          error
        );
        throw error;
      }

      // Calculate backoff and retry
      const delayMs = calculateBackoffDelay(attempt, config);
      console.warn(
        `${context || 'Webhook operation'} failed (attempt ${attempt + 1}/${config.maxRetries + 1}), retrying in ${delayMs}ms`,
        error instanceof Error ? error.message : String(error)
      );

      await sleep(delayMs);
    }
  }

  // Should never reach here, but just in case
  throw lastError || new Error('Unknown retry error');
}

/**
 * Retry configuration for different webhook scenarios
 */
export const WEBHOOK_RETRY_CONFIGS = {
  // Critical payment operations (mark as paid, create payment record)
  criticalPayment: {
    maxRetries: 5,
    initialDelayMs: 100,
    maxDelayMs: 2000,
    backoffMultiplier: 2,
  },

  // Non-critical operations (update status, create audit log)
  nonCritical: {
    maxRetries: 3,
    initialDelayMs: 100,
    maxDelayMs: 1000,
    backoffMultiplier: 2,
  },

  // Database queries (find, select operations)
  databaseQuery: {
    maxRetries: 3,
    initialDelayMs: 50,
    maxDelayMs: 500,
    backoffMultiplier: 2,
  },
};

/**
 * Retry a Prisma operation with appropriate config for the operation type
 *
 * @param operationType - Type of operation: 'criticalPayment', 'nonCritical', 'databaseQuery'
 * @param fn - Async Prisma operation
 * @param context - Optional logging context
 */
export async function retryPrismaOperation<T>(
  operationType: keyof typeof WEBHOOK_RETRY_CONFIGS,
  fn: () => Promise<T>,
  context?: string
): Promise<T> {
  const config = WEBHOOK_RETRY_CONFIGS[operationType];
  return retryWithBackoff(fn, config, `[${operationType}] ${context || 'database operation'}`);
}
