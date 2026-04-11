# /sprint — Autonomous Linear Sprint

> Activates the sprint-loop agent to continuously pull, implement, and close
> Linear code tasks without stopping for permission or clarification.

## Usage

```
/sprint                    # Work through all viable code tasks in priority order
/sprint DR-321             # Start at a specific issue, then continue the queue
/sprint --team DR-NRPG     # Limit to one team's queue
/sprint --limit 5          # Stop after completing 5 tasks
/sprint --dry-run          # Classify tasks without implementing (queue preview)
```

## What happens

1. Reads `docs/boardroom-state.json` for current context
2. Queries Linear for the next executable code task (highest priority first)
3. Applies the DR OMX Clarification Gate — skips blocked tasks
4. Implements the task, creates a PR to `develop`, marks the Linear issue Done
5. Immediately loops to the next task — no pausing, no permission prompts
6. Stops only when: queue is empty, 10 consecutive non-executable tasks, or you send a message

## What it will NOT do

- Ask for confirmation before implementing
- Merge PRs (always creates them for human review)
- Implement tasks requiring: social media logins, design software, legal sign-off,
  physical goods, external account creation
- Stop mid-task — it always finishes what it started

## Permissions

All standard tools are pre-approved in `.claude/settings.json`:
- File operations (Read, Write, Edit, Glob, Grep)
- Git operations (checkout, add, commit, push)
- GitHub CLI (gh pr create, gh pr view)
- pnpm/npx commands
- All Linear MCP operations
- All Vercel MCP operations

## Examples

```
# Work the entire code backlog autonomously
/sprint

# Preview what's in the queue without executing
/sprint --dry-run

# Start with a specific issue and continue
/sprint DR-198

# Quick 3-task sprint
/sprint --limit 3
```

## Circuit breakers

The sprint stops automatically if:
- 10 consecutive tasks are all BLOCKED or non-code
- TypeScript errors can't be fixed in 2 attempts (drafts PR, moves on)
- Git state is dirty at task start

## Locale

All output: Australian English. All dates: DD/MM/YYYY. All times: AEST/AEDT.

---

**Activating**: Loads the `sprint-loop` agent with full context from
`docs/boardroom-state.json`, `.claude/memory/current-state.md`, and the
Linear queue. The agent runs until the queue is empty.
