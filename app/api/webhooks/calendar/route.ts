/**
 * Calendar Webhook Handler
 *
 * Handles Google Calendar event confirmations and updates
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('[WEBHOOK] Calendar event:', body);

    // Handle different calendar event types
    // - Event created
    // - Event updated
    // - Event cancelled
    // - Attendee response changed

    // Update job status based on calendar changes
    // if (body.eventType === 'confirmed') {
    //   await updateJobStatus(body.jobId, 'CONFIRMED');
    // }

    return NextResponse.json({
      success: true,
      processed: true,
    });
  } catch (error) {
    console.error('[WEBHOOK] Calendar error:', error);

    return NextResponse.json(
      {
        error: 'WEBHOOK_ERROR',
        message: 'Failed to process calendar webhook',
      },
      { status: 500 }
    );
  }
}

// Route segment configuration
export const runtime = 'nodejs';
export const maxDuration = 10;
