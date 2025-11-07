import { test, expect } from '@playwright/test';

test.describe('SEO Audit Tests', () => {
  test('homepage has optimal title length', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();

    // Title should be 30-60 characters
    expect(title.length).toBeGreaterThan(30);
    expect(title.length).toBeLessThan(60);

    // Title should include key terms
    expect(title.toLowerCase()).toMatch(/disaster|recovery|restoration|emergency/);
    expect(title.toLowerCase()).toMatch(/brisbane|ipswich|logan|queensland/);
  });

  test('meta description is optimized', async ({ page }) => {
    await page.goto('/');

    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');

    expect(metaDescription).toBeTruthy();
    expect(metaDescription!.length).toBeGreaterThan(120);
    expect(metaDescription!.length).toBeLessThan(160);

    // Should include location and service keywords
    expect(metaDescription!.toLowerCase()).toMatch(/brisbane|ipswich|logan/);
  });

  test('Open Graph tags are present', async ({ page }) => {
    await page.goto('/');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');

    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    expect(ogImage).toBeTruthy();
  });

  test('Twitter Card tags are present', async ({ page }) => {
    await page.goto('/');

    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');

    expect(twitterCard).toBeTruthy();
    expect(twitterTitle).toBeTruthy();
  });

  test('structured data includes LocalBusiness schema', async ({ page }) => {
    await page.goto('/');

    const ldJson = await page.locator('script[type="application/ld+json"]').all();
    let hasLocalBusiness = false;

    for (const script of ldJson) {
      const content = await script.textContent();
      if (content && (content.includes('LocalBusiness') || content.includes('ProfessionalService'))) {
        hasLocalBusiness = true;
        const schema = JSON.parse(content);

        // Verify required LocalBusiness fields
        expect(schema.name || schema['@graph']?.[0]?.name).toBeTruthy();
        expect(schema.address || schema['@graph']?.[0]?.address).toBeTruthy();
      }
    }

    expect(hasLocalBusiness).toBe(true);
  });

  test('service pages have Service schema', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const ldJson = await page.locator('script[type="application/ld+json"]').all();
    let hasServiceSchema = false;

    for (const script of ldJson) {
      const content = await script.textContent();
      if (content && content.includes('Service')) {
        hasServiceSchema = true;
      }
    }

    expect(hasServiceSchema).toBe(true);
  });

  test('breadcrumb schema is implemented', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const ldJson = await page.locator('script[type="application/ld+json"]').all();
    let hasBreadcrumb = false;

    for (const script of ldJson) {
      const content = await script.textContent();
      if (content && content.includes('BreadcrumbList')) {
        hasBreadcrumb = true;
        const schema = JSON.parse(content);

        // Verify breadcrumb structure
        expect(schema.itemListElement || schema['@graph']?.find((item: any) => item['@type'] === 'BreadcrumbList')?.itemListElement).toBeTruthy();
      }
    }

    expect(hasBreadcrumb).toBe(true);
  });

  test('canonical URL is set correctly', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');

    expect(canonical).toBeTruthy();
    expect(canonical).toContain('http');
    expect(canonical).toContain('water-damage-restoration-brisbane');
  });

  test('robots meta tag allows indexing', async ({ page }) => {
    await page.goto('/');

    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content');

    // Should allow indexing (or no robots meta tag)
    if (robotsMeta) {
      expect(robotsMeta).not.toContain('noindex');
    }
  });

  test('images use WebP format for performance', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    let webpCount = 0;

    for (const img of images.slice(0, 10)) {
      const src = await img.getAttribute('src');
      if (src && (src.includes('.webp') || src.includes('_next/image'))) {
        webpCount++;
      }
    }

    // Most images should be optimized
    expect(webpCount).toBeGreaterThan(0);
  });

  test('internal links have proper structure', async ({ page }) => {
    await page.goto('/');

    const internalLinks = await page.locator('a[href^="/"]').all();

    expect(internalLinks.length).toBeGreaterThan(10);

    // Check first 10 internal links
    for (const link of internalLinks.slice(0, 10)) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();

      expect(href).toBeTruthy();
      // Link should have meaningful text (not empty or just symbols)
      if (text && text.trim().length > 0) {
        expect(text.trim().length).toBeGreaterThan(1);
      }
    }
  });

  test('page loads HTTPS resources only', async ({ page }) => {
    const insecureResources: string[] = [];

    page.on('request', (request) => {
      const url = request.url();
      if (url.startsWith('http://') && !url.includes('localhost')) {
        insecureResources.push(url);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(insecureResources).toEqual([]);
  });

  test('mobile viewport is configured', async ({ page }) => {
    await page.goto('/');

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');

    expect(viewport).toBeTruthy();
    expect(viewport).toContain('width=device-width');
    expect(viewport).toContain('initial-scale=1');
  });

  test('local SEO keywords are present', async ({ page }) => {
    await page.goto('/');

    const bodyText = await page.locator('body').textContent();

    // Check for local SEO keywords
    expect(bodyText).toMatch(/Brisbane|Ipswich|Logan/i);
    expect(bodyText).toMatch(/Queensland|QLD/i);
    expect(bodyText).toMatch(/water damage|fire damage|mould|restoration/i);
    expect(bodyText).toMatch(/Master Restorer/i);
  });

  test('phone number is in clickable format', async ({ page }) => {
    await page.goto('/');

    const phoneLinks = await page.locator('a[href^="tel:"]').all();

    expect(phoneLinks.length).toBeGreaterThan(0);

    // Check phone number format
    for (const link of phoneLinks) {
      const href = await link.getAttribute('href');
      expect(href).toMatch(/tel:\+?[\d\s()-]+/);
    }
  });

  test('Master Restorer credential is prominent', async ({ page }) => {
    await page.goto('/');

    const masterRestorerText = await page.getByText(/Master Restorer/i).first();
    await expect(masterRestorerText).toBeVisible();
  });
});
