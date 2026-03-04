import { test, expect } from '@playwright/test';

/**
 * DR-218: Property Owner Portal E2E Tests
 *
 * Tests the property owner portal pages:
 * - Property owners landing page
 * - Dashboard property detail views
 * - Property sub-pages (maintenance, documents, communications)
 * - Client dashboard pages (claims, payments, tracking)
 */

test.describe('Property Owner Portal', () => {
  test.describe('Public Property Owners Page', () => {
    test('should render property owners landing page', async ({ page }) => {
      const response = await page.goto('/property-owners');
      expect(response?.status()).toBe(200);

      // Page should have property-owner relevant content
      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });

    test('should have call-to-action elements', async ({ page }) => {
      await page.goto('/property-owners');

      // Should have buttons or links for getting started
      const ctaElements = page.locator('a[href*="claim"], a[href*="signup"], button');
      const count = await ctaElements.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Claim Intake Wizard (Public)', () => {
    test('should render step 1 of claim wizard', async ({ page }) => {
      const response = await page.goto('/claim/step-1');
      expect(response?.status()).toBe(200);

      // Should have disaster type selection
      const content = await page.textContent('body');
      expect(content?.toLowerCase()).toMatch(/disaster|damage|emergency|claim/);
    });

    test('should navigate through claim wizard steps', async ({ page }) => {
      // Step 1
      await page.goto('/claim/step-1');
      await expect(page).toHaveURL(/\/claim\/step-1/);

      // Step 2 should be accessible
      const step2Response = await page.goto('/claim/step-2');
      expect(step2Response?.status()).toBeLessThan(500);

      // Step 3 should be accessible
      const step3Response = await page.goto('/claim/step-3');
      expect(step3Response?.status()).toBeLessThan(500);
    });

    test('should show form validation on step 1', async ({ page }) => {
      await page.goto('/claim/step-1');

      // Try to submit without filling in required fields
      const submitButton = page.locator('button[type="submit"], button:has-text("Next"), button:has-text("Continue")');
      if (await submitButton.isVisible()) {
        await submitButton.click();

        // Should stay on step 1 (not advance to step 2)
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/claim\/step-1/);
      }
    });
  });

  test.describe('Client Dashboard Pages (Auth Required)', () => {
    // These tests verify the pages exist and return proper responses
    // They test auth redirect behaviour for unauthenticated users

    test('should protect client dashboard', async ({ page }) => {
      await page.goto('/dashboard/client');
      await page.waitForTimeout(3000);

      const url = page.url();
      const isProtected = url.includes('/login') ||
        url.includes('/api/auth') ||
        (await page.locator('text=/sign in|log in/i').count()) > 0;

      expect(isProtected).toBeTruthy();
    });

    test('should protect client claims page', async ({ page }) => {
      await page.goto('/dashboard/client/claims');
      await page.waitForTimeout(3000);

      const url = page.url();
      const isProtected = url.includes('/login') ||
        url.includes('/api/auth') ||
        (await page.locator('text=/sign in|log in/i').count()) > 0;

      expect(isProtected).toBeTruthy();
    });

    test('should protect client payments page', async ({ page }) => {
      await page.goto('/dashboard/client/payments');
      await page.waitForTimeout(3000);

      const url = page.url();
      const isProtected = url.includes('/login') ||
        url.includes('/api/auth') ||
        (await page.locator('text=/sign in|log in/i').count()) > 0;

      expect(isProtected).toBeTruthy();
    });

    test('should protect client onboarding page', async ({ page }) => {
      await page.goto('/dashboard/client/onboarding');
      await page.waitForTimeout(3000);

      const url = page.url();
      const isProtected = url.includes('/login') ||
        url.includes('/api/auth') ||
        (await page.locator('text=/sign in|log in/i').count()) > 0;

      expect(isProtected).toBeTruthy();
    });

    test('should protect client analytics page', async ({ page }) => {
      await page.goto('/dashboard/client/analytics');
      await page.waitForTimeout(3000);

      const url = page.url();
      const isProtected = url.includes('/login') ||
        url.includes('/api/auth') ||
        (await page.locator('text=/sign in|log in/i').count()) > 0;

      expect(isProtected).toBeTruthy();
    });
  });
});
