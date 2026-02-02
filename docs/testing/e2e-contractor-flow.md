# End-to-End Testing: Contractor Onboarding & Booking Flow

## Overview

This document provides comprehensive end-to-end testing scenarios for the contractor verification and booking system (UNI-182). It covers the complete journey from contractor registration through verification, profile setup, client booking, and analytics tracking.

## Test Environment Setup

### Prerequisites

- **Database**: PostgreSQL with test tenant configured
- **Email Service**: Resend configured (or mock enabled)
- **File Storage**: Configured storage for document uploads
- **Authentication**: NextAuth configured with test users

### Test Users

Create the following test users:

1. **Test Contractor**
   - Email: `test-contractor@example.com`
   - Role: `CONTRACTOR`
   - Password: `Test123!`

2. **Test Admin**
   - Email: `test-admin@example.com`
   - Role: `ADMIN`
   - Password: `Admin123!`

3. **Test Client**
   - Email: `test-client@example.com`
   - Role: `CLIENT`
   - Password: `Client123!`

### Test Data

- **ABN**: `12345678901`
- **ACN**: `123456789`
- **Business Name**: `Test Disaster Recovery Pty Ltd`
- **License Number**: `NSW-DR-12345`
- **License State**: `NSW`
- **Primary Postcode**: `2000`
- **Service Areas**: `2000`, `2010`, `2100` (Sydney metro)

---

## Test Scenarios

### Scenario 1: Contractor Registration & Profile Setup

**Objective**: Verify that a new contractor can register and complete their profile.

#### Test Steps

1. **User Registration**
   ```
   ✓ Navigate to /auth/register
   ✓ Select "Contractor" user type
   ✓ Enter email: test-contractor@example.com
   ✓ Enter password: Test123!
   ✓ Click "Register"
   ✓ Verify email verification email sent
   ```

   **Expected Outcome**:
   - User created with `role: CONTRACTOR`
   - Verification email sent
   - Redirected to contractor dashboard

2. **Initial Profile Creation**
   ```
   ✓ Navigate to /dashboard/contractor/verification/profile
   ✓ Fill in business information:
     - Business Name: Test Disaster Recovery Pty Ltd
     - ABN: 12345678901
     - ACN: 123456789
     - Primary Postcode: 2000
     - Primary State: NSW
   ✓ Click "Save Profile"
   ```

   **Expected Outcome**:
   - Contractor profile created with `verificationStatus: PENDING`
   - Profile stored in database
   - Success message displayed

3. **License Information**
   ```
   ✓ Navigate to license section
   ✓ Enter license details:
     - License Number: NSW-DR-12345
     - License State: NSW
     - License Expiry: (future date)
   ✓ Upload license document (PDF)
   ✓ Click "Save License"
   ```

   **Expected Outcome**:
   - License information saved
   - Document uploaded to storage
   - ContractorDocument created with `status: PENDING`

4. **Company Profile**
   ```
   ✓ Enter company description (min 50 characters)
   ✓ Set years in business: 10
   ✓ Set team size: 15
   ✓ Set service radius: 50 km
   ✓ Enable emergency services
   ✓ Set emergency response time: 60 minutes
   ✓ Click "Save"
   ```

   **Expected Outcome**:
   - Company profile fields updated
   - Profile completeness increases

5. **Service Areas Configuration**
   ```
   ✓ Navigate to service areas section
   ✓ Add service area:
     - Postcode: 2000
     - State: NSW
     - Suburb: Sydney
     - Mark as primary area
   ✓ Add additional areas: 2010, 2100
   ✓ Save service areas
   ```

   **Expected Outcome**:
   - ContractorServiceArea records created
   - Service coverage displayed on map

6. **Profile Submission**
   ```
   ✓ Complete all required fields
   ✓ Verify profile completeness: 100%
   ✓ Click "Submit for Verification"
   ```

   **Expected Outcome**:
   - `verificationStatus` changes to `SUBMITTED`
   - `submittedForVerificationAt` timestamp set
   - ContractorVerificationHistory entry created
   - "Verification Submitted" email sent to contractor

### Scenario 2: Admin Verification Process

**Objective**: Verify that admins can review and approve/reject contractor applications.

#### Test Steps

