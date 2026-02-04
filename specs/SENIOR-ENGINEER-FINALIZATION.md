# Senior Engineer Deep Finalization Sprint

**Generated**: 2026-02-04
**Quality Standard**: 5-Year Senior Engineer Production Grade
**Current State**: Architecture + Framework + Construction + Interior (Disconnected)
**Target State**: Polished, Cohesive, Production-Ready Professional Platform
**Estimated Time**: 12-16 hours
**Team**: Builder + Validator agents

---

## Mission Statement

Transform the DR-NRPG platform from a collection of well-built components into a **seamless, production-grade professional system** that meets enterprise quality standards for security, reliability, performance, and maintainability.

---

## Architecture Context

**Builder/Validator Pattern**:
- **Builder**: Implements, refactors, connects, hardens
- **Validator**: Verifies quality, tests integration, ensures standards met
- **Quality Gate**: Each Builder task MUST pass Validator verification before proceeding

**Quality Principles**:
1. **Defensive Programming**: Every function handles errors gracefully
2. **Type Safety**: Full TypeScript strict mode compliance
3. **Security First**: Input validation, SQL injection prevention, XSS protection
4. **Integration Complete**: No orphaned code, all APIs connected
5. **Production Ready**: Logging, monitoring, performance optimized

---

## Phase 1: Integration Audit & Discovery

### 1.1 Map the Disconnected Components
**[Task 1] Builder**: Create comprehensive system map at `specs/SYSTEM-MAP.md`:
- **Frontend Pages**: List all routes in `/app` with current status (complete/partial/stub)
- **API Endpoints**: List all routes in `/app/api` with implementation status
- **Data Models**: List all Prisma models with usage status
- **External Services**: List all third-party integrations (Stripe, Resend, Redis, etc.)
- **Missing Bridges**: Identify where frontend calls non-existent APIs
- **Orphaned Code**: Find API endpoints not called by any frontend

**[Task 2] Validator**: Verify system map accuracy and completeness:
- Check map covers all 24+ page routes
- Verify all API endpoints documented (≥50 endpoints)
- Confirm all Prisma models listed (≥30 models expected)
- Validate missing bridges section has specific file:line references
- Evidence: Spot-check 5 random routes exist where documented

---

### 1.2 Identify Critical Path Integration Gaps
**[Task 3] Builder**: Analyze critical user flows and document gaps at `specs/INTEGRATION-GAPS.md`:
- **Property Owner Journey**: Claim submission → Contractor matching → Job completion → Payment
  - List each step's frontend page, API call, database operation
  - Mark gaps: "Frontend makes call to `/api/claims/submit` but endpoint returns 501"
- **Contractor Journey**: Application → Verification → Job acceptance → Completion → Payout
  - Document each integration point
  - Highlight missing pieces
- **Admin Journey**: Dashboard → User management → Dispute resolution → Analytics
  - Map data flow
  - Note incomplete endpoints

**[Task 4] Validator**: Verify integration gaps document is actionable:
- Check each gap has: current state, expected state, affected files
- Verify gaps prioritized (Critical/High/Medium/Low)
- Confirm at least 15 integration gaps identified
- Validate gaps are specific, not vague ("API returns 501" not "doesn't work")

---

### 1.3 Audit Database Schema vs Code Usage
**[Task 5] Builder**: Cross-reference Prisma schema with actual code usage:
- Run: `grep -r "prisma\." apps/web/app --include="*.ts" --include="*.tsx" | grep -oP "prisma\.\w+" | sort | uniq`
- Compare with Prisma models to find:
  - **Unused Models**: Defined in schema but never queried
  - **Missing Relations**: Frontend assumes relations that don't exist
  - **Type Mismatches**: Code expects fields that don't exist or have wrong type
- Document findings in `specs/DATABASE-AUDIT.md`

**[Task 6] Validator**: Verify database audit reveals real issues:
- Check audit lists specific unused models (if any)
- Verify type mismatch examples show actual code vs schema discrepancy
- Confirm missing relations section references specific Prisma @relation directives needed
- Test: Pick one finding and verify it's accurate by checking schema + code

---

## Phase 2: Hardening - Error Handling & Security

### 2.1 Implement Robust API Error Handling Pattern
**[Task 7] Builder**: Create standardized error handling utility at `apps/web/lib/api/error-handler.ts`:
```typescript
// Production-grade error handler
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown): NextResponse {
  // Log error with context
  // Return sanitized response (no stack traces in production)
  // Include request ID for debugging
  // Sentry integration
}
```
Implement full error handler with logging, sanitization, and monitoring hooks.

