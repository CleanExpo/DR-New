import { test, expect } from '@playwright/test';

const PROD_URL = 'https://dr-new-ten.vercel.app';

test.describe('Production Deployment Verification', () => {
  test('Homepage loads successfully', async ({ page }) => {
    const response = await page.goto(PROD_URL);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Water Damage Restoration Brisbane/);
  });

  test('Hero image displays correctly', async ({ page }) => {
    await page.goto(PROD_URL);
    const heroImage = page.locator('img[alt*="Water Damage"]').first();
    await expect(heroImage).toBeVisible();
  });

  test('Phone button works (1300 309 361)', async ({ page }) => {
    await page.goto(PROD_URL);
    const phoneLink = page.locator('a[href="tel:1300309361"]').first();
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:1300309361');
  });

  test('New page: /claim exists', async ({ page }) => {
    const response = await page.goto(`${PROD_URL}/claim`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Claim/);
  });

  test('New page: /get-help exists', async ({ page }) => {
    const response = await page.goto(`${PROD_URL}/get-help`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Get Help|Emergency/);
  });

  test('New page: /pricing exists', async ({ page }) => {
    const response = await page.goto(`${PROD_URL}/pricing`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Pricing/);
  });

  test('Breadcrumbs display on service pages', async ({ page }) => {
    await page.goto(`${PROD_URL}/services/water-damage-restoration`);
    const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbs).toBeVisible();
  });

  test('All images load (no 404s)', async ({ page }) => {
    await page.goto(PROD_URL);
    const images = await page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });

  test('Schema.org markup exists', async ({ page }) => {
    await page.goto(PROD_URL);
    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript).toHaveCount(2); // At least LocalBusiness + one other
  });

  test('Google Analytics configured', async ({ page }) => {
    await page.goto(PROD_URL);
    // Check for GA4 script or gtag
    const hasAnalytics = await page.evaluate(() => {
      return typeof window.gtag !== 'undefined' ||
             document.querySelector('script[src*="googletagmanager"]') !== null;
    });
    expect(hasAnalytics).toBeTruthy();
  });
});
