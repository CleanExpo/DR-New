import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Responsiveness Tests', () => {
  test.use({ ...devices['iPhone 12'] });

  test('homepage renders correctly on mobile', async ({ page }) => {
    await page.goto('/');

    // Check viewport is mobile
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThan(500);

    // Emergency CTA should be visible
    const emergencyCTA = page.getByText(/24\/7/i).first();
    await expect(emergencyCTA).toBeVisible();
  });

  test('navigation menu works on mobile', async ({ page }) => {
    await page.goto('/');

    // Look for mobile menu button (hamburger)
    const menuButton = page.getByRole('button', { name: /menu|navigation/i }).or(
      page.locator('button[aria-label*="menu"]')
    );

    if (await menuButton.isVisible()) {
      await menuButton.click();

      // Navigation items should appear
      await expect(page.getByRole('link', { name: /services/i })).toBeVisible();
    }
  });

  test('phone number is tap-to-call on mobile', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]').first();

    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', /tel:/);

    // Phone link should be easily tappable (large enough)
    const box = await phoneLink.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThan(44); // Apple's minimum tap target
    }
  });

  test('forms are usable on mobile', async ({ page }) => {
    await page.goto('/book-service');

    const inputs = await page.locator('input, textarea').all();

    for (const input of inputs) {
      // Input should be visible and tappable
      if (await input.isVisible()) {
        const box = await input.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThan(30);
        }
      }
    }
  });

  test('images are responsive', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images.slice(0, 5)) {
      if (await img.isVisible()) {
        const box = await img.boundingBox();
        const viewport = page.viewportSize();

        if (box && viewport) {
          // Image should not exceed viewport width
          expect(box.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    }
  });

  test('text is readable on mobile (not too small)', async ({ page }) => {
    await page.goto('/');

    // Check font sizes
    const paragraphs = await page.locator('p').all();

    for (const p of paragraphs.slice(0, 5)) {
      if (await p.isVisible()) {
        const fontSize = await p.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });

        const fontSizePx = parseInt(fontSize);
        // Font should be at least 14px for readability
        expect(fontSizePx).toBeGreaterThanOrEqual(14);
      }
    }
  });

  test('buttons have adequate tap targets', async ({ page }) => {
    await page.goto('/');

    const buttons = await page.locator('button, a[role="button"]').all();

    for (const button of buttons.slice(0, 10)) {
      if (await button.isVisible()) {
        const box = await button.boundingBox();

        if (box) {
          // Minimum tap target is 44x44 (iOS) or 48x48 (Android)
          expect(box.height).toBeGreaterThanOrEqual(40);
          expect(box.width).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  test('horizontal scrolling is not required', async ({ page }) => {
    await page.goto('/');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewport = page.viewportSize();

    if (viewport) {
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 5); // 5px tolerance
    }
  });

  test('service cards stack vertically on mobile', async ({ page }) => {
    await page.goto('/services');

    const serviceCards = await page.locator('[class*="service"], [class*="card"]').all();

    if (serviceCards.length > 1) {
      const firstCard = await serviceCards[0].boundingBox();
      const secondCard = await serviceCards[1].boundingBox();

      if (firstCard && secondCard) {
        // Cards should stack vertically (second card below first)
        expect(secondCard.y).toBeGreaterThan(firstCard.y + firstCard.height - 10);
      }
    }
  });

  test('emergency CTA is always accessible on mobile', async ({ page }) => {
    await page.goto('/');

    const emergencyCTA = page.getByText(/24\/7|emergency/i).first();

    // Should be visible without scrolling
    await expect(emergencyCTA).toBeInViewport();
  });
});

test.describe('Tablet Responsiveness Tests', () => {
  test.use({ ...devices['iPad Pro'] });

  test('tablet layout is optimized', async ({ page }) => {
    await page.goto('/');

    const viewport = page.viewportSize();
    expect(viewport?.width).toBeGreaterThan(700);
    expect(viewport?.width).toBeLessThan(1100);

    // Content should adapt to tablet size
    await expect(page.locator('main')).toBeVisible();
  });

  test('navigation works on tablet', async ({ page }) => {
    await page.goto('/');

    // Navigation should be visible (not hamburger menu)
    const navLinks = await page.locator('nav a').all();
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test('images scale appropriately on tablet', async ({ page }) => {
    await page.goto('/');

    const heroImage = page.locator('img').first();

    if (await heroImage.isVisible()) {
      const box = await heroImage.boundingBox();
      const viewport = page.viewportSize();

      if (box && viewport) {
        expect(box.width).toBeLessThanOrEqual(viewport.width);
      }
    }
  });
});