**[Task 8] Validator**: Verify error handler meets production standards:
- Check error handler logs to Sentry (if configured) or console in development
- Verify no sensitive data (passwords, tokens) leaked in error responses
- Test: Throw error with sensitive data, confirm response is sanitized
- Verify request IDs generated and returned in error responses

---

### 2.2 Refactor All Public API Endpoints for Security
**[Task 9] Builder**: Harden all `/app/api/public/*` endpoints:
For each endpoint (lead-capture, triage, newsletter, contractor-inquiry):
- **Input Validation**: Use Zod schemas, validate EVERY field
- **Rate Limiting**: Verify Upstash rate limiter configured correctly
- **SQL Injection Prevention**: Ensure all Prisma queries use parameterized inputs (no string concatenation)
- **XSS Prevention**: Sanitize all text inputs before storing
- **CAPTCHA Verification**: Implement proper token verification
- **Error Responses**: Use standardized error handler from Task 7

**[Task 10] Validator**: Security penetration test public APIs:
- **Rate Limit Test**: Send 100 requests in 10 seconds, verify 429 response
- **SQL Injection Test**: Submit `'; DROP TABLE users; --` in text fields, verify sanitized
- **XSS Test**: Submit `<script>alert('XSS')</script>`, verify escaped in database
- **Invalid Input Test**: Send malformed JSON, verify 400 with proper error message
- **CAPTCHA Bypass Test**: Send request without token, verify rejection

---

### 2.3 Add Authentication Middleware to Protected Routes
**[Task 11] Builder**: Create authentication middleware at `apps/web/lib/api/auth-middleware.ts`:
```typescript
// Reusable auth checker for API routes
export async function requireAuth(request: NextRequest): Promise<User | NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session.user;
}

export async function requireRole(request: NextRequest, allowedRoles: Role[]): Promise<User | NextResponse> {
  const user = await requireAuth(request);
  if (user instanceof NextResponse) return user; // Auth failed
  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return user;
}
```

**[Task 12] Validator**: Test auth middleware enforcement:
- Test protected endpoint without auth header → verify 401
- Test contractor-only endpoint with client role → verify 403
- Test admin-only endpoint with contractor role → verify 403
- Test valid authenticated request → verify 200 with data
- Evidence: Screenshot or log of each test result

---

### 2.4 Implement Database Transaction Wrappers
**[Task 13] Builder**: Create transaction utilities at `apps/web/lib/db/transactions.ts`:
```typescript
// Safe transaction wrapper with rollback
export async function safeTransaction<T>(
  operation: (tx: PrismaClient) => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await basePrisma.$transaction(async (tx) => {
      return await operation(tx);
    });
  } catch (error) {
    logger.error(`Transaction failed: ${context}`, error);
    throw new APIError(500, 'TRANSACTION_FAILED', 'Operation could not be completed');
  }
}
```
Apply to all multi-step database operations (claim submission, contractor matching, payment processing).

**[Task 14] Validator**: Verify transaction safety:
- Find 3 multi-step operations now using safeTransaction
- Manually trigger error mid-transaction, verify rollback occurs
- Check database for no partial data after failed transaction
- Verify error logged with context

---

## Phase 3: Completion - Connect Missing Endpoints

### 3.1 Complete Lead Capture → Contractor Matching Flow
**[Task 15] Builder**: Wire up complete claim submission flow:
1. Read `/app/api/public/lead-capture/route.ts`
2. Verify creates `Claim` record in database
3. Trigger contractor matching job: `await contractorMatchingQueue.add({ claimId })`
4. Implement `/api/jobs/match-contractors` if missing
5. Ensure matched contractors receive notification via email + SMS
6. Update claim status to `MATCHING_IN_PROGRESS` → `MATCHED`

**[Task 16] Validator**: End-to-end test claim submission flow:
- Submit claim via `/api/public/lead-capture`
- Verify `Claim` record created in database
- Verify contractor matching job queued (check Redis or job queue)
- Wait for job processing
- Verify contractors notified (check email/SMS logs)
- Verify claim status updated to `MATCHED`

---

### 3.2 Complete Contractor Application → Verification Flow
**[Task 17] Builder**: Connect contractor onboarding pipeline:
1. Read `/app/api/landing/contractor-application/route.ts` (already has good logic)
2. Ensure admin notification email sent on new application
3. Create `/app/api/admin/contractors/[id]/approve` endpoint (if missing)
4. On approval:
   - Update contractor status to `APPROVED`
   - Send welcome email with login credentials
   - Create Stripe Connect account
