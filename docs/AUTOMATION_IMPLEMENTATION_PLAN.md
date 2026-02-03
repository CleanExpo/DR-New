# Automation Implementation Plan
**Version**: 1.0
**Created**: 2026-02-03
**Status**: In Progress
**Target Completion**: 3 weeks

## Executive Summary

This plan addresses critical automation gaps preventing the platform from being production-ready under load:

1. **Mock Contractor Matching** - Claims API returns random contractor count instead of real AI-powered matching
2. **Missing Job Queue System** - No background processing for long-running tasks
3. **No Contractor Notifications** - Matched contractors not being notified of new claims
4. **In-Memory Rate Limiting** - Won't scale beyond single server
5. **No Auto-Escalation** - No handling of "no contractor response" scenarios

## Current State

### ✅ What EXISTS (Fully Functional)
- **Contractor Matching Workflow** (`apps/web/lib/agents/workflows/contractor-matching.ts`) - 598 lines
  - LangGraph-based intelligent matching
  - Scores on: specialty, IICRC certs, ratings, response time, insurance training, $10M PL
  - Returns top 5 matches with AI reasoning

- **Agent Orchestrator** (`apps/web/lib/agents/core/orchestrator.ts`)
  - Routes requests to workflows
  - Manages execution lifecycle
  - Supports streaming responses

- **Orchestration API** (`/api/agents/orchestrate`)
  - POST endpoint accepting workflow type and input
  - Returns job results with metrics

### 🔴 Critical GAPS (Not Connected)
1. **Claims API** (`apps/web/app/api/public/claims/submit/route.ts:331-333`)
   ```typescript
   // CURRENT (MOCK):
   const contractorCount = Math.floor(Math.random() * 3) + 1;
   const estimatedResponseTime = priority === 'critical' ? '15 minutes' : '30 minutes';
   ```
   - NOT calling contractor matching workflow
   - NOT notifying matched contractors
   - Returns fake data to client

2. **No Background Job Queue** - Contractor matching can take 10-30 seconds with AI
3. **No Contractor Notifications** - After matching, contractors need alerts
4. **No Load Testing** - System needs to handle 100+ concurrent submissions
5. **No Auto-Escalation** - Need backup contractor selection if no response

---

## Architecture Decision: Prisma-Based Queue

**Choice**: Start with Prisma, upgrade to BullMQ+Redis when scaling beyond 1000 jobs/day

**Rationale**:
- Bull package already installed (`package.json:93`)
- ioredis v5.3.2 already installed (`package.json:108`)
- Email queue uses Prisma pattern (`email-queue.ts`)
- Vercel Cron already configured for queue processing
- Clear upgrade path to Redis when needed

**Phase 1 Architecture**:
```
Claim Submit → Prisma BackgroundJob → Vercel Cron (1min) → Execute Matching → Update Claim → Notify Contractors
```

**Phase 2 Architecture** (when scaling):
```
Claim Submit → BullMQ (Redis) → Worker Process → Execute Matching → Update Claim → Notify Contractors
```

---

## Implementation Phases

### Phase 1: Database Schema & Job Infrastructure (2-4 hours)

**Files to Create**:
- `apps/web/lib/queue/background-jobs.ts` (250 lines)
- `apps/web/app/api/cron/process-background-jobs/route.ts` (160 lines)

**Files to Modify**:
- `apps/web/prisma/schema.prisma` (+60 lines)
  - Add `BackgroundJob` model
  - Add `ContractorMatch` model
  - Update `PublicClaim` relations

**Database Schema**:
```prisma
model BackgroundJob {
  id              String   @id @default(cuid())
  jobType         String
  status          String   @default("PENDING")
  priority        Int      @default(5)
  input           Json
  output          Json?
  attemptCount    Int      @default(0)
  maxAttempts     Int      @default(3)
  lastError       String?
  scheduledFor    DateTime @default(now())
  completedAt     DateTime?
  claimId         String?
  tenantId        String?

  @@index([status, scheduledFor])
  @@index([jobType, status])
}

model ContractorMatch {
  id                    String   @id @default(cuid())
  claimId               String
  contractorId          String
  matchScore            Float
  matchReason           String[]
  notificationStatus    String   @default("PENDING")
  notificationSentAt    DateTime?
  responseDeadline      DateTime?
  contractorRespondedAt DateTime?
  isBackup              Boolean  @default(false)

  @@index([claimId, notificationStatus])
  @@index([responseDeadline])
}
```

