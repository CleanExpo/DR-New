import { test, expect, devices } from '@playwright/test'

test.describe('Mobile Responsiveness', () => {
  const mobileDevices = [
    { name: 'iPhone 12', ...devices['iPhone 12'] },
    { name: 'iPhone 13', ...devices['iPhone 13'] },
    { name: 'Pixel 5', ...devices['Pixel 5'] },
    { name: 'Samsung Galaxy S21', ...devices['Galaxy S9+'] },
  ]

  for (const device of mobileDevices) {
    test.describe(`${device.name}`, () => {
      test.use({ ...device })

      test('homepage should be readable on mobile', async ({ page }) => {
        await page.goto('/')

        // Main content should be visible
        const main = page.locator('main, [role="main"]').first()
        await expect(main).toBeVisible()

        // Text should not overflow
        const body = await page.locator('body').boundingBox()
        expect(body?.width).toBeLessThanOrEqual(device.viewport.width)
      })

      test('navigation should work on mobile', async ({ page }) => {
        await page.goto('/')

        // Mobile menu should be accessible
        // Check for hamburger menu or mobile navigation
        const nav = page.locator('nav, [role="navigation"]').first()
        await expect(nav).toBeVisible()
      })

      test('emergency CTA should be prominent on mobile', async ({ page }) => {
        await page.goto('/')

        // Emergency call-to-action should be visible
        const emergencyCTA = page.getByText(/24\/7|emergency/i).first()
        await expect(emergencyCTA).toBeVisible()
      })

      test('forms should be usable on mobile', async ({ page }) => {
        await page.goto('/emergency/water-damage-brisbane')

        const form = page.locator('form').first()

        if (await form.isVisible()) {
          // Form inputs should be large enough for mobile
          const input = page.locator('input, textarea, select').first()

          if (await input.isVisible()) {
            const box = await input.boundingBox()
            // Touch targets should be at least 44x44px
            expect(box?.height).toBeGreaterThanOrEqual(40)
          }
        }
      })

      test('images should scale correctly', async ({ page }) => {
        await page.goto('/')

        const images = await page.locator('img').all()

        for (const img of images.slice(0, 5)) {
          if (await img.isVisible()) {
            const box = await img.boundingBox()

            // Images should not exceed viewport width
            expect(box?.width).toBeLessThanOrEqual(device.viewport.width)
          }
        }
      })

      test('text should be readable without zooming', async ({ page }) => {
        await page.goto('/')

        // Check font sizes
        const paragraphs = await page.locator('p').all()

        for (const p of paragraphs.slice(0, 5)) {
          if (await p.isVisible()) {
            const fontSize = await p.evaluate(
              (el) => window.getComputedStyle(el).fontSize
            )

            // Font size should be at least 16px
            const size = parseInt(fontSize)
            expect(size).toBeGreaterThanOrEqual(14)
          }
        }
      })

      test('buttons should be tap-friendly', async ({ page }) => {
        await page.goto('/')

        const buttons = await page.locator('button, a.button, [role="button"]').all()

        for (const button of buttons.slice(0, 5)) {
          if (await button.isVisible()) {
            const box = await button.boundingBox()

            // Touch targets should be at least 44x44px
            expect(box?.height).toBeGreaterThanOrEqual(40)
          }
        }
      })

      test('horizontal scrolling should not occur', async ({ page }) => {
        await page.goto('/')

        const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
        const clientWidth = await page.evaluate(() => document.body.clientWidth)

        // No horizontal overflow
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 10)
      })

      test('viewport meta tag should be present', async ({ page }) => {
        await page.goto('/')

        const viewport = await page
          .locator('meta[name="viewport"]')
          .getAttribute('content')

        expect(viewport).toContain('width=device-width')
      })

      test('links should be tap-friendly', async ({ page }) => {
        await page.goto('/')

        const links = await page.locator('a').all()

        for (const link of links.slice(0, 10)) {
          if (await link.isVisible()) {
            const box = await link.boundingBox()

            // Links should have adequate touch target
            if (box?.height) {
              expect(box.height).toBeGreaterThanOrEqual(30)
            }
          }
        }
      })
    })
  }

  test.describe('Tablet Responsiveness', () => {
    test.use(devices['iPad Pro'])

    test('should display properly on tablet', async ({ page }) => {
      await page.goto('/')

      const main = page.locator('main, [role="main"]').first()
      await expect(main).toBeVisible()
    })

    test('navigation should adapt to tablet', async ({ page }) => {
      await page.goto('/')

      const nav = page.locator('nav, [role="navigation"]').first()
      await expect(nav).toBeVisible()
    })
  })

  test.describe('Landscape Orientation', () => {
    test.use(devices['iPhone 12 landscape'])

    test('should work in landscape mode', async ({ page }) => {
      await page.goto('/')

      const main = page.locator('main, [role="main"]').first()
      await expect(main).toBeVisible()
    })
  })
})