1. **Admin Login & Navigation**
   ```
   ✓ Login as test-admin@example.com
   ✓ Navigate to /dashboard/admin/contractors/verification
   ```

   **Expected Outcome**:
   - Admin verification dashboard loads
   - Statistics show counts by status
   - "Submitted" tab shows test contractor

2. **Review Contractor Application**
   ```
   ✓ Click on test contractor in "Submitted" tab
   ✓ Review contractor details:
     - Business information
     - License details
     - Documents (view/download)
     - Service areas
     - Profile completeness
   ✓ Verify all fields populated correctly
   ```

   **Expected Outcome**:
   - Detailed contractor view opens
   - All information displayed correctly
   - Profile analysis shows 100% completeness
   - Documents available for review

3. **Verify Documents**
   ```
   ✓ Click "View" on license document
   ✓ Verify document opens/downloads
   ✓ Check document validity
   ```

   **Expected Outcome**:
   - Document accessible
   - File type correct (PDF)
   - Document metadata displayed

4. **Mark Under Review**
   ```
   ✓ Click "Mark Under Review"
   ✓ Add optional notes
   ✓ Confirm action
   ```

   **Expected Outcome**:
   - `verificationStatus` changes to `UNDER_REVIEW`
   - `reviewedBy` set to admin user ID
   - `reviewedAt` timestamp set
   - Verification history entry created
   - "Under Review" email sent to contractor

5. **Approve Contractor**
   ```
   ✓ Review all information again
   ✓ Click "Approve"
   ✓ Add approval notes (optional)
   ✓ Confirm approval
   ```

   **Expected Outcome**:
   - `verificationStatus` changes to `APPROVED`
   - `isVerified` set to `true`
   - `verificationDate` and `nrpgVerifiedAt` timestamps set
   - NRPG member ID generated (if applicable)
   - Verification history entry created
   - "Verification Approved" email sent with NRPG benefits

6. **Test Rejection Flow** (Alternative Path)
   ```
   ✓ Select a different contractor
   ✓ Click "Reject"
   ✓ Enter rejection reason (required, min 10 chars)
   ✓ Confirm rejection
   ```

   **Expected Outcome**:
   - `verificationStatus` changes to `REJECTED`
   - `rejectionReason` stored
   - Verification history entry created
   - "Verification Rejected" email sent with reason

7. **Test Request Changes Flow** (Alternative Path)
   ```
   ✓ Select another contractor
   ✓ Click "Request Changes"
   ✓ Enter detailed notes about required changes
   ✓ Confirm action
   ```

   **Expected Outcome**:
   - `verificationStatus` changes to `INCOMPLETE`
   - Notes stored in `verificationNotes`
   - Verification history entry created
   - "Changes Requested" email sent with notes

### Scenario 3: Client Booking Flow

**Objective**: Verify that clients can find and book verified contractors.

#### Test Steps

1. **Client Login & Search**
   ```
   ✓ Login as test-client@example.com
   ✓ Navigate to /contractors or contractor directory
   ✓ Search for contractors in postcode 2000
   ✓ Filter by verified contractors only
   ```

   **Expected Outcome**:
   - Contractor directory loads
   - Verified contractors displayed
   - Test contractor appears in results

2. **View Contractor Profile**
   ```
   ✓ Click on test contractor profile
   ✓ View business information
   ✓ View service areas
   ✓ View ratings (if any)
   ✓ Check verified badge displayed
   ```

   **Expected Outcome**:
   - Profile page loads
   - ProfileViewTracker increments view count
   - All contractor information displayed
   - Verified badge visible
   - "Request Booking" or "Get Quote" button available

3. **Track Profile View**
   ```
   ✓ Stay on profile page for 3+ seconds
   ✓ Verify view tracking occurs
   ```

   **Expected Outcome**:
   - Profile view tracked after 3 seconds
   - `profileViews` incremented
   - `profileViewsThisMonth` incremented
   - Session storage set to prevent duplicate

4. **Create Booking Request**
   ```
   ✓ Click "Request Booking"
   ✓ Fill in booking details:
     - Service type: Water Damage Restoration
     - Property address: 123 Test St, Sydney NSW 2000
     - Preferred date/time
     - Issue description
   ✓ Submit booking request
   ```

   **Expected Outcome**:
   - Booking created with `status: PENDING`
   - Booking linked to contractor
   - Client receives confirmation email
   - Contractor receives notification email

