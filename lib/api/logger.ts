/**
 * API Logger
 * Structured logging for API requests and errors
 */

import { LOG_LEVELS } from './config';

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

/**
 * Format log entry
 */
function formatLog(entry: LogEntry): string {
  return JSON.stringify(entry);
}

/**
 * Base logger function
 */
function log(level: string, message: string, context?: Record<string, any>): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
  };

  const formatted = formatLog(entry);

  switch (level) {
    case LOG_LEVELS.ERROR:
      console.error(formatted);
      break;
    case LOG_LEVELS.WARN:
      console.warn(formatted);
      break;
    case LOG_LEVELS.DEBUG:
      if (process.env.NODE_ENV === 'development') {
        console.debug(formatted);
      }
      break;
    default:
      console.log(formatted);
  }
}

/**
 * Log levels
 */
export const logger = {
  info: (message: string, context?: Record<string, any>) => {
    log(LOG_LEVELS.INFO, message, context);
  },

  warn: (message: string, context?: Record<string, any>) => {
    log(LOG_LEVELS.WARN, message, context);
  },

  error: (message: string, error?: Error, context?: Record<string, any>) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LOG_LEVELS.ERROR,
      message,
      context,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    };

    console.error(formatLog(entry));
  },

  debug: (message: string, context?: Record<string, any>) => {
    log(LOG_LEVELS.DEBUG, message, context);
  },

  // Specialized loggers
  api: {
    request: (method: string, path: string, context?: Record<string, any>) => {
      log(LOG_LEVELS.INFO, `API Request: ${method} ${path}`, context);
    },

    response: (
      method: string,
      path: string,
      status: number,
      duration: number,
      context?: Record<string, any>
    ) => {
      log(LOG_LEVELS.INFO, `API Response: ${method} ${path} ${status}`, {
        ...context,
        duration: `${duration}ms`,
      });
    },

    error: (
      method: string,
      path: string,
      error: Error,
      context?: Record<string, any>
    ) => {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: LOG_LEVELS.ERROR,
        message: `API Error: ${method} ${path}`,
        context,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      };

      console.error(formatLog(entry));
    },

    rateLimit: (ip: string, endpoint: string, remaining: number) => {
      log(LOG_LEVELS.WARN, `Rate limit check: ${endpoint}`, {
        ip,
        endpoint,
        remaining,
      });
    },

    rateLimitExceeded: (ip: string, endpoint: string) => {
      log(LOG_LEVELS.WARN, `Rate limit exceeded: ${endpoint}`, {
        ip,
        endpoint,
      });
    },

    validation: (errors: Array<{ field: string; message: string }>) => {
      log(LOG_LEVELS.WARN, 'Validation failed', { errors });
    },

    submission: (type: string, id: string, context?: Record<string, any>) => {
      log(LOG_LEVELS.INFO, `${type} submission: ${id}`, context);
    },
  },
};

/**
 * Create request logger with timing
 */
export function createRequestLogger(method: string, path: string) {
  const startTime = Date.now();

  return {
    info: (message: string, context?: Record<string, any>) => {
      logger.info(`${method} ${path}: ${message}`, context);
    },

    error: (message: string, error?: Error, context?: Record<string, any>) => {
      logger.error(`${method} ${path}: ${message}`, error, context);
    },

    complete: (status: number, context?: Record<string, any>) => {
      const duration = Date.now() - startTime;
      logger.api.response(method, path, status, duration, context);
    },
  };
}

/**
 * Performance monitoring
 */
export function measurePerformance<T>(
  operation: string,
  fn: () => T | Promise<T>
): Promise<T> {
  const startTime = Date.now();

  return Promise.resolve(fn()).then(
    result => {
      const duration = Date.now() - startTime;
      logger.debug(`Performance: ${operation}`, { duration: `${duration}ms` });
      return result;
    },
    error => {
      const duration = Date.now() - startTime;
      logger.error(`Performance error: ${operation}`, error, {
        duration: `${duration}ms`,
      });
      throw error;
    }
  );
}
