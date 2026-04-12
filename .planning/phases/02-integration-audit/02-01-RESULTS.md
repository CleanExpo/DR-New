# Integration Audit Results — 02-01

Generated: 2026-04-12
Total routes audited: 345

## Summary Counts

| Status       | Count |
|--------------|-------|
| CONNECTED    | 193   |
| PARTIAL      | 0     |
| DISCONNECTED | 134   |
| WEBHOOK-ONLY | 18    |
| ADMIN-ONLY   | 0     |
| **TOTAL**    | **345** |

---

## Domain: Admin (`/api/admin/`)

62 routes total.

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/admin/ai-enhancement/images | POST | components/admin/AIImageEnhancementDashboard.tsx | CONNECTED |
| /api/admin/ai-enhancement/images/[photoId] | POST | components/admin/AIImageEnhancementDashboard.tsx | CONNECTED |
| /api/admin/ai-enhancement/jobs | GET | components/admin/AIImageEnhancementDashboard.tsx | CONNECTED |
| /api/admin/ai-enhancement/stats | GET | components/admin/AIImageEnhancementDashboard.tsx | CONNECTED |
| /api/admin/ai/metrics | GET | app/dashboard/admin/ai-monitoring/page.tsx | CONNECTED |
| /api/admin/analytics/benchmarks | GET | app/dashboard/admin/analytics/benchmarks/page.tsx | CONNECTED |
| /api/admin/analytics/builder | GET,POST | app/dashboard/admin/analytics/builder/page.tsx | CONNECTED |
| /api/admin/analytics/client-onboarding | GET | app/dashboard/admin/analytics/client-onboarding/page.tsx | CONNECTED |
| /api/admin/analytics/comparison | GET | app/dashboard/admin/analytics/comparison/page.tsx | CONNECTED |
| /api/admin/analytics/dashboard | GET | app/dashboard/admin/analytics/page.tsx, app/dashboard/admin/page.tsx | CONNECTED |
| /api/admin/analytics/export | POST | app/dashboard/admin/analytics/exports/page.tsx | CONNECTED |
| /api/admin/analytics/forecast | GET | app/dashboard/admin/analytics/forecasts/page.tsx | CONNECTED |
| /api/admin/analytics/geographic | GET | app/dashboard/admin/analytics/geographic/page.tsx | CONNECTED |
| /api/admin/analytics/operational | GET | — | DISCONNECTED |
| /api/admin/analytics/revenue | GET | — | DISCONNECTED |
| /api/admin/analytics/trends | GET | app/dashboard/admin/analytics/trends/page.tsx | CONNECTED |
| /api/admin/beta/analytics | GET | app/dashboard/admin/beta/page.tsx | CONNECTED |
| /api/admin/beta/enrollments | GET,POST | app/dashboard/admin/beta/[id]/page.tsx | CONNECTED |
| /api/admin/beta/enrollments/[id] | PATCH,DELETE | — | DISCONNECTED |
| /api/admin/beta/feedback | GET,PATCH | app/dashboard/admin/beta/[id]/page.tsx | CONNECTED |
| /api/admin/beta/programs | GET,POST | app/dashboard/admin/beta/page.tsx | CONNECTED |
| /api/admin/beta/programs/[id] | GET,PATCH,DELETE | app/dashboard/admin/beta/[id]/page.tsx | CONNECTED |
| /api/admin/claims/convert | GET,POST | app/dashboard/admin/claims/page.tsx, app/dashboard/admin/claims/[claimId]/page.tsx | CONNECTED |
| /api/admin/claims/match | GET,POST | — | DISCONNECTED |
| /api/admin/claims/triage | GET,POST | — | DISCONNECTED |
| /api/admin/client-services | GET | app/dashboard/admin/page.tsx | CONNECTED |
| /api/admin/clients | GET | app/dashboard/admin/page.tsx | CONNECTED |
| /api/admin/contractor-verification/action | POST | app/dashboard/admin/contractor-verification/page.tsx | CONNECTED |
| /api/admin/contractor-verification/pending | GET | app/dashboard/admin/contractor-verification/page.tsx | CONNECTED |
| /api/admin/contractors | GET | app/dashboard/admin/page.tsx, app/dashboard/admin/contractors/page.tsx, app/dashboard/admin/beta/[id]/page.tsx | CONNECTED |
| /api/admin/contractors/directory | GET | app/dashboard/admin/contractors/directory/page.tsx, components/booking/ContractorSearch.tsx | CONNECTED |
| /api/admin/contractors/verification | GET | app/dashboard/admin/contractors/verification/page.tsx | CONNECTED |
| /api/admin/contractors/verification/[contractorId] | GET,POST | app/dashboard/admin/contractors/verification/page.tsx | CONNECTED |
| /api/admin/disputes | GET,POST | — | DISCONNECTED |
| /api/admin/disputes/predict | GET,POST | — | DISCONNECTED |
| /api/admin/financials/dashboard | GET | app/dashboard/admin/financials/page.tsx | CONNECTED |
| /api/admin/fraud/analyze | GET,POST | — | DISCONNECTED |
| /api/admin/jobs/[id]/reassign | GET,POST | hooks/useAdminRealtimeJobs.ts | CONNECTED |
| /api/admin/jobs/live | GET | hooks/useAdminRealtimeJobs.ts | CONNECTED |
| /api/admin/kpis | GET | app/dashboard/admin/page.tsx | CONNECTED |
| /api/admin/metrics/realtime | GET | components/admin/RealtimeMetricsPanel.tsx, hooks/useAdminRealtimeJobs.ts | CONNECTED |
| /api/admin/onboarding-analytics | GET | — | DISCONNECTED |
| /api/admin/payments/reconcile | GET | — | DISCONNECTED |
| /api/admin/pricing/calculate | GET,POST | — | DISCONNECTED |
| /api/admin/reports/ai-generate | GET,POST | — | DISCONNECTED |
| /api/admin/seed-demo | POST | — | DISCONNECTED |
| /api/admin/service-categories | GET,POST | app/dashboard/admin/preferences/page.tsx, app/dashboard/admin/page.tsx, components/onboarding/service-selection.tsx | CONNECTED |
| /api/admin/service-requests/[id]/callout/release | POST | — | DISCONNECTED |
| /api/admin/services | GET,POST | app/dashboard/admin/preferences/page.tsx, app/dashboard/admin/page.tsx | CONNECTED |
| /api/admin/storage/cleanup | GET,DELETE | — | DISCONNECTED |
| /api/admin/tenant-billing/checkout | POST | — | DISCONNECTED |
| /api/admin/tenant-billing/portal | GET | — | DISCONNECTED |
| /api/admin/tenant-billing/status | GET | — | DISCONNECTED |
| /api/admin/tenants | GET,POST | — | DISCONNECTED |
| /api/admin/themes | GET,POST | app/dashboard/admin/preferences/page.tsx, app/dashboard/admin/page.tsx, components/onboarding/service-selection.tsx | CONNECTED |
| /api/admin/training | GET,POST | — | DISCONNECTED |
| /api/admin/training-modules | GET,POST,PATCH,DELETE | — | DISCONNECTED |
| /api/admin/users | GET | — | DISCONNECTED |
| /api/admin/users/[id] | GET,PATCH,DELETE | — | DISCONNECTED |
| /api/admin/webhooks/events | GET | app/(dashboard)/admin/webhooks/page.tsx | CONNECTED |
| /api/admin/white-label | GET,POST | — | DISCONNECTED |
| /api/admin/white-label-stats | GET | app/dashboard/admin/page.tsx | CONNECTED |

