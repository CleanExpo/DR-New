# Gap Report — Phase 2 Integration Audit

Generated: 2026-04-12
Source: 02-01-RESULTS.md
Routes audited: 345 total (193 CONNECTED, 134 DISCONNECTED, 18 WEBHOOK-ONLY)

---

## Summary

| Category        | Count |
|-----------------|-------|
| DISCONNECTED    | 134   |
| PARTIAL         | 0     |
| MISSING-ROUTE   | 8     |
| Total Gaps      | 142   |

### Disconnected by Diagnosis

| Diagnosis | Label                        | Count |
|-----------|------------------------------|-------|
| A         | Missing UI page              | 38    |
| B         | Missing hook / wiring        | 12    |
| C         | Orphaned route               | 51    |
| D         | Partial method gap           | 11    |
| E         | Webhook false-positive (excl)| 0     |

### Disconnected by Severity

| Severity | Label         | Count |
|----------|---------------|-------|
| P0       | Critical      | 18    |
| P1       | High          | 32    |
| P2       | Medium        | 48    |
| P3       | Low / Admin   | 36    |

---

## Disconnected Routes by Domain

### Admin (`/api/admin/`)

24 routes disconnected.

#### /api/admin/analytics/operational
- **Methods:** GET
- **Diagnosis:** A — Missing UI page (route works, no page renders it)
- **Severity:** P2
- **Notes:** Operational analytics data (job throughput, SLA metrics). Admin analytics section has other dashboards connected but this one has no consumer page. A panel should be added to `app/dashboard/admin/analytics/`.

#### /api/admin/analytics/revenue
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Revenue analytics are core to admin oversight. The admin analytics section is partially wired (benchmarks, comparison, trends connected) but revenue data renders blank. Needs a page at `app/dashboard/admin/analytics/revenue/`.

#### /api/admin/beta/enrollments/[id]
- **Methods:** PATCH, DELETE
- **Diagnosis:** D — Partial method gap (beta enrollment page renders data via GET, no PATCH/DELETE wired)
- **Severity:** P3
- **Notes:** Admin cannot edit or remove individual beta enrollments via UI. The beta program detail page at `app/dashboard/admin/beta/[id]/page.tsx` only calls GET and POST.

#### /api/admin/claims/match
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Contractor matching for claims is a core platform flow. Admin has a claim list page but no matching management panel. Admins cannot view match scores or re-run matching for a booking. Needs a sub-panel in `app/dashboard/admin/claims/[claimId]/page.tsx`.

#### /api/admin/claims/triage
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Claim triage (prioritisation queue) has no UI. Critical for operational workflow — inbound claims stack up with no admin-facing triage interface. Needs a page at `app/dashboard/admin/claims/triage/`.

#### /api/admin/disputes
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route (no disputes section ever built)
- **Severity:** P2
- **Notes:** Dispute management route is fully implemented but no dashboard page exists. The feature domain is absent from the admin navigation.

#### /api/admin/disputes/predict
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** AI-based dispute prediction endpoint, no UI consumer. Depends on `/api/admin/disputes` being connected first.

#### /api/admin/fraud/analyze
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Fraud analysis endpoint exists but no admin fraud dashboard page. Platform has fraud-detection routes in shared domain too (also disconnected).

#### /api/admin/onboarding-analytics
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P2
- **Notes:** Onboarding analytics route exists; admin analytics section has client-onboarding page connected but this distinct onboarding-analytics route has no consumer.

#### /api/admin/payments/reconcile
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Payment reconciliation report API is fully implemented (calls `reconcilePayments`, `getReconciliationIssues` from lib). Admin financials page exists but does not call this route. Finance team has no reconciliation view.

#### /api/admin/pricing/calculate
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P2
- **Notes:** Dynamic pricing calculation and market rate analysis available but no admin UI panel to invoke it or display results.

#### /api/admin/reports/ai-generate
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P2
- **Notes:** AI-powered report generation fully implemented using orchestrator. Reports page (`app/dashboard/reports/page.tsx`) exists but only calls `/api/reports` (list), not this generation endpoint.

#### /api/admin/seed-demo
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Demo data seeding route. Intentionally has no persistent UI — acceptable for developer/QA use. Lower priority.

#### /api/admin/service-requests/[id]/callout/release
- **Methods:** POST
- **Diagnosis:** D — Partial method gap
- **Severity:** P1
- **Notes:** Callout checkout flow (`/api/service-requests/[id]/callout/checkout` and `/callout/verify`) is connected. The callout release route (refund/cancel the locked callout) is not wired to any UI. Clients have no way to cancel after checkout.

