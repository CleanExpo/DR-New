# Workflows — DR-NRPG Platform

> Branch naming, commit format, PR checklist, deployment, rollback.
> Last updated: 03/04/2026

---

## Branch Strategy

```
feat/* ──PR──→ develop ──PR──→ main
fix/*  ──PR──→ develop ──PR──→ main
hotfix/* ──PR──→ main (emergency only, post-merge review required)
```

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `main` | Production — protected, requires PR + 1 approval + all CI | disasterrecovery.com.au |
| `develop` | Integration/sandbox — all feature work merges here first | Staging preview URL |
| `feat/<name>` | New feature | PR preview URL |
| `fix/<name>` | Bug fix | PR preview URL |
| `chore/<name>` | Maintenance | PR preview URL |
| `refactor/<name>` | Code improvement | PR preview URL |
| `hotfix/<name>` | Critical production fix (bypass develop) | PR preview URL |

**Rules:**
- Default PR target is `develop`, not `main`
- `main` requires: PR + 1 approval + all CI checks pass + branch up-to-date
- `develop` requires: all CI checks pass (no approval required for solo dev)
- Hotfix branches may target `main` directly in emergencies — mandatory post-merge review
- Delete branch after merge
- No force pushes to `main` or `develop`

---

## Commit Format (Conventional Commits)

```
<type>(<scope>): <description>
```

**Types**: `feat` · `fix` · `docs` · `chore` · `refactor` · `test` · `perf` · `ci` · `build` · `style`

**Scopes**: `dashboard` · `api` · `auth` · `db` · `ui` · `lib` · `deps` · `e2e` · `config` · `seo` · `socket` · `jobs` · `contractor` · `payment`

```bash
# Examples
feat(dashboard): add contractor availability calendar
fix(api): resolve Stripe webhook signature verification
chore(deps): bump next to 14.2.25
perf(api): cache location lookups in Redis
test(e2e): add contractor onboarding flow
refactor(lib): extract invoice service from job module
```

---

## PR Checklist

Before opening a PR, ALL must pass:

```bash
pnpm run type-check    # Zero TypeScript errors
pnpm run lint          # Zero ESLint warnings
pnpm run test          # All tests pass (unit + integration)
pnpm run build         # Next.js build succeeds
pnpm run db:generate   # Prisma client in sync (if schema changed)
```

**PR Requirements:**
- [ ] Title uses conventional commit format
- [ ] Description explains what and why (not just what)
- [ ] Tests added or updated for changed behaviour
- [ ] Zero TypeScript errors (`pnpm run type-check`)
- [ ] Zero lint warnings
- [ ] Build succeeds
- [ ] No `.env` changes committed (use `.env.example` for new vars)
- [ ] Prisma migration created if schema changed
- [ ] Australian English in all user-facing copy
- [ ] No phone numbers / email / address added to UI

---

## Development Workflow

```bash
# Start fresh — branch from develop, not main
git checkout develop && git pull origin develop
git checkout -b feat/<name>

# Develop (TDD)
pnpm run test:watch          # Keep this running

# Before committing
pnpm run type-check && pnpm run lint && pnpm run test

# Commit
git add <specific files>     # Never: git add -A (risk of leaking .env)
git commit -m "feat(scope): description"

# Push and open PR targeting develop
git push -u origin feat/<name>
gh pr create --base develop  # PR targets develop, not main
```

---

## Database Change Workflow

```bash
# 1. Edit apps/web/prisma/schema.prisma

# 2. Create Prisma migration
pnpm run db:migrate           # Prompts for migration name

# 3. If RLS policy change needed — create Supabase migration
supabase migration new <name>
# Edit the new file in supabase/migrations/

# 4. Apply to local dev
supabase db push              # Local Supabase only

# 5. Regenerate Prisma client
pnpm run db:generate

# 6. Apply to production (after PR merge)
pnpm run db:migrate:deploy    # or: npx prisma migrate deploy
```

**Never** run `prisma db push` in production. **Never** modify applied migrations.

---

## Deployment (Vercel)

```bash
# Auto-deploy triggers
main branch → production (https://disasterrecovery.com.au)
PR branches → preview URLs

# Manual deploy (emergency)
vercel --prod                 # Requires Vercel CLI + login
```

**Pre-deploy checks:**
1. All GitHub Actions passing (type-check, lint, test, build)
2. Prisma migrations applied to production Supabase
3. Environment variables set in Vercel dashboard
4. Sentry release created (auto via CI)

**Vercel config**: `apps/web/vercel.json` · Root directory: `apps/web`

---

## Rollback Procedure

```bash
# 1. Identify the last good deployment in Vercel dashboard
# 2. Instant rollback via Vercel UI (Deployments → Promote to Production)
# OR via CLI:
vercel rollback [deployment-url]

# 3. If database migration caused issue:
#    — Do NOT run prisma migrate rollback (not supported)
#    — Create a new "undo" migration
supabase migration new revert_<feature_name>
# Write the inverse SQL, apply, deploy
```

---

## Secrets Rotation Procedure

1. Generate new secret value
2. Update in Vercel environment variables (dashboard)
3. Update in local `.env.local` (NOT committed)
4. Redeploy to apply
5. Note in `.claude/memory/architectural-decisions.md`: `<date> — Rotated <VAR_NAME>`

**Do not rotate**: `SUPABASE_JWT_SECRET` without coordinating with Supabase dashboard — it's tied to the project's auth.

---

## Emergency Contacts

- **Vercel**: vercel.com/dashboard
- **Supabase**: supabase.com/dashboard
- **Sentry**: sentry.io (errors/alerts)
- **Linear**: linear.app/disaster-recovery-nrpg (issues)
- **Stripe**: dashboard.stripe.com (payments)
