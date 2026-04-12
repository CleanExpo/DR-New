# Standards — DR-NRPG Platform

> Patterns linters can't catch. Read before implementing.
> Last updated: 03/04/2026

---

## Naming Conventions

| Artefact | Convention | Example |
|----------|-----------|---------|
| React components | `PascalCase.tsx` | `ContractorCard.tsx` |
| Utilities / libs | `kebab-case.ts` | `format-currency.ts` |
| API routes | `route.ts` inside `app/api/<path>/` | `app/api/jobs/[id]/route.ts` |
| Prisma models | `PascalCase` singular | `ContractorProfile` |
| DB columns | `snake_case` via `@map` | `created_at`, `user_id` |
| Skills | `SCREAMING-KEBAB.md` | `TDD.md` |
| Agents | `kebab-case` | `frontend-specialist` |
| Env vars | `SCREAMING_SNAKE_CASE` | `STRIPE_WEBHOOK_SECRET` |
| Boolean props | `is*` / `has*` / `can*` | `isLoading`, `hasError` |

---

## Error Handling

### API Routes

See `app/api/jobs/route.ts` for the canonical pattern: Zod validation → service call → typed response.

- Validate all input with Zod at the API boundary
- Catch Prisma errors — map to HTTP status, never leak to client
- Log with structured context: `console.error('[api/path]', { id, error })`
- Status codes: 400 (validation) · 401 (unauthenticated) · 403 (unauthorised) · 404 (not found) · 500 (server)

### Service Layer

See `lib/services/jobs.ts` for the canonical pattern: typed errors, transactions, fire-and-forget notifications.

- Services throw typed errors; API routes map them to HTTP status
- Notifications are fire-and-forget: `.catch(console.error)` — never block responses
- Use `prisma.$transaction()` for multi-table writes

---

## API Patterns

- **Auth check**: `getServerSession(authOptions)` — return 401 if null
- **Pagination**: Parse `page`/`limit` from searchParams, cap at 100: `Math.min(parseInt(limit), 100)`
- **Response envelope**: `{ data: items, meta: { page, limit, total, totalPages } }`

---

## State Management

| State Type | Tool | Where |
|-----------|------|-------|
| Server state (fetch/cache) | SWR or RSC `fetch` | Hooks / Server Components |
| Form state | `react-hook-form` + Zod | Component |
| UI state (modal, toggle) | `useState` | Component |
| Global auth state | NextAuth `useSession` | Hook |
| Real-time state | Socket.io events | Custom hooks in `hooks/` |

**Rule**: No Redux, no Zustand, no Context for server-fetched data — use SWR or RSC.

---

## TypeScript Standards

- Strict mode on — zero `any` types. Use `unknown` then narrow.
- Prefer `interface` for objects that can be extended; `type` for unions/intersections
- Export types from the module that owns them — never re-export from `types/index.ts`
- Prisma-generated types: import from `@prisma/client`, not from custom `.d.ts` wrappers
- Zod schemas are the single source of truth for runtime validation — derive TS types with `z.infer<>`

```typescript
const CreateJobSchema = z.object({ title: z.string(), contractorId: z.string().uuid() })
type CreateJobInput = z.infer<typeof CreateJobSchema>
```

---

## Database Standards

- UUID primary keys: `@id @default(uuid())` in Prisma schema
- All user-data tables: RLS enabled in Supabase (Prisma does NOT manage RLS)
- Foreign keys: `onDelete: Cascade` for user-owned data
- Never use `prisma db push` in production — use `prisma migrate deploy`
- Transactions for multi-table writes: `prisma.$transaction(async (tx) => { ... })`
- Index all columns in `where` clauses you query frequently: `@@index([userId])`

---

## Component Standards

See `components/dashboard/ContractorList.tsx` for the canonical pattern.

- Explicit props interface on every component
- Tailwind only, design tokens only — no inline styles
- Use `rounded-sm` (exception: `rounded-full` for orbs/status)
- Use Framer Motion `<motion.div>` — no `transition-all`, no CSS keyframes
- Australian English in all user-facing copy
- Link to `/contact` instead of showing phone/email/address

---

## Import Order (ESLint enforced)

```typescript
// 1. Node built-ins
import path from 'path'
// 2. External packages
import { motion } from 'framer-motion'
import { z } from 'zod'
// 3. Internal aliases (@/)
import { prisma } from '@/lib/prisma'
import { ContractorCard } from '@/components/contractor/ContractorCard'
// 4. Relative
import { formatCurrency } from './format-currency'
```

---

## Logging Standards

Use `pino` (server) or `console` with structured context (client):

```typescript
// Server
import pino from 'pino'
const log = pino({ name: 'lib/services/jobs' })
log.info({ jobId, contractorId }, 'Job assigned')
log.error({ err, jobId }, 'Job assignment failed')

// API route error context
console.error('[api/jobs/assign]', { jobId, error: err.message })
```

Never log PII — no user email, phone, address in logs. Log IDs only.

---

## Design Tokens (Scientific Luxury)

Read `styles/globals.css` and `tailwind.config.ts` before using any colour or spacing value.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#050505` (OLED black) | All page/card backgrounds — not `#000`, not `#111` |
| Primary | Teal `#0d9488` | Brand accent, links, primary buttons |
| Active | Cyan `#00F5FF` | Active states, focus rings |
| Success | Emerald `#00FF88` | Success states, confirmations |
| Warning | Amber `#FFB800` | Warning states, alerts |
| Error | Red `#FF4444` | Error states, destructive actions |
| Escalation | Magenta `#FF00FF` | Blueprint escalation, critical alerts |
| Border | `border-[0.5px] border-white/[0.06]` | Default borders — active may use spectral at 30–50% opacity |
| Corners | `rounded-sm` | All components (exception: `rounded-full` for orbs/status indicators) |
| Animation | Framer Motion | Smooth: `cubic-bezier(0.4, 0, 0.2, 1)` · Spring: `stiffness: 300, damping: 25` |

---

## Canonical File References

When implementing new patterns, reference these existing files:

| Pattern | Canonical File | Why |
|---------|---------------|-----|
| API route with Zod validation | `app/api/jobs/route.ts` | Standard POST/GET with session check + Zod schema |
| Service layer with Prisma | `lib/services/jobs.ts` | Transaction usage, typed errors, fire-and-forget notifications |
| Authenticated page (RSC) | `app/dashboard/page.tsx` | Session check + redirect pattern |
| Client component with SWR | `components/dashboard/ContractorList.tsx` | SWR fetching + loading states |
| E2E test with auth | `e2e/contractor-onboarding.spec.ts` | storageState + skipIfNoAuth guard |

---

## Patterns to Avoid

| Anti-pattern | Use Instead | Why |
|-------------|-------------|-----|
| `transition-all` / CSS keyframes | Framer Motion `<motion.div>` | Consistent animation system, no flicker on OLED |
| `rounded-lg` / `rounded-xl` | `rounded-sm` | Design system constraint — Scientific Luxury |
| `any` type | `unknown` + type narrowing | Strict mode, zero `any` policy |
| Re-exporting types from `types/index.ts` | Export from owning module | Prevents circular deps, keeps ownership clear |
| Custom `.d.ts` overriding packages | Use package's own types | `types/prisma-client.d.ts` caused 51 TS2305 errors (see PROGRESS.md) |
| `prisma db push` in production | `prisma migrate deploy` | Push skips migration history — unsafe for prod |