5. **Contractor Accepts Booking**
   ```
   ✓ Login as test-contractor@example.com
   ✓ Navigate to /dashboard/contractor/bookings
   ✓ View pending booking
   ✓ Click "Accept Booking"
   ✓ Confirm acceptance
   ```

   **Expected Outcome**:
   - `status` changes to `CONFIRMED`
   - Client notified of acceptance
   - Booking appears in active bookings
   - `directBookingRequests` counter incremented

6. **Complete Booking**
   ```
   ✓ Mark booking as "In Progress"
   ✓ Complete work
   ✓ Mark booking as "Completed"
   ✓ Add completion notes
   ```

   **Expected Outcome**:
   - `status` changes to `COMPLETED`
   - `completedAt` timestamp set
   - `completedJobs` counter incremented
   - Client prompted to leave rating

### Scenario 4: Rating & Review System

**Objective**: Verify that clients can rate contractors and ratings appear correctly.

#### Test Steps

1. **Client Submits Rating**
   ```
   ✓ Login as test-client@example.com
   ✓ Navigate to completed booking
   ✓ Click "Leave Review"
   ✓ Select star rating: 5 stars
   ✓ Enter review comment: "Excellent service, very professional!"
   ✓ Submit rating
   ```

   **Expected Outcome**:
   - Rating created and linked to contractor
   - Rating linked to booking
   - `averageRating` recalculated
   - Rating count incremented
   - Contractor notified of new rating

2. **Verify Rating Display**
   ```
   ✓ View contractor profile as anonymous user
   ✓ Verify rating displayed correctly
   ✓ Check star rating shows 5.0
   ✓ Verify review comment visible
   ```

   **Expected Outcome**:
   - Rating visible on profile
   - Star rating calculated correctly
   - Review comment displayed
   - Timestamp shown

3. **Submit Multiple Ratings**
   ```
   ✓ Create and complete additional bookings
   ✓ Submit ratings: 5, 4, 5, 4, 5 stars
   ✓ Verify average rating calculated correctly
   ```

   **Expected Outcome**:
   - Average rating: 4.6 stars
   - Total ratings: 6
   - Rating distribution updated
   - All ratings visible on profile

### Scenario 5: Contractor Analytics

**Objective**: Verify that analytics track correctly and display accurate data.

#### Test Steps

1. **View Analytics Dashboard**
   ```
   ✓ Login as test-contractor@example.com
   ✓ Navigate to /dashboard/contractor/analytics
   ```

   **Expected Outcome**:
   - Analytics dashboard loads
   - Overview cards display metrics
   - All counters show correct values

2. **Verify Profile View Tracking**
   ```
   ✓ Check profileViews count
   ✓ Check profileViewsThisMonth count
   ✓ Verify conversion rate calculation
   ```

   **Expected Outcome**:
   - View counts accurate
   - Monthly views tracked separately
   - Conversion rate = (bookings / views) * 100

3. **Verify Booking Statistics**
   ```
   ✓ Check total bookings count
   ✓ Check completed bookings count
   ✓ Check active bookings count
   ✓ Verify completion rate
   ✓ Verify cancellation rate
   ```

   **Expected Outcome**:
   - All counts accurate
   - Completion rate = (completed / total) * 100
   - Cancellation rate calculated correctly
   - Month-over-month growth calculated

4. **Verify Rating Statistics**
   ```
   ✓ Check average rating
   ✓ Check total ratings count
   ✓ Verify rating distribution (1-5 stars)
   ✓ Check positive rating percentage
   ```

   **Expected Outcome**:
   - Average rating matches calculation
   - Distribution shows correct counts per star
   - Positive % = (4+5 star ratings / total) * 100

5. **Verify Performance Metrics**
   ```
   ✓ Check average response time
   ✓ Check completed jobs count
   ✓ Check quote acceptance rate
   ✓ Check direct booking requests
   ```

   **Expected Outcome**:
   - All metrics display correctly
   - Recent bookings list shows last 10
   - Recent ratings list shows last 10

6. **Test Monthly Reset**
   ```
   ✓ Manually update lastProfileViewReset to previous month
   ✓ Track a new profile view
   ✓ Verify profileViewsThisMonth resets to 1
   ✓ Verify profileViews continues incrementing
   ```

   **Expected Outcome**:
   - Monthly views reset automatically
   - Lifetime views continue counting
   - `lastProfileViewReset` updated to current month

