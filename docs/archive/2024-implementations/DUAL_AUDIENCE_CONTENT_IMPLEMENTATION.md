# Dual-Audience Content Implementation Guide

## Overview
This document contains all the comprehensive SEO content for the dual-audience website (emergency service clients + restoration contractors).

## Files Created

### 1. Homepage - Dual Audience (`app/page-dual-audience.tsx`) ✅ CREATED
- **Purpose**: Serve both emergency service clients AND restoration contractors
- **Key Sections**:
  - Hero with dual CTAs (Emergency: 1300 309 361 + IICRC Training)
  - Audience Selector (Client Path vs Contractor Path)
  - Emergency Services section for clients
  - NRPG + CARSI + IICRC CECs section for contractors
  - Master Restorer credentials
  - Dual final CTAs

### 2. NRPG Page (`app/nrpg/page.tsx`) ✅ CREATED
- **Word Count**: ~2,000 words
- **Target Keywords**: NRPG (20+ mentions), restoration network, IICRC network, CARSI, professional network
- **Sections**:
  - What is NRPG
  - 6 key membership benefits
  - Success stories (3 detailed testimonials)
  - Membership tiers (Standard vs Premium)
  - NRPG + CARSI integration
  - FAQ section (6 questions)
- **Meta Title**: "NRPG | National Restoration Professionals Group | Australia Restoration Network"
- **Meta Description**: "Join NRPG - Australia's premier restoration professionals network..."

### 3. CARSI Page (`app/carsi/page.tsx`) ⚠️ NEEDS COMPLETION
**Target**: 2,500 words with comprehensive IICRC training content

**Required Content Structure**:

```typescript
// Sections to include:
1. Hero Section
   - "CARSI: Cleaning and Restoration Science Institute"
   - "Earn IICRC Continuing Education Credits (CECs) Online"
   - "Learn from Master Restorer Phill McGurk"

2. What is CARSI? (400 words)
   - IICRC-approved training provider
   - Online self-paced courses
   - Taught by Master Restorer Phill McGurk
   - Partnership with NRPG
   - Accessibility for busy contractors

3. Why Choose CARSI? (6 benefits)
   - IICRC-Approved CECs
   - Master Restorer Instructor
   - 100% Online Learning
   - Flexible Scheduling
   - Practical Content
   - Affordable Pricing

4. Available Courses (detailed cards for each):
   A. Water Restoration Technician (WRT) CECs
      - 8-12 hours
      - Topics: moisture mapping, psychrometry, water categories, equipment
      - Link to /training/water-restoration-wrt

   B. Applied Structural Drying (ASD) CECs
      - 12-16 hours (ADVANCED badge)
      - Topics: psychrometry, thermal imaging, drying chamber, calculations
      - Link to /training/applied-structural-drying-asd

   C. Fire & Smoke Restoration (FSR) CECs
      - 10-14 hours
      - Topics: soot identification, smoke odor, thermal fogging, content restoration
      - Link to /training/fire-smoke-restoration-fsr

   D. Mould Remediation CECs
      - 8-12 hours
      - Topics: inspection, containment, HEPA filtration, air quality
      - Link to /training/mould-remediation

5. How CARSI Works (5 steps)
   - Choose Your Course
   - Enroll and Access Content
   - Learn at Your Own Pace
   - Complete Assessment
   - Receive Your CECs

6. Instructor Profile - Phill McGurk
   - IICRC & RAI Master Restorer
   - 20+ years experience
   - 500+ jobs completed
   - WRT, ASD, FSRT, AMRT certified
   - Teaching philosophy

7. FAQ Section (6 questions)
   - Are CARSI courses IICRC recognized?
   - How long to complete?
   - Need NRPG membership?
   - How many CECs required?
   - Refund policy?
   - Initial certification vs CECs?
```

**Keywords to Include**:
- CARSI (15+ mentions)
- IICRC CECs (25+ mentions)
- IICRC training (12+ mentions)
- continuing education credits (10+ mentions)
- restoration training (15+ mentions)
- Master Restorer (8+ mentions)

### 4. Contractor Portal Page (`app/contractor-portal/page.tsx`) ⚠️ NEEDS CREATION
**Target**: 1,500 words

**Content Structure**:
```
Hero:
- "Contractor Resources Portal"
- "NRPG Members | CARSI Training Access"

Sections:
1. Portal Overview (200 words)
2. Member Benefits Dashboard
   - NRPG network access
   - CARSI course library
   - Technical resources
   - Member directory
3. Quick Links (cards)
   - Enroll in CARSI courses
   - Access knowledge base
   - Download templates
   - Connect with peers
4. Featured Resources
   - Moisture mapping templates
   - Job documentation forms
   - Insurance claim guides
5. Recent Forum Posts (from NRPG community)
6. Upcoming Events & Training
```

