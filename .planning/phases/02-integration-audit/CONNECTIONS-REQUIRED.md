# Required Connections — Phase 5 Work Items

Generated from: GAP-REPORT.md (2026-04-12)
Source audit: 02-01-RESULTS.md (345 routes)

Total work items: 82
- P0 Critical: 18
- P1 High: 32
- P2 Medium: 48 (abbreviated entries)
- P3 Low/Admin: 36 (abbreviated entries)
- Missing routes to create: 8

---

## P0 — Critical (must fix before production)

These gaps block core business flows: payment, subscription, workspace creation, contractor matching, and job completion.

---

### CONN-001
- **Route:** `/api/subscription/checkout` POST
- **Problem:** Contractors cannot purchase a workspace subscription. The Stripe checkout session creation route is fully implemented (creates customer, generates checkout URL for BASIC/PRO/ENTERPRISE tiers) but no UI page calls it. The subscription monetisation funnel is completely blocked.
- **Fix:** Add a subscription plan selection page that posts `{ workspaceId, tier }` to this route and redirects to the returned Stripe checkout URL.
- **File to create:** `apps/web/app/dashboard/contractor/subscription/page.tsx`
- **File to modify:** `apps/web/app/dashboard/contractor/onboarding/checklist/page.tsx` — add "Subscribe" step that navigates to subscription page
- **Trigger:** Contractor selects a plan and clicks "Subscribe" button
- **Effort estimate:** 90 min

---

### CONN-002
- **Route:** `/api/subscription/upgrade` POST
- **Problem:** Contractors cannot upgrade or downgrade their subscription tier. Proration calculation and Stripe subscription update are fully implemented. No upgrade/downgrade UI exists.
- **Fix:** Add a subscription management section to contractor settings that posts `{ workspaceId, newTier }` to this route.
- **File to create:** `apps/web/app/dashboard/contractor/subscription/manage/page.tsx`
- **File to modify:** `apps/web/app/dashboard/contractor/settings/page.tsx` (if exists) or create settings page
- **Trigger:** Contractor clicks "Upgrade Plan" or "Change Plan"
- **Effort estimate:** 60 min

---

### CONN-003
- **Route:** `/api/workspace/create` POST
- **Problem:** Workspace creation is the prerequisite step before subscription checkout but is not called during contractor onboarding. Contractors go directly to Stripe onboarding (`/api/contractor/stripe/connect/onboard`) without creating a workspace record first. The `createWorkspace` service is fully implemented.
- **Fix:** Add workspace creation as Step 1 of contractor onboarding, before Stripe Connect setup. Post `{ businessName, abnNumber, initialTier }`.
- **File to modify:** `apps/web/app/dashboard/contractor/onboarding/page.tsx` — add workspace creation step
- **File to modify:** `apps/web/app/dashboard/contractor/onboarding/checklist/page.tsx` — add workspace check
- **Trigger:** Contractor completes business profile step; workspace created automatically
- **Effort estimate:** 45 min

---

### CONN-004
- **Route:** `/api/admin/tenant-billing/checkout` POST
- **Problem:** Admin cannot initiate tenant subscription payments. The `createTenantCheckoutSession` function is fully implemented. No admin panel provides tenant billing management.
- **Fix:** Add a billing management panel to the admin tenants detail page. Post `{ planId, returnUrl }` to create a Stripe checkout session.
- **File to modify:** `apps/web/app/dashboard/admin/tenants/page.tsx` — add billing actions per tenant
- **Trigger:** Admin clicks "Setup Billing" or "Manage Subscription" for a tenant
- **Effort estimate:** 60 min

---

### CONN-005
- **Route:** `/api/admin/tenant-billing/portal` GET
- **Problem:** Admin cannot redirect tenants to the Stripe customer portal for self-service billing management.
- **Fix:** Add "Open Billing Portal" button in admin tenant detail that calls this route and redirects to the returned portal URL.
- **File to modify:** `apps/web/app/dashboard/admin/tenants/page.tsx`
- **Trigger:** Admin clicks "Open Billing Portal" for a tenant
- **Effort estimate:** 30 min

---

### CONN-006
- **Route:** `/api/admin/tenant-billing/status` GET
- **Problem:** Admin has no visibility into tenant subscription health (active, past due, cancelled). Subscription status panel shows no data.
- **Fix:** Fetch billing status per tenant and display in tenant listing or detail panel.
- **File to modify:** `apps/web/app/dashboard/admin/tenants/page.tsx`
- **Trigger:** Page load for admin tenants section
- **Effort estimate:** 30 min

