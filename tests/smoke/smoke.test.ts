/**
 * DR-217: Smoke Tests
 *
 * 12 automated smoke tests that run on every CI deployment.
 * Each test is fast (<5s) and validates a critical system behaviour.
 *
 * These tests run against the deployed application using BASE_URL
 * (defaults to http://localhost:3000 for local/CI).
 */

// Smoke tests need real HTTP. Prefer Node's native fetch on CI; only fall back to
// Undici when running on an older runtime without fetch.
beforeAll(() => {
  if (!global.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const undici = require('undici');
    global.fetch = undici.fetch;
  }
});

const BASE_URL = process.env.SMOKE_TEST_URL || process.env.BASE_URL || 'http://localhost:3000';

// Helper to make fetch requests with a timeout
async function smokeFetch(path: string, options?: RequestInit & { timeout?: number }) {
  const { timeout = 5000, ...fetchOptions } = options || {};
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

describe('Smoke Tests (DR-217)', () => {
  // =========================================================================
  // Test 1: Health endpoint — deep health (DR-907) with env-honest gating
  //
  // /api/health is a DEEP check since DR-907: HTTP 200 only when
  // database + stripe + storage are ALL genuinely healthy, 503 otherwise.
  // That semantic is spec-correct for deployed environments and must NOT be
  // weakened here. But the CI smoke job cannot honestly reach full health:
  // it has no real Stripe or Supabase credentials (owner-gated secrets).
  //
  // Contract enforced here, everywhere this suite runs:
  //   - the HTTP status and body.status must be CONSISTENT with the
  //     subsystem results (no lying in either direction);
  //   - the database must be GENUINELY healthy (CI provisions a real
  //     Postgres service; deployed envs have the real DB);
  //   - every gated subsystem must be healthy UNLESS it is explicitly
  //     declared unprovisionable for this environment via
  //     SMOKE_ALLOW_UNHEALTHY_SUBSYSTEMS (comma-separated). That variable is
  //     set ONLY in the CI smoke job (stripe,storage) — when this suite runs
  //     against a deployed environment it is unset, so full health (200) is
  //     required there, exactly as before.
  // =========================================================================
  it('Test 1: Health endpoint — deep health is consistent and DB is genuinely healthy', async () => {
    const res = await smokeFetch('/api/health');
    const body = await res.json();
    expect(body.timestamp).toBeDefined();

    const gatedSubsystems = ['database', 'stripe', 'storage'] as const;
    for (const name of gatedSubsystems) {
      expect(body.checks?.[name]?.status).toBeDefined();
    }

    // Status code and body.status must both follow the DR-907 contract.
    const allHealthy = gatedSubsystems.every(
      (name) => body.checks[name].status === 'healthy'
    );
    expect(res.status).toBe(allHealthy ? 200 : 503);
    expect(body.status).toBe(allHealthy ? 'healthy' : 'unhealthy');

    // The database is never allowed to be unhealthy in ANY smoke environment.
    expect(body.checks.database.status).toBe('healthy');

    // Any subsystem not explicitly declared unprovisionable must be healthy.
    const allowedUnhealthy = new Set(
      (process.env.SMOKE_ALLOW_UNHEALTHY_SUBSYSTEMS ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );
    expect(allowedUnhealthy.has('database')).toBe(false);
    for (const name of gatedSubsystems) {
      if (!allowedUnhealthy.has(name)) {
        expect(body.checks[name].status).toBe('healthy');
      }
    }
  });

  // =========================================================================
  // Test 2: Homepage renders without errors
  // =========================================================================
  it('Test 2: Homepage renders (200, no error strings)', async () => {
    const res = await smokeFetch('/');
    expect(res.status).toBe(200);

    const html = await res.text();
    // Should contain valid HTML
    expect(html).toContain('<!DOCTYPE html');
    // Should not contain server error indicators
    expect(html).not.toContain('Internal Server Error');
    expect(html).not.toContain('Application error');
    expect(html).not.toContain('NEXT_NOT_FOUND');
  });

  // =========================================================================
  // Test 3: Auth routes exist
  // =========================================================================
  it('Test 3: Auth endpoint responds (NextAuth)', async () => {
    const res = await smokeFetch('/api/auth/providers');
    // NextAuth providers endpoint should return 200
    expect(res.status).toBe(200);

    const body = await res.json();
    // Should return a providers object (even if empty)
    expect(typeof body).toBe('object');
  });

  // =========================================================================
  // Test 4: DB connection check
  // =========================================================================
  it('Test 4: Database health check responds', async () => {
    const res = await smokeFetch('/api/health/db');
    // Accepts 200 (connected) or 503 (no DB in CI) - just not 404/500
    expect([200, 503]).toContain(res.status);

    const body = await res.json();
    expect(body.status).toBeDefined();
    expect(body.timestamp).toBeDefined();
  });

  // =========================================================================
  // Test 5: Critical environment variables present
  // =========================================================================
  it('Test 5: Critical environment variables are defined', () => {
    // These must be set in any deployment environment
    const requiredVars = ['NODE_ENV'];
    for (const varName of requiredVars) {
      expect(process.env[varName]).toBeDefined();
    }

    // These should be set in production/staging but may be absent in CI
    const recommendedVars = [
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
      'DATABASE_URL',
    ];
    const missing = recommendedVars.filter((v) => !process.env[v]);
    if (missing.length > 0) {
      console.warn(`Smoke test warning: missing recommended env vars: ${missing.join(', ')}`);
    }
  });

  // =========================================================================
  // Test 6: Static assets served (favicon)
  // =========================================================================
  it('Test 6: Static assets — favicon returns 200', async () => {
    const res = await smokeFetch('/favicon.svg');
    expect(res.status).toBe(200);
  });

  // =========================================================================
  // Test 7: robots.txt exists
  // =========================================================================
  it('Test 7: robots.txt returns 200', async () => {
    const res = await smokeFetch('/robots.txt');
    expect(res.status).toBe(200);

    const text = await res.text();
    // Should contain basic robots.txt directives
    expect(text.toLowerCase()).toContain('user-agent');
  });

  // =========================================================================
  // Test 8: 404 page for nonexistent routes
  // =========================================================================
  it('Test 8: Nonexistent route is handled gracefully (no 5xx)', async () => {
    const res = await smokeFetch('/api/nonexistent-endpoint-xyz-smoke-test');
    // Next.js may return 200 (not-found page) or 404 depending on ISR/Sentry config.
    // Critical behaviour: unknown routes must NOT crash the server with a 5xx.
    expect(res.status).not.toBe(500);
    expect(res.status).not.toBe(502);
    expect(res.status).not.toBe(503);
  });

  // =========================================================================
  // Test 9: API auth protection — protected endpoint requires auth
  // =========================================================================
  it('Test 9: Protected API endpoint rejects unauthenticated requests', async () => {
    const res = await smokeFetch('/api/jobs/contractor-matching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claimId: 'test' }),
    });
    // Should return 401 (Unauthorized) or 403 (Forbidden), not 200 or 500
    expect([401, 403]).toContain(res.status);
  });

  // =========================================================================
  // Test 10: Stripe webhook endpoint exists (does not 404 or 500)
  // =========================================================================
  it('Test 10: Stripe webhook endpoint exists and rejects invalid requests', async () => {
    const res = await smokeFetch('/api/webhooks/stripe/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'test' }),
    });
    // Should return 400 (bad signature) or similar client error, not 404 or 500
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  // =========================================================================
  // Test 11: CORS headers present on public API responses
  // =========================================================================
  it('Test 11: API responses include expected headers', async () => {
    const res = await smokeFetch('/api/health');
    // Health endpoint should return JSON content type
    const contentType = res.headers.get('content-type');
    expect(contentType).toContain('application/json');
  });

  // =========================================================================
  // Test 12: Content-Security-Policy header present
  // =========================================================================
  it('Test 12: Security headers present on page responses', async () => {
    const res = await smokeFetch('/');
    // CSP is set by middleware for non-static routes
    const csp = res.headers.get('content-security-policy');
    expect(csp).toBeTruthy();
    expect(csp).toContain("default-src 'self'");

    // Additional security headers
    const xFrameOptions = res.headers.get('x-frame-options');
    expect(xFrameOptions).toBe('DENY');

    const xContentType = res.headers.get('x-content-type-options');
    expect(xContentType).toBe('nosniff');
  });
});
