/**
 * SMS Notification API Route
 *
 * POST /api/notifications/sms - Send SMS notification
 * GET /api/notifications/sms/status - Get SMS service status
 *
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { smsService } from '@/lib/notifications/sms-service';
import { logError, logInfo } from '@/lib/logger/helpers';

/**
 * GET /api/notifications/sms/status
 * Get SMS service status (health check)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    // Health check (public)
    if (action === 'health') {
      const status = smsService.getStatus();
      return NextResponse.json(
        {
          service: 'sms',
          status: status.available ? 'healthy' : 'unavailable',
          details: status,
        },
        { status: 200 }
      );
    }

    // Status (authenticated only)
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const status = smsService.getStatus();
    return NextResponse.json(
      {
        service: 'sms',
        available: status.available,
        fromNumber: status.fromNumber,
        maxDailyPerUser: status.maxDaily,
        activeRateLimitedUsers: status.activeUsers,
      },
      { status: 200 }
    );
  } catch (error) {
    logError(error, { context: 'sms_status_endpoint' });
    return NextResponse.json(
      { error: 'Failed to get SMS service status' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notifications/sms
 * Send SMS notification
 *
 * Body:
 * {
 *   type: 'otp' | 'booking' | 'claim' | 'alert' | 'custom',
 *   phoneNumber: string,
 *   payload?: object,
 *   message?: string (for custom type)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check if SMS service is available
    if (!smsService.isAvailable()) {
      logError(new Error('SMS service not configured'), { context: 'sms_endpoint' });
      return NextResponse.json(
        { error: 'SMS service not available' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { type, phoneNumber, payload, message } = body;

    // Validate input
    if (!type || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: type, phoneNumber' },
        { status: 400 }
      );
    }

    const userId = user.id;
    let success = false;
    let result: any = { sent: false };

    switch (type) {
      case 'otp':
        success = await smsService.sendOTP(phoneNumber, userId);
        result = { sent: success, type: 'otp' };
        break;

      case 'booking':
        if (!payload?.bookingId || !payload?.status) {
          return NextResponse.json(
            { error: 'Invalid payload for booking type' },
            { status: 400 }
          );
        }
        success = await smsService.sendBookingUpdate(phoneNumber, payload);
        result = { sent: success, type: 'booking', bookingId: payload.bookingId };
        break;

      case 'claim':
        if (!payload?.claimId || !payload?.status) {
          return NextResponse.json(
            { error: 'Invalid payload for claim type' },
            { status: 400 }
          );
        }
        success = await smsService.sendClaimStatusUpdate(phoneNumber, payload);
        result = { sent: success, type: 'claim', claimId: payload.claimId };
        break;

      case 'alert':
        if (!payload?.message || !payload?.jobId) {
          return NextResponse.json(
            { error: 'Invalid payload for alert type' },
            { status: 400 }
          );
        }
        success = await smsService.sendEmergencyAlert(
          phoneNumber,
          payload.message,
          payload.jobId
        );
        result = { sent: success, type: 'alert', jobId: payload.jobId };
        break;

      case 'custom':
        if (!message) {
          return NextResponse.json(
            { error: 'Message required for custom type' },
            { status: 400 }
          );
        }
        success = await smsService.sendBulkSMS([phoneNumber], message, userId);
        result = { sent: success.successful > 0, type: 'custom' };
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid SMS type' },
          { status: 400 }
        );
    }

    logInfo('SMS sent', {
      userId,
      type,
      success,
      phoneNumber: phoneNumber.replace(/\d{2}(?=\d{4})/g, 'XX'), // Mask phone number
    });

    return NextResponse.json(result, { status: success ? 200 : 503 });
  } catch (error) {
    logError(error, { context: 'sms_endpoint' });
    return NextResponse.json(
      { error: 'Failed to send SMS' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { message: 'OK' },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      status: 200,
    }
  );
}
