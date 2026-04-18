# Implementation Plan

**Session:** ba203370014d  
**Confidence:** 31%

**Risk notes:** Brief states 'FIX — Feature Build' but does not name a specific feature or bug. Assumptions made: (1) the primary broken concern is the contact/quote form submission flow, inferred from the Australian DR/restoration business domain and the presence of BUILD-FIX-SUMMARY.md; (2) the repo uses Next.js App Router given the TypeScript primary language and file naming conventions visible in repo context; (3) test framework is Jest + React Testing Library (most common for this stack) — if the project uses Vitest or Playwright the test unit file paths will need adjustment; (4) src/ is the source root, which is a common Next.js convention but not confirmed. Confidence is low because the actual failing feature is not specified. The audit unit (id=1) should surface the real target before units 2–6 execute.

## Unit 1: Repo audit — identify broken files, build errors, and open backlog items
**Files:** `BACKLOG.md`, `BUILD-FIX-SUMMARY.md`, `CHECKPOINT-4HR.md`, `package.json`, `tsconfig.json`, `next.config.js`

## Unit 2: Resolve TypeScript compilation errors and restore clean build
**Files:** `src/**/*.ts`, `src/**/*.tsx`, `tsconfig.json`, `next.config.js`
**Test scenarios:**
  - happy path: `next build` exits 0 with no type errors
  - edge case: environment variables missing — build must fail with actionable message not runtime crash
  - edge case: dynamic imports resolve correctly in production mode

## Unit 3: Implement or repair the primary broken feature (inferred: contact/quote form submission flow)
**Files:** `src/app/contact/page.tsx`, `src/components/QuoteForm.tsx`, `src/app/api/contact/route.ts`, `src/lib/email.ts`
**Test scenarios:**
  - happy path: valid form submission returns 200 and triggers confirmation UI
  - edge case: missing required fields returns 422 with field-level validation errors
  - edge case: email service unavailable returns 503 and does not swallow error silently
  - edge case: spam/bot submission blocked by honeypot or rate-limit

## Unit 4: Fix critical accessibility violations identified in audit report
**Files:** `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/ServiceCard.tsx`, `src/app/layout.tsx`
**Test scenarios:**
  - happy path: all interactive elements have accessible labels (aria-label or visible text)
  - edge case: keyboard-only navigation reaches every focusable element in logical order
  - edge case: colour contrast ratio meets WCAG AA (4.5:1) for all body text

## Unit 5: Add or repair unit/integration tests for repaired modules
**Files:** `src/__tests__/contact.test.ts`, `src/__tests__/QuoteForm.test.tsx`, `src/__tests__/api-contact.test.ts`
**Test scenarios:**
  - happy path: all new tests pass with `npm test`
  - edge case: tests do not require live network calls — external services are mocked
  - edge case: test suite exits non-zero on any assertion failure

## Unit 6: Stage changes and open pull request with structured commit message
**Files:** `COMMIT_MESSAGE.txt`
