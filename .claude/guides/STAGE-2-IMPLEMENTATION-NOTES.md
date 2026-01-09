# Stage 2 Implementation Notes

> Australian Insurance Education Guides - Ready for Production
> Status: Complete - Ready for Sanity CMS & Website Integration
> Date Completed: 2026-01-09
> Next Phase: Website Navigation & Integration

---

## Stage 2 Deliverables - Summary

### ✅ Master Guide Documentation
**File**: `INSURANCE-EDUCATION-GUIDES.md`
- 7 complete guide specifications with all metadata
- Step-by-step content for each guide
- SEO configurations (meta titles, descriptions, keywords)
- Related guide links between guides
- Downloadable resource specifications

### ✅ Four Downloadable Checklists
1. **CHECKLIST-1-Insurance-Claim-Photo-Guide.md**
   - Comprehensive photography documentation checklist
   - Room-by-room photography guide
   - Professional best practices
   - Quality assurance checklist
   - Format: Printable PDF

2. **CHECKLIST-2-Documentation-Gathering-Template.md**
   - Proof of ownership documentation
   - Contents inventory template
   - Professional quotes tracker
   - Business claims section
   - Format: Fillable PDF + Excel spreadsheet

3. **CHECKLIST-3-AFCA-Complaint-Template.md**
   - Formal complaint letter template
   - AFCA submission guide
   - Timeline documentation
   - Supporting evidence checklist
   - Format: Fillable PDF

4. **CHECKLIST-4-Excess-Calculator-Worksheet.md**
   - Break-even calculation tool
   - Decision matrix
   - Scenario planning
   - Premium impact analysis
   - Format: Interactive PDF/Excel

---

## Sanity CMS Implementation Steps

### Step 1: Create Category
Before creating guides, create this category in Sanity:

```
Name: Insurance Education
Slug: insurance-education
Description: Comprehensive guides on Australian property insurance,
             claims processes, and consumer rights
Color: #4F46E5 (Indigo)
Icon: shield-alert
Order: 5
```

### Step 2: Create Guides (Recommended Order)
Create in Sanity using `guide.ts` schema with this order:

**Week 1-2**:
1. Guide 1: Understanding Australian Property Insurance Policies (Featured ✓)
2. Guide 2: Mandatory vs Optional Coverage (Featured ✓)
3. Guide 3: Your Rights as Insurance Claimant (Featured ✓)

**Week 2-3**:
4. Guide 4: Building vs Contents Insurance Explained
5. Guide 5: Business Property Insurance Essentials
6. Guide 6: When to Claim - Understanding Excesses
7. Guide 7: Insurance Policy Exclusions

### Step 3: Upload Downloadable Resources
For each guide, upload associated PDF/Excel files:

**Guide 1 Downloads**:
- None

**Guide 2 Downloads**:
- Documentation Gathering Template (CHECKLIST-2)

**Guide 3 Downloads**:
- AFCA Complaint Template (CHECKLIST-3)

**Guide 4 Downloads**:
- None

**Guide 5 Downloads**:
- Documentation Gathering Template - Business (CHECKLIST-2, Business section)

**Guide 6 Downloads**:
- Excess Calculator Worksheet (CHECKLIST-4)

**Guide 7 Downloads**:
- Insurance Claim Photo Checklist (CHECKLIST-1)

### Step 4: Configure Related Guides
Link guides together for navigation:
- Guide 1 ↔ Guides 2, 4, 7
- Guide 2 ↔ Guides 1, 4, 7
- Guide 3 ↔ Guides 6, 7
- Guide 4 ↔ Guides 1, 2
- Guide 5 ↔ Guides 1, 2, 6
- Guide 6 ↔ Guides 3, 7
- Guide 7 ↔ Guides 1, 2, 3

---

## Website Navigation Integration

### 🎯 User's Suggestion: Header & Footer Dropdown

The user correctly identified that these guides need better discoverability. Implementation approach:

### Header Navigation Dropdown

**Location**: Main navigation bar (right side, before CTA button)

**Dropdown Structure**:
```
Resources ▼
├─ Guides
│  ├─ Understanding Property Insurance (Guide 1)
│  ├─ Coverage Options (Guide 2)
│  ├─ Your Consumer Rights (Guide 3)
│  ├─ Building vs Contents (Guide 4)
│  ├─ Business Insurance (Guide 5)
│  ├─ When to Claim (Guide 6)
│  ├─ Policy Exclusions (Guide 7)
│  └─ ──────────────────────────
│     All Guides →
├─ Blog
├─ FAQ
└─ Contact Support
```

**Technical Implementation**:
- Add `insurance-guides` dropdown component
- Query Sanity for guides in "Insurance Education" category
- Order by featured status (featured first)
- Link to `/resources/guides/[slug]`
- Add chevron icon to indicate dropdown

### Footer Navigation Dropdown

**Location**: Footer Resources section (bottom of page)