**Deliverables**:
- [ ] Prisma schema updated with new models
- [ ] Database migration created and applied
- [ ] `background-jobs.ts` service created
- [ ] Cron job for processing queue created
- [ ] Unit tests for job queue

---

### Phase 2: Integrate Contractor Matching (3-5 hours)

**Files to Create**:
- `apps/web/lib/queue/processors/contractor-matching-processor.ts` (180 lines)
- `apps/web/app/api/jobs/contractor-matching/route.ts` (120 lines)

**Files to Modify**:
- `apps/web/app/api/public/claims/submit/route.ts` (lines 331-347)
  - Replace mock with background job creation
- `apps/web/lib/agents/core/orchestrator.ts` (+20 lines)
  - Add claimId to execution context

**Integration Flow**:
```typescript
// apps/web/app/api/public/claims/submit/route.ts

// BEFORE (line 331-333):
const contractorCount = Math.floor(Math.random() * 3) + 1;
const estimatedResponseTime = priority === 'critical' ? '15 minutes' : '30 minutes';

// AFTER:
const matchingJob = await createJob('CONTRACTOR_MATCHING', {
  claimId: savedClaim.id,
  criteria: {
    serviceType: validatedData.step1.disasterType,
    location: {
      state: extractStateFromSuburb(validatedData.step2.suburb),
      suburb: validatedData.step2.suburb,
      postcode: validatedData.step2.postcode,
    },
    urgency: priority === 'critical' ? 'emergency' :
             priority === 'high' ? 'urgent' : 'standard',
  }
}, {
  priority: priority === 'critical' ? 1 : 5,
  claimId: savedClaim.id
});
```

**Deliverables**:
- [ ] Contractor matching processor created
- [ ] Claims API integrated with background jobs
- [ ] Manual trigger endpoint for testing
- [ ] Integration tests for end-to-end flow
- [ ] ContractorMatch records created from AI results

---

### Phase 3: Contractor Notification System (4-6 hours)

**Files to Create**:
- `apps/web/lib/email/contractor-notifications.ts` (400 lines)
- `apps/web/lib/queue/processors/contractor-notification-processor.ts` (150 lines)
- `apps/web/app/api/contractor/claims/[claimId]/respond/route.ts` (200 lines)

**Email Templates**:
1. **Match Notification** - "New Claim Matched to Your Services"
   - Claim reference, client name (masked), property address
   - Disaster type, urgency level (color-coded)
   - Why they were matched (AI reasoning)
   - Response deadline (15min emergency, 30min urgent)
   - CTA: "View Claim & Respond"

2. **Backup Notification** - "Alternative Claim Opportunity"
   - Same as above, marked as "backup opportunity"
   - Shorter deadline (5min)

3. **Assignment Confirmation** - "You've Been Selected for This Job"
   - Full client details
   - Next steps, contact information

**Response Tracking**:
```typescript
// Contractor response API
POST /api/contractor/claims/{claimId}/respond
{
  "response": "ACCEPTED" | "DECLINED" | "COUNTER_OFFER",
  "message": "Optional message to client",
  "proposedAmount": 5000 // If counter offer
}
```

**Deliverables**:
- [ ] Contractor email templates created
- [ ] Notification processor created
- [ ] Response tracking API created
- [ ] Response deadline tracking
- [ ] Email integration tests

---

### Phase 4: Load Testing & Redis Rate Limiting (3-5 hours)

**Files to Create**:
- `apps/web/tests/load/claim-submission.test.ts` (200 lines)
- `docs/LOAD_TESTING.md` (documentation)

**Files to Modify**:
- `apps/web/app/api/public/claims/submit/route.ts` (lines 20-71)
  - Replace in-memory rate limiting with Upstash Redis
