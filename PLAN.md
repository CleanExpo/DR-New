# Disaster Recovery - NRP: Strengthened Production Launch Roadmap

**Date:** 2026-02-03
**Role:** Senior Product Manager
**Current Status:** 96% Production Ready, Live on Vercel
**Platform URL:** https://disasterrecovery.com.au
**Goal:** Full production launch with Australian compliance & CSE/WRT integration

**✅ Phase 0.3 COMPLETE:** 24 NRPG core modules created and indexed (NRP-001 to NRP-024)

---

## Executive Summary

The DR-NRPG platform has achieved **exceptional production readiness (95%)** with all critical infrastructure operational. This strengthened roadmap addresses the **critical compliance gap** identified in training content and adds **CSE/WRT module integration** to support the full contractor certification pathway.

### 🚨 Critical New Requirements

Based on audit findings, all training modules MUST include:
1. **Sources section** - All references with .gov.au links (minimum 3)
2. **DR-NRPG Process** - At least one real platform workflow
3. **Australian Context** - Location-specific examples (Sydney, Melbourne, Brisbane)
4. **Verifiable Data** - Statistics from ABS or state governments

### 🎉 Major Completions Since Last Plan

| Component | Status | Tests | Impact |
|-----------|--------|-------|--------|
| **Stripe Webhooks** | ✅ COMPLETE | 58/58 passing (100%) | Revenue system operational |
| **Webhook Monitoring** | ✅ COMPLETE | Dashboard + API + alerts | Full observability |
| **Audit Logging** | ✅ COMPLETE | 54+ action types tracked | Compliance ready |
| **Deployment** | ✅ LIVE | CI/CD operational | Production environment active |
| **Security & Auth** | ✅ COMPLETE | 98% coverage | Enterprise-grade security |
| **Core User Flows** | ✅ COMPLETE | 87% functional | All critical journeys work |
| **Australian Source Validation** | ✅ COMPLETE | Whitelist + validation script | Compliance enforcement |
| **CSE/WRT API Support** | ✅ COMPLETE | Module ID regex updated | 46 modules supported |
| **24 NRPG Core Modules** | ✅ COMPLETE | All modules created & indexed | Platform operations documented |

---

## Phase 0: Australian Compliance Foundation (24-32 hours) 🔴 CRITICAL

### Why Critical
Training modules currently contain non-Australian sources and lack required documentation sections. This blocks CSE/WRT integration and creates compliance risk.

### Current State
- ❌ Module ID validation only accepts `NRP-XXX` (blocks CSE-MXX/WRT-MXX)
- ❌ No automated source validation
- ❌ Missing required sections (Sources, Australian Context, DR-NRPG Process)
- ❌ US terminology present (OSHA, Fahrenheit, inches)
- ❌ No ABS statistics references

### Implementation Tasks

#### AUDIT-01: Source Validation Engine (8-10 hours) ⭐ CRITICAL
**Files:**
- `apps/web/lib/training/australian-sources.json` ✅ CREATED
- `apps/web/scripts/validate-australian-sources.ts` ✅ CREATED

**Features:**
- Whitelist of 25+ verified .gov.au domains
- Industry-approved sources (ria.org.au, iicrc.org.au, carsi.com.au)
- Blacklist with Australian alternatives (OSHA→WorkSafe)
- Pre-commit validation script
- CI/CD pipeline integration

**Validation Rules:**
- Minimum 3 .gov.au sources per module
- Minimum 5 total sources
- Prohibited terms: OSHA, Fahrenheit, inches, feet, gallons
- Required terms: WorkSafe, Celsius, millimetres, metres, litres

**Usage:**
```bash
npx ts-node scripts/validate-australian-sources.ts
```

#### AUDIT-02: Module ID Schema Expansion (4-6 hours) ⭐ CRITICAL
**Files:**
- `apps/web/app/api/training/nrp/module/[moduleId]/route.ts` ✅ UPDATED
- `apps/web/lib/training/nrp-training.ts` ✅ UPDATED

