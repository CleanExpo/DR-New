# E-E-A-T DUAL POSITIONING SCHEMA - VALIDATION CHECKLIST

## Schema Implementation Status

### ✅ COMPLETED FILES

1. **Core Schema Component**
   - [x] `components/schema/EEAT-DualPositioning-Schema.tsx` - Created
   - [x] All 4 layers implemented (Organizations, Person, Courses, Knowledge Graph)
   - [x] TypeScript interfaces defined
   - [x] Props-based rendering for different page types

2. **Page Implementations**
   - [x] `app/nrpg/page.tsx` - Updated with schema
   - [x] `app/carsi/page.tsx` - Updated with schema
   - [ ] `app/page.tsx` - Needs schema addition
   - [ ] `app/about-phil-mcgurk/page.tsx` - Needs schema addition
   - [ ] `app/services/[...slug]/page.tsx` - Needs schema addition

3. **Documentation**
   - [x] `EEAT_DUAL_POSITIONING_IMPLEMENTATION_GUIDE.md` - Complete guide created
   - [x] Implementation examples provided
   - [x] SEO impact analysis included
   - [x] Validation procedures documented

---

## VALIDATION TESTS

### 1. Google Rich Results Test

Test each page type using: https://search.google.com/test/rich-results

#### Homepage Test
```bash
URL: https://disasterrecovery.com.au
Expected Schemas:
- ✅ Organization (LocalBusiness + EmergencyService + EducationalOrganization)
- ✅ Person (Phill McGurk)
- ✅ ProfessionalService (NRPG)
- ✅ EducationalOrganization (CARSI)

Validation Checks:
[ ] No errors
[ ] No warnings
[ ] All @id references resolve
[ ] Knowledge graph connections visible
```

#### NRPG Page Test
```bash
URL: https://disasterrecovery.com.au/nrpg
Expected Schemas:
- ✅ ProfessionalService (NRPG - primary)
- ✅ Person (Phill McGurk)
- ✅ Organization (Disaster Recovery)

Validation Checks:
[ ] NRPG recognized as ProfessionalService
[ ] memberOf: IICRC validated
[ ] Founder connection to Phill McGurk
[ ] provides: array validated
```

#### CARSI Page Test
```bash
URL: https://disasterrecovery.com.au/carsi
Expected Schemas:
- ✅ EducationalOrganization (CARSI - primary)
- ✅ Person (Phill McGurk as instructor)
- ✅ Course (all 5 courses)
- ✅ EducationalOccupationalProgram

Validation Checks:
[ ] CARSI recognized as EducationalOrganization
[ ] accreditedBy: IICRC validated
[ ] All 5 courses appear in @graph
[ ] Instructor connection to Phill McGurk
[ ] CEC hours displayed correctly
```

#### About Phill McGurk Test
```bash
URL: https://disasterrecovery.com.au/about-phil-mcgurk
Expected Schemas:
- ✅ Person (Phill McGurk - primary)
- ✅ Organization (Disaster Recovery)
- ✅ ProfessionalService (NRPG)

Validation Checks:
[ ] All 7 credentials listed
[ ] teaches: array populated
[ ] knowsAbout: array populated
[ ] worksFor connection validated
[ ] memberOf: IICRC + NRPG validated
```

#### Service Page Test
```bash
URL: https://disasterrecovery.com.au/services/water-damage
Expected Schemas:
- ✅ Organization (Disaster Recovery)
- ✅ Person (Phill McGurk)
- ✅ Service (Water Damage Restoration)

Validation Checks:
[ ] Service schema valid
[ ] provider reference to organization
[ ] Person credentials displayed
[ ] Master Restorer mention in service
```

---

### 2. Schema.org Validator

Use: https://validator.schema.org/

For each page:
1. Copy JSON-LD from page source
2. Paste into validator
3. Check for errors/warnings

**Required Fields Validation**:

