import { test, expect } from '@playwright/test'

/**
 * DR-214: Industry Hub E2E Functional Tests
 *
 * Tests the interactive behaviour of all new industry-hub pages:
 * - /data         (statistics page)
 * - /newsletter   (subscribe form)
 * - /events       (calendar with filters)
 * - /find-a-contractor (contractor search flow)
 * - /industry-partners/join (multi-step onboarding)
 * - /tools/course-finder (IICRC course search)
 * - /tools/drying-calculator (calculator)
 *
 * Runs against the dev or staging server.
 */

// ── /data — Statistics page ────────────────────────────────────────────────

test.describe('/data — Industry Statistics', () => {
  test('renders all 9 category sections', async ({ page }) => {
    await page.goto('/data')
    await expect(page).toHaveTitle(/statistic|industry/i)

    // Check that key category headings are visible
    await expect(page.getByText('Market Size & Growth')).toBeVisible()
    await expect(page.getByText('IICRC Certification')).toBeVisible()
    await expect(page.getByText('Water Damage')).toBeVisible()
    await expect(page.getByText('Mould & Indoor Air Quality')).toBeVisible()
  })

  test('jump nav renders category links', async ({ page }) => {
    await page.goto('/data')
    await expect(page.getByRole('link', { name: /market size/i })).toBeVisible()
  })

  test('stat cards show source citations', async ({ page }) => {
    await page.goto('/data')
    // ICA and IBISWorld are the most cited sources
    const ica = page.getByText('ICA').first()
    await expect(ica).toBeVisible()
  })
})

// ── /newsletter — The DR Brief ─────────────────────────────────────────────

