---
name: iicrc-validator
description: "Validate IICRC standard references, certification claims, and technical terminology. Use when working on service pages, guides, or content that references IICRC standards."
user-invocable: true
allowed-tools: WebSearch WebFetch Read Grep Glob
context: fork
paths:
  - "**/guides/**"
  - "**/services/**"
  - "content/**"
  - "data/services*"
---

# IICRC Standards Validator

## Correct Service-to-Standard Mapping

| Service | Standard | Certification |
|---------|----------|---------------|
| Water Damage | S500 | WRT (Water Restoration Technician) |
| Mould Remediation | S520 | AMRT (Applied Microbial Remediation Technician) |
| Fire & Smoke | FSRT | FSRT (Fire & Smoke Restoration Technician) |
| Biohazard/Trauma | S540, S800 | Specialised training |
| Carpet/Textile | S100 | — |

## Common Errors to Catch

- "Fire and Smoke Remediation S520" -> WRONG. S520 is Mould. Fire = FSRT.
- "Water Damage S520" -> WRONG. Water = S500.
- "Mold Removal WRT" -> WRONG. Mould = S520 with AMRT certification.

## Content Framing Rules

- Guide pages MUST use "What to Expect from a Certified Contractor" format
- NEVER reproduce classification frameworks from IICRC standards
- NEVER reproduce standard text verbatim
- Reference standards by code only (S500, S520, etc.)
- Verify all mappings against iicrc.org before publishing

## Validation Process

1. Grep codebase for IICRC standard references
2. Check each service page for standard claims
3. Verify certification requirements stated
4. Cross-reference with iicrc.org
5. Flag any mismatches
