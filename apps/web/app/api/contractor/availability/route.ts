/**
 * Contractor Availability Toggle API
 *
 * Allows contractors to control their visibility with 30-minute grace period.
 * When toggling OFF, contractors are excluded from NEW job matching for 30 minutes.
 * Already-sent job offers remain valid.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { basePrisma } from '@/lib/prisma';

const GRACE_PERIOD_MINUTES = 30;

/**
 * GET /api/contractor/availability
 * Get current availability status and time remaining
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate request (contractor only)
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Get contractor record
    const contractor = await basePrisma.contractor.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        businessName: true,
        unavailableUntil: true,
        isActive: true,
        isSuspended: true,
      },
    });

    if (!contractor) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Contractor profile not found',
        },
        { status: 404 }
      );
    }

    // Calculate availability status
    const now = new Date();
    const isUnavailable = contractor.unavailableUntil && contractor.unavailableUntil > now;
    const minutesRemaining = isUnavailable
      ? Math.ceil((contractor.unavailableUntil!.getTime() - now.getTime()) / 60000)
      : 0;

    // Determine overall status
    let status: 'available' | 'unavailable' | 'suspended' | 'inactive';
    if (contractor.isSuspended) {
      status = 'suspended';
    } else if (!contractor.isActive) {
      status = 'inactive';
    } else if (isUnavailable) {
      status = 'unavailable';
    } else {
      status = 'available';
    }

    return NextResponse.json({
      success: true,
      availability: {
        status,
        isActive: contractor.isActive,
        isSuspended: contractor.isSuspended,
        unavailableUntil: contractor.unavailableUntil,
        minutesRemaining,
        canReceiveNewJobs: status === 'available',
      },
    });
  } catch (error) {
    console.error('Get availability error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/contractor/availability
 * Toggle availability ON/OFF with 30-minute grace period
 *
 * Request body: { available: boolean }
 */
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate request (contractor only)
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Parse request body
    const body = await request.json();
    const { available } = body;

    if (typeof available !== 'boolean') {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'Request body must include "available" boolean field',
        },
        { status: 400 }
      );
    }

    // Get contractor record
    const contractor = await basePrisma.contractor.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        businessName: true,
        isActive: true,
        isSuspended: true,
        unavailableUntil: true,
      },
    });

    if (!contractor) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Contractor profile not found',
        },
        { status: 404 }
      );
    }

    // Check if contractor is suspended (cannot change availability)
    if (contractor.isSuspended) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'Cannot change availability while suspended. Please contact support.',
        },
        { status: 403 }
      );
    }

    // Calculate new unavailableUntil timestamp
    const now = new Date();
    const unavailableUntil = available
      ? null // Toggle ON: Clear unavailability
      : new Date(now.getTime() + GRACE_PERIOD_MINUTES * 60 * 1000); // Toggle OFF: Set grace period

    // Update contractor availability
    await basePrisma.contractor.update({
      where: { id: contractor.id },
      data: { unavailableUntil },
    });

    const action = available ? 'available' : 'unavailable';
    console.log(
      `[Contractor Availability] ${contractor.businessName} set to ${action}${unavailableUntil ? ` until ${unavailableUntil.toISOString()}` : ''}`
    );

    return NextResponse.json({
      success: true,
      message: available
        ? 'You are now available to receive new job offers'
        : `You will not receive new job offers for ${GRACE_PERIOD_MINUTES} minutes`,
      availability: {
        status: available ? 'available' : 'unavailable',
        unavailableUntil,
        minutesRemaining: available ? 0 : GRACE_PERIOD_MINUTES,
        canReceiveNewJobs: available,
      },
    });
  } catch (error) {
    console.error('Update availability error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/contractor/availability
 * Cancel unavailability (immediately become available again)
 */
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate request (contractor only)
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Get contractor record
    const contractor = await basePrisma.contractor.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        businessName: true,
        unavailableUntil: true,
      },
    });

    if (!contractor) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'Contractor profile not found',
        },
        { status: 404 }
      );
    }

    // Check if already available
    const now = new Date();
    const isCurrentlyUnavailable = contractor.unavailableUntil && contractor.unavailableUntil > now;

    if (!isCurrentlyUnavailable) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'You are already available',
        },
        { status: 400 }
      );
    }

    // Clear unavailability
    await basePrisma.contractor.update({
      where: { id: contractor.id },
      data: { unavailableUntil: null },
    });

    console.log(`[Contractor Availability] ${contractor.businessName} cancelled unavailability`);

    return NextResponse.json({
      success: true,
      message: 'You are now available to receive new job offers',
      availability: {
        status: 'available',
        unavailableUntil: null,
        minutesRemaining: 0,
        canReceiveNewJobs: true,
      },
    });
  } catch (error) {
    console.error('Cancel unavailability error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
