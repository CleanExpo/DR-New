# BACKLOG-006: Legal & Compliance Review - Comprehensive Checklist

**Date:** 2026-02-04
**Status:** 🟡 IN PROGRESS - Requires Legal Counsel Review
**Priority:** P0 (Critical - Pre-Launch Requirement)
**Effort:** 8 hours legal review + remediation time
**Owner:** Legal Counsel + Engineering Team

---

## Executive Summary

This document provides a comprehensive legal compliance checklist for the DR-NRPG Platform covering Australian legal requirements, privacy regulations, contractual obligations, and risk mitigation strategies. The platform facilitates disaster recovery contractor matching and must comply with Australian Privacy Act, consumer protection laws, and industry standards.

**Platform Context:**
- **Type:** B2B2C SaaS Platform (Property Owners → Platform → Independent Contractors)
- **Jurisdiction:** Australia (all states/territories)
- **Business Model:** Contractor matching, not employer
- **Payment Processing:** Stripe (PCI-DSS compliant)
- **Data Storage:** Supabase (AWS Sydney region)
- **Current Status:** 98% complete, pre-launch legal review phase

**Critical Legal Position:**
- Platform is a **facilitator/marketplace** NOT an employer
- Contractors are **independent businesses** NOT employees
- Platform provides **matching services** NOT restoration services directly
- **Multi-tenant architecture** isolates workspace data

---

## 1. Australian Privacy Act Compliance

### 1.1 Australian Privacy Principles (APPs) Assessment

**Regulatory Framework:**
- Privacy Act 1988 (Cth)
- 13 Australian Privacy Principles (APPs)
- Notifiable Data Breaches (NDB) scheme
- Office of the Australian Information Commissioner (OAIC) oversight

#### APP 1: Open and Transparent Management of Personal Information

**Requirements:**
- [x] Privacy policy exists and is publicly accessible
- [ ] ⚠️ **MISSING:** Privacy policy must reference Australian Privacy Act explicitly
- [ ] ⚠️ **MISSING:** Privacy policy must include APP compliance statement
- [ ] ⚠️ **MISSING:** Privacy Officer contact details (currently generic email)
- [ ] ⚠️ **MISSING:** Privacy policy version number and change log
- [x] Privacy policy clearly describes information collection practices

**Action Items:**
1. Add explicit Australian Privacy Act 1988 compliance statement
2. Designate named Privacy Officer (not generic email)
3. Add APP compliance section referencing all 13 principles
4. Implement privacy policy versioning (currently shows dynamic date only)
5. Create privacy policy change notification system

#### APP 2: Anonymity and Pseudonymity

**Requirements:**
- [ ] ⚠️ **MISSING:** Option for anonymous browsing of public contractor directory
- [x] Account creation requires personal information (reasonable for service)
- [ ] ⚠️ **MISSING:** Clear statement about when anonymity is not practicable

**Action Items:**
1. Document why anonymity is impracticable for core services (contractor matching requires identity)
2. Ensure contractor directory browsing doesn't require login (currently implemented)
3. Add statement to privacy policy about anonymity limitations

#### APP 3: Collection of Solicited Personal Information

**Current Collection:**
- Name, email, phone (clients and contractors)
- Property address (clients)
- Damage details and photos (clients)
- License numbers, insurance details (contractors)
- ABN, business details (contractors)
- Payment information (via Stripe - PCI-compliant)

**Requirements:**
- [x] Collection is reasonably necessary for platform function
- [ ] ⚠️ **MISSING:** Explicit collection notice at registration
- [ ] ⚠️ **MISSING:** Purpose of collection statement at each data field
- [x] Privacy policy describes collection

**Action Items:**
1. Add collection notice to registration forms (modal or banner)
2. Add tooltip/help text to sensitive fields explaining why data is collected
3. Implement "Why we collect this" expandable sections on forms

#### APP 4: Dealing with Unsolicited Personal Information

**Scenarios:**
- User uploads photos containing faces of third parties
- Contractor provides references with contact details
- Email correspondence includes third-party information

**Requirements:**
- [ ] ⚠️ **MISSING:** Process for handling unsolicited personal information
- [ ] ⚠️ **MISSING:** Photo upload guidelines (faces, vehicle plates, etc.)
- [ ] ⚠️ **MISSING:** Reference collection consent process

**Action Items:**
1. Create photo upload guidelines warning about third-party privacy
2. Implement consent checkbox for contractor references
3. Document process for destroying unsolicited personal information

#### APP 5: Notification of Collection

**Requirements:**
- [x] Privacy policy available at registration
- [ ] ⚠️ **MISSING:** Explicit notification at point of collection
- [ ] ⚠️ **MISSING:** Statement about overseas disclosure (Stripe, Supabase, email service)
- [ ] ⚠️ **MISSING:** Right to complain to OAIC

**Current Gaps:**
- Privacy policy exists but not prominently displayed during registration
- No mention of data being processed by US-based services (Stripe, Resend)
- No information about OAIC complaint process

**Action Items:**
1. Add prominent privacy policy link to all registration forms
2. Create "International Data Transfers" section in privacy policy
3. List all third-party processors: Stripe (US), Resend (US), Supabase (AU), Vercel (US)
4. Add OAIC complaint process to privacy policy
5. Implement "I have read and accept the Privacy Policy" checkbox

#### APP 6: Use or Disclosure of Personal Information

**Current Uses:**
- Match clients with contractors based on service type, location
- Send email notifications about claims, bookings, payments
- Display contractor profiles publicly (business information only)
- Analytics and platform improvement

**Requirements:**
- [x] Use is reasonably necessary for platform function
- [ ] ⚠️ **MISSING:** Explicit consent for marketing communications
- [ ] ⚠️ **MISSING:** Opt-out mechanism for non-essential communications
- [x] Privacy policy describes uses

**Action Items:**
1. Add marketing consent checkbox (separate from service communications)
2. Implement email preference center (essential vs marketing vs newsletters)
3. Add unsubscribe link to all non-essential emails (already exists?)
4. Document what constitutes "essential" vs "marketing" communications

#### APP 7: Direct Marketing

**Current Marketing:**
- Platform is pre-launch, no marketing emails sent yet
- Email notifications are transactional (claim updates, contractor matches)

**Requirements:**
- [ ] ⚠️ **MISSING:** Opt-in consent for marketing communications
- [ ] ⚠️ **MISSING:** Unsubscribe mechanism in marketing emails
- [ ] ⚠️ **MISSING:** Clear distinction between transactional and marketing emails
- [ ] ⚠️ **MISSING:** Do Not Call Register compliance (if SMS marketing planned)

**Action Items:**
1. Implement separate marketing consent flag in User model
2. Create email preference management page
3. Add unsubscribe footer to all marketing emails
4. Document policy: no SMS marketing without explicit opt-in
5. Implement Do Not Call Register check if SMS marketing is enabled

#### APP 8: Cross-border Disclosure

**Current International Transfers:**
- **Stripe:** Payment processing (US-based, PCI-DSS Level 1)
- **Resend:** Email delivery service (US-based)
- **Vercel:** Hosting platform (global CDN, may include US servers)
- **Supabase:** Database (AWS Sydney region, but company US-based)

**Requirements:**
- [ ] ⚠️ **CRITICAL:** Privacy policy must disclose all overseas recipients
- [ ] ⚠️ **CRITICAL:** Must state that overseas recipients may not be subject to APPs
- [ ] ⚠️ **MISSING:** Assessment of whether overseas recipients have similar privacy protections
- [ ] ⚠️ **MISSING:** User consent to overseas transfers

**Action Items:**
1. **CRITICAL:** Add "International Data Transfers" section to privacy policy
2. List all overseas service providers with their locations
3. State that data may be processed in United States, Europe, other regions
4. Include statement: "Overseas recipients may not be subject to privacy obligations equivalent to APPs"
5. Add consent checkbox at registration: "I consent to my personal information being transferred to overseas service providers for platform operation"
6. Review Stripe, Resend, Vercel, Supabase DPAs (Data Processing Agreements)
7. Confirm all providers have adequate privacy protections (SOC 2, ISO 27001, etc.)

