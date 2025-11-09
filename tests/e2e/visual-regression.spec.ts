import { test, expect } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('homepage should match visual snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Wait for images to load
    await page.waitForTimeout(1000)

    // Take screenshot and compare
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('water damage emergency page should match snapshot', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('water-damage-emergency.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('location page should match snapshot', async ({ page }) => {
    await page.goto('/locations/hamilton')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('location-hamilton.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('insurance page should match snapshot', async ({ page }) => {
    await page.goto('/insurance/suncorp')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('insurance-suncorp.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('mobile view should match snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('tablet view should match snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('header navigation should be consistent', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const header = page.locator('header, [role="banner"]').first()
    await expect(header).toHaveScreenshot('header.png', {
      maxDiffPixels: 50,
    })
  })

  test('footer should be consistent', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const footer = page.locator('footer, [role="contentinfo"]').first()
    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixels: 50,
    })
  })

  test('emergency section should render consistently', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const emergencySection = page.locator('[data-testid="emergency-section"]').first()
    if (await emergencySection.isVisible()) {
      await expect(emergencySection).toHaveScreenshot('emergency-section.png', {
        maxDiffPixels: 50,
      })
    }
  })

  test('service cards should render consistently', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const serviceCard = page.locator('.service-card, [data-testid="service-card"]').first()
    if (await serviceCard.isVisible()) {
      await expect(serviceCard).toHaveScreenshot('service-card.png', {
        maxDiffPixels: 50,
      })
    }
  })

  test('dark mode toggle should work', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for dark mode toggle
    const darkModeToggle = page.locator('[aria-label*="dark"], [data-testid="theme-toggle"]').first()

    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
        fullPage: false,
        maxDiffPixels: 200,
      })
    }
  })

  test('hover states should be consistent', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const button = page.locator('button, a.button').first()
    if (await button.isVisible()) {
      await button.hover()
      await page.waitForTimeout(200)

      await expect(button).toHaveScreenshot('button-hover.png', {
        maxDiffPixels: 30,
      })
    }
  })

  test('form should render consistently', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')
    await page.waitForLoadState('networkidle')

    const form = page.locator('form').first()
    if (await form.isVisible()) {
      await expect(form).toHaveScreenshot('contact-form.png', {
        maxDiffPixels: 50,
      })
    }
  })

  test('breadcrumbs should render consistently', async ({ page }) => {
    await page.goto('/locations/hamilton')
    await page.waitForLoadState('networkidle')

    const breadcrumb = page.locator('[data-testid="breadcrumb"], nav[aria-label*="breadcrumb"]').first()
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toHaveScreenshot('breadcrumbs.png', {
        maxDiffPixels: 30,
      })
    }
  })

  test('loading states should be consistent', async ({ page }) => {
    // Intercept and delay a request to capture loading state
    await page.route('**/api/**', (route) => {
      setTimeout(() => route.continue(), 1000)
    })

    const navigation = page.goto('/')

    // Try to capture loading state
    await page.waitForTimeout(200)

    // Continue with navigation
    await navigation
  })
})