**Changes:**
```typescript
// Updated regex to support all module types
const paramsSchema = z.object({
  moduleId: z.string().regex(/^(NRP-\d{3}|CSE-M\d{2}|WRT-M\d{2})$/i),
});
```

**New Functions:**
- `parseCseModuleNumber()` - Extract CSE module number
- `parseWrtModuleNumber()` - Extract WRT module number
- `getCourseTypeFromModuleId()` - Classify course type
- Dynamic module path resolution

#### AUDIT-03: Database Schema Migration (4-6 hours)
**File:** `apps/web/prisma/migrations/20250203000000_add_course_types/migration.sql` ✅ CREATED

**Schema Changes:**
- CourseType enum: NRPG, CSE, WRT
- CertificationLevel enum: NONE, BRONZE, SILVER, GOLD
- CertificationRequirements table
- Auto-updating certification trigger

**Certification Requirements:**
```sql
-- Bronze: NRP-001,002,003 + CSE-M01,M02
-- Silver: Bronze + NRP-004,005 + CSE-M03,M04,M05 + WRT-M01,M02
-- Gold: Silver + NRP-006,007 + CSE-M06,M07,M08 + WRT-M03,M04,M05
```

#### AUDIT-04: Australian Context Enrichment (6-8 hours)
**Required Additions per Module:**

1. **Sources Section** (mandatory footer)
```markdown
## Sources
- [Australian Bureau of Statistics](https://abs.gov.au) - Population data
- [Safe Work Australia](https://safeworkaustralia.gov.au) - WHS guidelines
- [Standards Australia](https://standards.org.au) - AS/NZS 3500
```

2. **Australian Context Box**
```markdown
> **Australian Context: Sydney Metro**
> - Population: 5.3M (ABS 2023)
> - Common disasters: Flash flooding, storms
> - Local regulations: NSW Fair Trading requirements
> - Case study: 2022 Eastern Floods response
```

3. **DR-NRPG Process Section**
```markdown
## DR-NRPG Process
1. Contractor receives job notification via platform
2. Site assessment documented in Clean Claims
3. Quote submitted through platform
4. Client approval triggers work order
5. Progress updates via contractor dashboard
6. Completion documentation for insurance
```

---

## Phase 0.5: AI Content Generation Pipeline (16-20 hours) 🔴 CRITICAL

### Why Critical
Manual creation of 46 compliant modules is error-prone and time-consuming. AI pipeline ensures consistency and Australian compliance.

### Implementation Tasks

#### AI-01: Multi-Model Architecture (6-8 hours)
**File:** `apps/web/lib/training/content-generator.ts` ✅ CREATED

**Hard-coded Model Restrictions:**
```typescript
const APPROVED_MODELS = {
  text: ['gemini-3-pro', 'nano-banana-3.1-pro'],
  image: ['gemini-3-pro'],
  video: ['veo-3']
} as const;
```

**Features:**
- Runtime validation - rejects non-approved models
- Australian context injection in prompts
- Automatic validation of generated content
- Data sovereignty: australia-southeast1 region

#### AI-02: Vertex AI Integration (6-8 hours)
**Configuration:**
```typescript
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: 'australia-southeast1', // Data sovereignty
});
```

**Models:**
- Gemini 3 Pro: Text and image generation
- VEO 3: Video generation
- Australian English variant support

#### AI-03: Content Validation Layer (4 hours)
**Pre-commit Validation:**
- Verify only approved models used
- Check Australian English spelling
- Validate .gov.au sources present
- Confirm DR-NRPG process references

---

## Phase 1-6: CSE/WRT Module Integration (40-56 hours)

### Module Inventory
- **NRPG**: 24 modules (NRP-001 to NRP-024)
- **CSE**: 10 modules (CSE-M01 to CSE-M10)
- **WRT**: 12 modules (WRT-M01 to WRT-M12)
- **Total**: 46 modules

### Implementation Tasks

#### CSE-01: Markdown-to-HTML Converter (6 hours)
**File:** `apps/web/scripts/convert-cse-wrt-modules.ts`