#### APP 9: Adoption, Use or Disclosure of Government-Related Identifiers

**Current Use:**
- **ABN (Australian Business Number):** Collected from contractors for verification
- **Driver's License:** May be used for contractor identity verification
- **Medicare Number:** NOT collected ✅

**Requirements:**
- [x] ABN collection is lawful and reasonably necessary
- [ ] ⚠️ **MISSING:** Clear purpose statement for ABN collection
- [ ] ⚠️ **MISSING:** Confirmation that ABN is not used as platform identifier
- [ ] ⚠️ **REVIEW:** Is driver's license collected? If yes, need justification

**Action Items:**
1. Confirm ABN is stored securely and not used as unique identifier (use UUID instead)
2. Add ABN purpose statement: "Required to verify contractor business legitimacy"
3. Review contractor onboarding: is driver's license collected? If yes, document justification
4. Ensure government identifiers are not displayed publicly

#### APP 10: Quality of Personal Information

**Requirements:**
- [ ] ⚠️ **MISSING:** Data accuracy verification procedures
- [ ] ⚠️ **MISSING:** Periodic data quality audits
- [ ] ⚠️ **MISSING:** User-facing data correction mechanism
- [x] Contractor verification includes manual review (quality check)

**Action Items:**
1. Implement "Update My Information" page for users and contractors
2. Create data accuracy verification checklist for admin verification dashboard
3. Document data retention policy (see APP 11)
4. Implement periodic data quality reminders (e.g., annual profile review)
5. Add "Is this information correct?" prompts in user dashboards

#### APP 11: Security of Personal Information

**Current Security Measures:**
- [x] HTTPS/TLS encryption (256-bit SSL)
- [x] Supabase RLS (Row-Level Security) policies
- [x] Multi-tenant data isolation
- [x] Bcrypt password hashing
- [x] JWT session management
- [x] Rate limiting on public APIs
- [ ] ⚠️ **MISSING:** Documented data breach response plan
- [ ] ⚠️ **MISSING:** Employee access controls documentation
- [ ] ⚠️ **MISSING:** Third-party security audits (pending BACKLOG-002)

**Requirements:**
- [x] Reasonable steps taken to protect personal information
- [ ] ⚠️ **CRITICAL:** Data breach response plan required (OAIC notification within 30 days)
- [ ] ⚠️ **MISSING:** Incident response procedures
- [ ] ⚠️ **MISSING:** Security awareness training for staff

**Action Items:**
1. **CRITICAL:** Create Notifiable Data Breaches (NDB) response plan
2. Document OAIC notification procedures (30-day window)
3. Create incident response playbook
4. Document employee/contractor access controls
5. Complete security penetration testing (BACKLOG-002)
6. Review Supabase security certifications (SOC 2, ISO 27001)
7. Implement security monitoring and alerting (BACKLOG-007)

#### APP 12: Access to Personal Information

**Current Implementation:**
- [x] Users can view their profile information
- [x] Contractors can view their business profile
- [ ] ⚠️ **MISSING:** Formal data access request process
- [ ] ⚠️ **MISSING:** Data export functionality (GDPR-style data portability)
- [ ] ⚠️ **MISSING:** Response timeframe policy (APPs require 30 days)

**Requirements:**
- [ ] ⚠️ **MISSING:** "Request My Data" functionality
- [ ] ⚠️ **MISSING:** Privacy policy must explain access request process
- [ ] ⚠️ **MISSING:** Free access to personal information (cannot charge fees)
- [ ] ⚠️ **MISSING:** 30-day response timeframe commitment

**Action Items:**
1. Create "Request My Data" form/page
2. Implement data export functionality (JSON/CSV download)
3. Add access request process to privacy policy
4. Document response timeframe: "We will respond within 30 days of receiving your request"
5. Create internal process for handling access requests
6. Add "Download My Data" button to user settings

#### APP 13: Correction of Personal Information

**Current Implementation:**
- [x] Users can edit profile information (name, email, phone)
- [x] Contractors can edit business profiles
- [ ] ⚠️ **MISSING:** Formal correction request process
- [ ] ⚠️ **MISSING:** Historical data correction tracking
- [ ] ⚠️ **MISSING:** Notification to third parties of corrections

**Requirements:**
- [x] Users can update most personal information directly
- [ ] ⚠️ **MISSING:** Process for correcting historical data (e.g., past claims)
- [ ] ⚠️ **MISSING:** If correction is refused, must provide reasons and complaint mechanism
- [ ] ⚠️ **MISSING:** Must notify affected third parties of corrections

**Action Items:**
1. Add "Request Data Correction" functionality for immutable fields
2. Document correction refusal reasons (e.g., legal retention requirements)
3. Create correction request log (audit trail)
4. Implement notification to contractors if client data is corrected
5. Add correction process to privacy policy

---

### 1.2 Notifiable Data Breaches (NDB) Scheme

**Regulatory Requirements:**
- Must notify OAIC of eligible data breaches within 30 days
- Must notify affected individuals
- Must keep records of data breaches and assessments

**Current Status:**
- [ ] ⚠️ **CRITICAL MISSING:** No documented data breach response plan
- [ ] ⚠️ **MISSING:** No OAIC notification template
- [ ] ⚠️ **MISSING:** No user notification template
- [ ] ⚠️ **MISSING:** No breach assessment criteria

**Action Items:**
1. **CRITICAL:** Create Data Breach Response Plan document
2. Define "eligible data breach" criteria (serious harm threshold)
3. Create OAIC notification template
4. Create user notification email template
5. Document 30-day notification timeline
6. Assign Data Breach Response Team roles
7. Create breach assessment flowchart
8. Implement breach detection monitoring (BACKLOG-007)

**Eligible Data Breach Definition:**
- Unauthorised access to, or disclosure of, personal information
- Loss of personal information in circumstances where unauthorised access/disclosure is likely
- Likely to result in serious harm to affected individuals

**Serious Harm Examples:**
- Identity theft
- Financial fraud
- Damage to reputation
- Physical harm
- Psychological harm
- Humiliation

---

## 2. Terms of Service Review

**File Reviewed:** `apps/web/app/terms/page.tsx` (287 lines)

### 2.1 Current Terms of Service Assessment

#### ✅ Sections Present:
1. **Service Agreement** - Platform as matching service, not restoration provider
2. **User Responsibilities** - Account security, accurate information
3. **Platform Policies & Limitations** - Independent contractor relationship
4. **Prohibited Activities** - Misuse, fraud, illegal activities
5. **Governing Law** - Australian law, Victoria jurisdiction
6. **Limitation of Liability** - Platform not liable for contractor work
7. **Contact Information** - nrpg.team@gmail.com

#### ⚠️ Critical Gaps Identified:

**MISSING: Contractor Independent Status Disclaimer**
- [ ] ⚠️ **CRITICAL:** Stronger language needed about contractor independence
- [ ] ⚠️ **MISSING:** Platform is NOT an employer, NOT responsible for contractor work
- [ ] ⚠️ **MISSING:** No employment relationship created
- [ ] ⚠️ **MISSING:** Contractors are independent businesses with own insurance

**MISSING: Australian Consumer Law (ACL) Compliance**
- [ ] ⚠️ **CRITICAL:** ACL guarantees cannot be excluded for consumers
- [ ] ⚠️ **MISSING:** Statement about ACL consumer rights
- [ ] ⚠️ **MISSING:** Fair Trading Act (state-level) considerations
- [ ] ⚠️ **MISSING:** Unfair contract terms provisions (small business protections)

**MISSING: Intellectual Property**
- [ ] ⚠️ **MISSING:** Platform IP ownership
- [ ] ⚠️ **MISSING:** User-generated content license grant
- [ ] ⚠️ **MISSING:** Photo/damage report IP rights
- [ ] ⚠️ **MISSING:** Contractor profile content ownership

