import { test, expect } from '@playwright/test';

test.describe('CI smoke coverage', () => {
  test('public pages render without server errors', async ({ page }) => {
    for (const path of ['/', '/about', '/contact', '/services', '/property-owners']) {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(500);

      const bodyText = (await page.locator('body').innerText()).toLowerCase();
      expect(bodyText).not.toContain('internal server error');
      expect(bodyText).not.toContain('application error');
    }
  });

  test('unknown API route does not crash the app', async ({ request }) => {
    const response = await request.get('/api/non-existent-endpoint');

    expect(response.status()).toBeLessThan(500);
  });
});