#### /api/admin/storage/cleanup
- **Methods:** GET, DELETE
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Storage cleanup utility route — admin-only maintenance tool with no UI. Low priority.

#### /api/admin/tenant-billing/checkout
- **Methods:** POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P0
- **Notes:** Tenant subscription checkout (Stripe session creation) fully implemented using `createTenantCheckoutSession`. No admin panel calls it. Admin cannot initiate or manage tenant subscriptions. Blocks workspace monetisation.

#### /api/admin/tenant-billing/portal
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P0
- **Notes:** Stripe billing portal access for tenants. Admins have no way to redirect tenants to their billing portal. Tenant billing management is fully blocked.

#### /api/admin/tenant-billing/status
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P0
- **Notes:** Tenant billing status check (subscription state, payment status). Admin has no billing status display, so subscription health is invisible.

#### /api/admin/tenants
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI wiring (page exists but calls mock data via different route)
- **Severity:** P0
- **Notes:** `app/dashboard/admin/tenants/page.tsx` is connected to `/api/tenants` (real Prisma data) but `/api/admin/tenants` is a separate route returning mocked tenant data. The admin tenants page routes to the non-admin endpoint. The admin version with full tenant management (create, suspend, delete) is unused.

#### /api/admin/training
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Training content management route for admin. No admin training section exists in the dashboard.

#### /api/admin/training-modules
- **Methods:** GET, POST, PATCH, DELETE
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Training module CRUD endpoint. No admin UI for module management.

#### /api/admin/users
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Full user listing with pagination, role filter, search — implemented using real Prisma queries. No admin user management page exists. Admins cannot view the user table.

#### /api/admin/users/[id]
- **Methods:** GET, PATCH, DELETE
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Individual user management (view, update role, deactivate). No admin user detail page exists. Pairs with `/api/admin/users` gap.

#### /api/admin/white-label
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** White-label configuration route. `/api/admin/white-label-stats` is connected to `app/dashboard/admin/page.tsx` but the full configuration endpoint has no UI.

---

### Client (`/api/client/`)

12 routes disconnected.

#### /api/client/contractors
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Returns a list of contractors for a client. Client dashboard does not have a contractors browse page; matching is automatic.

#### /api/client/feedback
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Client feedback submission and retrieval. No dedicated feedback UI section for clients.

#### /api/client/offers
- **Methods:** GET
- **Diagnosis:** E — False positive (route intentionally returns empty list for NRPG auto-dispatch)
- **Severity:** N/A
- **Notes:** Route source confirms: "NRPG uses private, automatic claim dispatch. Clients do not browse or accept contractor offers." Returns `{ dispatchMode: 'AUTO', offers: [] }`. Reclassify as intentional stub — no connection needed.

#### /api/client/offers/[id]/accept
- **Methods:** POST
- **Diagnosis:** E — False positive (same as above; offer flow is auto-dispatch)
- **Severity:** N/A
- **Notes:** Auto-dispatch model makes manual offer acceptance obsolete. No connection needed.

#### /api/client/offers/[id]/reject
- **Methods:** POST
- **Diagnosis:** E — False positive
- **Severity:** N/A
- **Notes:** Same reasoning as accept. Auto-dispatch. No connection needed.

#### /api/client/onboarding
- **Methods:** GET, POST
- **Diagnosis:** D — Partial method gap (onboarding sub-steps connected, root route not)
- **Severity:** P2
- **Notes:** Individual onboarding step routes are wired but the root `/api/client/onboarding` GET (fetch current onboarding state) and POST (init) are not called. The page at `app/dashboard/client/onboarding/page.tsx` calls `/api/client/onboarding/start` and `/api/client/onboarding/progress/[clientId]` instead.

#### /api/client/onboarding/send-resume-link
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Sends an email link for clients to resume interrupted onboarding. No UI button calls it.

#### /api/client/preferences
- **Methods:** GET, PUT
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Client preferences (notifications, display). `/api/user/preferences` exists and is connected; client-specific preferences route has no consumer.

#### /api/client/requests
- **Methods:** GET
- **Diagnosis:** B — Missing hook (service requests covered by `/api/service-requests` via `useServiceRequests` hook; this client-scoped alias is unused)
- **Severity:** P2
- **Notes:** The same data is accessible via the shared service-requests route. This client-scoped version is redundant unless it provides client-filtered view.