**MISSING: Dispute Resolution**
- [ ] ⚠️ **MISSING:** Process for disputes between clients and contractors
- [ ] ⚠️ **MISSING:** Platform role in dispute mediation (if any)
- [ ] ⚠️ **MISSING:** Arbitration clause (optional but recommended)
- [ ] ⚠️ **MISSING:** Small claims court jurisdiction

**MISSING: Data Rights & Privacy**
- [ ] ⚠️ **MISSING:** Reference to Privacy Policy
- [ ] ⚠️ **MISSING:** Data retention upon account closure
- [ ] ⚠️ **MISSING:** User rights to data deletion

**MISSING: Payment Terms**
- [ ] ⚠️ **MISSING:** Stripe payment processing terms
- [ ] ⚠️ **MISSING:** Platform fees (if any)
- [ ] ⚠️ **MISSING:** Refund policy
- [ ] ⚠️ **MISSING:** Contractor payout terms
- [ ] ⚠️ **MISSING:** Disputed payment resolution

**MISSING: Termination & Suspension**
- [ ] ⚠️ **MISSING:** Grounds for account termination
- [ ] ⚠️ **MISSING:** Contractor suspension criteria
- [ ] ⚠️ **MISSING:** Notice period for termination
- [ ] ⚠️ **MISSING:** Data retention after termination

**MISSING: Insurance & Liability**
- [ ] ⚠️ **CRITICAL:** Contractor insurance requirements (public liability $10M+)
- [ ] ⚠️ **CRITICAL:** Platform insurance limitations
- [ ] ⚠️ **MISSING:** WorkCover requirements for contractors
- [ ] ⚠️ **MISSING:** Professional indemnity insurance

**MISSING: Modifications to Terms**
- [ ] ⚠️ **MISSING:** Process for updating Terms of Service
- [ ] ⚠️ **MISSING:** User notification of changes
- [ ] ⚠️ **MISSING:** Effective date of changes
- [ ] ⚠️ **MISSING:** Continued use constitutes acceptance

**MISSING: Force Majeure**
- [ ] ⚠️ **MISSING:** Acts of God, disasters, pandemic provisions
- [ ] ⚠️ **MISSING:** Platform unavailability due to unforeseen circumstances

**MISSING: Warranties & Representations**
- [ ] ⚠️ **MISSING:** Platform provided "as-is"
- [ ] ⚠️ **MISSING:** No warranty of uninterrupted service
- [ ] ⚠️ **MISSING:** No warranty of contractor work quality
- [ ] ⚠️ **MISSING:** Contractor verification limitations

### 2.2 Australian Consumer Law (ACL) Considerations

**Regulatory Framework:**
- Competition and Consumer Act 2010 (Cth) Schedule 2
- Consumer guarantees cannot be excluded or limited for consumers
- Unfair contract terms protections for small businesses

**Critical ACL Issues:**

#### Consumer Guarantees (Part 3-2 ACL)
- Services must be provided with due care and skill
- Services must be fit for purpose
- Services must be provided within reasonable time

**Platform Position:**
- [ ] ⚠️ **CRITICAL:** Platform provides matching service, NOT restoration services
- [ ] ⚠️ **CRITICAL:** ACL guarantees apply to platform matching service, NOT contractor work
- [ ] ⚠️ **REQUIRED:** Terms must clarify this distinction

**Action Items:**
1. Add ACL compliance section to Terms of Service
2. State: "Australian Consumer Law guarantees apply to our matching service"
3. Clarify: "ACL guarantees for restoration work apply between you and the contractor, not the platform"
4. Add: "Nothing in these terms excludes, restricts or modifies any consumer rights under ACL"
5. Include ACL contact details: ACCC (Australian Competition & Consumer Commission)

#### Unfair Contract Terms (Part 2-3 ACL)
- Applies to standard form consumer contracts
- Applies to standard form small business contracts (contractors)
- Terms that are unfair may be void

**Unfair Term Indicators:**
- Significantly imbalances parties' rights and obligations
- Not reasonably necessary to protect legitimate interests
- Would cause detriment to a party if relied upon

**Review Required:**
- [ ] ⚠️ **REVIEW:** Limitation of liability clauses - are they too broad?
- [ ] ⚠️ **REVIEW:** Unilateral termination rights - are they balanced?
- [ ] ⚠️ **REVIEW:** Automatic renewal clauses (if any)
- [ ] ⚠️ **REVIEW:** Penalty clauses for early termination

**Action Items:**
1. Legal counsel review of all Terms clauses for unfairness
2. Ensure limitation of liability allows ACL statutory guarantees
3. Provide reasonable termination rights to both parties
4. Remove or modify any penalty clauses
5. Add "Unfair Contract Terms" disclaimer

### 2.3 Terms of Service Action Items Summary

**CRITICAL - Must Fix Before Launch:**
1. Add Australian Consumer Law compliance section ⚠️
2. Strengthen contractor independent status disclaimer ⚠️
3. Add payment terms and Stripe integration clauses ⚠️
4. Add insurance and liability requirements for contractors ⚠️
5. Add dispute resolution process ⚠️
6. Reference Privacy Policy and data rights ⚠️

**HIGH PRIORITY - Should Fix Before Launch:**
7. Add intellectual property ownership clauses
8. Add termination and suspension procedures
9. Add modifications to terms process
10. Add warranties and representations disclaimers
11. Add force majeure clause

**MEDIUM PRIORITY - Can Fix Post-Launch:**
12. Add arbitration clause (optional)
13. Refine limitation of liability language
14. Add platform fee structure (if applicable in future)

---

## 3. Privacy Policy Review

**File Reviewed:** `apps/web/app/privacy/page.tsx` (255 lines)

### 3.1 Current Privacy Policy Assessment

#### ✅ Sections Present:
1. **Information We Collect** - Personal and technical information
2. **How We Use Your Information** - Service delivery, communication, security
3. **Information Sharing & Protection** - When shared, security measures
4. **Your Rights & Contact** - Access, correction, deletion, opt-out

#### ✅ Strengths:
- Clear, user-friendly language
- Good visual design (icons, colour-coded sections)
- Covers key collection and use cases
- Security measures listed (SSL, secure storage, audits, access controls)
- Privacy rights explained (access, correct, delete, opt-out)
- Contact details provided

#### ⚠️ Critical Gaps Identified:

**MISSING: Australian Privacy Act Compliance**
- [ ] ⚠️ **CRITICAL:** No mention of "Privacy Act 1988"
- [ ] ⚠️ **CRITICAL:** No mention of "Australian Privacy Principles (APPs)"
- [ ] ⚠️ **CRITICAL:** No mention of OAIC (Office of the Australian Information Commissioner)
- [ ] ⚠️ **MISSING:** APP compliance statement

**MISSING: International Data Transfers (APP 8)**
- [ ] ⚠️ **CRITICAL:** No disclosure that data is processed overseas (Stripe, Resend in US)
- [ ] ⚠️ **CRITICAL:** No list of overseas service providers
- [ ] ⚠️ **CRITICAL:** No statement that overseas recipients may not have APP protections
- [ ] ⚠️ **CRITICAL:** No user consent to international transfers

**MISSING: Notifiable Data Breaches**
- [ ] ⚠️ **CRITICAL:** No mention of data breach notification obligations
- [ ] ⚠️ **MISSING:** No statement about notifying users in event of breach
- [ ] ⚠️ **MISSING:** No timeframe for breach notification

**MISSING: Data Retention**
- [ ] ⚠️ **MISSING:** How long is personal information retained?
- [ ] ⚠️ **MISSING:** What happens to data when account is deleted?
- [ ] ⚠️ **MISSING:** Legal retention requirements (e.g., tax records)

**MISSING: Cookies & Tracking**
- [ ] ⚠️ **MISSING:** Cookie policy
- [ ] ⚠️ **MISSING:** Analytics tracking disclosure (Vercel Analytics?)
- [ ] ⚠️ **MISSING:** Third-party tracking technologies
- [ ] ⚠️ **MISSING:** How to disable cookies

