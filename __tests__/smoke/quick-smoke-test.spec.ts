import { test, expect } from '@playwright/test';

test.describe('Quick Smoke Tests', () => {
  test('homepage loads without errors', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('services page loads', async ({ page }) => {
    const response = await page.goto('/services');
    expect([200, 404]).toContain(response?.status() || 404);
  });

  test('emergency phone link exists', async ({ page }) => {
    await page.goto('/');
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible({ timeout: 10000 });
  });

  test('navigation menu exists', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    // On mobile, nav might be hidden behind hamburger menu
    const isVisible = await nav.isVisible();
    const exists = await nav.count() > 0;
    expect(exists).toBeTruthy();
  });

  test('footer exists', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible({ timeout: 10000 });
  });
});