---

### CONN-007
- **Route:** `/api/contractor/jobs/[jobId]/complete` POST
- **Problem:** Contractors cannot mark a job as complete through the UI. This route triggers `triggerPayoutForBooking` and sends the completion email. Without it, jobs stay perpetually in progress and contractors never receive payouts.
- **Fix:** Add a "Mark Complete" button to the contractor's active jobs view. Post `{ completionNotes, completionPhotos, requestReview }`.
- **File to modify:** `apps/web/app/dashboard/contractor/page.tsx` — add completion action to active project cards
- **File to create:** `apps/web/hooks/useJobCompletion.ts` — reusable hook wrapping this POST
- **Trigger:** Contractor clicks "Mark Job Complete" on an active job card
- **Effort estimate:** 60 min

---

### CONN-008
- **Route:** `/api/contractor/bids/[matchId]/respond` POST
- **Problem:** Contractors cannot formally accept or decline a claim match. The `escalateToNextContractor` escalation function runs on DECLINED. Without this, the contractor matching flow stalls — matches are created but never actioned.
- **Fix:** Add Accept/Decline/Counter buttons to the contractor's bids list. Post `{ response: 'ACCEPTED'|'DECLINED'|'COUNTER_OFFER', counterAmount?, counterTimeline?, message? }`.
- **File to modify:** `apps/web/app/dashboard/contractor/available-requests/[requestId]/page.tsx`
- **File to create:** `apps/web/hooks/useContractorBidResponse.ts`
- **Trigger:** Contractor views a bid detail page and clicks Accept/Decline/Counter
- **Effort estimate:** 75 min

---

### CONN-009
- **Route:** `/api/contractor/claims/[claimId]/respond` GET, POST
- **Problem:** Contractors cannot view or respond to claims assigned directly to them (separate from bid responses). Claim response covers the contractor's formal acceptance of claim assignment.
- **Fix:** Add claim response UI to contractor's active claims section.
- **File to modify:** `apps/web/app/dashboard/contractor/page.tsx` — add claim response action
- **Trigger:** Contractor views an assigned claim and responds
- **Effort estimate:** 60 min

---

### CONN-010
- **Route:** `/api/contractor/payout-settings` GET, PUT
- **Problem:** Contractors cannot view or change their payout schedule (WEEKLY, BI_WEEKLY, MONTHLY) or view their Stripe Connect payout status beyond the initial onboarding check.
- **Fix:** Add payout settings panel to contractor profile or earnings page.
- **File to modify:** `apps/web/app/dashboard/contractor/earnings/page.tsx` — add settings section
- **File to create:** `apps/web/hooks/usePayoutSettings.ts`
- **Trigger:** Page load (GET) and settings form submit (PUT)
- **Effort estimate:** 45 min

---

### CONN-011
- **Route:** `/api/payments` GET
- **Problem:** Neither clients nor contractors have a unified payment history view. The full payments list with role-based filtering (client: own payments, contractor: received, admin: all) is implemented but has no UI consumer.
- **Fix:** Add payment history section to client and contractor dashboards.
- **File to modify:** `apps/web/app/dashboard/client/payments/page.tsx` — supplement with `/api/payments` call for comprehensive history
- **File to modify:** `apps/web/app/dashboard/contractor/earnings/page.tsx` — add payment history section
- **Trigger:** Page load
- **Effort estimate:** 60 min

---

### CONN-012
- **Route:** `/api/admin/claims/match` GET, POST
- **Problem:** Admin cannot view contractor match scores for claims or manually re-run the matching algorithm. When automatic matching produces poor results, admin has no UI-based intervention.
- **Fix:** Add matching panel to admin claim detail page. GET shows match scores; POST triggers re-match.
- **File to modify:** `apps/web/app/dashboard/admin/claims/[claimId]/page.tsx` — add matching panel
- **Trigger:** Page load (GET match scores), "Re-run Matching" button (POST)
- **Effort estimate:** 60 min

---

