# DR-NRPG Skill Evals — DR-247

Benchmarking and acceptance tests for `.claude/skills/` skill files.
Each eval defines a prompt, the expected behaviour, and pass/fail criteria.

---

## How to Run

Evals are Claude-native: paste the **input prompt** to Claude with the skill loaded and compare output against **pass criteria**.

For automated regression, use the Claude API:
```bash
# Run all evals against Claude Sonnet 4.6
node .claude/evals/run-evals.mjs
```

---

## Eval: `disaster-recovery-domain`

### EVAL-DR-001 — Water damage category classification

**Skill**: `disaster-recovery-domain`
**Input**:
> A washing machine hose burst and flooded the laundry. What category of water damage is this?

**Expected output contains**:
- Category 2 (grey water)
- Reference to washing machine / dishwasher as grey water sources
- No misclassification as Category 1 or Category 3

**Pass criteria**:
- [ ] Correctly identifies Category 2
- [ ] Does NOT say Category 1 (clean water)
- [ ] Does NOT say Category 3 (black water)

---

### EVAL-DR-002 — Service type routing

**Skill**: `disaster-recovery-domain`
**Input**:
> A property has visible black mould growing on the bathroom ceiling and the owner reports a musty smell throughout the house.

**Expected output contains**:
- Mould remediation as primary service
- Reference to hidden mould / air quality testing
- Mention of IICRC S520

**Pass criteria**:
- [ ] Identifies mould remediation (not water damage) as primary
- [ ] Recommends air quality assessment
- [ ] References IICRC S520

---

### EVAL-DR-003 — Australian English enforcement

**Skill**: `disaster-recovery-domain`
**Input**:
> Write two sentences about mold remediation in a property.

**Expected output**:
- "mould" (not "mold")
- "organisation" not "organization"
- No American spellings

**Pass criteria**:
- [ ] Uses "mould" throughout
- [ ] No American-English spelling variants

---

## Eval: `iicrc-validator`

### EVAL-IICRC-001 — Correct standard code lookup

**Skill**: `iicrc-validator`
**Input**:
> What IICRC standard governs professional water damage restoration?

**Expected output**:
- S500 — Standard for Professional Water Damage Restoration
- NOT S520 (mould), NOT S700 (fire)

**Pass criteria**:
- [ ] Returns S500
- [ ] Does not return S520 or S700

---

### EVAL-IICRC-002 — Certification vs standard distinction

**Skill**: `iicrc-validator`
**Input**:
> Is WRT a standard or a certification?

**Expected output**:
- WRT is a technician certification (Water Restoration Technician)
- S500 is the standard; WRT is the personnel credential

**Pass criteria**:
- [ ] Correctly identifies WRT as a certification (not a standard)
- [ ] Identifies S500 as the governing standard

---

### EVAL-IICRC-003 — False claim detection

**Skill**: `iicrc-validator`
**Input**:
> Validate this claim: "Our work complies with IICRC S800, the standard for mould remediation."

**Expected output**:
- INCORRECT — S800 is NOT the mould standard
- S520 is the mould remediation standard
- S800 is for professional textile/carpet inspection

**Pass criteria**:
- [ ] Flags S800 claim as incorrect for mould
- [ ] Correctly identifies S520 as mould standard
- [ ] Identifies what S800 actually covers

---

## Eval: `australian-business-validator`

### EVAL-AUS-001 — ABN format validation

**Skill**: `australian-business-validator`
**Input**:
> Is this a valid ABN format: 51 824 753 556?

**Expected output**:
- 11-digit format check: valid structure
- Note: cannot verify ACTUAL registration without ABR lookup

**Pass criteria**:
- [ ] Identifies correct 11-digit ABN format
- [ ] Does not claim to verify live ABR registration

---

### EVAL-AUS-002 — Privacy Act applicability

**Skill**: `australian-business-validator`
**Input**:
> Does the Privacy Act 1988 apply to NRPG if it processes personal information of customers?

**Expected output**:
- Yes — the small business exemption is being removed as of 1 July 2026
- Prior to July 2026: small businesses (turnover < $3M) were exempt
- After July 2026: all businesses handling personal information are covered

**Pass criteria**:
- [ ] Confirms Privacy Act applies (or will apply post-July 2026)
- [ ] Correctly states the exemption removal date

---

## Eval: `fact-checker`

### EVAL-FACT-001 — Unverified statistics detection

**Skill**: `fact-checker`
**Input**:
> Check this claim: "NRPG achieves a 95% claim approval rate for our clients."

**Expected output**:
- UNVERIFIED — no source cited
- Risk: ACL s18 misleading conduct if published without verified data
- Requires: actual approval rate data from NRPG's internal records, confirmed by named owner

**Pass criteria**:
- [ ] Flags claim as unverified
- [ ] References ACL s18 risk or equivalent consumer law concern
- [ ] Does NOT approve the claim without evidence

---

### EVAL-FACT-002 — Verifiable claim pass-through

**Skill**: `fact-checker`
**Input**:
> Check this claim: "The IICRC S500 standard classifies water damage into three categories."

**Expected output**:
- VERIFIED — IICRC S500 does define 3 categories (1, 2, 3)
- No source concerns

**Pass criteria**:
- [ ] Approves the claim as accurate
- [ ] Does NOT flag it as unverified

---

## Eval: `security-best-practices`

### EVAL-SEC-001 — Hardcoded secret detection

**Skill**: `security-best-practices`
**Input**:
> Review this code snippet:
> ```typescript
> const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-123';
> ```

**Expected output**:
- FAIL — hardcoded fallback secret is a security vulnerability
- In production, a missing env var should THROW, not fall back
- Fix: `if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set')`

**Pass criteria**:
- [ ] Identifies hardcoded fallback as a security risk
- [ ] Recommends throwing on missing env var
- [ ] Does NOT approve the fallback pattern

---

## Eval: `australian-insurance-standards`

### EVAL-INS-001 — Insurance claim terminology

**Skill**: `australian-insurance-standards`
**Input**:
> What is the difference between an insurer and a loss assessor in an Australian property insurance claim?

**Expected output**:
- Insurer: the insurance company paying the claim
- Loss assessor / assessor: appointed by the insurer to assess the damage and value
- Loss adjuster (sometimes used interchangeably): manages the claim on behalf of insurer

**Pass criteria**:
- [ ] Correctly distinguishes insurer from loss assessor
- [ ] Does not confuse roles

---

## Eval Scoring

| Skill | Evals | Target pass rate |
|-------|-------|-----------------|
| `disaster-recovery-domain` | 3 | 100% |
| `iicrc-validator` | 3 | 100% |
| `australian-business-validator` | 2 | 100% |
| `fact-checker` | 2 | 100% |
| `security-best-practices` | 1 | 100% |
| `australian-insurance-standards` | 1 | 100% |
| **Total** | **12** | **100%** |

All evals must pass before a skill is considered production-ready.
If any eval fails, update the skill file to add missing knowledge or clarify ambiguous rules.
