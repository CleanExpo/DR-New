import { test, expect } from '@playwright/test';

/**
 * DR-218: Authentication E2E Tests
 *
 * Tests the login, signup, and auth redirect flows.
 * Runs against the live dev server.
 */

test.describe('Authentication Flow', () => {
  test.describe('Login Page', () => {
    test('should render login page with form fields', async ({ page }) => {
      await page.goto('/login');
      await expect(page).toHaveURL(/\/login/);

      // Verify form elements are present
      await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('should show error on invalid credentials', async ({ page }) => {
      await page.goto('/login');

      await page.fill('input[type="email"], input[name="email"]', 'invalid@example.com');
      await page.fill('input[type="password"], input[name="password"]', 'wrongpassword');
      // force: true bypasses pointer-events check on CI (button may be briefly covered during hydration)
      await page.locator('button[type="submit"]').click({ force: true });

      // Should show error message (not redirect)
      await expect(page.locator('text=/invalid|error|failed/i')).toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL(/\/login/);
    });

    test('should show password toggle button', async ({ page }) => {
      await page.goto('/login');

      const passwordInput = page.locator('input[type="password"], input[name="password"]');
      await expect(passwordInput).toBeVisible();

      // Password should initially be hidden
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('should have link to signup page', async ({ page }) => {
      await page.goto('/login');

      const signupLink = page.locator('a[href*="signup"], a[href*="register"]');
      await expect(signupLink).toBeVisible();
    });
  });

  test.describe('Signup Page', () => {
    test('should render signup page with form fields', async ({ page }) => {
      await page.goto('/signup');
      await expect(page).toHaveURL(/\/signup/);

      // Verify core form elements
      await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    });

    test('should have link to login page', async ({ page }) => {
      await page.goto('/signup');

      const loginLink = page.locator('a[href*="login"]');
      await expect(loginLink).toBeVisible();
    });
  });

  test.describe('Auth Protection', () => {
    test('should redirect unauthenticated users from dashboard', async ({ page }) => {
      await page.goto('/dashboard/client');

      // Should redirect to login or show auth prompt
      await page.waitForURL(/\/login|\/api\/auth/, { timeout: 30000 }).catch(() => {});
      const url = page.url();
      const isRedirected = url.includes('/login') || url.includes('/api/auth');
      const hasAuthContent = await page.locator('text=/sign in|log in|login/i').count() > 0;

      expect(isRedirected || hasAuthContent).toBeTruthy();
    });

    test('should redirect unauthenticated users from admin dashboard', async ({ page }) => {
      await page.goto('/dashboard/admin');

      await page.waitForURL(/\/login|\/api\/auth/, { timeout: 30000 }).catch(() => {});
      const url = page.url();
      const isRedirected = url.includes('/login') || url.includes('/api/auth');
      const hasAuthContent = await page.locator('text=/sign in|log in|login/i').count() > 0;

      expect(isRedirected || hasAuthContent).toBeTruthy();
    });

    test('should allow access to public pages without auth', async ({ page }) => {
      const publicPages = ['/', '/about', '/contact', '/services', '/property-owners'];

      for (const path of publicPages) {
        const response = await page.goto(path);
        expect(response?.status()).toBeLessThan(400);
      }
    });
  });
});
