import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage renders consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take screenshot of full page
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('emergency CTA is visually consistent', async ({ page }) => {
    await page.goto('/');

    const emergencyCTA = page.getByText(/24\/7/i).first();
    await expect(emergencyCTA).toHaveScreenshot('emergency-cta.png');
  });

  test('header navigation is visually stable', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header').first();
    await expect(header).toHaveScreenshot('header-navigation.png');
  });

  test('service cards render consistently', async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');

    const serviceGrid = page.locator('[class*="service"]').first();
    if (await serviceGrid.isVisible()) {
      await expect(serviceGrid).toHaveScreenshot('service-grid.png');
    }
  });

  test('footer renders consistently', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png');
  });

  test('water damage service page visual consistency', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('water-damage-service.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('mobile homepage renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('tablet view renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});
