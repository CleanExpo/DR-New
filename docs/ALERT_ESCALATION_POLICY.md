# Alert Escalation Policy
**Version**: 1.0
**Last Updated**: 2026-02-03
**System**: Disaster Recovery NRPG Platform
**Effective Date**: Production Launch

## Table of Contents
1. [Overview](#overview)
2. [Alert Severity Levels](#alert-severity-levels)
3. [Alert Types & Triggers](#alert-types--triggers)
4. [Notification Channels](#notification-channels)
5. [Recipient Routing](#recipient-routing)
6. [Response Time SLAs](#response-time-slas)
7. [Escalation Procedures](#escalation-procedures)
8. [Alert Batching](#alert-batching)
9. [On-Call Responsibilities](#on-call-responsibilities)
10. [Alert Configuration](#alert-configuration)

---

## Overview

This document defines the alert escalation policy for the Disaster Recovery NRPG Platform. It specifies when alerts are triggered, who receives them, through which channels, and what actions are expected.

The alert system consists of:
- **Slack Integration**: Real-time notifications to dedicated channels
- **Email Alerts**: Severity-based routing to appropriate teams
- **Webhook Monitoring**: Automated failure detection and alerting
- **Email Queue Monitoring**: Failed email retry system

### Purpose
- Ensure rapid response to critical platform issues
- Route alerts to appropriate teams based on severity
- Prevent alert fatigue through intelligent batching
- Maintain clear escalation paths for unresolved incidents

---

## Alert Severity Levels

### CRITICAL
**Definition**: System-breaking issues requiring immediate action to prevent or mitigate major business impact.

**Examples**:
- Payment processing failures (high-value subscriptions ≥ $200 AUD)
- Last-attempt payment failures (attempt ≥ 3)
- Webhook processing failure rate > 5% in 10 minutes
- Database connectivity failures
- Security breach attempts

**Response Required**: Immediate (< 5 minutes)
**Notification**: Slack (critical channel) + Email (all teams)
**Escalation**: After 15 minutes if not acknowledged

---

### HIGH
**Definition**: Significant issues affecting platform functionality or user experience that require urgent attention.

**Examples**:
- High error rates (> 3% but < 5%)
- Slow API responses (p95 > 5 seconds)
- Database performance degradation
- Individual webhook failures
- Failed contractor verification submissions

**Response Required**: Within 15 minutes
**Notification**: Slack (critical channel) + Email (on-call + engineering)
**Escalation**: After 30 minutes if not resolved

---

### MEDIUM
**Definition**: Issues that degrade performance or functionality but don't immediately impact users.

**Examples**:
- Elevated error rates (1-3%)
- Moderately slow API responses (p95 2-5 seconds)
- Database query optimization opportunities
- Email delivery failures (queued for retry)
- New contractor applications awaiting review

**Response Required**: Within 1 hour
**Notification**: Slack (general channel, batched every 5 min) + Email (engineering)
**Escalation**: After 4 hours if pattern persists

---

### LOW
**Definition**: Informational alerts that require awareness but not immediate action.

**Examples**:
- Daily health digest summaries
- Successful system health checks
- Contractor application completions
- Email queue statistics
- Performance metrics updates

**Response Required**: Best effort (review during business hours)
**Notification**: Slack (general channel, batched) + Email (admin team)
**Escalation**: None (informational only)

---

## Alert Types & Triggers

### Payment Failure Alerts

#### Trigger Conditions
```typescript
// High-value failure
amountAUD >= 200 AUD

// Last attempt failure
attemptCount >= 3
```

#### Alert Details
- **Severity**: CRITICAL
- **Channels**: Slack + Email
- **Information Included**:
  - Tenant name and business name
  - Subscription tier
  - Amount in AUD
  - Attempt count
  - Last 4 digits of card
  - Failure reason
  - Tenant ID (for admin lookup)

#### Expected Actions
1. Verify payment failure cause
2. Check customer contact history
3. Determine if manual intervention needed
4. Update tenant billing status if necessary
5. Document outcome in admin notes

---

### Webhook Failure Alerts

#### Trigger Conditions
```typescript
// High failure rate
failureRate > 5% within 10 minutes

// Individual webhook failure
any webhook processing error
```

#### Alert Details
- **Severity**: CRITICAL (high failure rate), HIGH (individual)
- **Channels**: Slack + Email (critical only for high rates)
- **Information Included**:
  - Webhook event type
  - Failure count
  - Error message
  - Webhook ID
  - Time window

#### Expected Actions
1. Check webhook monitoring dashboard
2. Review recent deployments
3. Verify Stripe webhook endpoint health
4. Check database connectivity
5. Review error logs for patterns
6. Escalate to engineering if systemic issue

---

### System Health Alerts

#### Trigger Conditions
```typescript
// High error rate
errorRate > 5%

// Slow API responses
p95ResponseTime > 5000ms

// Database issues
queryDuration > 2000ms || connectionPoolUsed > 80%

// High memory usage
memoryUsage > 90%

// Webhook failures
webhookFailureRate > 5%
```

#### Alert Details
- **Severity**: CRITICAL (if threshold severely exceeded), HIGH (if threshold exceeded)
- **Channels**: Slack + Email
- **Information Included**:
  - Alert type
  - Metric name and current value
  - Threshold exceeded
  - Duration of issue
  - Affected services
  - Severity level

#### Expected Actions
1. Check system dashboard
2. Review recent deployments
3. Investigate infrastructure health
4. Check for upstream dependencies
5. Scale resources if needed
6. Document findings and resolution

---

### Security Incident Alerts

#### Trigger Conditions
```typescript
// Multiple failed logins
failedLoginAttempts > 5 within 15 minutes

// Rate limit exceeded
requestRate > 5x baseline

// Suspicious payment activity
fraudScore > 0.8

// Data scraping detected
botPattern detected

// API abuse
apiRequestRate > normal * 10
```

#### Alert Details
- **Severity**: HIGH to CRITICAL (based on severity)
- **Channels**: Slack + Email (routing based on severity)
- **Information Included**:
  - Activity type
  - User ID/email (if applicable)
  - IP address
  - Request count
  - Time window
  - Details/evidence
  - Severity level

#### Expected Actions
1. Verify incident legitimacy
2. Block IP address if confirmed malicious
3. Reset user password if account compromised
4. Review access logs
5. Document incident
6. Escalate to security team if needed

---

### New Contractor Application Alerts

#### Trigger Conditions
```typescript
// Contractor submits complete verification profile
profileStatus === 'SUBMITTED' && allRequiredFieldsComplete
```

#### Alert Details
- **Severity**: MEDIUM
- **Channels**: Slack + Email
- **Information Included**:
  - Contractor name
  - Business name
  - Email and phone
  - Service areas (up to 5)
  - ABN number
  - Contractor ID (for admin review)
  - Direct link to admin verification page

#### Expected Actions
1. Review contractor application in admin dashboard
2. Verify ABN registration (if provided)
3. Check IICRC certification documents
4. Verify insurance documentation
5. Approve, reject, or request changes
6. Send appropriate email notification to contractor

---

### Email Queue Alerts

#### Trigger Conditions
```typescript
// Dead letter queue has emails
deadLetterQueueCount > 0

// High queue size
queueSize > 100

// High failure rate
emailFailureRate24h > 10%
```

#### Alert Details
- **Severity**: MEDIUM (dead letter), LOW (statistics)
- **Channels**: Slack + Email (engineering)
- **Information Included**:
  - Queue size
  - Dead letter count
  - Total sent/failed in 24h
  - Processing statistics

#### Expected Actions
1. Review dead letter queue in admin dashboard
2. Investigate common failure patterns
3. Check Resend API status
4. Retry dead letter emails manually if appropriate
5. Update email queue configuration if needed

---

## Notification Channels

### Slack Integration

#### Critical Alerts Channel
**Channel**: `#alerts-critical`
**Webhook**: `SLACK_WEBHOOK_URL_CRITICAL`
**Severities**: CRITICAL, HIGH
**Format**: Rich attachments with severity emoji, color-coding, and action buttons

**Example Message**:
```
🔴 CRITICAL: Payment Failure Alert

ACME Restoration Ltd
Subscription: PREMIUM
Amount: $450.00 AUD
Attempt: 3 of 3 (Final attempt)
Card: **** 4242
Reason: Insufficient funds

👤 Tenant: ACME Restoration Ltd
📧 Email: admin@acmerestoration.com.au
🆔 Tenant ID: ten_abc123xyz

[View Tenant] [Contact Customer] [Update Billing]
```

#### General Alerts Channel
**Channel**: `#alerts-general`
**Webhook**: `SLACK_WEBHOOK_URL_GENERAL`
**Severities**: MEDIUM, LOW
**Batching**: 5-minute windows for MEDIUM/LOW priority
**Format**: Consolidated summary messages

**Example Batched Message**:
```
📊 Alert Summary (5 minutes)

🟡 MEDIUM Alerts: 3
- New contractor application: Sydney Water Damage Pros
- Elevated error rate: 2.3% (threshold: 2%)
- Email queue size: 47 emails pending

🔵 LOW Alerts: 5
- Daily health digest sent
- 3 contractor applications pending review
- Email queue processed: 15 sent, 2 failed
```

---

### Email Alerts

#### Recipient Groups
```typescript
const EMAIL_ALERT_CONFIG = {
  recipients: {
    oncall: process.env.ALERT_EMAIL_ONCALL?.split(',') || [],
    // e.g., "oncall@disasterrecovery.com.au,john@example.com"

    engineering: process.env.ALERT_EMAIL_ENGINEERING?.split(',') || [],
    // e.g., "engineering@disasterrecovery.com.au,devteam@example.com"

    admin: process.env.ALERT_EMAIL_ADMIN?.split(',') || [],
    // e.g., "admin@disasterrecovery.com.au,support@example.com"
  },
};
```

#### Routing Rules

**CRITICAL Severity**:
- Recipients: On-call + Engineering + Admin (all teams)
- Subject prefix: `[CRITICAL]`
- Priority: High
- Example: `[CRITICAL] Payment Failure - ACME Restoration ($450 AUD)`

**HIGH Severity**:
- Recipients: On-call + Engineering
- Subject prefix: `[HIGH]`
- Priority: High
- Example: `[HIGH] Webhook Failure Rate Exceeded (7.2%)`

**MEDIUM Severity**:
- Recipients: Engineering
- Subject prefix: `[MEDIUM]`
- Priority: Normal
- Example: `[MEDIUM] New Contractor Application - Sydney Water Damage`

**LOW Severity**:
- Recipients: Admin
- Subject prefix: `[INFO]`
- Priority: Low
- Example: `[INFO] Daily Platform Health Digest - All Systems Operational`

---

## Recipient Routing

### Routing Table

| Severity | On-Call | Engineering | Admin | Priority |
|----------|---------|-------------|-------|----------|
| CRITICAL | ✅ | ✅ | ✅ | High |
| HIGH | ✅ | ✅ | ❌ | High |
| MEDIUM | ❌ | ✅ | ❌ | Normal |
| LOW | ❌ | ❌ | ✅ | Low |

### Implementation
```typescript
function getRecipientsForSeverity(severity: EmailAlertSeverity): string[] {
  const { oncall, engineering, admin } = EMAIL_ALERT_CONFIG.recipients;

  switch (severity) {
    case EmailAlertSeverity.CRITICAL:
      return [...oncall, ...engineering, ...admin]; // All teams
    case EmailAlertSeverity.HIGH:
      return [...oncall, ...engineering]; // On-call and engineering
    case EmailAlertSeverity.MEDIUM:
      return engineering; // Engineering team
    case EmailAlertSeverity.LOW:
      return admin; // Admin team
  }
}
```

---

## Response Time SLAs

### Initial Response

| Severity | Initial Acknowledgment | First Action | Resolution Target |
|----------|----------------------|--------------|-------------------|
| CRITICAL | < 5 minutes | < 10 minutes | < 1 hour |
| HIGH | < 15 minutes | < 30 minutes | < 4 hours |
| MEDIUM | < 1 hour | < 2 hours | < 8 hours |
| LOW | Best effort | Best effort | N/A |

### Communication Requirements

**CRITICAL/HIGH**:
- Acknowledge in Slack within SLA
- Post updates every 15 minutes until resolved
- Document actions taken in incident channel
- Schedule post-incident review

**MEDIUM**:
- Acknowledge within 1 hour
- Post update when investigation begins
- Document resolution when complete

**LOW**:
- Review during business hours
- No acknowledgment required
- Action as needed

---

## Escalation Procedures

### Level 1: On-Call Engineer
**Triggers**: All CRITICAL and HIGH alerts
**Responsibilities**:
- Acknowledge alert within SLA
- Begin immediate investigation
- Take corrective action if within expertise
- Escalate if unable to resolve

**Escalation After**:
- CRITICAL: 15 minutes if not acknowledged
- HIGH: 30 minutes if not acknowledged or 1 hour if not resolved

---

### Level 2: Senior Engineering Team
**Triggers**: Escalated from Level 1 or complex issues
**Responsibilities**:
- Take over incident ownership
- Coordinate with other teams if needed
- Implement temporary workarounds
- Plan permanent fix

**Escalation After**:
- CRITICAL: 30 minutes if not progressing
- HIGH: 2 hours if not progressing

---

### Level 3: Engineering Manager / CTO
**Triggers**: Escalated from Level 2 or major incidents
**Responsibilities**:
- Oversee incident response
- Allocate additional resources
- Make architectural decisions
- Communicate with stakeholders
- Declare major incident if necessary

**Escalation After**:
- CRITICAL: 1 hour if customer impact severe
- HIGH: 4 hours if business impact significant

---

### Level 4: Executive Team
**Triggers**: Major incidents with business/legal impact
**Responsibilities**:
- Customer communication (if public)
- Media response (if applicable)
- Business continuity decisions
- Post-incident executive review

---

## Alert Batching

### Purpose
Prevent alert fatigue by intelligently grouping low/medium-priority alerts.

### Configuration
```typescript
const SLACK_CONFIG = {
  batchIntervalMs: 300000, // 5 minutes
};
```

### Batching Rules

**CRITICAL/HIGH Alerts**:
- Never batched
- Sent immediately
- Individual rich messages
- Action buttons included

**MEDIUM/LOW Alerts**:
- Batched every 5 minutes
- Grouped by severity level
- Summary format
- Link to detailed dashboard

### Implementation
```typescript
// Apps/web/lib/monitoring/slack-alerts.ts
export function batchAlert(alert: { title: string; message: string }): void {
  alertQueue.push(alert);
}

// Sends batched alerts every 5 minutes
async function sendBatchedAlerts(): Promise<void> {
  if (alertQueue.length === 0) return;

  const summary = formatBatchSummary(alertQueue);
  await sendSlackAlert(summary);
  alertQueue = [];
}
```

---

## On-Call Responsibilities

### Primary On-Call
**Duration**: 1-week rotation
**Availability**: 24/7
**Response**: Within SLA for severity level

**Responsibilities**:
- Monitor #alerts-critical Slack channel
- Acknowledge all CRITICAL/HIGH alerts within SLA
- Investigate and resolve issues
- Escalate when necessary
- Document all actions taken
- Handoff open issues to next on-call

**Compensation**: Time off in lieu or on-call pay

---

### Secondary On-Call (Backup)
**Duration**: Same week as primary
**Availability**: 24/7
**Response**: Take over if primary doesn't acknowledge within SLA + 5 min

**Responsibilities**:
- Monitor for missed primary acknowledgments
- Take over incident ownership if escalated
- Assist primary with complex issues
- Coordinate with other teams if needed

---

### On-Call Handoff
**Schedule**: Monday 9:00 AM AEST
**Process**:
1. Outgoing on-call posts handoff summary in #on-call channel:
   - Open incidents
   - Ongoing investigations
   - Known issues
   - Upcoming maintenance
2. Incoming on-call confirms receipt
3. Outgoing updates PagerDuty schedule

---

## Alert Configuration

### Environment Variables

#### Slack Configuration
```bash
# Required
SLACK_WEBHOOK_URL_CRITICAL="https://hooks.slack.com/services/xxx/yyy/zzz"
SLACK_WEBHOOK_URL_GENERAL="https://hooks.slack.com/services/aaa/bbb/ccc"
SLACK_ALERTS_ENABLED="true"
```

#### Email Configuration
```bash
# Required
ALERT_EMAIL_ONCALL="oncall@disasterrecovery.com.au"
ALERT_EMAIL_ENGINEERING="engineering@disasterrecovery.com.au"
ALERT_EMAIL_ADMIN="admin@disasterrecovery.com.au"
EMAIL_ALERTS_ENABLED="true"

# Multiple recipients (comma-separated)
ALERT_EMAIL_ONCALL="oncall@example.com,backup@example.com"
```

#### Email Service (Resend)
```bash
RESEND_API_KEY="re_xxx"
RESEND_FROM_EMAIL="alerts@disasterrecovery.com.au"
```

---

### Code Locations

#### Slack Alerts
```
📁 apps/web/lib/monitoring/slack-alerts.ts
- sendSlackAlert() - Generic Slack sender
- sendPaymentFailureSlackAlert()
- sendWebhookFailureSlackAlert()
- sendHighErrorRateSlackAlert()
- sendNewContractorApplicationSlackAlert()
- batchAlert() - Queue for batching
- sendBatchedAlerts() - Batch processor
```

#### Email Alerts
```
📁 apps/web/lib/monitoring/email-alerts.ts
- sendPaymentFailureEmailAlert()
- sendSecurityIncidentEmailAlert()
- sendSystemHealthEmailAlert()
- sendNewContractorApplicationEmailAlert()
- getRecipientsForSeverity() - Routing logic
```

#### Webhook Monitoring
```
📁 apps/web/src/lib/stripe/webhook-monitoring.ts
- logAlert() - Central alert dispatcher
- sendAlerts() - Calls Slack + Email functions
```

#### Email Queue
```
📁 apps/web/lib/email/email-queue.ts
- queueEmail() - Queue failed emails
- processEmailQueue() - Retry with backoff
- getFailedEmails() - Dead letter queue
```

#### Cron Job
```
📁 apps/web/app/api/cron/process-email-queue/route.ts
- GET handler - Runs every 5 minutes
- Processes email queue
- Reports statistics
```

---

### Testing Alerts

#### Test Slack Integration
```typescript
import { testSlackIntegration } from '@/lib/monitoring/slack-alerts';

await testSlackIntegration();
// Sends test message to critical and general channels
```

#### Test Email Alerts
```typescript
import { testEmailAlerts } from '@/lib/monitoring/email-alerts';

const result = await testEmailAlerts();
console.log(result);
// {
//   success: true,
//   results: {
//     oncall: true,
//     engineering: true,
//     admin: true
//   }
// }
```

---

### Monitoring Alert Health

#### Metrics to Track
- Alert volume by severity (daily)
- Average acknowledgment time by severity
- Escalation rate
- False positive rate
- Resolution time

#### Monthly Review
1. Analyze alert volumes and trends
2. Review escalation patterns
3. Identify false positives
4. Adjust thresholds if needed
5. Update documentation

---

## Appendix: Alert Message Templates

### Slack Alert Template
```typescript
interface SlackAlertMessage {
  severity: SlackAlertSeverity; // CRITICAL | HIGH | MEDIUM | LOW
  title: string;
  message: string;
  fields?: Array<{ title: string; value: string; short: boolean }>;
  actions?: Array<{ text: string; url: string }>;
  timestamp?: Date;
}
```

### Email Alert Template
```typescript
interface EmailAlertData {
  severity: EmailAlertSeverity;
  alertType: string;
  subject: string;
  recipientList: string[];
  messageBody: string; // HTML formatted
  includeDashboardLink: boolean;
}
```

---

## Document Maintenance

**Review Frequency**: Quarterly
**Next Review**: 2026-05-03
**Responsible Team**: Engineering
**Change Approval**: Engineering Manager

### Change History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-03 | Claude Sonnet 4.5 | Initial version |

---

**Questions or Issues?**
Contact: engineering@disasterrecovery.com.au
Slack: #engineering or #incidents
