# Manual Testing Checklist: Contractor Verification System

**Version**: 1.0
**Date**: 2025-01-28
**Tester**: ___________________
**Environment**: ☐ Development ☐ Staging ☐ Production

---

## Pre-Testing Setup

- [ ] Test database configured
- [ ] Email service configured (or mock enabled)
- [ ] File storage accessible
- [ ] Test users created (contractor, admin, client)
- [ ] Browser cleared (cookies, cache, local storage)

---

## 1. Contractor Registration & Profile Setup

### Registration
- [ ] Can access `/auth/register`
- [ ] Can select "Contractor" role
- [ ] Email validation works
- [ ] Password requirements enforced (min 8 chars)
- [ ] Registration successful
- [ ] Verification email sent
- [ ] Redirected to contractor dashboard

### Basic Profile
- [ ] Profile form accessible
- [ ] Business name field works (required)
- [ ] ABN field: 11 digits, validation works
- [ ] ACN field: 9 digits, validation works (optional)
- [ ] Postcode: 4 digits, Australian format
- [ ] State dropdown shows Australian states only
- [ ] Can save profile
- [ ] Success message displayed
- [ ] Profile data persists after refresh

### License Information
- [ ] License number field works
- [ ] License state dropdown works
- [ ] License expiry date picker works
- [ ] Cannot set expiry date in past
- [ ] Document upload accepts PDF only
- [ ] File size limit enforced (< 10MB)
- [ ] Upload progress indicator works
- [ ] Document preview/download works
- [ ] Can save license information

### Company Profile
- [ ] Company description: min 50 characters
- [ ] Years in business: numeric, min 0
- [ ] Team size: numeric, min 1
- [ ] Service radius: 1-500 km
- [ ] Emergency available checkbox works
- [ ] Emergency response time shows when enabled
- [ ] Can upload company logo
- [ ] Logo preview displays correctly
- [ ] Can save company profile

### Service Areas
- [ ] Can add service area
- [ ] Postcode validation works
- [ ] State dropdown works
- [ ] Suburb field works
- [ ] Primary area toggle works
- [ ] Can add multiple service areas
- [ ] Can edit service area
- [ ] Can delete service area
- [ ] Service areas display in list
- [ ] Map visualization works (if implemented)

### Profile Submission
- [ ] Profile completeness indicator accurate
- [ ] Cannot submit when < 100% complete
- [ ] "Submit for Verification" button enabled at 100%
- [ ] Confirmation dialog appears
- [ ] Status changes to "SUBMITTED"
- [ ] Timestamp recorded
- [ ] Email notification sent
- [ ] Verification history entry created
- [ ] Cannot edit profile after submission (or edit = resubmit)

**Notes**: _______________________________________________________________

---

## 2. Admin Verification Process

### Admin Access
- [ ] Can login as admin user
- [ ] Can access `/dashboard/admin/contractors/verification`
- [ ] Contractor cannot access admin routes
- [ ] Client cannot access admin routes

### Verification Dashboard
- [ ] Statistics cards display correctly
- [ ] Counts accurate per status
- [ ] Tabs work: All, Pending, Incomplete, Submitted, Under Review, Approved, Rejected
- [ ] Contractors display in correct tab
- [ ] Search/filter functionality works
- [ ] Pagination works (if > 10 contractors)

### Contractor Review
- [ ] Can click contractor to view details
- [ ] All contractor information displayed
- [ ] Business details visible
- [ ] License information visible
- [ ] Documents viewable/downloadable
- [ ] Service areas displayed
- [ ] Verification history visible
- [ ] Profile completeness shown

### Verification Actions
**Mark Under Review:**
- [ ] Button visible and clickable
- [ ] Notes field optional
- [ ] Action confirmation required
- [ ] Status updates to "UNDER_REVIEW"
- [ ] reviewedBy and reviewedAt set
- [ ] History entry created
- [ ] Email sent to contractor

**Approve:**
- [ ] Button visible and clickable
- [ ] Notes field optional
- [ ] Action confirmation required
- [ ] Status updates to "APPROVED"
- [ ] isVerified flag set to true
- [ ] verificationDate timestamp set
- [ ] nrpgVerifiedAt timestamp set
- [ ] NRPG member ID generated (if applicable)
- [ ] History entry created
- [ ] Approval email sent with benefits list

**Reject:**
- [ ] Button visible and clickable
- [ ] Rejection reason required (min 10 chars)
- [ ] Notes field optional
- [ ] Action confirmation required
- [ ] Status updates to "REJECTED"
- [ ] rejectionReason stored
- [ ] History entry created
- [ ] Rejection email sent with reason

**Request Changes:**
- [ ] Button visible and clickable
- [ ] Notes required (specific changes)
- [ ] Action confirmation required
- [ ] Status updates to "INCOMPLETE"
- [ ] verificationNotes stored
- [ ] History entry created
- [ ] Changes requested email sent with details

**Notes**: _______________________________________________________________

---

## 3. Client Booking Flow