### 5-8. Training Course Pages ⚠️ NEEDS CREATION

Each page should be 1,500+ words with this structure:

#### `/training/water-restoration-wrt/page.tsx`
```
Title: "Water Restoration Technician CEC Course | IICRC WRT | CARSI"
Keywords: WRT CECs, water restoration training, IICRC WRT, water damage training

Sections:
- Course Overview (300 words)
- Who Should Take This Course?
- Learning Outcomes (8-10 bullet points)
- Course Modules:
  1. Advanced Moisture Mapping
  2. Psychrometry for Technicians
  3. Water Damage Categories (1, 2, 3)
  4. Equipment Selection & Deployment
  5. Documentation Best Practices
  6. Insurance Claim Protocols
- Instructor Bio (Phill McGurk)
- Course Format & Duration
- IICRC CECs Awarded
- Prerequisites
- Enrollment Process
- FAQ (5 questions specific to WRT)
```

#### `/training/applied-structural-drying-asd/page.tsx`
```
Title: "Applied Structural Drying ASD CECs | IICRC ASD Training | CARSI"
Keywords: ASD CECs, structural drying training, psychrometry course, IICRC ASD

Sections:
- Course Overview (emphasize "advanced")
- Target Audience (experienced contractors)
- Learning Outcomes
- Course Modules:
  1. Advanced Psychrometry
  2. Vapor Pressure Differentials
  3. Thermal Imaging Techniques
  4. Drying Chamber Principles
  5. Material-Specific Drying
  6. Dehumidification Calculations
- Real-World Applications
- Equipment Training
- Assessment Details
- FAQ (ASD-specific)
```

#### `/training/fire-smoke-restoration-fsr/page.tsx`
```
Title: "Fire & Smoke Restoration FSR CECs | IICRC Fire Training | CARSI"
Keywords: FSR CECs, fire restoration training, smoke damage training, IICRC fire course

Sections:
- Course Overview
- Learning Outcomes
- Course Modules:
  1. Fire Damage Assessment
  2. Soot Type Identification
  3. Surface-Specific Cleaning
  4. Smoke Odor Elimination
  5. Thermal Fogging Techniques
  6. Hydroxyl & Ozone Treatment
  7. Content Restoration
- Brisbane Fire Restoration Context
- Safety Protocols
- Insurance Documentation
- FAQ
```

#### `/training/mould-remediation/page.tsx`
```
Title: "Mould Remediation CECs | IICRC Mould Training | CARSI"
Keywords: mould remediation CECs, IICRC AMRT, mould training, mould removal course

Sections:
- Course Overview
- Learning Outcomes
- Course Modules:
  1. Mould Inspection Protocols
  2. Air & Surface Sampling
  3. Containment Strategies
  4. HEPA Filtration Systems
  5. Safe Removal Techniques
  6. Antimicrobial Treatments
  7. Post-Remediation Verification
- Brisbane Mould Challenges (subtropical climate)
- Health & Safety
- Australian Standards
- FAQ
```

### 9. For Contractors Hub (`app/for-contractors/page.tsx`) ⚠️ NEEDS CREATION
**Target**: 2,000 words

**Content Structure**:
```
Hero:
- "Resources for Restoration Contractors"
- "NRPG Network | CARSI Training | Industry Excellence"

Sections:
1. Welcome to Restoration Professionals (300 words)
2. Three Pillars of Support:
   A. NRPG Membership
      - Network benefits
      - Knowledge base
      - Peer support
      - Link to /nrpg

   B. CARSI Training
      - IICRC CECs
      - Online courses
      - Master Restorer instruction
      - Link to /carsi

   C. Contractor Resources
      - Technical templates
      - Business tools
      - Marketing materials
      - Link to /contractor-portal

3. Success Path for Contractors:
   - Get IICRC certified
   - Join NRPG network
   - Earn CECs through CARSI
   - Access resources
   - Grow business

4. Testimonials (from contractors)

5. Available Training Courses (grid of 4 courses)

6. Membership Comparison Table
   - Non-member vs Standard vs Premium

7. Why Learn from Master Restorer Phill McGurk?

8. Getting Started (3-step process)

9. FAQ (contractor-focused questions)
```

### 10. IICRC CECs Explained (`app/iicrc-cecs/page.tsx`) ⚠️ NEEDS CREATION
**Target**: 1,800 words