- `apps/web/lib/prisma.ts` (+3 lines)
  - Add connection pooling config

**Redis Rate Limiting**:
```typescript
// BEFORE (in-memory):
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// AFTER (Redis with Upstash):
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1h'),
  prefix: 'claim_submit',
});
```

**Load Testing Suite** (k6):
```javascript
export const options = {
  stages: [
    { duration: '2m', target: 50 },  // Ramp up
    { duration: '5m', target: 100 }, // Sustained load
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% under 500ms
    http_req_failed: ['rate<0.01'],   // <1% errors
  },
};
```

**Deliverables**:
- [ ] Redis rate limiting implemented
- [ ] Load testing suite created
- [ ] Database connection pooling optimized
- [ ] Performance benchmarks documented
- [ ] Load test results (100 req/s sustained)

---

### Phase 5: Auto-Escalation & Monitoring (3-4 hours)

**Files to Create**:
- `apps/web/app/api/cron/check-contractor-responses/route.ts` (180 lines)
- `apps/web/app/api/admin/jobs/stats/route.ts` (120 lines)
- `apps/web/lib/feature-flags.ts` (30 lines)
- `docs/BACKGROUND_JOBS.md` (documentation)

**Files to Modify**:
- `apps/web/prisma/schema.prisma` (+10 lines)
  - Add contractor response tracking to ContractorProfile
- `apps/web/vercel.json` (+6 lines)
  - Add contractor response check cron

**Escalation Logic**:
```typescript
// Every 5 minutes, check for expired deadlines
- Find ContractorMatch with responseDeadline < now AND status = 'SENT'
- Mark as 'NO_RESPONSE'
- Get next 3 contractors from scoredMatches (backups)
- Create new ContractorMatch records with isBackup=true
- Send backup notifications
- If no backups available → Slack alert to admin
```

**Monitoring Dashboard**:
```typescript
GET /api/admin/jobs/stats
{
  queue: {
    pending: 12,
    processing: 3,
    failed: 2,
    avgProcessingTime: 23500 // ms
  },
  matching: {
    totalToday: 45,
    avgMatchTime: 18200,
    noMatchRate: 0.05 // 5%
  },
  contractors: {
    totalNotified: 135,
    responseRate: 0.68, // 68%
    avgResponseTime: 840000 // 14 minutes
  }
}
```

**Feature Flags**:
```env
FEATURE_REAL_MATCHING=true
FEATURE_BACKGROUND_JOBS=true
FEATURE_REDIS_RATE_LIMIT=true
```

**Deliverables**:
- [ ] Escalation cron job created
- [ ] Backup contractor selection logic
- [ ] Admin Slack alerts integrated
- [ ] Job monitoring dashboard created
- [ ] Feature flags for gradual rollout
- [ ] Contractor response rate tracking

---

## Performance Benchmarks

### Target Performance (Production Ready)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Claim submission latency (p95) | <250ms | ~50ms | 🟢 Will increase +100ms with job queue |
| Contractor matching time | <30s | N/A (mock) | 🔴 Need to implement |
| Notification delivery time | <60s | N/A | 🔴 Need to implement |
| Response deadline check | <5min | N/A | 🔴 Need to implement |
| Concurrent claims (sustained) | 100/min | Unknown | 🟡 Need load testing |
| Job queue throughput | 100 jobs/min | N/A | 🔴 Need to implement |
| Database connections | <80% pool | Unknown | 🟡 Need monitoring |

---

## Testing Strategy

### Unit Tests
- Background job queue operations
- Contractor matching processor
- Notification email rendering
- Response tracking logic

### Integration Tests
- End-to-end claim to contractor flow
- Escalation workflow
- Email delivery confirmation
- Job retry mechanisms

### Load Tests
- 100 concurrent claim submissions
- Sustained 5-minute load at 100 req/s
- Job queue processing under load
- Database connection pool behavior

---

## Rollout Plan

