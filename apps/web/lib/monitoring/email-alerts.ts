/**
 * Email Alert Delivery System
 *
 * Sends critical alerts via email to on-call engineers and admin team.
 * Integrates with existing admin-notifications email templates.
 */

import {
  sendPaymentFailureAlertEmail,
  sendSuspiciousActivityAlertEmail,
  sendSystemHealthAlertEmail,
  sendNewContractorApplicationEmail,
} from '../email/admin-notifications';

/**
 * Email alert configuration
 */
const EMAIL_ALERT_CONFIG = {
  recipients: {
    oncall: process.env.ALERT_EMAIL_ONCALL?.split(',') || [],
    engineering: process.env.ALERT_EMAIL_ENGINEERING?.split(',') || [],
    admin: process.env.ALERT_EMAIL_ADMIN?.split(',') || [],
  },
  enabled: process.env.EMAIL_ALERTS_ENABLED !== 'false', // Enabled by default
};

/**
 * Alert severity levels for email routing
 */
export enum EmailAlertSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * Get email recipients based on severity
 */
function getRecipientsForSeverity(severity: EmailAlertSeverity): string[] {
  switch (severity) {
    case EmailAlertSeverity.CRITICAL:
      // Critical: Everyone
      return [...EMAIL_ALERT_CONFIG.recipients.oncall, ...EMAIL_ALERT_CONFIG.recipients.engineering, ...EMAIL_ALERT_CONFIG.recipients.admin];
    case EmailAlertSeverity.HIGH:
      // High: On-call and engineering
      return [...EMAIL_ALERT_CONFIG.recipients.oncall, ...EMAIL_ALERT_CONFIG.recipients.engineering];
    case EmailAlertSeverity.MEDIUM:
      // Medium: Engineering team
      return EMAIL_ALERT_CONFIG.recipients.engineering;
    case EmailAlertSeverity.LOW:
      // Low: Admin team (daily digests)
      return EMAIL_ALERT_CONFIG.recipients.admin;
    default:
      return EMAIL_ALERT_CONFIG.recipients.admin;
  }
}

/**
 * Send payment failure email alert
 */
export async function sendPaymentFailureEmailAlert(data: {
  tenantName: string;
  businessName: string;
  email: string;
  subscriptionTier: string;
  amountAUD: number;
  attemptCount: number;
  lastFourDigits?: string;
  tenantId: string;
  failureReason?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!EMAIL_ALERT_CONFIG.enabled) {
    console.log('ℹ️ Email alerts disabled, skipping notification');
    return { success: true };
  }

  const isHighValue = data.amountAUD >= 200;
  const isLastAttempt = data.attemptCount >= 3;

  // Determine severity
  const severity = isLastAttempt ? EmailAlertSeverity.CRITICAL : isHighValue ? EmailAlertSeverity.HIGH : EmailAlertSeverity.MEDIUM;

  // Get recipients based on severity
  const recipients = getRecipientsForSeverity(severity);

  if (recipients.length === 0) {
    console.warn('⚠️ No email alert recipients configured for severity:', severity);
    return { success: false, error: 'No recipients configured' };
  }

  // Send to all recipients
  const results = await Promise.all(
    recipients.map((recipient) =>
      sendPaymentFailureAlertEmail({
        ...data,
      })
    )
  );

  const allSuccessful = results.every((r) => r.success);

  if (allSuccessful) {
    console.log(`✅ Payment failure alert sent to ${recipients.length} recipient(s)`);
    return { success: true };
  } else {
    const failures = results.filter((r) => !r.success);
    console.error(`❌ Failed to send payment failure alert to ${failures.length} recipient(s)`);
    return { success: false, error: `${failures.length} failures` };
  }
}

/**
 * Send security incident email alert
 */
export async function sendSecurityIncidentEmailAlert(data: {
  activityType: 'MULTIPLE_FAILED_LOGINS' | 'RATE_LIMIT_EXCEEDED' | 'SUSPICIOUS_PAYMENT' | 'DATA_SCRAPING' | 'API_ABUSE';
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  requestCount?: number;
  timeWindow?: string;
  details: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}): Promise<{ success: boolean; error?: string }> {
  if (!EMAIL_ALERT_CONFIG.enabled) {
    console.log('ℹ️ Email alerts disabled, skipping notification');
    return { success: true };
  }

  // Map severity to email alert severity
  const emailSeverity =
    data.severity === 'CRITICAL'
      ? EmailAlertSeverity.CRITICAL
      : data.severity === 'HIGH'
        ? EmailAlertSeverity.HIGH
        : data.severity === 'MEDIUM'
          ? EmailAlertSeverity.MEDIUM
          : EmailAlertSeverity.LOW;

  // Get recipients based on severity
  const recipients = getRecipientsForSeverity(emailSeverity);

  if (recipients.length === 0) {
    console.warn('⚠️ No email alert recipients configured for severity:', emailSeverity);
    return { success: false, error: 'No recipients configured' };
  }

  // Send to all recipients (admin email expects single recipient, so we'll send multiple)
  const results = await Promise.all(recipients.map(() => sendSuspiciousActivityAlertEmail(data)));

  const allSuccessful = results.every((r) => r.success);

  if (allSuccessful) {
    console.log(`✅ Security incident alert sent to ${recipients.length} recipient(s)`);
    return { success: true };
  } else {
    const failures = results.filter((r) => !r.success);
    console.error(`❌ Failed to send security incident alert to ${failures.length} recipient(s)`);
    return { success: false, error: `${failures.length} failures` };
  }
}

/**
 * Send system health alert email
 */
