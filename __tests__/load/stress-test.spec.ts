import { test, expect } from '@playwright/test';

test.describe('Stress and Load Tests', () => {
  test('homepage handles concurrent requests', async ({ browser }) => {
    const contexts = await Promise.all(
      Array(10).fill(0).map(() => browser.newContext())
    );

    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );

    // Load homepage concurrently
    const startTime = Date.now();
    const responses = await Promise.all(
      pages.map(page => page.goto('/'))
    );
    const loadTime = Date.now() - startTime;

    // All pages should load successfully
    responses.forEach(response => {
      expect(response?.status()).toBe(200);
    });

    // Should handle concurrent load reasonably well
    expect(loadTime).toBeLessThan(10000);

    // Cleanup
    await Promise.all(contexts.map(context => context.close()));
  });

  test('API handles rapid successive requests', async ({ request }) => {
    const requests = Array(20).fill(0).map((_, i) =>
      request.get(`/api/search?q=test${i}`)
    );

    const responses = await Promise.all(requests);

    // All requests should complete without errors
    responses.forEach(response => {
      expect(response.status()).toBeLessThan(500);
    });
  });

  test('page remains responsive under load', async ({ page }) => {
    await page.goto('/');

    // Simulate user interactions under load
    const interactions = [
      () => page.click('a[href="/services"]'),
      () => page.goBack(),
      () => page.click('a[href="/about-phil-mcgurk"]'),
      () => page.goBack(),
    ];

    for (const interaction of interactions) {
      await interaction();
      await page.waitForLoadState('domcontentloaded');
    }

    // Page should still be responsive
    const emergencyCTA = page.getByText(/24\/7/i).first();
    await expect(emergencyCTA).toBeVisible();
  });

  test('images load efficiently under pressure', async ({ page }) => {
    await page.goto('/');

    // Check that images start loading quickly
    const images = await page.locator('img').all();

    let loadedCount = 0;
    for (const img of images.slice(0, 5)) {
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete);
      if (isLoaded) loadedCount++;
    }

    // At least some images should be loaded/loading
    expect(loadedCount).toBeGreaterThan(0);
  });

  test('search handles high query volume', async ({ request }) => {
    const searchTerms = [
      'water damage Brisbane',
      'fire restoration Ipswich',
      'mould removal Logan',
      'emergency response',
      'Master Restorer',
    ];

    const responses = await Promise.all(
      searchTerms.map(term =>
        request.get(`/api/search?q=${encodeURIComponent(term)}`)
      )
    );

    // All searches should complete
    responses.forEach(response => {
      expect(response.status()).toBeLessThan(500);
    });
  });

  test('session handling under concurrent users', async ({ browser }) => {
    const contexts = await Promise.all(
      Array(5).fill(0).map(() => browser.newContext())
    );

    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );

    // Each user navigates independently
    await Promise.all(
      pages.map(async (page, index) => {
        await page.goto('/');
        await page.click(`a[href="/services"]`);
        await page.waitForLoadState('domcontentloaded');
      })
    );

    // All pages should be on services page
    for (const page of pages) {
      expect(page.url()).toContain('/services');
    }

    // Cleanup
    await Promise.all(contexts.map(context => context.close()));
  });
});