### Scenario 6: Email Notifications

**Objective**: Verify that all email notifications are sent correctly.

#### Test Steps

1. **Verification Submitted Email**
   ```
   ✓ Complete contractor profile
   ✓ Submit for verification
   ✓ Check contractor email inbox
   ```

   **Expected Email Content**:
   - Subject: "Verification Submitted - Under Review"
   - Contractor name personalized
   - Business name included
   - Verification timeline (2-3 business days)
   - Process steps outlined

2. **Under Review Email**
   ```
   ✓ Admin marks contractor under review
   ✓ Check contractor email inbox
   ```

   **Expected Email Content**:
   - Subject: "Application Under Review"
   - Active review confirmation
   - Expected timeline (1-2 business days)
   - What's being reviewed

3. **Verification Approved Email**
   ```
   ✓ Admin approves contractor
   ✓ Check contractor email inbox
   ```

   **Expected Email Content**:
   - Subject: "🎉 Verification Approved - Welcome to NRPG!"
   - Congratulations message
   - NRPG Member ID (if applicable)
   - List of NRPG benefits
   - Next steps

4. **Verification Rejected Email**
   ```
   ✓ Admin rejects contractor (test account)
   ✓ Check contractor email inbox
   ```

   **Expected Email Content**:
   - Subject: "Verification Status Update - Action Required"
   - Specific rejection reason
   - What to do next
   - How to resubmit

5. **Changes Requested Email**
   ```
   ✓ Admin requests changes (test account)
   ✓ Check contractor email inbox
   ```

   **Expected Email Content**:
   - Subject: "Profile Updates Needed"
   - Specific change requests
   - Friendly, encouraging tone
   - Link to update profile

### Scenario 7: Error Handling & Edge Cases

**Objective**: Verify that the system handles errors and edge cases gracefully.

#### Test Steps

1. **Incomplete Profile Submission**
   ```
   ✓ Try to submit profile without required fields
   ✓ Verify validation errors displayed
   ✓ Check that submission is blocked
   ```

   **Expected Outcome**:
   - Validation errors shown
   - Submission prevented
   - User guided to missing fields

2. **Duplicate ABN**
   ```
   ✓ Try to create contractor with existing ABN
   ✓ Verify unique constraint enforced
   ```

   **Expected Outcome**:
   - Error message: "ABN already registered"
   - Database constraint enforced
   - User cannot proceed

3. **Invalid Document Upload**
   ```
   ✓ Try to upload non-PDF file as license
   ✓ Try to upload file > 10MB
   ✓ Verify upload validation
   ```

   **Expected Outcome**:
   - File type validation errors
   - Size limit errors
   - User notified of requirements

4. **Expired License**
   ```
   ✓ Enter license expiry date in the past
   ✓ Submit profile
   ✓ Verify warning displayed
   ```

   **Expected Outcome**:
   - Warning message shown
   - Admin can see expiry status
   - May affect verification decision

5. **Network Failure During Profile Save**
   ```
   ✓ Simulate network disconnection
   ✓ Try to save profile
   ✓ Verify error handling
   ```

   **Expected Outcome**:
   - User-friendly error message
   - Data not lost (auto-save if implemented)
   - Retry option available

6. **Concurrent Profile Views**
   ```
   ✓ Open profile in multiple tabs
   ✓ View from multiple sessions
   ✓ Verify view tracking handles concurrency
   ```

   **Expected Outcome**:
   - Only one view per session counted
   - No duplicate increment errors
   - Database handles concurrent updates

7. **Admin Permission Checks**
   ```
   ✓ Try to access admin routes as contractor
   ✓ Try to verify own profile
   ✓ Verify authorization enforced
   ```

   **Expected Outcome**:
   - Access denied (401/403 errors)
   - Redirected to appropriate dashboard
   - Security logs capture attempts

### Scenario 8: Mobile Responsiveness

**Objective**: Verify that all interfaces work correctly on mobile devices.

#### Test Steps

1. **Mobile Profile Setup**
   ```
   ✓ Access contractor profile setup on mobile (375px width)
   ✓ Fill in all fields
   ✓ Upload documents
   ✓ Submit profile
   ```

   **Expected Outcome**:
   - Forms responsive and usable
   - All fields accessible
   - Document upload works
   - No horizontal scrolling

