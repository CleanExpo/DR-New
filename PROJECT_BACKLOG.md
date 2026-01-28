# Project Backlog - Disaster Recovery NRPG Platform
## Generated: 2026-01-28

**Current Status:** 151/286 API routes converted (52.8%)
**Active Epic:** UNI-157 - V2.0 Multi-tenant SaaS Conversion
**Build Status:** ✅ Passing (797 routes generated)

---

## 🔥 P0 - Critical (Blocking Production)

### UNI-157 Phase 7: Complete API Route Conversion (135 routes remaining)
**Status:** In Progress (52.8% complete)
**Remaining Work:** 135 routes across 8 categories
**Estimated Effort:** 12-16 hours

#### Batch 4b: Content & Case Studies Routes (7 routes)
- [ ] `blog/cron/publish/route.ts` (POST) - Scheduled publishing
- [ ] `case-studies/route.ts` (GET, POST) - Case study management
- [ ] `faq/route.ts` (GET, POST) - FAQ management
- [ ] `faq/[id]/helpful/route.ts` (POST) - Helpful voting
- [ ] `faq/[id]/route.ts` (GET, PATCH, DELETE) - Single FAQ ops

**Dependencies:** None
**Risk:** Low - Similar patterns to blog routes

#### Batch 4c: Claims Management Routes (4 routes)
- [ ] `claims/route.ts` (GET, POST) - Claims listing/creation
- [ ] `claims/[id]/route.ts` (GET, PATCH) - Single claim operations
- [ ] `admin/claims/convert/route.ts` (POST) - Public claim conversion
- [ ] `admin/claims/match/route.ts` (POST) - Contractor matching
- [ ] `admin/claims/triage/route.ts` (GET, POST) - Triage assessment

**Dependencies:** None
**Risk:** Medium - Complex claim matching logic

#### Batch 4d: Messages & Notifications Routes (3 routes)
- [ ] `messages/route.ts` (GET, POST) - Message threads
- [ ] `messages/initiate/route.ts` (POST) - Start conversation
- [ ] `notifications/route.ts` (GET, PATCH) - Notification management

**Dependencies:** None
**Risk:** Low - Standard CRUD patterns

#### Batch 4e: Invoices & Projects Routes (3 routes)
- [ ] `invoices/route.ts` (GET) - Invoice listing
- [ ] `invoices/[invoiceId]/route.ts` (GET, PATCH) - Single invoice
- [ ] `projects/route.ts` (GET, POST, PATCH) - Project management

**Dependencies:** None
**Risk:** Low

#### Batch 4f: Public API Routes (10 routes)
- [ ] `public/analytics/events/route.ts` (POST) - Event tracking
- [ ] `public/claims/submit/route.ts` (POST) - Public claim submission
- [ ] `public/client-feedback/route.ts` (POST) - Feedback collection
- [ ] `public/contractor-inquiry/route.ts` (POST) - Contractor inquiries
- [ ] `public/contractors/search/route.ts` (GET) - Public contractor search
- [ ] `public/lead-capture/route.ts` (POST) - Lead generation
- [ ] `public/newsletter/route.ts` (POST) - Newsletter signup
- [ ] `public/service-requests/route.ts` (POST) - Public service requests
- [ ] `public/triage/route.ts` (POST) - Emergency triage
- [ ] `newsletter/subscribe/route.ts` (POST) - Newsletter subscription

**Dependencies:** None
**Risk:** Low - Public routes use basePrisma

#### Batch 4g: Analytics Routes (15 routes)
- [ ] `analytics/client/route.ts` (GET) - Client analytics
- [ ] `analytics/metrics/route.ts` (GET) - Platform metrics
- [ ] `analytics/realtime/route.ts` (GET) - Real-time analytics
- [ ] `analytics/search/route.ts` (GET) - Search analytics
- [ ] `admin/analytics/benchmarks/route.ts` (GET)
- [ ] `admin/analytics/builder/route.ts` (GET, POST)
- [ ] `admin/analytics/client-onboarding/route.ts` (GET)
- [ ] `admin/analytics/comparison/route.ts` (GET)
- [ ] `admin/analytics/dashboard/route.ts` (GET)
- [ ] `admin/analytics/export/route.ts` (POST)
- [ ] `admin/analytics/forecast/route.ts` (GET)
- [ ] `admin/analytics/geographic/route.ts` (GET)
- [ ] `admin/analytics/operational/route.ts` (GET)
- [ ] `admin/analytics/revenue/route.ts` (GET)
- [ ] `admin/analytics/trends/route.ts` (GET)

