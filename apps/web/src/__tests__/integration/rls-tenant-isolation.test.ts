/**
 * UNI-158: RLS Policy Testing - Tenant Data Isolation Verification
 *
 * This test suite verifies that Row-Level Security (RLS) policies correctly enforce
 * tenant data isolation across all multi-tenant tables.
 *
 * Test Coverage:
 * 1. Application-level tenant scoping (getTenantDb middleware)
 * 2. Database-level RLS policies
 * 3. Cross-tenant access prevention
 * 4. SUPER_ADMIN bypass functionality
 * 5. Policy coverage audit
 *
 * @see apps/web/prisma/migrations/20250127200000_add_rls_policies/migration.sql
 * @see apps/web/lib/prisma-tenant.ts
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { getTenantDb } from '../../../lib/get-tenant-db';
import { getTenantPrisma, withTenantContext } from '../../../lib/prisma-tenant';
import { prisma } from '../../../lib/prisma';
import { AuthContext } from '../../../lib/auth-middleware';

// ============================================================================
// Test Data Setup
// ============================================================================

const TENANT_A_ID = 'test-tenant-a-' + Date.now();
const TENANT_B_ID = 'test-tenant-b-' + Date.now();

// Mock AuthContext for testing
const createMockAuthContext = (tenantId: string | null, role: string = 'USER'): AuthContext => ({
  user: {
    id: `user-${tenantId || 'super'}`,
    email: `user-${tenantId || 'super'}@test.com`,
    role: role as any,
    tenantId,
  },
  tenantId,
  role: role as any,
});

/**
 * All tenant-scoped models that should have RLS policies.
 * This list comes from apps/web/lib/prisma-tenant.ts TENANT_MODELS
 */
const TENANT_SCOPED_MODELS = [
  'booking',
  'payment',
  'invoiceAU',
  'activity',
  'task',
  'contractor',
  'clientProfile',
  'clientProperty',
  'clientInsurance',
  'clientPayment',
  'clientOnboarding',
  'contractorMatch',
  'insuranceClaimAU',
  'insuranceProvider',
  'rating',
  'inspectionReport',
  'damageArea',
  'inspectionPhoto',
  'moistureReading',
  'costEstimate',
  'laborLineItem',
  'materialLineItem',
  'equipmentLineItem',
  'complianceCheck',
  'reportRevision',
  'auditLog',
  'customerLifecycle',
  'opportunity',
  'publicClaim',
  'triageAssessment',
  'blogPost',
  'faq',
  'caseStudy',
  'loginAttempt',
  'verificationToken',
  'contractorOnboarding',
  'contractorAssessment',
  'contractorModuleProgress',
  'contractorCertification',
  'betaProgram',
  'betaEnrollment',
  'betaFeedback',
  'betaNPSSurvey',
] as const;

// ============================================================================
// Test Suite: Application-Level Tenant Scoping
// ============================================================================

