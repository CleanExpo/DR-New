# Master Pre-Production Checklist — DR Client Website

> **DR-212** | Owner: Engineering | Target: Before first production deploy of industry hub features
>
> This checklist covers the DR Client Website (`apps/web`) and specifically the
> industry-partner feature set built in sprints DR-32 through DR-214.
>
> **Status key:** ✅ Done · ⬜ Pending · 🔴 Blocker

---

## 1. Infrastructure & Environment

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1.1 | `DATABASE_URL` (Supabase pooled) set in Vercel Production | ⬜ | |
| 1.2 | `DIRECT_URL` (Supabase direct) set in Vercel Production | ⬜ | Required for Prisma migrations |
| 1.3 | `NEXTAUTH_SECRET` (32+ char random) set in Vercel Production | ⬜ | |
| 1.4 | `NEXTAUTH_URL` set to `https://disasterrecovery.com.au` | ⬜ | |
| 1.5 | `NEXT_PUBLIC_BASE_URL` set to `https://disasterrecovery.com.au` | ⬜ | |
| 1.6 | `STRIPE_SECRET_KEY` (live key) in Vercel Production | ⬜ | |
| 1.7 | `STRIPE_PUBLISHABLE_KEY` (live key) in Vercel Production | ⬜ | |
| 1.8 | `STRIPE_WEBHOOK_SECRET` (main platform) in Vercel Production | ⬜ | |
| 1.9 | `STRIPE_IP_STANDARD_MONTHLY_PRICE_ID` in Vercel Production | ⬜ | Run `scripts/stripe-setup-industry-partners.ts` first |
| 1.10 | `STRIPE_IP_STANDARD_ANNUAL_PRICE_ID` in Vercel Production | ⬜ | |
| 1.11 | `STRIPE_IP_PREMIUM_MONTHLY_PRICE_ID` in Vercel Production | ⬜ | |
| 1.12 | `STRIPE_IP_PREMIUM_ANNUAL_PRICE_ID` in Vercel Production | ⬜ | |
| 1.13 | `STRIPE_IP_WEBHOOK_SECRET` in Vercel Production | ⬜ | Separate webhook endpoint |
| 1.14 | All env vars validated in Vercel preview deploy first | ⬜ | |

---

## 2. Database

| # | Item | Status | Notes |
|---|------|--------|-------|
| 2.1 | Prisma migrations run on production DB | ⬜ | `prisma migrate deploy` |
| 2.2 | Migration `20260403000000_add_industry_statistics` applied | ⬜ | Creates `industry_statistics` table + 54 seed rows |
| 2.3 | `IndustryPartner` table (`industry_partners`) created | ⬜ | Via Prisma migration |
| 2.4 | RLS policies set for `industry_statistics` (public read) | ⬜ | All rows are public; no user context needed |
| 2.5 | RLS policies set for `industry_partners` (restricted write) | ⬜ | Only service role can write |
| 2.6 | `prisma validate` passes against production DB | ⬜ | |
| 2.7 | Supabase backup verified before applying migrations | ⬜ | |

---

## 3. Stripe

| # | Item | Status | Notes |
|---|------|--------|-------|
| 3.1 | Stripe Products and Prices created (run setup script) | ⬜ | `npx ts-node scripts/stripe-setup-industry-partners.ts` |
| 3.2 | Webhook endpoint registered in Stripe Dashboard (live) | ⬜ | `https://disasterrecovery.com.au/api/industry-partners/webhook` |
| 3.3 | Webhook events configured: checkout.session.completed, customer.subscription.*, invoice.payment_* | ⬜ | |
| 3.4 | Webhook signing secret copied to `STRIPE_IP_WEBHOOK_SECRET` | ⬜ | |
| 3.5 | Test webhook delivery in Stripe Dashboard | ⬜ | Use "Send test webhook" |
| 3.6 | Stripe Customer Portal configured (return URL, branding) | ⬜ | |
| 3.7 | Tax settings configured for AUD GST (inclusive pricing) | ⬜ | |

---

## 4. CI/CD

| # | Item | Status | Notes |
|---|------|--------|-------|
| 4.1 | CI workflow uses `pnpm` (not `npm`) | ✅ | Fixed in feat/DR-212-213-214-preproduction |
| 4.2 | `pnpm/action-setup@v4` in all workflow steps | ✅ | |
| 4.3 | CI lint job passes on `develop` | ⬜ | |
| 4.4 | CI build job passes on `develop` | ⬜ | |
| 4.5 | Smoke tests pass (DR-213) | ⬜ | |
| 4.6 | E2E tests pass on staging (DR-214) | ⬜ | |
| 4.7 | Branch protection on `main` (requires CI) | ⬜ | See sandbox-setup plan |
| 4.8 | Branch protection on `develop` | ⬜ | |
| 4.9 | CODEOWNERS file in `.github/` | ⬜ | |

---

## 5. Industry Hub Pages