2. **Mobile Admin Dashboard**
   ```
   ✓ Access admin verification dashboard on tablet (768px)
   ✓ Review contractor details
   ✓ Approve/reject contractors
   ```

   **Expected Outcome**:
   - Tables responsive (scroll or stack)
   - Actions accessible
   - Modal dialogs fit screen

3. **Mobile Analytics**
   ```
   ✓ View analytics dashboard on mobile
   ✓ Check charts and graphs
   ✓ Verify all metrics visible
   ```

   **Expected Outcome**:
   - Cards stack vertically
   - Graphs scale appropriately
   - No data truncated

---

## Automated Test Scripts

### Playwright E2E Test

Create file: `apps/web/e2e/contractor-flow.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Contractor Onboarding Flow', () => {
  test('complete contractor registration and verification', async ({ page }) => {
    // 1. Registration
    await page.goto('/auth/register');
    await page.selectOption('[name="userType"]', 'CONTRACTOR');
    await page.fill('[name="email"]', 'e2e-contractor@test.com');
    await page.fill('[name="password"]', 'Test123!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard\/contractor/);

    // 2. Profile Setup
    await page.goto('/dashboard/contractor/verification/profile');
    await page.fill('[name="businessName"]', 'E2E Test Business');
    await page.fill('[name="abnNumber"]', '98765432101');
    await page.fill('[name="primaryPostcode"]', '2000');
    await page.selectOption('[name="primaryState"]', 'NSW');
    await page.click('button:has-text("Save Profile")');

    await expect(page.locator('.success-message')).toBeVisible();

    // 3. License Information
    await page.fill('[name="licenseNumber"]', 'NSW-TEST-' + Date.now());
    await page.selectOption('[name="licenseState"]', 'NSW');
    await page.fill('[name="licenseExpiry"]', '2026-12-31');

    // Upload mock license document
    await page.setInputFiles('[name="licenseDocument"]', {
      name: 'license.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 test document'),
    });

    await page.click('button:has-text("Save License")');
    await expect(page.locator('.success-message')).toBeVisible();

    // 4. Company Profile
    await page.fill('[name="companyDescription"]',
      'Professional disaster recovery services with over 10 years of experience in Sydney.');
    await page.fill('[name="yearsInBusiness"]', '10');
    await page.fill('[name="teamSize"]', '15');
    await page.fill('[name="serviceRadius"]', '50');
    await page.check('[name="emergencyAvailable"]');
    await page.fill('[name="emergencyResponseTime"]', '60');
    await page.click('button:has-text("Save")');

    // 5. Service Areas
    await page.goto('/dashboard/contractor/verification/service-areas');
    await page.fill('[name="postcode"]', '2000');
    await page.selectOption('[name="state"]', 'NSW');
    await page.fill('[name="suburb"]', 'Sydney');
    await page.check('[name="isPrimaryArea"]');
    await page.click('button:has-text("Add Service Area")');

    await expect(page.locator('text=2000')).toBeVisible();

    // 6. Submit for Verification
    await page.click('button:has-text("Submit for Verification")');
    await page.click('button:has-text("Confirm")'); // Confirmation dialog

    await expect(page.locator('text=Submitted for Verification')).toBeVisible();
  });

  test('admin can approve contractor', async ({ page, context }) => {
    // Login as admin
    await page.goto('/auth/login');
    await page.fill('[name="email"]', 'admin@test.com');
    await page.fill('[name="password"]', 'Admin123!');
    await page.click('button[type="submit"]');

    // Navigate to verification dashboard
    await page.goto('/dashboard/admin/contractors/verification');

    // Switch to "Submitted" tab
    await page.click('button:has-text("Submitted")');

    // Find and click on test contractor
    await page.click('text=E2E Test Business');

    // Review details
    await expect(page.locator('text=ABN')).toBeVisible();
    await expect(page.locator('text=98765432101')).toBeVisible();

    // Mark under review
    await page.click('button:has-text("Mark Under Review")');
    await page.fill('[name="notes"]', 'Reviewing application');
    await page.click('button:has-text("Confirm")');

    await expect(page.locator('text=Under Review')).toBeVisible();

    // Approve contractor
    await page.click('button:has-text("Approve")');
    await page.fill('[name="notes"]', 'All documents verified');
    await page.click('button:has-text("Confirm Approval")');

    await expect(page.locator('text=Approved')).toBeVisible();
    await expect(page.locator('.verified-badge')).toBeVisible();
  });

  test('client can book verified contractor', async ({ page }) => {
    // Login as client
    await page.goto('/auth/login');
    await page.fill('[name="email"]', 'client@test.com');
    await page.fill('[name="password"]', 'Client123!');
    await page.click('button[type="submit"]');

    // Search for contractors
    await page.goto('/contractors?postcode=2000');

    // Click on verified contractor
    await page.click('text=E2E Test Business');

    // Wait for profile view tracking (3 seconds)
    await page.waitForTimeout(3500);

    // Request booking
    await page.click('button:has-text("Request Booking")');

    // Fill booking form
    await page.selectOption('[name="serviceType"]', 'WATER_DAMAGE_RESTORATION');
    await page.fill('[name="address"]', '123 Test St, Sydney NSW 2000');
    await page.fill('[name="description"]', 'Water damage in kitchen');
    await page.fill('[name="preferredDate"]', '2025-02-15');
    await page.click('button:has-text("Submit Request")');

    await expect(page.locator('text=Booking request submitted')).toBeVisible();
  });

  test('analytics track correctly', async ({ page }) => {
    // Login as contractor
    await page.goto('/auth/login');
    await page.fill('[name="email"]', 'e2e-contractor@test.com');
    await page.fill('[name="password"]', 'Test123!');
    await page.click('button[type="submit"]');

    // Navigate to analytics
    await page.goto('/dashboard/contractor/analytics');

    // Verify analytics display
    await expect(page.locator('text=Profile Views')).toBeVisible();
    await expect(page.locator('text=Total Bookings')).toBeVisible();
    await expect(page.locator('text=Average Rating')).toBeVisible();

    // Check that profile views were tracked
    const viewCount = await page.locator('[data-metric="profileViews"]').textContent();
    expect(parseInt(viewCount || '0')).toBeGreaterThan(0);

    // Check booking count
    const bookingCount = await page.locator('[data-metric="totalBookings"]').textContent();
    expect(parseInt(bookingCount || '0')).toBeGreaterThanOrEqual(1);
  });
});
```