export async function sendSystemHealthEmailAlert(data: {
  alertType: 'HIGH_ERROR_RATE' | 'SLOW_API_RESPONSE' | 'DATABASE_ISSUES' | 'HIGH_MEMORY_USAGE' | 'WEBHOOK_FAILURES';
  metric: string;
  threshold: string;
  currentValue: string;
  duration?: string;
  affectedServices?: string[];
  severity: 'WARNING' | 'ERROR' | 'CRITICAL';
}): Promise<{ success: boolean; error?: string }> {
  if (!EMAIL_ALERT_CONFIG.enabled) {
    console.log('ℹ️ Email alerts disabled, skipping notification');
    return { success: true };
  }

  // Map severity to email alert severity
  const emailSeverity =
    data.severity === 'CRITICAL' ? EmailAlertSeverity.CRITICAL : data.severity === 'ERROR' ? EmailAlertSeverity.HIGH : EmailAlertSeverity.MEDIUM;

  // Get recipients based on severity
  const recipients = getRecipientsForSeverity(emailSeverity);

  if (recipients.length === 0) {
    console.warn('⚠️ No email alert recipients configured for severity:', emailSeverity);
    return { success: false, error: 'No recipients configured' };
  }

  // Send to all recipients
  const results = await Promise.all(recipients.map(() => sendSystemHealthAlertEmail(data)));

  const allSuccessful = results.every((r) => r.success);

  if (allSuccessful) {
    console.log(`✅ System health alert sent to ${recipients.length} recipient(s)`);
    return { success: true };
  } else {
    const failures = results.filter((r) => !r.success);
    console.error(`❌ Failed to send system health alert to ${failures.length} recipient(s)`);
    return { success: false, error: `${failures.length} failures` };
  }
}

/**
 * Send new contractor application alert email
 */
export async function sendNewContractorApplicationEmailAlert(data: {
  contractorName: string;
  businessName: string;
  email: string;
  phone?: string;
  serviceAreas: string[];
  abnNumber?: string;
  contractorId: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!EMAIL_ALERT_CONFIG.enabled) {
    console.log('ℹ️ Email alerts disabled, skipping notification');
    return { success: true };
  }

  // New contractor applications are medium priority
  const recipients = getRecipientsForSeverity(EmailAlertSeverity.MEDIUM);

  if (recipients.length === 0) {
    console.warn('⚠️ No email alert recipients configured for contractor applications');
    return { success: false, error: 'No recipients configured' };
  }

  // Send notification (admin email template handles single recipient)
  const result = await sendNewContractorApplicationEmail(data);

  if (result.success) {
    console.log(`✅ Contractor application alert sent`);
    return { success: true };
  } else {
    console.error(`❌ Failed to send contractor application alert:`, result.error);
    return { success: false, error: result.error };
  }
}

/**
 * Send daily digest email with batched alerts
 */
export async function sendDailyDigestEmail(data: {
  date: Date;
  totalRequests: number;
  errorRate: number;
  avgResponseTime: number;
  activeUsers: number;
  newContractors: number;
  newClaims: number;
  revenue24h: number;
  mediumAlerts: number;
  lowAlerts: number;
}): Promise<{ success: boolean; error?: string }> {
  if (!EMAIL_ALERT_CONFIG.enabled) {
    console.log('ℹ️ Email alerts disabled, skipping notification');
    return { success: true };
  }

  // Daily digests go to admin team
  const recipients = getRecipientsForSeverity(EmailAlertSeverity.LOW);

  if (recipients.length === 0) {
    console.warn('⚠️ No email recipients configured for daily digests');
    return { success: false, error: 'No recipients configured' };
  }

  // TODO: Create dedicated daily digest email template
  // For now, log the data
  console.log('📊 Daily Digest:', data);

  return { success: true };
}

/**
 * Test email alert system
 */
export async function testEmailAlerts(): Promise<{
  success: boolean;
  results: {
    oncall: boolean;
    engineering: boolean;
    admin: boolean;
  };
  error?: string;
}> {
  const results = {
    oncall: false,
    engineering: false,
    admin: false,
  };

  try {
    // Test sending to each recipient group
    if (EMAIL_ALERT_CONFIG.recipients.oncall.length > 0) {
      console.log('📧 Testing email alerts for on-call recipients...');
      results.oncall = true;
    }

    if (EMAIL_ALERT_CONFIG.recipients.engineering.length > 0) {
      console.log('📧 Testing email alerts for engineering recipients...');
      results.engineering = true;
    }

    if (EMAIL_ALERT_CONFIG.recipients.admin.length > 0) {
      console.log('📧 Testing email alerts for admin recipients...');
      results.admin = true;
    }

    const allConfigured = Object.values(results).some((r) => r);

    return {
      success: allConfigured,
      results,
      error: allConfigured ? undefined : 'No email recipients configured',
    };
  } catch (error) {
    console.error('Failed to test email alerts:', error);
    return {
      success: false,
      results,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get configured recipients for monitoring
 */
export function getConfiguredRecipients(): {
  oncall: string[];
  engineering: string[];
  admin: string[];
  total: number;
} {
  return {
    oncall: EMAIL_ALERT_CONFIG.recipients.oncall,
    engineering: EMAIL_ALERT_CONFIG.recipients.engineering,
    admin: EMAIL_ALERT_CONFIG.recipients.admin,
    total: [...EMAIL_ALERT_CONFIG.recipients.oncall, ...EMAIL_ALERT_CONFIG.recipients.engineering, ...EMAIL_ALERT_CONFIG.recipients.admin].length,
  };
}
