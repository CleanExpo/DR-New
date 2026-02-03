/**
 * Slack Alert Integration
 *
 * Sends critical platform alerts to Slack channels via webhooks.
 * Supports different severity levels with appropriate channels and formatting.
 */

/**
 * Slack alert severity levels
 */
export enum SlackAlertSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * Slack channel configuration
 */
const SLACK_CONFIG = {
  webhooks: {
    critical: process.env.SLACK_WEBHOOK_URL_CRITICAL || '',
    general: process.env.SLACK_WEBHOOK_URL_GENERAL || '',
  },
  enabled: process.env.SLACK_ALERTS_ENABLED === 'true',
  batchIntervalMs: 300000, // 5 minutes for batched alerts
};

/**
 * Slack message color based on severity
 */
const SEVERITY_COLORS: Record<SlackAlertSeverity, string> = {
  [SlackAlertSeverity.LOW]: '#10b981', // Green
  [SlackAlertSeverity.MEDIUM]: '#f59e0b', // Yellow
  [SlackAlertSeverity.HIGH]: '#ef4444', // Red
  [SlackAlertSeverity.CRITICAL]: '#7f1d1d', // Dark red
};

/**
 * Slack message emoji based on severity
 */
const SEVERITY_EMOJIS: Record<SlackAlertSeverity, string> = {
  [SlackAlertSeverity.LOW]: ':white_check_mark:',
  [SlackAlertSeverity.MEDIUM]: ':warning:',
  [SlackAlertSeverity.HIGH]: ':rotating_light:',
  [SlackAlertSeverity.CRITICAL]: ':fire:',
};

/**
 * Slack alert message interface
 */
export interface SlackAlertMessage {
  title: string;
  message: string;
  severity: SlackAlertSeverity;
  fields?: Array<{
    title: string;
    value: string;
    short?: boolean;
  }>;
  actions?: Array<{
    type: 'button';
    text: string;
    url: string;
  }>;
  timestamp?: Date;
}

/**
 * Send alert to Slack
 */
export async function sendSlackAlert(alert: SlackAlertMessage): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Slack alerts are enabled
    if (!SLACK_CONFIG.enabled) {
      console.log('ℹ️ Slack alerts disabled, skipping notification:', alert.title);
      return { success: true }; // Silent success when disabled
    }

    // Determine webhook URL based on severity
    const webhookUrl =
      alert.severity === SlackAlertSeverity.CRITICAL || alert.severity === SlackAlertSeverity.HIGH
        ? SLACK_CONFIG.webhooks.critical
        : SLACK_CONFIG.webhooks.general;

    if (!webhookUrl) {
      console.warn('⚠️ Slack webhook URL not configured for severity:', alert.severity);
      return { success: false, error: 'Webhook URL not configured' };
    }

    // Build Slack message payload
    const payload = {
      attachments: [
        {
          color: SEVERITY_COLORS[alert.severity],
          title: `${SEVERITY_EMOJIS[alert.severity]} ${alert.title}`,
          text: alert.message,
          fields: alert.fields || [],
          footer: 'Disaster Recovery Australia',
          footer_icon: 'https://disasterrecovery.com.au/favicon.ico',
          ts: alert.timestamp ? Math.floor(alert.timestamp.getTime() / 1000) : Math.floor(Date.now() / 1000),
          actions: alert.actions || [],
        },
      ],
    };

    // Send to Slack webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Slack webhook error:', response.status, errorText);
      return {
        success: false,
        error: `Slack API error: ${response.status}`,
      };
    }

    console.log(`✅ Slack alert sent successfully: ${alert.title}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to send Slack alert:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send payment failure alert to Slack
 */
export async function sendPaymentFailureSlackAlert(data: {
  tenantName: string;
  businessName: string;
  subscriptionTier: string;
  amountAUD: number;
  attemptCount: number;
  tenantId: string;
}): Promise<{ success: boolean; error?: string }> {
  const isHighValue = data.amountAUD >= 200;
  const isLastAttempt = data.attemptCount >= 3;

  const severity = isLastAttempt
    ? SlackAlertSeverity.CRITICAL
    : isHighValue
      ? SlackAlertSeverity.HIGH
      : SlackAlertSeverity.MEDIUM;

  return sendSlackAlert({
    title: `Payment Failure: ${data.businessName}`,
    message: isLastAttempt
      ? `🚨 *FINAL ATTEMPT FAILED* - Tenant will be downgraded in 3 days`
      : `Payment attempt ${data.attemptCount}/3 failed${isHighValue ? ' (high-value customer)' : ''}`,
    severity,
    fields: [
      {
        title: 'Business',
        value: data.businessName,
        short: true,
      },
      {
        title: 'Amount',
        value: `$${data.amountAUD.toFixed(2)} AUD`,
        short: true,
      },
      {
        title: 'Subscription',
        value: data.subscriptionTier,
        short: true,
      },
      {
        title: 'Attempt',
        value: `${data.attemptCount}/3`,
        short: true,
      },
    ],
    actions: [
      {
        type: 'button',
        text: 'View Tenant',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/tenants/${data.tenantId}`,
      },
    ],
  });
}

