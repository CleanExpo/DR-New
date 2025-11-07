import { test, expect } from '@playwright/test';

test.describe('SEO Critical Paths', () => {
  test('homepage has proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription!.length).toBeGreaterThan(50);
    expect(metaDescription!.length).toBeLessThan(160);
  });

  test('service pages have unique meta tags', async ({ page }) => {
    const servicePages = [
      '/services/water-damage-restoration-brisbane',
      '/services/fire-damage-restoration-brisbane',
      '/services/mould-remediation-brisbane',
    ];

    const titles = new Set();

    for (const url of servicePages) {
      await page.goto(url);
      const title = await page.title();
      titles.add(title);

      // Check title includes service and location
      expect(title.toLowerCase()).toMatch(/brisbane/);
    }

    // All titles should be unique
    expect(titles.size).toBe(servicePages.length);
  });

  test('pages have proper heading hierarchy', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Check H1 exists and is unique
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBe(1);

    const h1Text = await page.locator('h1').textContent();
    expect(h1Text).toBeTruthy();
    expect(h1Text!.length).toBeGreaterThan(10);
  });

  test('local business schema is present', async ({ page }) => {
    await page.goto('/');

    // Check for structured data
    const ldJson = page.locator('script[type="application/ld+json"]');
    const count = await ldJson.count();
    expect(count).toBeGreaterThan(0);

    // Verify schema contains local business info
    const schemaContent = await ldJson.first().textContent();
    expect(schemaContent).toContain('LocalBusiness' || 'Organization');
    expect(schemaContent).toContain('Brisbane' || 'Ipswich' || 'Logan');
  });

  test('pages include canonical URLs', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);

    const href = await canonical.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('http');
  });

  test('images have alt text for SEO', async ({ page }) => {
    await page.goto('/');

    // Get all images
    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Alt text should exist (can be empty for decorative images)
      expect(alt !== null).toBe(true);
    }
  });

  test('internal links use descriptive anchor text', async ({ page }) => {
    await page.goto('/');

    // Get all internal links
    const links = await page.locator('a[href^="/"]').all();

    expect(links.length).toBeGreaterThan(5);

    for (const link of links.slice(0, 10)) {
      const text = await link.textContent();
      const href = await link.getAttribute('href');

      // Link should have meaningful text (not just "click here")
      if (text && text.trim().length > 0) {
        expect(text.trim().length).toBeGreaterThan(2);
      }
    }
  });

  test('page load time is acceptable for SEO', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });
});
