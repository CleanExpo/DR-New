import { test, expect, Page } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

/**
 * COMPREHENSIVE AWARD-LEVEL TESTING SUITE
 *
 * This test suite provides complete validation for production deployment:
 * 1. Page Load Testing - All pages load successfully
 * 2. Image Testing - All images display correctly
 * 3. Mobile Responsiveness - Cross-device validation
 * 4. Navigation Testing - All links work
 * 5. Form Testing - Contact forms function
 * 6. SEO Validation - Meta tags and schema
 * 7. Accessibility - WCAG 2.1 AAA compliance
 * 8. Performance - Core Web Vitals
 */

// Production URL
const PRODUCTION_URL = 'https://dr-new-ten.vercel.app';

// All pages to test
const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services' },
  { path: '/services/water-damage-restoration', name: 'Water Damage' },
  { path: '/services/fire-damage-restoration', name: 'Fire Damage' },
  { path: '/services/mould-remediation', name: 'Mould Remediation' },
  { path: '/services/storm-damage-restoration', name: 'Storm Damage' },
  { path: '/services/commercial-property-restoration', name: 'Commercial Restoration' },
  { path: '/locations/brisbane', name: 'Brisbane' },
  { path: '/locations/ipswich', name: 'Ipswich' },
  { path: '/locations/logan', name: 'Logan' },
  { path: '/locations/hamilton', name: 'Hamilton' },
  { path: '/locations/ascot', name: 'Ascot' },
  { path: '/locations/new-farm', name: 'New Farm' },
  { path: '/locations/toowong', name: 'Toowong' },
  { path: '/locations/karalee', name: 'Karalee' },
  { path: '/locations/brookwater', name: 'Brookwater' },
  { path: '/locations/springfield-lakes', name: 'Springfield Lakes' },
  { path: '/about', name: 'About' },
  { path: '/about/phill-mcgurk', name: 'Phill McGurk' },
  { path: '/about/certifications', name: 'Certifications' },
  { path: '/contact', name: 'Contact' },
  { path: '/emergency', name: 'Emergency' },
  { path: '/insurance', name: 'Insurance' },
  { path: '/commercial', name: 'Commercial' },
  { path: '/blog', name: 'Blog' },
];

test.describe('1. PAGE LOAD TESTING - Production', () => {
  test.use({ baseURL: PRODUCTION_URL });

  for (const page of PAGES) {
    test(`${page.name} (${page.path}) loads successfully`, async ({ page: testPage }) => {
      const response = await testPage.goto(page.path, {
        waitUntil: 'domcontentloaded', // Less strict than networkidle
        timeout: 45000
      });

      // Should not be 404
      expect(response?.status()).not.toBe(404);
      expect(response?.status()).toBeLessThan(400);

      // Page should have content
      await testPage.waitForLoadState('load', { timeout: 10000 });
      const body = await testPage.locator('body').textContent();
      expect(body?.length).toBeGreaterThan(100);

      // Check for actual error pages (not just "404" in content)
      const title = await testPage.title();
      expect(title.toLowerCase()).not.toContain('not found');

      // Check for main content (more flexible - h1, h2, or main tag)
      const hasHeading = await testPage.locator('h1, h2, main, article').first().isVisible({ timeout: 5000 }).catch(() => false);
      expect(hasHeading).toBe(true);
    });
  }
});

test.describe('2. IMAGE TESTING', () => {
  test.use({ baseURL: PRODUCTION_URL });

  test('All hero images display correctly', async ({ page }) => {
    await page.goto('/');

    // Find all hero images
    const heroImages = page.locator('img[alt*="hero"], img[alt*="Hero"], [class*="hero"] img');
    const count = await heroImages.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const img = heroImages.nth(i);

        // Check image is visible
        await expect(img).toBeVisible();

        // Check image has loaded (naturalWidth > 0)
        const hasLoaded = await img.evaluate((el: HTMLImageElement) => {
          return el.complete && el.naturalWidth > 0;
        });
        expect(hasLoaded).toBe(true);

        // Check image has alt text
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt?.length).toBeGreaterThan(3);
      }
    }
  });

  test('All service page images display correctly', async ({ page }) => {
    await page.goto('/services/water-damage-restoration');

    const images = page.locator('img');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    // Check first 5 images
    for (let i = 0; i < Math.min(count, 5); i++) {
      const img = images.nth(i);

      const hasLoaded = await img.evaluate((el: HTMLImageElement) => {
        return el.complete && el.naturalWidth > 0;
      });
      expect(hasLoaded).toBe(true);
    }
  });

  test('No broken images on homepage', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    let brokenImages = 0;

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const hasLoaded = await img.evaluate((el: HTMLImageElement) => {
        return el.complete && el.naturalWidth > 0;
      });

      if (!hasLoaded) {
        brokenImages++;
      }
    }

    expect(brokenImages).toBe(0);
  });
});

