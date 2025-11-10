/**
 * Deployment Logging System
 * Structured logging for deployments and operations
 */

import fs from 'fs';
import path from 'path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  deployment?: {
    id?: string;
    version?: string;
    environment?: string;
  };
  performance?: {
    duration?: number;
    memory?: number;
  };
}

export class DeploymentLogger {
  private static instance: DeploymentLogger;
  private logDir: string;
  private deploymentId: string;
  private environment: string;

  private constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.deploymentId = process.env.VERCEL_GIT_COMMIT_SHA ||
                        process.env.NEXT_BUILD_ID ||
                        `local-${Date.now()}`;
    this.environment = process.env.VERCEL_ENV ||
                       process.env.NODE_ENV ||
                       'development';
    this.ensureLogDirectory();
  }

  static getInstance(): DeploymentLogger {
    if (!DeploymentLogger.instance) {
      DeploymentLogger.instance = new DeploymentLogger();
    }
    return DeploymentLogger.instance;
  }

  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private formatLogEntry(entry: LogEntry): string {
    return `${JSON.stringify({
      ...entry,
      deployment: {
        id: this.deploymentId,
        environment: this.environment,
        ...entry.deployment
      }
    })  }\n`;
  }

  private writeLog(level: LogLevel, message: string, context?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context
    };

    // Console output with colors
    this.consoleLog(entry);

    // File output
    this.fileLog(entry);
  }

  private consoleLog(entry: LogEntry): void {
    const colors = {
      debug: '\x1b[36m',   // Cyan
      info: '\x1b[32m',    // Green
      warn: '\x1b[33m',    // Yellow
      error: '\x1b[31m',   // Red
      critical: '\x1b[35m' // Magenta
    };
    const reset = '\x1b[0m';
    const color = colors[entry.level] || reset;

    console.log(
      `${color}[${entry.level.toUpperCase()}]${reset} ${entry.timestamp} - ${entry.message}`,
      entry.context ? entry.context : ''
    );
  }

  private fileLog(entry: LogEntry): void {
    try {
      const date = new Date().toISOString().split('T')[0];
      const logFile = path.join(this.logDir, `deployment-${date}.log`);

      fs.appendFileSync(logFile, this.formatLogEntry(entry));
    } catch (error) {
      console.error('Failed to write log to file:', error);
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.writeLog('debug', message, context);
  }

  info(message: string, context?: Record<string, any>): void {
    this.writeLog('info', message, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.writeLog('warn', message, context);
  }

  error(message: string, context?: Record<string, any>): void {
    this.writeLog('error', message, context);
  }

  critical(message: string, context?: Record<string, any>): void {
    this.writeLog('critical', message, context);
  }

  /**
   * Log deployment event
   */
  deployment(event: string, metadata?: Record<string, any>): void {
    this.info(`Deployment: ${event}`, {
      ...metadata,
      deploymentId: this.deploymentId,
      environment: this.environment
    });
  }

  /**
   * Log performance metrics
   */
  performance(metric: string, duration: number, metadata?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message: `Performance: ${metric}`,
      context: metadata,
      performance: {
        duration,
        memory: process.memoryUsage().heapUsed
      }
    };

    this.consoleLog(entry);
    this.fileLog(entry);
  }

  /**
   * Get logs for a specific date
   */
  getLogs(date?: string): LogEntry[] {
    const logDate = date || new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logDir, `deployment-${logDate}.log`);

    if (!fs.existsSync(logFile)) {
      return [];
    }

    const content = fs.readFileSync(logFile, 'utf-8');
    return content
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
  }

  /**
   * Get log statistics
   */
  getStatistics(date?: string): {
    total: number;
    byLevel: Record<LogLevel, number>;
    errorRate: number;
  } {
    const logs = this.getLogs(date);
    const byLevel: Record<LogLevel, number> = {
      debug: 0,
      info: 0,
      warn: 0,
      error: 0,
      critical: 0
    };

    logs.forEach(log => {
      byLevel[log.level] = (byLevel[log.level] || 0) + 1;
    });

    const errorCount = byLevel.error + byLevel.critical;
    const errorRate = logs.length > 0 ? (errorCount / logs.length) * 100 : 0;

    return {
      total: logs.length,
      byLevel,
      errorRate
    };
  }

  /**
   * Clean up old logs
   */
  cleanupOldLogs(daysToKeep: number = 30): void {
    const files = fs.readdirSync(this.logDir);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    files.forEach(file => {
      if (!file.startsWith('deployment-')) {return;}

      const filePath = path.join(this.logDir, file);
      const stats = fs.statSync(filePath);

      if (stats.mtime < cutoffDate) {
        fs.unlinkSync(filePath);
        this.info(`Deleted old log file: ${file}`);
      }
    });
  }
}

/**
 * Export singleton instance
 */
export const logger = DeploymentLogger.getInstance();

/**
 * Middleware logger helper
 */
export function logRequest(
  method: string,
  path: string,
  status: number,
  duration: number
): void {
  logger.info(`${method} ${path} - ${status}`, {
    method,
    path,
    status,
    duration
  });
}

/**
 * Structured deployment event logger
 */
export class DeploymentEventLogger {
  private startTime: number;
  private events: Array<{ name: string; timestamp: number; duration?: number }> = [];

  constructor(private deploymentName: string) {
    this.startTime = Date.now();
    logger.deployment('started', { name: deploymentName });
  }

  event(eventName: string): void {
    const now = Date.now();
    const duration = now - this.startTime;

    this.events.push({
      name: eventName,
      timestamp: now,
      duration
    });

    logger.deployment(eventName, {
      deployment: this.deploymentName,
      duration
    });
  }

  complete(success: boolean = true): void {
    const totalDuration = Date.now() - this.startTime;

    logger.deployment(success ? 'completed' : 'failed', {
      deployment: this.deploymentName,
      totalDuration,
      events: this.events.length,
      success
    });
  }

  getSummary() {
    return {
      deployment: this.deploymentName,
      totalDuration: Date.now() - this.startTime,
      events: this.events
    };
  }
}
