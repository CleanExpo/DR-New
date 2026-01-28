/**
 * UNI-158: RLS Policy Testing Script
 *
 * This script runs comprehensive tests and audits of Row-Level Security policies.
 * It generates a detailed report of tenant isolation effectiveness.
 *
 * Usage:
 *   pnpm tsx apps/web/scripts/test-rls-policies.ts
 */

import { PrismaClient } from '@prisma/client';
import { withTenantContext } from '../lib/prisma-tenant';

const prisma = new PrismaClient();

/**
 * All tenant-scoped models from prisma-tenant.ts
 */
const TENANT_SCOPED_MODELS = [
  'Booking',
  'Payment',
  'InvoiceAU',
  'Activity',
  'Task',
  'Contractor',
  'ClientProfile',
  'ClientProperty',
  'ClientInsurance',
  'ClientPayment',
  'ClientOnboarding',
  'ContractorMatch',
  'InsuranceClaimAU',
  'InsuranceProvider',
  'Rating',
  'InspectionReport',
  'DamageArea',
  'InspectionPhoto',
  'MoistureReading',
  'CostEstimate',
  'LaborLineItem',
  'MaterialLineItem',
  'EquipmentLineItem',
  'ComplianceCheck',
  'ReportRevision',
  'AuditLog',
  'CustomerLifecycle',
  'Opportunity',
  'PublicClaim',
  'TriageAssessment',
  'BlogPost',
  'FAQ',
  'CaseStudy',
  'LoginAttempt',
  'VerificationToken',
  'ContractorOnboarding',
  'ContractorAssessment',
  'ContractorModuleProgress',
  'ContractorCertification',
  'BetaProgram',
  'BetaEnrollment',
  'BetaFeedback',
  'BetaNPSSurvey',
];

interface RLSAuditResult {
  model: string;
  tableName: string;
  rlsEnabled: boolean;
  policyCount: number;
  policies: string[];
  exists: boolean;
  error?: string;
}

/**
 * Convert model name to PostgreSQL table name
 */
function modelToTableName(model: string): string {
  // Convert PascalCase to snake_case
  return model.replace(/([A-Z])/g, (match, p1, offset) => {
    return offset > 0 ? `_${match.toLowerCase()}` : match.toLowerCase();
  });
}

/**
 * Audit RLS enablement for all tenant-scoped tables
 */
async function auditRLSEnablement(): Promise<RLSAuditResult[]> {
  console.log('🔍 Auditing RLS enablement...\n');

  const results: RLSAuditResult[] = [];

  for (const model of TENANT_SCOPED_MODELS) {
    try {
      const tableName = modelToTableName(model);

      // Check if RLS is enabled on the table
      const [row] = await prisma.$queryRawUnsafe<any[]>(
        `SELECT
          c.relname as table_name,
          c.relrowsecurity as rls_enabled
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relname = $1`,
        tableName
      );

      if (!row) {
        results.push({
          model,
          tableName,
          rlsEnabled: false,
          policyCount: 0,
          policies: [],
          exists: false,
        });
        continue;
      }

      // Get RLS policies for this table
      const policies = await prisma.$queryRawUnsafe<any[]>(
        `SELECT
          policyname,
          cmd,
          permissive,
          roles,
          qual,
          with_check
        FROM pg_policies
        WHERE tablename = $1
        ORDER BY policyname`,
        tableName
      );

      results.push({
        model,
        tableName,
        rlsEnabled: row.rls_enabled === true,
        policyCount: policies.length,
        policies: policies.map(p => `${p.cmd}: ${p.policyname}`),
        exists: true,
      });
    } catch (error) {
      results.push({
        model,
        tableName: modelToTableName(model),
        rlsEnabled: false,
        policyCount: 0,
        policies: [],
        exists: false,
        error: (error as Error).message,
      });
    }
  }

  return results;
}

/**
 * Test RLS policy enforcement with actual tenant data
 */