5. Implement background verification check (ABN lookup, license validation)

**[Task 18] Validator**: Test contractor verification flow:
- Submit contractor application
- Verify admin receives notification email
- Admin approves via API endpoint
- Verify contractor status updated to `APPROVED`
- Verify welcome email sent
- Check Stripe Connect account created

---

### 3.3 Complete Job Acceptance → Payment Flow
**[Task 19] Builder**: Implement contractor payout pipeline:
1. Create `/app/api/contractor/jobs/[jobId]/complete` endpoint
2. On job completion:
   - Update job status to `COMPLETED`
   - Calculate contractor payout (total - platform fee)
   - Create payout record
   - Trigger Stripe transfer to contractor's Connect account
3. Handle edge cases: disputes, refunds, partial payments
4. Send completion notification to property owner

**[Task 20] Validator**: Test job completion and payout:
- Create test job in database
- Call completion endpoint
- Verify job status updated
- Verify payout calculated correctly (amount - fee)
- Check Stripe transfer initiated (use test mode)
- Verify property owner notified

---

### 3.4 Complete Admin Analytics Dashboard
**[Task 21] Builder**: Implement all analytics endpoints:
- `/api/admin/analytics/overview` - Total claims, contractors, revenue
- `/api/admin/analytics/revenue` - Revenue by month, contractor, service type
- `/api/admin/analytics/contractors` - Top performers, new signups
- `/api/admin/analytics/claims` - Claim status breakdown, resolution time
- Use optimized SQL queries with proper indexes
- Cache results with Redis (5-minute TTL)

**[Task 22] Validator**: Verify analytics accuracy and performance:
- Call each analytics endpoint
- Manually verify one metric (e.g., total claims count)
- Check response time < 500ms (with caching)
- Verify cache hit on second request
- Test with 1000+ database records (seed if needed)

---

## Phase 4: Frontend-Backend Integration

### 4.1 Connect Dashboard Pages to APIs
**[Task 23] Builder**: Wire up all dashboard pages:
- **Contractor Dashboard** (`/dashboard/contractor/page.tsx`):
  - Connect to `/api/contractor/analytics` for stats
  - Connect to `/api/contractor/jobs` for active jobs list
  - Add loading states, error boundaries
- **Client Dashboard** (`/dashboard/client/page.tsx`):
  - Connect to `/api/client/claims` for claim history
  - Add claim submission form with validation
- **Admin Dashboard** (`/dashboard/admin/page.tsx`):
  - Connect to all analytics endpoints
  - Add real-time updates (polling or websockets)

**[Task 24] Validator**: Test all dashboard pages load with real data:
- Login as contractor, verify dashboard shows real stats
- Login as client, verify claims list populated
- Login as admin, verify analytics display
- Check no console errors, no infinite loops
- Verify loading states appear during fetch

---

### 4.2 Implement Optimistic Updates for User Actions
**[Task 25] Builder**: Add React Query with optimistic updates:
- Install `@tanstack/react-query`
- Create query client at `apps/web/lib/query-client.ts`
- Implement optimistic updates for:
  - Job acceptance (instant UI update, rollback on error)
  - Claim status changes
  - Contractor verification
- Add retry logic for failed mutations

**[Task 26] Validator**: Test optimistic updates behavior:
- Accept job, verify UI updates immediately
- Simulate network error, verify rollback occurs
- Check error toast shown on failure
- Verify retry attempts (should retry 3 times)

---

### 4.3 Add Real-time Notifications
**[Task 27] Builder**: Implement notification system:
- Create `/app/api/notifications/route.ts` (SSE or polling)
- Add notification badge to header
- Implement notification types:
  - New job available (contractor)
  - Job accepted (client)
  - Payment received (contractor)
  - Dispute opened (both)
- Store notifications in database
- Add mark as read functionality

**[Task 28] Validator**: Test notification delivery:
- Trigger notification event (new job)
- Verify notification appears in UI within 5 seconds
- Check notification badge count updates
- Mark as read, verify badge decrements
- Test across browser tabs (same user)

---

## Phase 5: Quality Hardening

### 5.1 Implement Comprehensive Logging
**[Task 29] Builder**: Set up production logging at `apps/web/lib/logger.ts`:
```typescript
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  // Redact sensitive fields
  redact: ['password', 'token', 'apiKey', 'secret'],
});

// Structured logging helpers
export function logAPIRequest(method: string, path: string, userId?: string) {
  logger.info({ method, path, userId }, 'API Request');
}

export function logAPIError(error: unknown, context: string) {
  logger.error({ error, context }, 'API Error');
}
```