**Admin domain summary:** 38 CONNECTED, 24 DISCONNECTED

---

## Domain: Client (`/api/client/`)

34 routes total.

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/client/active-projects | GET | app/dashboard/client/page.tsx | CONNECTED |
| /api/client/active-projects/[id]/complete | POST | app/dashboard/client/page.tsx | CONNECTED |
| /api/client/analytics/dashboard | GET | app/dashboard/client/analytics/page.tsx | CONNECTED |
| /api/client/analytics/spending | GET | app/dashboard/client/analytics/spending/page.tsx | CONNECTED |
| /api/client/claims | GET,POST | app/dashboard/client/claims/page.tsx, app/dashboard/client/claims/new/page.tsx, app/dashboard/client/page.tsx | CONNECTED |
| /api/client/claims/[id] | GET | app/dashboard/client/claims/[claimId]/page.tsx | CONNECTED |
| /api/client/claims/[id]/accept-bid | POST | app/dashboard/client/claims/[claimId]/page.tsx | CONNECTED |
| /api/client/claims/[id]/invoice | GET | app/dashboard/client/claims/[claimId]/page.tsx | CONNECTED |
| /api/client/claims/[id]/message | POST | app/dashboard/client/claims/[claimId]/page.tsx | CONNECTED |
| /api/client/contractors | GET | — | DISCONNECTED |
| /api/client/eligibility | GET | app/dashboard/client/onboarding/checklist/page.tsx | CONNECTED |
| /api/client/feedback | GET,POST | — | DISCONNECTED |
| /api/client/offers | GET | — | DISCONNECTED |
| /api/client/offers/[id]/accept | POST | — | DISCONNECTED |
| /api/client/offers/[id]/reject | POST | — | DISCONNECTED |
| /api/client/onboarding | GET,POST | — | DISCONNECTED |
| /api/client/onboarding/communication | POST | app/dashboard/client/onboarding/communication/page.tsx | CONNECTED |
| /api/client/onboarding/complete | POST | app/dashboard/client/onboarding/complete/page.tsx | CONNECTED |
| /api/client/onboarding/education/module/complete | POST | app/dashboard/client/onboarding/education/module/[moduleId]/page.tsx | CONNECTED |
| /api/client/onboarding/education/module/start | POST | app/dashboard/client/onboarding/education/module/[moduleId]/page.tsx | CONNECTED |
| /api/client/onboarding/education/modules | GET | app/dashboard/client/onboarding/education/page.tsx | CONNECTED |
| /api/client/onboarding/insurance | POST | app/dashboard/client/onboarding/insurance/page.tsx | CONNECTED |
| /api/client/onboarding/payment | POST | app/dashboard/client/onboarding/payment/page.tsx | CONNECTED |
| /api/client/onboarding/profile | POST | app/dashboard/client/onboarding/profile/page.tsx | CONNECTED |
| /api/client/onboarding/progress/[clientId] | GET | app/dashboard/client/onboarding/page.tsx, app/dashboard/client/onboarding/certificate/page.tsx | CONNECTED |
| /api/client/onboarding/property | POST | app/dashboard/client/onboarding/property/page.tsx | CONNECTED |
| /api/client/onboarding/send-resume-link | POST | — | DISCONNECTED |
| /api/client/onboarding/services | POST | app/dashboard/client/onboarding/services/page.tsx | CONNECTED |
| /api/client/onboarding/start | POST | app/dashboard/client/onboarding/page.tsx | CONNECTED |
| /api/client/payments | GET | app/dashboard/client/payments/page.tsx | CONNECTED |
| /api/client/preferences | GET,PUT | — | DISCONNECTED |
| /api/client/properties | GET | app/dashboard/properties/page.tsx, app/dashboard/jobs/new/page.tsx | CONNECTED |
| /api/client/requests | GET | — | DISCONNECTED |
| /api/client/subscription | GET,PUT | — | DISCONNECTED |

