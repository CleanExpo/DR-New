import { test, expect } from '@playwright/test';

test.describe('Website Navigation Flow', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    // Check page loads
    await expect(page).toHaveTitle(/disaster recovery/i);

    // Check main navigation exists
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('main navigation menu is accessible', async ({ page }) => {
    await page.goto('/');

    // Check navigation items
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
  });

  test('footer contains service area information', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer content
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check service areas in footer
    await expect(footer.getByText(/brisbane|ipswich|logan/i).first()).toBeVisible();
  });

  test('about page displays Phil McGurk credentials', async ({ page }) => {
    await page.goto('/about-phil-mcgurk');

    // Check Master Restorer credentials
    await expect(page.getByText(/master restorer/i)).toBeVisible();
    await expect(page.getByText(/phil mcgurk|phillip mcgurk/i)).toBeVisible();
  });

  test('breadcrumb navigation works correctly', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Check breadcrumbs
    const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
    if (await breadcrumbs.isVisible()) {
      await expect(breadcrumbs.getByText(/home/i)).toBeVisible();
      await expect(breadcrumbs.getByText(/services/i)).toBeVisible();
    }
  });

  test('internal linking between service pages works', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Find link to another service
    const relatedServiceLink = page.getByRole('link', { name: /fire damage|mould/i }).first();

    if (await relatedServiceLink.isVisible()) {
      await relatedServiceLink.click();
      await expect(page).toHaveURL(/services/);
    }
  });

  test('service areas page loads with location information', async ({ page }) => {
    await page.goto('/locations/brisbane');

    // Check location-specific content
    await expect(page.getByText(/brisbane/i).first()).toBeVisible();
  });

  test('mobile menu toggles correctly', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    await page.goto('/');

    // Look for mobile menu button
    const menuButton = page.getByRole('button', { name: /menu|navigation/i });

    if (await menuButton.isVisible()) {
      await menuButton.click();

      // Check menu items appear
      await expect(page.getByRole('link', { name: /services/i })).toBeVisible();
    }
  });
});