### Client Registration
- [ ] Can register as client
- [ ] Redirected to client dashboard

### Contractor Search
- [ ] Can access contractor directory
- [ ] Can search by postcode
- [ ] Can filter by service type
- [ ] Can filter by verified status
- [ ] Search results display correctly
- [ ] Verified badge visible on verified contractors

### Contractor Profile View
- [ ] Can view contractor profile
- [ ] Business information visible
- [ ] Service areas displayed
- [ ] Ratings/reviews visible (if any)
- [ ] Verified badge shown
- [ ] Profile view tracked after 3 seconds
- [ ] No duplicate tracking in same session

### Booking Request
- [ ] "Request Booking" or "Get Quote" button visible
- [ ] Booking form accessible
- [ ] Service type dropdown works
- [ ] Address fields work
- [ ] Postcode validation
- [ ] Date picker works
- [ ] Description field works
- [ ] Can submit booking request
- [ ] Booking created with status "PENDING"
- [ ] Client receives confirmation email
- [ ] Contractor receives notification email

### Booking Management (Contractor)
- [ ] Contractor can view pending bookings
- [ ] Can accept booking
- [ ] Status changes to "CONFIRMED"
- [ ] Client notified of acceptance
- [ ] Can reject booking (with reason)
- [ ] Can mark as "In Progress"
- [ ] Can mark as "Completed"
- [ ] completedAt timestamp set
- [ ] completedJobs counter incremented

**Notes**: _______________________________________________________________

---

## 4. Rating & Review System

### Submit Rating (Client)
- [ ] Rating prompt shown after booking completion
- [ ] Can select 1-5 stars
- [ ] Star selection visual feedback
- [ ] Comment field optional
- [ ] Can submit rating
- [ ] Rating created and linked to contractor
- [ ] Rating linked to booking
- [ ] averageRating recalculated
- [ ] Rating count incremented
- [ ] Contractor notified of new rating

### Rating Display
- [ ] Ratings visible on contractor profile
- [ ] Star rating displayed correctly
- [ ] Review comments visible
- [ ] Timestamp shown
- [ ] Rating distribution accurate
- [ ] Average rating calculated correctly

### Multiple Ratings
- [ ] Can submit multiple ratings (different bookings)
- [ ] Average updates correctly
- [ ] Distribution updates correctly
- [ ] All ratings visible in list
- [ ] Recent ratings highlighted

**Notes**: _______________________________________________________________

---

## 5. Contractor Analytics

### Analytics Dashboard Access
- [ ] Can access `/dashboard/contractor/analytics`
- [ ] Dashboard loads within 2 seconds
- [ ] No JavaScript errors in console

### Overview Metrics
- [ ] Profile views count displayed
- [ ] Profile views this month displayed
- [ ] Total bookings count displayed
- [ ] Completed bookings count displayed
- [ ] Active bookings count displayed
- [ ] Average rating displayed
- [ ] Total ratings count displayed
- [ ] Conversion rate calculated correctly

### Booking Statistics
- [ ] Total bookings accurate
- [ ] Completed bookings accurate
- [ ] Active bookings accurate
- [ ] Cancelled bookings accurate
- [ ] Bookings this month accurate
- [ ] Bookings last month accurate
- [ ] Completion rate calculated: (completed / total) * 100
- [ ] Cancellation rate calculated correctly
- [ ] Month-over-month growth calculated

### Rating Statistics
- [ ] Total ratings accurate
- [ ] Average rating accurate
- [ ] Ratings last 30 days accurate
- [ ] Rating distribution (1-5 stars) accurate
- [ ] Positive rating percentage calculated: (4+5 stars / total) * 100

### Performance Metrics
- [ ] Average response time displayed
- [ ] Completed jobs count accurate
- [ ] Quote request count accurate
- [ ] Quote acceptance rate accurate
- [ ] Direct booking requests accurate

### Recent Activity
- [ ] Recent bookings list shows last 10
- [ ] Recent ratings list shows last 10
- [ ] Dates formatted correctly
- [ ] Status badges displayed correctly

### Analytics Widget (Compact)
- [ ] Widget displays on dashboard
- [ ] Shows 4 key metrics
- [ ] "View Details" link works
- [ ] Loads quickly
- [ ] Responsive on mobile

**Notes**: _______________________________________________________________

---

## 6. Email Notifications

### Verification Submitted
- [ ] Email sent to contractor
- [ ] Subject correct
- [ ] Contractor name personalized
- [ ] Business name included
- [ ] Timeline mentioned (2-3 business days)
- [ ] Process steps outlined
- [ ] HTML and plain text versions
- [ ] Branding correct

### Under Review
- [ ] Email sent to contractor
- [ ] Subject correct
- [ ] Active review confirmed
- [ ] Timeline mentioned (1-2 business days)
- [ ] Branding correct

### Verification Approved
- [ ] Email sent to contractor
- [ ] Subject: "🎉 Verification Approved - Welcome to NRPG!"
- [ ] Congratulations message
- [ ] NRPG Member ID included (if applicable)
- [ ] List of NRPG benefits
- [ ] Next steps outlined
- [ ] Branding correct