**Content Structure**:
```
Hero:
- "IICRC Continuing Education Credits | Earn CECs Online"
- "Maintain Your Restoration Certifications"

Sections:
1. What Are IICRC CECs? (400 words)
   - Definition
   - Why they exist
   - IICRC's role in restoration industry
   - Importance for professionals

2. Why CECs Matter (300 words)
   - Maintain certification validity
   - Stay current with standards
   - Professional credibility
   - Insurance requirements
   - Competitive advantage

3. CEC Requirements by Certification:
   - WRT: 14 CECs per 4 years
   - ASD: Details
   - FSRT: Details
   - AMRT: Details
   - CCT: Details

4. How to Earn IICRC CECs (400 words)
   - CARSI online courses
   - In-person training
   - Industry conferences
   - Approved providers
   - CARSI advantages (online, flexible, Master Restorer)

5. CARSI Course Offerings (grid)
   - All 4 courses with CEC counts

6. Tracking Your CECs
   - IICRC certification card
   - Renewal dates
   - CARSI dashboard
   - Planning ahead

7. What Happens If CECs Expire?
   - Recertification requirements
   - Costs of letting certs lapse
   - Staying ahead

8. CARSI Makes CECs Easy
   - Online convenience
   - Affordable pricing
   - Quality instruction
   - NRPG member discounts

9. FAQ (8 questions)
   - How many CECs do I need?
   - When do CECs expire?
   - Can I earn CECs from multiple providers?
   - Do CECs carry over?
   - What if I let my certification lapse?
   - Are CARSI courses IICRC-approved?
   - How long does it take to complete courses?
   - Can I take courses before I need CECs?
```

## SEO Keyword Targets Across All Pages

### Primary Keywords (High Priority):
1. **NRPG** - Target 20+ mentions across pages
2. **CARSI** - Target 15+ mentions across pages
3. **IICRC CECs** - Target 25+ mentions across pages
4. **restoration training** - Target 30+ mentions across pages
5. **contractor resources** - Target 20+ mentions across pages
6. **IICRC approved courses** - Target 15+ mentions across pages

### Secondary Keywords:
- water restoration training
- fire restoration training
- mould remediation training
- ASD training
- restoration network Australia
- continuing education credits
- Master Restorer training
- restoration contractor education
- IICRC certification renewal
- online restoration courses

### Long-Tail Keywords:
- "how to earn IICRC CECs online"
- "IICRC water restoration continuing education"
- "restoration contractor network Australia"
- "CARSI online training courses"
- "NRPG membership benefits"
- "Master Restorer IICRC instructor"
- "applied structural drying training online"
- "restoration professionals group Australia"

## Internal Linking Strategy

### From Homepage:
- Link to /nrpg (NRPG section)
- Link to /carsi (CARSI training section)
- Link to /for-contractors (contractor resources)
- Link to /iicrc-cecs (CECs information)
- Link to all 4 training course pages
- Link to /about-phil-mcgurk (Master Restorer bio)
- Link to emergency service pages (existing)

### From NRPG Page:
- Link to /carsi (training partnership)
- Link to all 4 training courses
- Link to /for-contractors
- Link to /iicrc-cecs
- Link to /contractor-portal

### From CARSI Page:
- Link to /nrpg (member discounts)
- Link to all 4 training course pages
- Link to /iicrc-cecs (why CECs matter)
- Link to /for-contractors
- Link to /about-phil-mcgurk

### From Training Course Pages:
- Cross-link to other courses
- Link back to /carsi (course catalog)
- Link to /iicrc-cecs (CEC info)
- Link to /nrpg (member benefits)
- Link to /for-contractors (enrollment)

### From For Contractors Hub:
- Link to /nrpg
- Link to /carsi
- Link to all 4 training courses
- Link to /contractor-portal
- Link to /iicrc-cecs
- Link to /about-phil-mcgurk

### From IICRC CECs Page:
- Link to /carsi (earn CECs)
- Link to all 4 training courses
- Link to /nrpg (network support)
- Link to /for-contractors

## Metadata for Each Page

### NRPG:
```typescript
title: 'NRPG | National Restoration Professionals Group | Australia Restoration Network'
description: 'Join NRPG - Australia\'s premier restoration professionals network. Access industry resources, IICRC training, technical knowledge, and peer support.'
keywords: 'NRPG, National Restoration Professionals Group, restoration network Australia, IICRC network, restoration contractors, CARSI training'
```

### CARSI:
```typescript
title: 'CARSI | IICRC Training | Online CECs | Cleaning and Restoration Science Institute'
description: 'Earn IICRC continuing education credits (CECs) online through CARSI. Water Restoration, Fire & Smoke, Mould Remediation courses taught by Master Restorer Phill McGurk.'
keywords: 'CARSI, IICRC training, IICRC CECs, continuing education credits, water restoration training, ASD training, restoration training Australia'
```

### Contractor Portal:
```typescript
title: 'Contractor Portal | NRPG Members | CARSI Training Access | Resources'
description: 'Access NRPG resources, enroll in CARSI courses, download templates, and connect with restoration professionals across Australia.'
keywords: 'contractor portal, NRPG resources, CARSI training, restoration resources, contractor tools'
```