**Client domain summary:** 22 CONNECTED, 12 DISCONNECTED

---

## Domain: Contractor (`/api/contractor/`)

26 routes total. (Includes both `/api/contractor/` scoped and `/api/contractors/` shared)

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/contractor | GET,POST | app/dashboard/jobs/[id]/assign/page.tsx | CONNECTED |
| /api/contractor/[contractorId] | GET,PATCH | app/contractor/[id]/page.tsx | CONNECTED |
| /api/contractor/[contractorId]/track-view | POST | components/contractor/profile-view-tracker.tsx | CONNECTED |
| /api/contractor/active-projects | GET | app/dashboard/contractor/page.tsx | CONNECTED |
| /api/contractor/analytics | GET | app/dashboard/contractor/page.tsx, components/contractor/analytics-widget.tsx | CONNECTED |
| /api/contractor/analytics/dashboard | GET | app/dashboard/contractor/analytics/page.tsx | CONNECTED |
| /api/contractor/analytics/performance | GET | app/dashboard/contractor/analytics/performance/page.tsx | CONNECTED |
| /api/contractor/availability | GET,PATCH,DELETE | app/dashboard/contractor/page.tsx | CONNECTED |
| /api/contractor/available-requests | GET | app/dashboard/contractor/available-requests/page.tsx, app/dashboard/contractor/page.tsx, components/configurable/available-requests-section.tsx | CONNECTED |
| /api/contractor/bids | GET,POST | app/dashboard/contractor/available-requests/[requestId]/page.tsx | CONNECTED |
| /api/contractor/bids/[matchId]/respond | POST | — | DISCONNECTED |
| /api/contractor/claims/[claimId]/respond | GET,POST | — | DISCONNECTED |
| /api/contractor/earnings | GET | app/dashboard/contractor/earnings/page.tsx | CONNECTED |
| /api/contractor/eligibility | GET | — | DISCONNECTED |
| /api/contractor/jobs/[jobId]/complete | POST | — | DISCONNECTED |
| /api/contractor/my-bids | GET | components/configurable/my-bids-section.tsx | CONNECTED |
| /api/contractor/payout-settings | GET,PUT | — | DISCONNECTED |
| /api/contractor/preferences | GET,POST | app/dashboard/contractor/preferences/page.tsx, app/dashboard/contractor/page.tsx, app/signup/page.tsx | CONNECTED |
| /api/contractor/profile | GET,POST,PUT | app/dashboard/contractor/profile-setup/page.tsx, app/dashboard/contractor/page.tsx, app/signup/page.tsx | CONNECTED |
| /api/contractor/requests/[id]/bid | POST | components/configurable/available-requests-section.tsx, components/configurable/request-details-modal.tsx | CONNECTED |
| /api/contractor/stats | GET | — | DISCONNECTED |
| /api/contractor/stripe/connect/onboard | POST | app/dashboard/contractor/onboarding/payouts/page.tsx | CONNECTED |
| /api/contractor/stripe/connect/status | GET | app/dashboard/contractor/onboarding/checklist/page.tsx, app/dashboard/contractor/onboarding/payouts/page.tsx | CONNECTED |
| /api/contractor/verification/documents | GET,POST,DELETE | components/contractor/DocumentUpload.tsx | CONNECTED |
| /api/contractor/verification/profile | GET,PUT | app/dashboard/contractor/verification/page.tsx | CONNECTED |
| /api/contractor/verification/service-areas | GET,POST,PUT,DELETE | components/contractor/ServiceAreaManager.tsx | CONNECTED |
| /api/contractors/[id]/reviews | GET,POST | components/reviews/ReviewSubmissionForm.tsx, components/reviews/ReviewList.tsx | CONNECTED |
| /api/contractors/[id]/verify | PATCH | components/admin/contractor-verification-dashboard.tsx | CONNECTED |
| /api/contractors/[id]/verify-licence | POST | — | DISCONNECTED |
| /api/contractors/available | GET | — | DISCONNECTED |
| /api/contractors/me | GET | app/dashboard/contractor/onboarding/checklist/page.tsx | CONNECTED |
| /api/contractors/register | GET,POST | app/dashboard/contractor/onboarding/nrpg-registration/page.tsx, components/admin/contractor-verification-dashboard.tsx | CONNECTED |
| /api/contractors/search | GET | components/contractor/contractor-search-interface.tsx | CONNECTED |

**Contractor domain summary:** 24 CONNECTED, 9 DISCONNECTED

---

