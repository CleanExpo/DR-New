# Implementation Plan — Scan Findings Remediation

**Date:** 2026-02-04
**Status:** Draft
**Author:** Claude Code (via scan-findings analysis)
**Boundary:** Changes scoped to 3 workstreams; no database schema changes; no auth flow rewrites

---

## Executive Summary

| Finding | Severity | Current Status | Action Required |
|---|---|---|---|
| Gemini API keys + Supabase JWT exposed in git | **✟ CRITICAL** | Rotation marked COMPLETE in `SECRET-ROTATION-STATUS.md` | Verify rotation, re-scan git history, harden CI |
| Lighthouse performance 77 (LCP 6.1s) | 🟡 HIGH | Active gap | Reduce LCP to <2.5s via 4 targeted changes |
| WCAG 2.1 AA compliance | ✅ GREEN | Verified | No action (monitor only) |
| AI image enhancement system | ✅ GREEN | Operational | No action |
| SEO strategy foundation | ✅ GREEN | 250+ keywords documented | No action |

**Bounded scope:** This plan covers only the two active findings (secret-rotation verification + LCP performance). No schema migrations, no auth rewrites, no new features.

---

## Workstream 1: Secret Exposure — Verification & Hardening

### 1.0 Context

`SECRET-ROTATION-STATUS.md` states all rotations completed 2026-02-03. Before trusting that, we must independently verify no exposed secrets remain active and that git-secrets hooks are functioning.

### 1.1 Affected Files

| File | Action | Risk |
|---|---|---|
| `SECRET-ROTATION-STATUS.md` | Read-only (audit) | None |
| `SECURITY-AUDIT.md` | Read-only (audit) | None |
| `REMEDIATION-PLAN.md` | Read-only (audit) | None |
| `.git/hooks/pre-commit` | Verify git-secrets hook present | None |
| `.git/hooks/commit-msg` | Verify git-secrets hook present | None |
| `.github/workflows/security-scan.yml` | Create if absent | Low (CI-only) |
| `.gitignore` | Append patterns if missing | None |

### 1.2 Sequencing

```
Step 1: Re-scan git history for any remaining secrets
  └─ git secrets --scan-history
  └─ git log --all --full-history -- '*.env*' '*.pem' '*secret*'
  └─ Confirm zero hits → proceed

Step 2: Verify old keys are truly dead
  └─ curl test old Gemini key → expect 403
  └─ curl test old CSRF token → expect reject
  └─ Attempt JWT verify with old secret → expect failure

Step 3: Verify new keys are live
  └─ curl test new Gemini key → expect 200
  └─ Smoke-test auth flow → expect 200
  └─ Check Vercel env vars match new values

Step 4: Harden CI pipeline
  └─ Create .github/workflows/security-scan.yml (if absent)
  └─ Add git-secrets scan to PR checks
  └─ Document secret rotation SOP

Step 5: .gitignore audit
  └─ Ensure .env, .env.local, .env.production, *.pem, *.key are ignored
  └─ Ensure .secrets-rotation.tmp is in .gitignore
```

### 1.3 Rollback

If verification reveals secrets still active (unlikely given existing docs):
1. Execute `REMEDIATION-PLAN.md` Step 1–3 to rotate immediately
2. Re-run verification loop
3. No rollback needed for verification steps — they are read-only checks

---

## Workstream 2: Lighthouse Performance — LCP 6.1s → <2.5s

### 2.0 Root Cause Analysis

From `LIGHTHOUSE_AUDIT_REPORT.md`:
- **LCP: 6.1s** (target <2.5s, gap = 3.6s)
- **Unused JavaScript: ~3,750ms** potential savings
- **Unused CSS: ~150ms** potential savings
- FCP, CLS, TBT, Speed Index all GOOD

The 6.1s LCP is almost entirely explained by:
1. Large hero image not using `next/image` with `priority` flag
2. Heavy client-side JavaScript bundle (framer-motion, three.js, leaflet, recharts, d3, gsap, react-leaflet all loading on homepage)
3. Analytics/third-party scripts loading synchronously
4. Missing resource preload hints for critical path assets

