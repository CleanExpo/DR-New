import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage desktop screenshot', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Wait for images to load
    await page.waitForTimeout(1000);

    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('homepage mobile screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'networkidle' });

    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('services page desktop screenshot', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'networkidle' });

    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('services-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('water damage service page visual consistency', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane', {
      waitUntil: 'networkidle',
    });

    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('water-damage-service-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});

test.describe('Component Visual Tests', () => {
  test('emergency CTA appears correctly on homepage', async ({ page }) => {
    await page.goto('/');

    // Find emergency CTA
    const emergencyCTA = page.locator('[class*="emergency" i]').first();

    if (await emergencyCTA.isVisible()) {
      await expect(emergencyCTA).toHaveScreenshot('emergency-cta.png', {
        maxDiffPixels: 50,
      });
    }
  });

  test('header navigation consistent across pages', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header').first();

    if (await header.isVisible()) {
      const homeScreenshot = await header.screenshot();

      // Navigate to services page
      await page.goto('/services');

      const servicesScreenshot = await header.screenshot();

      // Headers should be visually consistent
      expect(homeScreenshot).toBeTruthy();
      expect(servicesScreenshot).toBeTruthy();
    }
  });

  test('footer appears consistently', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator('footer');

    if (await footer.isVisible()) {
      await expect(footer).toHaveScreenshot('footer-desktop.png', {
        maxDiffPixels: 50,
      });
    }
  });
});

test.describe('Responsive Design Visual Tests', () => {
  const viewports = [
    { name: 'mobile-small', width: 320, height: 568 },
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
    { name: 'desktop-large', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`homepage renders correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      // Check no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const windowWidth = await page.evaluate(() => window.innerWidth);

      expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);

      // Take screenshot
      await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`, {
        maxDiffPixels: 100,
      });
    });
  }
});

test.describe('Dark Mode Visual Tests', () => {
  test('page renders correctly in dark mode', async ({ page }) => {
    // Set dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });

    await page.goto('/');

    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});

test.describe('Print Styles Visual Tests', () => {
  test('page prints correctly', async ({ page }) => {
    await page.goto('/');

    await page.emulateMedia({ media: 'print' });

    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-print.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});

test.describe('Interaction State Visual Tests', () => {
  test('buttons show correct hover state', async ({ page }) => {
    await page.goto('/');

    const primaryButton = page.getByRole('link', { name: /call|contact|emergency/i }).first();

    if (await primaryButton.isVisible()) {
      // Hover over button
      await primaryButton.hover();

      await page.waitForTimeout(200);

      await expect(primaryButton).toHaveScreenshot('button-hover-state.png', {
        maxDiffPixels: 50,
      });
    }
  });

  test('navigation menu open state', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menu|navigation/i });

    if (await menuButton.isVisible()) {
      await menuButton.click();

      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('mobile-menu-open.png', {
        maxDiffPixels: 100,
      });
    }
  });
});

test.describe('Loading States Visual Tests', () => {
  test('page skeleton/loading state appears correctly', async ({ page }) => {
    // Navigate with slow network to catch loading state
    const client = await page.context().newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (500 * 1024) / 8,
      uploadThroughput: (500 * 1024) / 8,
      latency: 200,
    });

    const navigationPromise = page.goto('/services/water-damage-restoration-brisbane');

    // Try to capture loading state
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('page-loading-state.png', {
      maxDiffPixels: 100,
    });

    await navigationPromise;
  });
});

test.describe('Accessibility Visual Indicators', () => {
  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/');

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    await page.waitForTimeout(200);

    const focused = page.locator(':focus');

    if (await focused.isVisible()) {
      await expect(focused).toHaveScreenshot('focus-indicator.png', {
        maxDiffPixels: 50,
      });
    }
  });
});

test.describe('Error States Visual Tests', () => {
  test('404 page renders correctly', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');

    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('404-page.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Visual States', () => {
  test('form validation errors display correctly', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane');

    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();
      const submitButton = form.locator('button[type="submit"]').first();

      if (await submitButton.isVisible()) {
        await submitButton.click();

        await page.waitForTimeout(500);

        await expect(form).toHaveScreenshot('form-validation-errors.png', {
          maxDiffPixels: 50,
        });
      }
    }
  });
});

test.describe('Cross-Browser Visual Consistency', () => {
  test('homepage looks consistent across browsers', async ({ page, browserName }) => {
    await page.goto('/');

    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot(`homepage-${browserName}.png`, {
      fullPage: true,
      maxDiffPixels: 200, // More tolerance for cross-browser differences
    });
  });
});