## Domain: Payments / Stripe

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/payments | GET,POST | — | DISCONNECTED |
| /api/payments/[id] | GET,PATCH | — | DISCONNECTED |
| /api/payments/[id]/refund | POST | — | DISCONNECTED |
| /api/payments/booking/[bookingId] | GET,POST | — | DISCONNECTED |
| /api/payments/payout/[bookingId] | GET,POST | — | DISCONNECTED |
| /api/payments/payout/manual | POST | — | DISCONNECTED |
| /api/payments/refund/[paymentId] | GET,POST | — | DISCONNECTED |
| /api/realtime/billing/checkout | POST | hooks/useRealtimeSubscription.ts | CONNECTED |
| /api/realtime/billing/portal | POST | hooks/useRealtimeSubscription.ts | CONNECTED |
| /api/store/checkout | POST | app/(public)/store/cart/CartCheckout.tsx | CONNECTED |
| /api/store/products | GET | — | DISCONNECTED |
| /api/stripe/webhook | POST | External (Stripe) | WEBHOOK-ONLY |
| /api/subscription/checkout | POST | — | DISCONNECTED |
| /api/subscription/upgrade | POST | — | DISCONNECTED |
| /api/webhooks/stripe/payments | POST | External (Stripe) | WEBHOOK-ONLY |
| /api/webhooks/stripe/realtime | POST | External (Stripe) | WEBHOOK-ONLY |
| /api/webhooks/stripe/subscription | POST | External (Stripe) | WEBHOOK-ONLY |
| /api/webhooks/stripe/tenant | POST | External (Stripe) | WEBHOOK-ONLY |

**Payments domain summary:** 3 CONNECTED, 10 DISCONNECTED, 5 WEBHOOK-ONLY

---

## Domain: Shared / Public

All remaining routes not in Admin, Client, Contractor, or Payments domains.

### Auth

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/auth/[...nextauth] | — | Next-Auth framework (automatic) | CONNECTED |
| /api/auth/2fa/setup | GET,POST | app/dashboard/settings/security/page.tsx | CONNECTED |
| /api/auth/2fa/verify | POST,PUT,DELETE | app/dashboard/settings/security/page.tsx, app/auth/2fa/page.tsx | CONNECTED |
| /api/auth/logout | POST | — | DISCONNECTED |
| /api/auth/me | GET | app/login/page.tsx | CONNECTED |
| /api/auth/register | POST | contexts/AuthContext.tsx | CONNECTED |
| /api/auth/resend-verification | POST | app/auth/verify-email/page.tsx | CONNECTED |
| /api/auth/reset-password | POST,PUT | — | DISCONNECTED |
| /api/auth/verify-email | GET,POST,PUT | app/auth/verify-email/page.tsx | CONNECTED |

### AI

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/ai/chat | GET,POST | components/ai/ai-chat-widget.tsx | CONNECTED |
| /api/ai/claim-assist | POST | components/ai/claim-assistant.tsx | CONNECTED |
| /api/ai/extract | POST | — | DISCONNECTED |
| /api/ai/process | GET,POST | — | DISCONNECTED |
| /api/ai/semantic-search | POST | components/ai/semantic-search-input.tsx | CONNECTED |
| /api/ai/summarize | POST | — | DISCONNECTED |
| /api/agents/orchestrate | GET,POST | — | DISCONNECTED |
| /api/agents/status/[jobId] | GET,POST | — | DISCONNECTED |
| /api/super-orchestrator | GET,POST | — | DISCONNECTED |

### Analytics (Shared)

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/analytics/client | GET | — | DISCONNECTED |
| /api/analytics/events | GET,POST | — | DISCONNECTED |
| /api/analytics/leads | GET | app/dashboard/admin/page.tsx | CONNECTED |
| /api/analytics/metrics | GET | — | DISCONNECTED |
| /api/analytics/realtime | GET | — | DISCONNECTED |
| /api/analytics/search | GET,POST | — | DISCONNECTED |

### Beta

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/beta/enrollment | GET,POST | hooks/useBetaEnrollment.ts | CONNECTED |
| /api/beta/feedback | GET,POST | hooks/useBetaEnrollment.ts | CONNECTED |
| /api/beta/nps | GET,POST | hooks/useBetaEnrollment.ts | CONNECTED |

### Blog / CMS

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/blog | GET,POST | — | DISCONNECTED |
| /api/blog/[slug] | GET,PUT,DELETE | — | DISCONNECTED |
| /api/blog/cron/publish | GET,POST | Cron job (automated) | WEBHOOK-ONLY |

### Bookings

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/bookings | GET,POST | app/dashboard/client/page.tsx, components/booking/BookingForm.tsx, components/booking/disaster-recovery-booking-form.tsx, components/insurance/claim-submission-form.tsx | CONNECTED |
| /api/bookings/[id] | GET,PATCH,DELETE | — | DISCONNECTED |
| /api/bookings/[id]/assign | POST,DELETE | — | DISCONNECTED |

### Claims (Shared)

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/claims | GET,POST | app/dashboard/claims/page.tsx, components/insurance/claim-submission-form.tsx, hooks/client/useClaimWorkflow.ts | CONNECTED |
| /api/claims/[id] | GET,PATCH | app/dashboard/claims/[claimId]/page.tsx | CONNECTED |
| /api/claims/[id]/documents | GET,POST | app/dashboard/claims/[claimId]/page.tsx | CONNECTED |
| /api/claims/[id]/report | GET | app/dashboard/claims/[claimId]/page.tsx | CONNECTED |

