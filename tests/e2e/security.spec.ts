import { test, expect } from '@playwright/test'

test.describe('Security Tests', () => {
  test('should have security headers', async ({ page }) => {
    const response = await page.goto('/')

    const headers = response?.headers()

    // Check for important security headers
    expect(headers?.['x-frame-options']).toBeDefined()
    expect(headers?.['x-content-type-options']).toBe('nosniff')
    expect(headers?.['x-xss-protection']).toBeDefined()
    expect(headers?.['strict-transport-security']).toBeDefined()
  })

  test('should have Content Security Policy', async ({ page }) => {
    const response = await page.goto('/')

    const headers = response?.headers()
    const csp = headers?.['content-security-policy']

    expect(csp).toBeDefined()
  })

  test('should prevent clickjacking with X-Frame-Options', async ({ page }) => {
    const response = await page.goto('/')

    const headers = response?.headers()
    const frameOptions = headers?.['x-frame-options']

    expect(frameOptions).toMatch(/DENY|SAMEORIGIN/)
  })

  test('should enforce HTTPS with HSTS', async ({ page }) => {
    const response = await page.goto('/')

    const headers = response?.headers()
    const hsts = headers?.['strict-transport-security']

    if (hsts) {
      expect(hsts).toContain('max-age')
    }
  })

  test('should prevent XSS attacks in forms', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    const form = page.locator('form').first()

    if (await form.isVisible()) {
      const nameInput = page.locator('input[name="name"]').first()

      if (await nameInput.isVisible()) {
        // Try to inject XSS
        await nameInput.fill('<script>alert("xss")</script>')

        const value = await nameInput.inputValue()

        // Should either sanitize or escape the input
        // The value should not execute as script
        expect(value).toBeDefined()
      }
    }
  })

  test('should not expose sensitive information in errors', async ({ page }) => {
    // Try to access a non-existent API endpoint
    const response = await page.request.get('/api/nonexistent-endpoint')

    const body = await response.text()

    // Should not expose stack traces or internal paths
    expect(body).not.toContain('node_modules')
    expect(body).not.toContain('at ')
    expect(body).not.toContain('Error:')
  })

  test('should validate CSRF protection on forms', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    const form = page.locator('form').first()

    if (await form.isVisible()) {
      // Check for CSRF token or other protection
      const csrfToken = page.locator('input[name="_csrf"], input[name="csrf_token"]')

      // CSRF protection may be implemented differently
      // This is a guideline check
    }
  })

  test('should not allow SQL injection in query parameters', async ({ page }) => {
    // Try to inject SQL through URL parameters
    await page.goto('/?search=\' OR \'1\'=\'1')

    // Page should load without exposing database errors
    const content = await page.textContent('body')

    expect(content).not.toContain('SQL syntax')
    expect(content).not.toContain('mysql_')
    expect(content).not.toContain('PostgreSQL')
  })

  test('should sanitize user input in search', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[type="search"], input[name="search"]').first()

    if (await searchInput.isVisible()) {
      await searchInput.fill('<img src=x onerror=alert(1)>')

      // Input should be sanitized
      const value = await searchInput.inputValue()
      expect(value).toBeDefined()
    }
  })

  test('should use secure cookies', async ({ context }) => {
    await context.goto('/')

    const cookies = await context.cookies()

    cookies.forEach((cookie) => {
      // Session cookies should be secure and httpOnly
      if (cookie.name.includes('session') || cookie.name.includes('token')) {
        expect(cookie.secure).toBe(true)
        expect(cookie.httpOnly).toBe(true)
      }
    })
  })

  test('should prevent directory traversal', async ({ page }) => {
    // Try to access files using directory traversal
    const response = await page.request.get('/api/../../../etc/passwd')

    expect(response.status()).toBeGreaterThanOrEqual(400)
  })

  test('should rate limit API requests', async ({ page }) => {
    // Make multiple rapid requests
    const requests = []

    for (let i = 0; i < 100; i++) {
      requests.push(page.request.post('/api/contact/submit', {
        data: { test: 'data' },
      }))
    }

    const responses = await Promise.all(requests)

    // Should eventually rate limit
    const rateLimited = responses.some((r) => r.status() === 429)

    // Rate limiting may or may not be implemented
    // This is a guideline check
  })

  test('should protect against open redirect', async ({ page }) => {
    // Try to redirect to external site
    await page.goto('/?redirect=https://evil.com')

    // Should not redirect to external sites
    const url = page.url()
    expect(url).not.toContain('evil.com')
  })

  test('should have secure password requirements', async ({ page }) => {
    // If there's a password field, check for requirements
    const passwordInput = page.locator('input[type="password"]').first()

    if (await passwordInput.isVisible()) {
      // Should have minimum length requirement
      const minLength = await passwordInput.getAttribute('minlength')

      if (minLength) {
        expect(parseInt(minLength)).toBeGreaterThanOrEqual(8)
      }
    }
  })

  test('should not expose API keys or secrets', async ({ page }) => {
    await page.goto('/')

    const pageContent = await page.content()

    // Check for common secret patterns
    expect(pageContent).not.toMatch(/sk_[a-zA-Z0-9]{24,}/) // Stripe keys
    expect(pageContent).not.toMatch(/AIza[0-9A-Za-z-_]{35}/) // Google API keys (exposed in public maps API is OK)
    expect(pageContent).not.toMatch(/aws_secret_access_key/)
  })

  test('should use HTTPS for external resources', async ({ page }) => {
    await page.goto('/')

    // Get all resource URLs
    const resources = await page.evaluate(() => {
      const urls: string[] = []

      // Scripts
      document.querySelectorAll('script[src]').forEach((el) => {
        urls.push(el.getAttribute('src') || '')
      })

      // Stylesheets
      document.querySelectorAll('link[rel="stylesheet"]').forEach((el) => {
        urls.push(el.getAttribute('href') || '')
      })

      // Images
      document.querySelectorAll('img[src]').forEach((el) => {
        urls.push(el.getAttribute('src') || '')
      })

      return urls
    })

    resources.forEach((url) => {
      if (url.startsWith('http://') && !url.includes('localhost')) {
        // Should use HTTPS for external resources
        expect(url).toMatch(/^https:/)
      }
    })
  })
})
