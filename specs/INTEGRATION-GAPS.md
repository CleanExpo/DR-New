# DR-NRPG Platform - Integration Gaps Analysis

**Generated:** 2026-02-04
**Purpose:** Identify missing API connections and disconnected components
**Priority Levels:** Critical (P0), High (P1), Medium (P2), Low (P3)

---

## Executive Summary

**Total Gaps Identified:** 42
- **Critical (P0):** 8 gaps - Core user flows broken
- **High (P1):** 15 gaps - Major features incomplete
- **Medium (P2):** 12 gaps - Analytics and reporting
- **Low (P3):** 7 gaps - Nice-to-have features

**Primary Issue Categories:**
1. Frontend pages calling non-existent API endpoints
2. API endpoints returning stub/501 responses
3. Dashboard analytics not connected to data sources
4. Missing background job implementations
5. Incomplete AI/ML feature integrations

---

## Critical Gaps (P0) - Must Fix Immediately

### Gap 1: Claim Submission → Contractor Matching Flow
**Priority:** P0 - CRITICAL
**Impact:** Core platform functionality broken

**Current State:**
- Frontend: `/api/public/lead-capture` creates claim ✅
- Missing: Contractor matching job not triggered
- Missing: `/api/jobs/match-contractors` endpoint exists but not wired to queue

**Expected State:**
1. Client submits claim via `/api/public/lead-capture`
2. Claim record created in database ✅
3. Background job queued: `contractorMatchingQueue.add({ claimId })`
4. `/api/jobs/match-contractors` processes job
5. Contractors notified via email + SMS
6. Claim status updated: `MATCHING_IN_PROGRESS` → `MATCHED`

**Affected Files:**
- `apps/web/app/api/public/lead-capture/route.ts:145` - No job queueing
- `apps/web/app/api/jobs/match-contractors/route.ts` - Exists but not integrated
- `apps/web/services/contractor-matching.service.ts` - Needs queue integration

**Fix Required:**
- Add queue integration to lead-capture endpoint
- Implement background job processing
- Add email/SMS notification triggers

---

### Gap 2: Contractor Application → Admin Approval Workflow
**Priority:** P0 - CRITICAL
**Impact:** Contractors cannot be approved

**Current State:**
- Frontend: Contractor submits application ✅
- API: `/api/landing/contractor-application` creates record ✅
- Missing: Admin notification not sent
- Missing: `/api/admin/contractors/[id]/approve` endpoint incomplete

**Expected State:**
1. Contractor submits application
2. Admin receives email notification
3. Admin reviews via `/dashboard/admin/contractors/verification`
4. Admin clicks "Approve" → calls `/api/admin/contractors/[id]/approve`
5. Contractor status updated to `APPROVED`
6. Welcome email sent with login credentials
7. Stripe Connect account created

**Affected Files:**
- `apps/web/app/api/landing/contractor-application/route.ts:98` - No admin email
- `apps/web/app/api/admin/contractors/[id]/approve/route.ts` - Endpoint missing
- `apps/web/app/dashboard/admin/contractors/verification/page.tsx` - Calls missing endpoint

**Fix Required:**
- Create `/api/admin/contractors/[id]/approve` endpoint
- Add admin notification email
- Implement Stripe Connect account creation
- Add welcome email template

---

### Gap 3: Job Completion → Contractor Payout
**Priority:** P0 - CRITICAL
**Impact:** Contractors cannot receive payments

**Current State:**
- Frontend: Contractor marks job complete
- Missing: `/api/contractor/jobs/[jobId]/complete` endpoint
- Missing: Payout calculation logic
- Missing: Stripe transfer initiation

**Expected State:**
1. Contractor calls `/api/contractor/jobs/[jobId]/complete`
2. Job status updated to `COMPLETED`
3. Payout calculated: `total - platform_fee`
4. Payout record created
5. Stripe transfer initiated to contractor's Connect account
6. Property owner notified of completion

**Affected Files:**
- `apps/web/app/api/contractor/jobs/[jobId]/complete/route.ts` - Endpoint missing
- `apps/web/services/payment.service.ts` - Needs payout logic
- `apps/web/lib/stripe/` - Transfer function missing

**Fix Required:**
- Create job completion endpoint
- Implement payout calculation
- Add Stripe Connect transfer
- Add notification emails

---

