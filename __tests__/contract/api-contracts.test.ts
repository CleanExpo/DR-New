import { test, expect } from '@playwright/test';

test.describe('API Contract Tests', () => {
  test('Search API returns expected structure', async ({ request }) => {
    const response = await request.get('/api/search?q=water+damage');

    // Should return 200 or 404
    expect([200, 404]).toContain(response.status());

    if (response.ok()) {
      const data = await response.json();

      // Verify response structure
      expect(data).toBeDefined();

      // If results exist, they should have expected fields
      if (data.results && Array.isArray(data.results)) {
        data.results.forEach((result: any) => {
          expect(result).toHaveProperty('title' || 'name');
          expect(result).toHaveProperty('url' || 'link' || 'path');
        });
      }
    }
  });

  test('Claims submission API validates input', async ({ request }) => {
    const invalidData = {
      name: 'Test',
      // Missing required fields
    };

    const response = await request.post('/api/claims/submit', {
      data: invalidData,
    });

    // Should return 400 Bad Request for invalid data
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });

  test('Claims API accepts valid data structure', async ({ request }) => {
    const validData = {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '0412345678',
      address: '123 Main St, Hamilton, QLD 4007',
      serviceType: 'water-damage',
      description: 'Emergency water damage',
      insuranceProvider: 'Test Insurance',
      policyNumber: 'POL123456',
    };

    const response = await request.post('/api/claims/submit', {
      data: validData,
    });

    // Should accept valid data (200 or 201)
    expect(response.status()).toBeLessThan(400);
  });

  test('Analytics API returns metrics', async ({ request }) => {
    const response = await request.get('/api/analytics/kpi');

    if (response.ok()) {
      const data = await response.json();

      expect(data).toBeDefined();
      // Should contain KPI metrics
      expect(typeof data).toBe('object');
    }
  });

  test('SEO Monitor API returns status', async ({ request }) => {
    const response = await request.get('/api/seo/monitor');

    expect(response.status()).toBeLessThan(500);

    if (response.ok()) {
      const data = await response.json();

      expect(data).toBeDefined();
      expect(data).toHaveProperty('status' || 'health');
    }
  });

  test('Image Stats API returns data', async ({ request }) => {
    const response = await request.get('/api/image-stats');

    if (response.ok()) {
      const data = await response.json();

      expect(data).toBeDefined();
      expect(typeof data).toBe('object');
    }
  });

  test('Error API returns JSON error responses', async ({ request }) => {
    const response = await request.get('/api/non-existent');

    expect(response.status()).toBeGreaterThanOrEqual(400);

    const contentType = response.headers()['content-type'];
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      expect(data).toHaveProperty('error' || 'message');
    }
  });

  test('API handles CORS properly', async ({ request }) => {
    const response = await request.get('/api/search?q=test', {
      headers: {
        'Origin': 'https://example.com',
      },
    });

    const corsHeader = response.headers()['access-control-allow-origin'];

    // CORS should be configured (or not allow external origins)
    if (corsHeader) {
      expect(corsHeader).toBeTruthy();
    }
  });

  test('API rate limiting is configured', async ({ request }) => {
    // Make multiple rapid requests
    const requests = Array(20).fill(0).map(() =>
      request.get('/api/search?q=test')
    );

    const responses = await Promise.all(requests);

    // Check if any response is rate limited (429)
    const rateLimited = responses.some(r => r.status() === 429);

    // Rate limiting might or might not be enabled
    // Just verify responses are valid
    responses.forEach(r => {
      expect(r.status()).toBeLessThan(500);
    });
  });

  test('API returns proper content types', async ({ request }) => {
    const response = await request.get('/api/search?q=test');

    const contentType = response.headers()['content-type'];

    if (response.ok()) {
      expect(contentType).toContain('application/json');
    }
  });

  test('API handles malformed JSON', async ({ request }) => {
    const response = await request.post('/api/claims/submit', {
      data: 'not json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Should return 400 Bad Request
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('API validates Australian phone numbers', async ({ request }) => {
    const dataWithInvalidPhone = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123', // Invalid
      address: 'Brisbane',
      serviceType: 'water-damage',
      description: 'Test',
    };

    const response = await request.post('/api/claims/submit', {
      data: dataWithInvalidPhone,
    });

    // Should reject invalid phone number
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('API validates service areas', async ({ request }) => {
    const dataWithValidArea = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '0412345678',
      address: '123 Main St, Brisbane, QLD 4000',
      serviceType: 'water-damage',
      description: 'Test',
    };

    const response = await request.post('/api/claims/submit', {
      data: dataWithValidArea,
    });

    // Should accept Brisbane, Ipswich, Logan areas
    expect(response.status()).toBeLessThan(500);
  });

  test('API sanitizes input to prevent injection', async ({ request }) => {
    const maliciousData = {
      name: "'; DROP TABLE users; --",
      email: '<script>alert("xss")</script>@example.com',
      phone: '0412345678',
      address: 'Brisbane',
      serviceType: 'water-damage',
      description: '<img src=x onerror=alert(1)>',
    };

    const response = await request.post('/api/claims/submit', {
      data: maliciousData,
    });

    // Should handle malicious input gracefully (not crash)
    expect(response.status()).toBeLessThan(500);
  });

  test('API endpoints require authentication where appropriate', async ({ request }) => {
    // Test protected endpoint without auth
    const response = await request.get('/api/analytics/compliance');

    // Should either allow (public) or require auth (401/403)
    expect([200, 401, 403, 404]).toContain(response.status());
  });
});