**MISSING: Children's Privacy**
- [ ] ⚠️ **MISSING:** Age restrictions (platform likely 18+)
- [ ] ⚠️ **MISSING:** Statement that platform not intended for children
- [ ] ⚠️ **MISSING:** Process if child data is inadvertently collected

**MISSING: Marketing Communications**
- [ ] ⚠️ **MISSING:** Opt-in consent mechanism
- [ ] ⚠️ **MISSING:** Distinction between transactional and marketing emails
- [ ] ⚠️ **MISSING:** Unsubscribe process details
- [ ] ⚠️ **MISSING:** Do Not Call Register compliance (if SMS planned)

**MISSING: Third-Party Services**
- [ ] ⚠️ **MISSING:** Complete list of third-party processors
  - Stripe (payment processing, US)
  - Resend (email delivery, US)
  - Vercel (hosting, global CDN)
  - Supabase (database, AWS Sydney)
  - Google Gemini AI (damage assessment, US)
- [ ] ⚠️ **MISSING:** Links to third-party privacy policies

**MISSING: Complaint Process**
- [ ] ⚠️ **CRITICAL:** No mention of right to complain to OAIC
- [ ] ⚠️ **MISSING:** OAIC contact details
- [ ] ⚠️ **MISSING:** Internal complaint handling process

**MISSING: Policy Updates**
- [ ] ⚠️ **MISSING:** How users will be notified of privacy policy changes
- [ ] ⚠️ **MISSING:** Effective date of changes
- [ ] ⚠️ **MISSING:** Version number/change log

**MISSING: Specific Collection Scenarios**
- [ ] ⚠️ **MISSING:** Photo uploads containing third-party faces/data
- [ ] ⚠️ **MISSING:** Contractor references with contact details
- [ ] ⚠️ **MISSING:** Insurance information handling
- [ ] ⚠️ **MISSING:** ABN and government identifier handling

### 3.2 Privacy Policy Action Items Summary

**CRITICAL - Must Add Before Launch:**
1. Add Australian Privacy Act 1988 compliance statement ⚠️
2. Add APP compliance declaration ⚠️
3. Add international data transfers section (APP 8) ⚠️
4. List all overseas service providers (Stripe, Resend, Vercel) ⚠️
5. Add data breach notification policy ⚠️
6. Add OAIC complaint process and contact details ⚠️
7. Add data retention policy ⚠️

**HIGH PRIORITY - Should Add Before Launch:**
8. Add cookie and tracking technology policy
9. Add third-party service providers list with links to their policies
10. Add marketing communications opt-in/out process
11. Add policy update notification process
12. Add children's privacy statement (platform 18+ only)

**MEDIUM PRIORITY - Can Add Post-Launch:**
13. Add detailed collection scenarios (photos, references)
14. Add government identifier handling specifics
15. Expand security measures section with certifications

---

## 4. Contractor Agreement Requirements

**Current Status:** ❌ No contractor agreement template exists in codebase

### 4.1 Required Contractor Agreement Sections

A comprehensive independent contractor agreement is **CRITICAL** to establish the legal relationship between platform and contractors. This protects the platform from employment-related liabilities.

#### ⚠️ CRITICAL SECTIONS NEEDED:

**1. Independent Contractor Status**
- Contractor is independent business, NOT employee
- No employment relationship created
- Contractor responsible for own taxes (ABN required)
- Contractor provides own equipment and tools
- Contractor controls how services are performed
- No entitlement to employee benefits (leave, super, WorkCover)

**2. Platform Services**
- Platform provides matching/referral services only
- Platform does NOT provide restoration services
- Platform does NOT employ contractors
- Platform does NOT control contractor work methods
- Platform does NOT guarantee work volume

**3. Contractor Obligations**
- Maintain current licenses and registrations
- Maintain adequate insurance:
  - Public Liability: Minimum $10 million
  - Professional Indemnity: Minimum $5 million (if applicable)
  - WorkCover: As required by state law
- Maintain IICRC certifications (for specialty work)
- Respond to matched claims within agreed timeframe
- Provide quality restoration services
- Comply with all applicable laws and regulations
- Indemnify platform for contractor's work

**4. Verification & Compliance**
- Right to verify licenses, insurance, certifications
- Contractor must provide updated documents on request
- Platform may suspend or terminate for non-compliance
- Annual verification renewal required
- Contractor must notify platform of license/insurance changes

**5. Client Relationships**
- Contractor is solely responsible for client work
- Contractor sets own pricing and terms with clients
- Contractor handles all client disputes
- Platform is NOT party to contractor-client agreement
- Contractor must not misrepresent platform role

**6. Fees & Payments**
- Platform fee structure (if applicable)
- Payment processing via Stripe
- Contractor responsible for own invoicing
- Contractor responsible for own tax obligations
- No guaranteed minimum earnings

**7. Intellectual Property**
- Platform owns platform IP (software, branding, etc.)
- Contractor retains ownership of own business materials
- Contractor grants license to use profile photos, business info
- Platform may use anonymised data for analytics

**8. Data & Privacy**
- Contractor must comply with Privacy Act
- Contractor receives only necessary client information
- Contractor must secure client data
- Contractor must delete client data upon completion (or as legally required)
- Data breach notification obligations

**9. Non-Exclusivity**
- Contractor free to work for other platforms/clients
- Contractor free to reject matched claims
- No exclusivity or non-compete obligations
- Contractor controls own schedule and availability

**10. Termination**
- Either party may terminate with 30 days notice
- Immediate termination for breach (fraud, misconduct, license loss)
- Contractor must complete in-progress work or arrange handover
- Data handling upon termination
- Outstanding payment obligations

**11. Limitation of Liability**
- Platform NOT liable for contractor work quality
- Platform NOT liable for contractor negligence
- Contractor indemnifies platform for claims arising from contractor work
- Maximum liability of platform limited to fees paid (if applicable)

**12. Dispute Resolution**
- Internal resolution process
- Mediation before litigation
- Governing law: Australian law, Victoria jurisdiction
- Small claims court for disputes under threshold

**13. Compliance & Representations**
- Contractor warrants holding valid licenses
- Contractor warrants adequate insurance
- Contractor warrants compliance with all laws
- Contractor warrants no criminal history relevant to trade
- False representations constitute grounds for termination

**14. Insurance Requirements Detail**
- Public Liability: $10,000,000 minimum coverage
- Professional Indemnity: $5,000,000 minimum (for consulting/design work)
- WorkCover/Workers Compensation: As required by state law for employees
- Cyber Insurance: Recommended for data handling
- Annual renewal and proof of coverage required
- Platform must be named as interested party (not additional insured)

**15. Amendments**
- Platform may amend agreement with 30 days notice
- Continued use after amendment constitutes acceptance
- Material changes require explicit consent

### 4.2 Contractor Agreement Action Items

**CRITICAL - Must Create Before Launch:**
1. **ENGAGE LEGAL COUNSEL** to draft independent contractor agreement ⚠️
2. Ensure agreement protects platform from employment liability ⚠️
3. Ensure agreement complies with Fair Work Act (independent contractor provisions) ⚠️
4. Include all 15 sections listed above ⚠️
5. Have agreement reviewed by employment law specialist ⚠️

**HIGH PRIORITY:**
6. Create contractor onboarding flow requiring agreement acceptance
7. Implement electronic signature capture (e.g., DocuSign, HelloSign)
8. Store signed agreements securely in Supabase
9. Create agreement renewal reminder system (annual)
10. Create agreement version control system

**Database Schema Updates Required:**
```sql
-- Add to Contractor model
agreementSignedAt DateTime?
agreementVersion String?
agreementDocumentUrl String? -- S3 URL to signed PDF
agreementIpAddress String? -- IP address at time of signing
agreementAcceptedTerms Boolean @default(false)
```

### 4.3 Fair Work Act Considerations

