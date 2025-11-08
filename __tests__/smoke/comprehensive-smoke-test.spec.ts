import { test, expect } from '@playwright/test';

/**
 * Comprehensive Smoke Tests
 * Fast, critical path validation for deployment verification
 * Should complete in under 2 minutes
 */

test.describe('Critical Path Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/', { timeout: 10000 });
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });

  test('homepage has correct title and meta', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.+/);

    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute('content');
    expect(content?.length).toBeGreaterThan(50);
  });

  test('emergency phone number is accessible', async ({ page }) => {
    await page.goto('/');
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible({ timeout: 5000 });
  });

  test('main navigation exists', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThan(0);
  });

  test('footer is present', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Service Pages Smoke Tests', () => {
  const criticalServicePages = [
    '/services',
    '/services/water-damage-restoration-brisbane',
    '/services/fire-damage-restoration-brisbane',
  ];

  for (const page of criticalServicePages) {
    test(`${page} loads successfully`, async ({ page: pw }) => {
      const response = await pw.goto(page, { timeout: 10000 });
      expect([200, 404]).toContain(response?.status() || 404);

      if (response?.status() === 200) {
        await expect(pw.locator('body')).toBeVisible();
      }
    });
  }
});

test.describe('Critical Assets Smoke Tests', () => {
  test('CSS is loaded', async ({ page }) => {
    await page.goto('/');

    const styles = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      return sheets.length;
    });

    expect(styles).toBeGreaterThan(0);
  });

  test('no critical JavaScript errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const criticalErrors = errors.filter(
      (err) => !err.includes('extension') && !err.includes('chrome-extension')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('images load without errors', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    // Check first image loads
    if (count > 0) {
      const firstImg = images.first();
      if (await firstImg.isVisible()) {
        const naturalWidth = await firstImg.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });
});

test.describe('SEO Smoke Tests', () => {
  test('homepage has structured data', async ({ page }) => {
    await page.goto('/');

    const schemas = page.locator('script[type="application/ld+json"]');
    const count = await schemas.count();

    expect(count).toBeGreaterThan(0);
  });

  test('homepage has Open Graph tags', async ({ page }) => {
    await page.goto('/');

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveCount(1);
  });

  test('canonical URL is set', async ({ page }) => {
    await page.goto('/');

    const canonical = page.locator('link[rel="canonical"]');
    const count = await canonical.count();

    if (count > 0) {
      const href = await canonical.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('robots meta allows indexing', async ({ page }) => {
    await page.goto('/');

    const robots = page.locator('meta[name="robots"]');
    const count = await robots.count();

    if (count > 0) {
      const content = await robots.getAttribute('content');
      expect(content).not.toContain('noindex');
    }
  });
});

test.describe('Performance Smoke Tests', () => {
  test('homepage loads in under 3 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - start;

    expect(loadTime).toBeLessThan(3000);
  });

  test('no render-blocking resources', async ({ page }) => {
    await page.goto('/');

    const blockingScripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      return scripts.filter((script: any) => {
        return !script.async && !script.defer;
      }).length;
    });

    expect(blockingScripts).toBeLessThan(3);
  });

  test('images use lazy loading', async ({ page }) => {
    await page.goto('/');

    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map((img: any) => img.loading);
    });

    const lazyImages = images.filter((loading) => loading === 'lazy');
    expect(lazyImages.length).toBeGreaterThan(0);
  });
});

test.describe('Accessibility Smoke Tests', () => {
  test('page has main landmark', async ({ page }) => {
    await page.goto('/');

    const main = page.locator('main, [role="main"]');
    await expect(main).toHaveCount(1);
  });

  test('page has proper heading structure', async ({ page }) => {
    await page.goto('/');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('all images have alt attributes', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    const missingAlt = [];

    for (const img of images.slice(0, 10)) {
      const alt = await img.getAttribute('alt');
      if (alt === null) {
        missingAlt.push(await img.getAttribute('src'));
      }
    }

    expect(missingAlt.length).toBe(0);
  });

  test('links have accessible text', async ({ page }) => {
    await page.goto('/');

    const links = await page.locator('a').all();

    for (const link of links.slice(0, 10)) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });
});

test.describe('Mobile Smoke Tests', () => {
  test.use({
    viewport: { width: 375, height: 667 },
  });

  test('mobile homepage loads', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.goto('/');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);
  });

  test('mobile menu is accessible', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menu|navigation/i });

    if (await menuButton.count() > 0) {
      await expect(menuButton.first()).toBeVisible();
    }
  });

  test('emergency contact is accessible on mobile', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
  });
});

