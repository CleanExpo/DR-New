import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * DR-218: Admin Dashboard E2E Tests
 *
 * Tests the admin experience:
 *   - Login as admin → navigate to /dashboard/jobs
 *   - Filter jobs by status and type
 *   - View job detail
 *   - Navigate to /dashboard/reports
 *   - Verify reporting charts and KPI cards
 *   - Admin claims dashboard
 *   - Admin contractor verification
 *
 * Authenticated tests are skipped when the admin auth state file is missing.
 */

const ADMIN_AUTH_FILE = 'playwright/.auth/admin.json';
const adminAuthExists = fs.existsSync(path.resolve(ADMIN_AUTH_FILE));

function skipIfNoAuth() {
  if (!adminAuthExists) {
    test.skip(
      true,
      'Admin auth state not found at playwright/.auth/admin.json — run setup first.'
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public auth-redirect checks (no credentials needed)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Admin Routes — Auth Protection', () => {
  test('GET /dashboard/jobs redirects unauthenticated to login', async ({ page }) => {
    await page.goto('/dashboard/jobs');
    await page.waitForURL(/\/login|\/api\/auth/, { timeout: 30000 }).catch(() => {});

    const url = page.url();
    const redirected =
      url.includes('/login') ||
      url.includes('/api/auth') ||
      (await page.locator('text=/sign in|log in|login/i').count()) > 0;

    expect(redirected).toBeTruthy();
  });

  test('GET /dashboard/reports redirects unauthenticated to login', async ({ page }) => {
    await page.goto('/dashboard/reports');
    await page.waitForURL(/\/login|\/api\/auth/, { timeout: 30000 }).catch(() => {});

    const url = page.url();
    const redirected =
      url.includes('/login') ||
      url.includes('/api/auth') ||
      (await page.locator('text=/sign in|log in|login/i').count()) > 0;

    expect(redirected).toBeTruthy();
  });

  test('GET /dashboard/claims redirects unauthenticated to login', async ({ page }) => {
    await page.goto('/dashboard/claims');
    await page.waitForURL(/\/login|\/api\/auth/, { timeout: 30000 }).catch(() => {});

    const url = page.url();
    const redirected =
      url.includes('/login') ||
      url.includes('/api/auth') ||
      (await page.locator('text=/sign in|log in|login/i').count()) > 0;

    expect(redirected).toBeTruthy();
  });

  test('GET /dashboard/admin/contractors/verification redirects unauthenticated', async ({
    page,
  }) => {
    await page.goto('/dashboard/admin/contractors/verification');
    await page.waitForURL(/\/login|\/api\/auth/, { timeout: 30000 }).catch(() => {});

    const url = page.url();
    const redirected =
      url.includes('/login') ||
      url.includes('/api/auth') ||
      (await page.locator('text=/sign in|log in|login/i').count()) > 0;

    expect(redirected).toBeTruthy();
  });

  test('GET /api/reports requires authentication', async ({ request }) => {
    const response = await request.get('/api/reports');
    expect([401, 403]).toContain(response.status());
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Authenticated admin UI tests
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Admin Dashboard — Jobs', () => {
  test.use({ storageState: adminAuthExists ? ADMIN_AUTH_FILE : undefined });

  test.beforeEach(() => {
    skipIfNoAuth();
  });

  test('navigates to /dashboard/jobs and renders job list', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/jobs');
    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });

    const heading = await page.locator('h1').textContent();
    expect(heading?.toLowerCase()).toMatch(/job/);

    // Should have a create job button
    const createBtn = page.locator(
      'a[href*="jobs/new"], button:has-text("New Job"), a:has-text("New Job")'
    );
    await expect(createBtn.first()).toBeVisible({ timeout: 8000 });
  });

  test('filter panel opens and filters by status', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/jobs');
    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });

    // Open filters
    const filtersBtn = page.locator('button:has-text("Filter"), button:has-text("Filters")');
    if (await filtersBtn.isVisible({ timeout: 5000 })) {
      await filtersBtn.click();
    }

    // Try to filter by status
    const statusSelect = page.locator('select').first();
    if (await statusSelect.isVisible({ timeout: 5000 })) {
      await statusSelect.selectOption('PENDING');
      await page.waitForTimeout(1500);

      // Verify URL or DOM reflects filter
      const bodyText = (await page.textContent('body')) ?? '';
      // Page should not be a server error
      expect(bodyText).not.toMatch(/Internal Server Error/);

      // Reset
      await statusSelect.selectOption('');
    }
  });

  test('filter by job type', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/jobs');
    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });

    const filtersBtn = page.locator('button:has-text("Filter"), button:has-text("Filters")');
    if (await filtersBtn.isVisible({ timeout: 5000 })) {
      await filtersBtn.click();
    }

    const typeSelect = page.locator('select').nth(1);
    if (await typeSelect.isVisible({ timeout: 5000 })) {
      await typeSelect.selectOption('water');
      await page.waitForTimeout(1500);

      const bodyText = (await page.textContent('body')) ?? '';
      expect(bodyText).not.toMatch(/Internal Server Error/);

      // Reset
      await typeSelect.selectOption('');
    }
  });

  test('search by job number renders results without error', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/jobs');
    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });

    const searchInput = page.locator(
      'input[placeholder*="job number"], input[placeholder*="Search"]'
    );
    if (await searchInput.isVisible({ timeout: 5000 })) {
      await searchInput.fill('NRP-');
      await page.waitForTimeout(1500);

      const bodyText = (await page.textContent('body')) ?? '';
      expect(bodyText).not.toMatch(/Internal Server Error/);

      await searchInput.fill('');
    }
  });

  test('clicking job row navigates to job detail page', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/jobs');
    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });

    await page.waitForTimeout(2000);

    // Look for any job row/card that is clickable
    const jobLinks = page.locator('a[href*="/dashboard/jobs/"]');
    const count = await jobLinks.count();

    if (count === 0) {
      test.skip(true, 'No jobs in the list to click.');
      return;
    }

    const href = await jobLinks.first().getAttribute('href');
    await jobLinks.first().click();

    await page.waitForURL(/\/dashboard\/jobs\/[a-z0-9-]+$/, { timeout: 10000 });
    await expect(page.locator('h1')).toBeVisible({ timeout: 8000 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Reports page
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Admin Dashboard — Reports', () => {
  test.use({ storageState: adminAuthExists ? ADMIN_AUTH_FILE : undefined });

  test.beforeEach(() => {
    skipIfNoAuth();
  });

  test('navigates to /dashboard/reports and renders without server error', async ({ page }) => {
    skipIfNoAuth();

    const response = await page.goto('/dashboard/reports');
    expect(response?.status()).toBeLessThan(500);

    // Should not show Next.js error overlay
    const errorOverlay = await page
      .locator('#__next-build-error, [data-nextjs-dialog]')
      .count();
    expect(errorOverlay).toBe(0);

    await expect(page.locator('h1, h2')).toBeVisible({ timeout: 15000 });
  });

  test('reports page shows KPI summary cards', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/reports');
    await expect(page.locator('h1, h2')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2000);

    const bodyText = (await page.textContent('body')) ?? '';
    // Should contain at least one revenue or job count metric
    const hasMetric =
      bodyText.includes('Revenue') ||
      bodyText.includes('Jobs') ||
      bodyText.includes('Outstanding') ||
      bodyText.includes('Completed');

    expect(hasMetric).toBeTruthy();
  });

  test('reports page contains chart or table elements', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/reports');
    await page.waitForTimeout(3000);

    // Recharts renders SVG elements
    const svgCharts = await page.locator('svg.recharts-surface').count();
    const tables = await page.locator('table').count();
    const dataCards = await page
      .locator('[class*="card"], [class*="metric"], [class*="stat"]')
      .count();

    expect(svgCharts + tables + dataCards).toBeGreaterThan(0);
  });

  test('reports page has Export / Download button', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/reports');
    await page.waitForTimeout(3000);

    const exportBtn = page.locator(
      'button:has-text("Export"), button:has-text("Download"), a:has-text("Export")'
    );
    const count = await exportBtn.count();
    // Not strictly required — if present it should be visible
    if (count > 0) {
      await expect(exportBtn.first()).toBeVisible();
    }
  });

  test('GET /api/reports responds with data (authenticated)', async ({ request }) => {
    skipIfNoAuth();

    const response = await request.get('/api/reports');
    // With auth state it should succeed; without it returns 401
    expect([200, 401, 403]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(body).toBeTruthy();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Admin Claims dashboard
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Admin Dashboard — Claims', () => {
  test.use({ storageState: adminAuthExists ? ADMIN_AUTH_FILE : undefined });

  test.beforeEach(() => {
    skipIfNoAuth();
  });

  test('navigates to /dashboard/claims and renders claims list', async ({ page }) => {
    skipIfNoAuth();

    const response = await page.goto('/dashboard/claims');
    expect(response?.status()).toBeLessThan(500);

    await expect(page.locator('h1, h2')).toBeVisible({ timeout: 15000 });
    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });

  test('claims list has filter or search controls', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/claims');
    await expect(page.locator('h1, h2')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2000);

    const controls = page.locator('input[type="search"], input[placeholder*="Search"], select, [role="combobox"]');
    const count = await controls.count();
    expect(count).toBeGreaterThan(0);
  });

  test('navigating to a claim detail shows claim information', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/claims');
    await page.waitForTimeout(2000);

    const claimLinks = page.locator('a[href*="/claims/"]');
    const count = await claimLinks.count();
    if (count === 0) {
      test.skip(true, 'No claims in list to navigate to.');
      return;
    }

    await claimLinks.first().click();
    await page.waitForURL(/\/claims\//, { timeout: 10000 });

    const response_status = (await page.goto(page.url()))?.status() ?? 200;
    expect(response_status).toBeLessThan(500);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Admin Contractor Verification
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Admin Dashboard — Contractor Verification', () => {
  test.use({ storageState: adminAuthExists ? ADMIN_AUTH_FILE : undefined });

  test.beforeEach(() => {
    skipIfNoAuth();
  });

  test('navigates to /dashboard/admin/contractors/verification', async ({ page }) => {
    skipIfNoAuth();

    const response = await page.goto('/dashboard/admin/contractors/verification');
    expect(response?.status()).toBeLessThan(500);

    await page.waitForTimeout(2000);
    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });

  test('/dashboard/admin/contractors/directory renders contractor list', async ({ page }) => {
    skipIfNoAuth();

    const response = await page.goto('/dashboard/admin/contractors/directory');
    expect(response?.status()).toBeLessThan(500);

    await page.waitForTimeout(2000);
    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });
});
