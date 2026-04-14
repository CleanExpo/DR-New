# GAP-065 — AML/CTF Tranche 2 Scope Assessment

**Classification:** CONFIDENTIAL — internal use only. Do not publish to public site.  
**Entity:** Unite-Group NEXUS Pty Ltd (ABN 95 691 477 844 | ACN 691 477 844)  
**Platform:** NRPG (National Restoration Professionals Group) + disasterrecovery.com.au  
**Prepared by:** Engineering + Operations (DR-641)  
**Date:** 14 April 2026  
**Deadline:** 15 April 2026  
**Review required by:** Legal counsel before operational reliance.

---

## 1. Background

The Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (AML/CTF Act) is being expanded under Tranche 2 reforms to cover additional professional sectors. AUSTRAC opened enrolment on 31 March 2026. The enrolment deadline for newly designated entities is **28 April 2026**. Main compliance obligations apply from **1 July 2026**.

This document assesses whether Unite-Group NEXUS Pty Ltd (NRPG/DR) is a designated entity under Tranche 2, and documents the outcome of related internal audits.

---

## 2. Tranche 2 Designated Services — Summary

The Tranche 2 reforms bring the following sectors into scope under the AML/CTF Act:

| Sector | Designated services |
|--------|-------------------|
| Legal | Conveyancing, managing client money/assets, company formation, trust administration |
| Accounting | Preparing/executing transactions on behalf of clients re: property, business assets, companies |
| Real estate | **Brokering the sale, purchase, or transfer of real property** |
| High-value dealers | Selling vehicles, vessels, aircraft, jewellery, art, precious metals/stones above $10,000 |
| Virtual asset service providers | Exchanging, transferring, storing virtual assets |

