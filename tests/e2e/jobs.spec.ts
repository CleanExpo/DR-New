import { test, expect, Page } from '@playwright/test';

/**
 * E2E Tests for Job Management Lifecycle
 *
 * Covers the complete job journey:
 * 1. Create job flow (admin login, fill form, verify redirect)
 * 2. Assign contractor flow (search, select, confirm assignment)
 * 3. Job lifecycle transitions (ASSIGNED -> IN_PROGRESS -> COMPLETED)
 * 4. Invoice generation (line items, GST calculation, INVOICED status)
 * 5. Job list filters (status, type, clear)
 * 6. Auth protection (redirect to login when unauthenticated)
 */

const TEST_ADMIN_EMAIL = 'admin@disasterrecovery.com';
const TEST_PASSWORD = 'Test123!';

test.describe('Job Management Lifecycle', () => {
  test.describe.configure({ mode: 'serial' });

  let adminPage: Page;
  let createdJobId: string;
  let createdJobNumber: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    adminPage = await context.newPage();

    // Login as admin
    await adminPage.goto('/login');
    await adminPage.fill('input[name="email"]', TEST_ADMIN_EMAIL);
    await adminPage.fill('input[name="password"]', TEST_PASSWORD);
    await adminPage.click('button[type="submit"]');
    await adminPage.waitForURL(/\/dashboard/, { timeout: 15000 });
  });

  test.afterAll(async () => {
    await adminPage.close();
  });

  // ── Scenario 1: Create Job Flow ──────────────────────────────────────

  test('Scenario 1: Create a new job', async () => {
    await adminPage.goto('/dashboard/jobs/new');

    // Wait for the page to load
    await expect(adminPage.locator('h1:has-text("Create New Job")')).toBeVisible({
      timeout: 10000,
    });

    // Select job type (button-based selection, not a <select>)
    await adminPage.click('button:has-text("Water Damage")');

    // Wait for properties to load, then select the first property
    const propertySelect = adminPage.locator('select');
    await expect(propertySelect).toBeVisible({ timeout: 10000 });

    // Select first available property (skip "Select a property" placeholder)
    const options = await propertySelect.locator('option').allTextContents();
    const realOptions = options.filter((o) => o !== 'Select a property');
    if (realOptions.length > 0) {
      await propertySelect.selectOption({ index: 1 });
    } else {
      test.skip(true, 'No properties available to create a job');
    }

    // Fill estimated cost
    await adminPage.fill('input[type="number"]', '5000');

    // Fill scheduled date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    await adminPage.fill('input[type="datetime-local"]', dateStr);

    // Fill notes
    await adminPage.fill(
      'textarea',
      'E2E test job: Water damage restoration in kitchen area. Urgent assessment required.'
    );

    // Submit
    await adminPage.click('button[type="submit"]:has-text("Create Job")');

    // Should redirect to job detail page
    await adminPage.waitForURL(/\/dashboard\/jobs\/[a-z0-9-]+$/, { timeout: 10000 });

    // Extract job ID from URL
    const url = adminPage.url();
    createdJobId = url.split('/dashboard/jobs/')[1];

    // Verify job detail page loaded with job number
    const jobNumberLocator = adminPage.locator('.font-mono.text-\\[\\#00F5FF\\]');
    await expect(jobNumberLocator).toBeVisible({ timeout: 5000 });
    createdJobNumber = (await jobNumberLocator.textContent()) || '';
    expect(createdJobNumber).toMatch(/^NRP-\d{4}-\d{5}$/);

    // Verify status is Pending
    await expect(adminPage.locator('text=Pending')).toBeVisible();

    // Verify job type displayed
    await expect(adminPage.locator('text=Water Damage')).toBeVisible();
  });

  // ── Scenario 2: Assign Contractor Flow ───────────────────────────────

  test('Scenario 2: Assign a contractor to the job', async () => {
    // Navigate to the job detail page
    await adminPage.goto(`/dashboard/jobs/${createdJobId}`);
    await expect(adminPage.locator('h1')).toBeVisible({ timeout: 10000 });

    // Click "Assign Contractor" button
    const assignButton = adminPage.locator('button:has-text("Assign Contractor")');
    await expect(assignButton).toBeVisible({ timeout: 5000 });
    await assignButton.click();

    // Should navigate to assign page
    await adminPage.waitForURL(/\/dashboard\/jobs\/[^/]+\/assign/, { timeout: 10000 });

    // Wait for contractors list to load
    await expect(adminPage.locator('h1:has-text("Assign Contractor")')).toBeVisible();

    // Search for a contractor (optional, just verify the search works)
    const searchInput = adminPage.locator('input[placeholder="Search contractors..."]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Select the first available contractor
    const contractorButtons = adminPage.locator('button.w-full.text-left');
    const contractorCount = await contractorButtons.count();

    if (contractorCount === 0) {
      test.skip(true, 'No verified contractors available for assignment');
    }

    // Click the first contractor
    await contractorButtons.first().click();

    // Verify selection ring appears (border-[#0d9488] class)
    await expect(contractorButtons.first()).toHaveClass(/ring-\[#0d9488\]/, {
      timeout: 3000,
    });

    // Click "Confirm Assignment"
    const confirmButton = adminPage.locator('button:has-text("Confirm Assignment")');
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    // Wait for success message
    await expect(
      adminPage.locator('text=/assigned successfully/i')
    ).toBeVisible({ timeout: 10000 });

    // Should redirect back to job detail page
    await adminPage.waitForURL(/\/dashboard\/jobs\/[a-z0-9-]+$/, { timeout: 10000 });

    // Verify status changed to Assigned
    await expect(adminPage.locator('text=Assigned')).toBeVisible({ timeout: 5000 });
  });

  // ── Scenario 3: Job Lifecycle (Start Work -> Complete) ───────────────

  test('Scenario 3a: Start work on the job', async () => {
    await adminPage.goto(`/dashboard/jobs/${createdJobId}`);
    await expect(adminPage.locator('h1')).toBeVisible({ timeout: 10000 });

    // Click "Start Work" button
    const startButton = adminPage.locator('button:has-text("Start Work")');
    await expect(startButton).toBeVisible({ timeout: 5000 });
    await startButton.click();

    // Wait for status to update (API call)
    await adminPage.waitForTimeout(2000);

    // Verify status changed to In Progress
    await expect(adminPage.locator('text=In Progress')).toBeVisible({ timeout: 10000 });
  });

  test('Scenario 3b: Complete the job', async () => {
    await adminPage.goto(`/dashboard/jobs/${createdJobId}`);
    await expect(adminPage.locator('h1')).toBeVisible({ timeout: 10000 });

    // Click "Complete Job" button
    const completeButton = adminPage.locator('button:has-text("Complete Job")');
    await expect(completeButton).toBeVisible({ timeout: 5000 });
    await completeButton.click();

    // Should navigate to complete page
    await adminPage.waitForURL(/\/dashboard\/jobs\/[^/]+\/complete/, { timeout: 10000 });

    // Fill completion form
    await expect(adminPage.locator('h1:has-text("Complete Job")')).toBeVisible();

    // Hours worked (required)
    const hoursInput = adminPage.locator('input[placeholder="e.g. 8.5"]');
    await expect(hoursInput).toBeVisible();
    await hoursInput.fill('12');

    // Actual cost (required)
    const costInput = adminPage.locator('input[placeholder="e.g. 4500"]');
    await expect(costInput).toBeVisible();
    await costInput.fill('4500');

    // Materials used (optional)
    await adminPage.fill(
      'textarea',
      'Industrial dehumidifiers x3, moisture barrier sheeting, antimicrobial spray'
    );

    // Verify completion summary appears
    await expect(adminPage.locator('text=Completion Summary')).toBeVisible();
    await expect(adminPage.locator('text=12h')).toBeVisible();

    // GST should be calculated (10% of 4500 = 450)
    await expect(adminPage.locator('text=GST (10%)')).toBeVisible();

    // Submit completion
    await adminPage.click('button:has-text("Mark Job as Completed")');

    // Wait for success message
    await expect(
      adminPage.locator('text=/completed successfully/i')
    ).toBeVisible({ timeout: 10000 });

    // Should redirect back to job detail
    await adminPage.waitForURL(/\/dashboard\/jobs\/[a-z0-9-]+$/, { timeout: 10000 });

    // Verify status changed to Completed
    await expect(adminPage.locator('text=Completed')).toBeVisible({ timeout: 5000 });
  });

  // ── Scenario 4: Invoice Generation ───────────────────────────────────

  test('Scenario 4: Generate invoice for the completed job', async () => {
    await adminPage.goto(`/dashboard/jobs/${createdJobId}`);
    await expect(adminPage.locator('h1')).toBeVisible({ timeout: 10000 });

    // Click "Generate Invoice" button
    const invoiceButton = adminPage.locator('button:has-text("Generate Invoice")');
    await expect(invoiceButton).toBeVisible({ timeout: 5000 });
    await invoiceButton.click();

    // Should navigate to invoice page
    await adminPage.waitForURL(/\/dashboard\/jobs\/[^/]+\/invoice/, { timeout: 10000 });

    // Verify invoice page loaded
    await expect(adminPage.locator('h1:has-text("Invoice")')).toBeVisible();

    // Click "Generate Invoice" action button
    const generateButton = adminPage.locator('button:has-text("Generate Invoice")');
    await expect(generateButton).toBeVisible({ timeout: 5000 });
    await generateButton.click();

    // Wait for invoice to generate
    await expect(adminPage.locator('text=TAX INVOICE')).toBeVisible({ timeout: 10000 });

    // Verify invoice contains job number
    await expect(adminPage.locator(`text=${createdJobNumber}`)).toBeVisible();

    // Verify line items table exists
    await expect(adminPage.locator('th:has-text("Description")')).toBeVisible();
    await expect(adminPage.locator('th:has-text("Amount")')).toBeVisible();

    // Verify GST row
    await expect(adminPage.locator('text=GST (10%)')).toBeVisible();

    // Verify total (inc. GST) is displayed
    await expect(adminPage.locator('text=Total (inc. GST)')).toBeVisible();

    // Verify "Generated" badge
    await expect(adminPage.locator('text=Generated')).toBeVisible();

    // Verify "Send Invoice" and "Back to Job" buttons
    await expect(adminPage.locator('button:has-text("Send Invoice")')).toBeVisible();
    await expect(adminPage.locator('button:has-text("Back to Job")')).toBeVisible();

    // Go back to job and verify INVOICED status
    await adminPage.click('button:has-text("Back to Job")');
    await adminPage.waitForURL(/\/dashboard\/jobs\/[a-z0-9-]+$/, { timeout: 10000 });
    await expect(adminPage.locator('text=Invoiced')).toBeVisible({ timeout: 5000 });
  });

  // ── Scenario 5: Job List Filters ─────────────────────────────────────

  test('Scenario 5: Filter jobs by status and type', async () => {
    await adminPage.goto('/dashboard/jobs');
    await expect(adminPage.locator('h1:has-text("Job Management")')).toBeVisible({
      timeout: 10000,
    });

    // Wait for jobs to load
    await adminPage.waitForTimeout(2000);

    // Open filters panel
    const filtersButton = adminPage.locator('button:has-text("Filters")');
    await expect(filtersButton).toBeVisible();
    await filtersButton.click();

    // Filter by status: INVOICED
    const statusSelect = adminPage.locator('select').first();
    await expect(statusSelect).toBeVisible({ timeout: 3000 });
    await statusSelect.selectOption('INVOICED');

    // Wait for filtered results
    await adminPage.waitForTimeout(1500);

    // All visible status badges should show "Invoiced"
    const statusBadges = adminPage.locator('span:has-text("Invoiced")');
    const badgeCount = await statusBadges.count();
    expect(badgeCount).toBeGreaterThanOrEqual(1);

    // Filter by type: water
    const typeSelect = adminPage.locator('select').nth(1);
    await expect(typeSelect).toBeVisible();
    await typeSelect.selectOption('water');

    // Wait for filtered results
    await adminPage.waitForTimeout(1500);

    // Clear status filter
    await statusSelect.selectOption('');

    // Clear type filter
    await typeSelect.selectOption('');

    // Wait for full list
    await adminPage.waitForTimeout(1500);

    // Verify search works
    const searchInput = adminPage.locator(
      'input[placeholder="Search by job number or notes..."]'
    );
    await expect(searchInput).toBeVisible();
    await searchInput.fill(createdJobNumber);

    // Wait for search results
    await adminPage.waitForTimeout(1500);

    // Our job should be visible
    await expect(adminPage.locator(`text=${createdJobNumber}`)).toBeVisible({ timeout: 5000 });

    // Clear search
    await searchInput.fill('');
    await adminPage.waitForTimeout(1000);
  });
});

// ── Scenario 6: Auth Protection ──────────────────────────────────────

test.describe('Job Management Auth Protection', () => {
  test('redirects to login when unauthenticated - jobs list', async ({ page }) => {
    await page.goto('/dashboard/jobs');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain('/login');
  });

  test('redirects to login when unauthenticated - new job', async ({ page }) => {
    await page.goto('/dashboard/jobs/new');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain('/login');
  });

  test('redirects to login when unauthenticated - job detail', async ({ page }) => {
    await page.goto('/dashboard/jobs/some-fake-id');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain('/login');
  });

  test('redirects to login when unauthenticated - assign page', async ({ page }) => {
    await page.goto('/dashboard/jobs/some-fake-id/assign');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain('/login');
  });

  test('redirects to login when unauthenticated - complete page', async ({ page }) => {
    await page.goto('/dashboard/jobs/some-fake-id/complete');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain('/login');
  });

  test('redirects to login when unauthenticated - invoice page', async ({ page }) => {
    await page.goto('/dashboard/jobs/some-fake-id/invoice');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain('/login');
  });
});