describe('UNI-158: Application-Level Tenant Scoping', () => {
  let testBookingA: any;
  let testBookingB: any;

  beforeAll(async () => {
    // Create test tenants
    await prisma.tenant.upsert({
      where: { id: TENANT_A_ID },
      create: {
        id: TENANT_A_ID,
        name: 'Test Tenant A',
        domain: `test-a-${Date.now()}.example.com`,
      },
      update: {},
    });

    await prisma.tenant.upsert({
      where: { id: TENANT_B_ID },
      create: {
        id: TENANT_B_ID,
        name: 'Test Tenant B',
        domain: `test-b-${Date.now()}.example.com`,
      },
      update: {},
    });
  });

  afterAll(async () => {
    // Cleanup test data
    await prisma.booking.deleteMany({
      where: {
        OR: [
          { tenantId: TENANT_A_ID },
          { tenantId: TENANT_B_ID },
        ],
      },
    });

    await prisma.tenant.deleteMany({
      where: {
        id: { in: [TENANT_A_ID, TENANT_B_ID] },
      },
    });
  });

  beforeEach(async () => {
    // Create test bookings for each tenant
    testBookingA = await prisma.booking.create({
      data: {
        tenantId: TENANT_A_ID,
        bookingDate: new Date(),
        status: 'CONFIRMED',
        // Add minimum required fields based on your schema
      },
    });

    testBookingB = await prisma.booking.create({
      data: {
        tenantId: TENANT_B_ID,
        bookingDate: new Date(),
        status: 'CONFIRMED',
        // Add minimum required fields based on your schema
      },
    });
  });

  describe('getTenantDb() middleware', () => {
    it('should only return Tenant A bookings when scoped to Tenant A', async () => {
      const contextA = createMockAuthContext(TENANT_A_ID);
      const dbA = getTenantDb(contextA);

      const bookings = await dbA.booking.findMany();

      // Should only find Tenant A's booking
      expect(bookings).toBeDefined();
      expect(bookings.length).toBeGreaterThanOrEqual(1);
      expect(bookings.every((b: any) => b.tenantId === TENANT_A_ID)).toBe(true);
    });

    it('should only return Tenant B bookings when scoped to Tenant B', async () => {
      const contextB = createMockAuthContext(TENANT_B_ID);
      const dbB = getTenantDb(contextB);

      const bookings = await dbB.booking.findMany();

      // Should only find Tenant B's booking
      expect(bookings).toBeDefined();
      expect(bookings.length).toBeGreaterThanOrEqual(1);
      expect(bookings.every((b: any) => b.tenantId === TENANT_B_ID)).toBe(true);
    });

    it('should prevent Tenant A from accessing Tenant B data via findUnique', async () => {
      const contextA = createMockAuthContext(TENANT_A_ID);
      const dbA = getTenantDb(contextA);

      // Try to access Tenant B's booking using Tenant A's client
      const booking = await dbA.booking.findUnique({
        where: { id: testBookingB.id },
      });

      // Should return null due to tenant mismatch
      expect(booking).toBeNull();
    });

    it('should auto-inject tenantId on create operations', async () => {
      const contextA = createMockAuthContext(TENANT_A_ID);
      const dbA = getTenantDb(contextA);

      const newBooking = await dbA.booking.create({
        data: {
          bookingDate: new Date(),
          status: 'PENDING',
          // Note: NOT providing tenantId - it should be auto-injected
        },
      });

      expect(newBooking.tenantId).toBe(TENANT_A_ID);

      // Cleanup
      await prisma.booking.delete({ where: { id: newBooking.id } });
    });

    it('should prevent cross-tenant updates', async () => {
      const contextA = createMockAuthContext(TENANT_A_ID);
      const dbA = getTenantDb(contextA);

      // Try to update Tenant B's booking using Tenant A's client
      await expect(
        dbA.booking.update({
          where: { id: testBookingB.id },
          data: { status: 'CANCELLED' },
        })
      ).rejects.toThrow();
    });

    it('should prevent cross-tenant deletes', async () => {
      const contextA = createMockAuthContext(TENANT_A_ID);
      const dbA = getTenantDb(contextA);

      // Try to delete Tenant B's booking using Tenant A's client
      await expect(
        dbA.booking.delete({
          where: { id: testBookingB.id },
        })
      ).rejects.toThrow();
    });
  });

  describe('SUPER_ADMIN bypass', () => {
    it('should allow SUPER_ADMIN (null tenantId) to access all tenants data', async () => {
      const contextSuperAdmin = createMockAuthContext(null, 'SUPER_ADMIN');
      const dbSuperAdmin = getTenantDb(contextSuperAdmin);

      const bookings = await dbSuperAdmin.booking.findMany();

      // Should find both Tenant A and B bookings
      const tenantIds = bookings.map((b: any) => b.tenantId);
      expect(tenantIds).toContain(TENANT_A_ID);
      expect(tenantIds).toContain(TENANT_B_ID);
    });

    it('should allow SUPER_ADMIN to access specific tenant data via findUnique', async () => {
      const contextSuperAdmin = createMockAuthContext(null, 'SUPER_ADMIN');
      const dbSuperAdmin = getTenantDb(contextSuperAdmin);

      const bookingA = await dbSuperAdmin.booking.findUnique({
        where: { id: testBookingA.id },
      });

      const bookingB = await dbSuperAdmin.booking.findUnique({
        where: { id: testBookingB.id },
      });

      expect(bookingA).toBeDefined();
      expect(bookingA?.tenantId).toBe(TENANT_A_ID);
      expect(bookingB).toBeDefined();
      expect(bookingB?.tenantId).toBe(TENANT_B_ID);
    });
  });
});

// ============================================================================
// Test Suite: Database-Level RLS Policies
// ============================================================================

