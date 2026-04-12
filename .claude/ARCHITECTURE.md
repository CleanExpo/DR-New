# Architecture — DR-NRPG Platform

> Last updated: 03/04/2026 | Read `.claude/memory/architectural-decisions.md` for decision log.

## System Overview

Disaster Recovery NRPG is a B2B2C SaaS matching homeowners affected by disasters with verified restoration contractors in Australia. Revenue: subscription tiers (Rural $395 → Tier3 $1,095 AUD/mo).

**Live**: https://disasterrecovery.com.au
**Brand**: NRPG (National Restoration Professionals Group)
**Legal entity**: separate from DR Qld Pty Ltd (no longer trading)

---

## Component Diagram

```
Browser → Pages (app/) → Components → Hooks (SWR) → Socket.io Client
                 │
        Next.js 14 Server
          ├── API Routes (app/api/) → Services (lib/) → Prisma → Supabase PG
          ├── Middleware (auth + CSP + rate-limit)
          ├── Socket.io Server (Redis adapter)
          └── Bull Queues (email, invoicing, PDF)
                           │
                 ┌─────────┴─────────┐
                 Redis (ioredis)    Stripe · Xero · Resend
```

---

## Agent Dispatch (27 Specialist Agents)

Use agents for anything non-trivial. Orchestrator stays under 80k tokens.

| Trigger | Agent | Domain |
|---------|-------|--------|
| "where is / how does / find the" | `project-intel` | Codebase search |
| "what colour / style guide" | `standards` | Design system |
| "latest docs / how to integrate" | `research` | External documentation |
| "what did we decide / last session" | `history` | Decision archaeology |
| "I want to add / new feature" | `spec-builder` | Feature specification |
| React, Tailwind, Framer | `frontend-specialist` | Frontend |
| API routes, services, middleware | `backend-specialist` | Backend |
| Prisma, Supabase, RLS | `database-specialist` | Database |
| Tests, coverage, assertions | `test-engineer` | Quality |
| Bugs, errors, crashes | `bug-hunter` | Debugging |
| PR review, code quality | `code-reviewer` | Review |
| Auth, CORS, CSP, RLS | `security-auditor` | Security |
| Latency, bundle, queries | `performance-optimizer` | Performance |
| Vercel, CI/CD, rollback | `deploy-guardian` | Deployment |
| .env, secrets, config | `env-wizard` | Environment |
| READMEs, guides, changelogs | `docs-writer` | Documentation |
| All verification | `verification` | Independent verification |
| Chaos/regression testing | `ralph-wiggum` | Chaos |
| Multi-agent orchestration | `orchestrator` | Meta |

---

## Repository Layout

```
DR-NRPG/
├── apps/web/               ← Next.js 14 app (primary codebase)
│   ├── app/                ← App Router pages + API routes
│   ├── components/         ← React components
│   ├── lib/                ← Services, utilities, auth
│   ├── prisma/             ← Schema + migrations
│   ├── styles/             ← globals.css, Tailwind config
│   ├── tests/              ← Jest unit + integration
│   ├── e2e/                ← Playwright E2E
│   └── middleware.ts       ← Auth + rate-limiting + CSP
├── .claude/                ← Governance, rules, agents, hooks
├── packages/shared/        ← Shared TypeScript types
└── turbo.json              ← Turbo 2.3.0 (12 tasks)
```

---

## Architecture Layers

```
Browser
  └── Next.js App Router (app/)
        └── React Components (components/)
              └── React Hooks (hooks/)
                    └── SWR / Server Components
                          └── API Routes (app/api/)
                                └── Services (lib/)
                                      └── Prisma Client → Supabase PostgreSQL
                                      └── Redis (ioredis) → Bull job queue
                                      └── Socket.io → Real-time events
```

**Rule**: No cross-layer imports. Each layer imports only from the layer directly below.
`components/` never imports from `lib/server/`. API routes use services, not Prisma directly.

---

## Module Boundaries

