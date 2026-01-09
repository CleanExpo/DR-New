# Stage 4: Implementation Notes & Technical Checklist

> Contractor Training Program Implementation
> Status: Ready for Development
> Created: 2026-01-09
> Timeline: 4-6 weeks (Weeks 7-10)

---

## Implementation Overview

### Deliverables
| Item | Status | Owner | Timeline |
|------|--------|-------|----------|
| **4 Training Modules** | Specs ✅ | Video Production | Weeks 7-8 |
| **21 Quiz Questions** | Specs ✅ | Content | Week 7 |
| **LMS Setup** | Pending | Tech | Week 7 |
| **Database Schema** | Specs ✅ | Backend Dev | Week 7 |
| **Integration** | Pending | Full Stack | Week 8 |
| **Testing** | Pending | QA | Week 9 |
| **Launch** | Pending | All Teams | Week 10 |

### Timeline

```
Week 1 (Planning & Setup):
├─ Finalize video scripts & production schedule
├─ Select LMS platform
├─ Plan database schema updates
├─ Assign video production team
└─ Create detailed production schedule

Week 2-3 (Development):
├─ Produce 4 training videos
├─ Build quiz assessment system
├─ Create contractor dashboard UI
├─ Implement database schema
└─ Set up LMS platform

Week 4 (Integration & Testing):
├─ Integrate videos into platform
├─ Link quizzes to modules
├─ Test database connections
├─ Quality assurance testing
└─ Accessibility testing (WCAG AA)

Week 5 (Pilot & Launch):
├─ Pilot with 5-10 contractors (internal test group)
├─ Gather feedback & iterate
├─ Fix any issues discovered
└─ Full launch to all contractors
```

---

## Video Production Planning

### Module Production Schedule

**Module 1: Insurance Policy Recognition** (25 min video)
- Section 1: Understanding Policy Types (10 min) - 5 days
- Section 2: Identifying Coverage Gaps (8 min) - 5 days
- Section 3: Professional Communication (7 min) - 5 days
- Total: 15 days production

**Module 2: Documentation Standards** (18 min video)
- Section 1: Professional Photography (8 min) - 4 days
- Section 2: Quote Formatting (6 min) - 3 days
- Section 3: Scope of Work (4 min) - 3 days
- Total: 10 days production

**Module 3: Three-Way Communication** (35 min video)
- Section 1: Managing Expectations (10 min) - 5 days
- Section 2: Communicating with Adjusters (10 min) - 5 days
- Section 3: Handling Disputes (8 min) - 4 days
- Section 4: Status Updates (7 min) - 4 days
- Total: 18 days production

**Module 4: Contractor Insurance** (15 min video)
- Section 1: Public Liability (6 min) - 3 days
- Section 2: Workers Comp (5 min) - 3 days
- Section 3: Professional Indemnity (4 min) - 2 days
- Total: 8 days production

**Total Production Time**: 51 days (7-8 weeks with parallel production)

### Production Checklist

**Pre-Production** (Week 1)
- [ ] Finalize all video scripts (4 scripts)
- [ ] Create storyboards for each section
- [ ] Identify visual examples (actual policies, quotes, emails)
- [ ] Gather contractor testimonials (if including)
- [ ] Book studio/recording space
- [ ] Hire videographer/producer
- [ ] Arrange instructor/speaker
- [ ] Create production timeline
- [ ] Secure all copyright permissions for examples

**Production** (Weeks 2-3)
- [ ] Module 1 production (Week 2)
- [ ] Module 2 production (Week 2)
- [ ] Module 3 production (Week 3)
- [ ] Module 4 production (Week 3)
- [ ] Screen recordings for visual examples
- [ ] Animation for key concepts
- [ ] Graphics for data visualizations
- [ ] Intro/outro sequences for each module

**Post-Production** (Week 4)
- [ ] Video editing (color correction, transitions)
- [ ] Audio editing (clean background noise, levels)
- [ ] Add captions/subtitles (CC)
- [ ] Graphics & animations integration
- [ ] Add background music (royalty-free)
- [ ] Video reviews & revisions
- [ ] Export final files (MP4, H.264)
- [ ] Upload to LMS
- [ ] Create thumbnail images

### Video Script Requirements

**Each Module Script Should Include**:
- [ ] Scene-by-scene breakdown
- [ ] Dialogue/narration (word-for-word)
- [ ] Visual elements (on-screen text, graphics, screenshots)
- [ ] Timing notes (length of each section)
- [ ] Suggested transitions
- [ ] Audio cues (background music, sound effects)
- [ ] Interactive pause points (for reflection)

