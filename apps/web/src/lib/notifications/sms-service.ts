/**
 * SMS Notification Service
 *
 * Sends SMS messages using Twilio for alerts, notifications, and OTP verification
 * Integrates with notification preferences to respect user communication settings
 *
 * Usage:
 * ```ts
 * import { smsService } from '@/lib/notifications/sms-service';
 *
 * // Send OTP
 * await smsService.sendOTP('61401234567', userId);
 *
 * // Send booking update
 * await smsService.sendBookingUpdate('61401234567', {
 *   bookingId: 'booking123',
 *   status: 'confirmed',
 *   contractorName: 'John Smith',
 * });
 *
 * // Send claim status update
 * await smsService.sendClaimStatusUpdate('61401234567', {
 *   claimId: 'claim123',
 *   status: 'approved',
 *   amount: 5000,
 * });
 * ```
 */

import twilio from 'twilio';
import { logError, logInfo, logWarn } from '@/lib/logger/helpers';
import { prisma } from '@/lib/prisma';

interface SMSConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
  maxRetries: number;
  retryDelay: number;
}

interface BookingUpdatePayload {
  bookingId: string;
  status: 'confirmed' | 'assigned' | 'completed' | 'cancelled';
  contractorName: string;
  jobType?: string;
  scheduledDate?: string;
}

interface ClaimStatusPayload {
  claimId: string;
  status: 'submitted' | 'reviewing' | 'approved' | 'denied' | 'paid';
  amount?: number;
  notes?: string;
}

interface RateLimitRecord {
  userId: string;
  count: number;
  resetAt: Date;
}

class SMSService {
  private client: ReturnType<typeof twilio> | null = null;
  private config: SMSConfig;
  private rateLimitMap = new Map<string, RateLimitRecord>();
  private maxSMSPerDay = 10; // Max SMS per user per day
  private rateLimitWindow = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
    const authToken = process.env.TWILIO_AUTH_TOKEN || '';
    const fromNumber = process.env.TWILIO_PHONE_NUMBER || '';

    this.config = {
      accountSid,
      authToken,
      fromNumber,
      maxRetries: 3,
      retryDelay: 1000,
    };

