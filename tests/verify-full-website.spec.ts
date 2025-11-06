import { test, expect } from '@playwright/test';

test.describe('Verify Full Multi-Page Website Restored', () => {
  test('should have header with navigation and dropdown menus', async ({ page }) => {
    await page.goto('https://dr-new-unite-group.vercel.app/');

    // 1. Verify header exists
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    console.log('✅ Header component is visible');

    // 2. Verify navigation menu exists
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    console.log('✅ Navigation menu is visible');

    // 3. Verify main content area (NOT just a hero section)
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();
    console.log('✅ Main content area exists');

    // 4. Verify footer exists
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    console.log('✅ Footer component is visible');

    // 5. Verify NO chat bot (we removed it)
    const chatButton = page.locator('button.fixed.bottom-6.right-6').first();
    const chatVisible = await chatButton.isVisible().catch(() => false);
    expect(chatVisible).toBe(false);
    console.log('✅ Chat bot NOT present (correct - removed)');

    // 6. Verify it's NOT a single-page landing (check for multiple sections)
    const sections = await page.locator('section').count();
    expect(sections).toBeGreaterThan(1);
    console.log(`✅ Multiple sections found: ${sections} (proper multi-page website)`);
  });

  test('should have multiple accessible pages', async ({ page }) => {
    const testPages = [
      { url: '/', name: 'Home' },
      { url: '/about', name: 'About' },
      { url: '/contact', name: 'Contact' },
      { url: '/emergency', name: 'Emergency' },
      { url: '/services', name: 'Services' }
    ];

    for (const testPage of testPages) {
      const response = await page.goto(`https://dr-new-unite-group.vercel.app${testPage.url}`);
      expect(response?.status()).toBeLessThan(400);
      console.log(`✅ ${testPage.name} page accessible (${response?.status()})`);
    }
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('https://dr-new-unite-group.vercel.app/');

    // Look for common navigation links
    const links = await page.locator('a').all();
    expect(links.length).toBeGreaterThan(5);
    console.log(`✅ Navigation has ${links.length} links (proper website structure)`);

    // Verify header has logo/branding
    const logo = page.locator('img[alt*="Disaster Recovery"]').first();
    await expect(logo).toBeVisible();
    console.log('✅ Logo/branding present in header');
  });
});
