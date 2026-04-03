# Progress — DR-NRPG Platform

> Living state document. Updated at session end and after major decisions.
> Previous context window notes should be read here first.
> **Date**: 03/04/2026 | **Stage**: Production | **Last updated**: 03/04/2026

---

## Current Stage

**Stage**: Production hardening & framework governance upgrade
**Branch status**: Two branches merged/in-progress on remote:
- `chore/claude-config-ts-fixes-fullscreen` — 307 files: TypeScript fixes + fullscreen + initial .claude config
- `feat/framework-governance-upgrade` — 23 files: 9 governance rules + 21 commands + 2 hook scripts

---

## Completed This Session

- [x] Fixed all TypeScript errors (860 → 0) across 307 files
- [x] Root `types/prisma-client.d.ts` was overriding real Prisma client — renamed to `.bak`
- [x] Enabled fullscreen rendering: `CLAUDE_CODE_NO_FLICKER=1` in `.bashrc`
- [x] Adopted NodeJS Starter V1 framework governance upgrades:
  - Added `core.md`, `verification-gate.md` (upgraded), `slop-prevention.md`, `frontend.md`
  - Added `database/supabase-migrations.md`, `skills/minions-protocol.md`, `skills/orchestration.md`
  - Added `development/workflow.md`, `rules/index.md`
  - Added 11 new commands: `/discuss`, `/done`, `/execute`, `/ship`, `/freeze`, `/unfreeze`, `/harness`, `/harness-review`, `/retro`, `/swarm-audit`, `/generate-route-reference`
  - Added 2 hook scripts: `guard-scope-check.ps1`, `post-compact-restore.ps1`
  - Added 2 IMMUTABLE rules to `CONSTITUTION.md` (#6 TDD, #7 Verify before done)
- [x] Generated Project Control System (this session):
  - Rewrote root `CLAUDE.md` as lean control document (≤150 lines)
  - Created `.claude/ARCHITECTURE.md`
  - Created `.claude/STANDARDS.md`
  - Created `.claude/TESTING.md`
  - Created `.claude/WORKFLOWS.md`
  - Created `.claude/PROGRESS.md` (this file)
  - Updated `.claude/settings.json` with production-grade hooks

---

## Active Tasks

None — see Next Steps below.

---

## Next Steps (Priority Order)

### Immediate (unblocked)
1. **Google OAuth publish** — Consent screen is in "Testing" mode. Publish at console.cloud.google.com (user action required — not code)
2. **Domain purchases** — nrpg.com.au, carsi.com.au, restoreassist.com.au, disasterrecovery.co.nz (user action)
3. **Apply RLS migration** — `supabase/migrations/add-missing-rls.sql` to production Supabase (DBA action)
4. **BetterStack monitoring** — Set up per `docs/guides/UPTIME-MONITORING.md`

### Technical Backlog
5. **DIS-24** — Add disaster event statistical data to location pages (Linear: DIS-24)
6. **NAP phone number review** — `api/local-seo/citations/route.ts` and `lib/seo/gbp-manager.ts` still use `EMERGENCY_PHONE.number` for NAP schema — confirm if real phone exists or remove
7. **Google Search Console domain verification** — New domains need verification after purchase
8. **Supabase RLS audit** — Run `verify-rls-policies.js` and review output

### Deferred (separate tasks)
- Next.js 15 / React 19 / Tailwind v4 upgrade (major version — separate migration plan needed)
- ESLint v9 flat config migration (separate task)
- PI Agent Workspace (CEO Board deliberation tool) — strategic decision needed
- Vault ecosystem adoption

---

## Key Decisions Log

> Append new decisions here. Full history: `.claude/memory/architectural-decisions.md`

| Date | Decision | Rationale |
|------|----------|-----------|
| 03/04/2026 | Adopted NodeJS Starter V1 governance framework | Standardise multi-agent patterns across projects |
| 03/04/2026 | `types/prisma-client.d.ts` renamed to `.bak` | Was shadowing real Prisma client, causing 51 TS2305 errors |
| 05/03/2026 | NEXTAUTH_SECRET + JWT_SECRET rotated | Routine security rotation |
| 05/03/2026 | Vercel root directory set to `apps/web` | Previous config caused build failures |
| 05/03/2026 | Notifications are fire-and-forget (.catch()) | Never block API responses for optional side effects |
| 05/03/2026 | E2E tests use storageState + skipIfNoAuth() | CI safety — no auth state = skip gracefully |
| 05/03/2026 | Storage: Supabase (primary), S3 (legacy fallback) | Consolidated to Supabase; S3 kept for backwards compat |

---

## Active Linear Issues

**Workspace**: https://linear.app/disaster-recovery-nrpg
**Team**: DIS

| Issue | Status | Description |
|-------|--------|-------------|
| DIS-5 to DIS-13 | Done | SEO audit items |
| DIS-14 to DIS-33 | Backlog | SEO audit items |
| DIS-24 | Backlog | Add disaster event statistical data to location pages |

---

## Known Issues / Risks

| Issue | Severity | Status |
|-------|---------|--------|
| NAP phone number in citation services (`EMERGENCY_PHONE.number`) | Medium | Under review |
| SUPABASE_JWT_SECRET not rotated (tied to Supabase project) | Low | Pending Supabase dashboard action |
| `add-missing-rls.sql` not yet applied to production | High | Awaiting DBA |
| Google OAuth in "Testing" mode | Medium | Awaiting user to publish |

---

## Notes for Next Session

- All TypeScript errors resolved. If new errors appear, check `types/` directory for `.d.ts` files overriding packages.
- `pnpm run build` must pass before any PR. Run from `apps/web/`.
- Pre-compact hook should back up this file to `.claude/backups/PROGRESS-<date>.md` — check if hook fired.
- Fullscreen rendering active: `CLAUDE_CODE_NO_FLICKER=1`. Use PgUp/PgDn to scroll, Ctrl+o for transcript mode.
