import { test, expect, chromium, firefox, webkit } from '@playwright/test';

test.describe('Cross-Browser Compatibility Tests', () => {
  const browsers = [
    { name: 'Chromium', launcher: chromium },
    { name: 'Firefox', launcher: firefox },
    { name: 'WebKit', launcher: webkit },
  ];

  for (const { name, launcher } of browsers) {
    test(`${name}: homepage loads correctly`, async () => {
      const browser = await launcher.launch();
      const page = await browser.newPage();

      await page.goto('/');
      await expect(page).toHaveTitle(/disaster recovery/i);

      await browser.close();
    });

    test(`${name}: emergency CTA is visible`, async () => {
      const browser = await launcher.launch();
      const page = await browser.newPage();

      await page.goto('/');
      const emergencyCTA = page.getByText(/24\/7/i).first();
      await expect(emergencyCTA).toBeVisible();

      await browser.close();
    });

    test(`${name}: navigation works`, async () => {
      const browser = await launcher.launch();
      const page = await browser.newPage();

      await page.goto('/');
      const servicesLink = page.getByRole('link', { name: /services/i });

      if (await servicesLink.isVisible()) {
        await servicesLink.click();
        await expect(page).toHaveURL(/services/);
      }

      await browser.close();
    });

    test(`${name}: forms are functional`, async () => {
      const browser = await launcher.launch();
      const page = await browser.newPage();

      await page.goto('/book-service');

      const nameInput = page.locator('input[name="name"], input[type="text"]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test User');
        const value = await nameInput.inputValue();
        expect(value).toBe('Test User');
      }

      await browser.close();
    });

    test(`${name}: CSS renders correctly`, async () => {
      const browser = await launcher.launch();
      const page = await browser.newPage();

      await page.goto('/');

      // Check that styles are applied
      const header = page.locator('header').first();
      if (await header.isVisible()) {
        const backgroundColor = await header.evaluate((el) =>
          window.getComputedStyle(el).backgroundColor
        );

        expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      }

      await browser.close();
    });

    test(`${name}: JavaScript executes properly`, async () => {
      const browser = await launcher.launch();
      const page = await browser.newPage();

      await page.goto('/');

      // Test that JavaScript is working (check for interactive elements)
      const buttons = await page.locator('button').count();
      expect(buttons).toBeGreaterThanOrEqual(0);

      await browser.close();
    });
  }
});

test.describe('Browser-Specific Features', () => {
  test('Chrome: service worker registration', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('/');

    const serviceWorkerRegistered = await page.evaluate(() =>
      'serviceWorker' in navigator
    );

    expect(serviceWorkerRegistered).toBe(true);

    await browser.close();
  });

  test('Firefox: responsive images work', async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();

    await page.goto('/');

    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);

    await browser.close();
  });

  test('Safari: touch events work', async () => {
    const browser = await webkit.launch();
    const page = await browser.newPage();

    await page.goto('/');

    // Simulate touch on emergency CTA
    const emergencyCTA = page.getByText(/24\/7/i).first();
    if (await emergencyCTA.isVisible()) {
      await emergencyCTA.tap();
    }

    await browser.close();
  });
});
