
/**
 * Security Alert Service
 *
 * Sends real-time alerts to administrators for security events
 * Supports multiple channels: email, SMS, in-app notifications
 *
 * Usage:
 * ```ts
 * import { alertService } from '@/lib/security/alert-service';
 *
 * // Send alert for brute force attempt
 * await alertService.sendAlert({
 *   type: 'BRUTE_FORCE',
 *   severity: 'HIGH',
 *   subject: 'Brute force attack detected',
 *   message: 'Multiple failed login attempts from 192.168.1.1',
 *   email: 'admin@example.com',
 *   phone: '+61412345678'
 * });
 * ```
 */

import { logError, logInfo, logWarn } from '@/lib/logger/helpers';
import { smsService } from '@/lib/notifications/sms-service';
import { notificationService } from '@/lib/notifications/notification-service';

export interface AlertConfig {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  subject: string;
  message: string;
  details?: Record<string, any>;
  email?: string;
  phone?: string;
  userId?: string;
}

export interface AlertThresholds {
  failedLoginAttempts: number;
  failedLoginWindow: number; // minutes
  fileUploadsSuspicious: number;
  multipleIPsCount: number;
}

class AlertService {
  private readonly adminEmail = process.env.SECURITY_ALERT_EMAIL || 'admin@disasterrecovery.com.au';
  private readonly alertThresholds: AlertThresholds = {
    failedLoginAttempts: 5,
    failedLoginWindow: 15,
    fileUploadsSuspicious: 3,
    multipleIPsCount: 5,
  };

  private alertHistory: Map<string, AlertConfig[]> = new Map();
  private lastAlertTime: Map<string, number> = new Map();
  private readonly alertCooldownMs = 5 * 60 * 1000; // 5 minutes between similar alerts

  constructor() {
    logInfo('Security alert service initialized', {
      adminEmail: this.adminEmail,
      thresholds: this.alertThresholds,
    });
  }

  /**
   * Send security alert
   */
  async sendAlert(config: AlertConfig): Promise<boolean> {
    try {
      const alertKey = `${config.type}-${config.userId || config.email}`;

      // Check cooldown to prevent alert spam
      if (this.isInCooldown(alertKey)) {
        logWarn('Alert suppressed due to cooldown', {
          type: config.type,
          email: config.email,
        });
        return false;
      }

      // Track alert
      this.recordAlert(alertKey, config);
      this.updateLastAlertTime(alertKey);

      // Send via appropriate channels based on severity
      const promises: Promise<any>[] = [];

      if (config.severity === 'CRITICAL') {
        // Critical alerts: email + SMS + in-app
        promises.push(this.sendEmailAlert(config));
        if (config.phone) {
          promises.push(this.sendSMSAlert(config));
        }
        promises.push(this.sendInAppAlert(config));
      } else if (config.severity === 'HIGH') {
        // High alerts: email + in-app
        promises.push(this.sendEmailAlert(config));
        promises.push(this.sendInAppAlert(config));
      } else if (config.severity === 'MEDIUM') {
        // Medium alerts: in-app only
        promises.push(this.sendInAppAlert(config));
      } else {
        // Low alerts: just log
        logInfo('Low severity security alert', config);
      }

      // Wait for all alerts to send
      const results = await Promise.allSettled(promises);

      const failed = results.filter((r) => r.status === 'rejected');
      if (failed.length > 0) {
        logWarn('Some alert channels failed', {
          type: config.type,
          failedCount: failed.length,
        });
      }

      logInfo('Security alert sent', {
        type: config.type,
        severity: config.severity,
        channels: results.length,
      });

      return true;
    } catch (error) {
      logError(error, { context: 'send_security_alert' });
      return false;
    }
  }

  /**
   * Send email alert
   */
  private async sendEmailAlert(config: AlertConfig): Promise<void> {
    try {
      const recipientEmail = config.email || this.adminEmail;

      // Format email body
      const emailBody = `
Security Alert: ${config.subject}

Severity: ${config.severity}
Type: ${config.type}

Message:
${config.message}

${config.details ? `\nDetails:\n${JSON.stringify(config.details, null, 2)}` : ''}

Time: ${new Date().toISOString()}

---
Disaster Recovery NRPG - Security Monitoring System
      `.trim();

      // Send via notification service
      await notificationService.send({
        userId: config.userId || '',
        type: 'SYSTEM_NOTIFICATION',
        subject: `🚨 ${config.subject}`,
        message: emailBody,
        channel: 'email',
        recipient: recipientEmail,
      });

      logInfo('Email alert sent', {
        to: recipientEmail,
        type: config.type,
      });
    } catch (error) {
      logError(error, { context: 'send_email_alert' });
      throw error;
    }
  }