### Verification Rejected
- [ ] Email sent to contractor
- [ ] Subject: "Verification Status Update - Action Required"
- [ ] Rejection reason included
- [ ] What to do next outlined
- [ ] Resubmission process explained
- [ ] Tone professional and supportive

### Changes Requested
- [ ] Email sent to contractor
- [ ] Subject: "Profile Updates Needed"
- [ ] Specific changes listed
- [ ] Tone encouraging
- [ ] Link to update profile
- [ ] Branding correct

### Booking Notifications
- [ ] Client receives confirmation email
- [ ] Contractor receives new booking notification
- [ ] Status update emails work
- [ ] All emails branded correctly

**Notes**: _______________________________________________________________

---

## 7. Error Handling & Edge Cases

### Validation
- [ ] Empty required fields show errors
- [ ] Invalid email format rejected
- [ ] Weak password rejected
- [ ] ABN format validation (11 digits)
- [ ] Postcode format validation (4 digits)
- [ ] File type validation (PDF only)
- [ ] File size validation (max 10MB)
- [ ] License expiry date validation (cannot be past)

### Duplicate Prevention
- [ ] Cannot register with existing email
- [ ] Cannot create profile with duplicate ABN
- [ ] Cannot create profile with duplicate license number
- [ ] Unique constraint errors handled gracefully

### Authorization
- [ ] Contractors cannot access admin routes
- [ ] Clients cannot access contractor routes
- [ ] Admins cannot verify own profile
- [ ] Cannot view other contractors' private data
- [ ] API endpoints enforce authentication

### Network Errors
- [ ] Network failure shows user-friendly error
- [ ] Retry option available
- [ ] Auto-save prevents data loss (if implemented)
- [ ] Loading states during API calls

### Concurrent Access
- [ ] Profile view tracking handles concurrent requests
- [ ] No race conditions in counter increments
- [ ] Database constraints enforced

**Notes**: _______________________________________________________________

---

## 8. Mobile Responsiveness

### Small Mobile (375px - iPhone)
- [ ] All forms accessible
- [ ] No horizontal scrolling
- [ ] Touch targets adequate size (min 44x44px)
- [ ] Text readable without zooming
- [ ] Images scale correctly
- [ ] Navigation accessible
- [ ] Document upload works
- [ ] Analytics cards stack vertically

### Tablet (768px - iPad)
- [ ] Two-column layouts work
- [ ] Tables responsive (scroll or stack)
- [ ] Modal dialogs fit screen
- [ ] Forms remain usable
- [ ] Charts/graphs scale appropriately

### Landscape Orientation
- [ ] Forms accessible in landscape
- [ ] Navigation works in landscape
- [ ] Content doesn't overflow

**Notes**: _______________________________________________________________

---

## 9. Performance

### Page Load Times
- [ ] Homepage < 2 seconds
- [ ] Contractor profile < 2 seconds
- [ ] Analytics dashboard < 2 seconds
- [ ] Admin dashboard < 2 seconds

### API Response Times
- [ ] GET endpoints < 500ms
- [ ] POST endpoints < 1000ms
- [ ] Document upload < 5 seconds (10MB file)

### Resource Optimization
- [ ] Images compressed and optimized
- [ ] No oversized assets
- [ ] CSS/JS minified in production
- [ ] Lazy loading implemented where appropriate

### Browser Console
- [ ] No JavaScript errors
- [ ] No CSS warnings
- [ ] No 404 errors for resources
- [ ] No CORS errors

**Notes**: _______________________________________________________________

---

## 10. Accessibility

### Keyboard Navigation
- [ ] All forms accessible via keyboard
- [ ] Tab order logical
- [ ] Can submit forms with Enter
- [ ] Modals closeable with Esc
- [ ] Focus indicators visible

### Screen Reader
- [ ] Form labels associated with inputs
- [ ] Alt text on images
- [ ] ARIA labels where appropriate
- [ ] Headings in logical order
- [ ] Status messages announced

### Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1)
- [ ] Interactive elements distinguishable
- [ ] Error messages clearly visible
- [ ] Success messages clearly visible

**Notes**: _______________________________________________________________

---

## Test Summary

**Total Checks**: _______
**Passed**: _______
**Failed**: _______
**Skipped**: _______

### Critical Issues Found
1. ________________________________________________________________
2. ________________________________________________________________
3. ________________________________________________________________

### Non-Critical Issues Found
1. ________________________________________________________________
2. ________________________________________________________________
3. ________________________________________________________________

### Recommendations
1. ________________________________________________________________
2. ________________________________________________________________
3. ________________________________________________________________

### Overall Assessment
☐ Ready for production
☐ Minor fixes needed
☐ Major fixes required
☐ Not ready for production

**Tester Signature**: _____________________ **Date**: ___________

---

**Next Steps**: ___________________________________________________________

___________________________________________________________________________

___________________________________________________________________________