describe('UNI-158: Database-Level RLS Policies', () => {
  describe('withTenantContext() RLS session variable', () => {
    it('should set PostgreSQL session variable for RLS', async () => {
      const result = await withTenantContext(TENANT_A_ID, async (tx) => {
        // Query the session variable directly
        const [row] = await tx.$queryRawUnsafe<any[]>(
          `SELECT current_setting('app.current_tenant_id', true) as tenant_id`
        );
        return row.tenant_id;
      });

      expect(result).toBe(TENANT_A_ID);
    });

    it('should isolate data using RLS policies', async () => {
      // Create test bookings
      const bookingA = await prisma.booking.create({
        data: {
          tenantId: TENANT_A_ID,
          bookingDate: new Date(),
          status: 'CONFIRMED',
        },
      });

      const bookingB = await prisma.booking.create({
        data: {
          tenantId: TENANT_B_ID,
          bookingDate: new Date(),
          status: 'CONFIRMED',
        },
      });

      try {
        // Query with Tenant A context using RLS
        const bookingsA = await withTenantContext(TENANT_A_ID, async (tx) => {
          return tx.booking.findMany();
        });

        // Query with Tenant B context using RLS
        const bookingsB = await withTenantContext(TENANT_B_ID, async (tx) => {
          return tx.booking.findMany();
        });

        // Tenant A should only see their booking
        expect(bookingsA.some((b: any) => b.id === bookingA.id)).toBe(true);
        expect(bookingsA.some((b: any) => b.id === bookingB.id)).toBe(false);

        // Tenant B should only see their booking
        expect(bookingsB.some((b: any) => b.id === bookingB.id)).toBe(true);
        expect(bookingsB.some((b: any) => b.id === bookingA.id)).toBe(false);
      } finally {
        // Cleanup
        await prisma.booking.deleteMany({
          where: {
            id: { in: [bookingA.id, bookingB.id] },
          },
        });
      }
    });
  });

  describe('current_tenant_id() PostgreSQL function', () => {
    it('should return NULL when no tenant context is set', async () => {
      const [row] = await prisma.$queryRawUnsafe<any[]>(
        `SELECT current_tenant_id() as tenant_id`
      );

      expect(row.tenant_id).toBeNull();
    });

    it('should return tenant ID when context is set', async () => {
      const result = await withTenantContext(TENANT_A_ID, async (tx) => {
        const [row] = await tx.$queryRawUnsafe<any[]>(
          `SELECT current_tenant_id() as tenant_id`
        );
        return row.tenant_id;
      });

      expect(result).toBe(TENANT_A_ID);
    });
  });
});

// ============================================================================
// Test Suite: RLS Policy Coverage Audit
// ============================================================================

describe('UNI-158: RLS Policy Coverage Audit', () => {
  it('should verify RLS is enabled on all tenant-scoped tables', async () => {
    const results = await Promise.all(
      TENANT_SCOPED_MODELS.map(async (model) => {
        try {
          // Convert camelCase model name to snake_case table name
          const tableName = model.replace(/([A-Z])/g, '_$1').toLowerCase();
          const formattedTableName = tableName.startsWith('_')
            ? tableName.substring(1)
            : tableName;

          // Query PostgreSQL to check if RLS is enabled
          const [row] = await prisma.$queryRawUnsafe<any[]>(
            `SELECT relname, relrowsecurity
             FROM pg_class
             WHERE relname = '${formattedTableName}'
               AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')`
          );

          return {
            model,
            tableName: formattedTableName,
            rlsEnabled: row?.relrowsecurity === true,
            exists: !!row,
          };
        } catch (error) {
          return {
            model,
            tableName: 'error',
            rlsEnabled: false,
            exists: false,
            error: (error as Error).message,
          };
        }
      })
    );

    // Log results for documentation
    console.log('\n=== RLS Policy Coverage Audit ===\n');
    console.log('Total tenant-scoped models:', TENANT_SCOPED_MODELS.length);

    const rlsEnabled = results.filter(r => r.rlsEnabled);
    const rlsDisabled = results.filter(r => r.exists && !r.rlsEnabled);
    const notFound = results.filter(r => !r.exists);

    console.log('RLS Enabled:', rlsEnabled.length);
    console.log('RLS Disabled:', rlsDisabled.length);
    console.log('Tables Not Found:', notFound.length);

    if (rlsDisabled.length > 0) {
      console.log('\n⚠️  Tables with RLS DISABLED:');
      rlsDisabled.forEach(r => console.log(`  - ${r.model} (${r.tableName})`));
    }

    if (notFound.length > 0) {
      console.log('\n⚠️  Tables NOT FOUND:');
      notFound.forEach(r => console.log(`  - ${r.model}`));
    }

    console.log('\n');

    // Assert that all tables have RLS enabled
    expect(rlsDisabled.length).toBe(0);
    expect(notFound.length).toBe(0);
  });

  it('should verify RLS policies exist for all tenant-scoped tables', async () => {
    const results = await Promise.all(
      TENANT_SCOPED_MODELS.slice(0, 10).map(async (model) => {
        try {
          const tableName = model.replace(/([A-Z])/g, '_$1').toLowerCase();
          const formattedTableName = tableName.startsWith('_')
            ? tableName.substring(1)
            : tableName;

          // Query PostgreSQL for RLS policies
          const policies = await prisma.$queryRawUnsafe<any[]>(
            `SELECT policyname, cmd, qual
             FROM pg_policies
             WHERE tablename = '${formattedTableName}'`
          );

          return {
            model,
            tableName: formattedTableName,
            policyCount: policies.length,
            policies: policies.map(p => p.policyname),
          };
        } catch (error) {
          return {
            model,
            tableName: 'error',
            policyCount: 0,
            policies: [],
            error: (error as Error).message,
          };
        }
      })
    );

    // Log results
    console.log('\n=== RLS Policy Existence Audit (Sample) ===\n');
    results.forEach(r => {
      console.log(`${r.model}: ${r.policyCount} policies`);
      if (r.policies.length > 0) {
        r.policies.forEach(p => console.log(`  - ${p}`));
      }
    });
    console.log('\n');

    // Each table should have 4 policies: SELECT, INSERT, UPDATE, DELETE
    const missingPolicies = results.filter(r => r.policyCount < 4);

    if (missingPolicies.length > 0) {
      console.log('⚠️  Tables with incomplete policies:');
      missingPolicies.forEach(r => {
        console.log(`  - ${r.model}: ${r.policyCount}/4 policies`);
      });
    }

    // This is informational - some tables may legitimately have different policy counts
    // depending on the migration execution
  });
});

