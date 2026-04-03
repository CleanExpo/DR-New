# Fact Shield Protocol v1.0

> **Authority**: All published content on disasterrecovery.com.au must pass this protocol before going live.
> **Scope**: Statistics, claims, percentages, cost figures, case outcomes, product/service efficacy statements.
> **Applies to**: Agents, writers, developers, and any automated content pipeline.

---

## The 5-Step Verification Checklist

Every published claim must pass all 5 gates. Failing any gate = **BLOCK** (cannot publish).

### Gate 1 — Source Named & Reputable
- [ ] The source is explicitly named (not "studies show" or "experts say")
- [ ] The source is Tier 1, 2, or 3 (see Source Tier System below)
- [ ] The source organisation exists and is contactable

**FAIL if**: Anonymous, "various sources", social media, or Tier 4–5 only.

---

### Gate 2 — Direct Link to Original Source
- [ ] A direct URL to the original source document is recorded
- [ ] The URL resolves (not a dead link)
- [ ] The URL links to the primary source, not a secondary article about it

**FAIL if**: No URL, URL is broken, URL leads to a blog/news article that cites the original (find the original).

---

### Gate 3 — Date Verified (Within 3 Years)
- [ ] The data publication date is recorded
- [ ] The date is within 3 years of today (2026-04-03)
- [ ] If older than 3 years: the claim is explicitly labelled as historical ("As of [year]...")

**FAIL if**: No date recorded, or data is >3 years old without a historical label.

---

### Gate 4 — Cross-Referenced (2+ Independent Sources)
- [ ] At least one additional independent source confirms the claim
- [ ] The second source is not owned by the same organisation as the first
- [ ] The two sources were not co-published or based on the same underlying dataset

**FAIL if**: Only one source found after reasonable search. Note: may publish with "single-source" caveat only if Tier 1.

---

### Gate 5 — Context Check (Not Misleading)
- [ ] The claim is not cherry-picked from a larger study that contradicts it
- [ ] The sample size is stated if applicable (n=X)
- [ ] The geographic scope matches the claim (AU data cited for AU claims, not US data)
- [ ] The claim is not extrapolated beyond what the source supports

**FAIL if**: Data is from a different geography presented as local, or sample size is too small to be meaningful (<100 for industry-wide claims).

---

## Source Tier System

| Tier | Category | Examples | Trust |
|------|----------|----------|-------|
| **Tier 1** | Government / University | ABS, AIDR, CSIRO, BOM, ICA, Safe Work Australia, Uni Melbourne, MBIE (NZ), FDMA (Japan) | 95–100% |
| **Tier 2** | Industry Body | IICRC, RIA (Restoration Industry Assoc), ISSA, Asthma Australia, BRANZ (NZ), BuildBack Japan | 80–94% |
| **Tier 3** | Research Firm | IBISWorld, Astute Analytica, GlobalData, Mordor Intelligence | 65–79% |
| **Tier 4** | Industry Media | Cleanfax, R&R Magazine, Restoration & Remediation | 40–64% |
| **Tier 5** | DR Primary Data | Internal surveys, polls, platform analytics — requires methodology published | 50–75% |

**Publication rule**: Stats must cite Tier 1–3 only. Tier 4 may be used for colour/context only (not as evidence). Tier 5 requires methodology disclosure.

---

## On Every Published Statistic

Every stat that appears on a public page must display:

```
Source: [Organisation Name] ([Year])
[Direct link to source document]
Sample size: n=X (if applicable)
```

Or in compact form: `(Source: IICRC S500, 2024)`

---

## Shield Score Calculation

| Gates Passed | Score | Status |
|---|---|---|
| 5/5 | 100 | ✅ Publish |
| 4/5 (Gate 5 fail) | 70 | ⚠️ Review — possible context issue |
| 4/5 (Gate 4 fail, Tier 1 source) | 80 | ⚠️ Publish with caveat |
| 3/5 or below | < 60 | ❌ Block — do not publish |

---

## Verification Record Format

When a claim passes verification, record it in `.claude/data/verified-claims.json`:

```json
{
  "id": "vc-[YYYYMMDD]-[slug]",
  "claim": "Water damage affects 1 in 50 Australian homes annually",
  "source": {
    "name": "Insurance Council of Australia",
    "tier": 1,
    "url": "https://insurancecouncil.com.au/...",
    "publicationDate": "2024-06-01",
    "sampleSize": null
  },
  "secondarySource": {
    "name": "AIDR",
    "tier": 1,
    "url": "https://aidr.org.au/..."
  },
  "gates": {
    "g1_sourceNamed": true,
    "g2_directLink": true,
    "g3_withinThreeYears": true,
    "g4_crossReferenced": true,
    "g5_contextCheck": true
  },
  "shieldScore": 100,
  "verifiedBy": "truth-finder",
  "verifiedAt": "2026-04-03T10:00:00Z",
  "usedOn": ["/data", "/industry-hub/water-damage"]
}
```

---

## Agent Integration

Agents that generate content must:
1. Run the Fact Shield checklist before proposing any stat for publication
2. Refuse to write claims that fail Gate 1 or Gate 2
3. Flag Gate 3–5 failures for human review
4. Record passing claims in `verified-claims.json` with the above schema

The `truth-finder` agent is the designated verifier. No agent self-verifies.

---

## Exceptions

The following do NOT require Fact Shield verification:
- Navigation copy, button labels, UI microcopy
- Historical/illustrative examples clearly labelled as fictional
- Testimonials (attributed, with consent on file)
- Pricing shown as estimates (clearly labelled "Guide price only")