  /**
   * Send SMS alert
   */
  private async sendSMSAlert(config: AlertConfig): Promise<void> {
    try {
      if (!config.phone) {
        return;
      }

      const message = `🚨 Security Alert: ${config.subject}. ${config.message.substring(0, 80)}...`;

      const sent = await smsService.sendAlert(config.phone, {
        title: config.type,
        message: config.message.substring(0, 160),
        severity: config.severity,
      });

      if (sent) {
        logInfo('SMS alert sent', {
          to: config.phone,
          type: config.type,
        });
      }
    } catch (error) {
      logError(error, { context: 'send_sms_alert' });
      throw error;
    }
  }

  /**
   * Send in-app alert
   */
  private async sendInAppAlert(config: AlertConfig): Promise<void> {
    try {
      // Store alert in database for dashboard display
      // This would integrate with your notification/alert storage
      logInfo('In-app alert queued', {
        type: config.type,
        severity: config.severity,
        userId: config.userId,
      });

      // In production, this would save to DB
      // await prisma.securityAlert.create({...})
    } catch (error) {
      logError(error, { context: 'send_inapp_alert' });
      throw error;
    }
  }

  /**
   * Check if alert is in cooldown period
   */
  private isInCooldown(key: string): boolean {
    const lastTime = this.lastAlertTime.get(key);
    if (!lastTime) {
      return false;
    }

    const now = Date.now();
    return now - lastTime < this.alertCooldownMs;
  }

  /**
   * Update last alert time
   */
  private updateLastAlertTime(key: string): void {
    this.lastAlertTime.set(key, Date.now());
  }

  /**
   * Record alert in history
   */
  private recordAlert(key: string, config: AlertConfig): void {
    if (!this.alertHistory.has(key)) {
      this.alertHistory.set(key, []);
    }

    const history = this.alertHistory.get(key)!;
    history.push(config);

    // Keep only last 100 alerts per type
    if (history.length > 100) {
      history.shift();
    }
  }

  /**
   * Get alert history for type
   */
  getAlertHistory(type: string, limit: number = 50): AlertConfig[] {
    const history: AlertConfig[] = [];

    for (const [key, alerts] of this.alertHistory) {
      if (key.startsWith(type)) {
        history.push(...alerts);
      }
    }

    return history.slice(-limit);
  }

  /**
   * Get alert statistics
   */
  getStats() {
    const stats = {
      totalAlerts: 0,
      alertsByType: {} as Record<string, number>,
      alertsBySeverity: {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        CRITICAL: 0,
      },
      recentAlerts: [] as AlertConfig[],
    };

    for (const alerts of this.alertHistory.values()) {
      alerts.forEach((alert) => {
        stats.totalAlerts++;
        stats.alertsByType[alert.type] = (stats.alertsByType[alert.type] || 0) + 1;
        stats.alertsBySeverity[alert.severity]++;
        stats.recentAlerts.push(alert);
      });
    }

    // Keep only 20 most recent
    stats.recentAlerts = stats.recentAlerts.slice(-20);

    return stats;
  }

  /**
   * Update alert thresholds
   */
  updateThresholds(newThresholds: Partial<AlertThresholds>): void {
    Object.assign(this.alertThresholds, newThresholds);
    logInfo('Alert thresholds updated', { thresholds: this.alertThresholds });
  }

  /**
   * Get current thresholds
   */
  getThresholds(): AlertThresholds {
    return { ...this.alertThresholds };
  }

  /**
   * Clear alert history
   */
  clearHistory(): void {
    this.alertHistory.clear();
    this.lastAlertTime.clear();
    logInfo('Alert history cleared');
  }
}

/**
 * Export singleton instance
 */
export const alertService = new AlertService();

/**
 * Export class for testing
 */
export { AlertService };