### CONN-013
- **Route:** `/api/admin/claims/triage` GET, POST
- **Problem:** Inbound claims have no admin triage queue. Claims cannot be prioritised or categorised before dispatch. This creates backlog risk in high-volume scenarios.
- **Fix:** Create a claim triage page in admin claims section.
- **File to create:** `apps/web/app/dashboard/admin/claims/triage/page.tsx`
- **Trigger:** Page load (GET triage queue), admin categorises/prioritises claims (POST)
- **Effort estimate:** 90 min

---

### CONN-014
- **Route:** `/api/admin/users` GET and `/api/admin/users/[id]` GET, PATCH, DELETE
- **Problem:** Admin has no user management table. Cannot view, edit, or deactivate users. Both routes are fully implemented with pagination, role filtering, and search.
- **Fix:** Create admin user management page.
- **File to create:** `apps/web/app/dashboard/admin/users/page.tsx`
- **File to create:** `apps/web/app/dashboard/admin/users/[userId]/page.tsx`
- **Trigger:** Page load (GET list), user detail navigation (GET single), form submit (PATCH), delete action (DELETE)
- **Effort estimate:** 120 min

---

### CONN-015
- **Route:** `/api/admin/payments/reconcile` GET
- **Problem:** Finance team has no payment reconciliation view. The `reconcilePayments` and `getReconciliationIssues` functions are fully implemented. Admin financials page exists but does not surface this report.
- **Fix:** Add reconciliation tab or panel to admin financials page.
- **File to modify:** `apps/web/app/dashboard/admin/financials/page.tsx`
- **Trigger:** Page load or "Run Reconciliation" button with date range picker
- **Effort estimate:** 60 min

---

### CONN-016
- **Route:** `/api/jobs/contractor-matching` GET, POST
- **Problem:** When automatic contractor matching fails (queue error, no matches), admin has no UI to manually trigger re-matching for a job/claim. The `matchContractorsToBooking` function runs via background job queue.
- **Fix:** Add "Re-run Matching" action to admin job detail page.
- **File to modify:** `apps/web/app/dashboard/admin/claims/[claimId]/page.tsx`
- **Trigger:** Admin clicks "Trigger Matching" with optional `force: true` flag
- **Effort estimate:** 30 min

---

### CONN-017
- **Route:** `/api/admin/service-requests/[id]/callout/release` POST
- **Problem:** Clients who have paid a callout fee cannot cancel and get a release/refund through the UI. The checkout (`/callout/checkout`) and verify (`/callout/verify`) are connected but release is not.
- **Fix:** Add cancel/release action to service request detail page.
- **File to modify:** `apps/web/components/payments/callout-checkout-panel.tsx` — add cancel option after payment
- **Trigger:** Client clicks "Cancel Callout" within release window
- **Effort estimate:** 45 min

---

### CONN-018
- **Route:** `/api/admin/analytics/revenue` GET
- **Problem:** Admin has no revenue analytics view. All other analytics sections (benchmarks, comparison, trends, geographic) are connected. Revenue data is invisible to admin.
- **Fix:** Create admin revenue analytics page.
- **File to create:** `apps/web/app/dashboard/admin/analytics/revenue/page.tsx`
- **Trigger:** Page load
- **Effort estimate:** 60 min

---

## P1 — High (dashboard section shows no data or errors)

---

### CONN-019
- **Route:** `/api/auth/reset-password` POST (initiate), PUT (set new password)
- **Problem:** Users who forget their password have no self-service recovery flow. No reset-password UI page exists.
- **Fix:** Create password reset pages (request and set-new-password).
- **File to create:** `apps/web/app/auth/reset-password/page.tsx`
- **File to create:** `apps/web/app/auth/reset-password/confirm/page.tsx`
- **Effort estimate:** 60 min

---

### CONN-020
- **Route:** `/api/client/subscription` GET, PUT
- **Problem:** Clients cannot view or manage their subscription from the dashboard. No subscription management section exists in the client dashboard.
- **Fix:** Add subscription management panel to client settings.
- **File to create:** `apps/web/app/dashboard/client/subscription/page.tsx`
- **Effort estimate:** 45 min

---

### CONN-021
- **Route:** `/api/invoices` GET and `/api/invoices/[invoiceId]` GET, DELETE
- **Problem:** No invoice listing page. Client payments page has PDF download but no invoice list. Users cannot view their invoice history.
- **Fix:** Add invoice list section to client payments page or create dedicated invoices page.
- **File to modify:** `apps/web/app/dashboard/client/payments/page.tsx` — add invoice list section calling `/api/invoices`
- **Effort estimate:** 45 min

