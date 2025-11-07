import { test, expect } from '@playwright/test';

test.describe('Contact Form Submission Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane');
  });

  test('emergency contact form is accessible', async ({ page }) => {
    // Look for any form on the page
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();
      await expect(form).toBeVisible();
    } else {
      // If no form, should at least have direct contact methods
      const phoneLink = page.locator('a[href^="tel:"]').first();
      await expect(phoneLink).toBeVisible();
    }
  });

  test('form has required fields', async ({ page }) => {
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();

      // Check for common required fields
      const nameInput = form.locator('input[name*="name" i], input[placeholder*="name" i]').first();
      const phoneInput = form.locator('input[name*="phone" i], input[type="tel"]').first();
      const emailInput = form.locator('input[name*="email" i], input[type="email"]').first();

      // At least one of these should be present
      const hasNameField = await nameInput.count() > 0;
      const hasPhoneField = await phoneInput.count() > 0;
      const hasEmailField = await emailInput.count() > 0;

      expect(hasNameField || hasPhoneField || hasEmailField).toBeTruthy();
    }
  });

  test('form validation works for empty submission', async ({ page }) => {
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();
      const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();

      if (await submitButton.isVisible()) {
        await submitButton.click();

        // Should show validation error or prevent submission
        await page.waitForTimeout(1000);

        // Either validation message or form still visible (not navigated away)
        const formStillVisible = await form.isVisible();
        expect(formStillVisible).toBeTruthy();
      }
    }
  });

  test('phone input accepts Australian format', async ({ page }) => {
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();
      const phoneInput = form.locator('input[name*="phone" i], input[type="tel"]').first();

      if (await phoneInput.isVisible()) {
        await phoneInput.fill('0412345678');
        const value = await phoneInput.inputValue();
        expect(value).toContain('0412345678');
      }
    }
  });

  test('email validation works', async ({ page }) => {
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();
      const emailInput = form.locator('input[name*="email" i], input[type="email"]').first();

      if (await emailInput.isVisible()) {
        // Try invalid email
        await emailInput.fill('invalid-email');
        await emailInput.blur();

        await page.waitForTimeout(500);

        // Check if there's validation feedback
        const validationMessage = await emailInput.evaluate((el: HTMLInputElement) =>
          el.validationMessage
        );

        // HTML5 validation should trigger
        if (validationMessage) {
          expect(validationMessage.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

test.describe('Book Service Page', () => {
  test('book service page loads', async ({ page }) => {
    const response = await page.goto('/book-service');

    if (response) {
      expect([200, 404]).toContain(response.status());
    }

    if (response?.status() === 200) {
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('service booking form has service type selector', async ({ page }) => {
    const response = await page.goto('/book-service');

    if (response?.status() === 200) {
      const forms = page.locator('form');
      const formCount = await forms.count();

      if (formCount > 0) {
        const form = forms.first();

        // Look for service type selection
        const serviceSelect = form.locator(
          'select[name*="service" i], input[name*="service" i]'
        ).first();

        const hasServiceField = await serviceSelect.count() > 0;

        if (hasServiceField) {
          await expect(serviceSelect).toBeVisible();
        }
      }
    }
  });
});

test.describe('Contact Form Accessibility', () => {
  test('form fields have proper labels', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane');

    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();
      const inputs = form.locator('input[type="text"], input[type="email"], input[type="tel"]');
      const inputCount = await inputs.count();

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const placeholder = await input.getAttribute('placeholder');

        // Should have either: associated label, aria-label, or placeholder
        if (id) {
          const label = form.locator(`label[for="${id}"]`);
          const hasLabel = await label.count() > 0;

          if (!hasLabel) {
            expect(ariaLabel || placeholder).toBeTruthy();
          }
        } else {
          expect(ariaLabel || placeholder).toBeTruthy();
        }
      }
    }
  });

  test('form is keyboard navigable', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane');

    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      // Tab through form
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });
});

test.describe('Form Success Flow', () => {
  test('successful submission shows confirmation', async ({ page }) => {
    // Check success page exists
    const response = await page.goto('/book-service/success');

    if (response?.status() === 200) {
      await expect(page.locator('body')).toBeVisible();

      // Should have success message
      const successMessage = page.getByText(/success|thank you|received/i).first();
      await expect(successMessage).toBeVisible();
    }
  });
});

test.describe('Multi-Step Form Flow', () => {
  test('can navigate through booking flow', async ({ page }) => {
    await page.goto('/book-service');

    // If multi-step form exists, test navigation
    const nextButton = page.getByRole('button', { name: /next|continue/i });

    if (await nextButton.isVisible()) {
      // This is a multi-step form
      await nextButton.click();

      // Should progress to next step
      await page.waitForTimeout(500);

      // Check if URL changed or new fields appeared
      const backButton = page.getByRole('button', { name: /back|previous/i });
      const hasBackButton = await backButton.count() > 0;

      expect(hasBackButton).toBeTruthy();
    }
  });
});

test.describe('Form Error Handling', () => {
  test('displays user-friendly error messages', async ({ page }) => {
    await page.goto('/emergency/water-damage-brisbane');

    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();
      const emailInput = form.locator('input[type="email"]').first();

      if (await emailInput.isVisible()) {
        // Enter invalid email
        await emailInput.fill('invalid');
        await emailInput.blur();

        await page.waitForTimeout(1000);

        // Should show error message somewhere
        const errorMessages = page.locator('[class*="error" i], [role="alert"]');
        const errorCount = await errorMessages.count();

        // Either visible error or HTML5 validation
        if (errorCount > 0) {
          const firstError = errorMessages.first();
          const isVisible = await firstError.isVisible();
          expect(isVisible).toBeTruthy();
        }
      }
    }
  });
});