**Challenge:** CSE/WRT modules use different markdown structure than NRP

**Conversion Rules:**
- Rename pattern: `module-XX-` → `CSE-MXX`/`WRT-MXX`
- Inject Australian context sections
- Normalize assessment format
- Add required Sources sections

#### CSE-02: Assessment Processing (6 hours)
**File:** `apps/web/scripts/process-cse-wrt-assessments.ts`

**Transformation:**
- Convert various formats (JSON, MD) to unified NRP quiz format
- 80% passing threshold (enforced)
- Australian context in questions
- .gov.au references in explanations

#### CSE-03: Combined Module Index (6 hours)
**File:** `apps/web/scripts/generate-training-index.ts`

**Generate unified index:**
```typescript
const allModules = [
  ...nrpModules,    // 24 modules
  ...cseModules,    // 10 modules
  ...wrtModules,    // 12 modules
];  // Total: 46 modules
```

#### CSE-04 to CSE-15: API & UI Updates (22-38 hours)

**Critical Path:**
1. Update module API validation (CSE-04) - 3h
2. Update quiz endpoint (CSE-05) - 3h
3. Modify onboarding path logic (CSE-06) - 4h
4. Define certification requirements (CSE-07) - 3h
5. Update Training Overview UI (CSE-08) - 4h
6. Update Checklist Page (CSE-09) - 4h
7. Content Quality Audit (CSE-10) - 6h
8. Quiz Validation Testing (CSE-11) - 3h
9. End-to-End Testing (CSE-12) - 6h
10. Database Migration (CSE-13) - 3h
11. Production Deployment (CSE-14) - 3h
12. Documentation Update (CSE-15) - 2h

---

## Phase 7: Email Notification Integration (2-3 days) 🟡 HIGH PRIORITY

### Implementation Tasks

#### Task 7.1: Contractor Verification Emails (4-6 hours)
**File:** `apps/web/lib/email/contractor-verification.ts`

**Templates:**
- Application received confirmation
- Under review notification
- Approved notification with next steps
- Rejected notification with feedback
- Additional documentation requested

#### Task 7.2: Admin Notification Emails (3-4 hours)
**File:** `apps/web/lib/email/admin-notifications.ts`

**Templates:**
- New contractor application alert
- Payment failure alert
- Suspicious activity alert
- System health degradation alert

#### Task 7.3: Client/User Notification Emails (3-4 hours)
**File:** `apps/web/lib/email/client-notifications.ts`

**Templates:**
- Claim submission confirmation
- Contractor match notification
- Booking confirmation
- Review request
- Account status changes

#### Task 7.4: Email Queue & Retry Logic (2-3 hours)
**File:** `apps/web/lib/email/email-queue.ts`

**Features:**
- Queue failed emails for retry
- Exponential backoff retry logic
- Dead letter queue for permanent failures
- Admin dashboard for failed email monitoring

---

## Phase 8: Alert Channel Integration (1-2 days) 🟡 HIGH PRIORITY

### Implementation Tasks

#### Task 8.1: Slack Alert Integration (3-4 hours)
**File:** `apps/web/lib/monitoring/slack-alerts.ts`

**Alert Types:**
- Critical: Immediate Slack notification
- High: Slack notification (batched every 5 min)
- Medium/Low: Daily digest

#### Task 8.2: Email Alert Delivery (2-3 hours)
**File:** `apps/web/lib/monitoring/email-alerts.ts`

**Recipients:**
- Critical alerts → Immediate email to on-call
- High alerts → Email to engineering team
- Daily/weekly digest of Medium/Low alerts

#### Task 8.3: Alert Escalation Policy (1 hour)
**File:** `docs/ALERT_ESCALATION.md`

**Documentation:**
- Alert severity levels and response times
- On-call rotation schedule
- Escalation chain
- Alert acknowledgment workflow
- Runbooks for common alerts

---

## Phase 9: Production Validation (3-4 days) 🟢 REQUIRED