#### /api/client/subscription
- **Methods:** GET, PUT
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Client subscription management (view plan, update). No subscription management page exists in the client dashboard. Clients cannot view or modify their subscription.

---

### Contractor (`/api/contractor/` and `/api/contractors/`)

9 routes disconnected.

#### /api/contractor/bids/[matchId]/respond
- **Methods:** POST
- **Diagnosis:** D — Partial method gap
- **Severity:** P0
- **Notes:** Contractor bid response (ACCEPTED, DECLINED, COUNTER_OFFER) is a core matching flow step. Contractors have a bids list page and an available-requests page but cannot formally respond to a match. The `escalateToNextContractor` function triggers on DECLINED. This blocks the claim dispatch flow.

#### /api/contractor/claims/[claimId]/respond
- **Methods:** GET, POST
- **Diagnosis:** D — Partial method gap (claim detail accessible, response not wired)
- **Severity:** P0
- **Notes:** Contractors cannot respond to claims assigned to them. Pairs with `/api/contractor/bids/[matchId]/respond` — both cover the contractor's side of claim acceptance. No UI component wires this.

#### /api/contractor/eligibility
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Checks contractor eligibility for job types. No UI gate calls it during matching or bidding.

#### /api/contractor/jobs/[jobId]/complete
- **Methods:** POST
- **Diagnosis:** A — Missing UI wiring
- **Severity:** P0
- **Notes:** Contractor job completion triggers payout via `triggerPayoutForBooking` and sends completion email. The shared `/api/jobs/[id]/complete` is wired to `app/dashboard/jobs/[id]/complete/page.tsx` but that calls the shared endpoint. The contractor-specific version (which handles contractor-side validation and payout trigger) has no consumer. Contractor dashboard has active projects list but no complete button calling this route.

#### /api/contractor/payout-settings
- **Methods:** GET, PUT
- **Diagnosis:** A — Missing UI page
- **Severity:** P0
- **Notes:** Payout schedule settings (WEEKLY, BI_WEEKLY, MONTHLY) and Stripe Connect status. Contractor dashboard has a Stripe Connect onboarding flow (connected) but no settings page for managing ongoing payout preferences.

#### /api/contractor/stats
- **Methods:** GET
- **Diagnosis:** B — Missing hook
- **Severity:** P1
- **Notes:** Contractor stats (jobs completed, earnings, ratings) — different from analytics. Analytics dashboard is connected but this stats endpoint (lighter, summary format) has no consumer. Should be called from contractor dashboard header/summary section.

#### /api/contractors/[id]/verify-licence
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Licence verification submission. Admin contractor verification page uses a different verification route (`/api/admin/contractor-verification/action`).

#### /api/contractors/available
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Returns list of available contractors (for matching/assignment). The matching system uses separate routes. No UI page currently calls this.

---

### Payments / Stripe

10 routes disconnected.

#### /api/payments
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P0
- **Notes:** Full payment listing for all user types (client: own payments, contractor: received payments, admin: all). Both clients and contractors lack a unified payment history UI. `/api/client/payments` page exists but calls a client-specific route; `/api/payments` (shared) has no consumer.

#### /api/payments/[id]
- **Methods:** GET, PATCH
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Individual payment detail and status update. No payment detail page exists. Users cannot view payment breakdowns.

#### /api/payments/[id]/refund
- **Methods:** POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Payment refund initiation. No refund UI exists for admin or client. Refunds must be done manually via Stripe dashboard.

#### /api/payments/booking/[bookingId]
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Booking-specific payment management. Booking detail pages do not surface payment information through this route.

#### /api/payments/payout/[bookingId]
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Booking payout management. Contractor earnings page shows totals but has no per-booking payout detail.

#### /api/payments/payout/manual
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Manual payout trigger for admin. No admin payout management UI.

#### /api/payments/refund/[paymentId]
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route (duplicates /api/payments/[id]/refund pattern)
- **Severity:** P2
- **Notes:** Second refund route pattern. Likely an architectural duplicate; consolidate with `/api/payments/[id]/refund`.

#### /api/store/products
- **Methods:** GET
- **Diagnosis:** A — Missing UI wiring
- **Severity:** P2
- **Notes:** Store product listing has no consumer. `app/(public)/store/cart/CartCheckout.tsx` is connected to checkout but product catalog has no page calling this route.

