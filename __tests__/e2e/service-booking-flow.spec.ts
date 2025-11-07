import { test, expect } from '@playwright/test';

test.describe('Service Booking Flow', () => {
  test('user can navigate to service booking', async ({ page }) => {
    await page.goto('/');

    // Find and click service booking link
    const bookingLink = page.getByRole('link', { name: /book service|get started|request service/i });
    if (await bookingLink.isVisible()) {
      await bookingLink.click();
      await expect(page).toHaveURL(/book-service|contact|claim/);
    }
  });

  test('service page displays Master Restorer credentials', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Check for Master Restorer mention
    await expect(page.getByText(/master restorer/i)).toBeVisible();
  });

  test('service area coverage is clearly displayed', async ({ page }) => {
    await page.goto('/services');

    // Check for service areas
    const brisbaneText = page.getByText(/brisbane/i).first();
    const ipswichText = page.getByText(/ipswich/i).first();
    const loganText = page.getByText(/logan/i).first();

    await expect(brisbaneText).toBeVisible();
    await expect(ipswichText).toBeVisible();
    await expect(loganText).toBeVisible();
  });

  test('water damage restoration service page loads correctly', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    // Check page title
    await expect(page).toHaveTitle(/water damage/i);

    // Check heading
    const heading = page.getByRole('heading', { name: /water damage/i, level: 1 });
    await expect(heading).toBeVisible();

    // Check emergency CTA
    const emergencyCTA = page.getByText(/24\/7/i).first();
    await expect(emergencyCTA).toBeVisible();
  });

  test('fire damage restoration service page loads correctly', async ({ page }) => {
    await page.goto('/services/fire-damage-restoration-brisbane');

    // Check page title
    await expect(page).toHaveTitle(/fire damage/i);

    // Check emergency response messaging
    await expect(page.getByText(/emergency/i).first()).toBeVisible();
  });

  test('mould remediation service page loads correctly', async ({ page }) => {
    await page.goto('/services/mould-remediation-brisbane');

    // Check page title
    await expect(page).toHaveTitle(/mould/i);

    // Check service information
    await expect(page.getByText(/mould|mold/i).first()).toBeVisible();
  });

  test('commercial services page highlights large-scale capabilities', async ({ page }) => {
    await page.goto('/services/commercial');

    // Check commercial focus
    await expect(page.getByText(/commercial/i).first()).toBeVisible();
    await expect(page.getByText(/brisbane|ipswich|logan/i).first()).toBeVisible();
  });
});
