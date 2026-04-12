# Disaster Recovery — NRPG Platform

TypeScript/Next.js 14 SaaS platform matching disaster-affected Australian homeowners with verified restoration contractors. Production at https://disasterrecovery.com.au

## Commands

- **Dev**: `pnpm run dev` (port 3000)
- **Test**: `pnpm run test` (single: `pnpm run test -- <path>`)
- **Test E2E**: `pnpm run test:e2e`
- **Lint**: `pnpm run lint` (fix: `pnpm run lint:fix`)
- **Type-check**: `pnpm run type-check`
- **Build**: `pnpm run build`
- **DB push**: `pnpm run db:push`
- **DB migrate**: `pnpm run db:migrate`
- **DB generate**: `pnpm run db:generate`

## Rules

1. Write a failing test before writing production code. No exceptions (IMMUTABLE)
2. Use Australian English in all user-facing copy — colour, mould, organisation, licence, centre
3. Use Scientific Luxury design system — OLED black `#050505`, `rounded-sm` corners, Framer Motion animations only
4. Keep contact through `/contact` form and AI chat only — no phone numbers, email addresses, or street addresses in UI
5. Treat contractors as independent — the platform facilitates matching only, never employment
6. Use services from `lib/` in API routes — components import hooks, API routes import services, services import Prisma. No cross-layer imports
7. Persist decisions to `.claude/memory/architectural-decisions.md` — state lives on disk, not in training data
8. Dispatch to specialist agents before solving in-context — orchestrator stays under 80k tokens
9. Use retrieval-first approach — query memory, then skills, then grep, before loading docs inline
10. Route all verification to the `verification` agent — the author of the code is never its own reviewer
11. Run commands and read their full output before claiming any task is done. No "should work" or "probably passes" (IMMUTABLE)

## Architecture

Read `.claude/ARCHITECTURE.md` before structural changes or new features.

## Standards

Read `.claude/STANDARDS.md` before writing new modules or refactoring.

## Testing

Read `.claude/TESTING.md` for verification. After any task, run the relevant
test scope and verify output before reporting completion.

## Current State

Read `.claude/PROGRESS.md` at the start of every new context window.
Update it when completing tasks or making significant decisions.

## Context Management

Context will be compacted automatically. Do not stop tasks early due to
context concerns. When compacting, preserve: modified file list, test
commands, active task state from PROGRESS.md, and uncommitted decisions.

When starting a fresh context window:
1. Read `.claude/PROGRESS.md` for current state
2. Read `git log --oneline -10` for recent changes
3. Run `pnpm run type-check` to verify environment
4. Continue from the next task in PROGRESS.md

## Investigation Rule

Read relevant source files before making claims about this codebase.
Never speculate about code, APIs, or data structures you haven't opened.

## Governance

9 rules in `.claude/rules/index.md` · 21+ commands in `.claude/commands/` · 27 agents in `.claude/agents/`
7 immutable rules in `.claude/memory/CONSTITUTION.md` — re-read on context drift.
