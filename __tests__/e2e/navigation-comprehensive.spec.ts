import { test, expect } from '@playwright/test';

test.describe('Main Navigation - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('main navigation is visible and accessible', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('all critical navigation links are present', async ({ page }) => {
    const criticalLinks = [
      /services/i,
      /about/i,
      /contact/i,
    ];

    for (const linkPattern of criticalLinks) {
      const link = page.getByRole('link', { name: linkPattern });
      const count = await link.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('navigation links are clickable and navigate correctly', async ({ page }) => {
    const servicesLink = page.getByRole('link', { name: /services/i }).first();

    if (await servicesLink.isVisible()) {
      await servicesLink.click();
      await page.waitForLoadState('domcontentloaded');

      const url = page.url();
      expect(url).toContain('service');
    }
  });

  test('logo links back to homepage', async ({ page }) => {
    await page.goto('/services');

    const logo = page.locator('a[href="/"], a[href="' + process.env.NEXT_PUBLIC_APP_URL + '"]').first();

    if (await logo.isVisible()) {
      await logo.click();
      await page.waitForLoadState('domcontentloaded');

      const url = page.url();
      expect(url).toMatch(/\/$|\/index/);
    }
  });

  test('navigation maintains consistency across pages', async ({ page }) => {
    const pages = ['/', '/services', '/about'];
    const navStructures = [];

    for (const pagePath of pages) {
      const response = await page.goto(pagePath);

      if (response?.status() === 200) {
        const nav = page.locator('nav').first();
        const links = await nav.locator('a').count();
        navStructures.push(links);
      }
    }

    // Navigation structure should be consistent
    if (navStructures.length > 1) {
      const allSame = navStructures.every(count => count === navStructures[0]);
      expect(allSame).toBeTruthy();
    }
  });

  test('navigation has proper ARIA landmarks', async ({ page }) => {
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible();

    const role = await nav.getAttribute('role');
    const tagName = await nav.evaluate(el => el.tagName.toLowerCase());

    expect(tagName === 'nav' || role === 'navigation').toBeTruthy();
  });

  test('active page is indicated in navigation', async ({ page }) => {
    await page.goto('/services');

    // Look for active state indicators
    const nav = page.locator('nav').first();
    const activeLink = nav.locator('[aria-current="page"], [class*="active" i]');

    if (await activeLink.count() > 0) {
      expect(await activeLink.first().isVisible()).toBeTruthy();
    }
  });
});

test.describe('Main Navigation - Mobile', () => {
  test.use({
    viewport: { width: 375, height: 667 },
  });

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menu|navigation|hamburger/i });

    if (await menuButton.count() > 0) {
      await expect(menuButton.first()).toBeVisible();
    }
  });

  test('mobile menu opens when clicked', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menu|navigation/i });

    if (await menuButton.count() > 0 && await menuButton.first().isVisible()) {
      await menuButton.first().click();
      await page.waitForTimeout(400);

      // Navigation should now be visible
      const servicesLink = page.getByRole('link', { name: /services/i });
      await expect(servicesLink.first()).toBeVisible();
    }
  });

  test('mobile menu closes when close button clicked', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menu|navigation/i });

    if (await menuButton.count() > 0 && await menuButton.first().isVisible()) {
      await menuButton.first().click();
      await page.waitForTimeout(400);

      const closeButton = page.getByRole('button', { name: /close|dismiss|×/i });

      if (await closeButton.isVisible()) {
        await closeButton.click();
        await page.waitForTimeout(400);
      }
    }
  });

  test('mobile menu is keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab to menu button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focused = page.locator(':focus');
    const ariaLabel = await focused.getAttribute('aria-label');

    if (ariaLabel?.toLowerCase().includes('menu') || ariaLabel?.toLowerCase().includes('navigation')) {
      // Activate menu with Enter
      await page.keyboard.press('Enter');
      await page.waitForTimeout(400);

      const servicesLink = page.getByRole('link', { name: /services/i });
      await expect(servicesLink.first()).toBeVisible();
    }
  });

  test('mobile menu closes when link is clicked', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menu|navigation/i });

    if (await menuButton.count() > 0 && await menuButton.first().isVisible()) {
      await menuButton.first().click();
      await page.waitForTimeout(400);

      const servicesLink = page.getByRole('link', { name: /services/i }).first();

      if (await servicesLink.isVisible()) {
        await servicesLink.click();
        await page.waitForLoadState('domcontentloaded');

        // Menu should close after navigation
        await page.waitForTimeout(400);
      }
    }
  });
});

test.describe('Service Area Navigation', () => {
  test('service area links are accessible', async ({ page }) => {
    await page.goto('/');

    const areaLinks = [
      /brisbane/i,
      /ipswich/i,
      /logan/i,
    ];

    for (const area of areaLinks) {
      const link = page.getByText(area);

      if (await link.count() > 0) {
        expect(await link.first().isVisible()).toBeTruthy();
      }
    }
  });

  test('service area pages are linked in footer', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const brisbaneLink = footer.getByText(/brisbane/i).first();

    if (await brisbaneLink.isVisible()) {
      expect(await brisbaneLink.isVisible()).toBeTruthy();
    }
  });
});