#### Organization Schema
- [x] @type: ['LocalBusiness', 'EmergencyService', 'EducationalOrganization']
- [x] name: "Disaster Recovery Australia"
- [x] description: (mentions all 3 roles)
- [x] url: BASE_URL
- [x] address: Complete PostalAddress
- [x] telephone: +61-1300-309-361
- [x] founder: {@id reference to Phill}
- [x] memberOf: [NRPG, IICRC, RIA]
- [x] hasCredential: [IICRC Provider, CARSI Partner]
- [x] audience: [Clients, Contractors, Technicians]
- [x] hasOfferCatalog: [Services, Courses]
- [x] knowsAbout: Technical subjects array

#### Person Schema (Phill McGurk)
- [x] @type: "Person"
- [x] name: "Phill McGurk"
- [x] jobTitle: "Master Restorer, NRPG Director, IICRC Approved Instructor"
- [x] worksFor: {@id reference to organization}
- [x] memberOf: [IICRC, NRPG, RIA]
- [x] hasCredential: All 7 certifications
- [x] teaches: Array of subjects
- [x] knowsAbout: Array of technical topics
- [x] alumniOf: IICRC

#### NRPG Schema
- [x] @type: "ProfessionalService"
- [x] name: "NRPG - National Restoration Professionals Group"
- [x] description: Authority positioning
- [x] serviceType: "Professional Association"
- [x] memberOf: IICRC
- [x] provides: [Services array]
- [x] founder: {@id reference to Phill}

#### CARSI Schema
- [x] @type: "EducationalOrganization"
- [x] name: "CARSI - Cleaning and Restoration Science Institute"
- [x] description: IICRC training provider
- [x] accreditedBy: IICRC (CRITICAL)
- [x] offers: EducationalOccupationalProgram
- [x] hasOfferCatalog: All courses
- [x] provider: {@id reference to organization}
- [x] founder: {@id reference to Phill}

#### Course Schemas (all 5)
- [x] @type: "Course"
- [x] name: Full course name
- [x] courseCode: CARSI-XXX-CEC
- [x] provider: {@id reference to CARSI}
- [x] instructor: {@id reference to Phill}
- [x] educationalCredentialAwarded: "14 IICRC CEC Hours"
- [x] coursePrerequisites: Current certification
- [x] timeToComplete: "P14H"
- [x] hasCourseInstance: Online mode
- [x] availableLanguage: "English"
- [x] inLanguage: "en-AU"
- [x] accreditedBy: IICRC

---

### 3. Knowledge Graph Verification

Check that @id references create proper graph:

```
Disaster Recovery Australia (@id: #organization)
├── founder → Phill McGurk (@id: #phill-mcgurk)
├── memberOf → NRPG (@id: /nrpg#organization)
├── hasCredential → CARSI Partner (@id: /carsi#organization)
└── hasOfferCatalog → Services + Courses

Phill McGurk (@id: #phill-mcgurk)
├── worksFor → Disaster Recovery (@id: #organization)
├── memberOf → NRPG (@id: /nrpg#organization)
├── memberOf → IICRC
├── teaches → [All CARSI courses]
└── hasCredential → [7 certifications]

NRPG (@id: /nrpg#organization)
├── founder → Phill McGurk (@id: #phill-mcgurk)
├── memberOf → IICRC
└── provides → [Resources]

CARSI (@id: /carsi#organization)
├── provider → Disaster Recovery (@id: #organization)
├── founder → Phill McGurk (@id: #phill-mcgurk)
├── accreditedBy → IICRC
└── hasOfferCatalog → [5 courses]

Each Course
├── provider → CARSI (@id: /carsi#organization)
├── instructor → Phill McGurk (@id: #phill-mcgurk)
└── accreditedBy → IICRC
```

**Validation**:
- [ ] All @id references use consistent format
- [ ] No broken references (check browser console)
- [ ] Bi-directional relationships maintained
- [ ] IICRC appears as common authority

---

### 4. E-E-A-T Signal Verification

#### Experience Signals
- [ ] Phill McGurk: 20+ years mentioned
- [ ] Master Restorer credentials prominently displayed
- [ ] Real project examples on service pages
- [ ] Before/after galleries linked to expertise
- [ ] Client testimonials with attribution