**Footer Structure**:
```
RESOURCES
├─ Insurance Guides
│  ├─ Understanding Property Insurance
│  ├─ Coverage Options
│  ├─ Your Consumer Rights
│  ├─ Building vs Contents
│  ├─ Business Insurance
│  ├─ When to Claim
│  └─ Policy Exclusions
├─ Knowledge Base
├─ FAQ
└─ Contact Us
```

**Technical Implementation**:
- Add footer section for Insurance Guides
- Display first 5 guides (alphabetical or featured)
- Link "All Guides" to `/resources/guides` collection page
- Keep footer width consistent (2-3 columns)

### Additional Navigation Improvements

#### Breadcrumb Navigation
```
Resources > Guides > Understanding Property Insurance
```

#### Sidebar Navigation
On guide pages, show:
- Previous guide
- Next guide
- Related guides (from guide metadata)
- Back to all guides button

#### Search Integration
- Include guides in site search
- Filter by category "Insurance Education"
- Index guide titles, descriptions, content

#### Mobile Responsive
- Hamburger menu includes Resources dropdown
- Guides listed in mobile menu with clear hierarchy
- Tap to expand/collapse sections
- Swipe between guides navigation

---

## File Structure for Implementation

```
.claude/guides/
├── INSURANCE-EDUCATION-GUIDES.md          (Master specification)
├── STAGE-2-IMPLEMENTATION-NOTES.md        (This file)
├── CHECKLIST-1-Insurance-Claim-Photo-Guide.md
├── CHECKLIST-2-Documentation-Gathering-Template.md
├── CHECKLIST-3-AFCA-Complaint-Template.md
├── CHECKLIST-4-Excess-Calculator-Worksheet.md
└── [When created in Sanity]
    ├── guides/understanding-property-insurance
    ├── guides/mandatory-vs-optional-coverage
    ├── guides/insurance-rights-australian-law
    ├── guides/building-vs-contents-insurance
    ├── guides/business-property-insurance-essentials
    ├── guides/when-to-claim-understanding-excesses
    └── guides/insurance-exclusions-guide
```

---

## SEO Optimization - Quick Reference

### Keyword Targets by Guide

**Guide 1: Understanding Property Insurance**
- Primary: "property insurance Australia", "insurance guide", "PDS"
- Secondary: "building insurance explained", "contents insurance", "insurance terms"

**Guide 2: Mandatory vs Optional Coverage**
- Primary: "mandatory insurance coverage", "optional insurance add-ons", "flood cover"
- Secondary: "insurance exclusions", "coverage options", "insurance protection"

**Guide 3: Your Rights as Insurance Claimant**
- Primary: "insurance claim process", "AFCA complaint", "consumer rights Australia"
- Secondary: "Code of Practice", "insurance escalation", "fair claim handling"

**Guide 4: Building vs Contents Insurance**
- Primary: "building vs contents insurance", "difference between building contents"
- Secondary: "strata insurance", "property insurance explained", "renter insurance"

**Guide 5: Business Property Insurance**
- Primary: "commercial property insurance", "business insurance Australia"
- Secondary: "business interruption insurance", "small business insurance", "equipment coverage"

**Guide 6: When to Claim**
- Primary: "insurance excess", "insurance claim premium increase", "when to claim insurance"
- Secondary: "claim costs", "insurance break-even", "claim decision"

**Guide 7: Insurance Exclusions**
- Primary: "insurance exclusions explained", "what insurance doesn't cover"
- Secondary: "insurance misconceptions", "coverage gaps", "policy limitations"

### Internal Linking Strategy

Link guides from:
- Blog posts about insurance topics → relevant guide
- FAQ answers about coverage → relevant guide
- City/suburb pages for insurance-related questions → guides
- Contractor education materials → relevant guides

### Backlink Opportunities

- Insurance industry blogs and forums
- Consumer rights websites
- Australian government sites (Link to AFCA, Code of Practice)
- Financial education sites
- Local council websites (flood information links)

---

## Conversion Opportunities

### Call-to-Action Suggestions

After each guide, place CTA buttons:

1. **"Get Matched with Contractors"**
   - Button links to contractor matching flow
   - Appropriate for guides about claims, restoration

2. **"Learn About Our Disaster Recovery Services"**
   - Generic button linking to main services page
   - Suitable after all guides

3. **"Download Our [Relevant] Checklist"**
   - Download relevant PDF from guide
   - Placed prominently in each guide

4. **"Have More Questions? Contact Support"**
   - Email link to support@disasterrecovery.com.au
   - Shows responsiveness to user questions

### Email Capture Opportunities

- Gate optional checklists behind email signup (Optional but recommended)
- "Download PDF" button triggers email form
- Builds email list for nurturing campaigns
- Completes with free PDF download

Example CTA:
```
Get our free Insurance Claim Photo Checklist (PDF)
[Enter Email] [Download]

(Unsubscribe anytime - we respect your privacy)
```

---

## Analytics Tracking

### Events to Track

1. **Guide Views**
   - GA4 event: `view_guide`
   - Parameter: guide_slug, guide_title, category

2. **Checklist Downloads**
   - GA4 event: `download_resource`
   - Parameter: resource_name, guide_source

