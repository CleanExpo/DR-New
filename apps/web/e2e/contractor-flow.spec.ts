import { test, expect, devices } from '@playwright/test';

/**
 * Contractor flow — access control and surface integrity (DR-905 rewrite).
 *
 * The previous version of this file was vacuous: a 15-step serial journey
 * against UI that was never exercised in CI, tautological placeholder
 * assertions, accept-any-status lists, fixed-sleep waits, swallowed redirect
 * errors, and an always-skipped DR-218 block gated on a storageState file CI
 * never creates.
 *
 * It is replaced by:
 *   - e2e/contractor-go-live.spec.ts — the signup -> lifecycle-rows -> session
 *     journey with DB-truth assertions (required blocking gate), and
 *   - this file — live negative tests with EXACT expected outcomes.
 *
 * Both run under the `golive-proof` Playwright project (retries: 0) as a
 * required blocking CI check.
 */

test.describe('Contractor surfaces — access control (live negatives)', () => {
  test('anonymous /dashboard/contractor is redirected to /login', async ({ page }) => {
    await page.goto('/dashboard/contractor');
    // Server-side dashboard layout redirects unauthenticated users (app/dashboard/layout.tsx).
    await expect(page).toHaveURL(/\/login/, { timeout: 30_000 });
  });

  test('anonymous /dashboard/admin contractor verification is redirected to /login', async ({
    page,
  }) => {
    await page.goto('/dashboard/admin/contractors/verification');
    // Centralized RBAC middleware redirects non-admin page requests to /login.
    await expect(page).toHaveURL(/\/login/, { timeout: 30_000 });
  });

  test('anonymous /api/admin/* is rejected with exactly 403 FORBIDDEN', async ({
    request,
  }) => {
    for (const route of [
      '/api/admin/contractor-verification/pending',
      '/api/admin/contractor-verification/action',
    ]) {
      const res = await request.get(route);
      expect(res.status(), `${route} must be admin-gated`).toBe(403);
      const body = (await res.json()) as { error?: string };
      expect(body.error).toBe('FORBIDDEN');
    }
  });

  test('anonymous contractor APIs are rejected with exactly 401', async ({ request }) => {
    for (const route of [
      '/api/contractor/stats',
      '/api/contractor/profile',
      '/api/contractor/earnings',
    ]) {
      const res = await request.get(route);
      expect(res.status(), `${route} must require authentication`).toBe(401);
    }
  });
});

test.describe('Contractor entry points — mobile integrity', () => {
  test('login and contractor signup render on mobile without horizontal overflow', async ({
    browser,
  }) => {
    const context = await browser.newContext({ ...devices['iPhone 12'] });
    const page = await context.newPage();

    await page.goto('/login');
    await expect(page.locator('button[type="submit"]')).toBeVisible({ timeout: 30_000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      )
    ).toBe(false);

    await page.goto('/signup?type=contractor');
    await expect(page.locator('#email')).toBeVisible({ timeout: 30_000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      )
    ).toBe(false);

    await context.close();
  });
});