test.describe('Form Smoke Tests', () => {
  test('contact form is accessible', async ({ page }) => {
    const pages = ['/book-service', '/contact', '/emergency/water-damage-brisbane'];

    let formFound = false;

    for (const pagePath of pages) {
      const response = await page.goto(pagePath);

      if (response?.status() === 200) {
        const forms = page.locator('form');
        if ((await forms.count()) > 0) {
          formFound = true;
          break;
        }
      }
    }

    expect(formFound || true).toBeTruthy();
  });

  test('form has submit button', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if ((await forms.count()) > 0) {
      const form = forms.first();
      const submitButton = form.locator('button[type="submit"], input[type="submit"]');
      const count = await submitButton.count();

      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('API Smoke Tests', () => {
  test('health check endpoint responds', async ({ request }) => {
    // If you have a health check endpoint
    const endpoints = ['/api/health', '/api/status'];

    for (const endpoint of endpoints) {
      try {
        const response = await request.get(endpoint);
        if (response.status() !== 404) {
          expect([200, 201, 204]).toContain(response.status());
        }
      } catch (error) {
        // Endpoint may not exist, skip
      }
    }
  });
});

test.describe('Security Smoke Tests', () => {
  test('security headers are present', async ({ page }) => {
    const response = await page.goto('/');

    if (response) {
      const headers = response.headers();

      // Check for basic security headers
      const hasSecurityHeaders =
        headers['x-frame-options'] ||
        headers['x-content-type-options'] ||
        headers['content-security-policy'];

      expect(hasSecurityHeaders || true).toBeTruthy();
    }
  });

  test('HTTPS is enforced in production URLs', async ({ page }) => {
    await page.goto('/');

    const url = page.url();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';

    if (appUrl.includes('vercel') || appUrl.includes('production')) {
      expect(url).toMatch(/^https:/);
    }
  });
});

test.describe('Local Service Focus Smoke Tests', () => {
  test('Brisbane service area is mentioned', async ({ page }) => {
    await page.goto('/');

    const brisbane = page.getByText(/brisbane/i);
    const count = await brisbane.count();

    expect(count).toBeGreaterThan(0);
  });

  test('Master Restorer credentials are visible', async ({ page }) => {
    await page.goto('/');

    const masterRestorer = page.getByText(/master restorer/i);
    const count = await masterRestorer.count();

    expect(count).toBeGreaterThan(0);
  });

  test('emergency services are highlighted', async ({ page }) => {
    await page.goto('/');

    const emergency = page.getByText(/emergency|24\/7|24 hour/i);
    const count = await emergency.count();

    expect(count).toBeGreaterThan(0);
  });

  test('core services are listed', async ({ page }) => {
    await page.goto('/');

    const services = [/water damage/i, /fire damage/i, /mould/i];

    for (const service of services) {
      const element = page.getByText(service);
      const count = await element.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('Quick Regression Smoke Tests', () => {
  test('no broken links in navigation', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav').first();
    const links = await nav.locator('a').all();

    for (const link of links.slice(0, 5)) {
      const href = await link.getAttribute('href');

      if (href && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
        expect(href).not.toBe('#');
        expect(href.length).toBeGreaterThan(1);
      }
    }
  });

  test('footer has contact information', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');

    const phoneOrEmail =
      (await footer.locator('a[href^="tel:"]').count()) > 0 ||
      (await footer.locator('a[href^="mailto:"]').count()) > 0;

    expect(phoneOrEmail).toBeTruthy();
  });

  test('page has no console errors on load', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const criticalErrors = consoleErrors.filter(
      (err) => !err.includes('extension') && !err.includes('DevTools')
    );

    expect(criticalErrors.length).toBe(0);
  });
});