| # | Item | Status | Notes |
|---|------|--------|-------|
| 5.1 | `/industry-partners` hub page renders | ✅ | PR #25 |
| 5.2 | `/learn` IICRC learning hub renders | ✅ | PR #25 |
| 5.3 | `/guides` industry guides renders | ✅ | PR #25 |
| 5.4 | `/tools` tools landing renders | ✅ | PR #26 |
| 5.5 | `/tools/course-finder` renders and filters | ✅ | PR #26 |
| 5.6 | `/tools/drying-calculator` calculates correctly | ✅ | PR #26 |
| 5.7 | `/tools/templates` free + gated templates render | ✅ | PR #26 |
| 5.8 | `/directory` contractor listings and filters | ✅ | PR #26 |
| 5.9 | `/events/submit` form submits and shows success | ✅ | PR #26 |
| 5.10 | `/data` statistics page — all 9 categories render | ✅ | PR #27 |
| 5.11 | `/newsletter` subscribe form + archive | ✅ | PR #27 |
| 5.12 | `/industry-partners/join` 5-step form completes | ✅ | PR #27 |
| 5.13 | `/admin/approvals` queue loads and approve/reject works | ✅ | PR #27 |
| 5.14 | `/industry-partners/dashboard` all 4 tabs render | ✅ | PR #28 |
| 5.15 | `/events` calendar filters and lists events | ✅ | PR #28 |
| 5.16 | `/find-a-contractor` search → results flow | ✅ | PR #28 |

---

## 6. API Routes

| # | Item | Status | Notes |
|---|------|--------|-------|
| 6.1 | `/api/health` returns 200 | ⬜ | Used by smoke tests |
| 6.2 | `POST /api/industry-partners/checkout` returns `{ url }` | ✅ | PR #29 — needs STRIPE env |
| 6.3 | `POST /api/industry-partners/portal` returns `{ url }` | ✅ | PR #29 — needs STRIPE env |
| 6.4 | `POST /api/industry-partners/webhook` verifies signature | ✅ | PR #29 — needs STRIPE_IP_WEBHOOK_SECRET |
| 6.5 | Webhook Supabase writes implemented (currently TODO stubs) | 🔴 | Blocker for live billing — implement in follow-on sprint |

---

## 7. SEO & Schema

| # | Item | Status | Notes |
|---|------|--------|-------|
| 7.1 | All industry pages have `<title>` and `<meta description>` | ✅ | |
| 7.2 | BreadcrumbList JSON-LD on all industry hub pages | ✅ | |
| 7.3 | ItemList JSON-LD on `/events` and `/directory` | ✅ | |
| 7.4 | Dataset JSON-LD on `/data` | ✅ | |
| 7.5 | FAQPage JSON-LD on `/learn` and `/guides` | ✅ | |
| 7.6 | `sitemap.ts` updated to include industry hub URLs | ⬜ | |
| 7.7 | `robots.ts` not blocking industry hub paths | ⬜ | |
| 7.8 | Open Graph tags on all public pages | ✅ | |

---

## 8. Content & Compliance

| # | Item | Status | Notes |
|---|------|--------|-------|
| 8.1 | No phone numbers, email addresses, or street addresses in any UI | ✅ | Per CLAUDE.md rule |
| 8.2 | Australian English spelling throughout | ✅ | colour, mould, organisation |
| 8.3 | AU/NZ/JP scope consistent (no AU-only copy) | ✅ | |
| 8.4 | IICRC certification data sourced correctly | ✅ | |
| 8.5 | Statistics on `/data` match seed data in DB | ⬜ | Verify after migration |
| 8.6 | Privacy Policy updated to cover newsletter and partner data | ⬜ | Legal review required |
| 8.7 | Terms of Service covers contractor code of conduct | ⬜ | Legal review required |

---

## 9. Performance

| # | Item | Status | Notes |
|---|------|--------|-------|
| 9.1 | All new pages pass Lighthouse performance ≥ 80 | ⬜ | Run in Vercel preview |
| 9.2 | No unoptimised images (use `next/image`) | ✅ | No images added in this sprint |
| 9.3 | Client components only where interactivity required | ✅ | Static pages are Server Components |
| 9.4 | No `console.log` in production code | ⬜ | Run `grep -r console.log apps/web/app` |

---

## 10. Known Deferred Items (not blockers for launch)

| Item | Issue | Notes |
|------|-------|-------|
| Webhook DB writes (Supabase) | DR-38 follow-on | Currently TODO stubs in webhook handler |
| Newsletter subscribe API | DR-32 follow-on | Form POSTs work; email not sent yet |
| Event submit API | DR-35 follow-on | Form saves locally; not written to DB |
| Partner join API | DR-37 follow-on | Form submits locally; not written to DB |
| Auth on `/industry-partners/dashboard` | DR-34 follow-on | Dashboard shows mock data; needs auth |
| Auth on `/admin/approvals` | DR-35 follow-on | Admin page unprotected; needs auth middleware |
| `sitemap.ts` industry URLs | Post-launch | Add all new routes |
