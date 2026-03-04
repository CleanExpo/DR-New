# Tax Structure Overview

**Business:** Disaster Recovery Platform
**Prepared for:** Accountant / Financial Adviser
**Contact:** support@disasterrecovery.com.au
**Primary Entity:** Disaster Recovery Pty Ltd (ABN 85 151 794 142 / ACN 151 794 142)
**Location:** Brisbane, Queensland 4076
**Governing Law:** Queensland, Australia

### Registered Entities

| Entity | ABN | ACN | GST Status |
|---|---|---|---|
| Disaster Recovery Pty Ltd | 85 151 794 142 | 151 794 142 | To be confirmed |
| Disaster Recovery Qld Pty Ltd | 42 633 062 307 | 633 062 307 | To be confirmed |
| The McGurk Family Trust | 45 397 296 079 | N/A | Registered since 15 Jun 2022 |
| CARSI (Trust trading name) | 62 580 077 456 | N/A | See Trust |

---

## 1. Revenue Model

The platform generates revenue through three primary channels across three brands:

### Revenue Streams Summary

| Brand | Revenue Stream | Type | Frequency |
|---|---|---|---|
| **Disaster Recovery** | Job matching commission | Percentage of job value | Per transaction |
| **Disaster Recovery** | Featured listings | Fixed fee | Monthly |
| **Disaster Recovery** | Lead generation fees | Per-lead charge | Per transaction |
| **NRPG** (Disaster Recovery Pty Ltd) | Contractor subscriptions | Tiered monthly/annual plans | Recurring |
| **NRPG** (Disaster Recovery Pty Ltd) | Certification fees | One-off or periodic | Per certification |
| **CARSI** (McGurk Family Trust) | Training module fees | Per module or bundled | Per purchase |
| **NRPG** (Disaster Recovery Pty Ltd) | Merchandise store | Physical goods (workwear, signage, equipment) | Per order |
| **Restore Assist** | Claims assistance fee | Fee for service or % of claim | Per engagement |
| **Restore Assist** | Referral commissions | From engaged contractors | Per referral |

### Payment Processing
- All digital payments processed through **Stripe**
- Stripe handles payment collection and disbursement
- Stripe fees are a deductible business expense
- Stripe provides tax-relevant reporting (1099-K equivalent data)

---

## 2. GST Implications for Marketplace Model

### Key Question: Agent vs Principal

The GST treatment depends on whether the platform acts as an **agent** or **principal**:

| Role | GST Treatment | Implication |
|---|---|---|
| **Agent** | GST only on the commission/platform fee | Lower GST liability; contractor handles their own GST on the full job value |
| **Principal** | GST on the full transaction value | Higher GST liability; platform claims input credits on amounts paid to contractor |

**Recommendation:** Discuss with the accountant to confirm the correct classification. Most marketplace platforms in this model operate as **agents** (facilitating a connection, not contracting for the work themselves).

### GST on Each Revenue Stream

| Stream | GST Treatment | Notes |
|---|---|---|
| Matching commission | Taxable (on commission amount) | If agent model, GST is on the fee only |
| Contractor subscriptions | Taxable | Standard GST on subscription fees |
| Certification fees | Taxable | Standard GST |
| Training modules | Taxable | Digital supply |
| Merchandise sales | Taxable | Physical goods, standard GST |
| Claims assistance fees | Review required | May be a financial service (GST-free) or taxable supply depending on the nature of the service; seek specific advice |
| Lead generation fees | Taxable | Standard GST |

---

## 3. Contractor Payment Structure

### How Payments Flow

```
Property Owner --[pays]--> Contractor (directly)
                           |
Contractor --[pays commission]--> Platform (Disaster Recovery)
```

**Critical distinction:**
- The **contractor invoices the property owner** directly for the restoration work
- The **platform charges the contractor** a commission/fee for the job match
- The platform does **not** handle the payment between property owner and contractor (in most cases)

### Alternative Model (if platform processes payment)

```
Property Owner --[pays]--> Platform --[pays minus commission]--> Contractor
```

If the platform processes the full payment:
- The platform collects from the property owner
- Deducts the commission
- Remits the balance to the contractor
- Additional GST and withholding considerations apply

**Action required:** Confirm with accountant which payment flow is used and the resulting GST and reporting obligations.

### Contractor Tax Status
- Contractors are **independent operators**, not employees
- Contractors are responsible for their own ABN, GST, and tax obligations
- The platform should collect contractor ABN details and verify GST registration
- Review **Taxable Payments Annual Report (TPAR)** obligations (see below)

### TPAR Obligations
- If the platform makes payments to contractors for services, it may be required to lodge a TPAR with the ATO
- The TPAR reports total payments made to each contractor during the financial year
- Due annually by 28 August
- Discuss with accountant whether this applies to the marketplace commission model

---

## 4. International Transactions (NZ Expansion)

### Cross-Border Tax Considerations

| Issue | Detail |
|---|---|
| **NZ GST on digital services** | An Australian entity providing digital services to NZ consumers may need to register for NZ GST (if NZ turnover exceeds NZD $60,000) |
| **Double Tax Agreement (DTA)** | Australia and NZ have a DTA to prevent double taxation of the same income |
| **Transfer pricing** | If a separate NZ entity is established, intercompany transactions must be at arm's length |
| **Withholding tax** | Payments between AU and NZ entities may attract withholding tax (reduced by DTA) |
| **Foreign exchange** | NZD revenue must be converted to AUD for Australian tax reporting |
| **Permanent establishment** | If the AU entity has a "permanent establishment" in NZ, NZ may tax that income |

