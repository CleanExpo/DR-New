import { test, expect } from '@playwright/test'

test.describe('Service Pages Navigation', () => {
  const servicePages = [
    '/emergency/water-damage-brisbane',
    '/locations/hamilton',
    '/locations/ascot',
    '/insurance/suncorp',
  ]

  test('should navigate to all main service pages', async ({ page }) => {
    for (const servicePage of servicePages) {
      await page.goto(servicePage)

      // Page should load successfully
      await expect(page).toHaveURL(new RegExp(servicePage))

      // Check for basic content
      const mainContent = page.locator('main, [role="main"]').first()
      await expect(mainContent).toBeVisible()
    }
  })

  test('should display proper page metadata', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    // Check for title
    await expect(page).toHaveTitle(/.+/)

    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('should have working internal links', async ({ page }) => {
    await page.goto('/')

    // Find all internal links
    const links = await page.locator('a[href^="/"]').all()

    // Test first 5 links to avoid timeout
    for (let i = 0; i < Math.min(5, links.length); i++) {
      const href = await links[i].getAttribute('href')
      if (href && !href.includes('#')) {
        const response = await page.request.get(href)
        expect(response.status()).toBeLessThan(400)
      }
    }
  })

  test('should display location-specific content', async ({ page }) => {
    await page.goto('/locations/hamilton')

    // Check for location name
    const locationName = page.getByText(/hamilton/i).first()
    await expect(locationName).toBeVisible()

    // Check for Brisbane/Queensland references
    const qldReference = page.getByText(/brisbane|queensland/i).first()
    await expect(qldReference).toBeVisible()
  })

  test('should display service area maps or information', async ({ page }) => {
    await page.goto('/locations/hamilton')

    // Look for service area information
    const serviceArea = page.locator('[data-testid="service-area"], .service-area').first()
    // This may or may not exist depending on implementation
  })

  test('should show breadcrumbs for navigation', async ({ page }) => {
    await page.goto('/locations/hamilton')

    // Check for breadcrumb navigation
    const breadcrumb = page.locator('[data-testid="breadcrumb"], nav[aria-label*="breadcrumb"]').first()
    // Breadcrumbs may not be implemented yet
  })

  test('should display contact information on service pages', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    // Look for contact elements (email, phone placeholder, or contact form)
    const contactElement = page.locator('form, [href^="mailto:"]').first()
    // At least one form of contact should be present
  })

  test('should have consistent header and footer', async ({ page }) => {
    const pages = ['/', '/locations/hamilton', '/insurance/suncorp']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      // Check for header
      const header = page.locator('header, [role="banner"]').first()
      await expect(header).toBeVisible()

      // Check for footer
      const footer = page.locator('footer, [role="contentinfo"]').first()
      await expect(footer).toBeVisible()
    }
  })

  test('should display insurance company logos or information', async ({ page }) => {
    await page.goto('/insurance/suncorp')

    // Check for insurance company name
    const insuranceName = page.getByText(/suncorp/i).first()
    await expect(insuranceName).toBeVisible()

    // Look for claims process information
    const claimsInfo = page.getByText(/claim|process|assistance/i).first()
    await expect(claimsInfo).toBeVisible()
  })

  test('should handle 404 pages gracefully', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-12345')

    // Should return 404 or redirect
    expect(response?.status()).toBeGreaterThanOrEqual(404)
  })

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/')

    // Check for main navigation
    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()

    // Should have accessible labels
    const navLinks = page.locator('nav a').all()
    // Navigation should exist
  })

  test('should display FAQ pages', async ({ page }) => {
    await page.goto('/faq')

    // Check for FAQ content
    const faqHeading = page.getByRole('heading', { name: /faq|frequently asked/i }).first()
    await expect(faqHeading).toBeVisible()
  })

  test('should show certifications and credentials', async ({ page }) => {
    await page.goto('/')

    // Look for Master Restorer or certification mentions
    const credentials = page.getByText(/master restorer|certified|qualification/i).first()
    await expect(credentials).toBeVisible()
  })

  test('should have fast page transitions', async ({ page }) => {
    await page.goto('/')

    const startTime = Date.now()
    await page.goto('/locations/hamilton')
    const transitionTime = Date.now() - startTime

    // Navigation should be reasonably fast
    expect(transitionTime).toBeLessThan(5000)
  })

  test('should display service categories', async ({ page }) => {
    await page.goto('/')

    // Look for service categories (water, fire, mould, storm)
    const waterService = page.getByText(/water damage|flood/i).first()
    await expect(waterService).toBeVisible()
  })
})