**[Task 30] Validator**: Verify logging captures critical events:
- Trigger API request, check log contains method, path, userId
- Trigger error, check log contains error details (no stack trace leak)
- Submit form with password field, verify password redacted in logs
- Check logs are JSON formatted for easy parsing

---

### 5.2 Add Performance Monitoring
**[Task 31] Builder**: Instrument critical paths with timing:
- Add performance marks to slow operations:
  ```typescript
  const start = performance.now();
  await expensiveOperation();
  const duration = performance.now() - start;
  logger.info({ operation: 'expensiveOperation', duration }, 'Performance');
  ```
- Identify operations > 1 second, optimize or add loading indicators
- Add database query timing to all Prisma calls
- Set up Sentry performance monitoring (if configured)

**[Task 32] Validator**: Verify performance tracking works:
- Check logs contain performance timing for key operations
- Identify slowest operation (should be logged)
- Verify database queries logged with execution time
- Confirm no operations > 5 seconds without user notification

---

### 5.3 Implement Rate Limiting on Sensitive Operations
**[Task 33] Builder**: Add rate limiting beyond public APIs:
- **Login attempts**: 5 per 15 minutes per IP
- **Password reset**: 3 per hour per email
- **Contractor application**: 1 per day per email
- **Claim submission**: 10 per hour per user
- Use Upstash Redis for distributed rate limiting
- Return proper `Retry-After` header

**[Task 34] Validator**: Test rate limits enforce correctly:
- Attempt 6 logins rapidly, verify 6th blocked
- Check `Retry-After` header present in 429 response
- Wait for rate limit window, verify access restored
- Test across multiple servers (if distributed)

---

### 5.4 Add Input Sanitization Everywhere
**[Task 35] Builder**: Create sanitization utilities at `apps/web/lib/security/sanitize.ts`:
```typescript
import DOMPurify from 'isomorphic-dompurify';
import { escape } from 'validator';

export function sanitizeHTML(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
}

export function sanitizeText(input: string): string {
  return escape(input.trim());
}

export function sanitizeEmail(input: string): string {
  return input.toLowerCase().trim();
}
```
Apply to all user inputs before database storage.

**[Task 36] Validator**: Test sanitization prevents XSS:
- Submit `<script>alert('XSS')</script>` in text field
- Verify stored in DB as escaped HTML entities
- Render in UI, verify no script execution
- Test with multiple XSS vectors (img onerror, svg onload, etc.)

---

## Phase 6: Testing & Validation

### 6.1 Write Integration Tests for Critical Flows
**[Task 37] Builder**: Create integration tests at `apps/web/__tests__/integration/`:
- **Claim Submission Flow** (`claim-flow.test.ts`):
  - Submit claim → Verify DB record → Check contractor notified
- **Contractor Onboarding Flow** (`contractor-onboarding.test.ts`):
  - Apply → Admin approve → Verify account created
- **Payment Flow** (`payment-flow.test.ts`):
  - Complete job → Verify payout calculated → Check Stripe transfer
- Use test database, mock external APIs (Stripe, Resend)

**[Task 38] Validator**: Run integration tests and verify coverage:
- Execute: `npm run test:integration`
- Verify all 3 critical flows tested
- Check tests use test database (not production)
- Verify external APIs mocked (no real Stripe charges)
- Confirm all tests pass

---

### 6.2 Add E2E Tests for User Journeys
**[Task 39] Builder**: Create Playwright E2E tests at `apps/web/e2e/`:
- **Property Owner Journey** (`property-owner.spec.ts`):
  - Visit homepage → Submit claim → Receive confirmation
- **Contractor Journey** (`contractor.spec.ts`):
  - Sign up → Get verified → Accept job → Complete
- **Admin Journey** (`admin.spec.ts`):
  - Login → View analytics → Approve contractor
- Use Playwright fixtures for test users

**[Task 40] Validator**: Run E2E tests and verify realistic scenarios:
- Execute: `npm run test:e2e`
- Verify tests run in real browser (headless)
- Check tests interact with UI realistically (clicks, typing, navigation)
- Confirm screenshots captured on failure
- Verify all journeys complete end-to-end

---

### 6.3 Perform Load Testing
**[Task 41] Builder**: Create load test scenarios with k6:
- **Homepage Load** (`load-tests/homepage.js`): 100 concurrent users
- **API Load** (`load-tests/api.js`): 50 req/s to critical endpoints
- **Database Load** (`load-tests/db.js`): Concurrent reads/writes
- Set acceptance criteria:
  - 95th percentile < 500ms
  - Error rate < 1%
  - No memory leaks

