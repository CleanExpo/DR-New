# Current State
> Updated by PreCompact hook and agents after key decisions.

## Active Task
SEO sprint complete. All 29 Linear issues tackled. Next: Google OAuth publish, domain purchases, Supabase RLS migration.

## Permanent Display Rules (ENFORCED)
- **NO phone numbers** — not displayed anywhere in UI
- **NO email addresses** — platform is fully AI-automated online; all contact via /contact form and AI chat
- **NO business address/location** — not displayed in UI (schema.org JSON-LD only, not visible)
- **NO "NRP"** — public and contractors only ever see "NRPG" (National Restoration Professionals Group)
- **Disaster Recovery Qld Pty Ltd** — no longer trading; removed from all footers and legal notices
- Contact CTAs → link to /contact page only

## Recent Architectural Choices
- Job lifecycle: PENDING → ASSIGNED → IN_PROGRESS → COMPLETED → INVOICED → PAID
- Stripe payment triggers Xero invoice sync via metadata.jobId in payment_intent.succeeded
- Notifications are fire-and-forget (.catch()) — never block API responses
- E2E tests use storageState with skipIfNoAuth() guard for CI safety
- Storage: Supabase Storage (primary), S3/Spaces (legacy fallback). Buckets: nrpg-uploads (private), nrpg-public (public)
- NRPG runs under disasterrecovery.com.au (single domain authority)

## Linear Workspace
- **Workspace**: disaster-recovery-nrpg (https://linear.app/disaster-recovery-nrpg)
- **Account**: disasterrecovery8@gmail.com
- **Team**: Disaster Recovery NRPG (DIS)
- **Team ID**: 38fe387e-4d58-4d4e-89ee-77b56c6988ca
- **API Key**: stored in mcp.json only (not recorded here)
- **Issues**: DIS-5 through DIS-33 (29 SEO audit issues; DIS-5 to DIS-13 = Done, DIS-14 to DIS-33 = Backlog)

## In-Progress Work
None — all work committed. Linear issues created.

## Next Steps (Priority Order)
1. **DONE**: NEXTAUTH_SECRET rotated, JWT_SECRET added (new), GEMINI_API_KEY rotated
   - SUPABASE_JWT_SECRET NOT changed — tied to Supabase project, rotate from Supabase dashboard if needed
   - Vercel Root Directory fixed: apps/web set, apps/web/vercel.json created
2. Google OAuth consent screen: publish from "Testing" mode at console.cloud.google.com
3. Domain purchases: nrpg.com.au, carsi.com.au, restoreassist.com.au, disasterrecovery.co.nz (user action)
4. Apply supabase/migrations/add-missing-rls.sql to production Supabase
5. Set up BetterStack per docs/guides/UPTIME-MONITORING.md
6. DIS-24: Add statisticAttribute disaster event data to location pages (nice-to-have)
7. Backend citation services (api/local-seo/citations/route.ts, lib/seo/gbp-manager.ts): still use EMERGENCY_PHONE.number for NAP — review if real phone number exists

## Last Updated
05/03/2026 — SEO sprint complete + secrets rotated + Vercel build config fixed
