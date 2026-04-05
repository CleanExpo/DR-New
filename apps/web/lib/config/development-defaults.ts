// @ts-nocheck
/**
 * Development Defaults Security Configuration
 *
 * This module ensures that development-only features are properly gated
 * and cannot accidentally be enabled in production
 *
 * Rules:
 * 1. All debug/development features must check NODE_ENV
 * 2. Never enable test modes in production
 * 3. Fail fast if development defaults are detected in production
 */

import { NextRequest } from 'next/server';

export interface DevelopmentConfig {
  enableDebugLogging: boolean;
  enableMockData: boolean;
  allowTestTokens: boolean;
  enableBypassAuth: boolean;
}

/**
 * Get development configuration based on environment
 *
 * NEVER return dev-friendly values in production
 */
export function getDevelopmentConfig(): DevelopmentConfig {
  const isProduction = process.env.NODE_ENV === 'production';
  const isStaging = process.env.NODE_ENV === 'staging';

  if (isProduction) {
    // PRODUCTION: All dev features disabled
    return {
      enableDebugLogging: false,
      enableMockData: false,
      allowTestTokens: false,
      enableBypassAuth: false,
    };
  }

  if (isStaging) {
    // STAGING: Minimal dev features
    return {
      enableDebugLogging: false,
      enableMockData: false,
      allowTestTokens: false,
      enableBypassAuth: false,
    };
  }

  // DEVELOPMENT: Debug features available
  return {
    enableDebugLogging: true,
    enableMockData: false,
    allowTestTokens: true, // Allow 'test-token' for automated testing
    enableBypassAuth: false,
  };
}

/**
 * Check if development feature is safe to use
 * Logs warning if feature is disabled
 */
export function canUseDevFeature(featureName: string): boolean {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    console.error(
      `SECURITY: Attempted to use development feature '${featureName}' in production`
    );
    return false;
  }

  return true;
}

/**
 * Validate that no development defaults leak into production
 * Run this at startup to catch configuration errors
 */
export function validateProductionDefaults(): void {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) return; // Only validate in production

  // Check for common development defaults
  const issues: string[] = [];

  // Check for bypass auth
  if (process.env.BYPASS_AUTH === 'true') {
    issues.push('BYPASS_AUTH is enabled in production');
  }

  // Check for debug logging
  if (process.env.DEBUG === 'true' || process.env.DEBUG_API === 'true') {
    issues.push('DEBUG flags are enabled in production');
  }

  // Check for mock data
  if (process.env.USE_MOCK_DATA === 'true') {
    issues.push('USE_MOCK_DATA is enabled in production');
  }

  // Check for test mode
  if (process.env.TEST_MODE === 'true') {
    issues.push('TEST_MODE is enabled in production');
  }

  // Fail if issues found
  if (issues.length > 0) {
    console.error('❌ Production Safety Validation FAILED:');
    issues.forEach((issue) => {
      console.error(`   - ${issue}`);
    });

    throw new Error(
      `Application cannot start with development defaults in production. Found ${issues.length} issues.`
    );
  }

  console.info('✅ Production defaults validated - all development features properly disabled');
}

/**
 * Middleware to prevent development endpoints in production
 */
export async function blockDevEndpointInProduction(
  request: NextRequest,
  devPath: string
): Promise<Response | null> {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction && request.nextUrl.pathname.startsWith(devPath)) {
    return new Response('Not Found', { status: 404 });
  }

  return null;
}

/**
 * Enhanced logging for development
 * Automatically disabled in production
 */
export function devLog(message: string, data?: any): void {
  const config = getDevelopmentConfig();

  if (config.enableDebugLogging) {
    if (data) {
      console.log(`[DEV] ${message}`, data);
    } else {
      console.log(`[DEV] ${message}`);
    }
  }
}

/**
 * Strict mode enforcement
 * Some libraries behave differently in strict mode
 */
export const STRICT_MODE = process.env.NODE_ENV === 'production';

/**
 * Test/Development bypass
 * Can ONLY be used in development mode
 */
export function allowTestBypass(testToken: string): boolean {
  const config = getDevelopmentConfig();

  if (!config.allowTestTokens) {
    return false;
  }

  // Only accept known test tokens in development
  const validTestTokens = [
    'test-captcha-token',
    'test-token',
    'test-csrf-token',
    'test-2fa-token',
  ];

  return validTestTokens.includes(testToken);
}

/**
 * List all development features that are active
 * Useful for debugging configuration
 */
export function listActiveDevFeatures(): string[] {
  const config = getDevelopmentConfig();
  const active: string[] = [];

  if (config.enableDebugLogging) active.push('Debug Logging');
  if (config.enableMockData) active.push('Mock Data');
  if (config.allowTestTokens) active.push('Test Tokens');
  if (config.enableBypassAuth) active.push('Bypass Auth');

  return active;
}