**Script Format**:
```
SCENE 1: INTRO

VISUAL: Title card with module name, duration, learning objectives
AUDIO: Background music (upbeat, professional)
NARRATION: "Welcome to Module 1: Insurance Policy Recognition. In this 25-minute module, you'll learn to identify building and contents insurance, understand coverage gaps, and communicate professionally with clients about their policy. Let's get started."

[Timing: 0:30]

SCENE 2: UNDERSTANDING POLICY TYPES

VISUAL: Screen recording of actual insurance policy document
TEXT OVERLAY: "Building Insurance = Structure + Permanent Fixtures"
NARRATION: "Let's start with building insurance. Building insurance covers the structure of the property and permanent fixtures like roofing, walls, bathrooms, and built-in kitchens..."

[Timing: 10:00 total for section]

... (continue for all scenes)
```

---

## LMS Platform Selection

### Evaluation Criteria

| Feature | Teachable | Kajabi | Moodle | Custom |
|---------|-----------|--------|--------|--------|
| Cost | $99/mo | $119/mo | Free | $5K-15K |
| Ease of Use | ★★★★★ | ★★★★★ | ★★★ | ★★★★ |
| Video Hosting | Built-in | Built-in | Via upload | Built-in |
| Quizzes | ★★★★ | ★★★★★ | ★★★★ | ★★★★★ |
| Mobile Responsive | ★★★★★ | ★★★★★ | ★★★★ | ★★★★★ |
| Accessibility | ★★★★ | ★★★★ | ★★★★ | Custom |
| Database Integration | Limited | Limited | Yes | Yes |
| Automation/Workflows | ★★★ | ★★★★★ | ★★★★ | Yes |
| Certification Gen | ★★★★ | ★★★★★ | ★★★★ | Yes |
| Support | Good | Excellent | Community | Varies |

### Recommendation: Teachable or Kajabi (for simplicity) OR Custom Build (for full integration)

**If choosing Teachable**:
- Pros: Affordable, easy to set up, good for contractors
- Cons: Limited database integration, need to sync contractor data
- Setup time: 1-2 weeks

**If choosing Custom Build**:
- Pros: Full integration with NRPG contractor database, seamless experience
- Cons: More expensive, longer development time
- Setup time: 3-4 weeks

---

## Database Schema Implementation

### Prisma Schema Additions

```prisma
// Add to existing ContractorProfile model:

model ContractorProfile {
  // ... existing fields ...

  // Insurance Training
  insuranceTrainingCompleted Boolean @default(false)
  insuranceTrainingCompletionDate DateTime?

  // Module Completions
  module1Completed Boolean @default(false)
  module1CompletionDate DateTime?
  module1QuizScore Int?
  module1QuizAttempts Int @default(0)
  module1QuizPassed Boolean @default(false)

  module2Completed Boolean @default(false)
  module2CompletionDate DateTime?
  module2QuizScore Int?
  module2QuizAttempts Int @default(0)
  module2QuizPassed Boolean @default(false)

  module3Completed Boolean @default(false)
  module3CompletionDate DateTime?
  module3QuizScore Int?
  module3QuizAttempts Int @default(0)
  module3QuizPassed Boolean @default(false)

  module4Completed Boolean @default(false)
  module4CompletionDate DateTime?
  module4QuizScore Int?
  module4QuizAttempts Int @default(0)
  module4QuizPassed Boolean @default(false)

  // Certifications
  insuranceCertifications String[] @default([]) // ["MODULE_1_COMPLETE", "MODULE_2_COMPLETE", "MODULE_3_COMPLETE", "MODULE_4_COMPLETE"]
  lastInsuranceRefresher DateTime?
  nextInsuranceRefresherDue DateTime? // Auto-calculated: 365 days after module completion

  // Insurance Verification
  publicLiabilityInsuranceVerified Boolean @default(false)
  publicLiabilityAmount String? // "$10M"
  publicLiabilityCertificateExpiry DateTime?

  workersCompensationVerified Boolean @default(false)
  workersCompensationState String? // "NSW", "VIC", etc.
  workersCompensationExpiryDate DateTime?

  professionalIndemnityInsuranceVerified Boolean @default(false)
  professionalIndemnityAmount String?
  professionalIndemnityExpiryDate DateTime?

  // Training Relationship
  trainingLogs TrainingLog[]
  insuranceVerification InsuranceVerification?
}

// New Models:

model TrainingLog {
  id String @id @default(cuid())
  contractorId String
  contractor ContractorProfile @relation(fields: [contractorId], references: [id], onDelete: Cascade)

  moduleNumber Int // 1, 2, 3, 4
  action String // "started", "completed", "quiz_attempted", "quiz_passed", "quiz_failed"

  quizScore Int? // If quiz taken
  quizAttemptNumber Int @default(1)

  startedAt DateTime @default(now())
  completedAt DateTime?

  metadata String? // JSON for additional data

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([contractorId])
  @@index([moduleNumber])
}

model InsuranceVerification {
  id String @id @default(cuid())
  contractorId String @unique
  contractor ContractorProfile @relation(fields: [contractorId], references: [id], onDelete: Cascade)

  publicLiabilityVerified Boolean @default(false)
  publicLiabilityDocumentUrl String?
  publicLiabilityExpiryDate DateTime?

  workersCompensationVerified Boolean @default(false)
  workersCompensationDocumentUrl String?
  workersCompensationExpiryDate DateTime?

  professionalIndemnityVerified Boolean @default(false)
  professionalIndemnityDocumentUrl String?
  professionalIndemnityExpiryDate DateTime?

  verifiedBy String? // Email of verifying admin
  verifiedAt DateTime?

  nextVerificationDue DateTime

  notes String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model TrainingCertificate {
  id String @id @default(cuid())
  contractorId String
  contractor ContractorProfile @relation(fields: [contractorId], references: [id], onDelete: Cascade)

  moduleNumber Int // 1, 2, 3, 4
  certificateUrl String // PDF download link
  certificateNumber String @unique // Unique identifier for certificate

  issuedAt DateTime @default(now())
  expiresAt DateTime // 365 days from issue

  createdAt DateTime @default(now())
}
```