async function testRLSEnforcement(): Promise<{
  passed: boolean;
  message: string;
}> {
  console.log('🧪 Testing RLS enforcement with tenant contexts...\n');

  const TENANT_A_ID = 'rls-test-a-' + Date.now();
  const TENANT_B_ID = 'rls-test-b-' + Date.now();

  try {
    // Create test tenants
    await prisma.tenant.createMany({
      data: [
        {
          id: TENANT_A_ID,
          name: 'RLS Test Tenant A',
          domain: `rls-test-a-${Date.now()}.example.com`,
        },
        {
          id: TENANT_B_ID,
          name: 'RLS Test Tenant B',
          domain: `rls-test-b-${Date.now()}.example.com`,
        },
      ],
    });

    // Test with Booking model (common use case)
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

    // Test RLS with Tenant A context
    const bookingsFromA = await withTenantContext(TENANT_A_ID, async (tx) => {
      return tx.booking.findMany();
    });

    // Test RLS with Tenant B context
    const bookingsFromB = await withTenantContext(TENANT_B_ID, async (tx) => {
      return tx.booking.findMany();
    });

    // Verify isolation
    const hasBookingA = bookingsFromA.some((b: any) => b.id === bookingA.id);
    const hasBookingBFromA = bookingsFromA.some((b: any) => b.id === bookingB.id);
    const hasBookingB = bookingsFromB.some((b: any) => b.id === bookingB.id);
    const hasBookingAFromB = bookingsFromB.some((b: any) => b.id === bookingA.id);

    // Cleanup
    await prisma.booking.deleteMany({
      where: { id: { in: [bookingA.id, bookingB.id] } },
    });

    await prisma.tenant.deleteMany({
      where: { id: { in: [TENANT_A_ID, TENANT_B_ID] } },
    });

    if (hasBookingA && !hasBookingBFromA && hasBookingB && !hasBookingAFromB) {
      return {
        passed: true,
        message: '✅ RLS enforcement working correctly',
      };
    } else {
      return {
        passed: false,
        message: '❌ RLS enforcement FAILED - cross-tenant data access detected',
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: `❌ RLS enforcement test error: ${(error as Error).message}`,
    };
  }
}

/**
 * Generate and print comprehensive RLS audit report
 */
async function generateReport(results: RLSAuditResult[]) {
  console.log('\n' + '='.repeat(80));
  console.log('RLS POLICY AUDIT REPORT - UNI-158');
  console.log('Generated:', new Date().toISOString());
  console.log('='.repeat(80) + '\n');

  // Summary statistics
  const total = results.length;
  const rlsEnabled = results.filter(r => r.rlsEnabled).length;
  const rlsDisabled = results.filter(r => r.exists && !r.rlsEnabled).length;
  const tablesNotFound = results.filter(r => !r.exists).length;
  const withErrors = results.filter(r => r.error).length;

  console.log('📊 SUMMARY\n');
  console.log(`Total Tenant-Scoped Models:    ${total}`);
  console.log(`RLS Enabled:                    ${rlsEnabled} (${((rlsEnabled / total) * 100).toFixed(1)}%)`);
  console.log(`RLS Disabled:                   ${rlsDisabled}`);
  console.log(`Tables Not Found:               ${tablesNotFound}`);
  console.log(`Errors:                         ${withErrors}\n`);

  // RLS Enabled Tables
  console.log('✅ TABLES WITH RLS ENABLED\n');
  results
    .filter(r => r.rlsEnabled)
    .forEach(r => {
      console.log(`  ${r.model.padEnd(30)} ${r.tableName.padEnd(35)} ${r.policyCount} policies`);
    });

  // RLS Disabled Tables (CRITICAL)
  if (rlsDisabled > 0) {
    console.log('\n⚠️  CRITICAL: TABLES WITH RLS DISABLED\n');
    results
      .filter(r => r.exists && !r.rlsEnabled)
      .forEach(r => {
        console.log(`  ❌ ${r.model} (${r.tableName})`);
      });
  }

  // Tables Not Found (WARNING)
  if (tablesNotFound > 0) {
    console.log('\n⚠️  WARNING: TABLES NOT FOUND IN DATABASE\n');
    results
      .filter(r => !r.exists)
      .forEach(r => {
        console.log(`  ⚠️  ${r.model} - Expected table: ${r.tableName}`);
        if (r.error) {
          console.log(`      Error: ${r.error}`);
        }
      });
  }

  // Policy Details for problematic tables
  const incompletePolicies = results.filter(r => r.exists && r.rlsEnabled && r.policyCount < 4);
  if (incompletePolicies.length > 0) {
    console.log('\n⚠️  TABLES WITH INCOMPLETE POLICIES\n');
    console.log('Note: Expected 4 policies per table (SELECT, INSERT, UPDATE, DELETE)\n');
    incompletePolicies.forEach(r => {
      console.log(`  ${r.model} (${r.tableName}): ${r.policyCount}/4 policies`);
      r.policies.forEach(p => console.log(`    - ${p}`));
    });
  }

  // Production Readiness Assessment
  console.log('\n' + '='.repeat(80));
  console.log('PRODUCTION READINESS ASSESSMENT\n');

  const criticalIssues = rlsDisabled + withErrors;
  const warnings = tablesNotFound + incompletePolicies.length;

  if (criticalIssues === 0 && warnings === 0) {
    console.log('✅ PASS: All tenant-scoped tables have RLS enabled with complete policies');
    console.log('✅ Ready for production deployment');
  } else if (criticalIssues === 0) {
    console.log(`⚠️  PASS WITH WARNINGS: ${warnings} warning(s) found`);
    console.log('⚠️  Review warnings before production deployment');
  } else {
    console.log(`❌ FAIL: ${criticalIssues} critical issue(s) found`);
    console.log('❌ NOT ready for production deployment');
    console.log('\nRequired Actions:');
    if (rlsDisabled > 0) {
      console.log(`  1. Enable RLS on ${rlsDisabled} table(s)`);
    }
    if (withErrors > 0) {
      console.log(`  2. Investigate ${withErrors} error(s)`);
    }
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting RLS Policy Audit (UNI-158)\n');

  try {
    // 1. Audit RLS enablement
    const auditResults = await auditRLSEnablement();

    // 2. Test RLS enforcement
    const enforcementTest = await testRLSEnforcement();
    console.log(enforcementTest.message + '\n');

    // 3. Generate report
    await generateReport(auditResults);

    // 4. Determine exit code
    const hasFailures =
      auditResults.some(r => r.exists && !r.rlsEnabled) ||
      auditResults.some(r => r.error) ||
      !enforcementTest.passed;

    process.exit(hasFailures ? 1 : 0);
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { auditRLSEnablement, testRLSEnforcement, generateReport };