### Week 1: Foundation (Phase 1 + 2)
- **Day 1-2**: Database schema, migrations
- **Day 3-4**: Background job queue service
- **Day 5-7**: Contractor matching integration

**Feature Flag**: `FEATURE_REAL_MATCHING=false` (staging only)

### Week 2: Notifications & Testing (Phase 3 + 4)
- **Day 1-2**: Contractor notification system
- **Day 3**: Redis rate limiting
- **Day 4-5**: Load testing, performance tuning
- **Day 6-7**: Integration testing

**Feature Flag**: `FEATURE_REAL_MATCHING=true` (10% production rollout)

### Week 3: Escalation & Production (Phase 5)
- **Day 1-2**: Auto-escalation system
- **Day 3**: Monitoring dashboard
- **Day 4**: Slack alerting
- **Day 5-7**: Gradual production rollout

**Rollout Strategy**:
- Day 5: 10% of claims
- Day 6: 50% of claims (monitor metrics)
- Day 7: 100% of claims (full production)

---

## Risk Mitigation

### Risk 1: Contractor Matching Takes Too Long (>30s)
**Mitigation**:
- Implement 45s timeout in job processor
- If timeout, retry with smaller search radius
- Pre-filter contractors in database before AI scoring

### Risk 2: No Contractors Available
**Mitigation**:
- Immediate Slack alert to admin
- Auto-expand search radius (25km → 50km → 100km → state-wide)
- Track no-match rate for service type/location analysis

### Risk 3: Email Notifications Fail
**Mitigation**:
- Email queue already handles retry (`email-queue.ts`)
- Dead letter queue monitoring
- Fallback to SMS (future enhancement)

### Risk 4: Redis Downtime
**Mitigation**:
- Rate limiting degrades to in-memory (fallback)
- Job queue uses Prisma (not Redis-dependent)
- Monitor Upstash Redis health

### Risk 5: Database Connection Pool Exhaustion
**Mitigation**:
- Set `connection_limit: 10` (Supabase pooler)
- Queue jobs instead of synchronous processing
- Use Prisma's built-in connection pooling

---

## Monitoring & Alerts

### Key Metrics
1. **Job Queue**: Pending count, processing time, failure rate
2. **Contractor Matching**: Match time, no-match rate, contractors per claim
3. **Contractor Response**: Notification delivery, response rate, avg response time
4. **System Performance**: API latency, DB connections, Redis memory

### Alert Channels
- **Slack** (critical): No contractors available, job queue stalled, dead letter emails
- **Email** (warning): Daily job summary, contractor response report, failed job digest
- **Dashboard** (monitoring): Real-time queue visualization, response heatmap, health overview

---

## Current Implementation Status

### ✅ Completed
- Plan agent analysis
- Architecture decision
- Implementation documentation

### 🔄 In Progress
- Phase 1: Database schema & job infrastructure

### ⏳ Pending
- Phase 2: Contractor matching integration
- Phase 3: Contractor notifications
- Phase 4: Load testing & Redis
- Phase 5: Auto-escalation & monitoring

---

## Team Responsibilities

### Backend Engineer
- Database schema design
- Background job queue
- Contractor matching processor
- API endpoints

### DevOps Engineer
- Redis setup (Upstash)
- Vercel cron configuration
- Database connection pooling
- Load testing infrastructure

### QA Engineer
- Integration test suite
- Load testing execution
- Performance benchmarking
- Regression testing

### Product Manager
- Feature flag strategy
- Rollout monitoring
- Contractor communication
- Success metrics tracking

---

## References

- **Contractor Matching Workflow**: `apps/web/lib/agents/workflows/contractor-matching.ts`
- **Agent Orchestrator**: `apps/web/lib/agents/core/orchestrator.ts`
- **Email Queue Pattern**: `apps/web/lib/email/email-queue.ts`
- **Existing Cron Jobs**: `apps/web/vercel.json`
- **Load Testing Guide**: `docs/LOAD_TESTING.md` (to be created)

---

**Document Version**: 1.0
**Last Updated**: 2026-02-03
**Next Review**: Weekly during implementation
**Owner**: Engineering Team