/**
 * Send webhook failure alert to Slack
 */
export async function sendWebhookFailureSlackAlert(data: {
  eventType: string;
  failureCount: number;
  errorMessage: string;
  webhookId: string;
}): Promise<{ success: boolean; error?: string }> {
  const severity = data.failureCount >= 3 ? SlackAlertSeverity.HIGH : SlackAlertSeverity.MEDIUM;

  return sendSlackAlert({
    title: `Webhook Processing Failure`,
    message: `Stripe webhook \`${data.eventType}\` failed ${data.failureCount} time(s)`,
    severity,
    fields: [
      {
        title: 'Event Type',
        value: data.eventType,
        short: true,
      },
      {
        title: 'Failure Count',
        value: data.failureCount.toString(),
        short: true,
      },
      {
        title: 'Error',
        value: data.errorMessage.substring(0, 200),
        short: false,
      },
    ],
    actions: [
      {
        type: 'button',
        text: 'View Webhook Logs',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/webhooks`,
      },
    ],
  });
}

/**
 * Send high error rate alert to Slack
 */
export async function sendHighErrorRateSlackAlert(data: {
  errorRate: number;
  threshold: number;
  errorCount: number;
  timeWindow: string;
  topErrors?: Array<{ message: string; count: number }>;
}): Promise<{ success: boolean; error?: string }> {
  const severity = data.errorRate > data.threshold * 2 ? SlackAlertSeverity.CRITICAL : SlackAlertSeverity.HIGH;

  const topErrorsText = data.topErrors
    ? '\n\n*Top Errors:*\n' + data.topErrors.map((e) => `• ${e.message} (${e.count}x)`).join('\n')
    : '';

  return sendSlackAlert({
    title: `High Error Rate Detected`,
    message: `Error rate is ${data.errorRate.toFixed(2)}% (threshold: ${data.threshold}%)${topErrorsText}`,
    severity,
    fields: [
      {
        title: 'Error Rate',
        value: `${data.errorRate.toFixed(2)}%`,
        short: true,
      },
      {
        title: 'Threshold',
        value: `${data.threshold}%`,
        short: true,
      },
      {
        title: 'Error Count',
        value: data.errorCount.toString(),
        short: true,
      },
      {
        title: 'Time Window',
        value: data.timeWindow,
        short: true,
      },
    ],
    actions: [
      {
        type: 'button',
        text: 'Open Sentry',
        url: process.env.SENTRY_DSN ? 'https://sentry.io' : `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/monitoring`,
      },
    ],
  });
}

/**
 * Send slow API response alert to Slack
 */
export async function sendSlowAPISlackAlert(data: {
  endpoint: string;
  avgResponseTime: number;
  threshold: number;
  requestCount: number;
  timeWindow: string;
}): Promise<{ success: boolean; error?: string }> {
  const severity = data.avgResponseTime > data.threshold * 2 ? SlackAlertSeverity.HIGH : SlackAlertSeverity.MEDIUM;

  return sendSlackAlert({
    title: `Slow API Response Times`,
    message: `Endpoint \`${data.endpoint}\` is responding slowly`,
    severity,
    fields: [
      {
        title: 'Endpoint',
        value: data.endpoint,
        short: false,
      },
      {
        title: 'Avg Response Time',
        value: `${data.avgResponseTime}ms`,
        short: true,
      },
      {
        title: 'Threshold',
        value: `${data.threshold}ms`,
        short: true,
      },
      {
        title: 'Request Count',
        value: data.requestCount.toString(),
        short: true,
      },
      {
        title: 'Time Window',
        value: data.timeWindow,
        short: true,
      },
    ],
    actions: [
      {
        type: 'button',
        text: 'View Monitoring',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/monitoring`,
      },
    ],
  });
}

/**
 * Send database performance alert to Slack
 */
export async function sendDatabasePerformanceSlackAlert(data: {
  metric: string;
  currentValue: string;
  threshold: string;
  duration?: string;
}): Promise<{ success: boolean; error?: string }> {
  return sendSlackAlert({
    title: `Database Performance Issue`,
    message: `Database metric \`${data.metric}\` is exceeding threshold`,
    severity: SlackAlertSeverity.HIGH,
    fields: [
      {
        title: 'Metric',
        value: data.metric,
        short: true,
      },
      {
        title: 'Current Value',
        value: data.currentValue,
        short: true,
      },
      {
        title: 'Threshold',
        value: data.threshold,
        short: true,
      },
      ...(data.duration
        ? [
            {
              title: 'Duration',
              value: data.duration,
              short: true,
            },
          ]
        : []),
    ],
    actions: [
      {
        type: 'button',
        text: 'View Database Metrics',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/monitoring`,
      },
    ],
  });
}

/**
 * Send security incident alert to Slack
 */
export async function sendSecurityIncidentSlackAlert(data: {
  incidentType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  userEmail?: string;
  ipAddress?: string;
  details: string;
}): Promise<{ success: boolean; error?: string }> {
  const slackSeverity =
    data.severity === 'CRITICAL'
      ? SlackAlertSeverity.CRITICAL
      : data.severity === 'HIGH'
        ? SlackAlertSeverity.HIGH
        : data.severity === 'MEDIUM'
          ? SlackAlertSeverity.MEDIUM
          : SlackAlertSeverity.LOW;

  return sendSlackAlert({
    title: `Security Incident: ${data.incidentType}`,
    message: data.details,
    severity: slackSeverity,
    fields: [
      {
        title: 'Incident Type',
        value: data.incidentType,
        short: true,
      },
      {
        title: 'Severity',
        value: data.severity,
        short: true,
      },
      ...(data.userEmail
        ? [
            {
              title: 'User Email',
              value: data.userEmail,
              short: true,
            },
          ]
        : []),
      ...(data.ipAddress
        ? [
            {
              title: 'IP Address',
              value: data.ipAddress,
              short: true,
            },
          ]
        : []),
    ],
    actions: [
      {
        type: 'button',
        text: 'View Security Dashboard',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/security`,
      },
    ],
  });
}

/**
 * Send new contractor application alert to Slack
 */
export async function sendNewContractorApplicationSlackAlert(data: {
  contractorName: string;
  businessName: string;
  serviceAreas: string[];
  contractorId: string;
}): Promise<{ success: boolean; error?: string }> {
  return sendSlackAlert({
    title: `New Contractor Application`,
    message: `${data.businessName} has submitted an application for verification`,
    severity: SlackAlertSeverity.MEDIUM,
    fields: [
      {
        title: 'Contractor',
        value: data.contractorName,
        short: true,
      },
      {
        title: 'Business',
        value: data.businessName,
        short: true,
      },
      {
        title: 'Service Areas',
        value: data.serviceAreas.join(', '),
        short: false,
      },
    ],
    actions: [
      {
        type: 'button',
        text: 'Review Application',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/contractors/verification/${data.contractorId}`,
      },
    ],
  });
}

/**
 * Send system health summary (daily digest)
 */
export async function sendDailyHealthDigestSlack(data: {
  totalRequests: number;
  errorRate: number;
  avgResponseTime: number;
  activeUsers: number;
  newContractors: number;
  newClaims: number;
  revenue24h: number;
}): Promise<{ success: boolean; error?: string }> {
  const healthStatus =
    data.errorRate < 0.5 && data.avgResponseTime < 500 ? '🟢 Excellent' : data.errorRate < 2 && data.avgResponseTime < 1000 ? '🟡 Good' : '🔴 Needs Attention';

  return sendSlackAlert({
    title: `Daily Health Summary`,
    message: `Platform Health: ${healthStatus}`,
    severity: SlackAlertSeverity.LOW,
    fields: [
      {
        title: 'Total Requests',
        value: data.totalRequests.toLocaleString(),
        short: true,
      },
      {
        title: 'Error Rate',
        value: `${data.errorRate.toFixed(2)}%`,
        short: true,
      },
      {
        title: 'Avg Response Time',
        value: `${data.avgResponseTime}ms`,
        short: true,
      },
      {
        title: 'Active Users',
        value: data.activeUsers.toString(),
        short: true,
      },
      {
        title: 'New Contractors',
        value: data.newContractors.toString(),
        short: true,
      },
      {
        title: 'New Claims',
        value: data.newClaims.toString(),
        short: true,
      },
      {
        title: 'Revenue (24h)',
        value: `$${data.revenue24h.toFixed(2)} AUD`,
        short: true,
      },
    ],
    actions: [
      {
        type: 'button',
        text: 'View Full Dashboard',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/analytics`,
      },
    ],
  });
}

/**
 * Batch alert system for medium/low priority alerts
 * Collects alerts and sends them in a digest format
 */
interface BatchedAlert {
  title: string;
  message: string;
  timestamp: Date;
}

let batchedAlerts: BatchedAlert[] = [];
let batchTimeout: NodeJS.Timeout | null = null;

/**
 * Add alert to batch queue
 */
export function batchAlert(alert: { title: string; message: string }): void {
  batchedAlerts.push({
    ...alert,
    timestamp: new Date(),
  });

  // Set up batch send timer if not already set
  if (!batchTimeout) {
    batchTimeout = setTimeout(() => {
      sendBatchedAlerts();
    }, SLACK_CONFIG.batchIntervalMs);
  }
}

/**
 * Send all batched alerts as a digest
 */
async function sendBatchedAlerts(): Promise<void> {
  if (batchedAlerts.length === 0) {
    return;
  }

  const alertCount = batchedAlerts.length;
  const alertsList = batchedAlerts.map((a, i) => `${i + 1}. ${a.title} - ${a.message}`).join('\n');

  await sendSlackAlert({
    title: `Alert Digest (${alertCount} alerts)`,
    message: alertsList,
    severity: SlackAlertSeverity.LOW,
  });

  // Clear batched alerts
  batchedAlerts = [];
  batchTimeout = null;
}

/**
 * Test Slack integration
 */
export async function testSlackIntegration(): Promise<{ success: boolean; error?: string }> {
  return sendSlackAlert({
    title: 'Slack Integration Test',
    message: 'This is a test message from Disaster Recovery Australia. If you see this, Slack integration is working correctly! 🎉',
    severity: SlackAlertSeverity.LOW,
    fields: [
      {
        title: 'Environment',
        value: process.env.NODE_ENV || 'development',
        short: true,
      },
      {
        title: 'Timestamp',
        value: new Date().toISOString(),
        short: true,
      },
    ],
  });
}