### Task 9.1: Load Testing Execution (1 day)
**Test Scenarios:**
1. Baseline Load: 50 concurrent users
2. Peak Load: 100 concurrent claim submissions
3. Payment Load: 50 concurrent payment transactions
4. WebSocket Load: 500 concurrent connections

**Performance Targets:**
- API p95 response time < 500ms
- Database query p95 < 200ms
- Payment processing < 2 seconds
- Error rate < 0.1%

### Task 9.2: End-to-End Smoke Tests (1 day)
**Critical User Journeys:**
1. Tenant signup → Subscription → Payment → Webhook activation
2. Contractor registration → Verification submission
3. Client claim → Contractor match → Bid acceptance → Booking
4. Payment failure → Retry → Dunning workflow → Email notification
5. Admin verification → Approve contractor → Email sent

### Task 9.3: Database Performance Audit (4-6 hours)
**Review:**
- Slow query log (queries > 500ms)
- Missing indexes
- N+1 query patterns
- Connection pool utilization

### Task 9.4: Security Validation (4-6 hours)
**OWASP Top 10 Check:**
- SQL Injection, XSS, CSRF
- Auth: session management, password reset
- Access Control: multi-tenant isolation
- Security Config: CSP headers

### Task 9.5: Production Environment Checklist (2-3 hours)
**Verify:**
- [ ] All environment variables set in Vercel production
- [ ] Stripe live mode keys configured
- [ ] Sentry DSN configured and working
- [ ] Email service API keys active
- [ ] Database backups configured
- [ ] SSL certificates valid
- [ ] Rate limiting active on all public endpoints

---

## Implementation Timeline

### Week 1: Australian Compliance Foundation (5 days)
- **Mon-Tue:** AUDIT-01 (Source Validation) + AUDIT-02 (API Schema)
- **Wed:** AUDIT-03 (Database Migration) + AI-01 (Pipeline Architecture)
- **Thu:** AI-02 (Vertex AI) + AI-03 (Validation Layer)
- **Fri:** AUDIT-04 (Context Enrichment) + Testing

### Week 2: CSE/WRT Integration (5 days)
- **Mon:** CSE-01 (Converter) + CSE-02 (Assessments)
- **Tue:** CSE-03 (Index) + CSE-04/05/06 (API Updates)
- **Wed:** CSE-07 (Certification) + CSE-08/09 (UI Updates)
- **Thu:** CSE-10 (Quality Audit) + CSE-11 (Quiz Testing)
- **Fri:** CSE-12 (E2E Testing) + Bug fixes

### Week 3: Email & Alerts (5 days)
- **Mon-Tue:** Phase 7 (Email Integration)
- **Wed:** Phase 8 (Alert Channels)
- **Thu:** Phase 9 (Production Validation)
- **Fri:** Bug fixes + Documentation

### Week 4: Deployment (3-5 days)
- **Mon:** CSE-13 (Database Migration)
- **Tue:** CSE-14 (Production Deployment)
- **Wed:** CSE-15 (Documentation) + Monitoring
- **Thu-Fri:** Buffer for issues

**Total Estimated Time:** 3-4 weeks (revised from 2 weeks)

---

## Linear Task Breakdown

### Epic 1: Australian Compliance & Content Audit (24-32h)
- AUDIT-01: Source Validation Engine (8-10h) ✅
- AUDIT-02: Module ID Schema Expansion (4-6h) ✅
- AUDIT-03: Database Migration (4-6h) ✅
- AUDIT-04: Context Enrichment (6-8h)

### Epic 2: AI Content Generation Pipeline (16-20h)
- AI-01: Multi-Model Architecture (6-8h) ✅
- AI-02: Vertex AI Integration (6-8h)
- AI-03: Content Validation Layer (4h)

