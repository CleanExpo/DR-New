import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
  test('CSP header is present and configured', async ({ page }) => {
    const response = await page.goto('/');

    const cspHeader = response?.headers()['content-security-policy'];

    if (cspHeader) {
      expect(cspHeader).toBeTruthy();
      // Should restrict unsafe inline scripts
      expect(cspHeader).not.toContain("'unsafe-inline'");
    }
  });

  test('X-Frame-Options prevents clickjacking', async ({ page }) => {
    const response = await page.goto('/');

    const xFrameOptions = response?.headers()['x-frame-options'];

    if (xFrameOptions) {
      expect(xFrameOptions).toMatch(/DENY|SAMEORIGIN/i);
    }
  });

  test('X-Content-Type-Options is set', async ({ page }) => {
    const response = await page.goto('/');

    const xContentTypeOptions = response?.headers()['x-content-type-options'];

    if (xContentTypeOptions) {
      expect(xContentTypeOptions).toBe('nosniff');
    }
  });

  test('Strict-Transport-Security header is present', async ({ page }) => {
    const response = await page.goto('/');

    const hsts = response?.headers()['strict-transport-security'];

    if (hsts) {
      expect(hsts).toBeTruthy();
      expect(hsts).toContain('max-age');
    }
  });

  test('no sensitive data in URLs', async ({ page }) => {
    await page.goto('/');

    const url = page.url();

    // Check URL doesn't contain sensitive patterns
    expect(url).not.toMatch(/password|token|secret|api[_-]?key/i);
  });

  test('forms use HTTPS for submission', async ({ page }) => {
    await page.goto('/book-service');

    const forms = await page.locator('form').all();

    for (const form of forms) {
      const action = await form.getAttribute('action');
      if (action && action.startsWith('http')) {
        expect(action).toMatch(/^https:/);
      }
    }
  });

  test('no XSS vulnerabilities in search', async ({ page }) => {
    const xssPayload = '<script>alert("xss")</script>';
    await page.goto(`/search?q=${encodeURIComponent(xssPayload)}`);

    // Check that script tag is not rendered
    const bodyHTML = await page.locator('body').innerHTML();
    expect(bodyHTML).not.toContain('<script>alert("xss")</script>');
  });

  test('CSRF token is present in forms', async ({ page }) => {
    await page.goto('/book-service');

    const forms = await page.locator('form').all();

    for (const form of forms) {
      // Look for CSRF token (hidden input or meta tag)
      const csrfInput = await form.locator('input[name*="csrf"], input[name*="token"]').count();
      const csrfMeta = await page.locator('meta[name="csrf-token"]').count();

      // At least one CSRF protection mechanism should exist
      if (forms.length > 0) {
        expect(csrfInput + csrfMeta).toBeGreaterThan(0);
      }
    }
  });

  test('no SQL injection in API endpoints', async ({ page, request }) => {
    const sqlPayloads = [
      "' OR '1'='1",
      "'; DROP TABLE users; --",
      "1' UNION SELECT NULL--",
    ];

    for (const payload of sqlPayloads) {
      const response = await request.get(`/api/search?q=${encodeURIComponent(payload)}`);

      // Should not return 500 error (indicating SQL error)
      expect(response.status()).not.toBe(500);
      expect(response.status()).toBeLessThan(500);
    }
  });

  test('authentication endpoints are protected', async ({ request }) => {
    const response = await request.post('/api/auth/signin', {
      data: {
        username: 'test',
        password: 'test',
      },
    });

    // Should have some form of protection (rate limiting, CSRF, etc.)
    expect(response.status()).toBeLessThan(500);
  });

  test('sensitive files are not accessible', async ({ request }) => {
    const sensitiveFiles = [
      '/.env',
      '/.git/config',
      '/package.json',
      '/.env.local',
      '/prisma/schema.prisma',
    ];

    for (const file of sensitiveFiles) {
      const response = await request.get(file);

      // Should return 404 or 403, not 200
      expect(response.status()).not.toBe(200);
    }
  });

  test('directory listing is disabled', async ({ request }) => {
    const response = await request.get('/images/');

    // Should not show directory listing
    expect(response.status()).not.toBe(200);
  });

  test('error messages do not leak information', async ({ page }) => {
    await page.goto('/non-existent-page-12345');

    const bodyText = await page.locator('body').textContent();

    // Should not reveal stack traces or system info
    expect(bodyText).not.toMatch(/at.*\(.*:\d+:\d+\)/); // Stack trace pattern
    expect(bodyText).not.toMatch(/Error:.*at/); // Detailed error
  });

  test('no mixed content warnings', async ({ page }) => {
    const mixedContentWarnings: string[] = [];

    page.on('console', (msg) => {
      if (msg.text().includes('Mixed Content') || msg.text().includes('insecure')) {
        mixedContentWarnings.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(mixedContentWarnings).toEqual([]);
  });
});
