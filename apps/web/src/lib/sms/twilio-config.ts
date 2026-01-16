import { logger } from '@/lib/logger';

let twilioClient: any = null;

export function getTwilioClient() {
  if (process.env.NODE_ENV === 'development' && !process.env.TWILIO_ACCOUNT_SID) {
    logger.warn('Twilio not configured - SMS features disabled');
    return null;
  }

  if (!twilioClient && process.env.TWILIO_ACCOUNT_SID) {
    try {
      const twilio = require('twilio');
      twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    } catch (error) {
      logger.error('Failed to initialize Twilio', error);
      return null;
    }
  }

  return twilioClient;
}
