# Skill: dr-execute
> **OMX Source**: `$ralph`
> **Purpose**: BUILD completion persistence loop — enforces completion evidence before a BUILD can be marked Done.
> **Trigger**: When a BUILD enters ACTIVE EXECUTION status.

---

## When to Use

Run `dr-execute` after a BUILD has been approved + security-cleared. This skill governs the BUILD's lifecycle from approval to Done.

---

## Execution States

```
Approved → ACTIVE_EXECUTION → [Complete | Blocked | Scope-Changed]
```

**Rules:**
- No re-planning of ACTIVE builds. If the plan needs to change → `Scope-Changed` (new BUILD ID)
- No "declared done" without completion evidence
- No status update to "Done" without: URL live + Search Console submitted (if public page) + tests passing

---

## Completion Evidence Checklist

Every BUILD must provide ALL applicable evidence before Done:

| Evidence Type | Applicable To | Required |
|---|---|---|
| Live URL | Public pages | ✅ |
| Search Console URL submitted | Public pages | ✅ |
| API route 200 response | API routes | ✅ |
| TypeScript passes (`pnpm run type-check`) | Any code | ✅ |
| Tests passing | Any code with tests | ✅ |
| PR merged to develop | Any code | ✅ |
| Vercel preview URL | All PRs | ✅ |
| Admin UI functional | Admin pages | ✅ |

---

## Escalation Protocol

If a BUILD is ACTIVE_EXECUTION and no completion evidence is presented after:

| Sessions Without Evidence | Action |
|---|---|
| 1 session | ⚠️ Flag in boardroom — "BUILD-XXX: no evidence" |
| 2 sessions | ❌ Auto-escalate to P0 EXECUTION BLOCKER |
| P0 BLOCKER | Requires: named developer + commit SHA + 24-hour deadline |

P0 EXECUTION BLOCKER overrides all other boardroom priorities.

---

## Output Format (end of execution)

```
## dr-execute Evidence Report — [BUILD ID]

**Status**: Complete ✅ / Blocked ❌ / Scope-Changed 🔄

### Completion Evidence
- [ ] Live URL: https://...
- [ ] Search Console submitted: Yes/No
- [ ] TypeScript: Pass/Fail
- [ ] Tests: Pass/Fail/N/A
- [ ] PR merged: #NNN → develop
- [ ] Vercel preview: https://...

### Blockers (if blocked)
[Specific blocker description — not "it's complex"]

### Next Action
[Named person] must [specific action] by [DD/MM/YYYY HH:MM AEST]
```
