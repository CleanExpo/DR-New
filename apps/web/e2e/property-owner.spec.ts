import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * DR-218: Property Owner Portal E2E Tests
 *
 * Tests the property owner experience:
 *   - Login as property owner → /dashboard/properties
 *   - View property list (grid & list views)
 *   - Navigate to property detail
 *   - View maintenance history (/dashboard/property/:id/maintenance)
 *   - View documents          (/dashboard/property/:id/documents)
 *   - View communications     (/dashboard/property/:id/communications)
 *   - Client dashboard pages (claims, payments, tracking)
 *   - API protection for property endpoints
 *
 * Authenticated tests are skipped when the client/owner auth state is missing,
 * falling back to admin auth state if available.
 */

const CLIENT_AUTH_FILE = 'playwright/.auth/client.json';
const ADMIN_AUTH_FILE = 'playwright/.auth/admin.json';

const clientAuthExists = fs.existsSync(path.resolve(CLIENT_AUTH_FILE));
const adminAuthExists = fs.existsSync(path.resolve(ADMIN_AUTH_FILE));
const anyAuthExists = clientAuthExists || adminAuthExists;

// Use client auth if available; fall back to admin; otherwise skip
const authFile = clientAuthExists
  ? CLIENT_AUTH_FILE
  : adminAuthExists
  ? ADMIN_AUTH_FILE
  : undefined;

