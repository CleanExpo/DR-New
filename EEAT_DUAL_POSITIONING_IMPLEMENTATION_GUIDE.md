# E-E-A-T DUAL POSITIONING SCHEMA - IMPLEMENTATION GUIDE

## Executive Summary

This implementation establishes **Disaster Recovery Australia** as both:
1. **Trusted Local Emergency Service** (Brisbane/Ipswich/Logan)
2. **Industry Knowledge Authority** (via NRPG + CARSI)

**Result**: Maximum E-E-A-T signals for both client-facing AND contractor-facing content.

---

## SCHEMA ARCHITECTURE

### 4-Layer Strategy

```
LAYER 1: Organizations
├── Disaster Recovery Australia (Local + Educational)
├── NRPG (Professional Authority)
└── CARSI (Training Provider)

LAYER 2: People
└── Phill McGurk (Master Restorer + Instructor + Director)

LAYER 3: Educational Programs
├── WRT CEC Course
├── ASD CEC Course
├── FSR CEC Course
├── AMRT CEC Course
└── Contents CEC Course

LAYER 4: Knowledge Graph Connections
└── All entities interconnected via @id references
```

---

## IMPLEMENTATION BY PAGE TYPE

### 1. HOMEPAGE
**File**: `app/page.tsx`

**Schemas to Include**:
- Disaster Recovery Organization (all 3 @types)
- NRPG Organization
- CARSI Organization
- Phill McGurk Person

**Implementation**:
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';

export default function HomePage() {
  return (
    <>
      <EEATDualPositioningSchema pageType="homepage" />
      {/* Rest of page content */}
    </>
  );
}
```

**Why**: Establishes complete organizational structure from the homepage. Google sees all relationships immediately.

---

### 2. ABOUT PHILL MCGURK
**File**: `app/about-phil-mcgurk/page.tsx`

**Schemas to Include**:
- Phill McGurk Person (enhanced)
- Disaster Recovery Organization
- NRPG Organization

**Implementation**:
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';

export default function AboutPhillPage() {
  return (
    <>
      <EEATDualPositioningSchema pageType="about" />
      {/* Page content highlighting:
          - Master Restorer credentials
          - IICRC Instructor status
          - NRPG Director role
          - Teaching experience
          - 20+ years expertise
      */}
    </>
  );
}
```

**Content Requirements**:
- Photo of Phill with IICRC certificates
- List of all credentials (matches schema)
- Teaching history
- NRPG involvement
- Client testimonials
- Industry contributions

---

### 3. SERVICE PAGES
**File**: `app/services/[...slug]/page.tsx`

**Schemas to Include**:
- Disaster Recovery Organization
- Phill McGurk Person
- Service-specific schema (from enhanced-schema.ts)

**Implementation**:
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';
import { generateServiceSchema } from '@/lib/seo/enhanced-schema';

export default function ServicePage({ params }) {
  return (
    <>
      <EEATDualPositioningSchema pageType="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateServiceSchema(
            serviceName,
            description,
            url,
            location
          ))
        }}
      />
      {/* Service content */}
    </>
  );
}
```

**Why**: Connects emergency services to Master Restorer credentials.

---

### 4. NRPG PAGE (NEW)
**File**: `app/nrpg/page.tsx` (CREATE THIS)

**Schemas to Include**:
- NRPG Organization (primary)
- Phill McGurk Person
- Disaster Recovery Organization

**Content Structure**:
```markdown
# NRPG - National Restoration Professionals Group

## Australia's Premier Restoration Professionals Network

Led by Master Restorer Phill McGurk, NRPG provides:

### For Restoration Contractors
- Industry standards and best practices
- Technical knowledge base
- IICRC certification guidance
- Quality assurance frameworks
- Professional development resources

### Resources Available
1. Technical Bulletins
2. Industry Updates
3. Standards Documentation
4. Training Opportunities
5. Networking Events

### Membership Benefits
- Access to expert knowledge
- Industry connections
- Continuing education
- Technical support
- Best practices library