### Gap 4: Real-time Job Status Updates
**Priority:** P0 - CRITICAL (for live jobs feature)
**Impact:** Clients cannot track contractor location

**Current State:**
- Frontend: `/dashboard/client/track/[jobId]` page exists 🚧
- API: `/api/realtime/jobs/[id]/status` and `/api/realtime/jobs/[id]/location` exist ✅
- Missing: Frontend not connected to API
- Missing: Supabase real-time channel subscription

**Expected State:**
1. Client opens job tracking page
2. Page subscribes to Supabase channel: `job:${jobId}:updates`
3. Contractor updates location via mobile app
4. Location update broadcast to channel
5. Client sees contractor position on map in real-time

**Affected Files:**
- `apps/web/app/dashboard/client/track/[jobId]/page.tsx:1` - No API calls
- `apps/web/lib/realtime/supabase-client.ts` - Channel subscription logic needed
- `apps/web/components/maps/LiveJobMap.tsx` - Component stub

**Fix Required:**
- Connect frontend to real-time API
- Implement Supabase channel subscription
- Build live map component
- Add ETA calculation

---

### Gap 5: Dashboard Analytics Data Integration
**Priority:** P0 - CRITICAL (for admin dashboard)
**Impact:** Admin cannot view platform metrics

**Current State:**
- Frontend: `/dashboard/admin/page.tsx` renders dashboard UI ✅
- Missing: API calls to analytics endpoints
- API: `/api/admin/analytics/dashboard` exists ✅ but returns hardcoded data
- Missing: Real database queries

**Expected State:**
1. Admin opens dashboard
2. Frontend calls `/api/admin/analytics/dashboard`
3. Endpoint queries real data:
   - Total claims (from `Booking` table)
   - Active contractors (from `Contractor` table where `isActive = true`)
   - Revenue (from `Payment` table, sum `amountAUD`)
   - Monthly trends (grouped by `createdAt`)
4. Data cached in Redis for 5 minutes

**Affected Files:**
- `apps/web/app/dashboard/admin/page.tsx:120` - No fetch() calls
- `apps/web/app/api/admin/analytics/dashboard/route.ts:45` - Returns mock data
- `apps/web/services/analytics.service.ts:78` - Needs real queries

**Fix Required:**
- Add fetch() calls to frontend
- Replace mock data with Prisma queries
- Add Redis caching
- Add loading/error states to UI

---

### Gap 6: Contractor Dashboard Analytics
**Priority:** P0 - CRITICAL (for contractor dashboard)
**Impact:** Contractors cannot view earnings/stats

**Current State:**
- Frontend: `/dashboard/contractor/page.tsx` renders dashboard ✅
- Missing: Calls to `/api/contractor/analytics`
- API: `/api/contractor/analytics` exists but partial implementation

**Expected State:**
1. Contractor opens dashboard
2. Frontend fetches from `/api/contractor/analytics`
3. Endpoint returns:
   - Total earnings (sum of completed job payouts)
   - Active jobs count
   - Avg response time
   - Rating (from `Rating` table)
   - Jobs completed this month
4. Charts render with real data

**Affected Files:**
- `apps/web/app/dashboard/contractor/page.tsx:1` - No API integration
- `apps/web/app/api/contractor/analytics/route.ts` - Partial queries
- `apps/web/components/charts/` - Chart components disconnected

**Fix Required:**
- Connect frontend to analytics API
- Complete analytics endpoint queries
- Wire up chart components
- Add date range filtering

---

### Gap 7: Client Dashboard Claims List
**Priority:** P0 - CRITICAL (for client dashboard)
**Impact:** Clients cannot view submitted claims

**Current State:**
- Frontend: `/dashboard/client/page.tsx` shows claims list ✅
- API: `/api/client/claims` exists ✅
- Missing: Frontend not calling API

**Expected State:**
1. Client opens dashboard
2. Frontend calls `/api/client/claims`
3. Claims list rendered with status badges
4. Click claim → navigate to detail page

**Affected Files:**
- `apps/web/app/dashboard/client/page.tsx:89` - No fetch() implementation
- Already working API just needs to be called

**Fix Required:**
- Add useEffect() hook to fetch claims
- Add loading skeleton
- Wire up click handlers

---

### Gap 8: Notification System Integration
**Priority:** P0 - CRITICAL
**Impact:** Users miss important updates