#### /api/subscription/checkout
- **Methods:** POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P0
- **Notes:** Stripe checkout session creation for workspace subscription (BASIC/PRO/ENTERPRISE tiers). Full Stripe integration implemented with proration and customer creation. No UI page initiates subscription purchase. Contractors cannot subscribe without direct API access.

#### /api/subscription/upgrade
- **Methods:** POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P0
- **Notes:** Tier upgrade/downgrade with proration calculation and Stripe subscription update. No upgrade flow UI exists in contractor dashboard. Subscription management is completely absent.

---

### Shared / Public

83 routes disconnected across sub-domains.

#### Auth

#### /api/auth/logout
- **Methods:** POST
- **Diagnosis:** B — Missing hook (NextAuth sign-out should call this)
- **Severity:** P2
- **Notes:** Explicit logout route exists but sign-out is handled via NextAuth's `signOut()`. This route may handle session cleanup. Currently no UI calls it directly.

#### /api/auth/reset-password
- **Methods:** POST, PUT
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Password reset flow (POST to initiate, PUT to set new password). No reset-password page exists in the auth flow. Users who forget passwords have no self-service recovery UI.

---

#### AI

#### /api/ai/extract
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Document/data extraction AI endpoint. No UI consumer. Could serve claim document processing.

#### /api/ai/process
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Generic AI processing pipeline. No UI consumer.

#### /api/ai/summarize
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Text summarisation. No UI consumer.

#### /api/agents/orchestrate
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Agent orchestration endpoint. Orchestrator is used internally in `/api/admin/reports/ai-generate` but this public-facing route is unused.

#### /api/agents/status/[jobId]
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Agent job status polling. No UI polls it because orchestration has no UI.

#### /api/super-orchestrator
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Super-orchestrator endpoint. No UI consumer.

---

#### Analytics (Shared)

#### /api/analytics/client
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Shared client analytics route. Client analytics dashboard calls `/api/client/analytics/dashboard` (connected). This shared route has no consumer.

#### /api/analytics/events
- **Methods:** GET, POST
- **Diagnosis:** B — Missing hook
- **Severity:** P2
- **Notes:** Analytics event tracking (POST) and retrieval (GET). Frontend should post events for user action tracking. No hook or component calls it.

#### /api/analytics/metrics
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Shared metrics endpoint. Admin analytics dashboard uses domain-specific routes instead.

#### /api/analytics/realtime
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Real-time analytics stream. Admin real-time metrics panel uses `/api/admin/metrics/realtime` (connected). This shared version is unused.

#### /api/analytics/search
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Search analytics. No consumer.

---

#### Blog / CMS

#### /api/blog
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Blog post listing and creation. No blog admin page in dashboard.

#### /api/blog/[slug]
- **Methods:** GET, PUT, DELETE
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Individual blog post management. No blog editor page.

---

#### Bookings

#### /api/bookings/[id]
- **Methods:** GET, PATCH, DELETE
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Individual booking detail and management. Booking creation (`POST /api/bookings`) is called from booking forms. But no booking detail page fetches or updates an individual booking via this route.

#### /api/bookings/[id]/assign
- **Methods:** POST, DELETE
- **Diagnosis:** D — Partial method gap
- **Severity:** P1
- **Notes:** Assignment to a booking is needed after booking creation. The `/api/jobs/[id]/assign` route is connected to job assignment page, but bookings lack the same. New bookings sit unassigned with no admin assignment UI using this endpoint.

---

#### Competitor Analysis

#### /api/competitor-analysis/competitors/[id]/analyze
- **Methods:** GET, POST
- **Diagnosis:** D — Partial method gap (competitor page connected for list/overview, individual analysis not)
- **Severity:** P2
- **Notes:** Admin competitor page calls analyze endpoint (`/api/competitor-analysis/analyze/[id]` connected) but the per-competitor nested analyze route is disconnected.

#### /api/competitor-analysis/keywords/gaps
- **Methods:** GET, POST
- **Diagnosis:** D — Partial method gap
- **Severity:** P2
- **Notes:** Keywords page exists and shows keywords but gap analysis is not surfaced.

#### /api/competitor-analysis/swot
- **Methods:** GET, POST
- **Diagnosis:** D — Partial method gap (SWOT detail `[id]` is connected, root list/create is not)
- **Severity:** P2
- **Notes:** SWOT detail is called from competitor page but the SWOT list/create root is not.

