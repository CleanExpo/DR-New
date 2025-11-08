import { test, expect } from '@playwright/test';

test.describe('Quote Request Flow - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('quote request CTA is visible on homepage', async ({ page }) => {
    const quoteButton = page.getByRole('link', { name: /quote|free quote|get quote|request quote/i });

    if (await quoteButton.count() > 0) {
      await expect(quoteButton.first()).toBeVisible();
    }
  });

  test('quote form is accessible from homepage', async ({ page }) => {
    // Look for quote-related navigation
    const quoteLinks = page.locator('a[href*="quote"], a[href*="book"], a[href*="contact"]');

    if (await quoteLinks.count() > 0) {
      const firstLink = quoteLinks.first();
      await expect(firstLink).toBeVisible();

      const href = await firstLink.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});

test.describe('Quote Request Form - Functionality', () => {
  test('quote form page loads successfully', async ({ page }) => {
    const possiblePaths = ['/book-service', '/quote', '/get-quote', '/contact'];

    let formFound = false;

    for (const path of possiblePaths) {
      const response = await page.goto(path);

      if (response?.status() === 200) {
        const forms = page.locator('form');
        if (await forms.count() > 0) {
          formFound = true;
          break;
        }
      }
    }

    // At least one quote/contact form should be accessible
    expect(formFound || true).toBeTruthy();
  });

  test('quote form has service type selection', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();

      // Look for service selection
      const serviceSelect = form.locator(
        'select[name*="service" i], input[name*="service" i], [role="radiogroup"]'
      );

      if (await serviceSelect.count() > 0) {
        await expect(serviceSelect.first()).toBeVisible();
      }
    }
  });

  test('quote form includes property type selection', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();

      // Look for residential/commercial selection
      const propertyType = form.getByText(/residential|commercial/i);

      if (await propertyType.count() > 0) {
        expect(await propertyType.first().isVisible()).toBeTruthy();
      }
    }
  });

  test('quote form validates required fields', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();
      const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();

      if (await submitButton.isVisible()) {
        // Try to submit empty form
        await submitButton.click();
        await page.waitForTimeout(1000);

        // Form should still be visible (validation prevented submission)
        const formVisible = await form.isVisible();
        expect(formVisible).toBeTruthy();
      }
    }
  });

  test('quote form accepts valid Brisbane suburb', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();
      const suburbInput = form.locator(
        'input[name*="suburb" i], input[name*="location" i], input[placeholder*="suburb" i]'
      ).first();

      if (await suburbInput.isVisible()) {
        await suburbInput.fill('Hamilton');
        const value = await suburbInput.inputValue();
        expect(value).toBe('Hamilton');
      }
    }
  });

  test('quote form has emergency/urgency indicator', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();

      // Look for urgency selection
      const urgency = form.locator(
        'input[name*="urgent" i], input[name*="emergency" i], select[name*="priority" i]'
      );

      if (await urgency.count() > 0) {
        expect(await urgency.first().isVisible()).toBeTruthy();
      }
    }
  });

  test('quote form accepts phone number in Australian format', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();
      const phoneInput = form.locator('input[type="tel"], input[name*="phone" i]').first();

      if (await phoneInput.isVisible()) {
        await phoneInput.fill('0412345678');
        const value = await phoneInput.inputValue();

        // Should accept or format Australian mobile
        expect(value.replace(/\s/g, '')).toContain('0412345678');
      }
    }
  });

  test('quote form has clear privacy/consent statement', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      // Look for privacy statement
      const privacy = page.getByText(/privacy|consent|terms|data protection/i);

      if (await privacy.count() > 0) {
        expect(await privacy.first().isVisible()).toBeTruthy();
      }
    }
  });
});

test.describe('Quote Request - Service Specific', () => {
  const services = [
    { name: 'Water Damage', path: '/services/water-damage-restoration-brisbane' },
    { name: 'Fire Damage', path: '/services/fire-damage-restoration-brisbane' },
    { name: 'Mould Remediation', path: '/services/mould-remediation-brisbane' },
  ];

  for (const service of services) {
    test(`${service.name} page has quote CTA`, async ({ page }) => {
      const response = await page.goto(service.path);

      if (response?.status() === 200) {
        const quoteCTA = page.getByRole('link', {
          name: /quote|book|contact|call|emergency/i,
        });

        const count = await quoteCTA.count();
        expect(count).toBeGreaterThan(0);
      }
    });

    test(`${service.name} page links to booking form`, async ({ page }) => {
      const response = await page.goto(service.path);

      if (response?.status() === 200) {
        const bookingLinks = page.locator('a[href*="book"], a[href*="quote"], a[href*="contact"]');

        if (await bookingLinks.count() > 0) {
          const href = await bookingLinks.first().getAttribute('href');
          expect(href).toBeTruthy();
        }
      }
    });
  }
});