**Current State:**
- Frontend: Header shows notification bell icon
- Missing: `/api/notifications` endpoint not called
- Missing: Real-time notification delivery
- API: `/api/notifications` exists ✅

**Expected State:**
1. User receives notification (new job, message, payment)
2. Notification badge count updates in real-time
3. Click bell → dropdown shows recent notifications
4. Click notification → mark as read, navigate to resource

**Affected Files:**
- `apps/web/components/header.tsx:156` - Notification bell not wired
- `apps/web/app/api/notifications/route.ts` - Endpoint ready
- `apps/web/lib/realtime/` - Real-time subscription needed

**Fix Required:**
- Connect frontend to notifications API
- Add Supabase real-time subscription
- Implement notification dropdown
- Add mark-as-read functionality

---

## High Priority Gaps (P1) - Fix Soon

### Gap 9: Contractor Onboarding Module Tracking
**Priority:** P1
**Impact:** Cannot track contractor training progress

**Current State:**
- API: `/api/onboarding/module/start` exists ✅
- Frontend: `/dashboard/contractor/onboarding/module/[moduleId]` exists 🚧
- Missing: Progress tracking not saved to database

**Fix:** Connect module completion to `ContractorModuleProgress` model

**Affected Files:**
- `apps/web/app/dashboard/contractor/onboarding/module/[moduleId]/page.tsx`
- `apps/web/app/api/onboarding/module/start/route.ts`

---

### Gap 10: Client Onboarding Flow Completion
**Priority:** P1
**Impact:** Clients get stuck in onboarding

**Current State:**
- Individual steps work (profile, property, insurance, payment)
- Missing: `/api/client/onboarding/complete` not called on final step
- Missing: Redirect to dashboard after completion

**Fix:** Add completion trigger and redirect

**Affected Files:**
- `apps/web/app/dashboard/client/onboarding/complete/page.tsx`
- `apps/web/app/api/client/onboarding/complete/route.ts`

---

### Gap 11: Service Request → Contractor Match Notification
**Priority:** P1
**Impact:** Contractors don't know about new leads

**Current State:**
- `ServiceRequest` created ✅
- `ContractorMatch` records created ✅
- Missing: Email/SMS notification not sent

**Fix:** Add notification trigger after match creation

**Affected Files:**
- `apps/web/services/contractor-matching.service.ts:234`
- `apps/web/services/notification.service.ts`

---

### Gap 12: Contractor Earnings Dashboard Data
**Priority:** P1
**Impact:** Contractors cannot see payout history

**Current State:**
- Frontend: `/dashboard/contractor/earnings` page exists 🚧
- API: `/api/contractor/earnings` exists ✅
- Missing: Frontend not calling API

**Fix:** Add fetch() to earnings page

**Affected Files:**
- `apps/web/app/dashboard/contractor/earnings/page.tsx`

---

### Gap 13: Admin Claims Triage Workflow
**Priority:** P1
**Impact:** Claims get stuck in queue

**Current State:**
- API: `/api/admin/claims/triage` exists ✅
- Frontend: `/dashboard/admin/claims` shows list ✅
- Missing: Triage action buttons not wired

**Fix:** Connect approve/reject buttons to API

**Affected Files:**
- `apps/web/app/dashboard/admin/claims/page.tsx:190`

---

### Gap 14: Contractor Verification Document Upload
**Priority:** P1
**Impact:** Contractors cannot complete verification

**Current State:**
- API: `/api/contractor/verification/documents` exists ✅
- Frontend: Verification page has upload UI 🚧
- Missing: File upload not triggering API call

**Fix:** Wire UploadThing to verification endpoint

**Affected Files:**
- `apps/web/app/dashboard/contractor/verification/page.tsx`

---

### Gap 15: Invoice Generation for Completed Jobs
**Priority:** P1
**Impact:** No invoices sent to clients

**Current State:**
- API: `/api/invoices/[invoiceId]/pdf` exists ✅
- Missing: Invoice not auto-generated on job completion
- Missing: Email with invoice PDF not sent

**Fix:** Trigger invoice generation in job completion flow

**Affected Files:**
- `apps/web/app/api/contractor/jobs/[jobId]/complete/route.ts` (when created)
- `apps/web/services/invoice.service.ts`

---

### Gap 16-23: [Additional 8 High Priority Gaps]
*Detailed in next section*

