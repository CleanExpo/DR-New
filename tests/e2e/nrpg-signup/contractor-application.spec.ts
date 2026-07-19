/**
 * E2E: NRPG contractor signup entry (DR-905 rewrite).
 *
 * The previous version of this file scripted a fictional US-market
 * application form (New York addresses, ZIP codes, license/insurance
 * sections, `if (visible)`-guarded assertions) that does not exist in the
 * app and was never executed by any CI workflow — it passed only because it
 * asserted nothing real.
 *
 * The canonical, CI-blocking contractor journey now lives in
 * `apps/web/e2e/contractor-go-live.spec.ts` (the `golive-proof` Playwright
 * project — retries: 0, DB-truth assertions, zero-residual teardown).
 *
 * This file keeps the root-harness (`playwright.config.ts` at repo root,
 * BASE_URL-driven) coverage honest: it asserts the REAL signup surface the
 * app actually serves, with exact expected outcomes and no conditional
 * assertions.
 */

import { test, expect } from '@playwright/test';

test.describe('NRPG contractor signup entry', () => {
  test('signup?type=contractor renders the real account form', async ({ page }) => {
    await page.goto('/signup?type=contractor');

    // The actual form (app/signup/page.tsx): name/email/password/confirm + consent.
    await expect(page.locator('#name')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#confirmPassword')).toBeVisible();
    await expect(page.locator('#terms')).toBeAttached();
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('mismatched passwords are rejected client-side without submitting', async ({
    page,
  }) => {
    await page.goto('/signup?type=contractor');

    await page.fill('#name', 'Mismatch Check');
    await page.fill('#email', 'mismatch-check@nrpg-e2e.test');
    await page.fill('#password', ['Example', 'Only', '2026!'].join('-'));
    await page.fill('#confirmPassword', 'Different-Pass-2026');
    await page.check('#terms');
    await page.locator('button[type="submit"]').click();

    // Exact client-side validation message from app/signup/page.tsx.
    await expect(page.getByText('Passwords do not match')).toBeVisible({ timeout: 10_000 });
    // No navigation happened — the form did not submit.
    await expect(page).toHaveURL(/\/signup/);
  });

  test('missing consent is rejected client-side', async ({ page }) => {
    await page.goto('/signup?type=contractor');

    await page.fill('#name', 'Consent Check');
    await page.fill('#email', 'consent-check@nrpg-e2e.test');
    await page.fill('#password', ['Example', 'Only', '2026!'].join('-'));
    await page.fill('#confirmPassword', ['Example', 'Only', '2026!'].join('-'));
    // #terms deliberately left unchecked.
    await page.locator('button[type="submit"]').click();

    await expect(
      page.getByText('You must accept the Terms of Service and Privacy Policy to continue')
    ).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/signup/);
  });
});
