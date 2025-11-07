import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('homepage loads within performance budget', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Should load in under 2 seconds
    expect(loadTime).toBeLessThan(2000);
  });

  test('service page loads quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/services/water-damage-restoration-brisbane');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Should achieve DOMContentLoaded in under 1.5 seconds
    expect(loadTime).toBeLessThan(1500);
  });

  test('images are lazy loaded', async ({ page }) => {
    await page.goto('/');

    // Check that images have loading="lazy" attribute
    const images = await page.locator('img').all();
    let lazyLoadedCount = 0;

    for (const img of images) {
      const loading = await img.getAttribute('loading');
      if (loading === 'lazy') {
        lazyLoadedCount++;
      }
    }

    // Most images should be lazy loaded (except critical ones)
    expect(lazyLoadedCount).toBeGreaterThan(0);
  });

  test('Core Web Vitals - LCP', async ({ page }) => {
    await page.goto('/');

    // Measure Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Timeout after 5 seconds
        setTimeout(() => resolve(0), 5000);
      });
    });

    // LCP should be under 2.5 seconds for good performance
    expect(Number(lcp)).toBeLessThan(2500);
  });

  test('Core Web Vitals - CLS', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Measure Cumulative Layout Shift
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsScore = 0;

        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsScore += (entry as any).value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => resolve(clsScore), 3000);
      });
    });

    // CLS should be under 0.1 for good performance
    expect(Number(cls)).toBeLessThan(0.1);
  });

  test('page size is optimized', async ({ page }) => {
    const response = await page.goto('/');
    const resourceSizes = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      return resources.reduce((total: number, resource: any) => {
        return total + (resource.transferSize || 0);
      }, 0);
    });

    // Total page size should be under 2MB
    expect(resourceSizes).toBeLessThan(2 * 1024 * 1024);
  });

  test('JavaScript execution time is acceptable', async ({ page }) => {
    await page.goto('/');

    const scriptDuration = await page.evaluate(() => {
      const scripts = performance.getEntriesByType('resource').filter(
        (r: any) => r.initiatorType === 'script'
      );
      return scripts.reduce((total: number, script: any) => {
        return total + script.duration;
      }, 0);
    });

    // JavaScript execution should be under 1 second
    expect(scriptDuration).toBeLessThan(1000);
  });

  test('CSS is optimized and loads quickly', async ({ page }) => {
    await page.goto('/');

    const cssDuration = await page.evaluate(() => {
      const styles = performance.getEntriesByType('resource').filter(
        (r: any) => r.initiatorType === 'link' && r.name.includes('.css')
      );
      return styles.reduce((total: number, style: any) => {
        return total + style.duration;
      }, 0);
    });

    // CSS should load quickly
    expect(cssDuration).toBeLessThan(500);
  });

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(consoleErrors.length).toBe(0);
  });

  test('emergency contact loads immediately', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');

    // Emergency CTA should be visible within 500ms
    const emergencyCTA = page.getByText(/24\/7/i).first();
    await emergencyCTA.waitFor({ timeout: 500 });

    const timeToVisible = Date.now() - startTime;
    expect(timeToVisible).toBeLessThan(500);
  });
});