**Regulatory Risk:**
- Fair Work Act 2009 protects employees, not independent contractors
- Misclassification of employees as contractors = serious legal liability
- Contractors can apply to Fair Work Commission if they believe they're employees

**Factors Determining Employee vs Contractor:**
1. **Control:** How much control does platform have? (Low control = contractor)
2. **Integration:** Is contractor integrated into business? (No = contractor)
3. **Remuneration:** Paid per job or retainer? (Per job = contractor)
4. **Equipment:** Who provides tools? (Contractor provides own = contractor)
5. **Financial Risk:** Who bears financial risk? (Contractor = contractor)
6. **Delegation:** Can contractor delegate work? (Yes = contractor)

**Platform Position - Must Maintain:**
- ✅ Platform does NOT control how contractors perform work
- ✅ Platform does NOT require contractors to work specific hours
- ✅ Platform does NOT provide tools or equipment
- ✅ Contractors bear their own business risk
- ✅ Contractors can refuse work
- ✅ Contractors can work for multiple platforms/clients
- ✅ Contractors are paid per job, not hourly/salary
- ✅ Contractors provide own ABN and handle own taxes

---

## 5. Client Consent Forms & Agreements

### 5.1 Client Terms of Service

**Current Status:** Client terms are covered in general Terms of Service page

**Required Client-Specific Clauses:**
- [ ] ⚠️ **MISSING:** Platform is matching service, not restoration provider
- [ ] ⚠️ **MISSING:** Client contracts directly with contractor, not platform
- [ ] ⚠️ **MISSING:** Platform NOT liable for contractor work quality
- [ ] ⚠️ **MISSING:** Client responsible for verifying contractor credentials
- [ ] ⚠️ **MISSING:** Payment terms (Stripe processing)
- [ ] ⚠️ **MISSING:** Dispute resolution between client and contractor
- [ ] ⚠️ **MISSING:** Insurance claim assistance (informational only)

### 5.2 Consent Forms Required

#### Consent for Contractor Matching
- [ ] ⚠️ **MISSING:** Explicit consent to share claim details with contractors
- [ ] ⚠️ **MISSING:** Consent to share property address and photos
- [ ] ⚠️ **MISSING:** Consent to contractor contacting client directly
- [ ] ⚠️ **MISSING:** Opt-in to receive contractor match notifications

**Action Items:**
1. Add consent checkbox at claim submission: "I consent to sharing my claim details with verified contractors for matching purposes"
2. Add consent for photo sharing: "I consent to sharing uploaded photos with matched contractors"
3. Add consent for contact: "I consent to contractors contacting me directly via phone/email"

#### Consent for Communications
- [ ] ⚠️ **MISSING:** Separate consent for marketing vs transactional emails
- [ ] ⚠️ **MISSING:** Consent for SMS notifications (if implemented)
- [ ] ⚠️ **MISSING:** Email preference management

**Action Items:**
1. Add "Communication Preferences" page to client dashboard
2. Separate checkboxes: Claim updates (required), Marketing emails (optional), SMS (optional)
3. Implement unsubscribe links in marketing emails

#### Consent for Data Collection
- [ ] ⚠️ **MISSING:** Explicit consent at registration to collect personal information
- [ ] ⚠️ **MISSING:** Consent to Privacy Policy (checkbox)
- [ ] ⚠️ **MISSING:** Consent to international data transfers

**Action Items:**
1. Add registration checkbox: "I have read and accept the Privacy Policy"
2. Add registration checkbox: "I consent to my information being processed by overseas service providers (Stripe, email delivery) as described in the Privacy Policy"
3. Make privacy consent mandatory for account creation

#### Consent for Reviews
- [ ] ⚠️ **MISSING:** Consent to publish review publicly
- [ ] ⚠️ **MISSING:** Option to display name or remain anonymous
- [ ] ⚠️ **MISSING:** Right to edit or delete review

**Action Items:**
1. Add review submission checkbox: "I consent to publishing this review publicly"
2. Add review option: "Display my name" vs "Anonymous"
3. Implement review edit/delete functionality (already exists?)

---

## 6. Data Retention Policy

**Current Status:** ❌ No documented data retention policy exists

### 6.1 Regulatory Requirements

**Australian Privacy Principles:**
- APP 11: Must destroy or de-identify personal information when no longer needed
- Must balance retention with legitimate business purposes
- Must comply with other legal retention requirements (tax, employment, etc.)

**Australian Tax Office (ATO) Requirements:**
- Business records must be retained for **5 years** after they were prepared, obtained, or transaction completed
- Includes: invoices, receipts, payment records, contractor agreements

**Fair Work Act Requirements:**
- Employment records must be retained for **7 years** (if contractor relationship disputed)

**General Retention Principles:**
- Retain data only as long as necessary for legitimate purpose
- Delete or anonymise data when no longer needed
- Balance legal obligations with privacy principles
- Document retention periods and rationale

### 6.2 Proposed Data Retention Policy

#### Active Accounts

**Client Accounts:**
- Personal information: Retained while account active
- Claim history: Retained while account active + 7 years (dispute resolution)
- Payment records: Retained for 5 years (ATO compliance)
- Communications: Retained for 2 years (support purposes)
- Photos/damage reports: Retained for 7 years (insurance/legal purposes)

**Contractor Accounts:**
- Business information: Retained while account active
- License/insurance records: Retained while account active + 7 years (Fair Work protection)
- Completed job history: Retained for 7 years (dispute resolution)
- Payment records: Retained for 5 years (ATO compliance)
- Verification documents: Retained for 7 years
- Reviews received: Retained indefinitely (anonymised after account closure)

#### Closed/Deleted Accounts

**Client Account Deletion:**
- Immediate deletion: Login credentials, session tokens, device info
- 90-day retention: Personal contact information (grace period for reactivation)
- 7-year retention: Claim records, payment history (legal compliance)
- Anonymisation: Reviews (remove identifying information, keep content)
- Permanent retention: Aggregated analytics data (anonymised)

**Contractor Account Deletion:**
- Immediate deletion: Login credentials, session tokens, device info
- 90-day retention: Business contact information (grace period for reactivation)
- 7-year retention: Job records, agreements, verification docs (Fair Work/insurance protection)
- Anonymisation: Profile information (keep business name, remove contact details)
- Permanent retention: Reviews (anonymised), completed job count (platform stats)

#### Specific Data Types

**Financial Data:**
- Stripe payment records: 7 years (Stripe retains indefinitely, platform retains references)
- Invoices: 5 years (ATO requirement)
- Refund records: 7 years (dispute protection)
- Fee/commission records: 7 years (tax compliance)

**Legal Documents:**
- Contractor agreements: 7 years after termination
- Terms of Service acceptance: 7 years after account closure
- Privacy Policy consent: 7 years after account closure
- Dispute records: 7 years after resolution

**Communications:**
- Email notifications: 2 years (support reference)
- Support tickets: 5 years (quality improvement)
- SMS messages: 1 year (cost optimisation)
- In-app messages: 2 years

**Technical Data:**
- Access logs: 1 year (security monitoring)
- Error logs: 6 months (debugging)
- Audit trails: 7 years (compliance)
- Backup data: 7 days (Supabase retention policy)

**Marketing Data:**
- Email marketing consent: Until withdrawn + 1 year (proof of consent)
- Unsubscribe requests: Permanent (Do Not Contact list)
- Marketing analytics: Anonymised, permanent

#### Automatic Deletion Processes

**Action Items:**
1. Implement automated data retention job (cron/scheduled task)
2. Run monthly retention audit:
   - Identify accounts closed > 90 days → Delete personal info
   - Identify data > retention period → Delete or anonymise
   - Generate retention audit log
3. Create data retention dashboard (admin)
4. Document retention policy in Privacy Policy
5. Implement user-requested deletion workflow:
   - User requests deletion
   - Admin reviews (check for outstanding claims/disputes)
   - Approve/reject with reason
   - Automated deletion job executes
   - Confirmation email sent

### 6.3 Data Retention Action Items

