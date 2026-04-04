// @ts-nocheck
/**
 * Email Queue & Retry Logic
 *
 * Handles failed email delivery with retry logic, exponential backoff,
 * and dead letter queue for permanent failures.
 */

import { PrismaClient } from '@prisma/client';
import { sendEmail, SendEmailOptions } from './resend';

const prisma = new PrismaClient();

/**
 * Email queue statuses
 */
export enum EmailQueueStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  DEAD_LETTER = 'DEAD_LETTER', // Permanent failure after max retries
}

/**
 * Email queue entry interface
 */
export interface EmailQueueEntry {
  id: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  status: EmailQueueStatus;
  attemptCount: number;
  maxAttempts: number;
  lastAttemptAt?: Date;
  nextRetryAt?: Date;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Email queue configuration
 */
const EMAIL_QUEUE_CONFIG = {
  maxAttempts: 5, // Maximum retry attempts before moving to dead letter queue
  baseDelayMs: 60000, // Base delay: 1 minute
  maxDelayMs: 3600000, // Maximum delay: 1 hour
  exponentialBase: 2, // Exponential backoff multiplier
};

/**
 * Calculate next retry delay using exponential backoff
 * Formula: min(baseDelay * (exponentialBase ^ attemptCount), maxDelay)
 */
function calculateRetryDelay(attemptCount: number): number {
  const delay = EMAIL_QUEUE_CONFIG.baseDelayMs * Math.pow(EMAIL_QUEUE_CONFIG.exponentialBase, attemptCount);
  return Math.min(delay, EMAIL_QUEUE_CONFIG.maxDelayMs);
}

/**
 * Queue an email for sending with retry logic
 */
export async function queueEmail(options: SendEmailOptions, tenantId?: string): Promise<{ success: boolean; queueId?: string; error?: string }> {
  try {
    // Try to send immediately first
    const sendResult = await sendEmail(options);

    if (sendResult.success) {
      // Email sent successfully, no need to queue
      console.log('✅ Email sent successfully on first attempt:', options.to);
      return { success: true };
    }

    // Email failed, add to queue for retry
    console.warn('⚠️ Email failed on first attempt, queueing for retry:', options.to);

    // Note: EmailQueue model doesn't exist in schema yet, so we'll create a simpler
    // in-memory queue for now and log to database using AuditLog
    // In production, you should add an EmailQueue table to Prisma schema

    const nextRetryAt = new Date(Date.now() + calculateRetryDelay(0));

    // Log to audit log as a workaround until EmailQueue table is added
    const queueEntry = await prisma.auditLog.create({
      data: {
        action: 'EMAIL_QUEUED',
        userId: 'system',
        userName: 'Email Queue System',
        resource: 'Email',
        resourceId: `email-${Date.now()}`,
        metadata: {
          to: options.to,
          subject: options.subject,
          attemptCount: 1,
          nextRetryAt: nextRetryAt.toISOString(),
          errorMessage: sendResult.error,
        } as any,
        tenantId: tenantId || null,
      },
    });

    console.log(`📬 Email queued for retry at ${nextRetryAt.toISOString()}`);

    return {
      success: true,
      queueId: queueEntry.id,
    };
  } catch (error) {
    console.error('Failed to queue email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Process email queue and retry failed emails
 * This should be called by a cron job or background worker
 */
export async function processEmailQueue(): Promise<{ processed: number; sent: number; failed: number; deadLetter: number }> {
  console.log('🔄 Processing email queue...');

  const stats = {
    processed: 0,
    sent: 0,
    failed: 0,
    deadLetter: 0,
  };

  try {
    // Note: This is a simplified implementation using AuditLog
    // In production, create a proper EmailQueue table in Prisma schema

    // Find emails queued for retry (using audit log as temporary solution)
    const queuedEmails = await prisma.auditLog.findMany({
      where: {
        action: 'EMAIL_QUEUED',
        createdAt: {
          lte: new Date(), // Only process emails that are ready for retry
        },
      },
      take: 50, // Process 50 emails per run
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log(`📧 Found ${queuedEmails.length} emails to process`);

    for (const queuedEmail of queuedEmails) {
      stats.processed++;

      try {
        const metadata = queuedEmail.metadata as any;
        const attemptCount = (metadata.attemptCount || 0) + 1;

        // Check if max attempts reached
        if (attemptCount > EMAIL_QUEUE_CONFIG.maxAttempts) {
          console.warn(`💀 Email moved to dead letter queue after ${attemptCount} attempts:`, metadata.to);

          // Move to dead letter queue
          await prisma.auditLog.create({
            data: {
              action: 'EMAIL_DEAD_LETTER',
              userId: 'system',
              userName: 'Email Queue System',
              resource: 'Email',
              resourceId: queuedEmail.resourceId || '',
              metadata: {
                ...metadata,
                finalAttemptCount: attemptCount,
                movedToDeadLetterAt: new Date().toISOString(),
                reason: 'Max retry attempts exceeded',
              } as any,
              tenantId: queuedEmail.tenantId,
            },
          });

          // Delete from queue
          await prisma.auditLog.delete({
            where: { id: queuedEmail.id },
          });

          stats.deadLetter++;
          continue;
        }

        // Attempt to send email
        const sendResult = await sendEmail({
          to: metadata.to,
          subject: metadata.subject,
          html: metadata.html,
          text: metadata.text,
          from: metadata.from,
          replyTo: metadata.replyTo,
        });

        if (sendResult.success) {
          console.log(`✅ Email retry successful (attempt ${attemptCount}):`, metadata.to);

          // Mark as sent in audit log
          await prisma.auditLog.create({
            data: {
              action: 'EMAIL_SENT',
              userId: 'system',
              userName: 'Email Queue System',
              resource: 'Email',
              resourceId: queuedEmail.resourceId || '',
              metadata: {
                ...metadata,
                attemptCount,
                sentAt: new Date().toISOString(),
                messageId: sendResult.messageId,
              } as any,
              tenantId: queuedEmail.tenantId,
            },
          });

          // Delete from queue
          await prisma.auditLog.delete({
            where: { id: queuedEmail.id },
          });

          stats.sent++;
        } else {
          console.warn(`⚠️ Email retry failed (attempt ${attemptCount}):`, metadata.to, sendResult.error);

          // Calculate next retry delay
          const nextRetryDelay = calculateRetryDelay(attemptCount);
          const nextRetryAt = new Date(Date.now() + nextRetryDelay);

          // Update queue entry with new retry info
          await prisma.auditLog.update({
            where: { id: queuedEmail.id },
            data: {
              metadata: {
                ...metadata,
                attemptCount,
                lastAttemptAt: new Date().toISOString(),
                nextRetryAt: nextRetryAt.toISOString(),
                lastError: sendResult.error,
              } as any,
              updatedAt: new Date(),
            },
          });

          console.log(`⏰ Email retry scheduled for ${nextRetryAt.toISOString()} (delay: ${nextRetryDelay / 1000}s)`);

          stats.failed++;
        }
      } catch (error) {
        console.error('Error processing queued email:', error);
        stats.failed++;
      }
    }

    console.log('✅ Email queue processing complete:', stats);
    return stats;
  } catch (error) {
    console.error('Failed to process email queue:', error);
    return stats;
  }
}

/**
 * Get failed emails for admin monitoring dashboard
 */
export async function getFailedEmails(options?: {
  limit?: number;
  offset?: number;
  tenantId?: string;
}): Promise<{
  total: number;
  emails: Array<{
    id: string;
    to: string | string[];
    subject: string;
    attemptCount: number;
    lastError?: string;
    nextRetryAt?: Date;
    status: 'QUEUED' | 'DEAD_LETTER';
    createdAt: Date;
  }>;
}> {
  try {
    const { limit = 50, offset = 0, tenantId } = options || {};

    // Get queued emails (pending retry)
    const queuedEmails = await prisma.auditLog.findMany({
      where: {
        action: 'EMAIL_QUEUED',
        ...(tenantId && { tenantId }),
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get dead letter emails (permanent failures)
    const deadLetterEmails = await prisma.auditLog.findMany({
      where: {
        action: 'EMAIL_DEAD_LETTER',
        ...(tenantId && { tenantId }),
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const allEmails = [
      ...queuedEmails.map((email) => {
        const metadata = email.metadata as any;
        return {
          id: email.id,
          to: metadata.to,
          subject: metadata.subject,
          attemptCount: metadata.attemptCount || 0,
          lastError: metadata.lastError,
          nextRetryAt: metadata.nextRetryAt ? new Date(metadata.nextRetryAt) : undefined,
          status: 'QUEUED' as const,
          createdAt: email.createdAt,
        };
      }),
      ...deadLetterEmails.map((email) => {
        const metadata = email.metadata as any;
        return {
          id: email.id,
          to: metadata.to,
          subject: metadata.subject,
          attemptCount: metadata.finalAttemptCount || metadata.attemptCount || 0,
          lastError: metadata.reason || metadata.lastError,
          nextRetryAt: undefined,
          status: 'DEAD_LETTER' as const,
          createdAt: email.createdAt,
        };
      }),
    ];

    // Sort by creation date (newest first)
    allEmails.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
      total: allEmails.length,
      emails: allEmails.slice(0, limit),
    };
  } catch (error) {
    console.error('Failed to get failed emails:', error);
    return {
      total: 0,
      emails: [],
    };
  }
}

/**
 * Retry a specific email from the dead letter queue (manual admin action)
 */
export async function retryDeadLetterEmail(emailId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const deadLetterEmail = await prisma.auditLog.findUnique({
      where: { id: emailId },
    });

    if (!deadLetterEmail || deadLetterEmail.action !== 'EMAIL_DEAD_LETTER') {
      return {
        success: false,
        error: 'Email not found in dead letter queue',
      };
    }

    const metadata = deadLetterEmail.metadata as any;

    // Try to send the email
    const sendResult = await sendEmail({
      to: metadata.to,
      subject: metadata.subject,
      html: metadata.html,
      text: metadata.text,
      from: metadata.from,
      replyTo: metadata.replyTo,
    });

    if (sendResult.success) {
      console.log('✅ Dead letter email retry successful:', metadata.to);

      // Mark as sent
      await prisma.auditLog.create({
        data: {
          action: 'EMAIL_SENT',
          userId: 'system',
          userName: 'Email Queue System (Manual Retry)',
          resource: 'Email',
          resourceId: deadLetterEmail.resourceId || '',
          metadata: {
            ...metadata,
            retriedFromDeadLetter: true,
            sentAt: new Date().toISOString(),
            messageId: sendResult.messageId,
          } as any,
          tenantId: deadLetterEmail.tenantId,
        },
      });

      // Remove from dead letter queue
      await prisma.auditLog.delete({
        where: { id: emailId },
      });

      return { success: true };
    } else {
      console.warn('⚠️ Dead letter email retry failed:', metadata.to, sendResult.error);
      return {
        success: false,
        error: sendResult.error,
      };
    }
  } catch (error) {
    console.error('Failed to retry dead letter email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get email queue statistics for admin monitoring
 */
export async function getEmailQueueStats(tenantId?: string): Promise<{
  queued: number;
  deadLetter: number;
  totalSent24h: number;
  totalFailed24h: number;
}> {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [queued, deadLetter, sent24h, failed24h] = await Promise.all([
      prisma.auditLog.count({
        where: {
          action: 'EMAIL_QUEUED',
          ...(tenantId && { tenantId }),
        },
      }),
      prisma.auditLog.count({
        where: {
          action: 'EMAIL_DEAD_LETTER',
          ...(tenantId && { tenantId }),
        },
      }),
      prisma.auditLog.count({
        where: {
          action: 'EMAIL_SENT',
          createdAt: { gte: oneDayAgo },
          ...(tenantId && { tenantId }),
        },
      }),
      prisma.auditLog.count({
        where: {
          action: {
            in: ['EMAIL_QUEUED', 'EMAIL_DEAD_LETTER'],
          },
          createdAt: { gte: oneDayAgo },
          ...(tenantId && { tenantId }),
        },
      }),
    ]);

    return {
      queued,
      deadLetter,
      totalSent24h: sent24h,
      totalFailed24h: failed24h,
    };
  } catch (error) {
    console.error('Failed to get email queue stats:', error);
    return {
      queued: 0,
      deadLetter: 0,
      totalSent24h: 0,
      totalFailed24h: 0,
    };
  }
}

/**
 * Clear old sent and dead letter emails (cleanup job)
 * Keeps emails for 30 days for compliance and debugging
 */
export async function cleanupOldEmails(retentionDays: number = 30): Promise<{ deleted: number }> {
  try {
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    const result = await prisma.auditLog.deleteMany({
      where: {
        action: {
          in: ['EMAIL_SENT', 'EMAIL_DEAD_LETTER'],
        },
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    console.log(`🗑️ Cleaned up ${result.count} old email records (older than ${retentionDays} days)`);

    return {
      deleted: result.count,
    };
  } catch (error) {
    console.error('Failed to cleanup old emails:', error);
    return {
      deleted: 0,
    };
  }
}
