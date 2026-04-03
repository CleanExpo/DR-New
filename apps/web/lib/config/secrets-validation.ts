/**
 * Secrets Validation — DR-220
 * Validates critical environment variables at startup.
 * Blocks default/placeholder values and enforces minimum entropy in production.
 */

/**
 * Known placeholder / default strings that must never reach production.
 * Checked case-insensitively against the first 64 chars of each secret.
 */
const DEFAULT_PATTERNS = [
  'generate-with-openssl',
  'your-nextauth-secret',
  'your-secret',
  'change-this',
  'change_this',
  'replace-me',
  'replace_me',
  'todo',
  'secret-here',
  'secret_here',
  'xxx',
  'example',
  'placeholder',
  'test-only',
  'sk-ant-...',
  'sk-...',
  'whsec_...',
  're_...',
]

function isDefaultValue(value: string): boolean {
  const lower = value.toLowerCase().slice(0, 64)
  return DEFAULT_PATTERNS.some(p => lower.includes(p.toLowerCase()))
}

function hasMinimumEntropy(value: string, minLength = 32): boolean {
  return value.length >= minLength
}

/**
 * Validate all critical secrets on startup.
 * Called from lib/auth.ts at module initialisation time.
 */
export function validateSecrets(): void {
  const isProduction = process.env.NODE_ENV === 'production'
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'
  const errors: string[] = []
  const warnings: string[] = []

  // Skip validation during build phase — secrets are not available for static generation
  if (isBuildPhase) {
    console.info('⏩ Skipping secrets validation during build phase')
    return
  }

  // ─── Critical secrets — application will NOT start without these ─────────
  const criticalSecrets = [
    {
      name: 'NEXTAUTH_SECRET',
      env: process.env.NEXTAUTH_SECRET,
      description: 'NextAuth.js session-signing secret',
      minLength: 32,
    },
    {
      name: 'DATABASE_URL',
      env: process.env.DATABASE_URL,
      description: 'PostgreSQL connection string',
      minLength: 20,
    },
  ]

  // ─── Important secrets — warnings in development, errors in production ────
  const importantSecrets = [
    {
      name: 'JWT_SECRET',
      env: process.env.JWT_SECRET ?? process.env.NEXTAUTH_SECRET,
      description: 'JWT token-signing secret (falls back to NEXTAUTH_SECRET)',
      minLength: 32,
      production: true,
    },
    {
      name: 'STRIPE_SECRET_KEY',
      env: process.env.STRIPE_SECRET_KEY,
      description: 'Stripe API secret key for payments',
      minLength: 20,
      production: true,
    },
    {
      name: 'STRIPE_WEBHOOK_SECRET',
      env: process.env.STRIPE_WEBHOOK_SECRET,
      description: 'Stripe webhook signing secret',
      minLength: 20,
      production: true,
    },
    {
      name: 'UPSTASH_REDIS_REST_URL',
      env: process.env.UPSTASH_REDIS_REST_URL,
      description: 'Upstash Redis URL for rate limiting',
      minLength: 10,
      production: true,
    },
    {
      name: 'UPSTASH_REDIS_REST_TOKEN',
      env: process.env.UPSTASH_REDIS_REST_TOKEN,
      description: 'Upstash Redis API token',
      minLength: 20,
      production: true,
    },
  ]

  // ─── Validate critical secrets ────────────────────────────────────────────
  for (const secret of criticalSecrets) {
    if (!secret.env) {
      errors.push(`Missing critical secret: ${secret.name} (${secret.description})`)
      continue
    }
    if (isProduction && isDefaultValue(secret.env)) {
      errors.push(
        `LEAKED/DEFAULT secret detected in production: ${secret.name} — rotate immediately and set a new value.`
      )
    } else if (isProduction && !hasMinimumEntropy(secret.env, secret.minLength)) {
      errors.push(
        `Weak secret: ${secret.name} is shorter than ${secret.minLength} characters — generate a stronger value.`
      )
    }
  }

  // ─── Validate important secrets ───────────────────────────────────────────
  for (const secret of importantSecrets) {
    if (!secret.env) {
      if (isProduction || secret.production) {
        warnings.push(
          `Missing ${isProduction ? 'important' : 'recommended'} secret: ${secret.name} (${secret.description})`
        )
      }
      continue
    }
    if (isProduction && isDefaultValue(secret.env)) {
      warnings.push(
        `LEAKED/DEFAULT secret detected: ${secret.name} — rotate immediately.`
      )
    } else if (isProduction && !hasMinimumEntropy(secret.env, secret.minLength)) {
      warnings.push(
        `Weak secret: ${secret.name} is shorter than ${secret.minLength} characters.`
      )
    }
  }

  // ─── Output results ───────────────────────────────────────────────────────
  if (warnings.length > 0) {
    console.warn('⚠️  Secrets Validation Warnings:')
    warnings.forEach(w => console.warn(`   - ${w}`))
  }

  if (errors.length > 0) {
    console.error('❌ Secrets Validation Failed:')
    errors.forEach(e => console.error(`   - ${e}`))

    if (isProduction) {
      throw new Error(
        `Application cannot start in production: ${errors.length} secret(s) are missing, weak, or using default values. Rotate immediately.`
      )
    }
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.info('✅ All required secrets validated successfully')
  }
}

/**
 * Validate a single environment variable.
 */
export function validateSecret(
  name: string,
  value: string | undefined,
  required = false
): boolean {
  if (!value) {
    if (required) throw new Error(`Missing required secret: ${name}`)
    return false
  }
  if (value.length < 8) {
    console.warn(`⚠️  Secret ${name} appears too short (${value.length} chars)`)
  }
  return true
}
