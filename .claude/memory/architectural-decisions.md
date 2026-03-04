# Architectural Decisions Log
> Append-only. Format: [DD/MM/YYYY] DECISION: X | REASON: Y | ALTERNATIVES REJECTED: Z

## Decisions

<!-- Agents append entries below. Never delete existing entries. -->

[03/03/2026] DECISION: Implement 4-pillar context drift prevention system | REASON: Claude Code compaction silently destroys CLAUDE.md rules; documented in Anthropic issues #9796, #13919, #14258 | ALTERNATIVES REJECTED: Relying on compaction summary (lossy), manual re-injection (error-prone)
[05/03/2026] DECISION: Sync project structure to NodeJS-Starter-V1 scaffold | REASON: Standardise on CleanExpo starter for consistent agent tooling, hooks, blueprints, skills, and memory system | FILES ADDED: .claude/agents/ (21 new), .claude/blueprints/, .claude/commands/, .claude/data/, .claude/hooks/ (22 files), .claude/memory/ (updated), .claude/notebooklm/, .beads/, .skills/ (69 files), skills/, docs/, scripts/ | ALTERNATIVES REJECTED: Manual ad-hoc structure (inconsistent, harder to maintain)