**[Task 42] Validator**: Execute load tests and verify performance:
- Run: `k6 run load-tests/homepage.js`
- Check 95th percentile meets criteria
- Verify error rate < 1%
- Monitor memory usage during test (no growth)
- Document any bottlenecks found

---

## Phase 7: Documentation - The Success Suite

### 7.1 Create Deployment Automation Scripts
**[Task 43] Builder**: Create deployment scripts at `scripts/deploy/`:
- **`pre-deploy.sh`**:
  - Check environment variables set
  - Run database migrations (dry-run)
  - Run tests
  - Build production assets
  - Exit with error if any check fails
- **`deploy.sh`**:
  - Execute pre-deploy checks
  - Deploy to Vercel
  - Run smoke tests
  - Notify team (Slack/email)
- **`rollback.sh`**:
  - Revert to previous deployment
  - Restore database backup
  - Verify rollback successful

**[Task 44] Validator**: Test deployment scripts work correctly:
- Run `bash scripts/deploy/pre-deploy.sh`
- Verify script checks all environment variables
- Intentionally break test, verify script exits with error
- Fix test, verify script completes successfully
- Check exit codes correct (0 = success, non-zero = failure)

---

### 7.2 Generate Complete .env.example
**[Task 45] Builder**: Create comprehensive `.env.example` at project root:
- List ALL environment variables (50+ expected)
- Group by category:
  - **Database**: DATABASE_URL, DIRECT_URL
  - **Authentication**: NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, etc.
  - **Email**: RESEND_API_KEY, SENDGRID_API_KEY
  - **Payment**: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
  - **Storage**: UPLOADTHING_SECRET, S3_BUCKET
  - **Monitoring**: SENTRY_DSN, SENTRY_AUTH_TOKEN
  - **External APIs**: GOOGLE_MAPS_API_KEY, TWILIO_SID
  - **Feature Flags**: ENABLE_CAPTCHA, ENABLE_2FA
- Add description comment for each variable
- Include example values (never real secrets)

**[Task 46] Validator**: Verify .env.example is complete:
- Search codebase for `process.env.` to find all environment variable usage
- Cross-reference with .env.example
- Verify no missing variables
- Check all descriptions clear and helpful
- Confirm no real secrets in example values

---

### 7.3 Write FINAL_HANDOVER.md
**[Task 47] Builder**: Create comprehensive handover document at `FINAL_HANDOVER.md`:

```markdown
# DR-NRPG Platform - Final Handover Documentation

## Project Overview
**Status**: Production Ready ✅
**Completion Date**: 2026-02-04
**Code Quality**: Senior Engineer Grade
**Test Coverage**: 85%+

## Architecture Summary
[High-level architecture diagram - Mermaid]

## Technology Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, tRPC (if applicable)
- **Database**: PostgreSQL (Prisma ORM)
- **Caching**: Redis (Upstash)
- **Auth**: NextAuth.js
- **Payments**: Stripe Connect
- **Email**: Resend
- **Hosting**: Vercel
- **Monitoring**: Sentry

## Deployment Instructions
1. Clone repository
2. Copy `.env.example` to `.env.local`
3. Fill in all environment variables
4. Run database migrations: `npx prisma migrate deploy`
5. Build: `npm run build`
6. Deploy to Vercel: `vercel --prod`

## Critical Paths (Do Not Break)
1. Claim submission → Contractor matching
2. Payment processing → Payout
3. User authentication → Role-based access
4. Email notifications

## Known Limitations
[List any technical debt, temporary workarounds, or future improvements needed]

## Maintenance Guide
- **Database Backups**: Automated daily at 2 AM UTC
- **Log Retention**: 30 days in Vercel, 90 days in Sentry
- **Dependency Updates**: Monthly security patches
- **Monitoring**: Check Sentry daily for errors

## Emergency Contacts
- **Technical Lead**: [Name/Email]
- **DevOps**: [Name/Email]
- **Product Owner**: [Name/Email]

## Repository Access
- **GitHub**: https://github.com/org/dr-nrpg
- **Vercel**: https://vercel.com/org/dr-nrpg
- **Stripe Dashboard**: https://dashboard.stripe.com

## Handover Checklist
- [x] All tests passing
- [x] Production deployment successful
- [x] Environment variables documented
- [x] Database migrations applied
- [x] Monitoring configured
- [x] Documentation complete
- [x] Access credentials transferred
```

**[Task 48] Validator**: Review handover document for completeness:
- Check all sections present and filled out
- Verify deployment instructions tested and accurate
- Confirm critical paths documented
- Verify known limitations section honest and complete
- Check emergency contacts filled in (or marked TBD)