3. **Guide Engagement**
   - Scroll depth (% of guide read)
   - Time on page
   - Related guides clicked
   - Download rates

4. **Navigation Patterns**
   - Which guides most viewed
   - Which related guide links clicked
   - Dropdown vs direct access
   - Mobile vs desktop views

### Reporting Goals

- Track if guides drive contractor matching signups (conversion)
- Measure engagement vs bounce rate
- Identify most valuable guides (traffic & conversions)
- Optimize based on user behavior

---

## Content Update Schedule

### Quarterly Review
- January: AFCA changes, Code of Practice updates
- April: Post-tax-time insurance questions review
- July: Professional Indemnity Act changes (NSW 2026)
- October: Year-end insurance planning updates

### Annual Deep Dive
- Review all guides for accuracy
- Update case examples and scenarios
- Refresh AFCA process information
- Update contact information and resources

### Trigger Updates
- AFCA decision limits change ($631,500 currently)
- Code of Practice updated (next review 2027)
- Major regulatory changes (e.g., NSW Professional Indemnity July 2026)
- New disaster recovery insights from claims

---

## Accessibility Checklist

Ensure guides meet WCAG 2.1 AA standards:

- [ ] All images have alt text (filled in guide metadata)
- [ ] Color contrast meets WCAG AA (check headings)
- [ ] Links have descriptive anchor text (not "click here")
- [ ] Headings use proper hierarchy (H1, H2, H3, etc.)
- [ ] Tables have headers and caption (for checklists)
- [ ] Forms have labels (downloadable checklists)
- [ ] Videos have captions (if using video later)
- [ ] PDFs are tagged/accessible (when converting checklists)

---

## Mobile Responsiveness

### Checklist
- [ ] Guides responsive on 375px width (mobile)
- [ ] Checklists printable on 210x297mm (A4)
- [ ] Images scale properly on mobile
- [ ] Related guides section visible on mobile
- [ ] Download buttons accessible on mobile
- [ ] Navigation dropdown works on touch
- [ ] Font size readable on mobile (minimum 16px)

---

## Timeline for Implementation

### Week 1: Sanity CMS Setup
- [ ] Create Insurance Education category
- [ ] Create 7 guides in Sanity CMS
- [ ] Configure related guide links
- [ ] Upload downloadable PDFs/Excel files

### Week 2: Website Integration
- [ ] Add header navigation dropdown
- [ ] Add footer navigation section
- [ ] Update breadcrumb navigation
- [ ] Add sidebar guide navigation
- [ ] Test responsive design

### Week 3: SEO & Analytics
- [ ] Configure GA4 event tracking
- [ ] Implement internal linking
- [ ] Update robots/sitemap for guides
- [ ] Set up Google Search Console monitoring
- [ ] Create backlink outreach list

### Week 4: Launch & Promotion
- [ ] Soft launch to existing users
- [ ] Monitor initial analytics
- [ ] Iterate based on feedback
- [ ] Press release/blog announcement
- [ ] Email list announcement

---

## Success Metrics (6-Month Targets)

### Engagement
- [ ] 30% of clients view at least 1 guide
- [ ] Average time on guide: 8+ minutes
- [ ] 20%+ of guide viewers download checklist
- [ ] 15%+ proceed to contractor matching after guide

### Traffic
- [ ] 500+ organic visits/month to guides (Month 6)
- [ ] Top 3 guides rank page 1 for primary keywords
- [ ] 40%+ traffic from organic search
- [ ] 30%+ traffic from header/footer navigation

### Conversions
- [ ] 5%+ of guide viewers sign up for contractors
- [ ] 10% click-through from guide to services page
- [ ] 1,000+ email subscribers from checklist downloads

### Quality
- [ ] <5% bounce rate (high engagement)
- [ ] 95%+ page load speed (Core Web Vitals green)
- [ ] 0 accessibility issues (WCAG AA)
- [ ] 0 SEO technical errors

---

## Monitoring & Optimization

### Monthly Checklist
- [ ] Review GA4 analytics
- [ ] Check Google Search Console for new queries
- [ ] Monitor bounce rate by guide
- [ ] Check load times (Core Web Vitals)
- [ ] Review user feedback/comments
- [ ] Identify low-performing guides

### Optimization Actions
- If guide bounce rate >40%, improve:
  - Page speed
  - First paragraph clarity
  - Visual formatting (add images)
  - CTA prominence

- If guide conversion <3%, improve:
  - CTA copy and positioning
  - Related guide links
  - Trust signals/testimonials
  - Form friction reduction

---

## Next Phase: Stage 3

Stage 2 is complete. Ready to proceed to **Stage 3: Marketing Content** (Weeks 5-6)

Stage 3 Deliverables:
- 7 insurer-specific landing pages (`/insurance/[insurer]-approved-contractors`)
- 21 email campaign templates (3 per insurer × 7 insurers)
- SEO strategy and keyword targeting
- Backlink acquisition plan

Ready to begin when requested.

---

**Document Status**: ✅ Complete - Ready for Implementation Team

**Questions or Issues**: Contact user for clarification before proceeding with Sanity setup