---

#### CRM

#### /api/crm/accountability/dashboard
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** CRM accountability dashboard. No CRM section in dashboard.

#### /api/crm/accountability/violations
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** CRM accountability violations listing. No consumer.

#### /api/crm/activities
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** CRM activity feed. No CRM dashboard page exists.

#### /api/crm/customers/[userId]/360
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** 360-degree customer view. High-value feature but no UI page exists.

#### /api/crm/opportunities
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** CRM opportunity pipeline data. No consumer.

#### /api/crm/pipeline
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** CRM pipeline overview. No consumer.

#### /api/crm/tasks
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** CRM task management. No consumer.

---

#### CSRF / Security

#### /api/csrf
- **Methods:** GET
- **Diagnosis:** B — Missing hook (CSRF token should be fetched by form components)
- **Severity:** P2
- **Notes:** CSRF token route exists. No form component currently fetches it before mutation requests. Should be wired into form submission hooks.

#### /api/csrf/token
- **Methods:** GET
- **Diagnosis:** B — Missing hook (duplicate of `/api/csrf`, same issue)
- **Severity:** P2
- **Notes:** Same as above.

---

#### FAQ / Misc Public

#### /api/case-studies
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Case studies content endpoint. No public case studies page calls it.

#### /api/disasters/analyze
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Disaster event analysis. No UI triggers it.

#### /api/faq
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** FAQ listing and creation. No FAQ page calls this route.

#### /api/faq/[id]/helpful
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** FAQ helpfulness voting. No consumer.

#### /api/fraud-detection
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Fraud detection (shared). Pairs with `/api/admin/fraud/analyze` gap.

#### /api/fraud-detection/analyze
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Fraud analysis trigger. No consumer.

#### /api/landing/contractor-application
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Landing page contractor application form submission. No landing form calls it; `/api/public/contractor/application` is the more complete version.

#### /api/leaderboard
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Contractor leaderboard data. No leaderboard UI exists.

#### /api/matching
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Manual matching trigger. Admin tools use `/api/jobs/contractor-matching` instead.

#### /api/metrics
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Generic metrics endpoint. Admin uses domain-specific metric routes.

#### /api/projects
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Projects listing. Active projects covered by `/api/client/active-projects` and `/api/contractor/active-projects` (both connected). This shared route unused.

#### /api/revalidate
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** ISR cache revalidation. No consumer. Should be triggered by CMS webhooks.

#### /api/search
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Global search endpoint. No search UI calls it.

#### /api/socket
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Socket.io connection handler. Real-time is handled via Supabase subscriptions; this Socket.io handler has no consumers.

#### /api/status
- **Methods:** GET
- **Diagnosis:** C — Orphaned route (health/status covered by /api/health routes)
- **Severity:** P3
- **Notes:** System status check. Redundant with `/api/health` (CONNECTED).

#### /api/system-check
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** System-wide check. Health routes cover this.

---

#### Invoices

#### /api/invoices
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Invoice listing has no consumer page. The client payments page calls `/api/invoices/[invoiceId]/pdf` (connected) for PDF download but has no route to list all invoices.

#### /api/invoices/[invoiceId]
- **Methods:** GET, DELETE
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Individual invoice detail and deletion. No invoice detail page exists.

---

#### Jobs (Shared)

#### /api/jobs/[id]/documents
- **Methods:** POST
- **Diagnosis:** D — Partial method gap (job detail page exists, document upload not wired)
- **Severity:** P1
- **Notes:** Job document upload. Job detail page (`app/dashboard/jobs/[id]/page.tsx`) shows job details but has no document upload widget calling this route.

#### /api/jobs/contractor-matching
- **Methods:** GET, POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Manual contractor matching trigger for admin/debug use. Implemented to re-run matching algorithm. No admin UI calls it. When automatic matching fails, admins have no recovery mechanism through the UI.

---

#### Local SEO

#### /api/local-seo/backlinks
- **Methods:** GET, POST, PATCH
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Local SEO backlink management. No admin SEO section UI calls it.

#### /api/local-seo/citations
- **Methods:** GET, POST, PATCH
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Local citation management. No consumer.

#### /api/local-seo/gbp
- **Methods:** GET, POST, PATCH, DELETE
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Google Business Profile management. No admin GBP section exists.

---

#### Marketing

#### /api/marketing/decision-makers
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Decision-maker contact data for B2B marketing. No consumer.

---

#### Notifications