---

### 7.4 Create Operations Runbook
**[Task 49] Builder**: Create detailed runbook at `docs/RUNBOOK.md`:
- **Common Operations**:
  - How to add a new admin user
  - How to manually verify a contractor
  - How to process a refund
  - How to export data for reporting
- **Troubleshooting**:
  - Email not sending → Check Resend API key, check logs
  - Payment failing → Check Stripe webhook signature
  - Slow performance → Check database query performance, Redis connection
- **Monitoring**:
  - Key metrics to watch (error rate, response time, queue length)
  - Alert thresholds
  - Escalation procedures
- **Incident Response**:
  - Steps for common incidents (database down, payment processor outage)
  - Communication templates
  - Rollback procedures

**[Task 50] Validator**: Verify runbook is actionable:
- Pick one operation (e.g., "add admin user"), follow instructions
- Verify operation succeeds without additional context needed
- Check troubleshooting section has specific solutions, not generic advice
- Confirm monitoring section lists actual metrics available in Sentry/Vercel
- Test one incident response procedure (e.g., simulate database outage)

---

### 7.5 Generate API Documentation
**[Task 51] Builder**: Create API documentation at `docs/API-REFERENCE.md`:
- **Public APIs** (unauthenticated):
  - POST /api/public/lead-capture
  - POST /api/public/triage
  - POST /api/public/newsletter
  - POST /api/public/contractor-inquiry
- **Contractor APIs** (require contractor role):
  - GET /api/contractor/analytics
  - GET /api/contractor/jobs
  - POST /api/contractor/jobs/[id]/accept
  - POST /api/contractor/jobs/[id]/complete
- **Client APIs** (require client role):
  - GET /api/client/claims
  - POST /api/client/claims
  - GET /api/client/claims/[id]
