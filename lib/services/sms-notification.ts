/**
 * SMS Notification Service
 *
 * Handles SMS delivery via Twilio for emergency alerts and notifications
 */

export interface SMSConfig {
  accountSid?: string;
  authToken?: string;
  fromNumber?: string;
}

export interface SMSMessage {
  to: string;
  message: string;
  priority?: 'high' | 'normal' | 'low';
}

export interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
  status?: string;
}

/**
 * Send SMS notification
 */
export async function sendSMS(
  message: SMSMessage,
  config?: SMSConfig
): Promise<SMSResult> {
  // Get Twilio credentials from environment
  const accountSid = config?.accountSid || process.env.TWILIO_ACCOUNT_SID;
  const authToken = config?.authToken || process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = config?.fromNumber || process.env.TWILIO_FROM_NUMBER || '+61234567890';

  // Validate phone number format (Australian)
  const phoneRegex = /^(\+61|0)[4-5]\d{8}$/;
  if (!phoneRegex.test(message.to)) {
    return {
      success: false,
      error: 'INVALID_PHONE_NUMBER',
    };
  }

  // Format phone number to E.164 format
  const formattedPhone = message.to.startsWith('+61')
    ? message.to
    : message.to.replace(/^0/, '+61');

  // Mock SMS sending if Twilio not configured (dev mode)
  if (!accountSid || !authToken) {
    console.log('[SMS] Mock sending to:', formattedPhone);
    console.log('[SMS] Message:', message.message);

    return {
      success: true,
      messageId: `mock_${Date.now()}`,
      status: 'sent',
    };
  }

  try {
    // In production, use Twilio SDK
    // const twilio = require('twilio');
    // const client = twilio(accountSid, authToken);
    // const result = await client.messages.create({
    //   body: message.message,
    //   from: fromNumber,
    //   to: formattedPhone,
    // });

    // Mock response for now
    const result = {
      sid: `SM${Date.now()}`,
      status: 'queued',
    };

    return {
      success: true,
      messageId: result.sid,
      status: result.status,
    };
  } catch (error) {
    console.error('[SMS] Send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SMS_SEND_FAILED',
    };
  }
}

/**
 * Send emergency job alert to contractor
 */
export async function sendEmergencyJobAlert(
  contractorPhone: string,
  jobDetails: {
    jobId: string;
    serviceType: string;
    location: string;
    urgency: string;
    estimatedValue: number;
  }
): Promise<SMSResult> {
  const message = `
🚨 NEW EMERGENCY JOB

Type: ${jobDetails.serviceType.toUpperCase()}
Location: ${jobDetails.location}
Urgency: ${jobDetails.urgency.toUpperCase()}
Est. Value: $${jobDetails.estimatedValue.toLocaleString()}

Accept job: https://disasterrecovery.com.au/jobs/${jobDetails.jobId}

Reply STOP to opt out
`.trim();

  return sendSMS({
    to: contractorPhone,
    message,
    priority: 'high',
  });
}

/**
 * Send job acceptance confirmation to customer
 */
export async function sendJobAcceptanceConfirmation(
  customerPhone: string,
  details: {
    contractorName: string;
    contractorPhone: string;
    estimatedArrival: string;
  }
): Promise<SMSResult> {
  const message = `
✅ Job Accepted - Disaster Recovery Brisbane

Contractor: ${details.contractorName}
Phone: ${details.contractorPhone}
ETA: ${details.estimatedArrival}

Track your job: https://disasterrecovery.com.au/track

Need help? Call 1300 309 361
`.trim();

  return sendSMS({
    to: customerPhone,
    message,
    priority: 'high',
  });
}

/**
 * Send contractor en-route notification
 */
export async function sendContractorEnRouteNotification(
  customerPhone: string,
  details: {
    contractorName: string;
    estimatedArrival: string;
  }
): Promise<SMSResult> {
  const message = `
🚗 Contractor En Route

${details.contractorName} is on the way!
ETA: ${details.estimatedArrival}

Track: https://disasterrecovery.com.au/track
`.trim();

  return sendSMS({
    to: customerPhone,
    message,
    priority: 'high',
  });
}

/**
 * Send appointment reminder
 */
export async function sendAppointmentReminder(
  phone: string,
  details: {
    appointmentTime: string;
    serviceType: string;
    address: string;
  }
): Promise<SMSResult> {
  const message = `
📅 Appointment Reminder

Service: ${details.serviceType}
When: ${details.appointmentTime}
Where: ${details.address}

Disaster Recovery Brisbane
1300 309 361
`.trim();

  return sendSMS({
    to: phone,
    message,
    priority: 'normal',
  });
}

/**
 * Send quote ready notification
 */
export async function sendQuoteReadyNotification(
  customerPhone: string,
  quoteId: string
): Promise<SMSResult> {
  const message = `
💰 Your Quote is Ready

View and accept your quote:
https://disasterrecovery.com.au/quotes/${quoteId}

Questions? Call 1300 309 361
`.trim();

  return sendSMS({
    to: customerPhone,
    message,
    priority: 'normal',
  });
}

/**
 * Bulk SMS sending with rate limiting
 */
export async function sendBulkSMS(
  messages: SMSMessage[],
  config?: SMSConfig & { delayMs?: number }
): Promise<SMSResult[]> {
  const results: SMSResult[] = [];
  const delayMs = config?.delayMs || 100; // Default 100ms delay between messages

  for (const message of messages) {
    const result = await sendSMS(message, config);
    results.push(result);

    // Rate limiting delay
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Check SMS delivery status (webhook handler)
 */
export function handleDeliveryStatus(webhookData: {
  MessageSid: string;
  MessageStatus: string;
  ErrorCode?: string;
}): {
  messageId: string;
  status: string;
  error?: string;
} {
  return {
    messageId: webhookData.MessageSid,
    status: webhookData.MessageStatus,
    error: webhookData.ErrorCode,
  };
}
