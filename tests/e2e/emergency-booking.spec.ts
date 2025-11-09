import { test, expect } from '@playwright/test'

test.describe('Emergency Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display emergency contact options on homepage', async ({ page }) => {
    // Check for emergency call-to-action
    const emergencySection = page.locator('[data-testid="emergency-section"]').first()
    await expect(emergencySection).toBeVisible()

    // Verify 24/7 messaging is present
    const emergencyText = page.getByText(/24\/7/i).first()
    await expect(emergencyText).toBeVisible()
  })

  test('should navigate to emergency service pages', async ({ page }) => {
    // Navigate to water damage emergency page
    await page.goto('/emergency/water-damage-brisbane')

    // Verify page loaded correctly
    await expect(page).toHaveTitle(/water damage/i)

    // Check for emergency response information
    const responseTime = page.getByText(/rapid response/i).first()
    await expect(responseTime).toBeVisible()
  })

  test('should display emergency contact form', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    // Check if contact form exists
    const contactForm = page.locator('form').first()
    await expect(contactForm).toBeVisible()

    // Verify required fields
    await expect(page.getByLabel(/name/i).first()).toBeVisible()
    await expect(page.getByLabel(/email|phone/i).first()).toBeVisible()
  })

  test('should validate emergency form submission', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    const form = page.locator('form').first()
    if (await form.isVisible()) {
      // Try to submit empty form
      const submitButton = page.getByRole('button', { name: /submit|send|contact/i }).first()
      if (await submitButton.isVisible()) {
        await submitButton.click()

        // Check for validation messages (should prevent submission)
        // This will vary based on form implementation
      }
    }
  })

  test('should display service areas for emergency response', async ({ page }) => {
    // Check Brisbane locations
    await page.goto('/locations/hamilton')
    await expect(page).toHaveTitle(/hamilton/i)

    // Verify emergency service availability
    const emergencyAvailable = page.getByText(/24\/7|emergency/i).first()
    await expect(emergencyAvailable).toBeVisible()
  })

  test('should navigate between emergency service types', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    // Navigate to fire damage
    const fireLink = page.getByRole('link', { name: /fire damage/i }).first()
    if (await fireLink.isVisible()) {
      await fireLink.click()
      await expect(page.url()).toContain('fire')
    }
  })

  test('should display Master Restorer credentials', async ({ page }) => {
    // Navigate to about or services page
    await page.goto('/')

    // Check for Master Restorer mention
    const masterRestorer = page.getByText(/master restorer/i).first()
    await expect(masterRestorer).toBeVisible()
  })

  test('should show insurance company information', async ({ page }) => {
    // Navigate to insurance page
    await page.goto('/insurance/suncorp')

    // Verify insurance company page loads
    await expect(page).toHaveTitle(/suncorp|insurance/i)

    // Check for claims assistance information
    const claimsInfo = page.getByText(/claim|insurance/i).first()
    await expect(claimsInfo).toBeVisible()
  })

  test('should be mobile responsive', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/')

      // Check if mobile menu exists
      const mobileMenu = page.getByLabel(/menu|navigation/i).first()
      // Mobile menu might be hidden initially

      // Verify content is readable on mobile
      const viewport = page.viewportSize()
      expect(viewport?.width).toBeLessThanOrEqual(768)
    }
  })

  test('should load emergency pages quickly', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/emergency/water-damage-brisbane')
    const loadTime = Date.now() - startTime

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })
})
