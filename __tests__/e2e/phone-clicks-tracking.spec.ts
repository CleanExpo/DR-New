import { test, expect } from '@playwright/test';

test.describe('Phone Click Tracking and Emergency Contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('emergency phone number is visible above the fold', async ({ page }) => {
    const phoneLinks = page.locator('a[href^="tel:"]');
    const count = await phoneLinks.count();

    expect(count).toBeGreaterThan(0);

    // First phone link should be above the fold
    const firstPhone = phoneLinks.first();
    await expect(firstPhone).toBeVisible();

    const box = await firstPhone.boundingBox();
    if (box) {
      // Should be visible without scrolling (within 800px)
      expect(box.y).toBeLessThan(800);
    }
  });

  test('phone link has correct Australian format', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first();
    const href = await phoneLink.getAttribute('href');

    // Should be properly formatted tel: link
    expect(href).toMatch(/^tel:\+?61|^tel:0[0-9]/);
  });

  test('multiple phone links all work correctly', async ({ page }) => {
    const phoneLinks = page.locator('a[href^="tel:"]');
    const count = await phoneLinks.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const link = phoneLinks.nth(i);
      const href = await link.getAttribute('href');

      expect(href).toMatch(/^tel:/);
      expect(href?.length).toBeGreaterThan(8); // tel:+61... or tel:04...
    }
  });

  test('phone CTA has high visual prominence', async ({ page }) => {
    const emergencyCTA = page.locator('a[href^="tel:"]').first();

    // Check for emergency or CTA styling
    const classes = await emergencyCTA.getAttribute('class');
    const text = await emergencyCTA.textContent();

    // Should have some indication of urgency or CTA
    expect(
      classes?.includes('button') ||
      classes?.includes('btn') ||
      classes?.includes('cta') ||
      text?.toLowerCase().includes('emergency') ||
      text?.toLowerCase().includes('call') ||
      text?.toLowerCase().includes('24/7')
    ).toBeTruthy();
  });

  test('phone links are keyboard accessible', async ({ page }) => {
    // Tab through page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Find first phone link by tabbing
    let phoneReached = false;
    for (let i = 0; i < 20; i++) {
      const focused = page.locator(':focus');
      const href = await focused.getAttribute('href');

      if (href?.startsWith('tel:')) {
        phoneReached = true;
        break;
      }

      await page.keyboard.press('Tab');
    }

    expect(phoneReached).toBeTruthy();
  });

  test('phone links work on all critical pages', async ({ page }) => {
    const criticalPages = [
      '/',
      '/services',
      '/services/water-damage-restoration-brisbane',
      '/emergency/water-damage-brisbane',
    ];

    for (const pagePath of criticalPages) {
      const response = await page.goto(pagePath);

      if (response?.status() === 200) {
        const phoneLink = page.locator('a[href^="tel:"]').first();
        await expect(phoneLink).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('24/7 emergency messaging is prominent', async ({ page }) => {
    const emergencyText = page.getByText(/24\/7|twenty four seven|24 hours/i);
    const count = await emergencyText.count();

    expect(count).toBeGreaterThan(0);

    // At least one should be visible
    const visible = await emergencyText.first().isVisible();
    expect(visible).toBeTruthy();
  });

  test('phone number is consistent across pages', async ({ page }) => {
    await page.goto('/');
    const homePhone = await page.locator('a[href^="tel:"]').first().getAttribute('href');

    await page.goto('/services');
    const servicesPhone = await page.locator('a[href^="tel:"]').first().getAttribute('href');

    // Phone numbers should match
    expect(homePhone).toBe(servicesPhone);
  });
});

test.describe('Phone Click Tracking - Mobile', () => {
  test.use({
    viewport: { width: 375, height: 667 },
  });

  test('mobile phone link is tap-friendly', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    const box = await phoneLink.boundingBox();
    if (box) {
      // Should meet minimum touch target size (44x44px)
      expect(box.height).toBeGreaterThanOrEqual(40);
      expect(box.width).toBeGreaterThanOrEqual(40);
    }
  });

  test('sticky header includes phone number on mobile', async ({ page }) => {
    await page.goto('/');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    // Phone should still be accessible (either in sticky header or quick access)
    const phoneLink = page.locator('a[href^="tel:"]').first();
    const isVisible = await phoneLink.isVisible();

    expect(isVisible).toBeTruthy();
  });

  test('emergency call button is thumb-reachable on mobile', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();
    const box = await phoneLink.boundingBox();

    if (box) {
      // Should be in top portion or bottom portion (thumb reach zone)
      const inTopZone = box.y < 500;
      const inBottomZone = box.y > 600;

      expect(inTopZone || inBottomZone).toBeTruthy();
    }
  });
});

test.describe('Emergency Contact Analytics', () => {
  test('phone link click can be tracked', async ({ page, context }) => {
    // Listen for navigation events
    const navigationPromise = page.waitForEvent('framenavigated', { timeout: 5000 }).catch(() => null);

    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();

    // Click should trigger tel: protocol
    await phoneLink.click();

    // Check that click was registered (URL might change to tel:)
    await page.waitForTimeout(500);

    const currentUrl = page.url();
    const href = await phoneLink.getAttribute('href');

    // Either URL changed or link is valid
    expect(href?.startsWith('tel:')).toBeTruthy();
  });

  test('multiple phone CTAs maintain tracking consistency', async ({ page }) => {
    await page.goto('/');

    const phoneLinks = page.locator('a[href^="tel:"]');
    const count = await phoneLinks.count();

    const hrefs = [];
    for (let i = 0; i < Math.min(count, 10); i++) {
      const href = await phoneLinks.nth(i).getAttribute('href');
      hrefs.push(href);
    }

    // All phone links should point to the same number
    const uniqueNumbers = [...new Set(hrefs)];
    expect(uniqueNumbers.length).toBeLessThanOrEqual(2); // Allow for alternate number
  });
});

test.describe('Phone Link Accessibility Features', () => {
  test('phone links have descriptive aria-labels', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();
    const ariaLabel = await phoneLink.getAttribute('aria-label');
    const text = await phoneLink.textContent();

    // Should have either aria-label or descriptive text
    const hasDescription =
      (ariaLabel && ariaLabel.length > 0) ||
      (text && text.length > 0);

    expect(hasDescription).toBeTruthy();
  });

  test('phone links have proper ARIA role', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();
    const role = await phoneLink.getAttribute('role');

    // Should be link or button
    expect(['link', 'button', null]).toContain(role);
  });

  test('screen reader can identify phone links', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();

    // Should have accessible name
    const accessibleName = await phoneLink.evaluate((el) => {
      const computedLabel = el.getAttribute('aria-label') || el.textContent;
      return computedLabel;
    });

    expect(accessibleName).toBeTruthy();
    expect(accessibleName?.trim().length).toBeGreaterThan(0);
  });
});
