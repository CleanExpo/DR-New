# Implementation Plan

**Session:** 1a064c414bba  
**Confidence:** 28%

**Risk notes:** Brief says 'FIX — Feature Build' but does not name the specific feature or bug. Plan assumes the highest-signal artifacts in the repo (AUTHENTICATION_DEBUG.md, ACCESSIBILITY_AUDIT_REPORT.md, BUILD-FIX-SUMMARY.md, BACKLOG.md) reflect current outstanding work. Actual file paths under app/, components/, and lib/ are inferred from Next.js App Router conventions — they may differ. Test framework is unknown; test_scenarios describe intent not specific runner commands. Confidence is low (0.28) until the exact failing feature or bug is confirmed.

## Unit 1: Audit repo structure and identify broken/missing feature surface
**Files:** `BACKLOG.md`, `AUTHENTICATION_DEBUG.md`, `ACCESSIBILITY_AUDIT_REPORT.md`, `BUILD-FIX-SUMMARY.md`, `COMPLETION-REPORT.md`

## Unit 2: Fix authentication flow and session handling
**Files:** `app/api/auth/[...nextauth]/route.ts`, `lib/auth.ts`, `middleware.ts`, `app/(auth)/login/page.tsx`
**Test scenarios:**
  - happy path: valid credentials produce session cookie and redirect to dashboard
  - edge case: expired token triggers re-authentication without infinite redirect loop
  - edge case: unauthenticated user accessing protected route returns 401 or redirect to /login

## Unit 3: Resolve TypeScript type errors and build failures
**Files:** `tsconfig.json`, `next.config.js`, `app/layout.tsx`, `components/index.ts`
**Test scenarios:**
  - happy path: `tsc --noEmit` exits 0 with no type errors
  - edge case: dynamic imports and server components typecheck without casting to any

## Unit 4: Implement or repair core feature UI component(s) identified in backlog
**Files:** `components/ui/`, `app/(dashboard)/page.tsx`, `app/(services)/disaster-recovery/page.tsx`, `lib/utils.ts`
**Test scenarios:**
  - happy path: service listing page renders all disaster recovery services with correct copy
  - edge case: empty data state renders fallback UI instead of blank page
  - edge case: mobile viewport renders responsive layout without horizontal overflow

## Unit 5: Fix API route data-fetching and error handling
**Files:** `app/api/services/route.ts`, `app/api/contact/route.ts`, `lib/supabase.ts`, `lib/api-client.ts`
**Test scenarios:**
  - happy path: GET /api/services returns 200 with valid JSON array
  - edge case: database connection failure returns structured 503 JSON error, not unhandled exception
  - edge case: POST /api/contact with missing required fields returns 422 with field-level error messages

## Unit 6: Accessibility and Australian-English content fixes
**Files:** `components/ui/Button.tsx`, `components/ui/Form.tsx`, `app/globals.css`, `public/`, `ACCESSIBILITY_AUDIT_REPORT.md`
**Test scenarios:**
  - happy path: all interactive elements have accessible labels and meet WCAG 2.1 AA contrast ratio
  - edge case: screen-reader-only text is present on icon-only buttons
  - edge case: Australian English spelling used consistently (e.g. 'organisation', 'colour', 'authorise')

## Unit 7: Commit staged changes with structured PR description
**Files:** `COMMIT_MESSAGE.txt`
