import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/get-tenant-db';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { createTransfer } from '@/lib/stripe';
import { getNrpgCalloutSplit } from '@/lib/pricing/nrpg-callout';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const db = getTenantDb(authResult.context);

    const callout = await db.serviceRequestCalloutPayment.findUnique({
      where: { serviceRequestId: params.id },
      include: { contractorProfile: true },
    });

    if (!callout) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Callout payment not found', 404);
    }

    if (callout.status !== 'PAID') {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'Callout payment must be PAID before releasing funds',
        400,
        { status: callout.status }
      );
    }

    let contractorProfile = callout.contractorProfile;

    if (!contractorProfile) {
      const accepted = await db.contractorMatch.findFirst({
        where: { serviceRequestId: params.id, status: 'ACCEPTED' },
        include: { contractor: true },
        orderBy: { updatedAt: 'desc' },
      });

      if (!accepted) {
        return createErrorResponse(
          ErrorCode.RESOURCE_NOT_FOUND,
          'No accepted contractor match found for this service request',
          404
        );
      }

      contractorProfile = accepted.contractor;

      await db.serviceRequestCalloutPayment.update({
        where: { serviceRequestId: params.id },
        data: { contractorProfileId: contractorProfile.id },
      });
    }

    if (!contractorProfile.stripeConnectAccountId) {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'Contractor Stripe Connect account is not configured',
        400
      );
    }

    const split = getNrpgCalloutSplit();

    // DR-897: one release per service request, enforced by the ContractorPayout
    // ledger's UNIQUE idempotencyKey (atomic claim) + the same deterministic key
    // passed to Stripe (replay-safe transfer).
    const idempotencyKey = `nrpg_callout_${params.id}`;

    // Replay guard: if a transfer for this callout already exists (e.g. the
    // previous attempt crashed after transferring but before flipping the
    // callout row to RELEASED), return it — never transfer twice.
    const existing = await db.contractorPayout.findUnique({ where: { idempotencyKey } });
    if (existing?.status === 'TRANSFERRED' && existing.stripeTransferId) {
      return NextResponse.json({
        success: true,
        transferId: existing.stripeTransferId,
        amountAUD: split.contractorEntitlement.totalAUD,
        alreadyReleased: true,
      });
    }

    // Atomic claim: the unique idempotencyKey makes concurrent releasers
    // collide; the loser re-reads the winner's row and never calls Stripe with
    // a fresh transfer.
    let ledger = existing;
    if (!ledger) {
      try {
        ledger = await db.contractorPayout.create({
          data: {
            idempotencyKey,
            contractorId: contractorProfile.id,
            connectedAccount: contractorProfile.stripeConnectAccountId,
            amountAUD: split.contractorEntitlement.totalAUD,
            platformFeeAUD: split.platformFee.totalAUD,
            status: 'PENDING',
          },
        });
      } catch {
        // Lost the unique-key race to a concurrent release.
        const winner = await db.contractorPayout.findUnique({ where: { idempotencyKey } });
        if (winner?.status === 'TRANSFERRED' && winner.stripeTransferId) {
          return NextResponse.json({
            success: true,
            transferId: winner.stripeTransferId,
            amountAUD: split.contractorEntitlement.totalAUD,
            alreadyReleased: true,
          });
        }
        return createErrorResponse(
          ErrorCode.INVALID_INPUT,
          'Callout release already in progress',
          409
        );
      }
    }

    let transfer;
    try {
      transfer = await createTransfer(
        split.contractorEntitlement.totalAUD,
        contractorProfile.stripeConnectAccountId,
        `nrpg_callout_${params.id}`,
        'aud',
        idempotencyKey
      );
    } catch (error) {
      await db.contractorPayout.update({
        where: { id: ledger.id },
        data: {
          status: 'FAILED',
          failureReason: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }

    await db.contractorPayout.update({
      where: { id: ledger.id },
      data: { status: 'TRANSFERRED', stripeTransferId: transfer.id },
    });

    // Conditional flip: only a PAID row moves to RELEASED (never regresses a
    // REFUNDED/CANCELLED row that changed while the transfer was in flight).
    await db.serviceRequestCalloutPayment.updateMany({
      where: { serviceRequestId: params.id, status: 'PAID' },
      data: {
        status: 'RELEASED',
        stripeTransferId: transfer.id,
      },
    });

    return NextResponse.json({
      success: true,
      transferId: transfer.id,
      amountAUD: split.contractorEntitlement.totalAUD,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

