import { test, expect } from '@playwright/test';

test.describe('Homepage Critical Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads successfully with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/disaster recovery|water damage|emergency/i);

    // Verify page is fully loaded
    await expect(page.locator('body')).toBeVisible();
  });

  test('emergency CTA is prominently displayed', async ({ page }) => {
    // Check for 24/7 emergency messaging
    const emergencyElements = await page.getByText(/24\/7|emergency/i).all();
    expect(emergencyElements.length).toBeGreaterThan(0);

    // Verify at least one emergency element is visible
    const visibleEmergency = emergencyElements.find(async (el) => await el.isVisible());
    expect(visibleEmergency).toBeTruthy();
  });

  test('phone number click-to-call works', async ({ page }) => {
    const phoneLinks = page.locator('a[href^="tel:"]');
    const count = await phoneLinks.count();

    expect(count).toBeGreaterThan(0);

    // Check first phone link
    const firstPhone = phoneLinks.first();
    await expect(firstPhone).toBeVisible();

    const href = await firstPhone.getAttribute('href');
    expect(href).toMatch(/^tel:\+?[0-9]/);
  });

  test('hero section displays service areas', async ({ page }) => {
    // Check for Brisbane, Ipswich, Logan mentions
    const brisbane = page.getByText(/brisbane/i).first();
    await expect(brisbane).toBeVisible({ timeout: 10000 });
  });

  test('main services are listed on homepage', async ({ page }) => {
    // Critical services that should be visible
    const services = [
      /water damage/i,
      /fire damage/i,
      /mould/i,
    ];

    for (const service of services) {
      const element = page.getByText(service).first();
      await expect(element).toBeVisible({ timeout: 5000 });
    }
  });

  test('navigation menu is accessible', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Check for critical nav links
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
  });

  test('Master Restorer credentials are visible', async ({ page }) => {
    const masterRestorer = page.getByText(/master restorer/i).first();
    await expect(masterRestorer).toBeVisible({ timeout: 10000 });
  });

  test('footer displays with service areas and contact info', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer content
    await expect(footer.getByText(/brisbane|ipswich|logan/i).first()).toBeVisible();
  });

  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('no JavaScript errors on load', async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known third-party errors if any
    const criticalErrors = errors.filter(err =>
      !err.includes('chrome-extension') &&
      !err.includes('extension')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('structured data is present', async ({ page }) => {
    // Check for schema.org structured data
    const schemaScripts = page.locator('script[type="application/ld+json"]');
    const count = await schemaScripts.count();

    expect(count).toBeGreaterThan(0);

    // Verify LocalBusiness schema
    const schemaContent = await schemaScripts.first().textContent();
    expect(schemaContent).toBeTruthy();

    if (schemaContent) {
      const schema = JSON.parse(schemaContent);
      expect(schema['@type']).toBeTruthy();
    }
  });

  test('meta tags are properly set', async ({ page }) => {
    // Check essential meta tags
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
  });
});

test.describe('Homepage Mobile Experience', () => {
  test.use({
    viewport: { width: 375, height: 667 }
  });

  test('mobile menu is accessible', async ({ page }) => {
    await page.goto('/');

    // Look for mobile menu button
    const menuButton = page.getByRole('button', { name: /menu|navigation/i });

    if (await menuButton.isVisible()) {
      await menuButton.click();

      // Verify menu opens
      await page.waitForTimeout(500); // Animation delay

      // Check that services link is now visible
      const servicesLink = page.getByRole('link', { name: /services/i });
      await expect(servicesLink).toBeVisible();
    }
  });

  test('emergency CTA is thumb-reachable on mobile', async ({ page }) => {
    await page.goto('/');

    const emergencyCTA = page.locator('a[href^="tel:"]').first();
    await expect(emergencyCTA).toBeVisible();

    // Check if it's in the top portion (thumb-reachable)
    const box = await emergencyCTA.boundingBox();
    if (box) {
      expect(box.y).toBeLessThan(800); // Within typical thumb reach
    }
  });

  test('images load properly on mobile', async ({ page }) => {
    await page.goto('/');

    // Wait for images to load
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    // Check first few images have loaded
    for (let i = 0; i < Math.min(3, count); i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });
});
