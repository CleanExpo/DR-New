/**
 * Monitoring Alerts API Endpoint
 * Handles performance and error alerts
 */

import { NextRequest, NextResponse } from 'next/server';

interface Alert {
  level: 'warning' | 'critical';
  message: string;
  context: Record<string, any>;
  timestamp: string;
}

// In-memory alert store (replace with database in production)
const recentAlerts: Alert[] = [];
const MAX_ALERTS = 100;

export async function POST(request: NextRequest) {
  try {
    const alert: Alert = await request.json();

    // Validate alert
    if (!alert.level || !alert.message) {
      return NextResponse.json(
        { error: 'Invalid alert data' },
        { status: 400 }
      );
    }

    // Store alert
    recentAlerts.push(alert);

    // Keep only recent alerts
    if (recentAlerts.length > MAX_ALERTS) {
      recentAlerts.shift();
    }

    // Log alert
    console.warn(`[ALERT ${alert.level.toUpperCase()}]`, alert.message, alert.context);

    // In production, send to alerting service
    if (process.env.NODE_ENV === 'production') {
      await sendToAlertingService(alert);
    }

    return NextResponse.json({ success: true, alertId: generateAlertId() });
  } catch (error) {
    console.error('[Monitoring] Alert error:', error);
    return NextResponse.json(
      { error: 'Failed to process alert' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const limit = parseInt(searchParams.get('limit') || '20');

    let alerts = recentAlerts;

    // Filter by level
    if (level) {
      alerts = alerts.filter(a => a.level === level);
    }

    // Sort by timestamp (newest first)
    alerts = alerts.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Limit results
    alerts = alerts.slice(0, limit);

    return NextResponse.json({
      total: recentAlerts.length,
      alerts,
    });
  } catch (error) {
    console.error('[Monitoring] Failed to fetch alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

/**
 * Send alert to external service (Slack, PagerDuty, etc.)
 */
async function sendToAlertingService(alert: Alert): Promise<void> {
  try {
    // Example: Send to Slack webhook
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 ${alert.level.toUpperCase()} Alert`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*${alert.message}*\n\`\`\`${JSON.stringify(alert.context, null, 2)}\`\`\``
              }
            }
          ]
        }),
      });
    }

    // Example: Send to PagerDuty
    if (process.env.PAGERDUTY_INTEGRATION_KEY && alert.level === 'critical') {
      await fetch('https://events.pagerduty.com/v2/enqueue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routing_key: process.env.PAGERDUTY_INTEGRATION_KEY,
          event_action: 'trigger',
          payload: {
            summary: alert.message,
            severity: 'critical',
            source: 'disaster-recovery-monitoring',
            custom_details: alert.context,
          },
        }),
      });
    }
  } catch (error) {
    console.error('[Monitoring] Failed to send alert to external service:', error);
  }
}

function generateAlertId(): string {
  return `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
