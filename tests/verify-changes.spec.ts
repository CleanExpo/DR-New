import { test, expect } from '@playwright/test';

test.describe('Verify Recent Changes', () => {
  test('Homepage loads without fake statistics', async ({ page }) => {
    await page.goto('/');

    // Check that fake review count is not displayed
    const fakeReviewText = await page.locator('text=/10,847/').count();
    expect(fakeReviewText).toBe(0);

    // Check that embellished rating is not displayed
    const fakeRating = await page.locator('text=/4.9\\/5 from 10,000/').count();
    expect(fakeRating).toBe(0);

    // Verify page loads without errors
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('Phill McGurk name is spelled correctly', async ({ page }) => {
    await page.goto('/about-phill-mcgurk');

    // Check for correct spelling "Phill McGurk"
    const correctName = await page.locator('text=/Phill McGurk/').count();
    expect(correctName).toBeGreaterThan(0);

    // Check that incorrect spelling is not present
    const incorrectName = await page.locator('text=/Phil McGurk/').count();
    expect(incorrectName).toBe(0);
  });

  test('Master Certifications page displays correctly', async ({ page }) => {
    await page.goto('/');

    // Look for Master Restorer text
    const masterText = await page.locator('text=/Master Restorer/i').count();
    expect(masterText).toBeGreaterThan(0);

    // Check for "One of a Limited Number" text
    const limitedText = await page.locator('text=/One of a Limited Number/').count();
    expect(limitedText).toBeGreaterThan(0);
  });

  test('No embellished statistics on homepage', async ({ page }) => {
    await page.goto('/');

    // Check that fake statistics are removed
    const liveSaved = await page.locator('text=/4,000\\+.*Lives saved/').count();
    expect(liveSaved).toBe(0);

    const mesothelioma = await page.locator('text=/688.*Mesothelioma/').count();
    expect(mesothelioma).toBe(0);

    // Check for factual information instead
    const emergencyResponse = await page.locator('text=/24\\/7.*Emergency Response/').count();
    expect(emergencyResponse).toBeGreaterThan(0);
  });

  test('Commercial page loads correctly', async ({ page }) => {
    await page.goto('/services/commercial');

    // Check page loads
    const heading = await page.locator('h1').textContent();
    expect(heading).toContain('Commercial');

    // No console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);
    expect(consoleErrors.length).toBe(0);
  });
});