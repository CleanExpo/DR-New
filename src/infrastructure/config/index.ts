import { z } from 'zod';

/**
 * Configuration Schema
 *
 * Validates environment variables at startup
 * Fails fast if configuration is invalid
 */

const EnvironmentSchema = z.enum(['development', 'staging', 'production']);

const DatabaseConfigSchema = z.object({
  url: z.string().url('DATABASE_URL must be a valid URL'),
  maxConnections: z.number().int().positive().default(10),
  connectionTimeout: z.number().int().positive().default(10000),
});

const CacheConfigSchema = z.object({
  enabled: z.boolean().default(true),
  url: z.string().url('REDIS_URL must be a valid URL').optional(),
  ttl: z.number().int().positive().default(300), // 5 minutes
  maxMemory: z.string().default('100mb'),
});

const EmailConfigSchema = z.object({
  from: z.string().email('EMAIL_FROM must be a valid email'),
  apiKey: z.string().min(1, 'EMAIL_API_KEY is required'),
  provider: z.enum(['sendgrid', 'nodemailer']).default('nodemailer'),
});

const SecurityConfigSchema = z.object({
  jwtSecret: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  bcryptRounds: z.number().int().min(10).max(15).default(12),
  csrfEnabled: z.boolean().default(true),
  rateLimitPerMinute: z.number().int().positive().default(100),
});

const LoggingConfigSchema = z.object({
  level: z.enum(['error', 'warn', 'info', 'debug', 'trace']).default('info'),
  prettyPrint: z.boolean().default(false),
  destination: z.enum(['console', 'file', 'cloudwatch']).default('console'),
});

const AppConfigSchema = z.object({
  env: EnvironmentSchema,
  port: z.number().int().positive().default(3000),
  appUrl: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
  database: DatabaseConfigSchema,
  cache: CacheConfigSchema,
  email: EmailConfigSchema,
  security: SecurityConfigSchema,
  logging: LoggingConfigSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
export type Environment = z.infer<typeof EnvironmentSchema>;

/**
 * Load and validate configuration from environment variables
 */
export function loadConfig(): AppConfig {
  const rawConfig = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

    database: {
      url: process.env.DATABASE_URL,
      maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10),
      connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
    },

    cache: {
      enabled: process.env.CACHE_ENABLED !== 'false',
      url: process.env.REDIS_URL,
      ttl: parseInt(process.env.CACHE_TTL || '300', 10),
      maxMemory: process.env.REDIS_MAX_MEMORY || '100mb',
    },

    email: {
      from: process.env.EMAIL_FROM || 'noreply@dr-new.com',
      apiKey: process.env.EMAIL_API_KEY || 'dev-key',
      provider: process.env.EMAIL_PROVIDER || 'nodemailer',
    },

    security: {
      jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-please-change-in-production',
      bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
      csrfEnabled: process.env.CSRF_ENABLED !== 'false',
      rateLimitPerMinute: parseInt(process.env.RATE_LIMIT_PER_MINUTE || '100', 10),
    },

    logging: {
      level: process.env.LOG_LEVEL || 'info',
      prettyPrint: process.env.LOG_PRETTY === 'true',
      destination: process.env.LOG_DESTINATION || 'console',
    },
  };

  const result = AppConfigSchema.safeParse(rawConfig);

  if (!result.success) {
    console.error('Configuration validation failed:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error('Invalid configuration. Check environment variables.');
  }

  return result.data;
}

/**
 * Get configuration instance
 * Singleton pattern - config loaded once at startup
 */
let configInstance: AppConfig | null = null;

export function getConfig(): AppConfig {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getConfig().env === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getConfig().env === 'development';
}

/**
 * Check if running in staging
 */
export function isStaging(): boolean {
  return getConfig().env === 'staging';
}