| Module | Path | Responsibility | Do NOT |
|--------|------|----------------|--------|
| Pages | `app/**/page.tsx` | Route rendering, data fetching (RSC) | Business logic |
| API Routes | `app/api/**/route.ts` | HTTP interface, input validation (Zod) | DB queries direct |
| Services | `lib/**/*.ts` | Business logic, orchestration | HTTP concerns |
| Repositories | `lib/db/**` | Prisma queries only | Transform data |
| Auth | `lib/auth/` + `middleware.ts` | NextAuth v4, JWT, session | User business logic |
| Components | `components/` | UI only | Fetch data directly |
| Hooks | `hooks/` | Client state, SWR | Server-only code |

---

## Data Model (Key Entities)

```
User ─── Contractor ─── Job ─── Invoice ─── Payment (Stripe)
  │                      │
  └── HomeOwner          └── JobUpdate (realtime)
                         └── JobFile (Supabase Storage)

Location ─── ServiceArea ─── ContractorLocation
          └── DisasterEvent (SEO data)

Subscription ─── Tier (Rural/SemiRural/Tier1/Tier2/Tier3)
```

**Job lifecycle**: `PENDING → ASSIGNED → IN_PROGRESS → COMPLETED → INVOICED → PAID`

**Storage buckets**: `nrpg-uploads` (private, user files) · `nrpg-public` (public assets)

---

## Integrations

| Service | Purpose | SDK/Package | Key File |
|---------|---------|-------------|----------|
| Supabase | PostgreSQL + Auth + Storage | `@supabase/supabase-js` | `lib/supabase.ts` |
| Prisma 5.22 | ORM | `@prisma/client` | `prisma/schema.prisma` |
| Stripe | Payments | `stripe` | `lib/stripe/` |
| Xero | Invoicing | `xero-node` | `lib/xero/` |
| Redis | Cache + queues | `ioredis`, `bull` | `lib/redis/` |
| Socket.io | Real-time | `socket.io` | `lib/socket/` |
| Sanity | CMS (blog/content) | `@sanity/client` | `lib/sanity/` |
| NextAuth v4 | Auth | `next-auth` | `lib/auth/` |
| Resend | Transactional email | `resend` | `lib/email/` |
| Google Maps | Location | `@react-google-maps/api` | `components/maps/` |
| Algolia | Search | `algoliasearch` | `lib/search/` |
| Sentry | Error tracking | `@sentry/nextjs` | `sentry.*.config.ts` |
| AWS S3 | Legacy file storage | `@aws-sdk/client-s3` | `lib/storage/` |
| LangChain | AI orchestration | `langchain` | `lib/ai/` |

---

## Middleware Stack (middleware.ts — 259 lines)

Order matters. Runs on every request except static assets:

1. Rate limiting (Upstash Redis)
2. CORS policy
3. Content Security Policy (CSP headers)
4. Tenant resolution (subdomain → organisation)
5. Auth session check (NextAuth)
6. Route protection (redirect unauthenticated)

---

## Real-Time Architecture

```
Client (Socket.io-client)
  └── Socket.io server (custom Next.js server)
        └── Redis pub/sub (@socket.io/redis-adapter)
              └── Bull queues (background jobs)
```

Job updates, notifications, and live matching are delivered via Socket.io. Bull handles:
- Email notifications (Bull → Resend)
- Xero invoice sync (Bull → Xero API)
- Document generation (Bull → jsPDF)

---

## SEO Architecture

- Dynamic pages: `app/(locations)/[state]/[suburb]/page.tsx`
- Schema.org JSON-LD injected per page type (LocalBusiness, Service, FAQPage)
- Sitemap: auto-generated via `app/sitemap.ts`
- Google Analytics: `@google-analytics/data`
- Core Web Vitals: monitored via Lighthouse CI (`@lhci/cli`)

---

## Environment Variables

Full list with descriptions: `apps/web/.env.example`. Copy to `.env.local` for local dev.