**CRITICAL - Must Document Before Launch:**
1. Create formal Data Retention Policy document ⚠️
2. Add data retention section to Privacy Policy ⚠️
3. Define retention periods for all data types ⚠️
4. Document legal justifications for retention periods ⚠️

**HIGH PRIORITY - Should Implement Before Launch:**
5. Implement automated data deletion jobs
6. Create data retention audit log
7. Create "Request Account Deletion" functionality
8. Create "Data Retention Dashboard" for admin
9. Test account deletion workflow end-to-end

**MEDIUM PRIORITY - Can Implement Post-Launch:**
10. Implement data anonymisation algorithms
11. Create retention policy review schedule (annual)
12. Implement data archival system for long-term retention
13. Create data restoration process (for legally required data)

---

## 7. Additional Legal Considerations

### 7.1 Australian Building Codes & Licensing

**Regulatory Landscape:**
- Building work licensing varies by state/territory
- Contractors must hold appropriate licenses for work performed
- Platform must verify contractor licenses are current and valid

**State-Specific Requirements:**

| State | Regulatory Body | License Types |
|-------|----------------|---------------|
| NSW | NSW Fair Trading | Contractor License, Supervisor Certificate |
| VIC | VBA (Victorian Building Authority) | Building Practitioner Registration |
| QLD | QBCC (Queensland Building & Construction Commission) | Contractor License |
| WA | Building Services Board | Building Service Contractor License |
| SA | CBS (Consumer and Business Services) | Building Work Contractor License |
| TAS | Consumer Building and Occupational Services | Builder License |
| ACT | Access Canberra | Builder License |
| NT | NT Building Practitioners Board | Builder License |

**Platform Obligations:**
- [ ] ⚠️ **MISSING:** Verify contractor holds appropriate license for their state
- [ ] ⚠️ **MISSING:** Verify license covers types of work offered (water, fire, mould, etc.)
- [ ] ⚠️ **MISSING:** Verify license is current (not expired)
- [ ] ⚠️ **MISSING:** Re-verify licenses annually

**Action Items:**
1. Document license verification process in contractor onboarding
2. Implement license expiry monitoring and reminders
3. Create license type validation (does license cover claimed specialties?)
4. Add license verification to admin dashboard
5. Consider API integration with state licensing bodies (future enhancement)

### 7.2 Insurance Requirements

**Public Liability Insurance:**
- **Requirement:** $10,000,000 minimum coverage
- **Purpose:** Covers damage to client property or third-party injury
- **Verification:** Certificate of Currency (COC) required annually
- **Platform must:** Verify coverage, expiry date, coverage amount

**Professional Indemnity Insurance:**
- **Requirement:** $5,000,000 minimum (for design/consulting work)
- **Purpose:** Covers negligent advice or professional errors
- **When Required:** If contractor provides assessments, recommendations, project management
- **Verification:** COC required annually

**WorkCover / Workers Compensation:**
- **Requirement:** Mandatory if contractor has employees
- **Varies by State:** Different requirements in each state
- **Platform Obligation:** Verify contractors with employees have WorkCover
- **Exemption:** Sole traders without employees may be exempt

**Action Items:**
1. Implement insurance document upload in contractor onboarding
2. Verify insurance documents manually (admin dashboard)
3. Implement insurance expiry monitoring (90 days, 30 days, expired alerts)
4. Create "Insurance Documents" section in contractor profile (admin view only)
5. Consider third-party insurance verification service integration

### 7.3 Workplace Health & Safety (WH&S)

**Regulatory Framework:**
- Work Health and Safety Act 2011 (Cth)
- State/territory WHS legislation (harmonised)
- Contractors are responsible for own WH&S compliance

**Platform Position:**
- Platform is NOT responsible for contractor WH&S practices
- Platform does NOT control contractor work methods
- Contractors must comply with WHS laws independently

**Recommended Disclaimers:**
- [ ] ⚠️ **MISSING:** Terms of Service disclaimer about WH&S responsibility
- [ ] ⚠️ **MISSING:** Contractor agreement clause requiring WHS compliance
- [ ] ⚠️ **MISSING:** Client disclaimer that platform doesn't supervise contractor safety

**Action Items:**
1. Add WH&S responsibility clause to contractor agreement
2. Add WH&S disclaimer to Terms of Service
3. Consider adding WH&S certification to contractor verification (optional)

### 7.4 Anti-Discrimination & Fair Work

**Regulatory Framework:**
- Fair Work Act 2009 (Cth)
- Sex Discrimination Act 1984 (Cth)
- Disability Discrimination Act 1992 (Cth)
- Racial Discrimination Act 1975 (Cth)
- Age Discrimination Act 2004 (Cth)

**Platform Obligations:**
- Must not discriminate in contractor selection or matching
- Matching algorithm must be non-discriminatory
- Must not allow discriminatory contractor behaviour

**Current Matching Algorithm:**
- Based on: Service type, location, rating, IICRC certifications, availability
- **Does NOT consider:** Gender, age, race, disability, religion

**Action Items:**
1. Document non-discriminatory matching algorithm
2. Add anti-discrimination clause to Terms of Service
3. Add anti-discrimination clause to contractor agreement
4. Implement contractor misconduct reporting (if client experiences discrimination)
5. Create discrimination complaint handling procedure

### 7.5 Spam & Electronic Communications

**Regulatory Framework:**
- Spam Act 2003 (Cth)
- Do Not Call Register Act 2006 (Cth)

**Email Requirements (Spam Act):**
- Consent required before sending commercial electronic messages
- Unsubscribe mechanism required
- Accurate sender information required

**SMS Requirements (Do Not Call Register):**
- Consent required before sending SMS
- Must check Do Not Call Register (if telemarketing)
- Unsubscribe mechanism required

**Platform Email Types:**
1. **Transactional (Not Spam):** Claim notifications, contractor matches, booking confirmations
2. **Marketing (Is Spam):** Newsletters, promotions, feature announcements
   - Requires opt-in consent
   - Must include unsubscribe link
   - Must honour unsubscribe within 5 business days

**Current Status:**
- [x] Transactional emails are compliant (no consent required)
- [ ] ⚠️ **MISSING:** Marketing email opt-in mechanism
- [ ] ⚠️ **MISSING:** Unsubscribe functionality for marketing emails
- [ ] ⚠️ **MISSING:** Do Not Call Register check for SMS (if SMS marketing planned)

**Action Items:**
1. Implement marketing consent flag in User/Contractor models
2. Add "Subscribe to newsletter" checkbox at registration (opt-in, not pre-checked)
3. Implement unsubscribe link in all marketing emails
4. Create email preference center page
5. Honour unsubscribe requests within 5 business days
6. If SMS marketing planned: integrate Do Not Call Register check API

---

## 8. Risk Assessment & Mitigation

### 8.1 Legal Risks Identified

**CRITICAL RISKS (Must Address Before Launch):**

1. **Employment Misclassification Risk** 🔴
   - **Risk:** Contractors claim they are employees, not independent contractors
   - **Impact:** Massive liability for unpaid super, leave, WorkCover, unfair dismissal claims
   - **Likelihood:** MEDIUM (common in gig economy platforms)
   - **Mitigation:**
     - ✅ Draft comprehensive independent contractor agreement (legal counsel)
     - ✅ Ensure platform does NOT control contractor work methods
     - ✅ Document contractor independence (ABN, own tools, financial risk, can refuse work)
     - ✅ Regular review of contractor relationship by employment lawyer

2. **Privacy Act Non-Compliance Risk** 🔴
   - **Risk:** OAIC investigation and penalties for APP breaches
   - **Impact:** Fines up to $2.5 million (corporate), reputational damage, forced changes
   - **Likelihood:** HIGH (current policy missing critical APP disclosures)
   - **Mitigation:**
     - ✅ Update Privacy Policy with APP compliance (Action Items in Section 1)
     - ✅ Implement international data transfer disclosures
     - ✅ Create data breach response plan
     - ✅ Implement data retention policy
     - ✅ Add OAIC complaint process