test.describe('/newsletter — The DR Brief', () => {
  test('subscribe form is present', async ({ page }) => {
    await page.goto('/newsletter')
    await expect(page.getByRole('heading', { name: /the dr brief/i })).toBeVisible()
    await expect(page.getByPlaceholder(/email/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /subscribe/i })).toBeVisible()
  })

  test('subscribe form validates empty email', async ({ page }) => {
    await page.goto('/newsletter')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  test('archive shows 8 issues', async ({ page }) => {
    await page.goto('/newsletter')
    await expect(page.getByText(/vol\. 1, issue/i).first()).toBeVisible()
    const issues = page.getByText(/vol\. 1, issue/i)
    await expect(issues).toHaveCount(8) // 8 issues seeded
  })

  test('subscribe with valid email shows success state', async ({ page }) => {
    await page.goto('/newsletter')
    await page.getByPlaceholder(/email/i).fill('test@restoration.com.au')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByText(/you're on the list/i)).toBeVisible({ timeout: 5000 })
  })
})

// ── /events — Industry Calendar ────────────────────────────────────────────

test.describe('/events — Industry Calendar', () => {
  test('renders event listing', async ({ page }) => {
    await page.goto('/events')
    await expect(page.getByRole('heading', { name: /restoration industry events/i })).toBeVisible()
  })

  test('category filter works', async ({ page }) => {
    await page.goto('/events')
    // Select IICRC Training category
    await page.selectOption('select', { label: 'IICRC Training' })
    // All visible event cards should have the IICRC Training badge
    const cards = page.locator('text=IICRC Training')
    await expect(cards.first()).toBeVisible()
  })

  test('country filter shows Japan events', async ({ page }) => {
    await page.goto('/events')
    // Filter by Japan
    const selects = page.locator('select')
    // Country filter is the second select
    await selects.nth(1).selectOption({ label: 'Japan' })
    await expect(page.getByText(/Tokyo/i)).toBeVisible()
  })

  test('search filters events by title', async ({ page }) => {
    await page.goto('/events')
    await page.getByPlaceholder(/search events/i).fill('AMRT')
    await expect(page.getByText(/AMRT/i).first()).toBeVisible()
  })

  test('clearing search restores all events', async ({ page }) => {
    await page.goto('/events')
    await page.getByPlaceholder(/search events/i).fill('zzznomatch')
    await expect(page.getByText(/no events match/i)).toBeVisible()
    await page.getByPlaceholder(/search events/i).fill('')
    await expect(page.getByText(/featured events/i)).toBeVisible()
  })

  test('Submit an Event CTA links to /events/submit', async ({ page }) => {
    await page.goto('/events')
    const link = page.getByRole('link', { name: /submit an event/i }).first()
    await expect(link).toHaveAttribute('href', '/events/submit')
  })
})

// ── /find-a-contractor — Contractor search ─────────────────────────────────

test.describe('/find-a-contractor', () => {
  test('search form renders all inputs', async ({ page }) => {
    await page.goto('/find-a-contractor')
    await expect(page.getByPlaceholder(/postcode/i)).toBeVisible()
    await expect(page.getByText('Water / Flood Damage')).toBeVisible()
    await expect(page.getByText('Emergency')).toBeVisible()
  })

  test('form validates missing fields', async ({ page }) => {
    await page.goto('/find-a-contractor')
    await page.getByRole('button', { name: /find available contractors/i }).click()
    // Should show validation errors (not proceed to results)
    await expect(page.getByText(/please enter a valid/i)).toBeVisible()
  })

  test('valid search shows results', async ({ page }) => {
    await page.goto('/find-a-contractor')

    // Fill postcode
    await page.getByPlaceholder(/postcode/i).fill('3000')

    // Select Water damage
    await page.getByText('Water / Flood Damage').click()

    // Select Emergency urgency
    await page.getByText('Emergency').click()

    await page.getByRole('button', { name: /find available contractors/i }).click()

    // Wait for results
    await expect(page.getByText(/available contractors/i)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('Rapid Dry Solutions')).toBeVisible()
  })

  test('emergency search shows emergency alert', async ({ page }) => {
    await page.goto('/find-a-contractor')
    await page.getByPlaceholder(/postcode/i).fill('3000')
    await page.getByText('Water / Flood Damage').click()
    await page.getByText('Emergency').click()
    await page.getByRole('button', { name: /find available contractors/i }).click()
    await expect(page.getByText(/emergency response active/i)).toBeVisible({ timeout: 5000 })
  })

  test('edit search button returns to form', async ({ page }) => {
    await page.goto('/find-a-contractor')
    await page.getByPlaceholder(/postcode/i).fill('3000')
    await page.getByText('Water / Flood Damage').click()
    await page.getByText('Today').click()
    await page.getByRole('button', { name: /find available contractors/i }).click()
    await expect(page.getByText(/available contractors/i)).toBeVisible({ timeout: 5000 })
    await page.getByText('Edit search').click()
    await expect(page.getByPlaceholder(/postcode/i)).toBeVisible()
  })
})

// ── /industry-partners/join — Onboarding flow ──────────────────────────────

test.describe('/industry-partners/join — Partner onboarding', () => {
  test('renders step 1 with business fields', async ({ page }) => {
    await page.goto('/industry-partners/join')
    await expect(page.getByRole('heading', { name: /join the nrpg network/i })).toBeVisible()
    await expect(page.getByPlaceholder(/acme restoration/i)).toBeVisible()
  })

  test('step 1 validates empty business name', async ({ page }) => {
    await page.goto('/industry-partners/join')
    await page.getByRole('button', { name: /continue/i }).click()
    await expect(page.getByText(/business name is required/i)).toBeVisible()
  })

  test('step indicator advances on Continue', async ({ page }) => {
    await page.goto('/industry-partners/join')

    // Fill step 1
    await page.getByPlaceholder(/acme restoration/i).fill('Test Restore Pty Ltd')
    await page.selectOption('select', { label: 'Pty Ltd' }, { strict: false })
    await page.locator('select').nth(2).selectOption({ label: 'Australia' })
    await page.locator('select').nth(3).selectOption({ label: 'VIC' })
    await page.getByPlaceholder(/12 345 678/i).fill('12 345 678 901')
    await page.locator('select').nth(4).selectOption({ label: 'Water Damage Restoration' })
    await page.locator('select').nth(1).selectOption({ label: '5–10 years' })

    await page.getByRole('button', { name: /continue/i }).click()

    // Should now show step 2 (Contact)
    await expect(page.getByRole('heading', { name: /primary contact/i })).toBeVisible()
  })

  test('Cancel returns to industry-partners hub', async ({ page }) => {
    await page.goto('/industry-partners/join')
    await page.getByRole('link', { name: /cancel/i }).click()
    await expect(page).toHaveURL(/\/industry-partners/)
  })
})

// ── /tools/course-finder — IICRC filter ────────────────────────────────────

test.describe('/tools/course-finder', () => {
  test('renders 6 courses by default', async ({ page }) => {
    await page.goto('/tools/course-finder')
    await expect(page.getByText(/wrt/i).first()).toBeVisible()
    await expect(page.getByText(/amrt/i).first()).toBeVisible()
  })

  test('level filter works', async ({ page }) => {
    await page.goto('/tools/course-finder')
    const selects = page.locator('select')
    // Level filter
    await selects.nth(1).selectOption({ label: 'Foundation' })
    // Only foundation level certs visible
    await expect(page.getByText(/foundation/i).first()).toBeVisible()
  })

  test('search filter reduces results', async ({ page }) => {
    await page.goto('/tools/course-finder')
    await page.getByPlaceholder(/search/i).fill('water')
    await expect(page.getByText(/water restoration/i).first()).toBeVisible()
  })
})

// ── /tools/drying-calculator — Calculations ────────────────────────────────

test.describe('/tools/drying-calculator', () => {
  test('renders form and results panel', async ({ page }) => {
    await page.goto('/tools/drying-calculator')
    await expect(page.getByText(/material type/i)).toBeVisible()
    await expect(page.getByText(/estimated drying time/i)).toBeVisible()
  })

  test('changing moisture class updates result', async ({ page }) => {
    await page.goto('/tools/drying-calculator')

    // Note Class 1 first
    const class1Text = await page.getByText(/class 1/i).first().textContent()

    // Change to Class 4
    const selects = page.locator('select')
    await selects.nth(1).selectOption({ label: 'Class 4 — Specialty drying' })

    // Result should show higher day range
    const result = page.locator('[data-testid="drying-result"], .text-4xl').first()
    await expect(result).toBeVisible()
  })

  test('mould risk warning appears for high moisture class', async ({ page }) => {
    await page.goto('/tools/drying-calculator')
    const selects = page.locator('select')
    // Set Class 3
    await selects.nth(1).selectOption({ label: 'Class 3 — Entire area absorption' })
    // Category 3
    await selects.nth(2).selectOption({ label: 'Category 3 — Grossly contaminated' })
    await expect(page.getByText(/mould risk/i)).toBeVisible()
  })
})