---

### CONN-022
- **Route:** `/api/payments/[id]` GET, PATCH and `/api/payments/[id]/refund` POST
- **Problem:** No payment detail page exists. Admin and clients cannot view payment breakdowns or initiate refunds through the UI.
- **Fix:** Create payment detail page with refund action.
- **File to create:** `apps/web/app/dashboard/payments/[id]/page.tsx`
- **Effort estimate:** 60 min

---

### CONN-023
- **Route:** `/api/payments/booking/[bookingId]` GET, POST and `/api/payments/payout/[bookingId]` GET, POST
- **Problem:** Booking and payout detail views are blank. Contractor earnings page shows totals but no per-booking breakdown.
- **Fix:** Add per-booking payment/payout detail to job completion flow and earnings page.
- **File to modify:** `apps/web/app/dashboard/contractor/earnings/page.tsx`
- **Effort estimate:** 60 min

---

### CONN-024
- **Route:** `/api/bookings/[id]` GET, PATCH, DELETE
- **Problem:** Booking detail management (view, update, cancel) has no UI page. Bookings are created via booking forms but cannot be managed afterwards.
- **Fix:** Create booking detail page.
- **File to create:** `apps/web/app/dashboard/bookings/[id]/page.tsx`
- **Effort estimate:** 75 min

---

### CONN-025
- **Route:** `/api/bookings/[id]/assign` POST, DELETE
- **Problem:** Bookings created by clients are not assigned to contractors via UI. Admin lacks booking assignment tool.
- **Fix:** Add assignment panel to booking detail page.
- **File to modify:** `apps/web/app/dashboard/bookings/[id]/page.tsx` (from CONN-024)
- **Effort estimate:** 30 min (depends on CONN-024)

---

### CONN-026
- **Route:** `/api/service-requests/[id]/matches` GET
- **Problem:** Match list for a service request is invisible to clients and admin. Client claim detail shows contractor info but not the full match ranking.
- **Fix:** Add matches panel to service request detail.
- **File to modify:** `apps/web/app/dashboard/client/claims/[claimId]/page.tsx` — add contractor matches section
- **Effort estimate:** 30 min

---

### CONN-027
- **Route:** `/api/jobs/[id]/documents` POST
- **Problem:** Job detail page shows job information but has no document upload widget. Contractors cannot attach documents to a job.
- **Fix:** Add document upload component to job detail page.
- **File to modify:** `apps/web/app/dashboard/jobs/[id]/page.tsx`
- **Effort estimate:** 30 min

---

### CONN-028
- **Route:** `/api/contractor/stats` GET
- **Problem:** Contractor dashboard summary section shows no stats. The analytics dashboard (deeper charts) is connected, but the lightweight stats summary for the main dashboard header is missing.
- **Fix:** Create useContractorStats hook and wire to dashboard header.
- **File to create:** `apps/web/hooks/useContractorStats.ts`
- **File to modify:** `apps/web/app/dashboard/contractor/page.tsx` — import and render stats
- **Effort estimate:** 30 min

---

### CONN-029
- **Route:** `/api/workspace/invite` POST
- **Problem:** Contractors on PRO/ENTERPRISE plans cannot invite team members. No team management or settings page exists. Seat-limited invites and email delivery are fully implemented.
- **Fix:** Create workspace team management page.
- **File to create:** `apps/web/app/dashboard/contractor/workspace/team/page.tsx`
- **Effort estimate:** 60 min

---

### CONN-030
- **Route:** `/api/workspace/usage` GET
- **Problem:** Contractors cannot see their workspace usage (seats used, job count) against plan limits. No usage indicator in contractor dashboard.
- **Fix:** Add usage widget to contractor dashboard or subscription page.
- **File to modify:** `apps/web/app/dashboard/contractor/page.tsx` — add workspace usage widget
- **Effort estimate:** 30 min

---

### CONN-031
- **Route:** `/api/admin/analytics/revenue` GET (see also CONN-018 — P0)
- Already covered in P0 section.

---

### CONN-032
- **Route:** `/api/admin/claims/triage` GET, POST (see also CONN-013 — P0)
- Already covered in P0 section.

---