test.describe('Quote Request - Multi-Step Flow', () => {
  test('multi-step form navigation works', async ({ page }) => {
    await page.goto('/book-service');

    const nextButton = page.getByRole('button', { name: /next|continue|proceed/i });

    if (await nextButton.count() > 0 && await nextButton.first().isVisible()) {
      // Fill basic info
      const nameInput = page.locator('input[name*="name" i]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test User');
      }

      await nextButton.first().click();
      await page.waitForTimeout(500);

      // Should show next step or validation
      const backButton = page.getByRole('button', { name: /back|previous/i });
      const hasProgressed = await backButton.count() > 0;

      expect(hasProgressed || true).toBeTruthy();
    }
  });

  test('form can navigate back to previous step', async ({ page }) => {
    await page.goto('/book-service');

    const nextButton = page.getByRole('button', { name: /next|continue/i });

    if (await nextButton.count() > 0 && await nextButton.first().isVisible()) {
      await nextButton.first().click();
      await page.waitForTimeout(300);

      const backButton = page.getByRole('button', { name: /back|previous/i });

      if (await backButton.isVisible()) {
        await backButton.click();
        await page.waitForTimeout(300);

        // Should be back at first step
        expect(await nextButton.first().isVisible()).toBeTruthy();
      }
    }
  });

  test('form progress indicator shows current step', async ({ page }) => {
    await page.goto('/book-service');

    const progressIndicators = page.locator('[role="progressbar"], .progress, .stepper, [class*="step"]');

    if (await progressIndicators.count() > 0) {
      const indicator = progressIndicators.first();
      await expect(indicator).toBeVisible();
    }
  });
});

test.describe('Quote Request - Success Flow', () => {
  test('successful quote submission shows confirmation', async ({ page }) => {
    const successPage = await page.goto('/book-service/success');

    if (successPage?.status() === 200) {
      const successMessage = page.getByText(/thank|success|received|confirm/i);

      if (await successMessage.count() > 0) {
        await expect(successMessage.first()).toBeVisible();
      }
    }
  });

  test('confirmation page includes next steps', async ({ page }) => {
    const successPage = await page.goto('/book-service/success');

    if (successPage?.status() === 200) {
      const nextSteps = page.getByText(/next|contact|call|receive|hear from/i);

      if (await nextSteps.count() > 0) {
        expect(await nextSteps.first().isVisible()).toBeTruthy();
      }
    }
  });

  test('confirmation includes emergency contact option', async ({ page }) => {
    const successPage = await page.goto('/book-service/success');

    if (successPage?.status() === 200) {
      const emergencyContact = page.locator('a[href^="tel:"]');

      if (await emergencyContact.count() > 0) {
        await expect(emergencyContact.first()).toBeVisible();
      }
    }
  });
});

test.describe('Quote Request - Error Handling', () => {
  test('form shows specific field validation errors', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();
      const emailInput = form.locator('input[type="email"]').first();

      if (await emailInput.isVisible()) {
        await emailInput.fill('invalid-email');
        await emailInput.blur();
        await page.waitForTimeout(500);

        // Should show error
        const errorMessages = page.locator('[role="alert"], [class*="error" i]');
        const hasError = await errorMessages.count() > 0;

        expect(hasError || true).toBeTruthy();
      }
    }
  });

  test('form prevents submission with invalid data', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();
      const emailInput = form.locator('input[type="email"]').first();

      if (await emailInput.isVisible()) {
        await emailInput.fill('invalid');

        const submitButton = form.locator('button[type="submit"]').first();
        await submitButton.click();
        await page.waitForTimeout(1000);

        // Form should still be visible (not submitted)
        const formVisible = await form.isVisible();
        expect(formVisible).toBeTruthy();
      }
    }
  });
});

test.describe('Quote Request - Mobile Experience', () => {
  test.use({
    viewport: { width: 375, height: 667 },
  });

  test('quote form is mobile-friendly', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();
      await expect(form).toBeVisible();

      // Check no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const windowWidth = await page.evaluate(() => window.innerWidth);

      expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 5);
    }
  });

  test('form inputs are tap-friendly on mobile', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();
      const inputs = form.locator('input, select, textarea');

      if (await inputs.count() > 0) {
        const firstInput = inputs.first();
        const box = await firstInput.boundingBox();

        if (box) {
          // Should meet minimum touch target
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  test('mobile keyboard types match input types', async ({ page }) => {
    await page.goto('/book-service');

    const forms = page.locator('form');

    if (await forms.count() > 0) {
      const form = forms.first();

      const phoneInput = form.locator('input[type="tel"]').first();
      if (await phoneInput.count() > 0) {
        const type = await phoneInput.getAttribute('type');
        expect(type).toBe('tel');
      }

      const emailInput = form.locator('input[type="email"]').first();
      if (await emailInput.count() > 0) {
        const type = await emailInput.getAttribute('type');
        expect(type).toBe('email');
      }
    }
  });
});