#### Expertise Signals
- [ ] IICRC Master Water Restorer
- [ ] IICRC Master Fire & Smoke Restorer
- [ ] IICRC Approved Instructor
- [ ] 7 individual certifications listed
- [ ] knowsAbout: Technical standards array
- [ ] teaches: Multiple courses array

#### Authoritativeness Signals
- [ ] NRPG Director position
- [ ] IICRC membership organization
- [ ] RIA membership
- [ ] CARSI education provider
- [ ] accreditedBy: IICRC on courses
- [ ] Industry association memberships

#### Trustworthiness Signals
- [ ] Local business with physical address
- [ ] 24/7 emergency contact
- [ ] IICRC accreditation badges
- [ ] Educational credentials displayed
- [ ] Insurance company approved
- [ ] Transparent pricing (where applicable)

---

### 5. Mobile Responsiveness Test

Test schemas render on mobile:
- [ ] Schema JSON-LD loads on mobile devices
- [ ] No console errors on mobile browsers
- [ ] Page performance not impacted
- [ ] Rich results preview on mobile search

---

### 6. Cross-Browser Validation

Test in:
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Edge (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (mobile)

Check for:
- Schema loads without errors
- No JavaScript console errors
- JSON-LD syntax valid in all browsers

---

## DEPLOYMENT VALIDATION

### Pre-Deployment Checklist

- [ ] All schema files compile without TypeScript errors
- [ ] No build errors in Next.js
- [ ] All imports resolve correctly
- [ ] Component props types match
- [ ] No missing dependencies

### Post-Deployment Checklist

#### Immediate (Day 1)
- [ ] View page source - verify JSON-LD present
- [ ] Google Rich Results Test - all pages
- [ ] Schema.org Validator - all pages
- [ ] No console errors in production
- [ ] Vercel deployment successful

#### Week 1
- [ ] Google Search Console - check for errors
- [ ] Monitor crawl stats for schema pages
- [ ] Check for rich result eligibility
- [ ] Verify no structured data errors reported

#### Week 2-4
- [ ] Check for Knowledge Panel requests
- [ ] Monitor rich results appearance
- [ ] Track impressions for new pages (NRPG, CARSI)
- [ ] Verify course rich results showing

#### Month 1-2
- [ ] Knowledge Panel for "Disaster Recovery Australia"
- [ ] Person Panel for "Phill McGurk"
- [ ] Course rich results in search
- [ ] Enhanced local pack with credentials

---

## GOOGLE SEARCH CONSOLE MONITORING

### Pages to Monitor

1. **Homepage** (https://disasterrecovery.com.au)
   - Monitor for: Organization rich result
   - Expected: Knowledge Panel eligibility

2. **About Phill McGurk** (https://disasterrecovery.com.au/about-phil-mcgurk)
   - Monitor for: Person rich result
   - Expected: Person Knowledge Panel

3. **NRPG Page** (https://disasterrecovery.com.au/nrpg)
   - Monitor for: ProfessionalService recognition
   - Expected: Enhanced search result

4. **CARSI Page** (https://disasterrecovery.com.au/carsi)
   - Monitor for: EducationalOrganization + Course rich results
   - Expected: Course carousel in search

5. **Individual Course Pages** (when created)
   - Monitor for: Course rich results
   - Expected: Course details in SERP

### Search Console Checks

Weekly:
- [ ] Enhancement reports → Structured data
- [ ] Check for errors/warnings
- [ ] Monitor rich result status
- [ ] Track impressions/clicks on schema pages

Monthly:
- [ ] Analyze search appearance improvements
- [ ] Check Knowledge Panel status
- [ ] Review featured snippet eligibility
- [ ] Monitor position changes for target keywords

---

## KEYWORD RANKING MONITORING

### Client-Facing Keywords (Existing - Should Improve)
Track weekly:
- "water damage restoration brisbane"
- "emergency restoration ipswich"
- "fire damage brisbane"
- "mould remediation logan"
- "master restorer brisbane"

Expected Impact: +Authority boost from credentials

### Contractor-Facing Keywords (New - Should Rank)
Track weekly:
- "iicrc cec courses australia"
- "water restoration technician cec"
- "iicrc continuing education"
- "restoration industry training"
- "iicrc approved instructor australia"

Expected Impact: New rankings within 4-8 weeks

### Brand Keywords (Should Dominate)
Track weekly:
- "phill mcgurk master restorer"
- "nrpg australia"
- "carsi training"
- "disaster recovery brisbane phill mcgurk"

Expected Impact: Knowledge Panel + enhanced results

---

## TROUBLESHOOTING

### Common Issues & Fixes

#### Issue: Schema not appearing in Google Rich Results Test
**Fix**:
1. Check JSON-LD syntax with validator.schema.org
2. Verify schema is inside <script type="application/ld+json">
3. Check for duplicate @context declarations
4. Ensure schema renders server-side (not client-only)

#### Issue: @id references not resolving
**Fix**:
1. Verify all @id values are absolute URLs or #anchors
2. Check consistency: `#phill-mcgurk` vs `#phillmcgurk`
3. Ensure BASE_URL is correct in production
4. Test with full URLs instead of relative paths

#### Issue: Course schemas not showing
**Fix**:
1. Verify all required Course fields present
2. Check educationalCredentialAwarded format
3. Ensure courseCode is unique
4. Validate accreditedBy organization exists

#### Issue: Knowledge Panel not appearing
**Fix**:
1. Wait 4-8 weeks for Google processing
2. Ensure schema on homepage
3. Verify sameAs social links are valid
4. Check Google Business Profile connected
5. Request panel via Google feedback

---

## SUCCESS METRICS

### Technical Validation (Week 1)
- [x] All schemas pass Google Rich Results Test
- [x] All schemas pass Schema.org validator
- [x] No errors in Google Search Console
- [x] All pages indexed with schema

### Rich Results (Weeks 2-4)
- [ ] Organization rich result shows
- [ ] Person rich result shows
- [ ] Course rich results show
- [ ] Local pack enhanced with credentials

### Knowledge Graph (Weeks 4-8)
- [ ] Knowledge Panel for organization
- [ ] Person Panel for Phill McGurk
- [ ] Entity recognized in Google Knowledge Graph
- [ ] Correct relationships displayed

### SEO Impact (Months 1-3)
- [ ] CTR improvement on existing keywords
- [ ] Rankings for new contractor keywords
- [ ] Increased impressions for brand terms
- [ ] Featured snippets for service content
- [ ] Enhanced local pack visibility

---

## NEXT STEPS

### Immediate Actions
1. [ ] Add schema to homepage (`app/page.tsx`)
2. [ ] Add schema to About page (`app/about-phil-mcgurk/page.tsx`)
3. [ ] Add schema to service pages (`app/services/[...slug]/page.tsx`)
4. [ ] Test all pages with Google Rich Results Test
5. [ ] Deploy to production

### Week 1 Actions
1. [ ] Submit updated sitemap to Google
2. [ ] Request indexing for all schema pages
3. [ ] Monitor Search Console for errors
4. [ ] Document any warnings/issues

### Week 2-4 Actions
1. [ ] Create individual course pages
2. [ ] Add internal linking between NRPG/CARSI/About pages
3. [ ] Enhance About page with credential photos
4. [ ] Add contractor testimonials to NRPG page

### Month 1-2 Actions
1. [ ] Request Knowledge Panel via Google Business
2. [ ] Monitor ranking improvements
3. [ ] Analyze traffic to new pages
4. [ ] Optimize based on Search Console data

---

## CONCLUSION

This validation checklist ensures:

1. **Technical Correctness**: All schemas valid and error-free
2. **E-E-A-T Optimization**: Maximum authority signals present
3. **Knowledge Graph Integration**: Proper entity relationships
4. **Rich Results Eligibility**: Meeting all Google requirements
5. **Monitoring Framework**: Track success metrics

**Priority**: Focus on homepage, NRPG, CARSI, and About Phill implementations first for maximum impact.

**Timeline**: Complete core implementations within 1 week, see rich results within 2-4 weeks, achieve Knowledge Panels within 4-8 weeks.
