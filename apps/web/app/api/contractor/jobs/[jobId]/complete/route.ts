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
 * 3. Calculate contractor earnings ($550 flat fee)
 * 4. Trigger Stripe payout
 * 5. Send completion notification to property owner
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { triggerPayoutForBooking } from '@/lib/payments/contractor-payout';
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

    // Get contractor profile
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        businessName: true,
        stripeConnectAccountId: true,
      },
    });

    if (!contractor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contractor profile not found'
        },
        { status: 404 }
      );
    }

    // Verify contractor has Stripe Connect setup
    if (!contractor.stripeConnectAccountId) {
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
        {
          success: false,
          error: 'Booking not found'
        },
        { status: 404 }
      );
    }

    // Verify contractor owns this job
    if (booking.contractorId !== contractor.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'You are not assigned to this job'
        },
        { status: 403 }
      );
    }

    // Check if already completed
    if (booking.status === BookingStatus.COMPLETED) {
      return NextResponse.json(
        {
          success: false,
          error: 'This job is already marked as completed'
        },
        { status: 400 }
      );
    }

    // Check if job is in valid state to complete
    const validStatuses = [BookingStatus.IN_PROGRESS, BookingStatus.CONFIRMED];
    if (!validStatuses.includes(booking.status as BookingStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Job must be IN_PROGRESS or CONFIRMED to complete. Current status: ${booking.status}`
        },
        { status: 400 }
      );
    }

    // Update booking in transaction
    const updatedBooking = await db.$transaction(async (tx: any) => {
      // Mark booking as completed
      const completed = await tx.booking.update({
        where: { id: jobId },
        data: {
          status: BookingStatus.COMPLETED,
          completedAt: new Date(),
          contractorNotes: validatedData.completionNotes || null,
        },
      });

      // Update contractor stats
      await tx.contractor.update({
        where: { id: contractor.id },
        data: {
          completedJobs: { increment: 1 },
          totalJobs: { increment: 1 },
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
          } as any,
        },
      });

      return completed;
    });

    // Trigger payout (this is async and may take time)
    // We don't wait for it to complete to avoid timeout
    let payoutTriggered = false;
    let payoutError = null;

    try {
      await triggerPayoutForBooking(jobId);
      payoutTriggered = true;
    } catch (error) {
      console.error('Payout trigger failed:', error);
      payoutError = true;
      // Don't fail the request - job is still completed
      // Admin can manually trigger payout if needed
    }

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
        // Don't fail the request
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
        triggered: payoutTriggered,
        ...(payoutError && {
          warning: 'Payout will be processed manually by admin',
        }),
      },
    });
  } catch (error) {
    console.error('Job completion error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to complete job' },
      { status: 500 }
    );
  }
}