### Migration Instructions

```bash
# Create and apply migration
npx prisma migrate dev --name add_training_modules

# Push schema to database
npx prisma db push

# Update Prisma client
npx prisma generate
```

---

## Contractor Dashboard UI Components

### Pages to Create

**Training Dashboard** (`/app/contractor/training/page.tsx`)
```
Shows:
- Overall training status (% complete)
- Module progress cards (4 cards, one per module)
  - Module name
  - Status (Not started / In progress / Completed)
  - Quiz score (if taken)
  - Start/continue/retake button
- Certificate area (if all modules complete)
- Refresher due date (if applicable)
- Insurance verification status
```

**Module Player** (`/app/contractor/training/[moduleId]/page.tsx`)
```
Shows:
- Video player (with progress bar, playback speed)
- Module content outline (sections)
- Learning objectives
- Quiz link (after video complete)
- Progress indicator
```

**Quiz Component** (`/app/contractor/training/[moduleId]/quiz/page.tsx`)
```
Shows:
- Quiz questions (one per page or all on one page)
- Submit button
- Progress indicator (question X of Y)
- Timer (optional)
- Passing score requirement (shown before starting)
- Results after submission
```

**Certificate** (`/app/contractor/training/certificates/page.tsx`)
```
Shows:
- List of earned certificates
- Certificate details (module, date earned)
- Download PDF button
- Print button
- Share button (optional)
```

### Contractor Database Migration

**Update Existing Contractors**:
```sql
-- Set training as not started for all existing contractors
UPDATE "ContractorProfile"
SET
  "insuranceTrainingCompleted" = false,
  "nextInsuranceRefresherDue" = now() + interval '60 days'
WHERE "id" != '';
```

**Communication**:
- Email all contractors: "New training requirement for insurance-backed jobs"
- Explain: 4 modules, 2 hours total, mandatory
- Deadline: 60 days to complete
- Emphasize: Better training = faster claim approvals

---

## Testing Checklist

### Module Testing

**Video Playback**:
- [ ] Play on desktop (Chrome, Firefox, Safari)
- [ ] Play on mobile (iOS Safari, Android Chrome)
- [ ] Test quality at different speeds (0.75x, 1x, 1.25x, 1.5x)
- [ ] Subtitles display correctly
- [ ] Audio quality clear
- [ ] No stuttering or buffering

**Quiz Functionality**:
- [ ] Questions load correctly
- [ ] Submit button works
- [ ] Answers saved properly
- [ ] Score calculated correctly
- [ ] Passing/failing logic works
- [ ] Retake button appears (if failed)
- [ ] Certificate generates (if passed)

**Mobile Responsive**:
- [ ] Videos adjust to screen size
- [ ] Quiz questions readable on mobile
- [ ] Buttons touch-friendly (44px+ height)
- [ ] No horizontal scrolling
- [ ] Navigation accessible on mobile

**Accessibility**:
- [ ] Captions provided for all videos
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen reader compatible
- [ ] High contrast text (WCAG AA)
- [ ] No color-only information
- [ ] Focus indicators visible