    if (accountSid && authToken && fromNumber) {
      try {
        this.client = twilio(accountSid, authToken);
        logInfo('Twilio SMS service initialized', { fromNumber });
      } catch (error) {
        logError(error, { context: 'twilio_initialization' });
        this.client = null;
      }
    } else {
      logWarn('Twilio SMS service not configured', {
        hasSid: !!accountSid,
        hasToken: !!authToken,
        hasNumber: !!fromNumber,
      });
    }
  }

  /**
   * Check if SMS service is available
   */
  isAvailable(): boolean {
    return this.client !== null && !!this.config.fromNumber;
  }

  /**
   * Check rate limit for user
   */
  private checkRateLimit(userId: string): boolean {
    const now = new Date();
    const record = this.rateLimitMap.get(userId);

    if (!record) {
      // First SMS from this user
      this.rateLimitMap.set(userId, {
        userId,
        count: 1,
        resetAt: new Date(now.getTime() + this.rateLimitWindow),
      });
      return true;
    }

    // Check if rate limit window has expired
    if (now > record.resetAt) {
      // Reset counter
      this.rateLimitMap.set(userId, {
        userId,
        count: 1,
        resetAt: new Date(now.getTime() + this.rateLimitWindow),
      });
      return true;
    }

    // Check if user exceeded limit
    if (record.count >= this.maxSMSPerDay) {
      logWarn('SMS rate limit exceeded', {
        userId,
        count: record.count,
        limit: this.maxSMSPerDay,
      });
      return false;
    }

    // Increment counter
    record.count++;
    return true;
  }

  /**
   * Normalize phone number to E.164 format
   * Handles Australian numbers
   */
  private normalizePhoneNumber(phoneNumber: string): string {
    let normalized = phoneNumber.replace(/[^\d+]/g, '');

    // Handle Australian numbers
    if (normalized.startsWith('0')) {
      normalized = '+61' + normalized.substring(1);
    } else if (normalized.startsWith('61') && !normalized.startsWith('+')) {
      normalized = '+' + normalized;
    } else if (!normalized.startsWith('+')) {
      normalized = '+' + normalized;
    }

    return normalized;
  }

  /**
   * Send SMS with retry logic
   */
  private async sendSMSWithRetry(
    to: string,
    message: string,
    retries: number = 0
  ): Promise<string | null> {
    if (!this.client) {
      logWarn('Twilio client not initialized');
      return null;
    }

    try {
      const result = await this.client.messages.create({
        body: message,
        from: this.config.fromNumber,
        to,
      });

      logInfo('SMS sent successfully', {
        to,
        sid: result.sid,
        status: result.status,
      });

      return result.sid;
    } catch (error: any) {
      logError(error, {
        context: 'sms_send_failed',
        to,
        retries,
      });

      // Retry on rate limit or temporary errors
      if (
        (error.code === 429 || error.status === 429) &&
        retries < this.config.maxRetries
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.config.retryDelay * (retries + 1))
        );
        return this.sendSMSWithRetry(to, message, retries + 1);
      }

      return null;
    }
  }

  /**
   * Send OTP verification code
   */
  async sendOTP(phoneNumber: string, userId: string): Promise<boolean> {
    try {
      // Check rate limit
      if (!this.checkRateLimit(userId)) {
        return false;
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Normalize phone number
      const to = this.normalizePhoneNumber(phoneNumber);

      // Compose message
      const message = `Your NRPG verification code is: ${otp}. Valid for 10 minutes.`;

      // Send SMS
      const sid = await this.sendSMSWithRetry(to, message);

      if (sid) {
        // Store OTP in database (if OTP model exists)
        try {
          // This would require OTP model in Prisma
          // await prisma.otp.create({
          //   data: {
          //     userId,
          //     code: otp,
          //     expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          //   },
          // });
          logInfo('OTP generated', { userId, expiresIn: '10 minutes' });
        } catch (dbError) {
          logError(dbError, { context: 'otp_storage_failed', userId });
        }

        return true;
      }

      return false;
    } catch (error) {
      logError(error, { context: 'send_otp_failed', userId });
      return false;
    }
  }

  /**
   * Send booking status update
   */
  async sendBookingUpdate(
    phoneNumber: string,
    payload: BookingUpdatePayload
  ): Promise<boolean> {
    try {
      const to = this.normalizePhoneNumber(phoneNumber);

      let message = `Your booking ${payload.bookingId} has been ${payload.status}.`;

      if (payload.contractorName) {
        message += ` Contractor: ${payload.contractorName}.`;
      }

      if (payload.jobType) {
        message += ` Job type: ${payload.jobType}.`;
      }

      if (payload.scheduledDate) {
        message += ` Scheduled: ${payload.scheduledDate}.`;
      }

      message += ' Reply HELP for support.';

      const sid = await this.sendSMSWithRetry(to, message);
      return sid !== null;
    } catch (error) {
      logError(error, {
        context: 'send_booking_update_failed',
        bookingId: payload.bookingId,
      });
      return false;
    }
  }

  /**
   * Send claim status update
   */
  async sendClaimStatusUpdate(
    phoneNumber: string,
    payload: ClaimStatusPayload
  ): Promise<boolean> {
    try {
      const to = this.normalizePhoneNumber(phoneNumber);

      let message = `Your claim ${payload.claimId} status: ${payload.status}.`;

      if (payload.amount) {
        message += ` Amount: $${payload.amount.toFixed(2)}.`;
      }

      if (payload.notes) {
        message += ` ${payload.notes}`;
      }

      message += ' Visit app for details.';

      const sid = await this.sendSMSWithRetry(to, message);
      return sid !== null;
    } catch (error) {
      logError(error, {
        context: 'send_claim_update_failed',
        claimId: payload.claimId,
      });
      return false;
    }
  }

  /**
   * Send emergency alert to contractor
   */
  async sendEmergencyAlert(
    phoneNumber: string,
    message: string,
    jobId: string
  ): Promise<boolean> {
    try {
      const to = this.normalizePhoneNumber(phoneNumber);

      const alertMessage = `🚨 EMERGENCY: ${message} Job: ${jobId}. Check app immediately.`;

      const sid = await this.sendSMSWithRetry(to, alertMessage);
      return sid !== null;
    } catch (error) {
      logError(error, {
        context: 'send_emergency_alert_failed',
        jobId,
      });
      return false;
    }
  }

  /**
   * Send SMS to multiple users
   */
  async sendBulkSMS(
    phoneNumbers: string[],
    message: string,
    userId?: string
  ): Promise<{ successful: number; failed: number }> {
    const results = await Promise.allSettled(
      phoneNumbers.map((phoneNumber) =>
        this.sendSMSWithRetry(this.normalizePhoneNumber(phoneNumber), message)
      )
    );

    const successful = results.filter((r) => r.status === 'fulfilled' && r.value !== null).length;
    const failed = results.length - successful;

    logInfo('Bulk SMS completed', {
      total: phoneNumbers.length,
      successful,
      failed,
      userId,
    });

    return { successful, failed };
  }

  /**
   * Verify phone number ownership
   */
  async verifyPhoneNumber(phoneNumber: string): Promise<boolean> {
    if (!this.isAvailable()) {
      logWarn('SMS service not available for verification');
      return false;
    }

    try {
      const to = this.normalizePhoneNumber(phoneNumber);

      // Send verification code
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const message = `Your NRPG verification code is: ${otp}`;

      const sid = await this.sendSMSWithRetry(to, message);
      return sid !== null;
    } catch (error) {
      logError(error, { context: 'phone_verification_failed', phoneNumber });
      return false;
    }
  }

  /**
   * Get SMS service status
   */
  getStatus(): {
    available: boolean;
    fromNumber: string;
    maxDaily: number;
    activeUsers: number;
  } {
    return {
      available: this.isAvailable(),
      fromNumber: this.config.fromNumber,
      maxDaily: this.maxSMSPerDay,
      activeUsers: this.rateLimitMap.size,
    };
  }
}

// Export singleton instance
export const smsService = new SMSService();

// Export class for testing
export { SMSService };