### CONN-033 — MISSING ROUTE
- **Called by:** `components/notifications/RealtimeNotifications.tsx`, `components/realtime/RealtimeNotifications.tsx`
- **Missing path:** `/api/notifications/unread-count` (GET), `/api/notifications/[id]/read` (PATCH), `/api/notifications/read-all` (POST)
- **Problem:** Unread badge shows 0 always. Mark-as-read and read-all fail with 404. Core notification UX is broken.
- **Fix:** Extend the existing `/api/notifications/route.ts` to handle these sub-paths, or create separate route files.
- **File to create:** `apps/web/app/api/notifications/unread-count/route.ts`
- **File to create:** `apps/web/app/api/notifications/[notificationId]/read/route.ts`
- **File to create:** `apps/web/app/api/notifications/read-all/route.ts`
- **Effort estimate:** 45 min

---

### CONN-034 — MISSING ROUTE
- **Called by:** `components/chat/...` (chat connection listing)
- **Missing path:** `/api/chat/connections` GET
- **Problem:** Chat connection listing fails. The `/api/chat/connections/route.ts` exists (confirmed in filesystem) but was not in the 345-route audit list — likely excluded during audit. Verify connection status.
- **Action:** Confirm `apps/web/app/api/chat/connections/route.ts` exists and audit its consumers.
- **Effort estimate:** 15 min (verify only)

---

### CONN-035 — MISSING ROUTE
- **Called by:** `components/seo/rank-tracker-dashboard.tsx`
- **Missing path:** `/api/monitoring/rankings` GET, `/api/monitoring/rankings/opportunities` GET
- **Problem:** SEO rank tracker dashboard errors on load. The search-dominance domain has rankings (`/api/search-dominance/rankings` connected) but the monitoring path is different.
- **Fix:** Create monitoring rankings routes that proxy or duplicate search-dominance data, OR update the component to call `/api/search-dominance/rankings`.
- **File to create:** `apps/web/app/api/monitoring/rankings/route.ts` (preferred: redirect to search-dominance)
- **Effort estimate:** 30 min

---

## P2 — Medium (secondary features empty or degraded)

Shorter entries. Each needs one of: new page, hook, or wiring change.

