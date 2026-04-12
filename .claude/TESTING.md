# Testing — DR-NRPG Platform

> Quick-reference. Full config: `apps/web/jest.config.ts`, `apps/web/playwright.config.ts`
> Last updated: 03/04/2026

---

## Test Commands

```bash
# From apps/web/
pnpm run test                    # All Jest tests
pnpm run test:unit               # Unit tests only (tests/unit/)
pnpm run test:integration        # Integration tests (tests/integration/) — runs in-band
pnpm run test:coverage           # Jest with coverage report
pnpm run test:ci                 # CI mode (coverage + 4 workers)
pnpm run test:e2e                # Playwright E2E
pnpm run test:e2e:ui             # Playwright UI mode (interactive)
```

---

## Test Structure

```
apps/web/
├── tests/
│   ├── unit/           ← Jest · pure functions, hooks, utilities
│   ├── integration/    ← Jest · API routes, services + Prisma
│   └── __mocks__/      ← Shared MSW handlers, module mocks
├── e2e/                ← Playwright · full user flows
│   ├── fixtures/       ← storageState auth fixtures
│   └── *.spec.ts
└── jest.setup.ts       ← @testing-library/jest-dom, MSW setup
```

---

## TDD Discipline (IMMUTABLE Rule #6)

1. Write a **failing test** that describes the behaviour
2. Watch it fail (confirms test is wired correctly)
3. Write the **minimal code** to make it pass
4. Watch it pass
5. Refactor if needed, re-run tests

No production code without a failing test first. No exceptions.

---

## Unit Test Pattern

```typescript
// tests/unit/lib/format-currency.test.ts
import { formatCurrency } from '@/lib/format-currency'

describe('formatCurrency', () => {
  it('formats AUD with two decimal places', () => {
    expect(formatCurrency(1095)).toBe('$1,095.00')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
})
```

---

## API Route / Integration Test Pattern

```typescript
// tests/integration/api/jobs.test.ts
import { createMocks } from 'node-mocks-http'
import { POST } from '@/app/api/jobs/route'

describe('POST /api/jobs', () => {
  it('returns 401 when unauthenticated', async () => {
    // Mock getServerSession to return null
    jest.mocked(getServerSession).mockResolvedValueOnce(null)
    const req = new Request('http://localhost/api/jobs', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test Job' })
    })
    const res = await POST(req as any)
    expect(res.status).toBe(401)
  })
})
```

---

## Mocking Conventions

| What | How |
|------|-----|
| HTTP calls | MSW (`msw/node` in jest.setup.ts) — intercept at network layer |
| Prisma | `jest-mock-extended` + factory in `tests/__mocks__/prisma.ts` |
| NextAuth session | `jest.mock('next-auth', () => ({ getServerSession: jest.fn() }))` |
| Redis | Jest manual mock in `tests/__mocks__/redis.ts` |
| External APIs (Stripe, Xero) | MSW handlers in `tests/__mocks__/handlers/` |
| Date/time | `jest.useFakeTimers()` + `jest.setSystemTime()` |

**Rule**: No real network calls in unit or integration tests. MSW intercepts all.
**Rule**: No real database in unit tests. Integration tests may use a test DB (`DATABASE_URL` in CI).

---

## E2E Test Pattern (Playwright)

```typescript
// e2e/contractor-onboarding.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Contractor onboarding', () => {
  test.beforeEach(async ({ page }) => {
    // Use saved auth state — see fixtures/contractor-auth.json
    await page.goto('/dashboard/contractor')
  })

  test('completes profile setup', async ({ page }) => {
    await page.getByRole('button', { name: 'Complete Profile' }).click()
    await expect(page.getByText('Profile complete')).toBeVisible()
  })
})
```

**Auth in E2E**: Use `storageState` fixtures. `skipIfNoAuth()` guard prevents CI failures when auth state is absent.

---

## "Before You Say Done" Checklist

Before marking any task complete, run and read the output of:

```bash
pnpm run type-check          # Zero TypeScript errors
pnpm run lint                # Zero lint warnings
pnpm run test                # All tests pass
pnpm run build               # Build succeeds
```

For UI changes, also verify:
- [ ] Background `#050505` (not grey, not `#000`)
- [ ] Corners `rounded-sm` only
- [ ] No `transition-all` — Framer Motion only
- [ ] No phone numbers, email addresses, or street addresses in UI
- [ ] Australian English in all user-facing copy

---

## Coverage Thresholds (jest.config.ts)

| Metric | Threshold |
|--------|-----------|
| Branches | 70% |
| Functions | 70% |
| Lines | 70% |
| Statements | 70% |

New services and utilities require tests to maintain these thresholds.

---

## Lighthouse CI (Performance)

```bash
npx lhci autorun     # Run Lighthouse CI audit
```

Target scores: Performance ≥90 · Accessibility ≥90 · Best Practices ≥90 · SEO ≥90
Config: `.lighthouserc.json` (if present) or `lhci.config.js`