### Leadership
**Director**: Phill McGurk
- IICRC Master Restorer
- 20+ years industry experience
- IICRC Approved Instructor
- Industry thought leader
```

**Implementation**:
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';

export default function NRPGPage() {
  return (
    <>
      <EEATDualPositioningSchema pageType="nrpg" />

      <main>
        <h1>NRPG - National Restoration Professionals Group</h1>

        {/* Hero section */}
        <section>
          <h2>Australia's Premier Restoration Professionals Network</h2>
          <p>Led by Master Restorer Phill McGurk...</p>
        </section>

        {/* Resources section */}
        <section>
          <h2>Contractor Resources</h2>
          {/* Resource cards */}
        </section>

        {/* Membership section */}
        <section>
          <h2>Join NRPG</h2>
          {/* Membership benefits */}
        </section>
      </main>
    </>
  );
}
```

---

### 5. CARSI PAGE (NEW)
**File**: `app/carsi/page.tsx` (CREATE THIS)

**Schemas to Include**:
- CARSI Organization (primary)
- Phill McGurk Person
- All Course Schemas

**Content Structure**:
```markdown
# CARSI - Cleaning and Restoration Science Institute

## IICRC-Approved Online Training

Maintain your IICRC certification with our online CEC courses.

### Available Courses

#### Water Restoration Technician (WRT) CEC
- 14 IICRC CEC Hours
- ANSI/IICRC S500 updates
- Self-paced online
- Instructor: Phill McGurk (Master Restorer)

#### Applied Structural Drying (ASD) CEC
- 14 IICRC CEC Hours
- Advanced psychrometrics
- Drying chamber design
- Self-paced online

#### Fire & Smoke Restoration (FSR) CEC
- 14 IICRC CEC Hours
- ANSI/IICRC S800 standards
- Smoke damage assessment
- Self-paced online

#### Mould Remediation (AMRT) CEC
- 14 IICRC CEC Hours
- ANSI/IICRC S520 standards
- Containment procedures
- Self-paced online

#### Contents Processing CEC
- 14 IICRC CEC Hours
- Pack-out procedures
- Inventory management
- Self-paced online

### Why CARSI?
- IICRC-approved provider
- Taught by Master Restorer
- Flexible online format
- Industry-recognized CECs
- Maintain certifications easily

### Instructor
**Phill McGurk**
- IICRC Master Water Restorer
- IICRC Master Fire & Smoke Restorer
- IICRC Approved Instructor
- 20+ years experience
```

**Implementation**:
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';

export default function CARSIPage() {
  return (
    <>
      <EEATDualPositioningSchema pageType="carsi" />

      <main>
        <h1>CARSI - Cleaning and Restoration Science Institute</h1>

        {/* Hero */}
        <section>
          <h2>IICRC-Approved Online Training</h2>
          <p>Maintain your certification with our CEC courses</p>
        </section>

        {/* Course catalog */}
        <section>
          <h2>Available CEC Courses</h2>
          <div className="grid">
            {/* Course cards */}
          </div>
        </section>

        {/* Instructor bio */}
        <section>
          <h2>Meet Your Instructor</h2>
          {/* Phill McGurk credentials */}
        </section>
      </main>
    </>
  );
}
```

---

### 6. INDIVIDUAL COURSE PAGES (NEW)
**File**: `app/carsi/courses/[courseId]/page.tsx` (CREATE THIS)

**Schemas to Include**:
- CARSI Organization
- Phill McGurk Person
- Specific Course Schema

**Example for WRT Course**:
```tsx
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';

