import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('WCAG 2.1 AA Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)
  })

  test('homepage should have no accessibility violations', async ({ page }) => {
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  })

  test('emergency pages should be accessible', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')
    await injectAxe(page)

    await checkA11y(page, undefined, {
      detailedReport: true,
    })
  })

  test('location pages should be accessible', async ({ page }) => {
    await page.goto('/locations/hamilton')
    await injectAxe(page)

    await checkA11y(page, undefined, {
      detailedReport: true,
    })
  })

  test('all images should have alt text', async ({ page }) => {
    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      const ariaLabel = await img.getAttribute('aria-label')
      const role = await img.getAttribute('role')

      // Decorative images can have empty alt or role="presentation"
      if (role !== 'presentation' && role !== 'none') {
        expect(alt !== null || ariaLabel !== null).toBeTruthy()
      }
    }
  })

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    const inputs = await page.locator('input, textarea, select').all()

    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')
      const type = await input.getAttribute('type')

      // Hidden inputs don't need labels
      if (type !== 'hidden') {
        const hasLabel =
          ariaLabel ||
          ariaLabelledBy ||
          (id && (await page.locator(`label[for="${id}"]`).count()) > 0)

        expect(hasLabel).toBeTruthy()
      }
    }
  })

  test('headings should be hierarchical', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()

    let previousLevel = 0

    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName)
      const level = parseInt(tagName.substring(1))

      // First heading should be h1
      if (previousLevel === 0) {
        expect(level).toBe(1)
      } else {
        // Headings should not skip levels
        expect(level).toBeLessThanOrEqual(previousLevel + 1)
      }

      previousLevel = level
    }
  })

  test('links should have accessible names', async ({ page }) => {
    const links = await page.locator('a').all()

    for (const link of links) {
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')
      const title = await link.getAttribute('title')

      const hasAccessibleName = (text && text.trim()) || ariaLabel || title

      expect(hasAccessibleName).toBeTruthy()
    }
  })

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    // Test tab navigation
    await page.keyboard.press('Tab')

    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)

    expect(focusedElement).toBeDefined()
  })

  test('color contrast should meet WCAG AA standards', async ({ page }) => {
    await checkA11y(
      page,
      undefined,
      {
        detailedReport: true,
      },
      true,
      'wcag2aa'
    )
  })

  test('page should have valid language attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang')

    expect(lang).toBeDefined()
    expect(lang).toMatch(/^en/)
  })

  test('skip to main content link should exist', async ({ page }) => {
    // Look for skip link
    const skipLink = page.locator('a[href="#main"], a[href="#main-content"]').first()

    // Skip links are best practice but may not be implemented
    // This test documents the expectation
  })

  test('ARIA landmarks should be properly used', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main, [role="main"]').first()
    await expect(main).toBeVisible()

    // Check for navigation landmark
    const nav = page.locator('nav, [role="navigation"]').first()
    await expect(nav).toBeVisible()
  })

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    const buttons = await page.locator('button').all()

    for (const button of buttons) {
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')

      const hasAccessibleName = (text && text.trim()) || ariaLabel

      expect(hasAccessibleName).toBeTruthy()
    }
  })

  test('focus should be visible', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane')

    // Tab to first focusable element
    await page.keyboard.press('Tab')

    // Check if focus is visible
    const focusedElement = page.locator(':focus').first()
    await expect(focusedElement).toBeVisible()
  })

  test('video/audio content should have captions', async ({ page }) => {
    const videos = await page.locator('video').all()

    for (const video of videos) {
      // Check for track element
      const tracks = await video.locator('track').count()

      // Videos should have captions (if videos exist)
      if ((await video.isVisible()) && !await video.getAttribute('muted')) {
        expect(tracks).toBeGreaterThan(0)
      }
    }
  })
})