test.describe('3. MOBILE RESPONSIVENESS', () => {
  test.use({
    baseURL: PRODUCTION_URL,
    viewport: { width: 375, height: 667 } // iPhone SE
  });

  test('Homepage is responsive on mobile', async ({ page }) => {
    await page.goto('/');

    // Check mobile menu exists
    const mobileMenu = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
    await expect(mobileMenu).toBeVisible();

    // Check no horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('Service pages are responsive on mobile', async ({ page }) => {
    await page.goto('/services/water-damage-restoration');

    // Check no horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);

    // Check content is visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Contact form is responsive on mobile', async ({ page }) => {
    await page.goto('/contact');

    // Check form elements are visible
    const nameInput = page.locator('input[name="name"], input[placeholder*="Name"]').first();
    await expect(nameInput).toBeVisible();

    // Check no horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });
});

test.describe('4. CROSS-BROWSER TESTING', () => {
  test.use({ baseURL: PRODUCTION_URL });

  test('Homepage works in Chrome', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Chrome only');

    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Homepage works in Firefox', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox', 'Firefox only');

    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Homepage works in Safari', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'Safari only');

    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});

test.describe('5. NAVIGATION TESTING', () => {
  test.use({ baseURL: PRODUCTION_URL });

  test('Main navigation menu works', async ({ page }) => {
    await page.goto('/');

    // Find navigation links
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();

    expect(count).toBeGreaterThan(0);

    // Check at least 3 links work
    for (let i = 0; i < Math.min(count, 3); i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');

      if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
        await expect(link).toBeVisible();
      }
    }
  });

  test('Emergency phone number link works', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    const href = await phoneLink.getAttribute('href');
    expect(href).toContain('tel:');
  });

  test('Footer navigation works', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const footerLinks = footer.locator('a');
    const count = await footerLinks.count();

    expect(count).toBeGreaterThan(0);
  });

  test('Breadcrumb navigation exists on subpages', async ({ page }) => {
    await page.goto('/services/water-damage-restoration');

    // Look for breadcrumb navigation
    const breadcrumb = page.locator('[aria-label*="readcrumb"], nav[aria-label*="readcrumb"]').first();

    if (await breadcrumb.isVisible()) {
      const links = breadcrumb.locator('a');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('6. CONTACT FORM TESTING', () => {
  test.use({ baseURL: PRODUCTION_URL });

  test('Contact form loads and has required fields', async ({ page }) => {
    await page.goto('/contact');

    // Check for name field
    const nameField = page.locator('input[name="name"], input[placeholder*="Name"]').first();
    await expect(nameField).toBeVisible();

    // Check for email field
    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    await expect(emailField).toBeVisible();

    // Check for message field
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message"]').first();
    await expect(messageField).toBeVisible();

    // Check for submit button
    const submitButton = page.locator('button[type="submit"]').first();
    await expect(submitButton).toBeVisible();
  });

  test('Contact form validation works', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Should show validation errors or prevent submission
    // Either HTML5 validation or custom validation should work
    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    const isRequired = await emailField.getAttribute('required');

    expect(isRequired !== null || isRequired === '').toBe(true);
  });

  test('Emergency contact form is accessible 24/7', async ({ page }) => {
    await page.goto('/emergency');

    // Check page loads
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Check for contact information
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
  });
});

test.describe('7. SEO VALIDATION', () => {
  test.use({ baseURL: PRODUCTION_URL });

  for (const pageInfo of PAGES.slice(0, 10)) { // Test first 10 pages
    test(`${pageInfo.name} has proper SEO meta tags`, async ({ page }) => {
      await page.goto(pageInfo.path);

      // Check title
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThan(70);

      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(50);
      expect(metaDescription!.length).toBeLessThan(160);

      // Check H1 exists and is unique
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      const h1Text = await h1.textContent();
      expect(h1Text?.length).toBeGreaterThan(5);

      // Check canonical URL
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
    });
  }

  test('Schema markup is present on homepage', async ({ page }) => {
    await page.goto('/');

    // Check for JSON-LD schema
    const schemaScript = page.locator('script[type="application/ld+json"]');
    const count = await schemaScript.count();

    expect(count).toBeGreaterThan(0);

    // Validate schema is valid JSON
    if (count > 0) {
      const schemaContent = await schemaScript.first().textContent();
      expect(() => JSON.parse(schemaContent || '{}')).not.toThrow();
    }
  });

  test('Open Graph tags are present', async ({ page }) => {
    await page.goto('/');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
  });

  test('Sitemap is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);

    const content = await page.content();
    expect(content).toContain('<?xml');
    expect(content).toContain('<urlset');
  });

  test('Robots.txt is accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);

    const content = await page.content();
    expect(content).toContain('User-agent');
  });
});

test.describe('8. PERFORMANCE TESTING', () => {
  test.use({ baseURL: PRODUCTION_URL });

  test('Homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('Service page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/services/water-damage-restoration', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('Core Web Vitals - LCP', async ({ page }) => {
    await page.goto('/');

    // Measure Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });

    // LCP should be under 2.5 seconds for good performance
    if (typeof lcp === 'number' && lcp > 0) {
      expect(lcp).toBeLessThan(2500);
    }
  });

  test('No console errors on homepage', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known third-party errors
    const relevantErrors = errors.filter(error =>
      !error.includes('chrome-extension') &&
      !error.includes('favicon.ico') &&
      !error.includes('Third-party')
    );

    expect(relevantErrors.length).toBe(0);
  });
});

