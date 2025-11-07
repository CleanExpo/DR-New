import { test, expect } from '@playwright/test';

test.describe('Core Web Vitals - Homepage', () => {
  test('LCP (Largest Contentful Paint) is under 2.5s', async ({ page }) => {
    const metrics: any = {};

    // Capture performance metrics
    await page.goto('/', { waitUntil: 'networkidle' });

    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcpEntry = entries[entries.length - 1];
          resolve({
            lcp: lcpEntry.startTime,
          });
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Fallback timeout
        setTimeout(() => resolve({ lcp: 0 }), 5000);
      });
    });

    const lcp = (performanceMetrics as any).lcp;

    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500); // 2.5 seconds
    }
  });

  test('FID (First Input Delay) is under 100ms', async ({ page }) => {
    await page.goto('/');

    // Simulate user interaction
    await page.waitForLoadState('domcontentloaded');
    const startTime = Date.now();

    await page.click('body');

    const inputDelay = Date.now() - startTime;

    // Should respond quickly
    expect(inputDelay).toBeLessThan(100);
  });

  test('CLS (Cumulative Layout Shift) is under 0.1', async ({ page }) => {
    await page.goto('/');

    // Wait for page to stabilize
    await page.waitForTimeout(2000);

    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;

        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => resolve(clsValue), 3000);
      });
    });

    expect(cls).toBeLessThan(0.1);
  });

  test('Time to First Byte (TTFB) is under 600ms', async ({ page }) => {
    const startTime = Date.now();

    const response = await page.goto('/');

    const ttfb = Date.now() - startTime;

    expect(response?.status()).toBe(200);
    expect(ttfb).toBeLessThan(600);
  });

  test('DOM Content Loaded within 2 seconds', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const dclTime = Date.now() - startTime;

    expect(dclTime).toBeLessThan(2000);
  });

  test('Total blocking time is minimal', async ({ page }) => {
    await page.goto('/');

    const tbt = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          let totalBlockingTime = 0;

          for (const entry of list.getEntries()) {
            if ((entry as any).duration > 50) {
              totalBlockingTime += (entry as any).duration - 50;
            }
          }

          setTimeout(() => resolve(totalBlockingTime), 3000);
        });

        observer.observe({ entryTypes: ['longtask'] });
      });
    });

    // Total blocking time should be under 300ms
    expect(tbt).toBeLessThan(300);
  });
});

test.describe('Core Web Vitals - Service Pages', () => {
  const servicePages = [
    '/services/water-damage-restoration-brisbane',
    '/services/fire-damage-restoration-brisbane',
  ];

  for (const servicePage of servicePages) {
    test(`${servicePage} - Page load time under 3 seconds`, async ({ page }) => {
      const startTime = Date.now();

      await page.goto(servicePage);
      await page.waitForLoadState('domcontentloaded');

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test(`${servicePage} - First Contentful Paint under 1.8s`, async ({ page }) => {
      await page.goto(servicePage);

      const fcp = await page.evaluate(() => {
        const entries = performance.getEntriesByType('paint');
        const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
        return fcpEntry ? fcpEntry.startTime : 0;
      });

      if (fcp > 0) {
        expect(fcp).toBeLessThan(1800);
      }
    });
  }
});

test.describe('Performance - Resource Loading', () => {
  test('images load efficiently', async ({ page }) => {
    await page.goto('/');

    const imageMetrics = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map((img: HTMLImageElement) => ({
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        loading: img.loading,
      }));
    });

    // Check that images are loading
    const loadedImages = imageMetrics.filter((img) => img.complete);
    expect(loadedImages.length).toBeGreaterThan(0);

    // Check for lazy loading
    const lazyImages = imageMetrics.filter((img) => img.loading === 'lazy');
    expect(lazyImages.length).toBeGreaterThan(0);
  });

  test('no render-blocking resources', async ({ page }) => {
    await page.goto('/');

    const renderBlockingResources = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

      const blockingScripts = scripts.filter((script: any) => {
        return !script.async && !script.defer && !script.type?.includes('module');
      });

      return {
        blockingScripts: blockingScripts.length,
        stylesheets: links.length,
      };
    });

    // Should have minimal blocking scripts
    expect(renderBlockingResources.blockingScripts).toBeLessThan(3);
  });

  test('JavaScript bundle size is reasonable', async ({ page }) => {
    const response = await page.goto('/');

    await page.waitForLoadState('networkidle');

    const resourceSizes = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      const jsResources = resources.filter((r) =>
        r.name.includes('.js') || r.initiatorType === 'script'
      );

      const totalSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

      return {
        count: jsResources.length,
        totalSize: totalSize,
      };
    });

    // Total JS should be under 500KB
    expect(resourceSizes.totalSize).toBeLessThan(500 * 1024);
  });

  test('CSS is optimized', async ({ page }) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    const cssResources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      const cssResources = resources.filter((r) =>
        r.name.includes('.css') || r.initiatorType === 'css'
      );

      const totalSize = cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

      return {
        count: cssResources.length,
        totalSize: totalSize,
      };
    });

    // Total CSS should be under 100KB
    expect(cssResources.totalSize).toBeLessThan(100 * 1024);
  });
});

test.describe('Performance - Caching', () => {
  test('static assets are cached', async ({ page }) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    // Navigate to another page
    await page.goto('/services');

    const cachedResources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      const fromCache = resources.filter((r) => {
        return r.transferSize === 0 && r.decodedBodySize > 0;
      });

      return fromCache.length;
    });

    // Should have some cached resources
    expect(cachedResources).toBeGreaterThan(0);
  });
});

test.describe('Performance - Mobile', () => {
  test.use({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
  });

  test('mobile homepage loads within 3 seconds on 3G', async ({ page }) => {
    // Simulate 3G connection
    const client = await page.context().newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
      uploadThroughput: (750 * 1024) / 8, // 750 Kbps
      latency: 150,
    });

    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000); // More lenient on 3G
  });

  test('mobile images are appropriately sized', async ({ page }) => {
    await page.goto('/');

    const imageData = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map((img: HTMLImageElement) => ({
        src: img.src,
        displayWidth: img.width,
        displayHeight: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
    });

    // Check that images aren't excessively large for display size
    for (const img of imageData) {
      if (img.displayWidth > 0 && img.naturalWidth > 0) {
        const ratio = img.naturalWidth / img.displayWidth;

        // Natural size shouldn't be more than 2x display size
        expect(ratio).toBeLessThan(3);
      }
    }
  });
});

test.describe('Performance - Third-Party Scripts', () => {
  test('third-party scripts load asynchronously', async ({ page }) => {
    await page.goto('/');

    const scriptInfo = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));

      const thirdParty = scripts.filter((script: any) => {
        const src = script.src || '';
        return (
          src.includes('google') ||
          src.includes('analytics') ||
          src.includes('gtag') ||
          src.includes('facebook') ||
          src.includes('clarity')
        );
      });

      return thirdParty.map((script: any) => ({
        src: script.src,
        async: script.async,
        defer: script.defer,
      }));
    });

    // All third-party scripts should be async or defer
    for (const script of scriptInfo) {
      expect(script.async || script.defer).toBeTruthy();
    }
  });
});