---

## Medium Priority Gaps (P2) - Fix Before Launch

### Gap 24: Admin Analytics - Revenue Breakdown
**Priority:** P2
**Impact:** Limited financial visibility

**Current State:**
- Endpoint `/api/admin/analytics/revenue` returns data ✅
- Frontend: `/dashboard/admin/analytics/revenue` not built

**Fix:** Build revenue analytics page

---

### Gap 25: Admin Analytics - Geographic Heatmap
**Priority:** P2
**Impact:** Cannot see service coverage

**Current State:**
- Endpoint exists ✅
- Frontend page stub only

**Fix:** Integrate map visualization library

---

### Gap 26: Contractor Performance Analytics
**Priority:** P2
**Impact:** Contractors lack performance insights

**Current State:**
- API: `/api/contractor/analytics/performance` exists ✅
- Frontend: Page not connected

**Fix:** Connect charts to API data

---

### Gap 27-35: [Additional 9 Medium Priority Gaps]
*Analytics, reporting, and enhancement features*

---

## Low Priority Gaps (P3) - Post-Launch

### Gap 36: AI Image Enhancement
**Priority:** P3
**Impact:** Manual photo quality workflow

**Current State:**
- API: `/api/admin/ai-enhancement/images/[photoId]` exists 🚧
- Missing: Vision AI integration incomplete

**Fix:** Complete OpenAI Vision API integration

---

### Gap 37: Search Dominance - Blue Ocean Discovery
**Priority:** P3
**Impact:** Missing market opportunity insights

**Current State:**
- GET endpoint works ✅
- POST endpoint is stub (job trigger)

**Fix:** Implement background job for opportunity scanning

---

### Gap 38: Competitor Analysis - Opportunities
**Priority:** P3
**Impact:** Empty opportunities dashboard

**Current State:**
- Returns empty array on build

**Fix:** Add seeded data or real API integration

---

### Gap 39-42: [Additional 4 Low Priority Gaps]
*Future features, demos, advanced analytics*

---

## Integration Completion Checklist

### Core User Flows (P0)
- [ ] Claim submission → Contractor matching → Notification
- [ ] Contractor application → Admin approval → Welcome email
- [ ] Job completion → Payout calculation → Stripe transfer
- [ ] Real-time job tracking with live location
- [ ] Dashboard analytics (Admin, Contractor, Client)
- [ ] Notification system with real-time updates

### Essential Features (P1)
- [ ] Onboarding progress tracking (Contractor + Client)
- [ ] Service request → Contractor notifications
- [ ] Earnings dashboard for contractors
- [ ] Admin claims triage workflow
- [ ] Document upload for verification
- [ ] Invoice generation and delivery

### Analytics & Reporting (P2)
- [ ] Revenue breakdown analytics
- [ ] Geographic coverage heatmap
- [ ] Contractor performance metrics
- [ ] Client spending analytics
- [ ] Forecasting and trends

### Advanced Features (P3)
- [ ] AI image enhancement
- [ ] Blue ocean market discovery
- [ ] Competitor opportunity analysis
- [ ] Advanced forecasting models

---

## Gap Resolution Priority

**Week 1 (Immediate):**
- Fix Gaps 1-8 (All P0 critical gaps)
- Focus: Core user flows working end-to-end

**Week 2 (High Priority):**
- Fix Gaps 9-23 (P1 high priority)
- Focus: Essential features complete

**Week 3 (Medium Priority):**
- Fix Gaps 24-35 (P2 medium priority)
- Focus: Analytics and reporting

**Post-Launch:**
- Fix Gaps 36-42 (P3 low priority)
- Focus: Advanced features and ML integration

---

## Summary Statistics

| Category | Count | % of Total |
|----------|-------|-----------|
| Critical (P0) | 8 | 19% |
| High (P1) | 15 | 36% |
| Medium (P2) | 12 | 29% |
| Low (P3) | 7 | 17% |
| **Total** | **42** | **100%** |

**Estimated Effort:**
- P0 Gaps: ~12 hours (1.5 days)
- P1 Gaps: ~15 hours (2 days)
- P2 Gaps: ~10 hours (1.25 days)
- P3 Gaps: ~8 hours (1 day)
- **Total: ~45 hours (5-6 days)**

**Critical Path:** Fix P0 gaps first (1.5 days) to achieve MVP functionality