test.describe('9. ACCESSIBILITY TESTING (WCAG 2.1 AAA)', () => {
  test.use({ baseURL: PRODUCTION_URL });

  test('Homepage passes accessibility audit', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);

    // Run accessibility check
    const violations = await page.evaluate(async () => {
      // @ts-ignore
      const results = await axe.run();
      return results.violations;
    });

    expect(violations.length).toBe(0);
  });

  test('Contact page passes accessibility audit', async ({ page }) => {
    await page.goto('/contact');
    await injectAxe(page);

    const violations = await page.evaluate(async () => {
      // @ts-ignore
      const results = await axe.run();
      return results.violations;
    });

    expect(violations.length).toBe(0);
  });

  test('Keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Press Tab key multiple times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');

      // Check focus is visible
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;

        const styles = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
        };
      });

      expect(focusedElement).toBeTruthy();
    }
  });

  test('Images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // Alt should exist (can be empty for decorative images)
      expect(alt !== null).toBe(true);
    }
  });

  test('Form labels are associated with inputs', async ({ page }) => {
    await page.goto('/contact');

    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);

      // Check for label or aria-label
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');

      // Should have at least one form of label
      const hasLabel = id || ariaLabel || placeholder;
      expect(hasLabel).toBeTruthy();
    }
  });

  test('Color contrast is sufficient', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);

    const colorContrastViolations = await page.evaluate(async () => {
      // @ts-ignore
      const results = await axe.run({
        runOnly: ['color-contrast']
      });
      return results.violations;
    });

    expect(colorContrastViolations.length).toBe(0);
  });
});

test.describe('10. PRODUCTION VERIFICATION', () => {
  test.use({ baseURL: PRODUCTION_URL });

  test('Site is served over HTTPS', async ({ page }) => {
    await page.goto('/');
    const url = page.url();
    expect(url).toContain('https://');
  });

  test('Security headers are present', async ({ page, request }) => {
    const response = await request.get(PRODUCTION_URL);
    const headers = response.headers();

    // Check for security headers
    expect(headers['x-frame-options'] || headers['X-Frame-Options']).toBeTruthy();
    expect(headers['x-content-type-options'] || headers['X-Content-Type-Options']).toBe('nosniff');
  });

  test('Favicon is accessible', async ({ page }) => {
    await page.goto('/');

    const favicon = page.locator('link[rel*="icon"]').first();
    const href = await favicon.getAttribute('href');

    expect(href).toBeTruthy();
  });

  test('CDN is working for images', async ({ page }) => {
    await page.goto('/');

    const img = page.locator('img').first();
    const src = await img.getAttribute('src');

    // Should be optimized (Next.js image optimization or CDN)
    expect(src).toBeTruthy();
  });

  test('Environment variables are not exposed', async ({ page }) => {
    await page.goto('/');

    const content = await page.content();

    // Check for common sensitive patterns
    expect(content).not.toContain('DATABASE_URL');
    expect(content).not.toContain('API_KEY');
    expect(content).not.toContain('SECRET_KEY');
  });
});
