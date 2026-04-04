# Skill: Linear Task Classifier

> Use this skill before attempting any Linear issue. Determines whether a task
> is executable by Claude Code autonomously, needs human action, or is blocked.

## Classification Tiers

| Tier | Label | Meaning |
|------|-------|---------|
| 1 | `EXECUTABLE` | Code task — implement now |
| 2 | `BLOCKED` | Build blocker — skip, leave comment |
| 3 | `HUMAN_ONLY` | Requires human action (accounts, design, legal) — skip silently |
| 4 | `NEEDS_CLARIFICATION` | OMX gate failure — leave comment, skip |
| 5 | `DEFER` | Out of scope for this sprint — skip silently |

---

## Tier 1 — EXECUTABLE signals

The task IS code-executable if the description mentions any of:

**Build actions**: build, create, implement, add, fix, update, refactor, migrate, generate, scaffold, integrate, connect, wire up, set up

**Output types**: page, component, API route, endpoint, schema, migration, hook, type, interface, utility, service, layout, JSON-LD, metadata, config, middleware, webhook handler, dashboard, form, table, modal, card, section

**Tech keywords**: TypeScript, Prisma, Next.js, React, Tailwind, PostgreSQL, Redis, Stripe, LangChain, Supabase, Zod, NextAuth, pnpm, npm package

**Examples of EXECUTABLE tasks:**
- "Add FAQPage schema to service pages"
- "Fix hydration mismatch in public layout"
- "Build contractor application form — screening + approval workflow"
- "Create /restore-assist landing page"
- "Implement 100-point certification scoring engine"
- "Add metadata exports to 13 pages"
- "Fix TypeScript errors in API routes"

---

## Tier 2 — BLOCKED signals

Mark as BLOCKED if description contains:

- "BUILD BLOCKER"
- "Legal must confirm"
- "BLOCKED:"
- "Blocked: Clarification Required"
- "pending legal"
- "requires Toby to confirm"
- "ACL risk" (without explicit sign-off)
- "cert status never confirmed"

**Action when BLOCKED**: Leave a Linear comment:
```
sprint-loop: Skipping — BUILD BLOCKER detected.
Gate failed: {which gate and why}
Required action: {what needs to happen to unblock}
```

---

## Tier 3 — HUMAN_ONLY signals

Skip silently (no comment) if the task requires:

**Platform accounts**:
- LinkedIn, Instagram, TikTok, Facebook, Reddit, YouTube — account creation/posting
- Google Search Console, Google Ads — require browser login
- Shopify — requires account creation
- Printful, Printify — POD supplier setup
- ABR API — requires ABN holder authentication

**Design tools**:
- Figma, Canva — visual design software
- Excalidraw diagrams — requires human visual judgement
- Brand kit, logo design — creative direction needed
- Merch mockups — requires design assets

**Physical world**:
- Van decals, stickers — physical product ordering
- Workwear, hi-vis — physical goods
- Conference banners, event kit — physical procurement
- Print + shipping

**Legal/Financial**:
- Contracts, agreements — legal review
- Insurance verification — third-party check
- ABN validation — external API requiring credentials
- Xero setup — accounting system access

**Examples of HUMAN_ONLY tasks:**
- "Create all DR social media accounts — 10 channels"
- "Van decal design + certified contractor sticker program"
- "Pull keyword rankings from Google Search Console"
- "Merch design pack — logos, colour palettes, mockups"

---

## Tier 4 — NEEDS_CLARIFICATION signals

Apply the OMX Clarification Gate. Fail if any gate is red:

| Gate | Fail Signal |
|------|------------|
| G1 Content | Description contains: "TBD", "to be confirmed", "pending content", "placeholder" |
| G2 Legal | Unconfirmed: "legal review pending", "awaiting legal sign-off", "compliance to be checked" |
| G3 Data | Stats without sources: "X% of homes" with no cited source, "industry data needed" |
| G4 Geo/Supplier | "supplier TBD", "coverage to be confirmed", "check postcode availability" |
| G5 Owner | No named owner: "the team will", "we need to", "someone should" |
| G6 Date | "next session", "when available", "after approval" without a date |

**Action when NEEDS_CLARIFICATION**: Leave a Linear comment:
```
sprint-loop: Skipping — OMX Gate failure.
Failed gates: G{n} — {reason}
Required: {what specific information is missing}
Owner action: {who needs to confirm what}
```

---

## Tier 5 — DEFER signals

Skip silently (move to next task) if:

- Priority is None (0) or Low (4)
- Issue is in a project you haven't been asked to work on
- Issue title contains "[NEXUS]" — agent activation tasks, separate system
- Issue title contains "[DR-VEX]" — external data pull requiring GSC/Ads access
- Issue is older than 90 days with no recent activity (likely superseded)
- Issue is a duplicate (check `duplicateOf` field)

---

## Quick Classification Table

| Issue pattern | Tier |
|--------------|------|
| "Build/Create/Add/Fix [code thing]" | EXECUTABLE |
| "BUILD BLOCKER: Legal..." | BLOCKED |
| "Create social media accounts" | HUMAN_ONLY |
| "Design van decals" | HUMAN_ONLY |
| "Pull GSC rankings" | HUMAN_ONLY |
| "[NEXUS] Activate agent" | DEFER |
| "TBD / pending data" | NEEDS_CLARIFICATION |
| "[DR-VEX] keyword research" | HUMAN_ONLY |
| "Xero/ASCORA data pipeline" | BLOCKED (needs credentials) |
| "Cost calculator — build scoring UI" | EXECUTABLE |
| "Contractor application form — build" | EXECUTABLE |
| "30-day onboarding workflow — implement" | EXECUTABLE |
| "100-point certification — build engine" | EXECUTABLE |

---

## Usage in sprint-loop

```python
for issue in linear_queue:
    tier = classify(issue)
    if tier == EXECUTABLE:
        implement(issue)
        break  # execute one task, then re-run classifier on next
    elif tier == BLOCKED:
        leave_comment(issue, reason)
        continue
    elif tier == NEEDS_CLARIFICATION:
        leave_comment(issue, gate_failures)
        continue
    else:
        continue  # HUMAN_ONLY or DEFER — silent skip
```

---

## Keeping the Classifier Sharp

After each sprint, if you encounter a task type not covered above:
- Add it to the appropriate tier with the signal that triggered it
- Update this skill file via a `chore(skills):` commit
