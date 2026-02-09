# Project Brief: DR-NRPG Platform - Senior Engineer Finalization Sprint

## Overview

**Project:** Disaster Recovery National Restoration Professionals Group (DR-NRPG)
**Type:** Next.js 14 Multi-Tenant SaaS Platform
**Status:** 98% Complete - Blocked by TypeScript Compilation Errors
**Live URL:** https://disasterrecovery.com.au

## Core Value

> Take a functionally complete platform from "Draft" to "Polished Product" with 5-year Senior Engineer quality standards - resolving all type errors, hardening code, and creating deployment-ready handover documentation.

## Current State

### What Exists
- **318 API endpoints** across admin, client, contractor, and public routes
- **170+ frontend pages** with polished UI components
- **90 Prisma models** with comprehensive multi-tenant architecture
- **Full integrations:** Stripe Connect, Supabase Realtime, Resend Email, Upstash Redis
- **Production deployment:** Live on Vercel with Neon PostgreSQL

### What's Broken
- **1,726 TypeScript errors** blocking all builds and deployments
- **Prisma schema mismatches:** Routes using non-existent fields
- **Enum value mismatches:** Invalid status values across routes
- **Null/Optional type conflicts:** Relationship access without proper null handling
- **Missing error exports:** Utility modules incomplete

### What's Missing
- **Verified build pipeline:** Can't run `npm run build`
- **Test suite execution:** Blocked by TypeScript errors
- **Integration testing:** Critical flows untested
- **Performance benchmarks:** Unknown until build works
- **Complete handover docs:** Need deployment scripts, env templates

## Tech Stack

| Component | Technology | Status |
|-----------|------------|--------|
| Frontend | Next.js 14 (App Router) | Working |
| Language | TypeScript 5.3.3 | 1,726 Errors |
| Database | PostgreSQL (Neon) | Connected |
| ORM | Prisma 5.22.0 | Needs Sync |
| Cache | Redis (Upstash) | Connected |
| Real-time | Supabase | Connected |
| Payments | Stripe Connect | Connected |
| Email | Resend | Connected |
| Hosting | Vercel | Deployed |

## Constraints

- **Australian Context:** Use Australian English (colour, mould, organisation)
- **No Phone Numbers:** Email only - support@disasterrecovery.com.au
- **Contractors are Independent:** Platform facilitates matching only
- **Multi-Tenant Required:** All data operations must be tenant-scoped

## Key Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-02 | Use Prisma with Neon | Serverless PostgreSQL with Prisma ORM |
| 2025-02 | Stripe Connect for Payouts | Australian contractor payment requirements |
| 2025-02 | Supabase for Real-time | WebSocket support without custom infrastructure |
| 2026-02 | TypeScript strict mode | Catch errors at compile time |

## Success Criteria

1. **Zero TypeScript errors** - Clean `npx tsc --noEmit`
2. **Successful production build** - `npm run build` completes
3. **All tests passing** - `npm run test:ci` green
4. **Critical flows verified** - 5 integration tests working
5. **Handover complete** - Scripts, templates, documentation ready

## Out of Scope

- New feature development
- UI redesign
- Database migration changes
- Infrastructure architecture changes
- Performance optimization (beyond identifying issues)

## Stakeholders

- **Platform Owner:** Disaster Recovery NRP Group
- **Users:** Clients (property owners), Contractors (restoration professionals), Admins
- **Technical:** Senior Engineer performing finalization

---

*Created: 2026-02-09*
*Sprint Focus: Senior Engineer Deep Finalization*
