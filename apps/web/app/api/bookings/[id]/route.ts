/**
 * Booking Detail API Route
 * Handles individual booking operations
 * GET    /api/bookings/[id] - Get booking details
 * PATCH  /api/bookings/[id] - Update booking
 * DELETE /api/bookings/[id] - Cancel booking
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { BookingStatus } from '@prisma/client';
import { sendReviewRequestEmail } from '@/lib/email/client-notifications';

// ============================================================================
// GET /api/bookings/[id] - Get booking details
// ============================================================================

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const booking = await db.booking.findUnique({
      where: { id: params.id },
      include: {
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
            completedJobs: true,
            operatingStates: true,
            australianSpecialties: true,
          },
        },
        payments: {
          select: {
            id: true,
            amountAUD: true,
            status: true,
            createdAt: true,
          },
        },
        auClaims: {
          select: {
            id: true,
            status: true,
            totalClaimAmountAUD: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check authorization: client, contractor, or admin
    const isAuthorized =
      user.id === booking.clientId ||
      (booking.contractorId && user.id === booking.contractorId) ||
      user.userType === 'ADMIN';

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Not authorized to view this booking' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Error fetching booking' },
      { status: 500 }
    );
  }
}

// ============================================================================
// PATCH /api/bookings/[id] - Update booking
// ============================================================================

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const booking = await db.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check authorization: client or admin
    if (user.id !== booking.clientId && user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Not authorized to update this booking' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updates: any = {};

    // Only allow specific fields to be updated
    if (body.clientNotes !== undefined) {
      updates.clientNotes = body.clientNotes;
    }

    if (body.scheduledDate !== undefined) {
      updates.scheduledDate = new Date(body.scheduledDate);
    }

    if (body.status && user.userType === 'ADMIN') {
      updates.status = body.status;
    }

    const updatedBooking = await db.booking.update({
      where: { id: params.id },
      data: updates,
      include: {
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
          },
        },
        client: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Send review request email if booking was just completed
    if (
      updates.status === BookingStatus.COMPLETED &&
      booking.status !== BookingStatus.COMPLETED &&
      updatedBooking.client &&
      updatedBooking.contractor
    ) {
      sendReviewRequestEmail({
        clientName: updatedBooking.client.name || 'Valued Client',
        email: updatedBooking.client.email,
        contractorName: updatedBooking.contractor.businessName,
        bookingId: updatedBooking.id,
        serviceType: updatedBooking.australianServiceType,
        completedDate: new Date(),
      }).catch((error) => {
        console.error('Failed to send review request email:', error);
      });
    }

    // Log audit
    await db.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Booking',
        entityId: booking.id,
        performedBy: user.id,
        oldValues: booking as any,
        newValues: updatedBooking as any,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Error updating booking' },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE /api/bookings/[id] - Cancel booking
// ============================================================================

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const booking = await db.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check authorization: client or admin
    if (user.id !== booking.clientId && user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Not authorized to cancel this booking' },
        { status: 403 }
      );
    }

    // Can only cancel if not already in progress or completed
    if (
      booking.status === BookingStatus.IN_PROGRESS ||
      booking.status === BookingStatus.COMPLETED
    ) {
      return NextResponse.json(
        { error: 'Cannot cancel booking that is in progress or completed' },
        { status: 400 }
      );
    }

    const cancelledBooking = await db.booking.update({
      where: { id: params.id },
      data: { status: BookingStatus.CANCELLED },
    });

    // Log audit
    await db.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Booking',
        entityId: booking.id,
        performedBy: user.id,
        newValues: { status: BookingStatus.CANCELLED } as any,
      },
    });

    return NextResponse.json({
      success: true,
      data: cancelledBooking,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Error cancelling booking' },
      { status: 500 }
    );
  }
}
