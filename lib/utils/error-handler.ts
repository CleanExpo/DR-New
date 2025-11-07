/**
 * Centralized Error Handling Utilities
 * Provides consistent error handling across the application
 */

import { NextResponse } from 'next/server';

/**
 * Application-specific error class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Convert error to a JSON response
   */
  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        details: this.details,
      },
    };
  }
}

/**
 * Common HTTP error classes
 */
export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details?: Record<string, unknown>) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details?: Record<string, unknown>) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details?: Record<string, unknown>) {
    super(message, 403, 'FORBIDDEN', details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found', details?: Record<string, unknown>) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', details?: Record<string, unknown>) {
    super(message, 409, 'CONFLICT', details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation Failed', details?: Record<string, unknown>) {
    super(message, 422, 'VALIDATION_ERROR', details);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too Many Requests', details?: Record<string, unknown>) {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', details);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', details?: Record<string, unknown>) {
    super(message, 500, 'INTERNAL_SERVER_ERROR', details);
  }
}

/**
 * Error response builder for API routes
 */
export function createErrorResponse(error: unknown): NextResponse {
  // Handle known AppError instances
  if (error instanceof AppError) {
    return NextResponse.json(error.toJSON(), { status: error.statusCode });
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return NextResponse.json(
      {
        error: {
          message: isDevelopment ? error.message : 'An unexpected error occurred',
          code: 'INTERNAL_ERROR',
          statusCode: 500,
          ...(isDevelopment && { stack: error.stack }),
        },
      },
      { status: 500 }
    );
  }

  // Handle unknown errors
  return NextResponse.json(
    {
      error: {
        message: 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
        statusCode: 500,
      },
    },
    { status: 500 }
  );
}

/**
 * Async error wrapper for API routes
 */
export function asyncHandler<T extends (...args: unknown[]) => Promise<any>>(fn: T): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      return createErrorResponse(error);
    }
  }) as T;
}

/**
 * Safe JSON parsing with error handling
 */
export function safeJsonParse<T = unknown>(
  json: string,
  fallback?: T
): T | undefined {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Safe async operation with retry logic
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: boolean;
    onError?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = true,
    onError,
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (onError) {
        onError(lastError, attempt);
      }

      if (attempt < maxAttempts) {
        const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError!;
}

/**
 * Safe property access with default value
 */
export function get<T, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
  defaultValue?: T[K]
): T[K] | undefined {
  return obj ? obj[key] : defaultValue;
}

/**
 * Type guard for error objects
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Type guard for AppError objects
 */
export function isAppError(value: unknown): value is AppError {
  return value instanceof AppError;
}

/**
 * Log error with context
 */
export function logError(
  error: unknown,
  context?: Record<string, unknown>
): void {
  const timestamp = new Date().toISOString();

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${timestamp}] Error:`, error);
    if (context) {
      console.error('Context:', context);
    }
  } else {
    // In production, you might want to send to a logging service
    const errorData = {
      timestamp,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
      context,
    };

    // TODO: Send to logging service
    console.error(JSON.stringify(errorData));
  }
}

/**
 * Create a timeout promise
 */
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  errorMessage = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), ms)
    ),
  ]);
}

/**
 * Validate environment variables
 */
export function validateEnv(
  variables: Record<string, string | undefined>,
  required: string[] = []
): void {
  const missing = required.filter(key => !variables[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Safe type assertion
 */
export function assertType<T>(
  value: unknown,
  validator: (value: unknown) => value is T,
  errorMessage = 'Type assertion failed'
): T {
  if (!validator(value)) {
    throw new TypeError(errorMessage);
  }
  return value;
}