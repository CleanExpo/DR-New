/**
 * Twilio Webhook Handler
 *
 * Handles SMS delivery status callbacks from Twilio
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleDeliveryStatus } from '@/lib/services/sms-notification';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const webhookData = {
      MessageSid: formData.get('MessageSid') as string,
      MessageStatus: formData.get('MessageStatus') as string,
      ErrorCode: formData.get('ErrorCode') as string | undefined,
    };

    // Validate Twilio signature (in production)
    // const signature = request.headers.get('x-twilio-signature');
    // const isValid = validateTwilioSignature(signature, webhookData);

    const status = handleDeliveryStatus(webhookData);

    console.log('[WEBHOOK] Twilio status update:', status);

    // Update database with delivery status
    // await updateSMSDeliveryStatus(status.messageId, status.status);

    return NextResponse.json({
      success: true,
      messageId: status.messageId,
      status: status.status,
    });
  } catch (error) {
    console.error('[WEBHOOK] Twilio error:', error);

    return NextResponse.json(
      {
        error: 'WEBHOOK_ERROR',
        message: 'Failed to process Twilio webhook',
      },
      { status: 500 }
    );
  }
}

// Route segment configuration
export const runtime = 'nodejs';
export const maxDuration = 10;
