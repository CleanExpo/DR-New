/**
 * Secrets Validation
 * Validates critical environment variables at startup
 * Ensures the application fails fast if required secrets are missing
 */

/**
 * Validate all critical secrets on startup
 * Should be called early in application initialization
 */
export function validateSecrets(): void {
  const isProduction = process.env.NODE_ENV === 'production';
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
  const errors: string[] = [];
  const warnings: string[] = [];

  // Skip validation during build phase - secrets are not required for static generation
  if (isBuildPhase) {
    console.info('⏩ Skipping secrets validation during build phase');
    return;
  }

  // Critical secrets (application will not start without these)
  const criticalSecrets = [
    {
      name: 'NEXTAUTH_SECRET',
      env: process.env.NEXTAUTH_SECRET,
      description: 'NextAuth.js session signing secret',
    },
    {
      name: 'DATABASE_URL',
      env: process.env.DATABASE_URL,
      description: 'PostgreSQL database connection string',
    },
  ];

  // Important secrets (warnings in production, optional in development)
  const importantSecrets = [
    {
      name: 'JWT_SECRET',
      env: process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET,
      description: 'JWT token signing secret',
      production: true,
    },
    {
      name: 'STRIPE_SECRET_KEY',
      env: process.env.STRIPE_SECRET_KEY,
      description: 'Stripe API secret key for payments',
      production: true,
    },
    {
      name: 'STRIPE_WEBHOOK_SECRET',
      env: process.env.STRIPE_WEBHOOK_SECRET,
      description: 'Stripe webhook signing secret',
      production: true,
    },
    {
      name: 'UPSTASH_REDIS_REST_URL',
      env: process.env.UPSTASH_REDIS_REST_URL,
      description: 'Upstash Redis connection URL for rate limiting',
      production: true,
    },
    {
      name: 'UPSTASH_REDIS_REST_TOKEN',
      env: process.env.UPSTASH_REDIS_REST_TOKEN,
      description: 'Upstash Redis API token',
      production: true,
    },
  ];

  // Check critical secrets
  for (const secret of criticalSecrets) {
    if (!secret.env) {
      errors.push(
        `Missing critical secret: ${secret.name} (${secret.description})`
      );
    }
  }

  // Check important secrets (warnings only - features will handle missing secrets gracefully)
  for (const secret of importantSecrets) {
    if (!secret.env && (secret.production || isProduction)) {
      // Important secrets are warnings, not errors - allows app to start
      // Individual features should handle missing secrets gracefully
      warnings.push(
        `Missing ${isProduction ? 'important' : 'recommended'} secret: ${secret.name} (${secret.description})`
      );
    }
  }

  // Log warnings
  if (warnings.length > 0) {
    console.warn('⚠️  Secrets Validation Warnings:');
    warnings.forEach((warning) => {
      console.warn(`   - ${warning}`);
    });
  }

  // Fail on errors
  if (errors.length > 0) {
    console.error('❌ Secrets Validation Failed:');
    errors.forEach((error) => {
      console.error(`   - ${error}`);
    });

    if (isProduction) {
      throw new Error(
        `Application cannot start in production without all required secrets. Found ${errors.length} missing secrets.`
      );
    }
  }

  // Success message
  if (errors.length === 0 && warnings.length === 0) {
    console.info('✅ All required secrets validated successfully');
  }
}
