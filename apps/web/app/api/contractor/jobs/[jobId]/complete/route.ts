/**
 * Contractor Job Completion API
 *
 * POST /api/contractor/jobs/[jobId]/complete
 * Contractor marks job as complete and triggers payout
 *
 * Required: CONTRACTOR role
 *
 * Flow:
 * 1. Verify contractor owns this job
 * 2. Mark booking as COMPLETED
 * 3. Enqueue the payout — money moves LATER via the daily
 *    /api/cron/contractor-payout-sweep once the 30-day dispute window has
 *    passed (DR-896: completion enqueues, never executes; the old synchronous
 *    triggerPayoutForBooking call always threw "Dispute window has not yet
 *    passed" on day 0 and the error was swallowed)
 * 4. Send completion notification to property owner
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { DISPUTE_WINDOW_DAYS } from '@/lib/payments/contractor-payout';
import { sendBookingCompletedEmail } from '@/lib/email/client-notifications';
import { BookingStatus } from '@prisma/client';
import { z } from 'zod';

// Validation schema
const completeJobSchema = z.object({
  completionNotes: z.string().optional(),
  completionPhotos: z.array(z.string()).optional(),
  requestReview: z.boolean().optional().default(true),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    // Authenticate contractor
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR'])) {
      return unauthorizedRoleResponse(['CONTRACTOR']);
    }

    const { jobId } = params;
    const db = getTenantDb(authResult.context);

    // Parse request body
    const body = await request.json();
    const validatedData = completeJobSchema.parse(body);

    // Get contractor (Contractor model — Booking.contractorId references Contractor.id)
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        businessName: true,
      },
    });

    if (!contractor) {
      return NextResponse.json(
        { success: false, error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Get ContractorProfile to check Stripe Connect setup
    // stripeConnectAccountId lives on ContractorProfile (contractor_profiles), not Contractor
    const contractorProfile = await db.contractorProfile.findUnique({
      where: { userId: user.id },
      select: { stripeConnectAccountId: true },
    });

    if (!contractorProfile?.stripeConnectAccountId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Stripe Connect account not configured. Please complete payout setup.',
        },
        { status: 400 }
      );
    }

    // Get booking and verify contractor ownership
    const booking = await db.booking.findUnique({
      where: { id: jobId },
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
        contractor: {
          select: {
            id: true,
            businessName: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify contractor owns this job
    if (booking.contractorId !== contractor.id) {
      return NextResponse.json(
        { success: false, error: 'You are not assigned to this job' },
        { status: 403 }
      );
    }

    // Check if already completed
    if (booking.status === BookingStatus.COMPLETED) {
      return NextResponse.json(
        { success: false, error: 'This job is already marked as completed' },
        { status: 400 }
      );
    }

    // Check if job is in valid state to complete
    const validStatuses: string[] = [BookingStatus.IN_PROGRESS, BookingStatus.CONFIRMED];
    if (!validStatuses.includes(booking.status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Job must be IN_PROGRESS or CONFIRMED to complete. Current status: ${booking.status}`,
        },
        { status: 400 }
      );
    }

    // Update booking in transaction
    const updatedBooking = await db.$transaction(async (tx) => {
      // Mark booking as completed
      const completed = await tx.booking.update({
        where: { id: jobId },
        data: {
          status: BookingStatus.COMPLETED,
          completedAt: new Date(),
          // Store completion notes in internalNotes (Booking has no contractorNotes field)
          internalNotes: validatedData.completionNotes || null,
        },
      });

      // Update contractor stats (Contractor model has completedJobs only)
      await tx.contractor.update({
        where: { id: contractor.id },
        data: {
          completedJobs: { increment: 1 },
        },
      });

      // Create audit log
      await tx.auditLog.create({
        data: {
          action: 'COMPLETE',
          entityType: 'Booking',
          entityId: jobId,
          performedBy: user.id,
          newValues: {
            status: BookingStatus.COMPLETED,
            completedAt: new Date(),
          } as object,
        },
      });

      return completed;
    });

    // Payout is DEFERRED (DR-896): the daily contractor-payout-sweep cron pays
    // this booking's COMPLETED payment once the dispute window has passed. No
    // money moves here — the sweep + ContractorPayout ledger idempotency keys
    // guarantee exactly one transfer.

    // Send completion notification to client
    if (booking.client) {
      try {
        await sendBookingCompletedEmail({
          clientName: booking.client.name || 'Valued Client',
          email: booking.client.email,
          contractorName: contractor.businessName,
          bookingId: booking.id,
          serviceType: booking.australianServiceType,
          completedDate: new Date(),
        });
      } catch (emailError) {
        console.error('Failed to send completion email:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Job marked as completed successfully',
      booking: {
        id: updatedBooking.id,
        status: updatedBooking.status,
        completedAt: updatedBooking.completedAt,
      },
      payout: {
        deferred: true,
        message: `Payout is scheduled automatically after the ${DISPUTE_WINDOW_DAYS}-day dispute window via the daily payout sweep`,
      },
    });
  } catch (error) {
    console.error('Job completion error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to complete job' },
      { status: 500 }
    );
  }
}