### Competitor Analysis

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/competitor-analysis/analyze/[id] | POST | app/dashboard/admin/competitors/page.tsx | CONNECTED |
| /api/competitor-analysis/competitors | GET,POST,PUT,DELETE | app/dashboard/admin/competitors/page.tsx | CONNECTED |
| /api/competitor-analysis/competitors/[id]/analyze | GET,POST | — | DISCONNECTED |
| /api/competitor-analysis/keywords | GET | app/dashboard/admin/competitors/page.tsx | CONNECTED |
| /api/competitor-analysis/keywords/gaps | GET,POST | — | DISCONNECTED |
| /api/competitor-analysis/opportunities | GET | app/dashboard/admin/competitors/page.tsx | CONNECTED |
| /api/competitor-analysis/overview | GET | app/dashboard/admin/competitors/page.tsx | CONNECTED |
| /api/competitor-analysis/swot | GET,POST | — | DISCONNECTED |
| /api/competitor-analysis/swot/[id] | GET | app/dashboard/admin/competitors/page.tsx | CONNECTED |

### CRM

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/crm/accountability/dashboard | GET,POST | — | DISCONNECTED |
| /api/crm/accountability/violations | GET | — | DISCONNECTED |
| /api/crm/activities | GET,POST | — | DISCONNECTED |
| /api/crm/customers/[userId]/360 | GET,POST | — | DISCONNECTED |
| /api/crm/opportunities | GET,POST | — | DISCONNECTED |
| /api/crm/pipeline | GET | — | DISCONNECTED |
| /api/crm/tasks | GET,POST | — | DISCONNECTED |

### Cron

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/cron/cleanup-old-runs | GET | Cron scheduler | WEBHOOK-ONLY |
| /api/cron/daily-report | GET | Cron scheduler | WEBHOOK-ONLY |
| /api/cron/health-check | GET | Cron scheduler | WEBHOOK-ONLY |
| /api/cron/job-alerts | GET | Cron scheduler | WEBHOOK-ONLY |
| /api/cron/process-background-jobs | GET,POST | Cron scheduler | WEBHOOK-ONLY |
| /api/cron/process-email-queue | GET,POST | Cron scheduler | WEBHOOK-ONLY |
| /api/search-dominance/cron/[job] | GET | Cron scheduler | WEBHOOK-ONLY |

### CSRF / Security

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/csrf | GET | — | DISCONNECTED |
| /api/csrf/token | GET | — | DISCONNECTED |
| /api/security/alerts | GET,POST,PUT,DELETE | app/dashboard/admin/security/page.tsx | CONNECTED |
| /api/security/upload | GET,POST | components/forms/secure-file-upload.tsx | CONNECTED |

### FAQ / Misc Public

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/active-projects/[id] | GET | components/configurable/active-project-details-modal.tsx | CONNECTED |
| /api/calculate | POST | app/cost-estimate/page.tsx | CONNECTED |
| /api/case-studies | GET,POST | — | DISCONNECTED |
| /api/disasters/analyze | POST | — | DISCONNECTED |
| /api/faq | GET,POST | — | DISCONNECTED |
| /api/faq/[id]/helpful | POST | — | DISCONNECTED |
| /api/fraud-detection | GET,POST | — | DISCONNECTED |
| /api/fraud-detection/analyze | POST | — | DISCONNECTED |
| /api/landing/contractor-application | POST | — | DISCONNECTED |
| /api/landing/waitlist | POST | components/landing/email-capture-form.tsx | CONNECTED |
| /api/leaderboard | GET | — | DISCONNECTED |
| /api/matching | POST | — | DISCONNECTED |
| /api/metrics | GET | — | DISCONNECTED |
| /api/ping | GET | Infrastructure monitoring | CONNECTED |
| /api/projects | GET | — | DISCONNECTED |
| /api/revalidate | GET,POST | — | DISCONNECTED |
| /api/search | GET | — | DISCONNECTED |
| /api/socket | GET | — | DISCONNECTED |
| /api/status | GET | — | DISCONNECTED |
| /api/system-check | GET | — | DISCONNECTED |

### Health

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/health | GET | Infrastructure monitoring | CONNECTED |
| /api/health/db | GET | Infrastructure monitoring | CONNECTED |
| /api/health/deep | GET | Infrastructure monitoring | CONNECTED |
| /api/health/routes | GET | Infrastructure monitoring | CONNECTED |
| /api/public/health | GET | Infrastructure monitoring | CONNECTED |

### Invoices

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/invoices | GET | — | DISCONNECTED |
| /api/invoices/[invoiceId] | GET,DELETE | — | DISCONNECTED |
| /api/invoices/[invoiceId]/pdf | GET | app/dashboard/client/payments/page.tsx | CONNECTED |

### Jobs (Shared)

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/jobs | GET,POST | app/dashboard/jobs/page.tsx, app/dashboard/jobs/new/page.tsx | CONNECTED |
| /api/jobs/[id] | GET,PATCH | app/dashboard/jobs/[id]/page.tsx, app/dashboard/jobs/[id]/scope/page.tsx | CONNECTED |
| /api/jobs/[id]/assign | POST | app/dashboard/jobs/[id]/assign/page.tsx | CONNECTED |
| /api/jobs/[id]/complete | POST | app/dashboard/jobs/[id]/complete/page.tsx | CONNECTED |
| /api/jobs/[id]/documents | POST | — | DISCONNECTED |
| /api/jobs/[id]/invoice | POST | app/dashboard/jobs/[id]/invoice/page.tsx | CONNECTED |
| /api/jobs/contractor-matching | GET,POST | — | DISCONNECTED |