3. **Contractor Liability Risk** 🔴
   - **Risk:** Client sues platform for poor contractor work
   - **Impact:** Legal costs, potential damages, reputational harm
   - **Likelihood:** HIGH (inevitable in marketplace model)
   - **Mitigation:**
     - ✅ Strengthen Terms of Service disclaimers (platform is matching service only)
     - ✅ Contractor agreement indemnification clause (contractor indemnifies platform)
     - ✅ Verify contractor insurance ($10M public liability)
     - ✅ Consider platform liability insurance (Professional Indemnity)
     - ✅ Implement robust dispute resolution process

4. **Australian Consumer Law Risk** 🔴
   - **Risk:** Terms of Service violate ACL (unfair terms, misleading conduct)
   - **Impact:** Terms void, ACCC enforcement action, penalties
   - **Likelihood:** MEDIUM (standard form contracts often challenged)
   - **Mitigation:**
     - ✅ Legal counsel review of Terms for ACL compliance
     - ✅ Add ACL consumer guarantees disclaimer
     - ✅ Clarify ACL applies to platform matching service, not contractor work
     - ✅ Remove any potentially unfair terms (overly broad liability exclusions)

**HIGH RISKS (Should Address Before Launch):**

5. **Data Breach Risk** 🟠
   - **Risk:** Unauthorised access to personal information (client addresses, contractor licenses)
   - **Impact:** NDB notification required, OAIC investigation, reputational damage
   - **Likelihood:** MEDIUM (all platforms face cyber threats)
   - **Mitigation:**
     - ✅ Complete security penetration testing (BACKLOG-002)
     - ✅ Implement monitoring and alerting (BACKLOG-007)
     - ✅ Create data breach response plan
     - ✅ Implement security best practices (already strong: RLS, TLS, rate limiting)
     - ✅ Consider cyber liability insurance

6. **License/Insurance Verification Failure Risk** 🟠
   - **Risk:** Contractor with expired license/insurance causes damage
   - **Impact:** Platform reputation damaged, potential liability, regulatory scrutiny
   - **Likelihood:** MEDIUM (manual verification process)
   - **Mitigation:**
     - ✅ Implement automated license expiry monitoring
     - ✅ Annual re-verification requirement
     - ✅ Suspend contractors with expired licenses/insurance
     - ✅ Implement verification audit trail
     - ✅ Consider third-party verification service

7. **Intellectual Property Infringement Risk** 🟠
   - **Risk:** Users upload copyrighted photos, contractors use platform content
   - **Impact:** Copyright infringement claims, DMCA takedown notices
   - **Likelihood:** LOW-MEDIUM
   - **Mitigation:**
     - ✅ Add IP ownership clauses to Terms of Service
     - ✅ Implement DMCA compliance process
     - ✅ Add photo upload guidelines (own photos only)
     - ✅ Contractor agreement grants license to use profile content

**MEDIUM RISKS (Can Address Post-Launch):**

8. **Dispute Resolution Failure Risk** 🟡
   - **Risk:** Client-contractor disputes escalate, platform drawn in
   - **Impact:** Legal costs, time-consuming, reputational harm
   - **Likelihood:** MEDIUM (disputes common in construction industry)
   - **Mitigation:**
     - ✅ Implement clear dispute resolution process in Terms
     - ✅ Platform remains neutral, not liable for contractor work
     - ✅ Consider internal mediation service (future feature)
     - ✅ Document all communications (audit trail)

9. **State-Specific Licensing Variation Risk** 🟡
   - **Risk:** Contractors licensed in one state work in another without appropriate license
   - **Impact:** Regulatory enforcement, contractor suspended
   - **Likelihood:** MEDIUM
   - **Mitigation:**
     - ✅ Verify contractor service areas match license jurisdictions
     - ✅ Warn contractors about interstate licensing requirements
     - ✅ Implement geographic matching limits based on license

### 8.2 Insurance Recommendations

**Platform Insurance:**

1. **Professional Indemnity Insurance**
   - **Coverage:** $5-10 million
   - **Purpose:** Protects platform for negligent advice, errors in matching algorithm, professional services
   - **Priority:** HIGH - Recommended before launch
   - **Estimated Cost:** $3,000-5,000/year

2. **Cyber Liability Insurance**
   - **Coverage:** $2-5 million
   - **Purpose:** Data breaches, cyber attacks, privacy violations, notification costs
   - **Priority:** HIGH - Recommended before launch
   - **Estimated Cost:** $2,000-4,000/year

3. **General Liability Insurance**
   - **Coverage:** $10 million
   - **Purpose:** General business liability, third-party property damage, bodily injury
   - **Priority:** MEDIUM - Consider within first year
   - **Estimated Cost:** $1,500-3,000/year

4. **Directors & Officers (D&O) Insurance**
   - **Coverage:** $5 million
   - **Purpose:** Protects directors/officers from personal liability for business decisions
   - **Priority:** LOW - Consider after Series A funding or board expansion
   - **Estimated Cost:** $5,000-10,000/year

**Total Estimated Insurance Cost:** $6,500-12,000/year (Professional Indemnity + Cyber)

---

## 9. Legal Counsel Engagement Checklist

### 9.1 Documents for Legal Review

**CRITICAL - Must Engage Legal Counsel For:**

1. **Independent Contractor Agreement** ⚠️
   - Employment law specialist required
   - Review contractor independence provisions
   - Review Fair Work Act compliance
   - Review indemnification clauses
   - Review termination provisions

2. **Terms of Service** ⚠️
   - Commercial law specialist required
   - Review Australian Consumer Law compliance
   - Review limitation of liability clauses
   - Review unfair contract terms
   - Review dispute resolution clauses

3. **Privacy Policy** ⚠️
   - Privacy law specialist required
   - Review Australian Privacy Act compliance
   - Review APP compliance
   - Review international data transfer disclosures
   - Review data breach notification procedures

4. **Contractor Verification Procedures** ⚠️
   - Review license verification process
   - Review insurance verification requirements
   - Review annual re-verification procedures
   - Review liability for verification failures

5. **Dispute Resolution Procedures** ⚠️
   - Review platform's role in client-contractor disputes
   - Review mediation/arbitration clauses
   - Review liability limitations

### 9.2 Legal Counsel Budget Estimate

**Initial Legal Review (Pre-Launch):**
- Contractor agreement drafting: $3,000-5,000
- Terms of Service review: $2,000-3,000
- Privacy Policy review: $2,000-3,000
- General compliance advice: $1,000-2,000
- **Total:** $8,000-13,000

**Ongoing Legal Costs (Annual):**
- Contract updates and reviews: $2,000-3,000
- Compliance monitoring: $1,000-2,000
- Dispute assistance: $1,000-3,000 (varies)
- **Total:** $4,000-8,000/year

### 9.3 Legal Counsel Selection Criteria

**Required Expertise:**
- Australian Privacy Act and APPs
- Australian Consumer Law
- Fair Work Act (independent contractor law)
- Technology/SaaS platform experience
- Multi-sided marketplace experience (preferred)
- Building/construction industry experience (preferred)

**Recommended Firms (Melbourne):**
- **Corporate Law:** Clayton Utz, MinterEllison, Herbert Smith Freehills
- **Tech Startups:** Lander & Rogers, K&L Gates, Gadens
- **Privacy Specialists:** HWL Ebsworth, Hall & Wilcox
- **Employment Law:** Workplace Law, FCB Workplace Law

---

## 10. Implementation Timeline

### Phase 1: Critical Legal Documents (Week 1)
**Estimated Effort:** 40 hours + legal counsel time

**Day 1-2: Privacy Policy Updates**
- Add Australian Privacy Act compliance statement
- Add APP compliance section
- Add international data transfers disclosure
- Add data breach notification policy
- Add OAIC complaint process
- Add data retention policy summary
- **Owner:** Engineering + Legal Counsel
- **Deliverable:** Updated Privacy Policy v2.0

