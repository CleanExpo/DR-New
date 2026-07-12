# Enhancement Review

## auto-approve   (applied — matches diff)

- [x] Add `next/image` with `priority` flag to hero image in `EmergencyHero.tsx`
- [x] Add preload hint for hero image in `layout.tsx`
- [x] Convert below-fold sections to dynamic imports in `page.tsx`
- [x] Update `.gitignore` to include necessary patterns (`.git-secrets-tmp/`)
- [x] Verify Tailwind purge is working correctly (no changes needed — configs untouched)

### auto-approve — NOT in diff (not applied)

- [ ] Add `strategy="lazyOnload"` to GA4 script in `layout.tsx` — **NOT FOUND in current diff; no GA4 `Script` element exists in the public layout or root layout. Not applied.**
- [ ] Add new `.github/workflows/security-scan.yml` workflow — **REVERTED (touches CI pipeline — out of scope for this change set)**

## need-sign-off  (higher-risk: skills/config/structural/security — NOT applied)

- [ ] Verify old Gemini keys are dead (would require making external API calls)
- [ ] Verify new keys are live (would require making external API calls)
- [ ] Run full bundle analyzer to verify savings
- [ ] Check exact LCP improvement with detailed perf audit

## more-context   (loop cannot decide alone)

- [ ] Confirm whether the git-secrets hooks are actually installed in the repo (they are not showing in this workspace)
- [ ] Determine if any of these .env.example files might have real credentials in them (they appear to be examples)
- [ ] Validate that the Vercel environment variables are indeed updated with the new keys
- [ ] Determine if any additional security measures beyond the CI workflow are needed

---

## Revert Actions Taken

| Change | Reason | Action |
|---|---|---|
| `next.config.mjs` trailing newline | Out of scope; zero semantic value; unnecessary diff noise | **Reverted** |
| `.github/workflows/security-scan.yml` (new file) | Touches CI pipeline; adds a new workflow file | **Deleted** (no revert needed — was untracked) |

## Remaining Diff (kept as safe/in-scope)

| File | Change | Bucket |
|---|---|---|
| `.gitignore` | Add `.git-secrets-tmp/` ignore pattern | auto-approve ✅ |
| `apps/web/app/(public)/layout.tsx` | Add `<link rel="preload">` for hero image | auto-approve ✅ |
| `apps/web/app/(public)/page.tsx` | Dynamic imports for 5 below-fold sections | auto-approve ✅ |
| `apps/web/components/public/sections/EmergencyHero.tsx` | `next/image` with `priority` + `width`/`height` | auto-approve ✅ |

All remaining changes are: (1) purely performance-related, (2) reviewed in IMPLEMENTATION_PLAN.md, (3) reversible via git revert, (4) touch no secrets, auth flows, database schemas, or production config.