#### /api/notifications/sms
- **Methods:** GET, POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** SMS notification management. Notification preferences route is connected; SMS-specific endpoint is not.

---

#### Onboarding (Contractor)

#### /api/onboarding/assessment
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Contractor assessment submission. Onboarding flow uses quiz and module routes but assessment has no consumer.

#### /api/onboarding/module/[moduleId]/content
- **Methods:** GET, POST
- **Diagnosis:** D — Partial method gap (module start is wired, content fetch/update is not)
- **Severity:** P2
- **Notes:** Module content rendering. The module page at `app/dashboard/contractor/onboarding/module/[moduleId]/page.tsx` calls `/api/onboarding/module/start` but not the content endpoint.

#### /api/onboarding/quiz
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Quiz submission. Onboarding pages don't have a quiz UI component calling this.

---

#### Public Routes

#### /api/public/analytics/events
- **Methods:** POST
- **Diagnosis:** B — Missing hook (public-facing event tracking)
- **Severity:** P2
- **Notes:** Public analytics event tracking. No public-facing component fires events here.

#### /api/public/client-feedback
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Public client feedback form submission. No public feedback form exists.

#### /api/public/contractor-inquiry
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Public contractor inquiry. Landing page has email capture but no inquiry form.

#### /api/public/contractor/application
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Public contractor application form. No landing-page application form calls it.

#### /api/public/contractor/validate-abn
- **Methods:** POST
- **Diagnosis:** B — Missing hook (ABN validation should be called from signup/onboarding forms)
- **Severity:** P2
- **Notes:** ABN format validation for contractor applications. Contractor onboarding forms don't validate ABN via this route before submission.

#### /api/public/lead-capture
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Lead capture form submission. Landing page has waitlist (`/api/landing/waitlist` connected) but no separate lead capture form.

#### /api/public/newsletter
- **Methods:** POST, DELETE
- **Diagnosis:** D — Partial method gap (newsletter subscribe uses `/api/newsletter/subscribe`, unsubscribe DELETE not wired)
- **Severity:** P2
- **Notes:** Newsletter signup uses `/api/newsletter/subscribe` (connected). The public newsletter DELETE (unsubscribe) has no UI trigger.

#### /api/public/triage
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Public triage submission before full claim. No public triage form exists.

---

#### Ratings / Reviews

#### /api/reviews/[reviewId]
- **Methods:** POST, PUT, DELETE
- **Diagnosis:** D — Partial method gap (ratings CRUD connected via `/api/ratings/[id]`, reviews endpoint duplicates with different path)
- **Severity:** P2
- **Notes:** Reviews endpoint (`/api/reviews/[reviewId]`) duplicates rating functionality in `/api/ratings/[id]`. The reviews route handles contractor replies specifically. Connected as `reviewId` but no UI calls the POST/PUT/DELETE on this separate path.

---

#### Reports

#### /api/reports/export
- **Methods:** POST
- **Diagnosis:** D — Partial method gap (report list connected, export not)
- **Severity:** P2
- **Notes:** Report export (PDF/CSV) endpoint. Reports list page is connected but has no export button calling this route.

---

#### Resources / Misc

#### /api/pricing/callout
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Callout pricing information. The callout checkout flow uses direct pricing in the service-requests checkout; this standalone route has no consumer.

---

#### Service Requests

#### /api/service-requests/[id]/matches
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Returns contractor matches for a service request. Client claim detail shows contractor info but doesn't surface the match list for transparency. Admin cannot view match scores from the UI.

---

#### Storage / Upload

#### /api/storage/signed-url
- **Methods:** POST
- **Diagnosis:** B — Missing hook (signed URL generation for storage, overlaps with `/api/upload/signed-url`)
- **Severity:** P2
- **Notes:** Signed URL for direct storage upload. The connected upload route (`/api/upload/signed-url`) handles this; this is a duplicate path with no consumer.

---

#### Tenants / Workspace

#### /api/tenant
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P2
- **Notes:** Single tenant lookup. Admin uses `/api/tenants` for the list.

#### /api/tenant/[tenantId]/config
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Tenant configuration update. No admin tenant config UI.

#### /api/tenants/[tenantId]/config
- **Methods:** GET, PUT
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Tenant config read/update. Duplicates `/api/tenant/[tenantId]/config` pattern.

#### /api/tenants/example
- **Methods:** POST
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Example tenant creation. Developer/demo utility. No consumer.

