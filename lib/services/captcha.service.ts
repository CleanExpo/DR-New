/**
 * CAPTCHA Verification Service
 * Handles verification of hCaptcha tokens
 * Prevents bot submissions and spam
 */

/**
 * Verify hCaptcha token with hCaptcha API
 *
 * @param token - hCaptcha token from client
 * @returns true if token is valid, false otherwise
 */
export async function verifyHCaptcha(token: string): Promise<boolean> {
  try {
    // Validate token format
    if (!token || typeof token !== 'string' || token.length < 10) {
      console.warn('Invalid CAPTCHA token format');
      return false;
    }

    // Get hCaptcha secret from environment
    const secret = process.env.HCAPTCHA_SECRET;
    if (!secret) {
      console.error('HCAPTCHA_SECRET not configured');
      return false;
    }

    // Verify with hCaptcha API
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        response: token,
        secret: secret,
      }),
    });

    if (!response.ok) {
      console.error(`hCaptcha API error: ${response.status} ${response.statusText}`);
      return false;
    }

    const data = await response.json();

    // Check if verification successful
    if (!data.success) {
      console.warn('hCaptcha verification failed:', data['error-codes']);
      return false;
    }

    // Validate timestamp (token must be recent, within 5 minutes)
    const tokenTime = new Date(data.challenge_ts).getTime();
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes

    if (now - tokenTime > maxAge) {
      console.warn('hCaptcha token too old');
      return false;
    }

    return true;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

/**
 * Verify CAPTCHA token with fallback
 * In production, always uses hCaptcha
 * In development, can be stricter or allow for testing
 *
 * @param token - CAPTCHA token from client
 * @returns true if valid
 */
export async function verifyCaptcha(token: string): Promise<boolean> {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isTest = process.env.NODE_ENV === 'test';

  // In test environment, allow bypass for automated testing
  if (isTest && token === 'test-captcha-token') {
    return true;
  }

  // Always require hCaptcha verification in production and staging
  if (!isDevelopment || process.env.REQUIRE_CAPTCHA === 'true') {
    return verifyHCaptcha(token);
  }

  // Development: still verify with hCaptcha if configured
  if (process.env.HCAPTCHA_SECRET) {
    return verifyHCaptcha(token);
  }

  // Development without hCaptcha: log warning but allow for development
  console.warn(
    'CAPTCHA verification bypassed in development mode. Set HCAPTCHA_SECRET or REQUIRE_CAPTCHA=true to enable verification.'
  );
  return true;
}

/**
 * Validate CAPTCHA configuration
 * Ensures hCaptcha is properly configured for the environment
 */
export function validateCaptchaConfig(): {
  isConfigured: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  const isProd = process.env.NODE_ENV === 'production';
  const hasSecret = !!process.env.HCAPTCHA_SECRET;
  const hasSiteKey = !!process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  if (isProd && !hasSecret) {
    warnings.push(
      'HCAPTCHA_SECRET not configured in production. CAPTCHA verification will fail.'
    );
  }

  if (isProd && !hasSiteKey) {
    warnings.push(
      'NEXT_PUBLIC_HCAPTCHA_SITE_KEY not configured in production. CAPTCHA widget will not work.'
    );
  }

  if (!hasSecret && !isProd) {
    warnings.push(
      'HCAPTCHA_SECRET not configured. Running in development mode with CAPTCHA disabled.'
    );
  }

  return {
    isConfigured: hasSecret && hasSiteKey,
    warnings,
  };
}