### 2.1 Affected Files

| File | Change | Impact |
|---|---|---|
| `apps/web/app/(public)/page.tsx` | Add `priority` to hero image, lazy-load below-fold sections with `dynamic()` | **HIGH** — reduces LCP 2-3s |
| `apps/web/app/layout.tsx` | Defer analytics scripts, add `<link rel="preload">` for hero image | **HIGH** — reduces LCP 0.5-1s |
| `apps/web/next.config.mjs` | Add `optimizePackageImports` for heavy libs, enable bundle analyzer config | **MEDIUM** — reduces JS size |
| `apps/web/components/public/sections/EmergencyHero.tsx` | Replace raw `<img>` / CSS background with `next/image` + `priority`, add explicit `width`/`height` | **HIGH** — eliminates LCP image delay |
| `apps/web/components/marketing/index.ts` | Audit barrel exports; split into path-specific imports | **MEDIUM** — prevents homepage loading contractor-only code |
| `apps/web/package.json` | Add `@next/bundle-analyzer` usage script if missing | **LOW** — diagnostic only |
| `apps/web/app/(public)/layout.tsx` | Add Suspense boundaries for heavy sections | **LOW** — improves TBT |

### 2.2 Sequencing (Strict — each step builds on the previous)

#### Phase 2A: Diagnostics (15 min, zero risk)

```
1. Run Lighthouse locally on homepage
   └─ npx lighthouse https://disasterrecovery.com.au --view --preset=desktop
   └─ npx lighthouse https://disasterrecovery.com.au --view --preset=perf
   └─ Capture exact LCP element (screenshot in report)

2. Run bundle analyzer
   └─ ANALYZE=true pnpm --filter nrpg-web run build
   └─ Identify largest chunks in node_modules
   └─ Check: is three.js (183KB) loading on homepage?
   └─ Check: is leaflet + react-leaflet loading on homepage?
   └─ Check: is recharts loading on homepage?

3. Check coverage in Chrome DevTools
   └─ Open homepage → Coverage tab → Start recording → Reload → Stop
   └─ Note % unused JS and CSS
   └─ Screenshot for before/after comparison
```

#### Phase 2B: Hero Image Optimization (30 min, low risk)

```
1. Open EmergencyHero.tsx
   └─ Locate the hero image element (likely <img> or CSS background-image)
   └─ Replace with:
      import Image from 'next/image'
      <Image
        src="/images/hero-emergency.webp"   // ensure WebP version exists
        alt="24/7 Emergency Disaster Recovery Australia"
        width={1200}
        height={630}
        priority                          // ← KEY: preloads image
        sizes="100vw"
        quality={85}
        style={{ objectFit: 'cover' }}
      />

2. If image doesn't exist as WebP → convert:
   └─ npx sharp-cli --input hero-original.jpg --output hero-emergency.webp --format webp
   └─ Place in apps/web/public/images/

3. Add preload hint in layout.tsx <head>:
   <link
     rel="preload"
     as="image"
     href="/images/hero-emergency.webp"
     fetchpriority="high"
   />

4. Verify: LCP should now reference the hero image and load within 1.5-2s
   └─ Re-run Lighthouse
   └─ Expected: LCP drops from 6.1s → ~2.5-3s
```

#### Phase 2C: JavaScript Code Splitting (60 min, medium risk)