| # | Route | Diagnosis | Fix Action | Est. |
|---|---|---|---|---|
| CONN-036 | `/api/admin/analytics/operational` GET | A | Create `app/dashboard/admin/analytics/operational/page.tsx` | 45 min |
| CONN-037 | `/api/admin/disputes` GET,POST | C | Create `app/dashboard/admin/disputes/page.tsx` | 60 min |
| CONN-038 | `/api/admin/disputes/predict` GET,POST | C | Add AI prediction tab to disputes page (after CONN-037) | 30 min |
| CONN-039 | `/api/admin/fraud/analyze` GET,POST | C | Create `app/dashboard/admin/fraud/page.tsx` | 60 min |
| CONN-040 | `/api/admin/onboarding-analytics` GET | A | Add section to `app/dashboard/admin/analytics/client-onboarding/page.tsx` | 30 min |
| CONN-041 | `/api/admin/pricing/calculate` GET,POST | A | Create pricing admin panel in `app/dashboard/admin/analytics/` | 60 min |
| CONN-042 | `/api/admin/reports/ai-generate` GET,POST | A | Add generate button to `app/dashboard/reports/page.tsx` | 30 min |
| CONN-043 | `/api/admin/training` GET,POST | C | Create `app/dashboard/admin/training/page.tsx` | 90 min |
| CONN-044 | `/api/admin/training-modules` GET,POST,PATCH,DELETE | C | Add module CRUD to training admin page (after CONN-043) | 60 min |
| CONN-045 | `/api/admin/white-label` GET,POST | C | Add white-label config panel to admin preferences | 60 min |
| CONN-046 | `/api/auth/logout` POST | B | Create `hooks/useLogout.ts` calling this before `signOut()` for session cleanup | 20 min |
| CONN-047 | `/api/ai/extract` POST | C | Add document extraction feature to claim submission flow | 60 min |
| CONN-048 | `/api/ai/process` GET,POST | C | Wire to AI chat widget as processing pipeline | 45 min |
| CONN-049 | `/api/agents/orchestrate` GET,POST | C | Add AI orchestration trigger to admin reports (supports CONN-042) | 30 min |
| CONN-050 | `/api/agents/status/[jobId]` GET | C | Add job status polling to report generation UI (after CONN-049) | 30 min |
| CONN-051 | `/api/analytics/events` GET,POST | B | Create `hooks/useAnalyticsEvents.ts`, fire on key user actions | 45 min |
| CONN-052 | `/api/blog` GET,POST + `/api/blog/[slug]` GET,PUT,DELETE | C | Create `app/dashboard/admin/blog/page.tsx` and editor | 120 min |
| CONN-053 | `/api/client/feedback` GET,POST | C | Add feedback form to client dashboard or post-job completion | 45 min |
| CONN-054 | `/api/client/onboarding` GET,POST | D | Wire root onboarding GET to onboarding progress page | 20 min |
| CONN-055 | `/api/client/preferences` GET,PUT | C | Add preferences section to client settings page | 45 min |
| CONN-056 | `/api/competitor-analysis/competitors/[id]/analyze` POST | D | Add per-competitor analysis to `app/dashboard/admin/competitors/page.tsx` | 30 min |
| CONN-057 | `/api/competitor-analysis/keywords/gaps` GET,POST | D | Add keyword gap analysis tab to competitor page | 30 min |
| CONN-058 | `/api/competitor-analysis/swot` GET,POST | D | Add SWOT list/create to competitor page | 30 min |
| CONN-059 | `/api/crm/*` (7 routes) | C | Create CRM section: `app/dashboard/admin/crm/page.tsx` with pipeline, activities, tasks, opportunities | 240 min |
| CONN-060 | `/api/csrf` GET + `/api/csrf/token` GET | B | Create `hooks/useCsrfToken.ts`, integrate into mutation hooks | 30 min |
| CONN-061 | `/api/disasters/analyze` POST | C | Add disaster analysis trigger to admin claims area | 30 min |
| CONN-062 | `/api/fraud-detection` GET,POST + `/api/fraud-detection/analyze` POST | C | Wire to admin fraud page (after CONN-039) | 30 min |
| CONN-063 | `/api/jobs/contractor-matching` GET (already CONN-016) | Duplicate | — | — |
| CONN-064 | `/api/matching` POST | C | Retire in favour of `/api/jobs/contractor-matching` or wire admin tool | 15 min |
| CONN-065 | `/api/notifications/sms` GET,POST | C | Add SMS preferences to `app/dashboard/settings/notifications/page.tsx` | 30 min |
| CONN-066 | `/api/onboarding/assessment` POST | C | Add assessment step to contractor onboarding checklist | 45 min |
| CONN-067 | `/api/onboarding/module/[moduleId]/content` GET,POST | D | Fetch module content in `app/dashboard/contractor/onboarding/module/[moduleId]/page.tsx` | 30 min |
| CONN-068 | `/api/onboarding/quiz` POST | C | Add quiz component to onboarding module pages | 60 min |
| CONN-069 | `/api/payments/payout/manual` POST | C | Add manual payout trigger to admin financials page | 30 min |
| CONN-070 | `/api/pricing/callout` GET | C | Wire callout pricing to `components/payments/callout-checkout-panel.tsx` for display | 20 min |
| CONN-071 | `/api/projects` GET | C | Retire in favour of domain-specific active-projects routes | 15 min |
| CONN-072 | `/api/public/analytics/events` POST | B | Create `hooks/usePublicAnalytics.ts`, fire from public landing pages | 30 min |
| CONN-073 | `/api/public/contractor/validate-abn` POST | B | Integrate into contractor signup/onboarding ABN field validation | 20 min |
| CONN-074 | `/api/public/newsletter` DELETE | D | Add unsubscribe link handling to email templates | 20 min |
| CONN-075 | `/api/public/triage` POST | C | Add triage form to public-facing claim intake page | 60 min |
| CONN-076 | `/api/reports/export` POST | D | Add export button to `app/dashboard/reports/page.tsx` | 30 min |
| CONN-077 | `/api/reviews/[reviewId]` POST/PUT/DELETE | D | Wire contractor reply to review cards in `components/reviews/` | 30 min |
| CONN-078 | `/api/store/products` GET | A | Add product catalog to `app/(public)/store/` | 60 min |
| CONN-079 | `/api/tenant` GET + `/api/tenant/[tenantId]/config` POST | C | Wire to admin tenant detail panel | 30 min |
| CONN-080 | `/api/training/nrp/index` GET | A | Add training index to `app/dashboard/contractor/onboarding/training/page.tsx` | 30 min |
| CONN-081 | `/api/training/nrp/quiz/[moduleNumber]` GET | D | Add quiz to training module pages | 45 min |
| CONN-082 — MISSING ROUTE | `/api/monitoring/rankings` GET | Create route | Create `apps/web/app/api/monitoring/rankings/route.ts` proxying search-dominance data | 30 min |
| CONN-083 — MISSING ROUTE | `/api/ai/stats` GET | Create route | Create `apps/web/app/api/ai/stats/route.ts` returning AI usage statistics | 30 min |
| CONN-084 — MISSING ROUTE | `/api/admin/contractors/bulk` POST | Create route | Create bulk contractor action route (verify, suspend, export) | 45 min |