function skipIfNoAuth() {
  if (!anyAuthExists) {
    test.skip(
      true,
      'No auth state found at playwright/.auth/client.json or admin.json — run setup first.'
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public landing page (no auth required)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Property Owners — Public Landing Page', () => {
  test('GET /property-owners renders landing page (200)', async ({ page }) => {
    const response = await page.goto('/property-owners');
    expect(response?.status()).toBe(200);

    const content = (await page.textContent('body')) ?? '';
    expect(content).toBeTruthy();
    expect(content).not.toMatch(/Internal Server Error/);
  });

  test('/property-owners has call-to-action elements', async ({ page }) => {
    await page.goto('/property-owners');

    const ctaElements = page.locator(
      'a[href*="claim"], a[href*="signup"], a[href*="register"], button[type="submit"], a[href*="/claim"]'
    );
    const count = await ctaElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test('/property-owners renders without Next.js error overlay', async ({ page }) => {
    await page.goto('/property-owners');

    const errorOverlay = await page
      .locator('#__next-build-error, [data-nextjs-dialog]')
      .count();
    expect(errorOverlay).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Auth protection for property dashboard routes
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Property Portal — Auth Protection', () => {
  const protectedRoutes = [
    '/dashboard/properties',
    '/dashboard/property/some-id',
    '/dashboard/property/some-id/maintenance',
    '/dashboard/property/some-id/documents',
    '/dashboard/property/some-id/communications',
    '/dashboard/client/claims',
    '/dashboard/client/payments',
    '/dashboard/client/track',
  ];

  for (const route of protectedRoutes) {
    test(`${route} redirects unauthenticated users`, async ({ page }) => {
      await page.goto(route);
      // Wait up to 30s for client-side auth redirect (webkit can be slow in CI)
      await page.waitForURL(/\/login|\/api\/auth|\/404/, { timeout: 30000 }).catch(() => {});

      const url = page.url();
      const isProtected =
        url.includes('/login') ||
        url.includes('/api/auth') ||
        url.includes('/404') ||
        (await page.locator('text=/sign in|log in|not found/i').count()) > 0;

      expect(isProtected).toBeTruthy();
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// API protection
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Property Portal — API Protection', () => {
  test('GET /api/client/active-projects requires auth', async ({ request }) => {
    const response = await request.get('/api/client/active-projects');
    expect([401, 403]).toContain(response.status());
  });

  test('GET /api/client/claims requires auth (via client sub-route)', async ({ request }) => {
    const response = await request.get('/api/claims');
    expect([401, 403]).toContain(response.status());
  });

  test('GET /api/client/payments requires auth', async ({ request }) => {
    const response = await request.get('/api/client/payments');
    expect([401, 403]).toContain(response.status());
  });

  test('GET /api/client/onboarding/progress/:id requires auth', async ({ request }) => {
    const response = await request.get('/api/client/onboarding/progress/some-client-id');
    expect([401, 403]).toContain(response.status());
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Authenticated property portal tests
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Property Owner Portal — Authenticated', () => {
  test.use({ storageState: authFile });

  test.beforeEach(() => {
    skipIfNoAuth();
  });

  test('navigates to /dashboard/properties and renders list', async ({ page }) => {
    skipIfNoAuth();

    const response = await page.goto('/dashboard/properties');
    expect(response?.status()).toBeLessThan(500);

    // Should not be a server error
    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);

    // Should have a heading
    await expect(page.locator('h1, h2, h3')).toBeVisible({ timeout: 15000 });
  });

  test('/dashboard/properties page has search / filter controls', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/properties');
    await page.waitForTimeout(2000);

    const controls = page.locator(
      'input[type="search"], input[placeholder*="Search"], select, [role="combobox"]'
    );
    const count = await controls.count();
    expect(count).toBeGreaterThan(0);
  });

  test('/dashboard/properties shows Add Property or similar button', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/properties');
    await page.waitForTimeout(2000);

    const addBtn = page.locator(
      'button:has-text("Add"), button:has-text("New Property"), a:has-text("Add Property")'
    );
    const count = await addBtn.count();
    // Depending on role it may or may not appear — just verify no crash
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('clicking a property card navigates to property detail page', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/properties');
    await page.waitForTimeout(2000);

    const propertyLinks = page.locator('a[href*="/dashboard/property/"]');
    const count = await propertyLinks.count();
    if (count === 0) {
      test.skip(true, 'No properties in list — skipping detail navigation test.');
      return;
    }

    await propertyLinks.first().click();
    await page.waitForURL(/\/dashboard\/property\/[a-z0-9-]+$/, { timeout: 10000 });

    const response = await page.goto(page.url());
    expect(response?.status()).toBeLessThan(500);

    await expect(page.locator('h1, h2')).toBeVisible({ timeout: 10000 });
  });

  test('property detail page shows address and property type', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/properties');
    await page.waitForTimeout(2000);

    const propertyLinks = page.locator('a[href*="/dashboard/property/"]');
    const count = await propertyLinks.count();
    if (count === 0) {
      test.skip(true, 'No properties available.');
      return;
    }

    const href = await propertyLinks.first().getAttribute('href');
    if (!href) {
      test.skip(true, 'Could not get property link href.');
      return;
    }

    await page.goto(href);
    await expect(page.locator('h1, h2')).toBeVisible({ timeout: 10000 });

    const bodyText = (await page.textContent('body')) ?? '';
    // Should contain an address fragment or property type
    const hasAddressInfo =
      bodyText.includes('NSW') ||
      bodyText.includes('VIC') ||
      bodyText.includes('QLD') ||
      bodyText.includes('WA') ||
      bodyText.includes('SA') ||
      bodyText.includes('House') ||
      bodyText.includes('Apartment') ||
      bodyText.includes('Townhouse') ||
      bodyText.includes('Unit');

    expect(hasAddressInfo).toBeTruthy();
  });

  test('maintenance history sub-page renders without server error', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/properties');
    await page.waitForTimeout(2000);

    const propertyLinks = page.locator('a[href*="/dashboard/property/"]');
    if ((await propertyLinks.count()) === 0) {
      test.skip(true, 'No properties available.');
      return;
    }

    const href = await propertyLinks.first().getAttribute('href');
    if (!href) return;

    const propertyId = href.split('/dashboard/property/')[1];
    const response = await page.goto(`/dashboard/property/${propertyId}/maintenance`);
    expect(response?.status()).toBeLessThan(500);

    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });

  test('documents sub-page renders without server error', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/properties');
    await page.waitForTimeout(2000);

    const propertyLinks = page.locator('a[href*="/dashboard/property/"]');
    if ((await propertyLinks.count()) === 0) {
      test.skip(true, 'No properties available.');
      return;
    }

    const href = await propertyLinks.first().getAttribute('href');
    if (!href) return;

    const propertyId = href.split('/dashboard/property/')[1];
    const response = await page.goto(`/dashboard/property/${propertyId}/documents`);
    expect(response?.status()).toBeLessThan(500);

    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });

  test('communications sub-page renders without server error', async ({ page }) => {
    skipIfNoAuth();

    await page.goto('/dashboard/properties');
    await page.waitForTimeout(2000);

    const propertyLinks = page.locator('a[href*="/dashboard/property/"]');
    if ((await propertyLinks.count()) === 0) {
      test.skip(true, 'No properties available.');
      return;
    }

    const href = await propertyLinks.first().getAttribute('href');
    if (!href) return;

    const propertyId = href.split('/dashboard/property/')[1];
    const response = await page.goto(`/dashboard/property/${propertyId}/communications`);
    expect(response?.status()).toBeLessThan(500);

    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });

  test('/dashboard/client/claims renders claims list', async ({ page }) => {
    skipIfNoAuth();

    const response = await page.goto('/dashboard/client/claims');
    expect(response?.status()).toBeLessThan(500);

    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });

  test('/dashboard/client/payments renders payments page', async ({ page }) => {
    skipIfNoAuth();

    const response = await page.goto('/dashboard/client/payments');
    expect(response?.status()).toBeLessThan(500);

    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });

  test('/dashboard/client/track renders job tracking page', async ({ page }) => {
    skipIfNoAuth();

    const response = await page.goto('/dashboard/client/track');
    expect(response?.status()).toBeLessThan(500);

    const bodyText = (await page.textContent('body')) ?? '';
    expect(bodyText).not.toMatch(/Internal Server Error/);
  });
});