### Integration Testing

**Database**:
- [ ] Training log records created
- [ ] Quiz scores saved
- [ ] Module completion dates recorded
- [ ] Certificate generated and stored
- [ ] Next refresher date calculated

**Contractor Portal**:
- [ ] Dashboard shows correct progress
- [ ] Module links work
- [ ] Quiz scores display
- [ ] Certificates downloadable
- [ ] Insurance status shows correctly

**Notifications**:
- [ ] Completion email sent
- [ ] Reminder emails at 30/60/90 days
- [ ] Certificate email includes PDF attachment

### Security Testing

- [ ] Contractors can only see their own training
- [ ] Admin can view all contractor progress
- [ ] Quiz answers can't be modified after submission
- [ ] Certificates are tamper-proof (digital signature if possible)
- [ ] PDF downloads require authentication

---

## Launch Checklist

### Pre-Launch (1 week before)

- [ ] All videos uploaded and tested
- [ ] All quizzes functional
- [ ] Database fully integrated
- [ ] Dashboard UI complete
- [ ] Email notifications working
- [ ] Documentation written (for contractors)
- [ ] FAQ prepared (common questions)
- [ ] Support team trained on program

### Soft Launch (Internal Testing)

**Invite 5-10 Contractors**:
- [ ] Mix of new and existing contractors
- [ ] Different backgrounds/experience levels
- [ ] Represent different service types (water, fire, mould, etc.)

**Collect Feedback**:
- [ ] Module clarity (can you understand the content?)
- [ ] Quiz difficulty (fair assessment of learning?)
- [ ] Technical issues (any glitches?)
- [ ] Suggestions (what would improve this?)
- [ ] Time estimates (accurate?)

**Timeline**: 1 week soft launch, collect feedback, iterate

### Full Launch

- [ ] Send announcement email to all contractors
- [ ] Update contractor portal (highlight training section)
- [ ] Post to contractor Facebook group (if you have one)
- [ ] Create onboarding email sequence (new contractors)
- [ ] Set deadlines for completion (60 days recommended)
- [ ] Monitor enrollment and progress
- [ ] Provide support/answer questions
- [ ] Weekly progress reports to management

---

## Communication Plan

### Announcement Email (Send at Launch)

```
Subject: Important: New Contractor Training Program - Required for Insurance Jobs

Hi [Contractor Name],

We're introducing a new, comprehensive training program to help you master
insurance claim handling and documentation.

WHAT'S INCLUDED:
✓ 4 short training modules (2 hours total)
✓ Insurance policy recognition
✓ Professional photo documentation
✓ Three-way communication skills
✓ Insurance requirements verification

WHY IT MATTERS:
→ Better trained contractors = faster claim approvals
→ Clearer documentation = fewer back-and-forths
→ Professional communication = happier clients and insurers
→ Industry standard = increasingly required by clients

DEADLINE:
Please complete all 4 modules within 60 days.
After [DATE], you won't be able to accept insurance-backed jobs
without current certification.

GET STARTED:
Log into your NRPG contractor portal
Click "Training" in the dashboard
Start Module 1 (25 minutes)

QUESTIONS?
Email support@disasterrecovery.com.au
We're here to help!

Best regards,
NRPG Team
```

### Reminder Email (30 Days Before Deadline)

```
Subject: Reminder: Complete Your NRPG Training (30 Days Left)

Hi [Contractor Name],

Just a friendly reminder that your NRPG training deadline is [DATE] -
that's 30 days from now.

YOUR PROGRESS:
✓ Module 1: [Status]
✓ Module 2: [Status]
✓ Module 3: [Status]
✓ Module 4: [Status]

Estimated time remaining: [X hours]

GET STARTED:
Log in now and continue where you left off:
[Link to training portal]

After the deadline, you'll be unable to accept insurance-backed jobs.
Don't wait - complete training today!

Best regards,
NRPG Team
```

### Completion Confirmation Email

```
Subject: Congratulations! You've Completed NRPG Training

Hi [Contractor Name],

Congratulations on completing your NRPG Insurance Training!
Your certificate is ready.

YOUR CERTIFICATION:
Module 1: Insurance Policy Recognition ✓
Module 2: Documentation Standards ✓
Module 3: Three-Way Communication ✓
Module 4: Contractor Insurance Requirements ✓

DOWNLOAD YOUR CERTIFICATE:
[Link to PDF certificate]

NEXT STEPS:
You're now approved to accept all NRPG insurance-backed jobs.
Your next refresher training is due: [DATE]

Thanks for investing in professional development.
Better training = better outcomes for everyone!

Best regards,
NRPG Team
```