---

## P3 — Low / Admin-only

These items are lower-risk admin utilities and orphaned routes with no active user impact.

| Route | Action | Note |
|---|---|---|
| `/api/admin/beta/enrollments/[id]` PATCH,DELETE | Wire to `app/dashboard/admin/beta/[id]/page.tsx` | Add edit/delete enrollment actions |
| `/api/admin/seed-demo` POST | Add to developer tools page or document as curl command | Low priority, not user-facing |
| `/api/admin/storage/cleanup` GET,DELETE | Add cleanup trigger to admin system settings | Maintenance tool |
| `/api/admin/white-label` GET,POST | Add to admin preferences page | Non-urgent |
| `/api/ai/summarize` POST | Wire to report or claim summary sections | Nice-to-have |
| `/api/super-orchestrator` GET,POST | Document as internal route or remove | Likely internal |
| `/api/analytics/search` GET,POST | Wire to search analytics admin panel | If search analytics needed |
| `/api/case-studies` GET,POST | Create public case studies page | Marketing content |
| `/api/client/contractors` GET | Assess if needed; auto-dispatch makes manual browse irrelevant | May retire |
| `/api/client/onboarding/send-resume-link` POST | Add "Email me a resume link" to interrupted onboarding flow | Nice-to-have |
| `/api/client/requests` GET | Retire; use `/api/service-requests` with client filter | Redundant |
| `/api/contractor/eligibility` GET | Add eligibility gate check to bid submission | Low impact |
| `/api/contractors/[id]/verify-licence` POST | Add to admin contractor verification workflow | Covers edge case |
| `/api/contractors/available` GET | Assess if needed for matching UI or retire | Potentially redundant |
| `/api/faq` GET,POST + `/api/faq/[id]/helpful` POST | Create FAQ page + helpfulness voting | Content feature |
| `/api/fraud-detection` GET | Retire in favour of `/api/admin/fraud/analyze` | Duplicate |
| `/api/landing/contractor-application` POST | Retire in favour of `/api/public/contractor/application` | Duplicate |
| `/api/leaderboard` GET | Create contractor leaderboard page | Gamification |
| `/api/local-seo/*` (3 routes) | Create admin local SEO management section | SEO tool |
| `/api/marketing/decision-makers` GET | Wire to admin marketing section | B2B marketing |
| `/api/metrics` GET | Retire; use domain-specific metrics routes | Redundant |
| `/api/payments/refund/[paymentId]` GET,POST | Consolidate with `/api/payments/[id]/refund` | Architectural duplicate |
| `/api/public/client-feedback` POST | Add public feedback form | Nice-to-have |
| `/api/public/contractor-inquiry` POST | Add contractor inquiry form to landing page | Marketing |
| `/api/public/contractor/application` POST | Add contractor application landing page | Growth feature |
| `/api/public/lead-capture` POST | Wire to landing page lead form | Marketing |
| `/api/revalidate` GET,POST | Wire to Sanity/CMS webhook or add admin revalidate button | CMS integration |
| `/api/search` GET | Create global search UI | Nice-to-have |
| `/api/socket` GET | Retire if Supabase real-time covers all cases | May be obsolete |
| `/api/status` GET | Retire; `/api/health` covers this | Redundant |
| `/api/storage/signed-url` POST | Retire; `/api/upload/signed-url` covers this | Duplicate |
| `/api/system-check` GET | Retire; `/api/health` covers this | Redundant |
| `/api/tenants/[tenantId]/config` GET,PUT | Wire to admin tenant config panel | Admin tool |
| `/api/tenants/example` POST | Remove or restrict to development only | Dev utility |
| `/api/tenant/[tenantId]/config` POST | Consolidate with tenants version | Duplicate |
| `/api/training/nrp/debug` GET | Remove or restrict to development only | Dev utility |