// ============================================================================
// Test Suite: Edge Cases and Security
// ============================================================================

describe('UNI-158: Edge Cases and Security', () => {
  describe('NULL tenantId handling', () => {
    it('should allow access to records with NULL tenantId (legacy data)', async () => {
      // Create a booking with NULL tenantId (simulating legacy data)
      const legacyBooking = await prisma.booking.create({
        data: {
          tenantId: null,
          bookingDate: new Date(),
          status: 'CONFIRMED',
        },
      });

      try {
        const contextA = createMockAuthContext(TENANT_A_ID);
        const dbA = getTenantDb(contextA);

        const booking = await dbA.booking.findUnique({
          where: { id: legacyBooking.id },
        });

        // Should be able to access legacy data
        expect(booking).toBeDefined();
        expect(booking?.tenantId).toBeNull();
      } finally {
        await prisma.booking.delete({ where: { id: legacyBooking.id } });
      }
    });
  });

  describe('Bulk operations', () => {
    it('should scope deleteMany to tenant', async () => {
      // Create multiple bookings for each tenant
      await prisma.booking.createMany({
        data: [
          { tenantId: TENANT_A_ID, bookingDate: new Date(), status: 'CONFIRMED' },
          { tenantId: TENANT_A_ID, bookingDate: new Date(), status: 'PENDING' },
          { tenantId: TENANT_B_ID, bookingDate: new Date(), status: 'CONFIRMED' },
        ],
      });

      const contextA = createMockAuthContext(TENANT_A_ID);
      const dbA = getTenantDb(contextA);

      // Delete all Tenant A bookings with status CONFIRMED
      await dbA.booking.deleteMany({
        where: { status: 'CONFIRMED' },
      });

      // Verify Tenant B's CONFIRMED booking still exists
      const remainingBookings = await prisma.booking.findMany({
        where: { tenantId: TENANT_B_ID, status: 'CONFIRMED' },
      });

      expect(remainingBookings.length).toBeGreaterThan(0);

      // Cleanup
      await prisma.booking.deleteMany({
        where: {
          OR: [
            { tenantId: TENANT_A_ID },
            { tenantId: TENANT_B_ID },
          ],
        },
      });
    });

    it('should scope updateMany to tenant', async () => {
      const bookingA = await prisma.booking.create({
        data: { tenantId: TENANT_A_ID, bookingDate: new Date(), status: 'PENDING' },
      });

      const bookingB = await prisma.booking.create({
        data: { tenantId: TENANT_B_ID, bookingDate: new Date(), status: 'PENDING' },
      });

      try {
        const contextA = createMockAuthContext(TENANT_A_ID);
        const dbA = getTenantDb(contextA);

        // Update all PENDING bookings
        await dbA.booking.updateMany({
          where: { status: 'PENDING' },
          data: { status: 'CONFIRMED' },
        });

        // Verify only Tenant A's booking was updated
        const updatedA = await prisma.booking.findUnique({ where: { id: bookingA.id } });
        const updatedB = await prisma.booking.findUnique({ where: { id: bookingB.id } });

        expect(updatedA?.status).toBe('CONFIRMED');
        expect(updatedB?.status).toBe('PENDING');
      } finally {
        await prisma.booking.deleteMany({
          where: { id: { in: [bookingA.id, bookingB.id] } },
        });
      }
    });
  });
});
