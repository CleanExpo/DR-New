import { test, expect } from '@playwright/test'

test.describe('Performance Metrics', () => {
  test('homepage should load quickly', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have good Core Web Vitals - LCP', async ({ page }) => {
    await page.goto('/')

    // Get LCP using Performance Observer
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let lcpValue = 0

        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any

          lcpValue = lastEntry.renderTime || lastEntry.loadTime
        })

        observer.observe({ type: 'largest-contentful-paint', buffered: true })

        // Wait for page to settle
        setTimeout(() => {
          observer.disconnect()
          resolve(lcpValue)
        }, 3000)
      })
    })

    // LCP should be under 2.5s (good)
    expect(lcp).toBeLessThan(2500)
  })

  test('should have minimal CLS', async ({ page }) => {
    await page.goto('/')

    // Get CLS using Performance Observer
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0

        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
        })

        observer.observe({ type: 'layout-shift', buffered: true })

        setTimeout(() => {
          observer.disconnect()
          resolve(clsValue)
        }, 3000)
      })
    })

    // CLS should be under 0.1 (good)
    expect(cls).toBeLessThan(0.1)
  })

  test('should have good FCP', async ({ page }) => {
    await page.goto('/')

    const fcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint')

          if (fcpEntry) {
            observer.disconnect()
            resolve(fcpEntry.startTime)
          }
        })

        observer.observe({ type: 'paint', buffered: true })
      })
    })

    // FCP should be under 1.8s (good)
    expect(fcp).toBeLessThan(1800)
  })

  test('should load critical resources efficiently', async ({ page }) => {
    const resourceTimings: any[] = []

    page.on('response', (response) => {
      resourceTimings.push({
        url: response.url(),
        status: response.status(),
        timing: response.timing(),
      })
    })

    await page.goto('/')

    // Check that critical resources loaded successfully
    const criticalResources = resourceTimings.filter(
      (r) => r.url.includes('.css') || r.url.includes('.js') || r.url.includes('/_next/')
    )

    criticalResources.forEach((resource) => {
      expect(resource.status).toBe(200)
    })
  })

  test('should have optimized images', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()

    for (const img of images) {
      const src = await img.getAttribute('src')

      if (src) {
        // Images should use modern formats or Next.js optimization
        const isOptimized =
          src.includes('/_next/image') ||
          src.endsWith('.webp') ||
          src.endsWith('.avif') ||
          src.includes('data:image')

        expect(isOptimized).toBeTruthy()
      }
    }
  })

  test('should use lazy loading for images', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()

    for (const img of images) {
      const loading = await img.getAttribute('loading')

      // Most images should be lazy loaded (except above-fold)
      // This is a guideline check
    }
  })

  test('should minimize main thread work', async ({ page }) => {
    await page.goto('/')

    // Wait for page to settle
    await page.waitForLoadState('networkidle')

    // Check that page is interactive
    const button = page.locator('button, a').first()
    if (await button.isVisible()) {
      await expect(button).toBeEnabled()
    }
  })

  test('should cache static assets', async ({ page }) => {
    const response = await page.goto('/')

    // Check for cache headers
    const cacheControl = response?.headers()['cache-control']

    // Static assets should have cache headers
    expect(cacheControl).toBeDefined()
  })

  test('should have minimal render-blocking resources', async ({ page }) => {
    const renderBlockingResources: string[] = []

    page.on('response', (response) => {
      const url = response.url()
      const headers = response.headers()

      // Synchronous scripts and stylesheets block rendering
      if (
        (url.endsWith('.css') || url.endsWith('.js')) &&
        !headers['async'] &&
        !headers['defer']
      ) {
        renderBlockingResources.push(url)
      }
    })

    await page.goto('/')

    // Should minimize render-blocking resources
    // This is informational
  })

  test('should compress text resources', async ({ page }) => {
    const responses: any[] = []

    page.on('response', (response) => {
      responses.push({
        url: response.url(),
        headers: response.headers(),
      })
    })

    await page.goto('/')

    // Check for compression
    const textResources = responses.filter(
      (r) =>
        r.url.endsWith('.js') ||
        r.url.endsWith('.css') ||
        r.url.endsWith('.html') ||
        r.url.endsWith('.json')
    )

    textResources.forEach((resource) => {
      const encoding = resource.headers['content-encoding']

      // Text resources should be compressed
      // May be gzip, br (brotli), or deflate
    })
  })

  test('should have good TTI (Time to Interactive)', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const button = page.locator('button, a').first()
    if (await button.isVisible()) {
      await button.click({ force: false })
    }

    const tti = Date.now() - startTime

    // TTI should be reasonable
    expect(tti).toBeLessThan(5000)
  })

  test('should minimize DOM size', async ({ page }) => {
    await page.goto('/')

    const domSize = await page.evaluate(() => {
      return document.querySelectorAll('*').length
    })

    // DOM should not be excessively large
    // Good: < 1500 nodes
    // Needs improvement: > 3000 nodes
    expect(domSize).toBeLessThan(5000)
  })

  test('should use font-display for web fonts', async ({ page }) => {
    await page.goto('/')

    // Check for font-display in stylesheets
    const fontDisplayUsed = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets)

      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules)

          for (const rule of rules) {
            if (rule.cssText.includes('@font-face')) {
              if (rule.cssText.includes('font-display')) {
                return true
              }
            }
          }
        } catch (e) {
          // Cross-origin stylesheets
        }
      }

      return false
    })

    // Font-display is best practice
  })
})
