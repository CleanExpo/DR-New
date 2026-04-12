# Skill: dr-competitor-page
> **OMX Source**: `$web-clone`
> **Purpose**: Competitor page extraction for counter-messaging and gap analysis (GAP-021).
> **Trigger**: When Phill or boardroom identifies a competitor page to analyse for counter-positioning.

---

## When to Use

Use `dr-competitor-page` when:
1. A competitor page URL is provided
2. The goal is to understand their messaging and identify DR/NRPG counter-positions
3. NOT for copying content (Fact Shield Protocol applies to all published claims)

---

## Extraction Protocol

### Step 1 — Page Read
Using browser tools, extract:
- H1, H2, H3 headings (their content hierarchy)
- Key value propositions and CTAs
- Statistics and claims made (flag any without visible sources)
- Trust signals (certifications, badges, testimonials)
- Pricing signals (if visible)
- Geographic claims

### Step 2 — Claim Audit
For each statistic or factual claim on the competitor page:
- Is it sourced? (Source name + URL visible?)
- Does it pass Fact Shield Gate 1 (named Tier 1–3 source)?
- Flag unsourced claims as potential weaknesses in their credibility

### Step 3 — Gap Analysis
Compare against DR/NRPG offering:
| Competitor Claim | DR/NRPG Response | Gap Type |
|---|---|---|
| [their claim] | [our position] | Stronger / Equal / Weaker / Missing |

### Step 4 — Counter-Messaging Draft
For each "Weaker" or "Missing" gap, draft DR/NRPG counter-message:
- Must pass Fact Shield Gates 1–3 before use
- Must use Australian English
- Must not name the competitor (legal risk)

### Step 5 — BUILD Recommendation
If counter-messaging is actionable → propose a new BUILD via `dr-clarify` gate.

---

## Output Format

```
## dr-competitor-page Report — [Competitor Name/URL]

**Date analysed**: DD/MM/YYYY
**Analyst**: Claude (verification by Phill McGurk)

### Their Messaging (Top 5 Claims)
1. [Claim] — Sourced: ✅/❌
2. ...

### Claim Audit — Unsourced/Weak Claims
- [Claim]: No source visible — credibility risk for them

### Gap Analysis
| Area | Their Position | Our Position | Gap |
|---|---|---|---|
| [area] | [theirs] | [ours] | Stronger/Weaker/Missing |

### Counter-Messaging (Fact-Shield Cleared)
- [Our position + source]

### BUILD Recommendation
[BUILD title] — [Brief spec if actionable]
```

---

## Legal Notes

- Never reproduce competitor content verbatim
- Never make false or misleading comparative claims
- All published counter-messaging must pass Fact Shield Gates 1–3
- Do not name competitors in public-facing content without legal review