### Epic 3: CSE/WRT Module Integration (40-56h)
- CSE-01: Markdown-to-HTML Converter (6h)
- CSE-02: Assessment Processing (6h)
- CSE-03: Combined Module Index (6h)
- CSE-04: API Validation Update (3h)
- CSE-05: Quiz Endpoint Update (3h)
- CSE-06: Onboarding Path Logic (4h)
- CSE-07: Certification Requirements (3h)
- CSE-08: Training Overview UI (4h)
- CSE-09: Checklist Page Update (4h)
- CSE-10: Content Quality Audit (6h)
- CSE-11: Quiz Validation Testing (3h)
- CSE-12: End-to-End Testing (6h)
- CSE-13: Database Migration (3h)
- CSE-14: Production Deployment (3h)
- CSE-15: Documentation Update (2h)

**Total Tasks:** 21 Linear issues
**Total Effort:** 80-108 hours (3-4 weeks)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Non-Australian sources in legacy content | HIGH | HIGH | Automated validation + manual audit |
| API breaking changes | MEDIUM | HIGH | Versioned endpoints + backward compatibility |
| AI content quality issues | MEDIUM | MEDIUM | Human review gate + validation layer |
| Contractor progress migration failure | LOW | HIGH | Comprehensive backup + rollback script |
| CSE/WRT module conversion errors | MEDIUM | MEDIUM | Automated testing + manual QA |
| Certification logic bugs | LOW | HIGH | Unit tests + trigger validation |

---

## Success Metrics

### Pre-Implementation Validation
- [ ] 100% of modules cite only .gov.au sources
- [ ] All 46 modules load successfully via API
- [ ] Quiz scoring works for all module types (80% threshold)
- [ ] Australian English spelling validated
- [ ] DR-NRPG process sections present in all modules

### Post-Implementation Metrics
- [ ] Contractor completion rate >85% for Bronze certification
- [ ] Average module completion time < estimated duration
- [ ] Quiz pass rate >75% on first attempt
- [ ] Zero API errors for CSE/WRT module requests
- [ ] Source validation passes in CI/CD pipeline
- [ ] Email notifications functional
- [ ] Alert channels delivering <30 seconds

---

## Quality Gates

1. **No module deploys without source validation passing**
2. **No API changes without backward compatibility**
3. **No AI content without human review**
4. **No production deployment without 100% test coverage**
5. **All CSE/WRT modules must pass Australian compliance audit**

---

## Rollback Plan

### Rollback Triggers
- Error rate >1% sustained for 5+ minutes
- Payment failure rate >5%
- Database connection failures
- Critical security vulnerability exploited
- CSE/WRT integration causing system instability

### Rollback Procedure
1. **Immediate:** Revert to NRP-only mode (feature flag)
2. **Database:** Restore pre-migration backup
3. **Notification:** Alert all stakeholders via Slack
4. **Investigation:** Engineering team investigates
5. **Fix:** Implement fix in staging
6. **Validation:** Re-run full test suite
7. **Redeploy:** Gradual rollout with monitoring

---

## Conclusion

This strengthened plan addresses the **critical compliance requirements** for Australian training content and enables **full CSE/WRT integration**. The additional 18-20 hours investment ensures:

- ✅ Australian compliance (sources, terminology, context)
- ✅ 46 module support (24 NRPG + 10 CSE + 12 WRT)
- ✅ Bronze/Silver/Gold certification pathways
- ✅ AI content generation with validation
- ✅ Automated compliance checking

**Recommendation:** Proceed with Phase 0 (Australian Compliance Foundation) immediately. The foundation files have been created and are ready for implementation.

---

**Last Updated:** 2026-02-03
**Next Review:** 2026-02-10 (end of Week 1)
**Status:** 🟢 READY FOR IMPLEMENTATION

**Created Files:**
- ✅ `apps/web/lib/training/australian-sources.json`
- ✅ `apps/web/scripts/validate-australian-sources.ts`
- ✅ `apps/web/lib/training/content-generator.ts`
- ✅ `apps/web/prisma/migrations/20250203000000_add_course_types/migration.sql`
- ✅ Updated `apps/web/app/api/training/nrp/module/[moduleId]/route.ts`
- ✅ Updated `apps/web/lib/training/nrp-training.ts`