### WRT Training:
```typescript
title: 'Water Restoration Technician CEC Course | IICRC WRT | CARSI Training'
description: 'Earn IICRC Water Restoration Technician (WRT) CECs online. Advanced water damage restoration training taught by Master Restorer Phill McGurk.'
keywords: 'WRT CECs, water restoration training, IICRC WRT, water damage training, restoration technician course'
```

### ASD Training:
```typescript
title: 'Applied Structural Drying ASD CECs | IICRC ASD Training | CARSI'
description: 'Advanced IICRC Applied Structural Drying (ASD) CECs. Learn psychrometry, thermal imaging, and drying techniques from Master Restorer.'
keywords: 'ASD CECs, structural drying training, psychrometry course, IICRC ASD, drying technician training'
```

### FSR Training:
```typescript
title: 'Fire & Smoke Restoration FSR CECs | IICRC Fire Training | CARSI'
description: 'Earn IICRC Fire and Smoke Restoration (FSR) CECs online. Learn fire damage restoration, smoke odor removal, and content restoration.'
keywords: 'FSR CECs, fire restoration training, smoke damage training, IICRC fire course, fire damage restoration'
```

### Mould Training:
```typescript
title: 'Mould Remediation CECs | IICRC Mould Training | AMRT Course | CARSI'
description: 'Earn IICRC Mould Remediation CECs online. Safe mould removal protocols, containment strategies, and air quality management training.'
keywords: 'mould remediation CECs, IICRC AMRT, mould training, mould removal course, mould contractor training'
```

### For Contractors:
```typescript
title: 'Resources for Restoration Contractors | NRPG | CARSI | IICRC Training'
description: 'Complete restoration contractor resources. Join NRPG network, earn IICRC CECs through CARSI, access technical resources, and grow your restoration business.'
keywords: 'restoration contractor resources, NRPG, CARSI training, IICRC CECs, contractor network, restoration business'
```

### IICRC CECs:
```typescript
title: 'IICRC Continuing Education Credits | Earn CECs Online | CARSI Courses'
description: 'Learn about IICRC continuing education credits (CECs). How to earn CECs online, requirements by certification, and CARSI course offerings.'
keywords: 'IICRC CECs, continuing education credits, IICRC renewal, restoration certification, earn CECs online'
```

## Implementation Priority

### Phase 1 (Immediate):
1. ✅ Replace homepage with dual-audience version (page-dual-audience.tsx)
2. Complete CARSI page (2,500 words)
3. Create For Contractors hub (2,000 words)
4. Create IICRC CECs page (1,800 words)

### Phase 2 (Week 1):
5. Create all 4 training course pages (1,500 words each)
6. Create Contractor Portal page (1,500 words)

### Phase 3 (Week 2):
7. Update About Phill McGurk page to emphasize dual role (Master Restorer + Instructor)
8. Add contractor CTAs to existing service pages
9. Update footer with contractor resources section
10. Create sitemap entries for all new pages

## Content Writing Guidelines

### E-E-A-T Signals to Include:
- **Experience**: "20+ years of hands-on restoration work"
- **Expertise**: "IICRC and RAI Master Restorer certified"
- **Authoritativeness**: "One of Brisbane's limited Master Restorers"
- **Trustworthiness**: "IICRC-approved training provider"

### Tone & Style:
- **For Clients**: Urgent, reassuring, empathetic
- **For Contractors**: Professional, educational, peer-to-peer
- **Overall**: Authoritative but accessible

### Call-to-Actions:
- **Clients**: "Call Now: 1300 309 361" | "24/7 Emergency Service"
- **Contractors**: "View Courses" | "Join NRPG" | "Earn CECs"

### Word Count Targets:
- NRPG: 2,000+ words ✅
- CARSI: 2,500+ words ⚠️
- Contractor Portal: 1,500+ words
- Each Training Page: 1,500+ words
- For Contractors: 2,000+ words
- IICRC CECs: 1,800+ words

**Total New Content: ~13,000 words**

## Next Steps

1. Review and approve dual-audience homepage approach
2. Complete CARSI page with full 2,500-word content
3. Create remaining 6 pages
4. Update navigation to include contractor section
5. Add structured data (FAQ schema, Course schema, etc.)
6. Internal linking implementation
7. Update sitemap.xml
8. Submit to search engines

## Notes
- All pages target both Brisbane emergency services AND national contractor training
- Phill McGurk positioned as both service provider AND educator
- NRPG, CARSI, and IICRC CECs are new keyword opportunities
- Dual CTAs on every page (emergency + training)
- Cross-linking strategy maximizes SEO value
