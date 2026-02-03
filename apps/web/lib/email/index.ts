/**
 * Email Module Index
 *
 * Exports all email-related functions for easy importing.
 */

// Re-export from resend service
export {
  sendEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendLeadConfirmationEmail,
  sendNewsletterWelcomeEmail,
  getResendClient,
} from './resend';

// Re-export templates
export {
  contractorApplicationReceived,
  adminNewApplication,
  applicationApproved,
  sendTemplateEmail,
} from './templates';

// Re-export billing emails
export {
  sendPaymentFailureEmail,
  sendPaymentSuccessEmail,
  sendTrialEndingEmail,
} from './billing';

// Re-export types
export type { EmailTemplate } from './templates';
export type { SendEmailOptions } from './resend';
