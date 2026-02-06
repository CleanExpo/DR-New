/**
 * Admin Claims Triage API
 *
 * AI-powered triage for public claims:
 * - POST: Triage a single claim or batch of claims
 * - GET: Get triage status/history for claims
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import {
  triageClaim,
  triageClaimsBatch,
  PublicClaimData,
  TriageResult,
} from '@/lib/services/claim-triage.service';

export const dynamic = 'force-dynamic';

interface TriageRequest {
  claimId?: string;
  claimIds?: string[];
  options?: {
    concurrency?: number;
    updatePriority?: boolean;
  };
}

interface TriageHistoryEntry {
  claimId: string;
  triageResult: TriageResult;
  createdAt: Date;
}

// In-memory cache for triage history (in production, use Redis or database)
const triageHistory = new Map<string, TriageHistoryEntry>();

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const body: TriageRequest = await request.json();
    const { claimId, claimIds, options } = body;

    // Validate input
    if (!claimId && (!claimIds || claimIds.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'claimId or claimIds is required' },
        { status: 400 }
      );
    }

    // Handle single claim triage
    if (claimId) {
      const claim = await db.publicClaim.findUnique({
        where: { id: claimId },
      });

      if (!claim) {
        return NextResponse.json(
          { success: false, error: 'Claim not found' },
          { status: 404 }
        );
      }

      const claimData: PublicClaimData = mapClaimToTriageData(claim);
      const result = await triageClaim(claimData);

      // Store in history
      triageHistory.set(claimId, {
        claimId,
        triageResult: result,
        createdAt: new Date(),
      });

      // Optionally update claim priority based on triage
      if (options?.updatePriority) {
        await db.publicClaim.update({
          where: { id: claimId },
          data: {
            priority: result.recommendedPriority,
          },
        });
      }

      return NextResponse.json({
        success: true,
        result,
        updatedPriority: options?.updatePriority || false,
      });
    }

    // Handle batch triage
    if (claimIds && claimIds.length > 0) {
      // Limit batch size
      if (claimIds.length > 50) {
        return NextResponse.json(
          { success: false, error: 'Maximum batch size is 50 claims' },
          { status: 400 }
        );
      }

      const claims = await db.publicClaim.findMany({
        where: { id: { in: claimIds } },
      });

      if (claims.length === 0) {
        return NextResponse.json(
          { success: false, error: 'No claims found' },
          { status: 404 }
        );
      }

      const claimsData: PublicClaimData[] = claims.map(mapClaimToTriageData);
      const batchResult = await triageClaimsBatch(claimsData, {
        concurrency: options?.concurrency || 3,
      });

      // Store results in history
      batchResult.successful.forEach((result) => {
        triageHistory.set(result.claimId, {
          claimId: result.claimId,
          triageResult: result,
          createdAt: new Date(),
        });
      });

      // Optionally update priorities
      if (options?.updatePriority && batchResult.successful.length > 0) {
        await Promise.all(
          batchResult.successful.map((result) =>
            db.publicClaim.update({
              where: { id: result.claimId },
              data: { priority: result.recommendedPriority },
            })
          )
        );
      }

      return NextResponse.json({
        success: true,
        batch: {
          totalProcessed: batchResult.totalProcessed,
          successful: batchResult.successful.length,
          failed: batchResult.failed.length,
          totalTimeMs: batchResult.totalTimeMs,
        },
        results: batchResult.successful,
        errors: batchResult.failed,
        updatedPriorities: options?.updatePriority || false,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Claim triage API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Triage failed',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const claimId = searchParams.get('claimId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Get triage history for a specific claim
    if (claimId) {
      const entry = triageHistory.get(claimId);

      if (!entry) {
        return NextResponse.json({
          success: true,
          claimId,
          hasTriage: false,
          message: 'No triage history found for this claim',
        });
      }

      return NextResponse.json({
        success: true,
        claimId,
        hasTriage: true,
        result: entry.triageResult,
        createdAt: entry.createdAt,
      });
    }

    // Get pending claims that need triage
    if (status === 'pending') {
      const pendingClaims = await db.publicClaim.findMany({
        where: {
          status: 'PENDING',
        },
        orderBy: [
          { isEmergency: 'desc' },
          { createdAt: 'desc' },
        ],
        take: limit,
      });

      // Check which have been triaged
      const claimsWithTriageStatus = pendingClaims.map((claim) => ({
        id: claim.id,
        clientName: claim.clientName,
        suburb: claim.suburb,
        postcode: claim.postcode,
        disasterType: claim.disasterType,
        isEmergency: claim.isEmergency,
        createdAt: claim.createdAt,
        hasTriage: triageHistory.has(claim.id),
        triageResult: triageHistory.get(claim.id)?.triageResult || null,
      }));

      return NextResponse.json({
        success: true,
        claims: claimsWithTriageStatus,
        total: pendingClaims.length,
        triaged: claimsWithTriageStatus.filter((c) => c.hasTriage).length,
        pending: claimsWithTriageStatus.filter((c) => !c.hasTriage).length,
      });
    }

    // Get recent triage history
    const recentHistory = Array.from(triageHistory.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      history: recentHistory,
      total: triageHistory.size,
    });
  } catch (error) {
    console.error('Claim triage GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get triage data',
      },
      { status: 500 }
    );
  }
}

/**
 * Map Prisma claim to triage data format
 */
function mapClaimToTriageData(claim: {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyAddress: string;
  suburb: string;
  postcode: string;
  disasterType: string;
  incidentDate: Date;
  isOngoing: boolean;
  isEmergency: boolean;
  damageDescription: string;
  hasInsurance: boolean;
  insuranceProvider: string | null;
  policyNumber: string | null;
  priority: string;
  status: string;
  createdAt: Date;
}): PublicClaimData {
  return {
    id: claim.id,
    clientName: claim.clientName,
    clientEmail: claim.clientEmail,
    clientPhone: claim.clientPhone,
    propertyAddress: claim.propertyAddress,
    suburb: claim.suburb,
    postcode: claim.postcode,
    disasterType: claim.disasterType,
    incidentDate: claim.incidentDate,
    isOngoing: claim.isOngoing,
    isEmergency: claim.isEmergency,
    damageDescription: claim.damageDescription,
    hasInsurance: claim.hasInsurance,
    insuranceProvider: claim.insuranceProvider,
    policyNumber: claim.policyNumber,
    priority: claim.priority,
    status: claim.status,
    createdAt: claim.createdAt,
  };
}