**Dependencies:** None
**Risk:** Medium - Complex aggregation queries

#### Batch 4h: Search Dominance & SEO Routes (9 routes)
- [ ] `search-dominance/alerts/route.ts` (GET, POST)
- [ ] `search-dominance/algorithm/route.ts` (GET, PATCH)
- [ ] `search-dominance/blue-ocean/route.ts` (GET, POST)
- [ ] `search-dominance/blue-ocean/[id]/route.ts` (GET, PATCH)
- [ ] `search-dominance/competitors/activity/route.ts` (GET)
- [ ] `search-dominance/metrics/route.ts` (GET)
- [ ] `search-dominance/rankings/route.ts` (GET)
- [ ] `search-dominance/territory/route.ts` (GET, POST)
- [ ] `search-dominance/traffic/route.ts` (GET)

**Dependencies:** None
**Risk:** Medium - Complex SEO algorithms

#### Batch 4i: Remaining Miscellaneous Routes (84 routes)
Includes: auth, workspace, webhooks, competitor analysis, CRM, cron jobs, fraud detection, health checks, training modules, etc.

**Dependencies:** None
**Risk:** Low to Medium - Varied complexity

---

## 🟠 P1 - High Priority (Production Readiness)

### UNI-158: RLS Policy Testing & Verification
**Status:** Not Started
**Effort:** 8 hours
**Description:** Verify PostgreSQL Row Level Security policies work correctly across all tenant-scoped tables.

**Tasks:**
- [ ] Test RLS policies with multiple tenants
- [ ] Verify `current_tenant_id()` function works in Supabase pgbouncer
- [ ] Test that tenants cannot access each other's data
- [ ] Document RLS policy patterns
- [ ] Add RLS policy tests to CI/CD

**Dependencies:** UNI-157 Phase 5 (RLS Policies)
**Risk:** High - Security critical

### UNI-159: Stripe Tenant Billing Integration Testing
**Status:** Not Started
**Effort:** 6 hours
**Description:** End-to-end testing of tenant subscription billing.

**Tasks:**
- [ ] Test checkout session creation
- [ ] Test webhook handling for subscription events
- [ ] Verify feature gating based on tier
- [ ] Test subscription upgrades/downgrades
- [ ] Test trial period handling
- [ ] Document billing flows

**Dependencies:** UNI-157 Phase 6 (Stripe Billing)
**Risk:** High - Revenue critical

### UNI-160: Tenant Registration & Onboarding Flow
**Status:** Not Started
**Effort:** 12 hours
**Description:** Build tenant signup and onboarding experience.

**Tasks:**
- [ ] Create tenant registration form
- [ ] Build subdomain availability check
- [ ] Add custom domain setup workflow
- [ ] Create first-time admin setup wizard
- [ ] Add user invitation system
- [ ] Build tenant settings dashboard

**Dependencies:** UNI-157 Phase 7
**Risk:** Medium

---

## 🟡 P2 - Medium Priority (Post-Launch)

### UNI-161: Tenant Data Migration Tools
**Status:** Not Started
**Effort:** 16 hours
**Description:** Build tools to migrate existing single-tenant data to multi-tenant structure.

**Tasks:**
- [ ] Create data migration scripts
- [ ] Build tenant assignment UI for existing users
- [ ] Add data validation tools
- [ ] Create rollback mechanisms
- [ ] Document migration process

**Dependencies:** UNI-157 Phase 7
**Risk:** High - Data integrity critical

### UNI-162: Tenant Analytics & Usage Tracking
**Status:** Not Started
**Effort:** 10 hours
**Description:** Build analytics for tracking tenant usage against subscription limits.