### Local SEO

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/local-seo/backlinks | GET,POST,PATCH | — | DISCONNECTED |
| /api/local-seo/citations | GET,POST,PATCH | — | DISCONNECTED |
| /api/local-seo/gbp | GET,POST,PATCH,DELETE | — | DISCONNECTED |

### Marketing / Lead

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/marketing/decision-makers | GET | — | DISCONNECTED |
| /api/newsletter/subscribe | GET,POST | components/resources/NewsletterSignup.tsx | CONNECTED |

### Messages

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/messages | GET,POST | app/dashboard/client/page.tsx, components/floating-chat-widget.tsx | CONNECTED |
| /api/messages/initiate | POST | components/configurable/request-details-modal.tsx | CONNECTED |

### Notifications

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/notifications | GET,POST,PATCH | app/dashboard/client/page.tsx, components/realtime/RealtimeNotifications.tsx | CONNECTED |
| /api/notifications/preferences | GET,PUT | app/dashboard/settings/notifications/page.tsx | CONNECTED |
| /api/notifications/sms | GET,POST | — | DISCONNECTED |

### Onboarding (Contractor)

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/onboarding/assessment | POST | — | DISCONNECTED |
| /api/onboarding/certificate | GET | app/dashboard/contractor/onboarding/certificate/page.tsx | CONNECTED |
| /api/onboarding/courses | GET | app/dashboard/contractor/onboarding/nrpg/page.tsx, app/dashboard/contractor/onboarding/training/page.tsx | CONNECTED |
| /api/onboarding/courses/[courseId] | GET | app/dashboard/contractor/onboarding/training/[courseId]/page.tsx | CONNECTED |
| /api/onboarding/module/[moduleId]/content | GET,POST | — | DISCONNECTED |
| /api/onboarding/module/start | POST | app/dashboard/contractor/onboarding/module/[moduleId]/page.tsx | CONNECTED |
| /api/onboarding/nrpg/certification | GET,POST | app/dashboard/contractor/onboarding/checklist/page.tsx, app/dashboard/contractor/onboarding/nrpg/page.tsx | CONNECTED |
| /api/onboarding/nrpg/commitment | GET,POST | app/dashboard/contractor/onboarding/nrpg/commitment/page.tsx | CONNECTED |
| /api/onboarding/nrpg/phases | GET,PATCH | app/dashboard/contractor/onboarding/checklist/page.tsx, app/dashboard/contractor/onboarding/nrpg/page.tsx | CONNECTED |
| /api/onboarding/nrpg/verification | GET,POST | app/dashboard/contractor/onboarding/nrpg/verification/page.tsx | CONNECTED |
| /api/onboarding/progress/[contractorId] | GET | app/dashboard/contractor/onboarding/page.tsx, app/dashboard/contractor/onboarding/checklist/page.tsx | CONNECTED |
| /api/onboarding/quiz | POST | — | DISCONNECTED |
| /api/onboarding/start | POST | app/dashboard/contractor/onboarding/page.tsx | CONNECTED |

### Public Routes

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/public/analytics/events | POST | — | DISCONNECTED |
| /api/public/claims/submit | POST | app/claim/step-3/page.tsx | CONNECTED |
| /api/public/client-feedback | POST | — | DISCONNECTED |
| /api/public/contractor-inquiry | POST | — | DISCONNECTED |
| /api/public/contractor/application | POST | — | DISCONNECTED |
| /api/public/contractor/validate-abn | POST | — | DISCONNECTED |
| /api/public/contractors/[contractorId]/service-areas | GET | components/contractor/ServiceAreaMap.tsx | CONNECTED |
| /api/public/contractors/search | GET | components/contractor/public-contractor-search.tsx | CONNECTED |
| /api/public/lead-capture | POST | — | DISCONNECTED |
| /api/public/newsletter | POST,DELETE | — | DISCONNECTED |
| /api/public/service-requests | POST | components/onboarding/ClientOnboardingWizard.tsx | CONNECTED |
| /api/public/triage | POST | — | DISCONNECTED |

### Ratings / Reviews

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/ratings | GET,POST | components/reviews/review-form.tsx, components/reviews/review-list.tsx | CONNECTED |
| /api/ratings/[id] | GET,PATCH,DELETE | components/reviews/review-card.tsx | CONNECTED |
| /api/reviews/[reviewId] | POST,PUT,DELETE | — | DISCONNECTED |

### Realtime

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/realtime/jobs/live | GET | app/dashboard/client/track/page.tsx | CONNECTED |
| /api/realtime/jobs/[id]/call | GET,POST,PATCH | hooks/useJobCall.ts | CONNECTED |
| /api/realtime/jobs/[id]/call/signal | POST | hooks/useJobCall.ts | CONNECTED |
| /api/realtime/jobs/[id]/eta | GET | hooks/useETACalculation.ts | CONNECTED |
| /api/realtime/jobs/[id]/location | GET,POST | hooks/useContractorLocation.ts | CONNECTED |
| /api/realtime/jobs/[id]/messages | GET,POST | components/realtime/JobMessaging.tsx, hooks/useJobMessaging.ts | CONNECTED |
| /api/realtime/jobs/[id]/status | GET,POST | components/realtime/ClientJobTracker.tsx | CONNECTED |
| /api/realtime/notifications/settings | GET,PUT | components/realtime/NotificationSettings.tsx | CONNECTED |
| /api/realtime/subscription | GET,POST,DELETE | app/dashboard/contractor/notifications/subscription/page.tsx, hooks/useRealtimeSubscription.ts | CONNECTED |
| /api/realtime/tier/check | GET | hooks/useTierGating.ts | CONNECTED |

