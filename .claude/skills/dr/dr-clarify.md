# Skill: dr-clarify
> **OMX Source**: `$deep-interview`
> **Purpose**: Pre-BUILD ambiguity gate — run before any BUILD enters "Approved" status.
> **Trigger**: Any time a BUILD is proposed, before planning begins.

---

## When to Use

Run `dr-clarify` on every proposed BUILD before writing a plan. A BUILD with an ambiguity score > 0.20 must not advance to planning.

---

## The 6-Gate Ambiguity Check

Score each gate: ✅ Clear (0) | ⚠️ Unclear (0.05) | ❌ Missing (0.20)

| Gate | Check | Pass Condition |
|------|-------|----------------|
| **G1 — Content Specified** | Is the full content scope described with no "TBD" or "pending"? | Every section has named, specific content |
| **G2 — Legal/Compliance** | Are pre-conditions named AND confirmed? | Not "pending legal review" — specific confirmation from named person |
| **G3 — Data Sources** | Are all statistics sourced with URLs? | Every claim has Tier 1–3 source + direct URL |
| **G4 — Geo/Supplier Coverage** | Are named suppliers confirmed for each geography? | Specific supplier name + confirmation date per market |
| **G5 — Owner** | Is there a specific named owner? | Not "the team" — first name + last name + confirmed availability |
| **G6 — Execution Date** | Is there a specific calendar date? | Not "next session" — DD/MM/YYYY |

**Ambiguity Score** = sum of failed gate scores.

- Score 0.00 → ✅ Proceed to planning
- Score 0.05–0.19 → ⚠️ Clarify before finalising plan (can proceed with noted caveats)
- Score ≥ 0.20 → ❌ Status: `Blocked: Clarification Required` — do not plan

---

## Output Format

```
## dr-clarify Report — [BUILD ID]

| Gate | Status | Notes |
|------|--------|-------|
| G1 Content    | ✅/⚠️/❌ | [specific gap if any] |
| G2 Legal      | ✅/⚠️/❌ | |
| G3 Data       | ✅/⚠️/❌ | |
| G4 Geo/Supply | ✅/⚠️/❌ | |
| G5 Owner      | ✅/⚠️/❌ | |
| G6 Date       | ✅/⚠️/❌ | |

**Ambiguity Score**: 0.XX
**Verdict**: Proceed / Clarify / BLOCKED
**Questions for owner** (if blocked):
1. [Specific question]
2. [Specific question]
```

---

## Example

**Good (Score 0.00):**
> "Build the Cyclone Narelle event page at /events/cyclone-narelle-2026. Content: AIDR damage stats (aidr.org.au/report-2026), ICA insurance impact data, 3 contractor profiles from NRPG Sydney. Owner: Phill McGurk. Execution date: 07/04/2026."

**Bad (Score 0.40 — BLOCKED):**
> "Build some cyclone pages — we'll get the stats from somewhere and figure out the content as we go. The legal team will review."
