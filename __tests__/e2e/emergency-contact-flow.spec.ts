import { test, expect } from '@playwright/test';

test.describe('Emergency Contact Flow', () => {
  test('visitor can quickly access emergency contact from homepage', async ({ page }) => {
    await page.goto('/');

    // Check emergency CTA is visible
    const emergencyCTA = page.getByRole('link', { name: /24\/7 emergency/i });
    await expect(emergencyCTA).toBeVisible();

    // Check emergency phone number is clickable
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
  });

  test('emergency banner persists across pages', async ({ page }) => {
    await page.goto('/');
    const emergencyCTA = page.getByText(/24\/7/i).first();
    await expect(emergencyCTA).toBeVisible();

    // Navigate to services page
    await page.goto('/services');
    await expect(emergencyCTA).toBeVisible();

    // Navigate to about page
    await page.goto('/about-phil-mcgurk');
    const emergencyElement = page.getByText(/24\/7/i).first();
    await expect(emergencyElement).toBeVisible();
  });

  test('mobile users can tap-to-call emergency number', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    await page.goto('/');
    const phoneLink = page.locator('a[href^="tel:"]').first();

    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href');
  });

  test('emergency contact is accessible via keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through page to reach emergency CTA
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    const text = await focusedElement.textContent();

    // Verify emergency contact is reachable via keyboard
    expect(text?.toLowerCase()).toContain('emergency' || 'call' || '24/7');
  });

  test('emergency service types are clearly listed', async ({ page }) => {
    await page.goto('/');

    // Check for emergency service mentions
    await expect(page.getByText(/water damage/i)).toBeVisible();
    await expect(page.getByText(/fire damage/i)).toBeVisible();
    await expect(page.getByText(/emergency/i).first()).toBeVisible();
  });
});