### API Integration Tests

Create file: `apps/web/src/__tests__/e2e/contractor-api-flow.test.ts`

```typescript
import { prisma } from '../../../lib/prisma';

describe('Contractor API Flow E2E', () => {
  let contractorUserId: string;
  let contractorId: string;
  let adminUserId: string;
  let clientUserId: string;
  let bookingId: string;

  beforeAll(async () => {
    // Create test users
    const contractorUser = await prisma.user.create({
      data: {
        email: 'api-e2e-contractor@test.com',
        name: 'API E2E Contractor',
        hashedPassword: 'hashed',
        role: 'CONTRACTOR',
      },
    });
    contractorUserId = contractorUser.id;

    const adminUser = await prisma.user.create({
      data: {
        email: 'api-e2e-admin@test.com',
        name: 'API E2E Admin',
        hashedPassword: 'hashed',
        role: 'ADMIN',
      },
    });
    adminUserId = adminUser.id;

    const clientUser = await prisma.user.create({
      data: {
        email: 'api-e2e-client@test.com',
        name: 'API E2E Client',
        hashedPassword: 'hashed',
        role: 'CLIENT',
      },
    });
    clientUserId = clientUser.id;
  });

  afterAll(async () => {
    // Cleanup
    if (bookingId) {
      await prisma.booking.delete({ where: { id: bookingId } });
    }
    if (contractorId) {
      await prisma.contractor.delete({ where: { id: contractorId } });
    }
    await prisma.user.deleteMany({
      where: {
        id: { in: [contractorUserId, adminUserId, clientUserId] },
      },
    });
  });

  it('completes full contractor workflow', async () => {
    // 1. Create contractor profile
    const contractor = await prisma.contractor.create({
      data: {
        userId: contractorUserId,
        businessName: 'API E2E Test Business',
        abnNumber: '11223344556',
        primaryPostcode: '2000',
        primaryState: 'NSW',
        licenseNumber: 'NSW-API-' + Date.now(),
        licenseState: 'NSW',
        licenseExpiry: new Date('2026-12-31'),
        companyDescription: 'Professional disaster recovery services.',
        yearsInBusiness: 10,
        teamSize: 15,
        serviceRadius: 50,
        verificationStatus: 'PENDING',
      },
    });
    contractorId = contractor.id;
    expect(contractor.verificationStatus).toBe('PENDING');

    // 2. Add service area
    await prisma.contractorServiceArea.create({
      data: {
        contractorId: contractor.id,
        postcode: '2000',
        state: 'NSW',
        suburb: 'Sydney',
        isPrimaryArea: true,
        isActive: true,
      },
    });

    // 3. Submit for verification
    await prisma.contractor.update({
      where: { id: contractor.id },
      data: {
        verificationStatus: 'SUBMITTED',
        submittedForVerificationAt: new Date(),
      },
    });

    const submitted = await prisma.contractor.findUnique({
      where: { id: contractor.id },
    });
    expect(submitted?.verificationStatus).toBe('SUBMITTED');

    // 4. Admin marks under review
    await prisma.contractor.update({
      where: { id: contractor.id },
      data: {
        verificationStatus: 'UNDER_REVIEW',
        reviewedBy: adminUserId,
        reviewedAt: new Date(),
      },
    });

    // 5. Admin approves
    await prisma.contractor.update({
      where: { id: contractor.id },
      data: {
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationDate: new Date(),
        nrpgVerifiedAt: new Date(),
      },
    });

    const approved = await prisma.contractor.findUnique({
      where: { id: contractor.id },
    });
    expect(approved?.verificationStatus).toBe('APPROVED');
    expect(approved?.isVerified).toBe(true);

    // 6. Track profile view
    await prisma.contractor.update({
      where: { id: contractor.id },
      data: {
        profileViews: { increment: 1 },
        profileViewsThisMonth: { increment: 1 },
      },
    });

    const withViews = await prisma.contractor.findUnique({
      where: { id: contractor.id },
    });
    expect(withViews?.profileViews).toBe(1);

    // 7. Create booking
    const booking = await prisma.booking.create({
      data: {
        contractorId: contractor.id,
        clientId: clientUserId,
        serviceType: 'WATER_DAMAGE_RESTORATION',
        status: 'PENDING',
        propertyAddress: '123 Test St',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
      },
    });
    bookingId = booking.id;

    // 8. Accept booking
    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'CONFIRMED' },
    });

    // 9. Complete booking
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    await prisma.contractor.update({
      where: { id: contractor.id },
      data: { completedJobs: { increment: 1 } },
    });

    // 10. Create rating
    await prisma.rating.create({
      data: {
        contractorId: contractor.id,
        clientId: clientUserId,
        bookingId: booking.id,
        rating: 5,
        comment: 'Excellent service!',
      },
    });

    // Update average rating
    await prisma.contractor.update({
      where: { id: contractor.id },
      data: { averageRating: 5.0 },
    });

    // 11. Verify final state
    const final = await prisma.contractor.findUnique({
      where: { id: contractor.id },
      include: {
        bookings: true,
        ratings: true,
        serviceAreas: true,
      },
    });

    expect(final?.isVerified).toBe(true);
    expect(final?.profileViews).toBe(1);
    expect(final?.completedJobs).toBe(1);
    expect(final?.averageRating).toEqual(5.0);
    expect(final?.bookings.length).toBe(1);
    expect(final?.ratings.length).toBe(1);
    expect(final?.serviceAreas.length).toBe(1);
  });
});
```