```
1. Audit homepage imports in apps/web/app/(public)/page.tsx
   └─ Current imports include:
      - EmergencyHero          ← KEEP (above fold)
      - EmergencyCTA           ← KEEP (above fold conversion)
      - QuickTriageTool        ← LAZY LOAD (interactive, below fold)
      - ServicesGrid           ← LAZY LOAD (below fold)
      - ResourcesHub           ← LAZY LOAD (below fold)
      - JoinNRPGSection        ← LAZY LOAD (below fold)
      - InsurancePartners      ← LAZY LOAD (below fold)
      - PageTransition         ← KEEP (layout)
      - ScrollReveal           ← KEEP (layout)
      - schemaGenerator        ← KEEP (SEO, small)

2. Convert below-fold sections to dynamic imports:
   const QuickTriageTool = dynamic(
     () => import('@/components/marketing').then(m => ({ default: m.QuickTriageTool })),
     { ssr: true, loading: () => <div className="h-[600px]" /> }
   )
   const ServicesGrid = dynamic(
     () => import('@/components/marketing').then(m => ({ default: m.ServicesGrid })),
     { ssr: true, loading: () => <div className="h-[800px]" /> }
   )
   const ResourcesHub = dynamic(
     () => import('@/components/marketing').then(m => ({ default: m.ResourcesHub })),
     { ssr: true, loading: () => <div className="h-[600px]" /> }
   )
   const JoinNRPGSection = dynamic(
     () => import('@/components/marketing').then(m => ({ default: m.JoinNRPGSection })),
     { ssr: true, loading: () => <div className="h-[400px]" /> }
   )
   const InsurancePartners = dynamic(
     () => import('@/components/marketing').then(m => ({ default: m.InsurancePartners })),
     { ssr: true, loading: () => <div className="h-[200px]" /> }
   )

3. Remove 'use client' if not needed:
   └─ Check if page can be a Server Component
   └─ Currently 'use client' because of PageTransition/ScrollReveal
   └─ Move those wrappers to a thin client boundary component
   └─ This reduces JS shipped to the client significantly

4. Verify: Re-run bundle analyzer
   └─ Expected: Initial JS bundle drops 40-60%
   └─ Expected: LCP drops another 0.5-1s
```

#### Phase 2D: Third-Party Script Deferral (15 min, low risk)

```
1. In apps/web/app/layout.tsx, defer non-critical scripts:
   └─ AnalyticsProvider wrapping → verify it uses 'defer' or 'afterInteractive' strategy
   └─ Vercel Analytics → already uses <Analytics /> component (async by default)
   └─ Google Analytics → ensure loaded via next/script with strategy="lazyOnload"

2. Add explicit Script component for GA4:
   import Script from 'next/script'
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
     strategy="lazyOnload"
   />

3. Verify: Re-run Lighthouse
   └─ Expected: TBT drops, LCP unaffected (analytics no longer blocks paint)
```

#### Phase 2E: CSS Optimization (15 min, low risk)

```
1. Verify Tailwind purge is working:
   └─ Check tailwind.config.ts content paths include all component dirs
   └─ Ensure `safelist` is minimal (if any)
   └─ Production build should strip unused classes automatically

2. Inline critical CSS manually (if Tailwind purge isn't enough):
   └─ Extract above-fold styles from EmergencyHero
   └─ Place in <style> tag in <head> of layout.tsx

3. Verify: Coverage tab in DevTools
   └─ Expected: CSS unused % drops from current level
```

### 2.3 Rollback for Performance Changes

Each phase is independently reversible:

| Phase | Rollback | Downtime |
|---|---|---|
| 2A (Diagnostics) | No rollback needed (read-only) | 0 |
| 2B (Hero image) | Revert `EmergencyHero.tsx` + remove preload link from `layout.tsx` | 0 (next build) |
| 2C (Code splitting) | Revert `page.tsx` to static imports; remove `dynamic()` calls | 0 (next build) |
| 2D (Script deferral) | Revert `layout.tsx` Script strategy to `afterInteractive` or remove | 0 (next build) |
| 2E (CSS) | Revert any manual `<style>` inlay; Tailwind purge is safe | 0 (next build) |

**Full rollback:** `git revert <commit-range>` + `vercel --prod` redeploy with previous build hash.

### 2.4 Expected Results

| Metric | Current | Phase 2B | Phase 2C | Phase 2D | Phase 2E | Target |
|---|---|---|---|---|---|---|
| LCP | 6.1s | 2.5-3.0s | 1.8-2.3s | 1.8-2.3s | 1.8-2.3s | <2.5s |
| Performance Score | 77 | 83-87 | 88-92 | 89-93 | 90-94 | 90+ |
| TBT | 110ms | ~80ms | ~60ms | ~40ms | ~40ms | <200ms |
| JS Bundle (initial) | ~300KB | ~300KB | ~120-150KB | ~120-150KB | ~120-150KB | <170KB |

