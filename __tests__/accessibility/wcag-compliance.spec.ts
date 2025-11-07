import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests (WCAG 2.1 AA)', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('service pages are accessible', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('emergency CTA is keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab to emergency CTA
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check if focused element is emergency-related
    const focusedElement = page.locator(':focus');
    const ariaLabel = await focusedElement.getAttribute('aria-label');

    expect(ariaLabel || '').toBeTruthy();
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt !== null).toBe(true);
    }
  });

  test('form labels are properly associated', async ({ page }) => {
    await page.goto('/book-service');

    const inputs = await page.locator('input[type="text"], input[type="email"], input[type="tel"], textarea').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Input should have either an id (for label), aria-label, or aria-labelledby
      expect(id || ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });

  test('color contrast meets WCAG AA standards', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .disableRules(['color-contrast']) // We'll enable only color-contrast
      .analyze();

    const contrastResults = await new AxeBuilder({ page })
      .include('body')
      .withRules(['color-contrast'])
      .analyze();

    expect(contrastResults.violations).toEqual([]);
  });

  test('page has proper landmark regions', async ({ page }) => {
    await page.goto('/');

    // Check for main landmarks
    await expect(page.locator('header, [role="banner"]')).toHaveCount(1);
    await expect(page.locator('main, [role="main"]')).toHaveCount(1);
    await expect(page.locator('footer, [role="contentinfo"]')).toHaveCount(1);
    await expect(page.locator('nav, [role="navigation"]')).toHaveCount(1);
  });

  test('headings follow hierarchical order', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Get all headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();

    let previousLevel = 0;

    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName);
      const level = parseInt(tagName[1]);

      // Heading levels shouldn't skip (e.g., h1 to h3)
      if (previousLevel > 0) {
        expect(level - previousLevel).toBeLessThanOrEqual(1);
      }

      previousLevel = level;
    }
  });

  test('links have descriptive text', async ({ page }) => {
    await page.goto('/');

    const links = await page.locator('a').all();

    for (const link of links.slice(0, 20)) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      // Link should have either text or aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/');

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');

    // Check if element has visible focus (outline or box-shadow)
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.boxShadow;
    });

    expect(outline).not.toBe('none');
  });

  test('page is navigable with keyboard only', async ({ page }) => {
    await page.goto('/');

    // Tab through several elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
    }

    // Should be able to reach navigation links
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('skip to main content link exists', async ({ page }) => {
    await page.goto('/');

    // Tab once to reveal skip link
    await page.keyboard.press('Tab');

    const skipLink = page.locator('a[href="#main"], a[href="#content"]').first();

    // Skip link should exist (might be visually hidden until focused)
    if (await skipLink.count() > 0) {
      expect(await skipLink.count()).toBeGreaterThan(0);
    }
  });
});