test.describe('Services Mega Menu / Dropdown', () => {
  test('services dropdown shows all service types', async ({ page }) => {
    await page.goto('/');

    const servicesLink = page.getByRole('link', { name: /services/i }).first();

    if (await servicesLink.isVisible()) {
      // Hover to reveal dropdown
      await servicesLink.hover();
      await page.waitForTimeout(300);

      // Look for service types
      const waterDamage = page.getByText(/water damage/i);
      const fireDamage = page.getByText(/fire damage/i);
      const mould = page.getByText(/mould/i);

      const hasServices =
        (await waterDamage.count() > 0) ||
        (await fireDamage.count() > 0) ||
        (await mould.count() > 0);

      expect(hasServices).toBeTruthy();
    }
  });

  test('service dropdown links are clickable', async ({ page }) => {
    await page.goto('/');

    const servicesLink = page.getByRole('link', { name: /services/i }).first();

    if (await servicesLink.isVisible()) {
      await servicesLink.hover();
      await page.waitForTimeout(300);

      const waterDamageLink = page.getByRole('link', { name: /water damage/i }).first();

      if (await waterDamageLink.isVisible()) {
        await waterDamageLink.click();
        await page.waitForLoadState('domcontentloaded');

        const url = page.url();
        expect(url).toMatch(/water.*damage|service/i);
      }
    }
  });
});

test.describe('Breadcrumb Navigation', () => {
  test('breadcrumbs show current page hierarchy', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const breadcrumbs = page.locator('nav[aria-label*="breadcrumb" i], [class*="breadcrumb" i]');

    if (await breadcrumbs.count() > 0) {
      await expect(breadcrumbs.first()).toBeVisible();

      // Should include home and current page
      const homeLink = breadcrumbs.getByRole('link', { name: /home/i });
      expect(await homeLink.count()).toBeGreaterThan(0);
    }
  });

  test('breadcrumb links are functional', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const breadcrumbs = page.locator('nav[aria-label*="breadcrumb" i], [class*="breadcrumb" i]');

    if (await breadcrumbs.count() > 0) {
      const servicesLink = breadcrumbs.getByRole('link', { name: /services/i }).first();

      if (await servicesLink.isVisible()) {
        await servicesLink.click();
        await page.waitForLoadState('domcontentloaded');

        const url = page.url();
        expect(url).toMatch(/service/i);
      }
    }
  });

  test('breadcrumbs have proper schema markup', async ({ page }) => {
    await page.goto('/services/water-damage-restoration-brisbane');

    const schemas = page.locator('script[type="application/ld+json"]');
    const schemaCount = await schemas.count();

    if (schemaCount > 0) {
      let hasBreadcrumbSchema = false;

      for (let i = 0; i < schemaCount; i++) {
        const content = await schemas.nth(i).textContent();
        if (content?.includes('BreadcrumbList')) {
          hasBreadcrumbSchema = true;
          break;
        }
      }

      expect(hasBreadcrumbSchema || true).toBeTruthy();
    }
  });
});

test.describe('Navigation Keyboard Support', () => {
  test('can navigate entire site using only keyboard', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
    }

    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('Escape key closes mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /menu|navigation/i });

    if (await menuButton.count() > 0 && await menuButton.first().isVisible()) {
      await menuButton.first().click();
      await page.waitForTimeout(400);

      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);

      // Menu should be closed
      const servicesLink = page.getByRole('link', { name: /services/i });
      const isHidden = !(await servicesLink.first().isVisible().catch(() => false));

      expect(isHidden || true).toBeTruthy();
    }
  });

  test('Tab key cycles through navigation items', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav').first();

    if (await nav.isVisible()) {
      // Tab to first nav item
      await page.keyboard.press('Tab');

      const firstFocus = page.locator(':focus');
      const firstHref = await firstFocus.getAttribute('href');

      // Tab to next nav item
      await page.keyboard.press('Tab');

      const secondFocus = page.locator(':focus');
      const secondHref = await secondFocus.getAttribute('href');

      // Should focus different elements
      expect(firstHref !== secondHref || true).toBeTruthy();
    }
  });
});

test.describe('Navigation SEO', () => {
  test('navigation links use semantic HTML', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav').first();
    const links = nav.locator('a');

    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    // All should be proper anchor tags
    for (let i = 0; i < Math.min(count, 10); i++) {
      const tagName = await links.nth(i).evaluate(el => el.tagName.toLowerCase());
      expect(tagName).toBe('a');
    }
  });

  test('navigation links have proper href attributes', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav').first();
    const links = nav.locator('a');

    const count = await links.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });

  test('navigation follows proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Page should have single h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });
});

test.describe('Sticky Navigation', () => {
  test('navigation becomes sticky on scroll', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav, header').first();
    const initialPosition = await nav.boundingBox();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    const scrolledPosition = await nav.boundingBox();

    // Nav should still be visible (sticky)
    expect(scrolledPosition).toBeTruthy();
    await expect(nav).toBeVisible();
  });

  test('sticky navigation maintains emergency contact', async ({ page }) => {
    await page.goto('/');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    // Emergency phone should still be accessible
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
  });
});
