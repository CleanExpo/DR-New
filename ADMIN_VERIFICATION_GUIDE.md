# Admin Verification Dashboard - User Guide

## Overview

The Admin Verification Dashboard is a comprehensive system for reviewing, verifying, and managing contractor onboarding applications for the NRPG Platform CRM.

## Features

### 1. Pending Applications List (`/admin/onboarding`)

**Purpose:** View and manage all contractor applications

**Key Features:**
- Real-time statistics dashboard showing Total, Pending, Under Review, Approved, and Rejected applications
- Advanced search by name, email, company name, or ABN
- Filter by application status (Pending, Under Review, Approved, Rejected)
- Sort by submission date, company name, or status
- Quick actions: View, Approve, Reject directly from list
- Visual progress indicators showing application completion percentage
- Submission date displayed in human-readable format ("5 days ago")

**Workflow:**
1. Review stats to understand current workload
2. Use filters to find specific applications
3. Click "View Details" for full application review
4. Use quick approve/reject for straightforward cases

### 2. Application Detail Page (`/admin/onboarding/[id]`)

**Purpose:** Comprehensive review of individual contractor applications

**Tabs:**

#### Tab 1: Overview
- Contact information summary
- Verification checklist:
  - ✅ Business details verified (ABN)
  - ✅ All IICRC qualifications verified
  - ✅ Insurance policies current
  - ✅ References verified
  - ✅ Subscription tier selected
- Admin notes (internal only) - editable with auto-save
- Quick stats: Services, Qualifications, Years in business

#### Tab 2: Business Details
- Company name, trading name, ABN, ACN
- Company structure (Pty Ltd, Sole Trader, etc.)
- Registered and mailing addresses
- Contact details (phone, email, website)
- Directors information
- ABN verification status with badge

#### Tab 3: Qualifications
- List of all IICRC certifications
- For each qualification:
  - Certificate type (WRT, FSRT, AMRT, ASD, OCT, etc.)
  - Certificate number and issuing organization
  - Issue date and expiry date
  - Expiry warnings (90 days or less)
  - Document viewer/download link
  - Verification status badge
  - Individual verify/reject buttons
  - Verification notes from admin
- **Actions:**
  - Verify: Add notes, confirm verification
  - Reject: Provide reason for contractor notification

#### Tab 4: Insurance & Compliance
- Public Liability Insurance
- Professional Indemnity Insurance
- Workers Compensation Insurance
- For each policy:
  - Policy number, provider, coverage amount
  - Effective and expiry dates
  - Certificate of Currency viewer
  - Coverage adequacy check (PL minimum $10M, PI minimum $5M)
  - Expiry warnings (90 days or less)
  - Individual verify/reject buttons
- **Validation:**
  - Red alert if coverage below minimum
  - Yellow warning if expiring soon
  - Red alert if expired

#### Tab 5: Coverage Area
- Interactive map showing:
  - Base location marker
  - Coverage radius circle
  - Selected tier (25km, 50km, 75km, 100km, Rural)
  - Monthly subscription fee
  - Estimated job volume for area
  - Nearby contractors (competition analysis)
  - Territory conflict detection
- Coverage summary cards:
  - Selected tier and radius
  - Monthly subscription fee
  - Number of nearby contractors
- **Conflict Detection:**
  - Yellow warning if overlap with existing contractor
  - Distance calculations to nearby contractors
  - Visual indication of territory coverage

#### Tab 6: Timeline/Activity
- Chronological activity log:
  - Application submitted (date/time)
  - Documents uploaded
  - Admin viewed application
  - Qualifications verified
  - Insurance verified
  - Application approved/rejected
- Internal admin notes with timestamps
- Communication history (emails sent)

### 3. Bulk Actions Page (`/admin/onboarding/bulk`)

**Purpose:** Process multiple applications efficiently

**Features:**
- Select multiple applications via checkboxes
- Select all functionality
- Bulk actions:
  - **Approve Selected:** Approve multiple contractors at once (with safety checks)
  - **Send Reminders:** Email contractors about pending items
  - **Export to CSV:** Download application data for external processing
- Table view with key information:
  - Company name, ABN
  - Contact email and phone
  - Current status
  - Submission date/time
  - Qualification verification status (X/Y verified)
  - Insurance verification status (X/Y verified)
- Visual indicators:
  - Blue highlight for selected rows
  - Green checkmarks for complete items
  - Yellow clock for pending items
  - Selection counter badge

**Safety Features:**
- Confirmation dialog before bulk approval
- Only processes applications with all verifications complete
- Info alert explaining bulk approval requirements

### 4. Analytics Dashboard (`/admin/onboarding/analytics`)

**Purpose:** Track onboarding performance and trends

**KPI Cards:**
- **Applications This Month:** Total with percentage change vs. last month
- **Average Approval Time:** Days with trend indicator
- **Approval Rate:** Percentage with change indicator
- **Rejection Rate:** Percentage with top reason

**Charts:**
- **Top Rejection Reasons:** Bar chart showing most common rejection causes
- **Applications by Service Type:** Distribution of service specializations
- **Applications by State:** Geographic distribution
- **Applications Over Time:** Timeline chart showing submission trends

