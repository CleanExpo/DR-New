# DR-908 — rollback drill

Proves the platform can be rolled back cleanly across three dimensions:
feature flag, database migration, and point-in-time restore (PITR).

**Ticket:** DR-908 (prove rollback: flag-off reverts cleanly; migration
down-path dry-run; PITR drill).

---

## 1. Flag-off reverts cleanly (no uncontrolled 5xx)

The contractor go-live program is gated by the `NRPG_CONTRACTOR_GO_LIVE` kill
switch (DR-929). Flipping it to `false` reverts NEW go-live activity to a
controlled `503 SERVICE_UNAVAILABLE`, while every non-gated surface (existing
logins/dashboards, bid DECLINED, payout crons, claim intake) keeps working —
no uncontrolled 500s.

- **How to flip it / verify:** `apps/web/docs/runbooks/nrpg-kill-switch.md`.
- **Proof (CI):** the DR-929 kill-switch suites drive the REAL handlers with
  the flag OFF and assert the controlled 503 + that the flag back ON restores
  the happy path:
  - `src/__tests__/auth/go-live-kill-switch-register.test.ts`
  - `src/__tests__/dispatch/go-live-kill-switch-bid-routes.test.ts`
  - `src/__tests__/dispatch/go-live-kill-switch-claims-match.test.ts`
  - `src/__tests__/feature-flags/nrpg-go-live.test.ts`

No database or credentials required.

---

## 2. Migration down-path dry-run (no database)

`prisma migrate diff --to-empty` asks the schema engine to compute the SQL
that takes the current schema back to an empty database — the teardown /
down-path. It only GENERATES the SQL; nothing is executed against a live DB,
so this is a true dry-run that needs no database.

```bash
cd apps/web
node scripts/migration-downpath-dryrun.mjs
# PASS => a clean, DROP-only rollback path was generated (pure teardown,
#         no CREATE TABLE), gated behind a forward-diff positive control.
```

- **Proof (CI):** `src/__tests__/ops/migration-downpath-dryrun.test.ts` runs
  the drill script and asserts the clean down-path.
- **RLS note:** `prisma/migrations/20260710000002_reinstate_tenant_rls` is raw
  SQL (RLS policies + `current_tenant_id()`), which Prisma does not model, so
  it does not appear in the schema-engine diff. It is authored idempotently
  (`DROP POLICY IF EXISTS`, `ENABLE ROW LEVEL SECURITY`, `ALTER ... IF EXISTS`)
  so it is safe to replay; its down-path is to `DROP POLICY` the four
  `tenant_isolation_*` policies per tenant-scoped table and
  `DROP FUNCTION IF EXISTS current_tenant_id()`.

---

## 3. Ephemeral-clone granular revert + PITR drill — OWNER-SUPABASE-GATED

The two steps below need a real database (a Supabase branch / shadow DB, and
the production project's PITR), so they cannot run in CI or from this sandbox.
They require the Supabase project owner's credentials and sign-off.

### 3a. Granular per-migration revert on an ephemeral clone

Reverting only the LAST migration (rather than the whole schema) requires
replaying migrations into a throwaway shadow database:

```bash
# Requires SHADOW_DATABASE_URL pointing at an ephemeral Supabase branch/clone.
cd apps/web
npx prisma migrate diff \
  --from-migrations prisma/migrations \
  --to-schema-datamodel prisma/schema.prisma \
  --shadow-database-url "$SHADOW_DATABASE_URL" \
  --script > /tmp/revert-last.sql   # inspect, do NOT auto-apply
```

### 3b. PITR drill

1. In the Supabase dashboard for the production project, confirm PITR is
   enabled and note the retention window (target RPO ≤ 15 min per
   `docs/disaster-recovery.md`).
2. Restore to a NEW project / branch at a chosen timestamp (never in place).
3. Point a staging deploy at the restored database and run
   `pnpm --filter nrpg-web test:smoke`.
4. Record the measured RTO/RPO against the DR objectives and file the result.

**Status:** DONE 2026-07-17 (project owner). Restored production PITR to a new
project at a chosen timestamp (never in place), pointed a staging deploy at it,
and ran `pnpm --filter nrpg-web test:smoke`.

- **RTO measured: 4 min** (restore-triggered → restored project healthy).
- **RPO measured: 8 min** — within the ≤ 15 min DR objective.
- **Smoke: PASS** against the restored database.
- Throwaway restored project deleted after the drill (held a full copy of
  production PII).

All three rollback dimensions — flag-off (§1), migration down-path (§2), and
PITR (§3) — are now proven.
