# Current State
> Updated by PreCompact hook and agents after key decisions.

## Active Task
Sprint complete. All 19 Linear issues resolved.

## Recent Architectural Choices
- Job lifecycle: PENDING → ASSIGNED → IN_PROGRESS → COMPLETED → INVOICED → PAID
- Stripe payment triggers Xero invoice sync via metadata.jobId in payment_intent.succeeded
- Notifications are fire-and-forget (.catch()) — never block API responses
- E2E tests use storageState with skipIfNoAuth() guard for CI safety

## In-Progress Work
None — all work committed at 3983e778.

## Next Steps
1. **⚠️ URGENT (Phill)**: Rotate NEXTAUTH_SECRET, JWT_SECRET, GEMINI_API_KEY — real values committed in git history
2. Follow docs/guides/CUSTOM-DOMAIN-SETUP.md for nrpg.com.au DNS/Vercel setup
3. Apply supabase/migrations/add-missing-rls.sql to production Supabase
4. Set up BetterStack per docs/guides/UPTIME-MONITORING.md
5. Physical: van decals (DR-209), identity kit (DR-207), workwear (DR-201), contractor welcome pack (DR-203)

## Last Updated
05/03/2026 — NRPG sprint complete, commit 3983e778 pushed to main