### Reports

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/reports | GET | app/dashboard/reports/page.tsx | CONNECTED |
| /api/reports/export | POST | — | DISCONNECTED |

### Resources / Misc

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/pricing/callout | GET | — | DISCONNECTED |
| /api/resources/track-download | GET,POST | components/resources/DownloadButton.tsx | CONNECTED |

### Search Dominance

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/search-dominance/alerts | GET,PATCH | components/admin/search-dominance/AlertFeed.tsx | CONNECTED |
| /api/search-dominance/algorithm | GET | components/admin/search-dominance/AlgorithmTimeline.tsx | CONNECTED |
| /api/search-dominance/blue-ocean | GET,POST | components/admin/search-dominance/BlueOceanRadar.tsx | CONNECTED |
| /api/search-dominance/blue-ocean/[id] | GET,PATCH | components/admin/search-dominance/BlueOceanRadar.tsx | CONNECTED |
| /api/search-dominance/competitors/activity | GET | components/admin/search-dominance/CompetitorActivityFeed.tsx | CONNECTED |
| /api/search-dominance/cron/[job] | GET | Cron scheduler | WEBHOOK-ONLY |
| /api/search-dominance/metrics | GET | components/admin/search-dominance/RankingSnapshot.tsx, components/admin/search-dominance/DominanceScoreGauge.tsx | CONNECTED |
| /api/search-dominance/rankings | GET | components/admin/search-dominance/RankingsTable.tsx | CONNECTED |
| /api/search-dominance/territory | GET | components/admin/search-dominance/TerritoryMap.tsx | CONNECTED |
| /api/search-dominance/traffic | GET | components/admin/search-dominance/TrafficChart.tsx | CONNECTED |

### Service Requests

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/service-requests | GET,POST | app/dashboard/client/page.tsx, hooks/client/useServiceRequests.ts | CONNECTED |
| /api/service-requests/[id] | GET | components/configurable/request-details-modal.tsx | CONNECTED |
| /api/service-requests/[id]/callout/checkout | POST | components/payments/callout-checkout-panel.tsx | CONNECTED |
| /api/service-requests/[id]/callout/verify | POST | components/payments/callout-checkout-panel.tsx | CONNECTED |
| /api/service-requests/[id]/cancel | PATCH | hooks/client/useServiceRequests.ts | CONNECTED |
| /api/service-requests/[id]/matches | GET | — | DISCONNECTED |
| /api/service-requests/search | GET | hooks/useServiceRequestSearch.ts | CONNECTED |

### Storage / Upload

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/storage/signed-url | POST | — | DISCONNECTED |
| /api/upload | POST | components/client/DamageAssessmentUpload.tsx, components/contractor/DocumentUpload.tsx | CONNECTED |
| /api/upload/signed-url | GET,POST | components/upload/PhotoUpload.tsx | CONNECTED |

### Tenants / Workspace

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/tenant | GET | — | DISCONNECTED |
| /api/tenant/[tenantId]/config | POST | — | DISCONNECTED |
| /api/tenants | GET,POST | app/dashboard/admin/tenants/page.tsx | CONNECTED |
| /api/tenants/[tenantId]/config | GET,PUT | — | DISCONNECTED |
| /api/tenants/check-availability | GET | components/tenant/tenant-onboarding-wizard.tsx | CONNECTED |
| /api/tenants/example | POST | — | DISCONNECTED |
| /api/tenants/signup | POST | components/tenant/tenant-onboarding-wizard.tsx | CONNECTED |
| /api/workspace/create | POST | — | DISCONNECTED |
| /api/workspace/invite | POST | — | DISCONNECTED |
| /api/workspace/usage | GET | — | DISCONNECTED |

### Training (NRP)

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/training/nrp/debug | GET | — | DISCONNECTED |
| /api/training/nrp/index | GET | — | DISCONNECTED |
| /api/training/nrp/module/[moduleId] | GET | app/dashboard/contractor/onboarding/module/[moduleId]/page.tsx | CONNECTED |
| /api/training/nrp/quiz/[moduleNumber] | GET | — | DISCONNECTED |

### User

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/user/preferences | GET,POST | app/dashboard/client/page.tsx, app/signup/page.tsx | CONNECTED |

### Webhooks (External)

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/webhooks/cron/health-check | GET | Cron scheduler | WEBHOOK-ONLY |
| /api/webhooks/monitoring | GET,POST | External monitoring service | WEBHOOK-ONLY |
| /api/webhooks/printful | POST | External (Printful) | WEBHOOK-ONLY |
| /api/webhooks/sanity | GET,POST | External (Sanity CMS) | WEBHOOK-ONLY |
| /api/webhooks/xero | POST | External (Xero) | WEBHOOK-ONLY |

### Xero Integration