#### /api/workspace/create
- **Methods:** POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P0
- **Notes:** Workspace creation (businessName, ABN, ACN, initialTier) — first step before Stripe subscription checkout. Route fully implemented using `createWorkspace` service. No onboarding step calls it. Contractors skip workspace creation, breaking the subscription onboarding funnel.

#### /api/workspace/invite
- **Methods:** POST
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Team member invite with tier-based seat limits. Route fully implemented with email invitation and seat gating. No workspace settings or team management page calls it.

#### /api/workspace/usage
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P1
- **Notes:** Workspace usage stats (seats, job count, limits). No dashboard widget displays this. Contractors cannot see their usage against their plan limits.

---

#### Training (NRP)

#### /api/training/nrp/debug
- **Methods:** GET
- **Diagnosis:** C — Orphaned route
- **Severity:** P3
- **Notes:** Training debug endpoint. No consumer (developer use only).

#### /api/training/nrp/index
- **Methods:** GET
- **Diagnosis:** A — Missing UI page
- **Severity:** P2
- **Notes:** Training module index listing. Training page connects to `/api/onboarding/courses` but this NRP-specific training index has no consumer.

#### /api/training/nrp/quiz/[moduleNumber]
- **Methods:** GET
- **Diagnosis:** D — Partial method gap (module content wired, quiz not)
- **Severity:** P2
- **Notes:** Per-module quiz questions. Module pages load content but quiz component has no route to fetch questions.

---

#### Xero Integration

#### /api/xero/callback
- **Methods:** GET
- **Diagnosis:** E — False positive (OAuth callback, not a frontend consumer route)
- **Severity:** N/A
- **Notes:** Xero OAuth callback URL is called by Xero after user authorises, not by the frontend. Reclassify as WEBHOOK-ONLY (OAuth callback). No frontend connection needed.

---

## Missing Routes (Frontend Calls Non-Existent API)

Routes the frontend actively calls that have no corresponding `route.ts` in the filesystem.

| Frontend File | Called Path | Impact | Severity |
|---|---|---|---|
| `components/seo/rank-tracker-dashboard.tsx` | `/api/monitoring/rankings` | Rank tracker dashboard shows empty | P2 |
| `components/seo/rank-tracker-dashboard.tsx` | `/api/monitoring/rankings/opportunities` | Opportunities panel errors | P2 |
| `components/notifications/RealtimeNotifications.tsx` | `/api/notifications/unread-count` | Unread badge shows 0 always | P1 |
| `components/notifications/RealtimeNotifications.tsx` | `/api/notifications/[id]/read` | Mark-read fails with 404 | P1 |
| `components/realtime/RealtimeNotifications.tsx` | `/api/notifications/read-all` | Read-all fails with 404 | P1 |
| `app/dashboard/admin/...` | `/api/admin/contractors/bulk` | Bulk contractor action fails | P2 |
| `components/admin/...` | `/api/ai/stats` | AI stats panel errors | P2 |
| `components/chat/...` | `/api/chat/connections` | Chat connection listing fails | P1 |

### Notes on Missing Routes

- `/api/monitoring/rankings` and `/api/monitoring/rankings/opportunities` are called from `components/seo/rank-tracker-dashboard.tsx`. The `/api/search-dominance/` routes cover similar data but different paths.
- `/api/notifications/unread-count`, `/api/notifications/[id]/read`, and `/api/notifications/read-all` are called from two different notification components. The base `/api/notifications` route exists and handles PATCH, but these sub-paths do not.
- `/api/chat/connections` is called but only `/api/messages` and `/api/messages/initiate` exist. Chat connection management is missing.
- `/api/admin/contractors/bulk` is called from an admin contractor page but no bulk route exists.
- `/api/ai/stats` is called from an AI component but only `/api/ai/chat`, `/api/ai/claim-assist`, and `/api/ai/semantic-search` exist.

---

## Reclassified Routes (E — Not Disconnect, Exclude from Work List)

| Route | Reclassification | Reason |
|---|---|---|
| `/api/client/offers` | INTENTIONAL-STUB | Auto-dispatch model; no manual offer flow |
| `/api/client/offers/[id]/accept` | INTENTIONAL-STUB | Same |
| `/api/client/offers/[id]/reject` | INTENTIONAL-STUB | Same |
| `/api/xero/callback` | WEBHOOK-ONLY | OAuth callback, called by Xero not frontend |

---

*End of Gap Report*
