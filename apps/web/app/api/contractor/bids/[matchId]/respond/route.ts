// @ts-nocheck

/**
 * Contractor Bid Response API
 *
 * POST /api/contractor/bids/[matchId]/respond
 *
 * Contractor formally responds to a claim match:
 * - ACCEPTED  → flags the booking for client review, emits realtime event
 * - DECLINED  → escalates to the next backup contractor automatically
 * - COUNTER_OFFER → records alternate price/timeline for client to review
 *
 * Required role: CONTRACTOR
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { escalateToNextContractor } from '@/lib/claim-intake';
import { createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { isDispatchEligible } from '@/lib/services/dispatch-eligibility';
import { DISPATCH_INELIGIBLE_ERROR } from '@/lib/services/dispatch-eligibility-error';
import { z } from 'zod';

const respondSchema = z.object({
  response: z.enum(['ACCEPTED', 'DECLINED', 'COUNTER_OFFER']),
  counterAmount: z.number().positive().optional(),
  counterTimeline: z.string().max(200).optional(),
  message: z.string().max(1000).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const { user } = authResult.context;
    if (!requireRole(user, ['CONTRACTOR'])) {
      return unauthorizedRoleResponse(['CONTRACTOR']);
    }

    const db = getTenantDb(authResult.context);
    const { matchId } = params;

    // Validate body
    const body = await request.json();
    const data = respondSchema.parse(body);

    // Get contractor record
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: { id: true, businessName: true },
    });

    if (!contractor) {
      return NextResponse.json({ error: 'Contractor profile not found' }, { status: 404 });
    }

    // Get the ContractorMatch
    const match = await db.contractorMatch.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    // Verify contractor owns this match
    if (match.contractorId !== contractor.id) {
      return NextResponse.json({ error: 'Unauthorised — you do not own this match' }, { status: 403 });
    }

    // Prevent double-responding
    if (match.contractorResponse) {
      return NextResponse.json(
        { error: `Already responded: ${match.contractorResponse}` },
        { status: 409 }
      );
    }

    // DR-925: canonical dispatch-eligibility gate (single code path, spec N-04).
    // ACCEPTED and COUNTER_OFFER take on work, so an ineligible contractor is
    // refused with 403. DECLINED is deliberately exempt: declining grants
    // nothing and frees the job for escalation to the next contractor.
    if (data.response !== 'DECLINED' && !(await isDispatchEligible(user.id))) {
      return createErrorResponse(
        ErrorCode.FORBIDDEN,
        DISPATCH_INELIGIBLE_ERROR.message,
        403,
        { reason: DISPATCH_INELIGIBLE_ERROR.reason, link: DISPATCH_INELIGIBLE_ERROR.link }
      );
    }

    // Check deadline hasn't passed (soft-warn only — let contractor respond late for now)
    const isLate = match.responseDeadline && match.responseDeadline < new Date();

    // Determine match status based on response
    // Note: contractor UX uses 'DECLINED' but MatchStatus enum uses 'REJECTED'
    const matchStatus =
      data.response === 'ACCEPTED'
        ? 'ACCEPTED'
        : data.response === 'DECLINED'
          ? 'REJECTED'
          : 'PENDING'; // COUNTER_OFFER stays in PENDING until client reviews

    // Update the match record
    const updated = await db.contractorMatch.update({
      where: { id: matchId },
      data: {
        contractorResponse: data.response,
        contractorRespondedAt: new Date(),
        notificationStatus: 'RESPONDED',
        status: matchStatus,
        contractorMessage: data.message ?? match.contractorMessage,
        // Store counter-offer details in budget/timeline fields
        ...(data.response === 'COUNTER_OFFER' && {
          budget: data.counterAmount?.toString(),
          timeline: data.counterTimeline,
        }),
      },
    });

    // Emit realtime event for the client dashboard
    try {
      const { emitBidSubmitted } = await import('@/lib/realtime/emit-handlers');
      const booking = await db.booking.findUnique({
        where: { id: match.serviceRequestId ?? '' },
        select: { clientId: true },
      });
      if (booking) {
        await emitBidSubmitted(
          match.serviceRequestId ?? matchId,
          matchId,
          contractor.id,
          user.name || contractor.businessName,
          contractor.businessName,
          data.counterAmount ?? null,
          null,
          data.message ?? null,
          booking.clientId
        );
      }
    } catch (eventError) {
      console.error('[BID RESPOND] Realtime emit failed:', eventError);
    }

    // If DECLINED → escalate to the next backup contractor
    let escalated = false;
    if (data.response === 'DECLINED' && match.serviceRequestId) {
      try {
        escalated = await escalateToNextContractor(match.serviceRequestId, matchId);
      } catch (escalateError) {
        console.error('[BID RESPOND] Escalation failed:', escalateError);
      }
    }

    return NextResponse.json({
      success: true,
      response: data.response,
      matchId: updated.id,
      respondedAt: updated.contractorRespondedAt,
      ...(isLate && { warning: 'Response submitted after deadline — client will still be notified' }),
      ...(data.response === 'DECLINED' && { escalated }),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }
    console.error('[BID RESPOND] Error:', error);
    return NextResponse.json({ error: 'Failed to submit response' }, { status: 500 });
  }
}