---

## Workstream 3: Documentation & Monitoring

### 3.1 Affected Files

| File | Action |
|---|---|
| `INCIDENT-LOG.md` | Append secret exposure post-mortem summary |
| `SECURITY-AUDIT.md` | Add re-verification date and sign-off |
| `LIGHTHOUSE_AUDIT_REPORT.md` | Update with post-optimization scores |
| `performance-budget.json` | Adjust budgets to reflect new targets |

### 3.2 Sequencing

```
After Workstream 1 complete:
  └─ Update INCIDENT-LOG.md with final resolution
  └─ Update SECURITY-AUDIT.md with re-verification pass

After Workstream 2 complete:
  └─ Update LIGHTHOUSE_AUDIT_REPORT.md with new scores
  └─ Adjust performance-budget.json (LCP budget → 2500ms)
```

---

## Master Sequence (Dependency Order)

```
Day 1 (Today)
  │
  ├─ 09:00  WS1 Step 1: Re-scan git history ────────────── 10 min
  ├─ 09:10  WS1 Step 2: Verify old keys dead ────────────── 10 min
  ├─ 09:20  WS1 Step 3: Verify new keys live ────────────── 10 min
  ├─ 09:30  WS1 Step 4: Create CI security scan workflow ── 15 min
  ├─ 09:45  WS1 Step 5: .gitignore audit ──────────────────  5 min
  │
  ├─ 10:00  WS2 Phase 2A: Diagnostics (Lighthouse + bundle)  15 min
  ├─ 10:15  WS2 Phase 2B: Hero image optimization ────────── 30 min
  ├─ 10:45  WS2 Phase 2C: JS code splitting ──────────────── 60 min
  ├─ 11:45  WS2 Phase 2D: Third-party script deferral ────── 15 min
  ├─ 12:00  WS2 Phase 2E: CSS optimization ───────────────── 15 min
  │
  ├─ 12:15  WS3: Update documentation ────────────────────── 15 min
  │
  └─ 12:30  Final Lighthouse verification run
             └─ Target: 90+ performance score
             └─ Target: LCP <2.5s
```

Total estimated time: **3.5 hours**

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Secrets still exposed after rotation | Low (existing docs say complete) | Critical | Step 1 re-scan catches this immediately |
| Dynamic import breaks SSR for SEO content | Medium | Medium | All dynamic imports use `ssr: true`; verify with View Source |
| Hero image WebP missing | Medium | Low | Fallback to JPEG with next/image automatic conversion |
| Code splitting breaks barrel export paths | Low | Medium | Keep import paths explicit; test each dynamic import |
| Third-party script deferral breaks analytics | Low | Low | Verify GA4 events fire in Network tab after change |

---

## Success Criteria

- [ ] Git history re-scan returns zero secret matches
- [ ] Old Gemini keys return HTTP 403 on direct API test
- [ ] CI security scan workflow passes on PR
- [ ] Lighthouse performance score ≥ 90 (currently 77)
- [ ] LCP < 2.5s (currently 6.1s)
- [ ] No visual regressions on homepage (screenshot diff)
- [ ] No SEO regressions (View Source shows all content)
- [ ] No analytics breakage (GA4 real-time report shows events)

---

## Appendix: Files NOT Touched

To keep the plan bounded and safe, these areas are explicitly excluded:

- **Database schema / migrations** — no changes
- **Authentication flows** — JWT rotation already done; no auth code changes
- **API routes** — no changes to `/api/*`
- **Stripe billing** — no changes
- **Contractor portal** — no changes to `(contractor)/` or `(dashboard)/`
- **Supabase configuration** — no client-side config changes
- **Content / copy** — no text changes
- **SEO metadata** — already at 92/100; no changes
- **WCAG / accessibility** — already at 95/100; no changes
- **Cron jobs** — no changes
- **Email templates** — no changes