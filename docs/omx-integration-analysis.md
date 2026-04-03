# OMX Integration Analysis — DR-NRPG Claude-Native Stack

> **Source**: oh-my-codex (OMX) — https://github.com/Yeachan-Heo/oh-my-codex
> **Status**: Patterns ported in Sprint 1 + Sprint 2 (2026-04-03)
> **Related**: DR-324, DR-323

---

## What OMX Is

OMX is a workflow orchestration layer built on OpenAI Codex CLI. It wraps the AI with:

- **Persistent state** — `.omx/` directory: plans, context, memory, mode state
- **30 specialist role prompts** — executor, architect, critic, qa-tester, security-reviewer, ux-researcher, etc.
- **40 workflow skills** — `$deep-interview`, `$ralplan`, `$ralph`, `$team`, `$autopilot`
- **tmux parallel execution** — `omx team 3:executor "..."` spawns concurrent agents
- **Ambiguity-gating** — mathematical scoring threshold ≤0.20 before planning begins
- **Consensus planning** — Planner → Architect → Critic deliberation loop
- **Persistent completion loops** — `$ralph` loops until architect-verified complete

**Key constraint**: OMX is built for OpenAI Codex CLI. The tooling doesn't port. The **patterns** port completely.

---

## Why OMX Solves DR-NRPG Failure Modes

| OMX Problem Statement | DR-NRPG Evidence |
|---|---|
| Tasks declared "done" without verification | BUILD-001 "approved" 4 sessions, never executed |
| Ambiguous requirements stall builds | BUILD-002 blocked on IICRC cert — question never asked upfront |
| No session continuity | Every boardroom re-derives context from scratch |
| Sequential execution when parallel is possible | Two event pages built one-at-a-time |
| No BUILD completion enforcement | Gap register grows, zero resolutions |

---

## Patterns Ported — Sprint 1

### 1. Pre-BUILD Clarification Gate (`$deep-interview` → `dr-clarify`)

**Rule**: Before any BUILD enters "Approved" status, all 6 gates must be green:

| Gate | Check |
|------|-------|
| Content specified | No "TBD", "pending", or "to be confirmed" sections |
| Legal/compliance | Pre-conditions named AND confirmed (not "pending legal review") |
| Data sources | All statistics have named sources with URLs |
| Supplier/geo coverage | Named suppliers confirmed for each targeted geography |
| Owner | Specific named individual (not "the team" or a persona) |
| Execution date | Specific calendar date (not "next session" or "soon") |

**On failure**: Status → `Blocked: Clarification Required`. Build cannot advance until all 6 green.

### 2. RALPLAN-DR Summary Block (`$ralplan` → Phase 5 template)

Every P0/P1 BUILD plan includes a structured decision record:

```
## RALPLAN Block
**Principles**: [3–5 guiding constraints]
**Decision Drivers**: [Top 3 factors]
**Options Evaluated**: [≥2 alternatives considered]
**Selected**: [Approach chosen]
**Rationale**: [Why this option over alternatives]
**Antithesis**: [Strongest argument against chosen approach]
**Test Acceptance**: [How we know it is done — specific, observable]
**Pre-mortem**: [P0/security only — 3 failure scenarios and mitigations]
```

### 3. BUILD Execution Protocol (`$ralph` → persistence loop)

After a BUILD is approved + security-cleared:

1. Status → **ACTIVE EXECUTION**
2. Next session: must present completion evidence (URL live / tests passing / Search Console submitted)
3. If no evidence after 2 sessions (≈12 hours): auto-escalates to **P0 EXECUTION BLOCKER**
4. P0 EXECUTION BLOCKER requires: named developer + commit SHA + deadline within 24 hours
5. **No re-planning of ACTIVE BUILDs** — status is: Complete | Blocked (specific reason) | Scope-Changed (new BUILD ID)

### 4. Parallel Lanes (`$team` → BUILD specs)

Every BUILD spec with independent work items must define explicit execution lanes:

```
## Parallel Lanes
Lane A (Sonnet 4.6):  [Task — can start immediately]
Lane B (Sonnet 4.6):  [Task — can start immediately]
Lane C (Haiku 4.5):   [Task — starts after Lane A completes]
Lane D (Haiku 4.5):   [Task — starts after Lane B+C complete]
```

### 5. Session Continuity (`docs/boardroom-state.json`)

Machine-readable state file written at end of each boardroom session. Read first — 5 seconds vs 80-line narrative catch-up. See: `docs/boardroom-state.json`

---

## Patterns Ported — Sprint 2

Four Claude-native skill files under `.claude/skills/dr/`:

| Skill File | OMX Source | Purpose |
|------------|-----------|---------|
| `dr-clarify.md` | `$deep-interview` | Pre-BUILD ambiguity gate — 6-check scoring |
| `dr-execute.md` | `$ralph` | BUILD completion loop with verification evidence |
| `dr-content-build.md` | `$autopilot` | Autonomous content BUILD pipeline |
| `dr-competitor-page.md` | `$web-clone` | Competitor page extraction for counter-messaging |

See: `.claude/skills/dr/`

---

## Marketing/Brand Angle — BUILD-004 Implication

OMX's multi-specialist coordination model is a direct analogy to NRPG's "Who First" positioning:

> "We deploy a coordinated team of AI-assisted specialists on your claim — legal, restoration, supplier coordination — so you're not facing the insurer's AI alone."

**New framing for BUILD-004** ("Human Advocate vs AI Insurer"):
NRPG isn't just a *human* advocate — it's a **coordinated specialist team** standing between the policyholder and an automated insurer. OMX architecture validates the model: the same way OMX routes tasks through specialist roles (executor → architect → critic), NRPG routes claims through specialist humans (legal → restoration → supplier).

This is a competitive differentiator no insurer can replicate: their AI is a single monolithic system; NRPG's response is a coordinated multi-role team.

---

## Sprint 3 — Boardroom Dashboard (Pending)

- HTML/React dashboard reading `boardroom-state.json` — Toby sees P0 count, active BUILDs, deadlines at a glance
- Linear webhook or scheduled update for real-time P0 escalations
- Target: next boardroom session
