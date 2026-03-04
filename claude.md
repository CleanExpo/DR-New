# Disaster Recovery — NRPG Platform

## Project Identity
- **Type**: Next.js 14 SaaS Platform
- **Stack**: TypeScript · Prisma · PostgreSQL (Supabase) · Redis · Tailwind CSS
- **Status**: Production Ready — https://disasterrecovery.com.au
- **Locale**: en-AU | DD/MM/YYYY | AUD | AEST/AEDT

---

## Scaffold Structure

| Directory | Purpose |
|-----------|---------|
| `.claude/agents/` | 27 specialist agents — see Agent Roster below |
| `.claude/blueprints/` | Task blueprints: `feature`, `bugfix`, `migration`, `refactor` |
| `.claude/commands/` | Slash commands: `/verify`, `/minion`, `/audit`, `/ralph`, etc. |
| `.claude/data/` | Design tokens, toolsheds, trusted sources, verified claims |
| `.claude/hooks/` | Pre/post hooks + scripts (auto-runs on events) |
| `.claude/memory/` | CONSTITUTION · compass · current-state · architectural-decisions |
| `.claude/notebooklm/` | NotebookLM notebook registry |
| `.beads/` | Interaction + issue tracking |
| `.skills/` | 40+ reusable skill modules (custom/) |
| `skills/` | Project-specific skills (australian, backend, design, etc.) |
| `docs/` | Internal docs, guides, release notes |
| `scripts/` | Dev, deploy, verify, setup scripts |

---

## Agent Roster

**DO NOT store information here — dispatch to agents.**

### Primary Dispatch
| Need | Agent | Trigger |
|------|-------|---------|
| Codebase questions | `project-intel` | "where is", "how does", "find the" |
| Code/design standards | `standards` | "what colour", "how should", "style guide" |
| External docs/APIs | `research` | "latest docs", "how to integrate", "best practice" |
| Past decisions | `history` | "what did we decide", "previous session" |
| New feature spec | `spec-builder` | "I want to add", "new feature" |

### Specialist Agents
| Domain | Agent |
|--------|-------|
| Frontend (Next.js, React, Tailwind) | `frontend-specialist` |
| Backend (API routes, services) | `backend-specialist` |
| Database (Prisma, PostgreSQL, Supabase) | `database-specialist` |
| Testing & QA | `test-engineer` |
| Bug investigation | `bug-hunter` |
| Code review | `code-reviewer` |
| Refactoring | `refactor-specialist` |
| Security | `security-auditor` |
| Performance | `performance-optimizer` |
| Deployment | `deploy-guardian` |
| Environment / .env | `env-wizard` |
| Documentation | `docs-writer` |
| Browser automation | `playwright-browser` · `browser-qa` |
| SEO / search | `seo-intelligence` · `rank-tracker` |
| Content truth-check | `truth-finder` |
| Independent verification | `verification` |
| Skill meta-tasks | `skill-manager` |
| Chaos/regression | `ralph-wiggum` |
| Multi-agent orchestration | `orchestrator` |

---

## Commands Reference

| Command | Purpose |
|---------|---------|
| `/verify` | Run verification suite |
| `/minion` | One-shot Blueprint DAG execution |
| `/audit` | Full codebase audit |
| `/new-feature` | Kick off feature spec interview |
| `/ui-review` | Design standards review |
| `/fix-types` | TypeScript error remediation |
| `/ralph` | Chaos/regression testing |
| `/bootstrap` | Project bootstrap |
| `/skill-manager` | Install/update skills |

---

## Quick Commands
```bash
npm run dev            # Development server
npm run build          # Production build
npm run test           # Run tests
npm run db:push        # Push Prisma schema
npm run db:studio      # Open Prisma Studio
bash scripts/verify.sh # Full verification
bash scripts/health-check.ps1  # Health check
```

---

## Architecture Routing

| Domain | Location |
|--------|----------|
| Pages & UI | `app/` (Next.js App Router) |
| API routes | `app/api/` |
| Components | `components/` |
| Database schema | `prisma/schema.prisma` |
| Services | `lib/` |
| Auth | `lib/auth/` + middleware |
| Styles | `styles/globals.css` + Tailwind |

---

## Critical Rules

1. **NO PHONE NUMBERS** — Email only: `support@disasterrecovery.com.au`
2. **Australian English** — colour, mould, organisation, licence, centre
3. **Contractors are independent** — Platform facilitates matching only
4. **Retrieval-First** — Query memory → skills → grep BEFORE loading docs inline
5. **No self-verification** — All work verified by `verification` agent, never the author
6. **State on disk** — Decisions written to `.claude/memory/architectural-decisions.md`
7. **Design system** — Scientific Luxury enforced. OLED black `#050505`. No generic Tailwind defaults.

---

## Drift Recovery

If context feels wrong, re-read in order:
```bash
cat .claude/memory/CONSTITUTION.md
cat .claude/memory/current-state.md
cat .claude/memory/architectural-decisions.md
```