---

## Missing Routes to Create

Routes the frontend actively calls that need to be built.

### ROUTE-001
- **Called by:** `components/notifications/RealtimeNotifications.tsx` (line 94)
- **Missing path:** `/api/notifications/unread-count` GET
- **Action:** Create route at `apps/web/app/api/notifications/unread-count/route.ts`
- **Implementation:** Query notifications where `userId = session.user.id AND read = false`, return `{ count: number }`
- **Effort estimate:** 15 min

### ROUTE-002
- **Called by:** `components/notifications/RealtimeNotifications.tsx` (line 204)
- **Missing path:** `/api/notifications/[notificationId]/read` PATCH
- **Action:** Create route at `apps/web/app/api/notifications/[notificationId]/read/route.ts`
- **Implementation:** Update notification `read = true` where `id = notificationId AND userId = session.user.id`
- **Effort estimate:** 15 min

### ROUTE-003
- **Called by:** `components/realtime/RealtimeNotifications.tsx` (line 107)
- **Missing path:** `/api/notifications/read-all` POST
- **Action:** Create route at `apps/web/app/api/notifications/read-all/route.ts`
- **Implementation:** Update all notifications `read = true` where `userId = session.user.id`
- **Effort estimate:** 15 min

### ROUTE-004
- **Called by:** `components/seo/rank-tracker-dashboard.tsx` (line 89)
- **Missing path:** `/api/monitoring/rankings` GET
- **Action:** Create route at `apps/web/app/api/monitoring/rankings/route.ts`
- **Implementation:** Proxy to `/api/search-dominance/rankings` data or create independent query. Accept `device`, `location`, `range` params.
- **Effort estimate:** 20 min

### ROUTE-005
- **Called by:** `components/seo/rank-tracker-dashboard.tsx` (line 101)
- **Missing path:** `/api/monitoring/rankings/opportunities` GET
- **Action:** Create route at `apps/web/app/api/monitoring/rankings/opportunities/route.ts`
- **Implementation:** Return keyword ranking opportunities (low-hanging positions to improve). Can proxy to search-dominance data.
- **Effort estimate:** 20 min

### ROUTE-006
- **Called by:** Multiple admin contractor pages
- **Missing path:** `/api/admin/contractors/bulk` POST
- **Action:** Create route at `apps/web/app/api/admin/contractors/bulk/route.ts`
- **Implementation:** Accept `{ contractorIds: string[], action: 'verify'|'suspend'|'export' }`. Apply action to all listed contractors.
- **Effort estimate:** 45 min

### ROUTE-007
- **Called by:** AI stats panel component
- **Missing path:** `/api/ai/stats` GET
- **Action:** Create route at `apps/web/app/api/ai/stats/route.ts`
- **Implementation:** Return AI usage metrics (requests per day, tokens, model breakdown) from DB or provider API.
- **Effort estimate:** 30 min

### ROUTE-008
- **Called by:** Chat components
- **Missing path:** `/api/chat/connections` GET — verify filesystem
- **Action:** Confirm `apps/web/app/api/chat/connections/route.ts` exists (filesystem shows it does). Re-audit why it was not in the 345-route list. If it exists, add to CONNECTED list; if stub only, implement.
- **Effort estimate:** 15 min (verify)

---

## Execution Order for Phase 5

Recommended sequence to maximise user-visible impact per sprint:

**Sprint 1 — Subscription & Workspace (CONN-001 to CONN-006, CONN-003)**
Complete the monetisation funnel: workspace creation → subscription checkout → tenant billing admin.

**Sprint 2 — Contractor Job Flow (CONN-007, CONN-008, CONN-009, CONN-010)**
Complete the contractor-side flow: bid response → claim response → job completion → payout settings.

**Sprint 3 — Notifications & Auth (ROUTE-001 to ROUTE-003, CONN-019)**
Fix broken notification UX (404s on mark-read, unread count) and add password reset.

**Sprint 4 — Admin Operations (CONN-011 to CONN-018)**
Wire payment reconciliation, user management, claims triage, matching management.

**Sprint 5 — Missing Routes (ROUTE-004 to ROUTE-008, CONN-033)**
Create the eight missing API routes to stop frontend 404 errors.

**Sprint 6+ — P2/P3 items in priority order**
CRM, training, analytics, blog, SEO tools, deduplication.

---

*End of Connections Required*
