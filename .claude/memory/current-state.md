# Current State
> Updated by PreCompact hook and agents after key decisions.

## Active Task
SEO audit issues migrated to new Linear workspace. Next: tackle DIS-15 (robots.ts consolidation) + DIS-17 (store JSON-LD schemas).

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
- **API Key**: stored in mcp.json only (not recorded here) (saved in mcp.json)
- **Issues**: DIS-5 through DIS-33 (29 SEO audit issues; DIS-5 to DIS-13 = Done, DIS-14 to DIS-33 = Backlog)

## In-Progress Work
None — all work committed. Linear issues created.

## Next Steps (Priority Order)
1. **⚠️ URGENT (Phill)**: Rotate NEXTAUTH_SECRET, JWT_SECRET, GEMINI_API_KEY — real values committed in git history
2. **DIS-15** (P1): Delete static robots.txt, consolidate to dynamic robots.ts
3. **DIS-14** (P1): Add AI crawler directives (GPTBot, ClaudeBot, PerplexityBot) to robots.ts
4. **DIS-16** (P1): Add AI crawler optimization rules to robots.ts
5. **DIS-17** (P0): Add JSON-LD schemas to store pages (Product, Offer, BreadcrumbList)
6. **DIS-18** (P1): Add BreadcrumbList schemas to service pages
7. Google OAuth consent screen: publish from "Testing" mode at console.cloud.google.com
8. Domain purchases: nrpg.com.au, carsi.com.au, restoreassist.com.au, disasterrecovery.co.nz (user action)
9. Apply supabase/migrations/add-missing-rls.sql to production Supabase
10. Set up BetterStack per docs/guides/UPTIME-MONITORING.md

## Last Updated
05/03/2026 — New Linear workspace created, 29 SEO issues created, Supabase storage set up, Google OAuth configured