**Tasks:**
- [ ] Implement usage tracking (API calls, storage, users)
- [ ] Build tenant admin dashboard
- [ ] Add usage alerts and notifications
- [ ] Create billing preview for upcoming charges
- [ ] Add usage export functionality

**Dependencies:** UNI-159
**Risk:** Medium

### UNI-163: Enhanced Tenant White-Labeling
**Status:** Not Started
**Effort:** 14 hours
**Description:** Extend white-labeling beyond basic branding.

**Tasks:**
- [ ] Add custom email templates per tenant
- [ ] Build custom SMS templates
- [ ] Add tenant-specific domain configuration
- [ ] Create logo/favicon upload system
- [ ] Build CSS variable customization
- [ ] Add custom navigation configuration

**Dependencies:** UNI-160
**Risk:** Low

---

## 🟢 P3 - Low Priority (Future Enhancements)

### UNI-164: SUPER_ADMIN Dashboard
**Status:** Not Started
**Effort:** 12 hours
**Description:** Build comprehensive admin panel for managing all tenants.

**Tasks:**
- [ ] Create tenant management dashboard
- [ ] Add tenant search and filtering
- [ ] Build tenant impersonation feature
- [ ] Add system-wide analytics
- [ ] Create tenant health monitoring
- [ ] Add billing overview across all tenants

**Dependencies:** UNI-160, UNI-162
**Risk:** Low

### UNI-165: Automated Tenant Provisioning
**Status:** Not Started
**Effort:** 8 hours
**Description:** Automate tenant setup process for instant provisioning.

**Tasks:**
- [ ] Create automated subdomain DNS setup
- [ ] Build automated database initialization
- [ ] Add automated Stripe customer creation
- [ ] Create welcome email automation
- [ ] Add initial data seeding per tenant

**Dependencies:** UNI-160
**Risk:** Low

### UNI-166: Tenant Backup & Restore
**Status:** Not Started
**Effort:** 10 hours
**Description:** Per-tenant backup and restore functionality.

**Tasks:**
- [ ] Implement tenant data export
- [ ] Build tenant data import
- [ ] Add point-in-time restore
- [ ] Create automated backup scheduling
- [ ] Add backup verification tools

**Dependencies:** UNI-161
**Risk:** Medium

---

## 📊 Current Sprint Velocity

**Routes Converted per Session:** ~30-40 routes
**Estimated Completion (Phase 7):** 3-4 more sessions
**Total Remaining Effort (Phase 7):** 12-16 hours

---

## 🎯 Next Steps (Immediate)

1. **Complete Batch 4b** (Content routes) - 2 hours
2. **Complete Batch 4c** (Claims routes) - 2 hours
3. **Complete Batch 4d** (Messages routes) - 1 hour
4. **Complete Batch 4e** (Invoices routes) - 1 hour
5. **Start Batch 4f** (Public routes) - 2 hours

**Milestone:** 60% completion after next session

---

## 📋 Definition of Done (UNI-157 Phase 7)

- [x] 151/286 routes converted to authenticateRequest() pattern
- [x] All routes use getTenantDb() for tenant isolation
- [x] Build passes without errors
- [x] Public routes use basePrisma appropriately
- [ ] All 286 routes converted
- [ ] Integration tests pass
- [ ] No type errors
- [ ] Documentation updated

---

## 🔍 Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| RLS policies not working in Supabase | High | Medium | Test early, have fallback to app-level isolation |
| Stripe webhook issues | High | Low | Comprehensive error handling, retry logic |
| Data migration complexity | High | High | Thorough testing, staged rollout |
| Performance degradation | Medium | Medium | Database indexing, query optimization |
| Breaking changes during conversion | Medium | Low | Incremental commits, comprehensive testing |

---

## 📝 Notes

- All routes must maintain backward compatibility during Phase 7
- Consider adding route-level feature flags for gradual rollout
- Monitor query performance after tenant-scoping changes
- Keep SUPER_ADMIN cross-tenant access for critical operations
- Document all tenant-resolution edge cases