Source: AUSTRAC, *New industries and services to be regulated under the AML/CTF Act*, updated April 2026 (https://www.austrac.gov.au/business/new-regulated-industries-and-professions/new-industries-and-services-to-be-regulated-under-the-amlctf-act).

---

## 3. Assessment — Is NRPG a Designated Entity?

### 3.1 What NRPG does

NRPG operates as a **contractor matching and coordination platform** for property damage restoration. When a property owner submits a claim via disasterrecovery.com.au, the platform:

1. Collects contact details and damage information from the property owner
2. Matches the request to verified restoration contractors (water, fire, mould)
3. Facilitates contact between the property owner and the contractor
4. Contractors independently perform restoration work and invoice directly

NRPG does not:

- Buy, sell, transfer, or hold real property on behalf of clients
- Handle proceeds of sale or purchase of real property
- Manage client funds or escrow accounts
- Form companies or trusts on behalf of clients
- Provide legal, accounting, or financial advice

### 3.2 The designated real estate service — distinction

The Tranche 2 designated service for real estate is: **"brokering the sale, purchase, or transfer of real property."**

This refers to real estate agents acting in the sale or transfer of property ownership — i.e., conveyancing-adjacent services that expose the agent to large cash flows and money laundering risk.

NRPG's service is: **"coordinating licensed tradespeople to restore damaged property."**

No transfer of property title occurs. No purchase consideration passes through NRPG. No client funds are held or transferred by the platform. The contractor is engaged directly by the property owner; NRPG facilitates the introduction only.

**Conclusion: NRPG does not provide a designated Tranche 2 service under the real estate category.**

### 3.3 Other designated categories

| Category | Applicable to NRPG? | Reason |
|----------|--------------------|----|
| Legal services | No | NRPG provides no legal advice, conveyancing, or asset management |
| Accounting/financial | No | NRPG provides no accounting, financial, or tax services |
| High-value dealers | No | NRPG does not sell goods exceeding $10,000 threshold |
| Virtual asset services | No | NRPG does not handle cryptocurrency or virtual assets |

### 3.4 Enrolment deadline

The 28 April 2026 enrolment deadline applies only to entities providing designated services. Because NRPG does not provide any designated Tranche 2 service, the enrolment deadline does not apply.

**Action required:** None for Tranche 2. Continue monitoring AUSTRAC guidance for any sector expansion.

---

## 4. ID Retention Audit — OAIC March 2026 Guidance

The Office of the Australian Information Commissioner (OAIC) issued updated guidance (effective 31 March 2026) clarifying that entities must not retain copies of identity documents (driver's licence, passport) beyond the minimum necessary period, and in most cases must not retain copies at all unless specifically required by law.

### 4.1 What the claim intake collects

Route: `POST /api/public/claims/submit`  
Model: `PublicClaim` (table: `public_claims`)

Fields persisted:

| Field | Type | Notes |
|-------|------|-------|
| `clientName` | String | Property owner's name |
| `clientEmail` | String | Contact email |
| `clientPhone` | String | Contact phone |
| `propertyAddress` | String | Damage location |
| `suburb` | String | Suburb |
| `postcode` | String | Postcode |
| `disasterType` | String | Water, fire, mould, etc. |
| `incidentDate` | DateTime | When damage occurred |
| `isOngoing` | Boolean | Whether damage is ongoing |
| `isEmergency` | Boolean | Whether emergency response required |
| `damageDescription` | String | Description of damage |
| `hasInsurance` | Boolean | Whether insured |
| `insuranceProvider` | String? | Insurer name (optional) |
| `policyNumber` | String? | Policy number (optional) |
| `priority` | String | Calculated urgency level |
| `status` | String | Workflow status |

**No identity document fields exist in the schema or the claim form.**  
No driver's licence number, passport number, Medicare number, or identity document image is collected or stored.

The `policyNumber` field is an insurance policy reference provided voluntarily by the property owner — this is not a government-issued identity document.

### 4.2 Conclusion

**The `/claim` intake does NOT collect, upload, or persist identity document copies.**  
The platform is compliant with OAIC March 2026 guidance prohibiting unnecessary retention of identity document copies.

**Action required:** None. Maintain this stance as the platform grows. Any future KYC requirements for contractor verification must be handled via a dedicated, legally reviewed identity verification flow — not via the consumer claim intake.

---

## 5. APP 3 Collection Notice — Template

**Australian Privacy Principle 3** (APP 3) requires entities to notify individuals at or before the time of collection about:
- The entity's identity and contact details
- The fact that personal information is being collected
- The purpose for which information is collected
- Whether collection is required or authorised by law
- The consequences of not collecting
- Any overseas disclosure
- How to access the Privacy Policy

### 5.1 Draft APP 3 notice for claim intake

> **Privacy Collection Notice**
>
> Unite-Group NEXUS Pty Ltd (ABN 95 691 477 844) collects personal information you provide via this form (name, contact details, property address, insurance details) to match your restoration request with verified contractors and to communicate with you about your claim.
>
> Collection is voluntary. Without this information, the service cannot be provided.
>
> Your information is stored on Australian servers and may be shared with contractors in your area for the purpose of fulfilling your restoration request. It will not be used for direct marketing without your consent.
>
> See the full Privacy Policy at [disasterrecovery.com.au/privacy].

**Status:** Draft — requires legal review before implementation.  
**Implementation target:** Add to claim intake form and contractor application form.  
**Feeds:** GAP-093 / BUILD-PLAN-43-C (Privacy Policy update).

---

## 6. Privacy Policy — Small Business Exemption Assessment

### 6.1 Current reliance

The Privacy Act 1988 currently exempts businesses with annual turnover under $3 million (the "small business exemption"). Unite-Group NEXUS Pty Ltd may currently rely on this exemption depending on annual revenue.

### 6.2 Important caveats

The exemption does **not** apply if the entity:
- Provides health services
- Holds tax file numbers
- Has voluntarily opted in to the Privacy Act
- Is a related body corporate of a larger entity

### 6.3 Action required

**Toby to confirm annual revenue for the most recent financial year** (FY2024–25 or FY2025–26 YTD). If revenue is below $3 million, small business exemption reliance can be documented.

Regardless of exemption status, best practice and enterprise partner requirements dictate maintaining APP-compliant privacy practices. Recommend updating the Privacy Policy to be APP-compliant regardless of exemption status.

**This item is BLOCKED pending Toby revenue confirmation.**

---

## 7. Summary of Findings and Actions

| Item | Finding | Action | Owner | Deadline |
|------|---------|--------|-------|----------|
| Tranche 2 designation | NRPG is NOT a designated entity | None — monitor AUSTRAC guidance | Engineering | Ongoing |
| 28 April enrolment deadline | Does not apply | None | — | — |
| Identity document retention | No ID documents collected or stored | None — maintain current practice | Engineering | Ongoing |
| APP 3 notice (claim form) | Draft prepared (Section 5.1) | Legal review then implement | Legal + Product | Before next public release |
| APP 3 notice (contractor form) | Required | Implement alongside claim form notice | Engineering | GAP-093 |
| Privacy Policy — SB exemption | Blocked | Toby to confirm revenue figure | Toby / CEO | ASAP |

---

## 8. Sign-off Required

This document requires sign-off before operational reliance:

| Role | Name | Signed | Date |
|------|------|--------|------|
| CTO (no-code review) | — | [ ] | |
| Head of Product (compliance gate) | — | [ ] | |
| Legal counsel (primary sign-off) | — | [ ] | |
| CEO (final) | Phill McGurk | [ ] | |

**Legal counsel review is mandatory before this assessment is relied upon for compliance purposes.**

---

*Document prepared under DR-641. Stored in `/docs/` only — not for public deployment.*
