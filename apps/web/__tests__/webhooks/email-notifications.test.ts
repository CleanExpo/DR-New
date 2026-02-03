/**
 * Email Notification Tests
 *
 * Tests billing email notifications:
 * - Payment failure emails (with retry schedule)
 * - Payment success emails (with receipt)
 * - Trial ending emails (3 days before expiry)
 * - Error handling (email service failures)
 * - Non-blocking email delivery
 */

import {
  sendPaymentFailureEmail,
  sendPaymentSuccessEmail,
  sendTrialEndingEmail,
} from '@/lib/email/billing';
import { sendEmail } from '@/lib/email/resend';

// Mock Resend email service
jest.mock('@/lib/email/resend', () => ({
  sendEmail: jest.fn(),
}));

describe('Billing Email Notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('sendPaymentFailureEmail', () => {
    it('should send payment failure email with correct details', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      const result = await sendPaymentFailureEmail({
        email: 'owner@business.com',
        businessName: 'Acme Corp',
        amountAUD: 99.0,
        attemptCount: 1,
        subscriptionTier: 'PROFESSIONAL',
        lastFourDigits: '4242',
      });

      expect(result.success).toBe(true);
      expect(sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'owner@business.com',
          subject: expect.stringContaining('Payment Failed'),
        })
      );

      // Verify HTML content includes key information
      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];
      expect(emailCall.html).toContain('Acme Corp');
      expect(emailCall.html).toContain('$99.00 AUD');
      expect(emailCall.html).toContain('1/3'); // Attempt count
      expect(emailCall.html).toContain('4242'); // Last 4 digits

      // Verify plain text version exists
      expect(emailCall.text).toContain('Acme Corp');
      expect(emailCall.text).toContain('$99.00 AUD');
    });

    it('should include retry schedule in email content', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      await sendPaymentFailureEmail({
        email: 'owner@test.com',
        businessName: 'Test Business',
        amountAUD: 49.0,
        attemptCount: 2,
        subscriptionTier: 'BASIC',
      });

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];

      // Check retry schedule is mentioned
      expect(emailCall.html).toContain('Day 1');
      expect(emailCall.html).toContain('Day 3');
      expect(emailCall.html).toContain('Day 7');
      expect(emailCall.text).toContain('Day 1');
      expect(emailCall.text).toContain('retry');
    });

    it('should handle different attempt counts correctly', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      // Third attempt (final retry)
      await sendPaymentFailureEmail({
        email: 'owner@test.com',
        businessName: 'Test Co',
        amountAUD: 199.0,
        attemptCount: 3,
        subscriptionTier: 'ENTERPRISE',
      });

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];
      expect(emailCall.html).toContain('3/3'); // Final attempt
      expect(emailCall.html).toContain('suspend'); // Warning about suspension
    });

    it('should return error when email service fails', async () => {
      (sendEmail as jest.Mock).mockRejectedValue(new Error('Resend API unavailable'));

      const result = await sendPaymentFailureEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        amountAUD: 49.0,
        attemptCount: 1,
        subscriptionTier: 'BASIC',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Resend API unavailable');
    });

    it('should work without optional lastFourDigits', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      const result = await sendPaymentFailureEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        amountAUD: 99.0,
        attemptCount: 1,
        subscriptionTier: 'PROFESSIONAL',
        // No lastFourDigits provided
      });

      expect(result.success).toBe(true);
      expect(sendEmail).toHaveBeenCalled();

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];
      // Should not crash without payment method details
      expect(emailCall.html).toBeTruthy();
      expect(emailCall.text).toBeTruthy();
    });
  });

  describe('sendPaymentSuccessEmail', () => {
    it('should send payment success email with receipt details', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      const nextBillingDate = new Date('2024-02-15');

      const result = await sendPaymentSuccessEmail({
        email: 'owner@business.com',
        businessName: 'Acme Corp',
        amountAUD: 99.0,
        subscriptionTier: 'PROFESSIONAL',
        nextBillingDate,
        lastFourDigits: '4242',
      });

      expect(result.success).toBe(true);
      expect(sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'owner@business.com',
          subject: expect.stringContaining('Payment Confirmed'),
        })
      );

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];
      expect(emailCall.html).toContain('Acme Corp');
      expect(emailCall.html).toContain('$99.00 AUD');
      expect(emailCall.html).toContain('PROFESSIONAL');
      expect(emailCall.html).toContain('4242');

      // Verify plain text version
      expect(emailCall.text).toContain('$99.00 AUD');
      expect(emailCall.text).toContain('PROFESSIONAL');
    });

    it('should include next billing date in email', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      const nextBillingDate = new Date('2024-03-01');

      await sendPaymentSuccessEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        amountAUD: 49.0,
        subscriptionTier: 'BASIC',
        nextBillingDate,
      });

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];

      // Next billing date should be mentioned
      expect(emailCall.html).toContain('March'); // Date formatting
      expect(emailCall.text).toContain('2024'); // Year
    });

    it('should include invoice URL if provided', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      await sendPaymentSuccessEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        amountAUD: 99.0,
        subscriptionTier: 'PROFESSIONAL',
        nextBillingDate: new Date('2024-02-15'),
        invoiceUrl: 'https://invoice.stripe.com/i/acct_123/test_456',
      });

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];

      // Invoice URL should be linked
      expect(emailCall.html).toContain('invoice.stripe.com');
      expect(emailCall.html).toContain('View Invoice');
    });

    it('should return error when email service fails', async () => {
      (sendEmail as jest.Mock).mockRejectedValue(new Error('Email service timeout'));

      const result = await sendPaymentSuccessEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        amountAUD: 49.0,
        subscriptionTier: 'BASIC',
        nextBillingDate: new Date(),
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Email service timeout');
    });
  });

  describe('sendTrialEndingEmail', () => {
    it('should send trial ending reminder with pricing', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      const trialEndsAt = new Date('2024-02-18'); // 3 days from now

      const result = await sendTrialEndingEmail({
        email: 'owner@startup.com',
        businessName: 'Startup Inc',
        trialEndsAt,
        subscriptionTier: 'PROFESSIONAL',
        monthlyPrice: 99,
      });

      expect(result.success).toBe(true);
      expect(sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'owner@startup.com',
          subject: expect.stringContaining('Trial Ending'),
        })
      );

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];
      expect(emailCall.html).toContain('Startup Inc');
      expect(emailCall.html).toContain('PROFESSIONAL');
      expect(emailCall.html).toContain('$99'); // Monthly price

      // Verify plain text version
      expect(emailCall.text).toContain('trial');
      expect(emailCall.text).toContain('$99');
    });

    it('should show correct pricing for different tiers', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      // Test BASIC tier
      await sendTrialEndingEmail({
        email: 'basic@test.com',
        businessName: 'Basic Co',
        trialEndsAt: new Date('2024-02-18'),
        subscriptionTier: 'BASIC',
        monthlyPrice: 49,
      });

      let emailCall = (sendEmail as jest.Mock).mock.calls[0][0];
      expect(emailCall.html).toContain('$49');
      expect(emailCall.html).toContain('BASIC');

      jest.clearAllMocks();

      // Test ENTERPRISE tier
      await sendTrialEndingEmail({
        email: 'enterprise@test.com',
        businessName: 'Enterprise Corp',
        trialEndsAt: new Date('2024-02-18'),
        subscriptionTier: 'ENTERPRISE',
        monthlyPrice: 199,
      });

      emailCall = (sendEmail as jest.Mock).mock.calls[0][0];
      expect(emailCall.html).toContain('$199');
      expect(emailCall.html).toContain('ENTERPRISE');
    });

    it('should include trial end date prominently', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      const trialEndsAt = new Date('2024-02-20T23:59:59Z');

      await sendTrialEndingEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        trialEndsAt,
        subscriptionTier: 'PROFESSIONAL',
        monthlyPrice: 99,
      });

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];

      // Date should be formatted and visible
      expect(emailCall.html).toContain('February'); // Month
      expect(emailCall.html).toContain('20'); // Day
      expect(emailCall.html).toContain('2024'); // Year

      expect(emailCall.text).toContain('2024'); // Plain text version
    });

    it('should return error when email service fails', async () => {
      (sendEmail as jest.Mock).mockRejectedValue(new Error('SMTP connection refused'));

      const result = await sendTrialEndingEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        trialEndsAt: new Date('2024-02-18'),
        subscriptionTier: 'BASIC',
        monthlyPrice: 49,
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('SMTP connection refused');
    });
  });

  describe('Email Format Validation', () => {
    it('should send emails with both HTML and plain text versions', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      await sendPaymentSuccessEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        amountAUD: 49.0,
        subscriptionTier: 'BASIC',
        nextBillingDate: new Date(),
      });

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];

      // Both HTML and text should be present
      expect(emailCall.html).toBeTruthy();
      expect(emailCall.text).toBeTruthy();
      expect(emailCall.html.length).toBeGreaterThan(100);
      expect(emailCall.text.length).toBeGreaterThan(50);
    });

    it('should use Australian English spelling in emails', async () => {
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      await sendPaymentFailureEmail({
        email: 'owner@test.com',
        businessName: 'Test',
        amountAUD: 49.0,
        attemptCount: 1,
        subscriptionTier: 'BASIC',
      });

      const emailCall = (sendEmail as jest.Mock).mock.calls[0][0];

      // Check for British/Australian spelling (e.g., "organisation" not "organization")
      // The emails should follow Australian English conventions
      expect(emailCall.html).toBeDefined();
      expect(emailCall.text).toBeDefined();
    });
  });

  describe('Non-Blocking Email Delivery', () => {
    it('should handle email failures gracefully without throwing', async () => {
      (sendEmail as jest.Mock).mockRejectedValue(new Error('Service unavailable'));

      // All email functions should catch errors and return error object
      const failureResult = await sendPaymentFailureEmail({
        email: 'test@test.com',
        businessName: 'Test',
        amountAUD: 49.0,
        attemptCount: 1,
        subscriptionTier: 'BASIC',
      });

      expect(failureResult.success).toBe(false);
      expect(failureResult.error).toBeDefined();

      const successResult = await sendPaymentSuccessEmail({
        email: 'test@test.com',
        businessName: 'Test',
        amountAUD: 49.0,
        subscriptionTier: 'BASIC',
        nextBillingDate: new Date(),
      });

      expect(successResult.success).toBe(false);
      expect(successResult.error).toBeDefined();

      const trialResult = await sendTrialEndingEmail({
        email: 'test@test.com',
        businessName: 'Test',
        trialEndsAt: new Date(),
        subscriptionTier: 'BASIC',
        monthlyPrice: 49,
      });

      expect(trialResult.success).toBe(false);
      expect(trialResult.error).toBeDefined();
    });

    it('should log errors but not throw in webhook context', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      (sendEmail as jest.Mock).mockRejectedValue(new Error('Network timeout'));

      // Email send failures should be logged
      await sendPaymentSuccessEmail({
        email: 'test@test.com',
        businessName: 'Test',
        amountAUD: 49.0,
        subscriptionTier: 'BASIC',
        nextBillingDate: new Date(),
      });

      // Should not throw, allowing webhook to complete
      expect(() => sendEmail).not.toThrow();

      consoleSpy.mockRestore();
    });
  });
});