---

## Manual Testing Checklist

Use this checklist for manual testing:

### Contractor Registration
- [ ] Can register with CONTRACTOR role
- [ ] Receives verification email
- [ ] Redirected to contractor dashboard
- [ ] Profile creation form accessible

### Profile Setup
- [ ] All required fields validated
- [ ] Optional fields work correctly
- [ ] Can save partial progress
- [ ] Profile completeness updates

### Document Upload
- [ ] PDF upload works
- [ ] File size validation (max 10MB)
- [ ] File type validation (PDF only)
- [ ] Document preview/download works

### Service Areas
- [ ] Can add multiple service areas
- [ ] Primary area designation works
- [ ] Postcode validation (4 digits)
- [ ] Australian states only

### Profile Submission
- [ ] Cannot submit incomplete profile
- [ ] Submission changes status to SUBMITTED
- [ ] Verification email sent
- [ ] History entry created

### Admin Verification
- [ ] Admin can view all submitted contractors
- [ ] Filtering by status works
- [ ] Can view contractor details
- [ ] Can approve contractors
- [ ] Can reject contractors (with reason)
- [ ] Can request changes (with notes)
- [ ] Can mark under review
- [ ] All actions send emails

### Profile View Tracking
- [ ] Views tracked after 3 seconds
- [ ] Session deduplication works
- [ ] Monthly views reset correctly
- [ ] Lifetime views continue counting