### Recommended Actions
- [ ] Determine NZ entity structure (branch vs subsidiary) with accountant
- [ ] Register for NZ GST if threshold is met or expected
- [ ] Set up processes for tracking NZ revenue separately
- [ ] Review DTA provisions relevant to the business
- [ ] Establish transfer pricing documentation if separate NZ entity

---

## 5. Deductible Expense Categories

The following categories of expenses are expected to be deductible:

| Category | Examples |
|---|---|
| **Technology & Hosting** | Vercel hosting, Supabase database, domain registrations, API costs |
| **Software & SaaS** | Stripe fees, email services (SendGrid), analytics tools, development tools |
| **Marketing & Advertising** | Google Ads, social media advertising, SEO tools, content creation |
| **Professional Services** | Accounting fees, legal fees, trademark registration costs |
| **Contractor Costs** | Freelance developers, designers, content writers |
| **Insurance** | Professional indemnity, cyber liability, public liability, business insurance |
| **Office & Administration** | Registered office costs, office supplies, telecommunications |
| **Training & Development** | Staff training, conference attendance, professional development |
| **Merchandise (COGS)** | Cost of goods for the NRPG merchandise store |
| **Travel** | Business travel (including AU-NZ travel for expansion) |
| **Depreciation** | Computer equipment, office fitout (if applicable) |
| **R&D Tax Incentive** | Software development may qualify for the R&D Tax Incentive (43.5% refundable offset for eligible entities with turnover < $20M) |

### R&D Tax Incentive
- [ ] Review eligibility for the R&D Tax Incentive with accountant
- [ ] Software development activities may qualify as eligible R&D
- [ ] Must register R&D activities with AusIndustry before lodging the tax return
- [ ] Potentially significant tax benefit; worth investigating

---

## 6. Suggested Financial Year Setup

### Financial Year Options

| Option | Period | Pros | Cons |
|---|---|---|---|
| **Standard (1 Jul - 30 Jun)** | Aligned with Australian tax year | Simplest for compliance, aligned with BAS periods | May not suit business cycle |
| **Substituted Accounting Period (SAP)** | Any 12-month period (e.g., 1 Jan - 31 Dec) | Can align with business planning cycle | Requires ATO approval, adds complexity |

### Recommendation
- [ ] **Standard financial year (1 July - 30 June)** is recommended unless there is a specific reason to adopt a SAP
- [ ] Aligns with BAS quarterly lodgement, PAYG instalments, and income tax return due dates
- [ ] Simplifies compliance for the accountant

### Key Tax Dates (Standard FY)

| Date | Obligation |
|---|---|
| 28 July | Q4 BAS due (April-June) |
| 28 August | TPAR due (if applicable) |
| 28 October | Q1 BAS due (July-September); Annual income tax return due (if lodged by taxpayer) |
| 28 January | Q2 BAS due (October-December) |
| 28 February | Q2 PAYG instalment due |
| 28 April | Q3 BAS due (January-March) |
| 15 May | Tax return due (if lodged by tax agent, standard due date) |

*Due dates may vary; confirm with accountant.*

---

## 7. Bookkeeping Recommendations

| Item | Recommendation |
|---|---|
| **Software** | Xero (widely used in AU/NZ, integrates with Stripe) |
| **Bank feeds** | Connect business bank account(s) to Xero for automatic reconciliation |
| **Stripe integration** | Use Xero's Stripe integration to automatically import transactions |
| **Chart of accounts** | Set up separate revenue accounts for each income stream and brand |
| **Cost centres / tracking** | Use tracking categories to separate Disaster Recovery / NRPG / Restore Assist financials |
| **BAS preparation** | Xero can generate BAS reports for GST lodgement |
| **Payroll** | Use Xero Payroll (AU) for STP compliance when employing staff |

---

## 8. Action Items for Accountant

- [ ] Clarify role of each existing entity (Disaster Recovery Pty Ltd vs Disaster Recovery Qld Pty Ltd vs The McGurk Family Trust)
- [ ] Confirm GST registration status for Disaster Recovery Pty Ltd (ABN 85 151 794 142)
- [ ] Confirm GST registration status for Disaster Recovery Qld Pty Ltd (ABN 42 633 062 307)
- [ ] Note: The McGurk Family Trust is already GST registered since 15 June 2022
- [ ] Confirm agent vs principal GST classification for the marketplace
- [ ] Review Restore Assist fee structure for financial services GST exemption
- [ ] Advise on intercompany/inter-entity transactions (Disaster Recovery Pty Ltd and Trust/CARSI)
- [ ] Advise on TPAR obligations
- [ ] Set up chart of accounts with appropriate tracking categories per entity
- [ ] Register for relevant tax obligations (GST, PAYG) for entities not yet registered
- [ ] Review R&D Tax Incentive eligibility
- [ ] Advise on NZ tax registration requirements and timing
- [ ] Establish transfer pricing policy if separate NZ entity
- [ ] Recommend financial year (standard or SAP)

---

*This document is prepared as a brief for professional advisers and does not constitute financial or tax advice. All tax positions should be confirmed with a qualified tax adviser.*