**Recent Activity:**
- **Recent Approvals:** Last 5 approved contractors with dates
- **Recent Rejections:** Last 5 rejected contractors with dates

## Approval Workflow

### Standard Approval Process

1. **Initial Review**
   - Check business details and ABN verification
   - Review company structure and addresses
   - Verify contact information

2. **Qualification Verification**
   - Open each IICRC certificate document
   - Verify certificate number with issuing organization
   - Check expiry dates (reject if expired)
   - Add verification notes
   - Click "Verify" for each qualification

3. **Insurance Verification**
   - Open each Certificate of Currency
   - Verify policy numbers with insurers
   - Check coverage amounts meet minimums:
     - Public Liability: $10,000,000 minimum
     - Professional Indemnity: $5,000,000 minimum
   - Check expiry dates (reject if expired or < 30 days)
   - Add verification notes
   - Click "Verify" for each policy

4. **Coverage Area Review**
   - Check for territory conflicts
   - Verify reasonable job volume expectations
   - Review subscription tier selection

5. **Final Approval**
   - Ensure all checklist items are complete
   - Add approval notes (optional)
   - Confirm approval in modal
   - System sends approval email to contractor

### What Happens After Approval

1. Contractor receives approval email with:
   - Login credentials for contractor portal
   - Subscription activation details
   - Next steps instructions

2. Subscription activation:
   - First billing date set
   - Territory activated in job rotation system

3. Contractor gains access to:
   - Contractor portal
   - Job notifications for their area
   - Performance dashboard

4. Status changed to "APPROVED" with timestamp

## Rejection Workflow

### When to Reject

- Insufficient or expired qualifications
- Insurance coverage below minimum requirements
- Insurance policies expired or expiring < 30 days
- ABN verification failed
- Territory conflict with existing contractor
- Incomplete documentation
- Fraudulent information detected

### Rejection Process

1. Click "Reject" on application
2. Select rejection reason from dropdown:
   - Insufficient qualifications
   - Insurance inadequate
   - Business verification failed
   - Service area conflict
   - Incomplete application
   - Other (specify)

3. Write detailed feedback for contractor (required, minimum 50 characters):
   - Be professional and constructive
   - Specify exactly what needs to be fixed
   - Provide actionable guidance

4. Add internal notes (optional):
   - Document reasons for admin team
   - Add any red flags or concerns

5. Confirm rejection

### What Happens After Rejection

1. Contractor receives rejection email with:
   - Reason for rejection
   - Detailed feedback
   - Instructions for reapplication

2. Application status changed to "REJECTED" with timestamp

3. Contractor data preserved for reference

4. Contractor can reapply after addressing issues

## Keyboard Shortcuts

- `A` - Approve current application (when viewing detail)
- `R` - Reject current application (when viewing detail)
- `N` - Next application (from list view)
- `Ctrl/Cmd + S` - Save admin notes

## Best Practices

### Verification Tips

1. **Document Review:**
   - Always open and review actual documents
   - Don't rely on metadata alone
   - Check for signs of tampering or forgery

2. **Expiry Management:**
   - Flag items expiring within 90 days
   - Reject if expiring within 30 days
   - Document expiry dates in notes

3. **Communication:**
   - Be professional and constructive in feedback
   - Provide specific, actionable guidance
   - Document all decisions in admin notes

4. **Consistency:**
   - Apply same standards to all contractors
   - Follow minimum coverage requirements
   - Document exceptions with clear reasoning

### Performance Goals

- **Average Approval Time:** < 5 business days
- **Approval Rate:** 75-85% (too high = lax standards, too low = unrealistic requirements)
- **Complete Verification:** 100% of qualifications and insurance verified before approval

## Security & Permissions

- Only users with `ADMIN` role can access verification dashboard
- All actions logged in audit trail
- Documents served through secure signed URLs
- PII handled according to privacy policy

## Troubleshooting

### Common Issues

**Problem:** Cannot verify qualification
- **Solution:** Check document URL is valid, contact tech support if 404 error

**Problem:** ABN not verifying
- **Solution:** Use ABN Lookup tool (abn.business.gov.au) to manually verify

**Problem:** Insurance coverage appears incorrect
- **Solution:** Review certificate carefully, contact contractor if discrepancy

**Problem:** Bulk approval failing
- **Solution:** Check all selected applications have complete verifications

## Support

For technical issues or questions:
- Email: admin-support@nrpg.com.au
- Internal Slack: #admin-support
- Documentation: /docs/admin-verification

## Changelog

### Version 1.0 (Current)
- Initial release
- Pending applications list
- Application detail review
- Qualification and insurance verification
- Bulk actions
- Analytics dashboard
- Coverage area viewer

### Upcoming Features
- Real-time notifications for new applications
- Automated ABN verification via API
- Automated insurance verification via API
- Advanced filtering and search
- Export to multiple formats (Excel, PDF)
- Mobile app for on-the-go verification
- Multi-admin assignment and workflow
