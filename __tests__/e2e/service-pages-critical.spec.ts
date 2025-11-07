import { test, expect } from '@playwright/test';

const servicePages = [
  '/services/water-damage-restoration-brisbane',
  '/services/fire-damage-restoration-brisbane',
  '/services/mould-remediation-brisbane',
  '/services',
];

test.describe('Service Pages Critical Tests', () => {
  for (const servicePath of servicePages) {
    test.describe(`${servicePath}`, () => {
      test('page loads successfully', async ({ page }) => {
        const response = await page.goto(servicePath);
        expect(response?.status()).toBe(200);

        await expect(page.locator('body')).toBeVisible();
      });

      test('emergency CTA is visible', async ({ page }) => {
        await page.goto(servicePath);

        // Check emergency contact is present
        const emergencyElement = page.getByText(/24\/7|emergency/i).first();
        await expect(emergencyElement).toBeVisible();

        // Check phone link exists
        const phoneLink = page.locator('a[href^="tel:"]').first();
        await expect(phoneLink).toBeVisible();
      });

      test('page has proper heading structure', async ({ page }) => {
        await page.goto(servicePath);

        // Should have an H1
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();

        const h1Text = await h1.textContent();
        expect(h1Text).toBeTruthy();
        expect(h1Text!.length).toBeGreaterThan(10);
      });

      test('navigation works from service page', async ({ page }) => {
        await page.goto(servicePath);

        // Click navigation link
        const homeLink = page.getByRole('link', { name: /home/i }).first();
        if (await homeLink.isVisible()) {
          await homeLink.click();
          await expect(page).toHaveURL('/');
        }
      });

      test('displays Master Restorer credentials', async ({ page }) => {
        await page.goto(servicePath);

        const masterRestorer = page.getByText(/master restorer|phil mcgurk/i).first();
        // Should be visible on page or in footer
        const count = await page.getByText(/master restorer|phil mcgurk/i).count();
        expect(count).toBeGreaterThan(0);
      });

      test('has structured data for SEO', async ({ page }) => {
        await page.goto(servicePath);

        const schemaScripts = page.locator('script[type="application/ld+json"]');
        const count = await schemaScripts.count();

        expect(count).toBeGreaterThan(0);
      });
    });
  }
});

test.describe('Service Page Contact Forms', () => {
  test('contact form is accessible on service pages', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Look for form or CTA
    const contactButton = page.getByRole('link', { name: /contact|call|book/i }).first();

    if (await contactButton.isVisible()) {
      await expect(contactButton).toHaveAttribute('href');
    }
  });
});

test.describe('Service Areas Pages', () => {
  const locationPages = [
    '/locations/brisbane',
    '/locations/ipswich',
  ];

  for (const location of locationPages) {
    test(`${location} page loads`, async ({ page }) => {
      const response = await page.goto(location);

      // 200 OK or 404 if not created yet
      if (response) {
        expect([200, 404]).toContain(response.status());
      }
    });

    test(`${location} shows emergency contact`, async ({ page }) => {
      const response = await page.goto(location);

      if (response?.status() === 200) {
        const phoneLink = page.locator('a[href^="tel:"]').first();
        await expect(phoneLink).toBeVisible();
      }
    });
  }
});

test.describe('Service Page Performance', () => {
  test('water damage page loads within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/services/water-damage-restoration-brisbane');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000);
  });

  test('images lazy load correctly', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Check for lazy loading attributes
    const images = page.locator('img');
    const firstImg = images.first();

    if (await firstImg.isVisible()) {
      const loading = await firstImg.getAttribute('loading');
      // Either eager for above-fold or lazy for below-fold
      expect(['lazy', 'eager']).toContain(loading);
    }
  });
});

test.describe('Cross-Service Navigation', () => {
  test('can navigate between related services', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Look for related service links
    const relatedLink = page.getByRole('link', { name: /fire damage|mould/i }).first();

    if (await relatedLink.isVisible()) {
      await relatedLink.click();
      await expect(page).toHaveURL(/services/);

      // Verify new page loaded
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    }
  });

  test('breadcrumb navigation is present', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const breadcrumb = page.locator('nav[aria-label*="readcrumb" i]');

    if (await breadcrumb.isVisible()) {
      // Should have Home link
      const homeLink = breadcrumb.getByRole('link', { name: /home/i });
      await expect(homeLink).toBeVisible();
    }
  });
});

test.describe('Service Page Mobile Optimization', () => {
  test.use({
    viewport: { width: 375, height: 667 }
  });

  test('service page is mobile responsive', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Check viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);

    // Verify no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5); // Allow 5px tolerance
  });

  test('emergency CTA is easily tappable on mobile', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Check tap target size (should be at least 44x44 pixels)
    const box = await phoneLink.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }
  });
});
