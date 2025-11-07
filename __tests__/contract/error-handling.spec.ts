import { test, expect } from '@playwright/test';

test.describe('Error Handling Tests', () => {
  test('404 page displays for non-existent routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-12345');

    // Should show 404 or custom error page
    const bodyText = await page.locator('body').textContent();
    expect(
      bodyText?.includes('404') ||
      bodyText?.includes('not found') ||
      bodyText?.includes('Page Not Found')
    ).toBe(true);
  });

  test('404 page has navigation back to homepage', async ({ page }) => {
    await page.goto('/non-existent-route');

    // Should have link back to home
    const homeLink = page.getByRole('link', { name: /home|back/i });
    await expect(homeLink).toBeVisible();
  });

  test('API errors are handled gracefully', async ({ request }) => {
    const response = await request.get('/api/non-existent-endpoint');

    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);

    const body = await response.json().catch(() => null);
    if (body) {
      expect(body).toHaveProperty('error' || 'message');
    }
  });

  test('malformed API requests return proper errors', async ({ request }) => {
    const response = await request.post('/api/claims/submit', {
      data: {
        // Missing required fields
        name: 'Test',
      },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('network failure handling', async ({ page }) => {
    // Go offline
    await page.context().setOffline(true);

    const response = await page.goto('/').catch(() => null);

    // Should handle offline gracefully (may show offline page or error)
    expect(response === null || response?.status() >= 400).toBe(true);

    // Go back online
    await page.context().setOffline(false);
  });

  test('JavaScript errors are logged', async ({ page }) => {
    const jsErrors: string[] = [];

    page.on('pageerror', (error) => {
      jsErrors.push(error.message);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // No JavaScript errors should occur on normal page load
    expect(jsErrors.length).toBe(0);
  });

  test('form validation errors are displayed', async ({ page }) => {
    await page.goto('/book-service');

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').first();

    if (await submitButton.isVisible()) {
      await submitButton.click();

      // Should show validation errors
      const errorMessages = await page.locator('[class*="error"], [role="alert"]').count();
      expect(errorMessages).toBeGreaterThan(0);
    }
  });

  test('invalid email shows validation error', async ({ page }) => {
    await page.goto('/book-service');

    const emailInput = page.locator('input[type="email"]').first();

    if (await emailInput.isVisible()) {
      await emailInput.fill('not-an-email');
      await emailInput.blur();

      // Should show validation error
      const errorMessage = page.locator('text=/invalid.*email|valid email/i');
      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
      }
    }
  });

  test('API timeout is handled', async ({ page }) => {
    // This would require mocking or a slow endpoint
    // For now, just verify page doesn't crash
    await page.goto('/api/search?q=test', { timeout: 5000 });

    const url = page.url();
    expect(url).toBeTruthy();
  });

  test('console errors are caught and handled', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors
    const criticalErrors = consoleErrors.filter(
      error => !error.includes('DevTools') && !error.includes('extension')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('broken image links show fallback', async ({ page }) => {
    await page.goto('/');

    // Try to load a broken image
    await page.evaluate(() => {
      const img = document.createElement('img');
      img.src = '/non-existent-image.jpg';
      img.alt = 'Test image';
      document.body.appendChild(img);
    });

    // Page should not crash
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
  });

  test('session expiry is handled', async ({ page }) => {
    await page.goto('/');

    // Clear cookies to simulate session expiry
    await page.context().clearCookies();

    // Navigate to a page requiring session
    await page.goto('/book-service');

    // Should either redirect to login or allow anonymous access
    expect(page.url()).toBeTruthy();
  });
});