export default function WRTCoursePage() {
  return (
    <>
      <EEATDualPositioningSchema
        pageType="course"
        courseType="wrt"
      />

      <main>
        <h1>Water Restoration Technician (WRT) CEC Course</h1>

        {/* Course details */}
        <section>
          <h2>Course Overview</h2>
          <ul>
            <li>14 IICRC CEC Hours</li>
            <li>ANSI/IICRC S500 Standard Updates</li>
            <li>Self-paced online format</li>
            <li>Certificate upon completion</li>
          </ul>
        </section>

        {/* Curriculum */}
        <section>
          <h2>What You'll Learn</h2>
          {/* Module breakdown */}
        </section>

        {/* Instructor */}
        <section>
          <h2>Your Instructor</h2>
          <p>Phill McGurk - IICRC Master Restorer & Approved Instructor</p>
        </section>

        {/* Enrollment CTA */}
        <section>
          <h2>Enroll Now</h2>
          {/* Enrollment form */}
        </section>
      </main>
    </>
  );
}
```

---

## KNOWLEDGE GRAPH CONNECTIONS

### How Schemas Interconnect

```json
{
  "Disaster Recovery Australia": {
    "founder": { "@id": "#phill-mcgurk" },
    "memberOf": [
      { "@id": "/nrpg#organization" },
      { "name": "IICRC" }
    ],
    "hasCredential": [
      { "recognizedBy": { "@id": "/carsi#organization" } }
    ]
  },

  "Phill McGurk": {
    "worksFor": { "@id": "#organization" },
    "memberOf": [
      { "@id": "/nrpg#organization" },
      { "name": "IICRC" }
    ],
    "teaches": [/* CARSI courses */]
  },

  "NRPG": {
    "founder": { "@id": "#phill-mcgurk" },
    "provides": [/* Resources */],
    "memberOf": { "name": "IICRC" }
  },

  "CARSI": {
    "accreditedBy": { "name": "IICRC" },
    "provider": { "@id": "#organization" },
    "instructor": { "@id": "#phill-mcgurk" }
  },

  "All Courses": {
    "provider": { "@id": "/carsi#organization" },
    "instructor": { "@id": "#phill-mcgurk" },
    "accreditedBy": { "name": "IICRC" }
  }
}
```

**Result**: Google's Knowledge Graph sees:
1. Disaster Recovery Australia is a LOCAL emergency service
2. Led by Master Restorer Phill McGurk
3. Phill is also an IICRC Instructor
4. The organization runs NRPG (industry authority)
5. The organization provides CARSI training (education)
6. All courses are IICRC-approved
7. Serves TWO audiences: clients AND contractors

---

## VALIDATION CHECKLIST

### Google Rich Results Test
Test each page type:
- [ ] Homepage: https://search.google.com/test/rich-results
- [ ] About Phill: Organization + Person schemas valid
- [ ] Service pages: LocalBusiness + Service schemas valid
- [ ] NRPG page: ProfessionalService schema valid
- [ ] CARSI page: EducationalOrganization + Course schemas valid
- [ ] Course pages: Course schema valid with all required fields

### Required Fields Check

**Organization Schemas**:
- [x] @type
- [x] name
- [x] description
- [x] url
- [x] address (for Disaster Recovery)
- [x] telephone (for Disaster Recovery)
- [x] founder
- [x] memberOf

**Person Schema**:
- [x] @type
- [x] name
- [x] jobTitle
- [x] worksFor
- [x] memberOf
- [x] hasCredential (all 7 credentials)
- [x] teaches
- [x] knowsAbout

**Course Schemas**:
- [x] @type: Course
- [x] name
- [x] courseCode
- [x] provider
- [x] instructor
- [x] educationalCredentialAwarded
- [x] coursePrerequisites
- [x] timeToComplete
- [x] accreditedBy
- [x] availableLanguage
- [x] inLanguage

### E-E-A-T Signal Verification

**Experience** (Phill McGurk):
- [x] 20+ years mentioned
- [x] Master Restorer credentials
- [x] Multiple IICRC certifications
- [x] Real project examples (add to content)

**Expertise**:
- [x] IICRC Master certifications
- [x] Approved Instructor status
- [x] Teaches multiple courses
- [x] knowsAbout: technical standards

**Authoritativeness**:
- [x] NRPG Director
- [x] IICRC member
- [x] Industry association member
- [x] Training provider

**Trustworthiness**:
- [x] Local business with address
- [x] 24/7 emergency service
- [x] IICRC accreditation
- [x] Educational credentials
- [x] Insurance approved

---

## SEO IMPACT ANALYSIS

### Target Keywords Enhanced

**Client-Facing** (Existing):
- "water damage restoration brisbane" → +Master Restorer authority
- "emergency restoration ipswich" → +IICRC credentials
- "fire damage brisbane" → +Master Fire Restorer
- "mould remediation logan" → +IICRC AMRT

**Contractor-Facing** (NEW):
- "iicrc cec courses australia" → CARSI pages
- "water restoration technician cec" → WRT course page
- "iicrc continuing education" → CARSI homepage
- "restoration industry training" → NRPG page
- "iicrc approved instructor australia" → About Phill

**Brand Authority**:
- "phill mcgurk master restorer" → Person schema
- "nrpg australia" → NRPG page
- "carsi training" → CARSI pages
- "disaster recovery brisbane" → Enhanced org schema

### Expected Rich Results

1. **Knowledge Panel**: "Disaster Recovery Australia"
   - Organization type
   - Address & phone
   - Services offered
   - Associated people (Phill McGurk)
   - Member of: IICRC, NRPG

2. **Person Knowledge Panel**: "Phill McGurk"
   - Job title: Master Restorer, IICRC Instructor
   - Credentials listed
   - Works for: Disaster Recovery Australia
   - Teaches: Multiple courses

3. **Course Rich Results**:
   - Course name
   - Provider: CARSI
   - Instructor: Phill McGurk
   - Duration: 14 hours
   - Accredited by: IICRC

4. **Local Pack Results**:
   - Enhanced with credentials
   - "Master Restorer" badge
   - IICRC verification

---

## CONTENT OPTIMIZATION REQUIREMENTS

### Homepage Updates
Add sections for:
1. **Master Restorer Leadership**
   - Phill's credentials prominently
   - IICRC Master badges

2. **Dual Positioning Statement**
   ```
   "Trusted Emergency Service + Industry Training Leader"
   ```

3. **Audience Segmentation**:
   - **Property Owners**: Emergency services CTA
   - **Contractors**: Training resources CTA

### About Page Enhancements
Required content:
- Full credential list (matches schema)
- Professional photo with certificates
- Teaching history
- Industry contributions
- NRPG leadership role
- CARSI founder role
- Client testimonials
- Contractor testimonials

### New Pages Required

1. **NRPG Page** (`/nrpg`)
   - Industry resources
   - Best practices library
   - Standards documentation
   - Membership info

2. **CARSI Page** (`/carsi`)
   - Course catalog
   - Instructor bio
   - IICRC accreditation info
   - Enrollment process

3. **Course Pages** (`/carsi/courses/[id]`)
   - WRT CEC Course
   - ASD CEC Course
   - FSR CEC Course
   - AMRT CEC Course
   - Contents CEC Course

Each course page needs:
- Full curriculum
- Learning outcomes
- CEC hours awarded
- Prerequisites
- Enrollment CTA
- Instructor credentials

---

## INTERNAL LINKING STRATEGY

### Hub Pages
1. **Homepage**
   - Links to: Services, About Phill, NRPG, CARSI

2. **About Phill McGurk**
   - Links to: Services (as Master Restorer), NRPG (as Director), CARSI (as Instructor)

3. **NRPG Page**
   - Links to: About Phill, CARSI courses, Resources

4. **CARSI Page**
   - Links to: All course pages, About Phill

### Contextual Links

**From Service Pages**:
```html
<p>All water damage restoration is overseen by
<a href="/about-phil-mcgurk">Phill McGurk, Master Restorer</a>,
one of a limited number in Queensland. Our team follows strict
<a href="/nrpg">NRPG industry standards</a> and uses techniques
taught in our <a href="/carsi">IICRC-approved training courses</a>.
</p>
```

**From About Page**:
```html
<p>As Director of the <a href="/nrpg">National Restoration
Professionals Group (NRPG)</a>, Phill provides industry leadership.
He also teaches <a href="/carsi">IICRC continuing education courses</a>
through CARSI, sharing his expertise with restoration professionals
nationwide.</p>
```

**From NRPG Page**:
```html
<p>Led by <a href="/about-phil-mcgurk">Master Restorer Phill McGurk</a>,
NRPG provides resources for contractors. Professionals can enhance
their skills through our <a href="/carsi">CARSI CEC courses</a>.</p>
```

---

## TECHNICAL IMPLEMENTATION

### File Structure
```
components/
└── schema/
    └── EEAT-DualPositioning-Schema.tsx (✓ CREATED)