---

## Performance Monitoring

### Metrics to Track

**Engagement**:
- % of contractors who started training
- % of contractors who completed all modules
- Average time per module (vs expected)
- Quiz pass rate (% passing on first attempt)
- Quiz retake rate (% who needed to retake)
- Time from enrollment to completion

**Performance**:
- Average quiz scores by module
- Module difficulty (pass rate indicators)
- Most-commonly failed questions
- Video completion rate (% who watched full video)
- Drop-off points (where contractors stop watching)

**Impact**:
- Improvement in claim approval speed (before/after training)
- Reduction in documentation back-and-forth
- Client satisfaction ratings
- Insurer feedback on documentation quality
- Claims approved on first submission rate

### Monthly Reporting

**Report to Contractors**:
- Overall enrollment: X of Y contractors completed
- Module popularity: Most/least completed
- Average scores: How contractors performing overall
- Leaderboard: Top contractors (optional - could motivate)

**Report to Management**:
- Completion rate (%)
- Engagement metrics
- Impact on claim metrics
- Support tickets/issues
- Recommendations for improvement

---

## Ongoing Maintenance

### Annual Refresher Plan

**30 Days Before Expiry**:
- Send reminder email: "Your certification expires in 30 days"
- Link to refresher training
- Explain which modules to retake

**Recommended Refresher Schedule**:
- Q1: Module 1 (Policy Recognition)
- Q2: Module 2 (Documentation)
- Q3: Module 3 (Communication)
- Q4: Module 4 (Insurance Requirements)

**One Module Per Quarter**:
- Keeps training top-of-mind
- Doesn't overwhelm contractors
- Ensures annual refresh of all content
- Takes only 30-45 minutes per quarter

### Content Updates

**Annual Content Review** (January):
- Update any insurer requirements that changed
- Add new case studies/examples
- Update insurance requirements (check NSW PI mandate progress)
- Gather contractor feedback (what confused you?)
- Update quiz based on common mistakes

**Quarterly Checks**:
- Monitor for Code of Practice changes
- Check for insurer requirement updates
- Review support tickets (questions about content)
- Identify unclear sections (from quiz data)

---

## Success Metrics (6-Month Targets)

### Adoption
```
✓ 80% of active contractors complete training
✓ 95% pass rate (on average, after retakes)
✓ Average completion time: 2-3 hours (per contractor, all 4 modules)
✓ 70% complete within first 60 days
```

### Quality Impact
```
✓ 30% reduction in documentation back-and-forth
✓ 25% faster claim approval time
✓ 40% improvement in claim approval rate (first submission)
✓ Improved contractor-insurer communication (qualitative feedback)
```

### Engagement
```
✓ <2% failure rate after retakes
✓ >90% video completion rate
✓ <3% of contractors need support understanding content
✓ Positive feedback from contractors (satisfaction survey >4/5 stars)
```

---

## Budget Estimate

| Item | Cost | Notes |
|------|------|-------|
| Video Production | $2,000-5,000 | In-house or contractor |
| LMS Platform (annual) | $1,200-1,500 | Teachable/Kajabi |
| Captions/Subtitles | $500-1,000 | Professional CC |
| Music/Sound Effects | $200-500 | Royalty-free licenses |
| Graphics/Animation | $500-1,000 | Design resources |
| Database Schema Updates | $500-1,000 | Dev time |
| Dashboard UI Development | $1,500-2,500 | Dev time |
| Testing/QA | $500-1,000 | QA resources |
| Launch & Training | $500-1,000 | Support team time |
| **Total Estimate** | **$7,000-14,000** | 2-month project |

---

**Status**: ✅ Implementation Guide Complete

**Ready for**:
1. Video production team (scripts ready)
2. Backend development (schema ready)
3. Frontend development (UI specifications ready)
4. QA team (testing checklist ready)
5. Marketing team (communication templates ready)

**Next Phase**: Stage 5 - AI Integration (Weeks 9-10)

---

## Sign-Off Checklist

Before launching Stage 4 implementation:

- [ ] Video production budget approved
- [ ] LMS platform selected and licensed
- [ ] Database schema approved by tech lead
- [ ] Contractor communication templates approved
- [ ] Timeline confirmed with all teams
- [ ] Support team prepared for contractor questions
- [ ] Launch date scheduled
- [ ] Internal testers identified (5-10 contractors)

**Owner**: Project Manager
**Timeline**: Approved by [DATE]
**Launch Target**: [DATE]