### Booking Flow
- [ ] Client can find verified contractors
- [ ] Booking request created
- [ ] Contractor notified
- [ ] Booking can be accepted/rejected
- [ ] Status updates correctly
- [ ] Completion tracking works

### Rating System
- [ ] Client can rate completed bookings
- [ ] Star rating (1-5) works
- [ ] Comment optional
- [ ] Average rating calculated
- [ ] Rating distribution updated
- [ ] Ratings display on profile

### Analytics
- [ ] Overview metrics display
- [ ] Booking stats accurate
- [ ] Rating stats accurate
- [ ] Performance metrics correct
- [ ] Recent activity displays
- [ ] Conversion rate calculated

### Email Notifications
- [ ] Verification submitted email
- [ ] Under review email
- [ ] Approved email (with benefits)
- [ ] Rejected email (with reason)
- [ ] Changes requested email
- [ ] All emails branded correctly
- [ ] HTML and plain text versions

### Error Handling
- [ ] Validation errors displayed
- [ ] Network errors handled gracefully
- [ ] Duplicate prevention works
- [ ] Authorization enforced
- [ ] 404 pages for missing resources

### Mobile Responsiveness
- [ ] Forms work on mobile (375px)
- [ ] Tables responsive on tablet (768px)
- [ ] No horizontal scrolling
- [ ] Touch targets adequate size
- [ ] Navigation accessible

### Performance
- [ ] Pages load within 2 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] API responses < 500ms
- [ ] Database queries optimized

---

## Test Data Cleanup

After testing, clean up test data:

```sql
-- Delete test contractors
DELETE FROM "Contractor" WHERE "abnNumber" IN ('12345678901', '98765432101', '11223344556');

-- Delete test users
DELETE FROM "User" WHERE email LIKE '%@test.com' OR email LIKE '%@example.com';

-- Delete test bookings
DELETE FROM "Booking" WHERE "propertyAddress" = '123 Test St';

-- Delete test ratings
DELETE FROM "Rating" WHERE "comment" LIKE '%test%' OR "comment" LIKE '%E2E%';
```

---

## Reporting

### Test Results Template

```markdown
## Test Execution Report

**Date**: [Date]
**Tester**: [Name]
**Environment**: [Development/Staging/Production]

### Summary
- Total Scenarios: 8
- Passed: X
- Failed: X
- Skipped: X

### Scenario Results

#### ✅ Scenario 1: Contractor Registration & Profile Setup
- Status: PASSED
- Duration: 5 minutes
- Notes: All steps completed successfully

#### ❌ Scenario 2: Admin Verification Process
- Status: FAILED
- Duration: 3 minutes
- Error: Email notification not sent
- Steps to Reproduce: [...]

[Continue for all scenarios...]

### Issues Found
1. [Issue #1 Description]
2. [Issue #2 Description]

### Recommendations
- [Recommendation 1]
- [Recommendation 2]
```

---

## Continuous Testing

### GitHub Actions Workflow

Create `.github/workflows/e2e-tests.yml`:

```yaml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run Prisma migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
          NEXTAUTH_SECRET: test-secret

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: e2e-results
          path: test-results/
```

---

## Success Criteria

The end-to-end testing is considered successful when:

1. ✅ All 8 main scenarios pass without errors
2. ✅ All email notifications send correctly
3. ✅ Analytics track accurately
4. ✅ No console errors during normal operation
5. ✅ Mobile responsiveness verified on 3 device sizes
6. ✅ All error cases handled gracefully
7. ✅ Performance metrics meet targets (< 2s page load)
8. ✅ Database integrity maintained
9. ✅ No security vulnerabilities found
10. ✅ Automated tests pass in CI/CD pipeline

---

**Document Version**: 1.0
**Last Updated**: 2025-01-28
**Next Review**: Before production deployment