app/
├── page.tsx (UPDATE - add schema)
├── about-phil-mcgurk/
│   └── page.tsx (UPDATE - add enhanced schema)
├── services/
│   └── [...slug]/
│       └── page.tsx (UPDATE - add schema)
├── nrpg/
│   └── page.tsx (CREATE NEW)
├── carsi/
│   ├── page.tsx (CREATE NEW)
│   └── courses/
│       └── [courseId]/
│           └── page.tsx (CREATE NEW)
```

### Schema Validation Script
Create `scripts/validate-eeat-schemas.ts`:

```typescript
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';

async function validateSchemas() {
  const pageTypes = ['homepage', 'about', 'services', 'nrpg', 'carsi', 'course'];

  for (const pageType of pageTypes) {
    console.log(`Validating ${pageType}...`);

    // Generate schema
    const schema = EEATDualPositioningSchema({ pageType });

    // Send to Google Rich Results Test API
    // (Implement validation logic)
  }
}

validateSchemas();
```

---

## MONITORING & MEASUREMENT

### Google Search Console
Monitor these queries:
- "master restorer brisbane"
- "iicrc training australia"
- "water restoration cec course"
- "restoration industry training"
- "phill mcgurk"

### Expected Improvements
1. **Knowledge Panel**: Within 4-8 weeks
2. **Rich Results**: Within 2-4 weeks
3. **Course Rich Results**: Within 3-6 weeks
4. **Enhanced Local Pack**: Within 2-4 weeks

### Success Metrics
- [ ] Knowledge Panel for "Disaster Recovery Australia"
- [ ] Person Panel for "Phill McGurk"
- [ ] Course rich results for all 5 courses
- [ ] Enhanced local pack with credentials
- [ ] Increased impressions for contractor keywords
- [ ] Improved CTR on existing keywords (authority boost)

---

## DEPLOYMENT CHECKLIST

### Phase 1: Schema Implementation (Week 1)
- [x] Create EEAT-DualPositioning-Schema.tsx component
- [ ] Update homepage with schema
- [ ] Update About Phill page with schema
- [ ] Update service pages with schema
- [ ] Test all schemas with Google Rich Results Test

### Phase 2: New Pages (Week 2)
- [ ] Create NRPG page with content
- [ ] Create CARSI page with content
- [ ] Create 5 course pages
- [ ] Add internal linking between pages
- [ ] Test navigation flow

### Phase 3: Content Enhancement (Week 3)
- [ ] Update About page with full credentials
- [ ] Add professional photos with certificates
- [ ] Create contractor testimonials
- [ ] Add industry contribution examples
- [ ] Update homepage with dual positioning

### Phase 4: Validation & Submission (Week 4)
- [ ] Validate all schemas
- [ ] Submit sitemap to Google
- [ ] Request Knowledge Panel (via Google Business)
- [ ] Monitor Search Console for rich results
- [ ] Track keyword rankings

---

## CONCLUSION

This schema implementation positions **Disaster Recovery Australia** as:

1. **THE local emergency service** for Brisbane/Ipswich/Logan
2. **THE industry authority** via NRPG
3. **THE training provider** via CARSI
4. **Led by a Master Restorer** with proven expertise

**Competitive Advantage**: No other local restoration company has:
- Master Restorer credentials
- Industry association (NRPG)
- IICRC training capability (CARSI)
- All three combined in structured data

**Google sees**: Not just a restoration company, but an **industry leader** worthy of Knowledge Panel, enhanced local results, and authoritative rankings.

**Next Steps**: Execute deployment checklist phases 1-4.
