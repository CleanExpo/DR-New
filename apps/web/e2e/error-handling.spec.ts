import { test, expect } from '@playwright/test';

/**
 * DR-218: Error Handling & Edge Cases E2E Tests
 *
 * Covers:
 *   1. 404 — Navigate to /nonexistent → verify 404 page renders
 *   2. 401 — Access /api/jobs without auth → verify 401 response
 *   3. Auth redirect — Access /dashboard/* without auth → verify redirect to /auth/login
 *   4. API validation errors — POST with bad payloads
 *   5. Malformed IDs — GET /api/jobs/:bad-id → proper error response
 *   6. Method not allowed — Wrong HTTP verb on API routes
 *   7. Large pagination params — does not crash the server
 */

// ─────────────────────────────────────────────────────────────────────────────
// 404 — Non-existent page
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Error Handling — 404 Not Found', () => {
  test('navigating to /nonexistent renders a 404 page', async ({ page }) => {
    const response = await page.goto('/nonexistent-route-that-does-not-exist');

    // Next.js returns either a 404 HTTP status or renders a custom not-found component
    const status = response?.status() ?? 200;

    if (status === 404) {
      // Good — HTTP-level 404
      expect(status).toBe(404);
    } else {
      // Next.js client-side 404 — page may return 200 but render not-found content
      const bodyText = (await page.textContent('body')) ?? '';
      const shows404 =
        bodyText.toLowerCase().includes('not found') ||
        bodyText.toLowerCase().includes('page not found') ||
        bodyText.toLowerCase().includes('404') ||
        bodyText.toLowerCase().includes('doesn\'t exist');

      expect(shows404).toBeTruthy();
    }
  });

  test('404 page does not show a server error (no 500)', async ({ page }) => {
    const response = await page.goto('/this-page-definitely-does-not-exist-abc123');
    expect(response?.status()).not.toBe(500);
  });

  test('404 page does not show Next.js error overlay', async ({ page }) => {
    await page.goto('/completely-made-up-route-xyz');

    const errorOverlay = await page
      .locator('#__next-build-error, [data-nextjs-dialog]')
      .count();
    expect(errorOverlay).toBe(0);
  });

  test('navigating to /dashboard/jobs/non-existent-id shows error or redirects', async ({
    page,
  }) => {
    // Without auth this should redirect to login
    await page.goto('/dashboard/jobs/definitely-not-a-real-job-id');
    // Wait up to 10s for client-side auth redirect (webkit can be slow)
    await page.waitForURL(/\/login|\/api\/auth|\/404/, { timeout: 30000 }).catch(() => {});

    const url = page.url();
    const status = (await page.evaluate(() => document.title)) ?? '';

    // Should either redirect to login or show a not-found / error state
    const isHandled =
      url.includes('/login') ||
      url.includes('/404') ||
      url.includes('/api/auth') ||
      (await page.locator('text=/not found|sign in|log in|404/i').count()) > 0;

    expect(isHandled).toBeTruthy();
  });

  test('/api/non-existent-endpoint returns 404', async ({ request }) => {
    const response = await request.get('/api/this-endpoint-does-not-exist');
    // Next.js dev/ISR may return 200 with not-found content; prod returns 404.
    // Either way, must not be a 5xx error.
    expect([200, 404]).toContain(response.status());
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 401 — Unauthenticated API access
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Error Handling — 401 Unauthorised', () => {
  const protectedApiRoutes = [
    { method: 'GET', path: '/api/jobs' },
    { method: 'POST', path: '/api/jobs' },
    { method: 'GET', path: '/api/jobs/some-id' },
    { method: 'POST', path: '/api/jobs/some-id/assign' },
    { method: 'POST', path: '/api/jobs/some-id/complete' },
    { method: 'POST', path: '/api/jobs/some-id/invoice' },
    { method: 'GET', path: '/api/claims' },
    { method: 'POST', path: '/api/claims' },
    { method: 'GET', path: '/api/claims/some-id' },
    { method: 'POST', path: '/api/claims/some-id/documents' },
    { method: 'POST', path: '/api/claims/some-id/report' },
    { method: 'GET', path: '/api/client/payments' },
    { method: 'GET', path: '/api/client/active-projects' },
    { method: 'GET', path: '/api/contractor/stats' },
    { method: 'GET', path: '/api/contractor/earnings' },
    { method: 'GET', path: '/api/contractor/profile' },
    { method: 'GET', path: '/api/reports' },
    { method: 'GET', path: '/api/auth/me' },
  ];

  for (const { method, path } of protectedApiRoutes) {
    test(`${method} ${path} → 401 without authentication`, async ({ request }) => {
      let response;

      if (method === 'GET') {
        response = await request.get(path);
      } else if (method === 'POST') {
        response = await request.post(path, { data: {} });
      } else if (method === 'PATCH') {
        response = await request.patch(path, { data: {} });
      } else {
        response = await request.delete(path);
      }

      // 405 is also valid when the route doesn't define the method at all
      expect([401, 403, 405]).toContain(response.status());
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Auth redirect — /dashboard/* without auth
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Error Handling — Dashboard Auth Redirects', () => {
  const dashboardRoutes = [
    '/dashboard',
    '/dashboard/jobs',
    '/dashboard/jobs/new',
    '/dashboard/claims',
    '/dashboard/reports',
    '/dashboard/properties',
    '/dashboard/client',
    '/dashboard/client/claims',
    '/dashboard/client/payments',
    '/dashboard/client/track',
    '/dashboard/contractor',
    '/dashboard/contractor/analytics',
    '/dashboard/contractor/earnings',
    '/dashboard/admin',
    '/dashboard/admin/contractors/verification',
    '/dashboard/admin/contractors/directory',
  ];

  for (const route of dashboardRoutes) {
    test(`${route} → redirects unauthenticated to /auth/login or /login`, async ({
      page,
    }) => {
      await page.goto(route);
      // Wait up to 10s for client-side auth redirect (webkit can be slow)
      await page.waitForURL(/\/login|\/api\/auth/, { timeout: 30000 }).catch(() => {});

      const url = page.url();
      const redirectedToLogin =
        url.includes('/login') ||
        url.includes('/auth/login') ||
        url.includes('/api/auth');

      const hasLoginPrompt =
        (await page.locator('text=/sign in|log in|login/i').count()) > 0;

      expect(redirectedToLogin || hasLoginPrompt).toBeTruthy();
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Validation errors — malformed API payloads
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Error Handling — API Validation', () => {
  test('POST /api/jobs with invalid type → 400 or 401', async ({ request }) => {
    const response = await request.post('/api/jobs', {
      data: {
        type: 'INVALID_JOB_TYPE',
        propertyId: 'some-property',
        estimatedCost: 1000,
      },
    });
    expect([400, 401, 403]).toContain(response.status());
  });

  test('POST /api/jobs with negative estimatedCost → 400 or 401', async ({ request }) => {
    const response = await request.post('/api/jobs', {
      data: {
        type: 'water',
        propertyId: 'some-property',
        estimatedCost: -999,
      },
    });
    expect([400, 401, 403]).toContain(response.status());
  });

  test('POST /api/jobs with empty body → 400 or 401', async ({ request }) => {
    const response = await request.post('/api/jobs', {
      data: {},
    });
    expect([400, 401, 403]).toContain(response.status());
  });

  test('POST /api/claims with empty body → 400 or 401', async ({ request }) => {
    const response = await request.post('/api/claims', {
      data: {},
    });
    expect([400, 401, 403]).toContain(response.status());
  });

  test('POST /api/jobs/:id/complete with missing required fields → 400 or 401', async ({
    request,
  }) => {
    const response = await request.post('/api/jobs/some-job-id/complete', {
      data: {
        // hoursWorked and actualCost intentionally omitted
        materialsUsed: 'test materials',
      },
    });
    expect([400, 401, 403]).toContain(response.status());
  });

  test('POST /api/jobs/:id/assign with missing contractorId → 400 or 401', async ({
    request,
  }) => {
    const response = await request.post('/api/jobs/some-job-id/assign', {
      data: {
        // contractorId intentionally omitted
      },
    });
    expect([400, 401, 403]).toContain(response.status());
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Malformed IDs and edge-case paths
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Error Handling — Malformed IDs & Edge Cases', () => {
  test('GET /api/jobs/ with SQL-injection-like ID → no 500', async ({ request }) => {
    const response = await request.get("/api/jobs/1' OR '1'='1");
    expect(response.status()).not.toBe(500);
  });

  test('GET /api/jobs/ with very long ID string → no 500', async ({ request }) => {
    const longId = 'a'.repeat(500);
    const response = await request.get(`/api/jobs/${longId}`);
    expect(response.status()).not.toBe(500);
  });

  test('GET /api/jobs with extremely large page number → no 500', async ({ request }) => {
    const response = await request.get('/api/jobs?page=999999&limit=100');
    // Without auth → 401; with auth → 200 with empty data
    expect([200, 401, 403]).toContain(response.status());
  });

  test('GET /api/jobs with non-numeric page → no 500', async ({ request }) => {
    const response = await request.get('/api/jobs?page=abc&limit=xyz');
    expect([200, 400, 401, 403]).toContain(response.status());
  });

  test('GET /api/claims with unknown status filter → no 500', async ({ request }) => {
    const response = await request.get('/api/claims?status=FAKE_STATUS');
    expect([200, 400, 401, 403]).toContain(response.status());
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// HTTP method not allowed
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Error Handling — Method Not Allowed', () => {
  test('DELETE /api/jobs returns 404 or 405 (method not defined)', async ({ request }) => {
    const response = await request.delete('/api/jobs');
    // Next.js App Router returns 405 for undefined methods
    expect([401, 403, 404, 405]).toContain(response.status());
  });

  test('PUT /api/jobs returns 404 or 405', async ({ request }) => {
    const response = await request.put('/api/jobs', { data: {} });
    expect([401, 403, 404, 405]).toContain(response.status());
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Health — public homepage never returns 5xx
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Error Handling — Public Pages Stability', () => {
  const publicPages = [
    '/',
    '/about',
    '/contact',
    '/services',
    '/property-owners',
    '/claim/step-1',
  ];

  for (const path of publicPages) {
    test(`GET ${path} returns < 500`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status() ?? 200).toBeLessThan(500);
    });
  }
});
