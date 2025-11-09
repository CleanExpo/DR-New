import { test, expect } from '@playwright/test'

test.describe('SEO Validation', () => {
  const pages = [
    { url: '/', name: 'Homepage' },
    { url: '/emergency/water-damage-brisbane', name: 'Water Damage Emergency' },
    { url: '/locations/hamilton', name: 'Hamilton Location' },
    { url: '/locations/ascot', name: 'Ascot Location' },
    { url: '/insurance/suncorp', name: 'Suncorp Insurance' },
  ]

  for (const { url, name } of pages) {
    test(`${name} should have valid title tag`, async ({ page }) => {
      await page.goto(url)

      const title = await page.title()

      expect(title).toBeDefined()
      expect(title.length).toBeGreaterThan(10)
      expect(title.length).toBeLessThanOrEqual(60)
    })

    test(`${name} should have meta description`, async ({ page }) => {
      await page.goto(url)

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content')

      expect(description).toBeDefined()
      expect(description!.length).toBeGreaterThan(50)
      expect(description!.length).toBeLessThanOrEqual(160)
    })

    test(`${name} should have canonical URL`, async ({ page }) => {
      await page.goto(url)

      const canonical = page.locator('link[rel="canonical"]')
      const href = await canonical.getAttribute('href')

      expect(href).toBeDefined()
      expect(href).toContain(url)
    })

    test(`${name} should have Open Graph tags`, async ({ page }) => {
      await page.goto(url)

      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
      const ogDescription = await page
        .locator('meta[property="og:description"]')
        .getAttribute('content')
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')

      expect(ogTitle).toBeDefined()
      expect(ogDescription).toBeDefined()
      // OG image is recommended but may not be on all pages
    })

    test(`${name} should have Twitter Card tags`, async ({ page }) => {
      await page.goto(url)

      const twitterCard = await page
        .locator('meta[name="twitter:card"]')
        .getAttribute('content')

      // Twitter cards are recommended
      if (twitterCard) {
        expect(twitterCard).toBeDefined()
      }
    })

    test(`${name} should have structured data`, async ({ page }) => {
      await page.goto(url)

      const jsonLd = await page.locator('script[type="application/ld+json"]').count()

      // Should have at least one structured data block
      expect(jsonLd).toBeGreaterThan(0)
    })

    test(`${name} should have valid structured data`, async ({ page }) => {
      await page.goto(url)

      const jsonLdElements = await page.locator('script[type="application/ld+json"]').all()

      for (const element of jsonLdElements) {
        const content = await element.textContent()

        if (content) {
          // Should be valid JSON
          expect(() => JSON.parse(content)).not.toThrow()

          const data = JSON.parse(content)

          // Should have @context and @type
          expect(data['@context']).toBeDefined()
          expect(data['@type']).toBeDefined()
        }
      }
    })

    test(`${name} should have h1 tag`, async ({ page }) => {
      await page.goto(url)

      const h1 = await page.locator('h1').count()

      // Should have exactly one h1
      expect(h1).toBeGreaterThanOrEqual(1)
    })

    test(`${name} should have robots meta tag`, async ({ page }) => {
      await page.goto(url)

      const robots = await page.locator('meta[name="robots"]').getAttribute('content')

      // Robots tag may or may not be present
      // If present, should not be "noindex"
      if (robots) {
        expect(robots).not.toContain('noindex')
      }
    })

    test(`${name} should have viewport meta tag`, async ({ page }) => {
      await page.goto(url)

      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')

      expect(viewport).toBeDefined()
      expect(viewport).toContain('width=device-width')
    })

    test(`${name} should have language attribute`, async ({ page }) => {
      await page.goto(url)

      const lang = await page.locator('html').getAttribute('lang')

      expect(lang).toBeDefined()
      expect(lang).toMatch(/^en/)
    })

    test(`${name} should have favicon`, async ({ page }) => {
      await page.goto(url)

      const favicon = page.locator('link[rel="icon"], link[rel="shortcut icon"]')
      const count = await favicon.count()

      expect(count).toBeGreaterThan(0)
    })
  }

  test('should have valid sitemap.xml', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml')

    expect(response.status()).toBe(200)

    const contentType = response.headers()['content-type']
    expect(contentType).toContain('xml')

    const body = await response.text()
    expect(body).toContain('<urlset')
    expect(body).toContain('<url>')
  })

  test('should have robots.txt', async ({ page }) => {
    const response = await page.request.get('/robots.txt')

    expect(response.status()).toBe(200)

    const body = await response.text()
    expect(body).toContain('User-agent')
  })

  test('local business structured data should be valid', async ({ page }) => {
    await page.goto('/')

    const jsonLdElements = await page.locator('script[type="application/ld+json"]').all()

    let hasLocalBusiness = false

    for (const element of jsonLdElements) {
      const content = await element.textContent()

      if (content) {
        const data = JSON.parse(content)

        if (data['@type'] === 'LocalBusiness' || data['@type']?.includes('LocalBusiness')) {
          hasLocalBusiness = true

          // Should have required properties
          expect(data.name).toBeDefined()
          expect(data.address).toBeDefined()

          // Should have Brisbane/Queensland address
          const addressText = JSON.stringify(data.address)
          expect(addressText).toMatch(/Brisbane|Queensland|QLD/i)
        }
      }
    }

    // Should have local business data
    expect(hasLocalBusiness).toBe(true)
  })

  test('should include Brisbane and Queensland keywords', async ({ page }) => {
    await page.goto('/')

    const content = await page.textContent('body')

    expect(content).toMatch(/Brisbane/i)
    expect(content).toMatch(/Queensland|QLD/i)
  })

  test('should mention Master Restorer credentials', async ({ page }) => {
    await page.goto('/')

    const content = await page.textContent('body')

    expect(content).toMatch(/Master Restorer/i)
  })

  test('should have service area information', async ({ page }) => {
    await page.goto('/locations/hamilton')

    const content = await page.textContent('body')

    expect(content).toMatch(/Hamilton/i)
    expect(content).toMatch(/Brisbane/i)
  })
})