| Route Path | Methods | Consumers | Status |
|---|---|---|---|
| /api/xero/auth | GET | components/dashboard/XeroWidget.tsx | CONNECTED |
| /api/xero/callback | GET | — | DISCONNECTED |
| /api/xero/disconnect | POST | components/dashboard/XeroWidget.tsx | CONNECTED |
| /api/xero/financials | GET | components/dashboard/XeroWidget.tsx | CONNECTED |
| /api/xero/invoices | GET | components/dashboard/XeroWidget.tsx | CONNECTED |
| /api/xero/overdue | GET | components/dashboard/XeroWidget.tsx | CONNECTED |

---

## Top DISCONNECTED Routes by Priority

Routes that are most critical to wire up (grouped by feature area):

### High Priority — Core Business Flows Missing Consumers

| Route | Methods | Why Critical |
|---|---|---|
| /api/admin/tenant-billing/checkout | POST | Tenant billing onboarding not wired to UI |
| /api/admin/tenant-billing/portal | GET | Tenant billing portal not accessible from admin |
| /api/admin/tenant-billing/status | GET | No billing status display in admin |
| /api/subscription/checkout | POST | Subscription purchase flow disconnected |
| /api/subscription/upgrade | POST | Upgrade flow disconnected |
| /api/payments | GET,POST | Payment list/create has no UI consumer |
| /api/payments/[id] | GET,PATCH | Individual payment management not wired |
| /api/contractor/payout-settings | GET,PUT | Payout settings UI is missing |
| /api/contractor/jobs/[jobId]/complete | POST | Job completion for contractor not wired |
| /api/contractor/bids/[matchId]/respond | POST | Bid response flow incomplete |
| /api/client/offers | GET | Client offers list not consumed |
| /api/client/offers/[id]/accept | POST | Offer acceptance not wired |
| /api/client/offers/[id]/reject | POST | Offer rejection not wired |
| /api/admin/users | GET | User management table missing |
| /api/admin/users/[id] | GET,PATCH,DELETE | User detail/edit not wired |
| /api/workspace/create | POST | Workspace creation not connected |
| /api/workspace/invite | POST | Invite flow not wired |

### Medium Priority — Analytics & Admin Tools

| Route | Methods | Why |
|---|---|---|
| /api/admin/analytics/operational | GET | Operational analytics page missing |
| /api/admin/analytics/revenue | GET | Revenue analytics page missing |
| /api/admin/claims/match | GET,POST | Claims matching UI not connected |
| /api/admin/claims/triage | GET,POST | Claims triage not connected |
| /api/admin/disputes | GET,POST | Disputes management UI missing |
| /api/admin/training | GET,POST | Training management not wired |
| /api/admin/training-modules | GET,POST,PATCH,DELETE | Training module CRUD not connected |
| /api/admin/white-label | GET,POST | White-label management not connected |
| /api/crm/pipeline | GET | CRM pipeline has no UI |
| /api/crm/activities | GET,POST | CRM activities not wired |
| /api/crm/opportunities | GET,POST | CRM opportunities not wired |
| /api/crm/tasks | GET,POST | CRM tasks not wired |
| /api/crm/customers/[userId]/360 | GET,POST | 360 customer view not wired |

### Lower Priority — Infrastructure & Edge Cases

| Route | Methods | Why |
|---|---|---|
| /api/csrf | GET | CSRF token fetch (may be middleware-handled) |
| /api/csrf/token | GET | CSRF token endpoint |
| /api/auth/logout | POST | Logout should be wired (likely via NextAuth signOut) |
| /api/auth/reset-password | POST,PUT | Password reset flow not visible |
| /api/blog | GET,POST | Blog listing not connected |
| /api/blog/[slug] | GET,PUT,DELETE | Blog post detail not connected |
| /api/xero/callback | GET | Xero OAuth callback (likely handled by NextAuth-style redirect) |
| /api/local-seo/backlinks | GET,POST,PATCH | Local SEO features not wired |
| /api/local-seo/citations | GET,POST,PATCH | Citations management not wired |
| /api/local-seo/gbp | GET,POST,PATCH,DELETE | Google Business Profile not wired |
| /api/invoices | GET | Invoice list not connected |
| /api/invoices/[invoiceId] | GET,DELETE | Invoice detail not wired |

---

## Notes

1. **`/api/auth/register`** — called from `contexts/AuthContext.tsx` (connected, marked CONNECTED).
2. **`/api/auth/logout`** — no explicit fetch call found; likely handled via NextAuth `signOut()` which calls `/api/auth/[...nextauth]`. Marked DISCONNECTED to flag for verification.
3. **`/api/xero/callback`** — OAuth callback redirect URL; unlikely to be called directly from frontend. Flagged for verification.
4. **CRM domain (7 routes)** — entirely disconnected. The CRM module exists as API only with no dashboard UI.
5. **Local SEO domain (3 routes)** — entirely disconnected. Built as backend but no admin UI pages found.
6. **Payments domain** — Only `booking/checkout` and `billing` flows are wired. The main `/api/payments/*` CRUD endpoints have no frontend consumers — these appear to be admin-facing payment management tools without a built UI.
7. **`/api/admin/seed-demo`** — intentionally backend-only (developer tool). Could be classified ADMIN-ONLY.
8. **`/api/admin/storage/cleanup`** — likely a cron or admin-triggered operation. Could be WEBHOOK-ONLY or ADMIN-ONLY.