- **Admin APIs** (require admin role):
  - GET /api/admin/analytics/*
  - POST /api/admin/contractors/[id]/approve
  - GET /api/admin/disputes

For each endpoint:
- Method, path, authentication requirements
- Request body schema (TypeScript interface)
- Response schema
- Example request/response
- Error codes
- Rate limits

**[Task 52] Validator**: Verify API documentation accuracy:
- Pick 5 random endpoints from documentation
- Test each endpoint matches documented behavior
- Verify request/response schemas accurate
- Check authentication requirements enforced
- Confirm rate limits documented match actual implementation

---

## Phase 8: Final Integration & Polish

### 8.1 End-to-End System Test
**[Task 53] Builder**: Perform complete system walkthrough:
1. **Property Owner Flow**:
   - Visit homepage
   - Submit emergency claim
   - Receive email confirmation
   - View claim status in dashboard
   - Receive contractor match notification
   - Accept quote
   - Complete payment
   - Leave review
2. **Contractor Flow**:
   - Submit application
   - Receive approval email
   - Login to dashboard
   - View available jobs
   - Accept job
   - Update job status
   - Receive payout
3. **Admin Flow**:
   - Login to admin dashboard
   - Review contractor application
   - Approve contractor
   - View analytics
   - Handle dispute
   - Export report

Document any issues found in `specs/FINAL-ISSUES.md`

**[Task 54] Validator**: Verify complete system functions cohesively:
- All 3 user journeys complete without errors
- Data flows correctly between frontend and backend
- No broken links or 404 pages
- All emails sent successfully
- All database records created correctly
- UI/UX polished (no broken layouts, proper loading states)

---

### 8.2 Performance Optimization Pass
**[Task 55] Builder**: Optimize critical paths:
- **Database Queries**:
  - Add indexes for slow queries (check query execution time)
  - Use select to limit fields fetched
  - Implement cursor-based pagination for large lists
- **Frontend**:
  - Add React.memo to expensive components
  - Lazy load heavy components
  - Optimize images (use Next.js Image)
  - Implement virtual scrolling for long lists
- **API**:
  - Add Redis caching to expensive operations
  - Implement request coalescing for duplicate requests
  - Use connection pooling for database

**[Task 56] Validator**: Measure performance improvements:
- Run Lighthouse audit on key pages (target score ≥ 90)
- Check Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Verify cached API responses return in < 50ms
- Test with slow 3G network simulation

---

### 8.3 Security Hardening Final Pass
**[Task 57] Builder**: Conduct security review:
- **Headers**: Verify CSP, X-Frame-Options, HSTS configured
- **Secrets**: Scan codebase for hardcoded secrets (use `gitleaks` or similar)
- **Dependencies**: Run `npm audit` and fix all vulnerabilities
- **SQL Injection**: Verify all Prisma queries use parameters
- **XSS**: Check all user input sanitized
- **CSRF**: Verify NextAuth CSRF protection enabled
- **Authentication**: Check session management, password hashing (bcrypt/argon2)
- **Authorization**: Verify role checks on all protected routes

**[Task 58] Validator**: Perform security penetration tests:
- Attempt SQL injection on search endpoints
- Try XSS in all form fields
- Test CSRF with forged requests
- Attempt privilege escalation (client accessing admin endpoints)
- Check sensitive data exposure in API responses
- Verify no secrets in browser network tab
- Document any vulnerabilities in `specs/SECURITY-AUDIT.md`

---

### 8.4 Code Quality Final Review
**[Task 59] Builder**: Refactor for maintainability:
- **DRY Principle**: Extract repeated code into utilities
- **Naming**: Ensure all variables/functions have clear, descriptive names
- **Comments**: Add JSDoc comments to complex functions
- **Type Safety**: Ensure no `any` types (or minimal, with justification)
- **File Organization**: Move misplaced files to correct directories
- **Dead Code**: Remove unused imports, functions, components
- Run ESLint with strict rules, fix all warnings

**[Task 60] Validator**: Code quality audit:
- Run ESLint: `npm run lint` - verify 0 errors, 0 warnings
- Check TypeScript: `npm run type-check` - verify 0 errors
- Verify no `any` types (or < 5 with clear comments explaining why)
- Spot-check 10 random files for code quality
- Confirm no console.logs in production code (use logger instead)

---

## Phase 9: Handover & Transition

### 9.1 Create Video Walkthrough
**[Task 61] Builder**: Record system demonstration:
- **Part 1: Architecture Overview** (5 minutes)
  - Explain tech stack, folder structure, key design decisions
- **Part 2: Developer Setup** (10 minutes)
  - Clone repo, install dependencies, configure .env, run locally
- **Part 3: User Journeys** (15 minutes)
  - Demo property owner, contractor, admin flows
- **Part 4: Deployment** (10 minutes)
  - Show deployment process, environment configuration, monitoring
- Upload to private YouTube or host in repo as `docs/videos/`

**[Task 62] Validator**: Verify video walkthrough quality:
- Check audio clear and professional
- Verify screen resolution readable (1080p minimum)
- Confirm all key topics covered
- Test video accessible (playable, not corrupted)
- Verify total length reasonable (40 minutes ideal)

---

### 9.2 Prepare Transition Materials
**[Task 63] Builder**: Create onboarding package at `docs/ONBOARDING.md`:
- **Day 1 Tasks**:
  - Set up development environment
  - Run application locally
  - Complete code walkthrough
- **Week 1 Tasks**:
  - Deploy to staging
  - Make small code change
  - Submit pull request
  - Review architecture documentation
- **Month 1 Goals**:
  - Implement feature end-to-end
  - Resolve production incident
  - Participate in code review
- Include links to all documentation
- Provide practice exercises

**[Task 64] Validator**: Verify onboarding materials complete:
- Check tasks clearly defined and achievable
- Verify links to documentation work
- Confirm exercises have solutions/answers
- Test instructions by having someone unfamiliar follow them

---

### 9.3 Final Commit & Release
**[Task 65] Builder**: Create production release:
- Ensure all changes committed
- Create git tag: `v1.0.0-production`
- Write release notes at `RELEASE-NOTES.md`:
  - Features completed
  - Known issues resolved
  - Performance improvements
  - Security enhancements
  - Breaking changes (if any)
- Push to GitHub: `git push origin main --tags`
- Create GitHub release with notes

**[Task 66] Validator**: Verify release quality:
- Check git tag created: `git tag -l`
- Verify release notes accurate and complete
- Confirm all documentation merged to main branch
- Test clean clone and setup from scratch
- Verify production deployment uses tagged release

---

### 9.4 Stakeholder Sign-Off
**[Task 67] Builder**: Prepare sign-off presentation:
- **Executive Summary**: Project goals achieved, quality metrics met
- **Demo**: Live system demonstration
- **Metrics**:
  - Test coverage: 85%+
  - Performance: Lighthouse score 90+
  - Security: 0 critical vulnerabilities
  - Code quality: 0 ESLint errors
- **Handover Materials**: Documentation, runbooks, videos
- **Support Plan**: Monitoring, maintenance schedule, escalation

**[Task 68] Validator**: Final quality gate checklist:
- [ ] All tests passing (unit, integration, E2E)
- [ ] Production deployment successful
- [ ] Zero critical bugs in issue tracker
- [ ] All documentation complete and accurate
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Stakeholder approval obtained

---

## Success Criteria

### Technical Excellence ✅
- [ ] **Zero Known Critical Bugs**: All blocking issues resolved
- [ ] **Test Coverage ≥ 85%**: Critical paths fully tested
- [ ] **Performance**: Lighthouse score ≥ 90, Core Web Vitals green
- [ ] **Security**: 0 critical/high vulnerabilities, OWASP Top 10 mitigated
- [ ] **Code Quality**: 0 ESLint errors, TypeScript strict mode, < 5 `any` types
- [ ] **Integration**: All frontend pages connected to working backend APIs
- [ ] **Documentation**: Complete API docs, runbook, handover guide

### Production Readiness ✅
- [ ] **Deployment**: Automated scripts tested and working
- [ ] **Monitoring**: Sentry configured, logs structured
- [ ] **Error Handling**: All APIs return proper error responses
- [ ] **Rate Limiting**: Public APIs protected
- [ ] **Authentication**: All protected routes enforced
- [ ] **Database**: Migrations applied, backups configured

### Handover Complete ✅
- [ ] **Documentation Suite**: 8+ documents covering all aspects
- [ ] **Video Walkthrough**: Complete system demonstration
- [ ] **Onboarding Materials**: New developer guide
- [ ] **Release**: Tagged v1.0.0, deployed to production
- [ ] **Stakeholder Sign-Off**: Approved and accepted

---

## Timeline Estimate

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| Phase 1: Integration Audit | 6 tasks | 2 hours |
| Phase 2: Hardening | 12 tasks | 3.5 hours |
| Phase 3: Completion | 8 tasks | 2.5 hours |
| Phase 4: Frontend Integration | 6 tasks | 2 hours |
| Phase 5: Quality Hardening | 8 tasks | 2 hours |
| Phase 6: Testing | 6 tasks | 2 hours |
| Phase 7: Documentation | 10 tasks | 3 hours |
| Phase 8: Final Polish | 8 tasks | 2.5 hours |
| Phase 9: Handover | 8 tasks | 2.5 hours |
| **TOTAL** | **72 tasks** | **~20 hours** |

**Recommended: Split across 3 days for quality focus (6-7 hours per day)**

---

## Quality Standards Checklist

### Code Quality
- [x] TypeScript strict mode enabled
- [x] No `any` types without justification
- [x] ESLint configured with strict rules
- [x] Prettier for consistent formatting
- [x] Pre-commit hooks (lint, type-check, test)
- [x] Code review required for all changes

### Security
- [x] Input validation on all user inputs
- [x] SQL injection prevention (Prisma parameterized queries)
- [x] XSS prevention (input sanitization)
- [x] CSRF protection (NextAuth)
- [x] Rate limiting on public APIs
- [x] Secure headers (CSP, X-Frame-Options, HSTS)
- [x] No secrets in codebase
- [x] Authentication enforced on protected routes
- [x] Authorization checks on sensitive operations

### Performance
- [x] Database queries optimized with indexes
- [x] Redis caching for expensive operations
- [x] Frontend code-splitting and lazy loading
- [x] Images optimized (Next.js Image)
- [x] Lighthouse score ≥ 90
- [x] Core Web Vitals passing

### Reliability
- [x] Error handling on all API routes
- [x] Database transactions for multi-step operations
- [x] Retry logic for transient failures
- [x] Graceful degradation when services unavailable
- [x] Monitoring and alerting configured
- [x] Logging structured and searchable

### Maintainability
- [x] Clear code organization
- [x] Consistent naming conventions
- [x] Comprehensive documentation
- [x] README with setup instructions
- [x] API documentation with examples
- [x] Runbook for operations
- [x] Comments on complex logic

---

## Ready to Execute

This plan represents **Senior Engineer grade quality standards** with emphasis on:
- **Integration**: Every component connected and working together
- **Hardening**: Production-grade error handling, security, performance
- **Completion**: No TODO placeholders, all features functional
- **Documentation**: Complete handover materials for seamless transition

Begin with **[Task 1] Builder: Map the Disconnected Components** and proceed sequentially through all 68 tasks.

**Execution Mode**: Autonomous with rigorous validation gates
**Quality Standard**: 5-Year Senior Engineer Production Grade
**Expected Outcome**: Polished, cohesive, professional platform ready for enterprise deployment

---

*Plan generated by Lead Architect Agent*
*Execution by Senior Engineer Builder + Validator team*
*Quality Standard: Production-Grade Enterprise Platform*
