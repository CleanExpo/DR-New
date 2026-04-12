# Skill: dr-content-build
> **OMX Source**: `$autopilot`
> **Purpose**: Autonomous content BUILD pipeline — runs a full content page from brief to deployed PR without human prompts between steps.
> **Trigger**: When a content BUILD has passed `dr-clarify` (ambiguity score 0.00) and is ACTIVE_EXECUTION.

---

## When to Use

Use `dr-content-build` for content pages (industry hub pages, event pages, location pages, data pages) where:
1. `dr-clarify` passed (score 0.00)
2. All data sources confirmed with URLs
3. Page route defined
4. No external API integration required (static content, seeded data only)

---

## Pipeline Steps

Run these in sequence without stopping for human confirmation:

### Step 1 — Fact Shield Gate
Run every statistic through `.claude/data/fact-shield-protocol.md`:
- All claims must pass Gates 1–3 minimum
- Block any claim that fails Gate 1 or Gate 2
- Record all passing claims in `verified-claims.json`

### Step 2 — JSON-LD Schema Plan
Identify applicable schemas:
- BreadcrumbList → every page
- WebPage or Article → informational pages
- ItemList → listing pages
- Event → event pages
- LocalBusiness → location pages

### Step 3 — Component Build
Build the page following:
- `(public)` route group for public pages (gets PublicHeader/PublicFooter automatically)
- Server component unless interactivity required → then `'use client'`
- Scientific Luxury design system: OLED black `#050505`, no generic Tailwind defaults
- AU/NZ/JP scope: all three markets in data, stats, and copy

### Step 4 — TypeScript Check
Run `pnpm run type-check` — fix all errors before proceeding.

### Step 5 — Commit + Push + PR
```bash
git checkout -b feat/[LINEAR-ID]-[slug]
git add [files]
git commit -m "feat([ID]): [description]"
git push -u origin feat/[LINEAR-ID]-[slug]
gh pr create --base develop --title "..." --body "..."
```

### Step 6 — Linear Update
Mark issue Done in Linear with PR link attached.

### Step 7 — Verification Checklist
Produce the verification checklist per `verification-gate.md` rules:
1. Where to check (URL)
2. How to get there (nav path)
3. What to see (specific elements)
4. What NOT to see (no phone/email/address per CLAUDE.md Rule 1)
5. Confirmation prompt

---

## Parallel Execution

When a content BUILD has ≥2 independent pages, define lanes and execute concurrently:

```
Lane A: [Page 1 — all steps 1–7]
Lane B: [Page 2 — all steps 1–7]
Lane C: [Shared elements, after A+B — schema cross-linking, internal links]
```

---

## Output Format

```
## dr-content-build Report — [BUILD ID]

**Pages built**: N
**PRs opened**: #NNN, #NNN
**Linear updated**: ✅

### Verification Checklist
[per verification-gate.md]
```