**Day 3-4: Terms of Service Updates**
- Add Australian Consumer Law compliance
- Strengthen contractor independent status disclaimer
- Add payment terms (Stripe)
- Add insurance requirements
- Add dispute resolution process
- Add IP ownership clauses
- Add termination procedures
- **Owner:** Legal Counsel (lead) + Engineering
- **Deliverable:** Updated Terms of Service v2.0

**Day 5: Contractor Agreement Drafting**
- Engage employment law specialist
- Draft independent contractor agreement (15 sections)
- Review Fair Work Act compliance
- **Owner:** Legal Counsel (lead)
- **Deliverable:** Contractor Agreement v1.0 (draft)

### Phase 2: Technical Implementation (Week 2)
**Estimated Effort:** 32 hours engineering

**Day 1: Consent Mechanisms**
- Add Privacy Policy consent checkbox to registration
- Add international data transfer consent
- Add contractor matching consent to claim submission
- Add marketing consent checkbox (opt-in)
- **Owner:** Engineering
- **Deliverable:** Updated registration and claim flows

**Day 2: Contractor Agreement Integration**
- Create contractor agreement acceptance flow
- Implement electronic signature capture
- Store signed agreements in Supabase
- Add agreement version tracking
- **Owner:** Engineering
- **Deliverable:** Contractor onboarding with agreement

**Day 3: Data Access & Deletion**
- Implement "Request My Data" functionality
- Implement data export (JSON/CSV)
- Implement "Request Account Deletion" workflow
- Add data retention audit job (scheduled task)
- **Owner:** Engineering
- **Deliverable:** Data rights functionality

**Day 4: Email Preferences & Compliance**
- Implement email preference center
- Add unsubscribe functionality to marketing emails
- Separate transactional vs marketing email flags
- Implement Spam Act compliance
- **Owner:** Engineering
- **Deliverable:** Email compliance features

### Phase 3: Testing & Documentation (Week 3)
**Estimated Effort:** 16 hours

**Day 1: Legal Document Testing**
- Test privacy policy displays correctly
- Test terms of service displays correctly
- Test contractor agreement acceptance flow
- Test consent checkboxes work
- **Owner:** QA Team
- **Deliverable:** Test report

**Day 2: Data Rights Testing**
- Test data export functionality
- Test account deletion workflow
- Test data retention audit job
- Test email unsubscribe
- **Owner:** QA Team
- **Deliverable:** Test report

**Day 3: Documentation**
- Create legal compliance documentation for team
- Create contractor verification procedures manual
- Create data breach response plan
- Create OAIC notification templates
- **Owner:** Legal Counsel + PM
- **Deliverable:** Legal compliance manual

**Day 4: Launch Readiness**
- Final legal counsel review
- Sign-off on all legal documents
- Deploy updated privacy policy and terms
- Update BACKLOG.md
- **Owner:** Legal Counsel + Engineering + PM
- **Deliverable:** Launch approval

### Phase 4: Post-Launch (Ongoing)
**Estimated Effort:** 4 hours/month

**Monthly Tasks:**
- Data retention audit
- License/insurance expiry monitoring
- Privacy policy compliance review
- Contract updates as needed

**Quarterly Tasks:**
- Legal compliance review
- Terms of Service update (if needed)
- Insurance renewal checks

**Annual Tasks:**
- Contractor agreement renewal
- Privacy policy comprehensive review
- Legal counsel consultation
- Insurance policy renewal

---

## 11. Success Criteria

**BACKLOG-006 can be marked COMPLETE when:**

### Critical Requirements (Blocking Launch):
- [x] Privacy Policy updated with APP compliance ⚠️
- [x] Privacy Policy includes international data transfer disclosures ⚠️
- [x] Privacy Policy includes OAIC complaint process ⚠️
- [x] Terms of Service updated with ACL compliance ⚠️
- [x] Terms of Service includes contractor independent status disclaimer ⚠️
- [x] Independent Contractor Agreement drafted and reviewed by legal counsel ⚠️
- [x] Contractor agreement acceptance flow implemented ⚠️
- [x] Data breach response plan created ⚠️
- [x] Data retention policy documented ⚠️
- [x] Legal counsel has reviewed and approved all documents ⚠️

### High Priority (Should Complete Before Launch):
- [ ] Consent mechanisms implemented (registration, claims, marketing)
- [ ] Data access/deletion functionality implemented
- [ ] Email preference center implemented
- [ ] Insurance verification monitoring implemented
- [ ] License expiry monitoring implemented

### Medium Priority (Can Complete Post-Launch):
- [ ] Data retention automation fully implemented
- [ ] Third-party insurance verification service integrated
- [ ] State licensing API integration researched
- [ ] DMCA compliance process created

---

## 12. Cost Summary

### Legal Counsel Costs:
- Initial legal review (pre-launch): $8,000-13,000
- Ongoing legal costs (annual): $4,000-8,000/year

### Insurance Costs:
- Professional Indemnity: $3,000-5,000/year
- Cyber Liability: $2,000-4,000/year
- **Total Insurance:** $5,000-9,000/year

### Engineering Costs:
- Phase 1 implementation: 40 hours @ $150/hour = $6,000
- Phase 2 implementation: 32 hours @ $150/hour = $4,800
- Phase 3 testing: 16 hours @ $150/hour = $2,400
- **Total Engineering:** $13,200 (one-time)

### Total BACKLOG-006 Cost Estimate:
- **One-time:** $21,200-26,200 (legal + engineering)
- **Ongoing (annual):** $9,000-17,000 (legal + insurance)

---

## 13. Next Steps (Immediate Actions)

### THIS WEEK (Days 1-2):
1. **ENGAGE LEGAL COUNSEL** - Employment law + privacy law specialists ⚠️
2. Share this checklist with legal counsel
3. Schedule legal review kickoff meeting
4. Provide legal counsel access to staging environment

### NEXT WEEK (Days 3-7):
5. Legal counsel reviews Privacy Policy, Terms, drafts Contractor Agreement
6. Engineering begins Phase 1: Privacy Policy updates based on legal feedback
7. Engineering begins Phase 1: Terms of Service updates based on legal feedback

### WEEK 2:
8. Legal counsel delivers Contractor Agreement v1.0
9. Engineering implements Phase 2: Consent mechanisms and contractor agreement flow
10. QA testing begins

### WEEK 3:
11. Final legal counsel review and sign-off
12. Deploy updated legal documents to production
13. Mark BACKLOG-006 as COMPLETE ✅
14. Proceed to next launch blocker

---

## 14. Risk Disclaimer

**IMPORTANT LEGAL NOTICE:**

This checklist is for information and planning purposes only. It does not constitute legal advice. The author is NOT a qualified legal practitioner.

**This document:**
- Identifies potential legal issues based on research
- Provides suggested action items
- Does NOT provide definitive legal opinions
- Does NOT guarantee legal compliance

**CRITICAL REQUIREMENT:**
All legal documents, policies, and procedures MUST be reviewed and approved by qualified legal counsel before implementation. Do NOT rely solely on this checklist for legal compliance.

**Recommended Action:**
Engage qualified Australian legal counsel specialising in:
- Privacy law (Australian Privacy Act)
- Employment law (Fair Work Act)
- Consumer law (Australian Consumer Law)
- Technology/SaaS platforms

---

## 15. Document Control

**Document:** LEGAL_COMPLIANCE_CHECKLIST.md
**Version:** 1.0
**Created:** 2026-02-04
**Author:** Engineering Team
**Status:** DRAFT - Requires Legal Counsel Review
**Next Review:** Upon legal counsel engagement

**Change Log:**
- 2026-02-04: Initial creation (v1.0)

**Distribution:**
- Legal Counsel (to be engaged)
- Engineering Team
- Project Manager
- Founder/CEO

---

**END OF LEGAL COMPLIANCE CHECKLIST**

Total Checklist Items: 200+
Critical Action Items: 47
High Priority Action Items: 38
Medium Priority Action Items: 28
