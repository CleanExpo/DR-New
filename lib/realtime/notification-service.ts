/**
 * Notification Service
 * Handles notification CRUD operations and real-time event emission
 */

import { prisma } from '@/lib/prisma';
import { eventEmitter, RealtimeEventType } from './event-emitter';

export enum NotificationType {
  JOB_ASSIGNED = 'JOB_ASSIGNED',
  APPOINTMENT_SCHEDULED = 'APPOINTMENT_SCHEDULED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  JOB_STATUS_CHANGED = 'JOB_STATUS_CHANGED',
  INVOICE_CREATED = 'INVOICE_CREATED',
  SYSTEM = 'SYSTEM',
  ALERT = 'ALERT',
}

export interface CreateNotificationInput {
  userId: string;
  tenantId: string;
  title: string;
  message: string;
  type: NotificationType;
  relatedEntityId?: string;
  relatedEntityType?: string;
  actionUrl?: string;
}

export interface NotificationResponse {
  id: string;
  userId: string;
  tenantId: string;
  title: string;
  message: string;
  type: string;
  relatedEntityId?: string | null;
  relatedEntityType?: string | null;
  actionUrl?: string | null;
  isRead: boolean;
  createdAt: Date;
}

class NotificationService {
  /**
   * Create a new notification and emit real-time event
   */
  async createNotification(
    input: CreateNotificationInput
  ): Promise<NotificationResponse> {
    const notification = await prisma.notification.create({
      data: {
        userId: input.userId,
        tenantId: input.tenantId,
        title: input.title,
        message: input.message,
        type: input.type,
        relatedEntityId: input.relatedEntityId,
        relatedEntityType: input.relatedEntityType,
        actionUrl: input.actionUrl,
        isRead: false,
      },
    });

    // Emit real-time event to the user
    eventEmitter.emitToUsers(
      RealtimeEventType.NOTIFICATION,
      {
        notificationId: notification.id,
        userId: notification.userId,
        tenantId: notification.tenantId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
      },
      notification.tenantId,
      [notification.userId]
    );

    return notification;
  }

  /**
   * Create multiple notifications (batch)
   */
  async createNotifications(
    inputs: CreateNotificationInput[]
  ): Promise<NotificationResponse[]> {
    const notifications = await prisma.notification.createMany({
      data: inputs.map((input) => ({
        userId: input.userId,
        tenantId: input.tenantId,
        title: input.title,
        message: input.message,
        type: input.type,
        relatedEntityId: input.relatedEntityId,
        relatedEntityType: input.relatedEntityType,
        actionUrl: input.actionUrl,
        isRead: false,
      })),
    });

    // Emit real-time events for each notification
    inputs.forEach((input) => {
      eventEmitter.emitToUsers(
        RealtimeEventType.NOTIFICATION,
        {
          notificationId: '', // We don't have individual IDs from createMany
          userId: input.userId,
          tenantId: input.tenantId,
          title: input.title,
          message: input.message,
          type: input.type,
        },
        input.tenantId,
        [input.userId]
      );
    });

    // Fetch the created notifications
    return await prisma.notification.findMany({
      where: {
        userId: { in: inputs.map((i) => i.userId) },
        tenantId: inputs[0]?.tenantId,
      },
      orderBy: { createdAt: 'desc' },
      take: inputs.length,
    });
  }

  /**
   * Get notifications for a user
   */
  async getNotifications(
    userId: string,
    tenantId: string,
    options?: {
      limit?: number;
      offset?: number;
      unreadOnly?: boolean;
    }
  ): Promise<NotificationResponse[]> {
    const where = {
      userId,
      tenantId,
      ...(options?.unreadOnly ? { isRead: false } : {}),
    };

    return await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 50,
      skip: options?.offset || 0,
    });
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(userId: string, tenantId: string): Promise<number> {
    return await prisma.notification.count({
      where: {
        userId,
        tenantId,
        isRead: false,
      },
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(
    notificationId: string,
    userId: string,
    tenantId: string
  ): Promise<NotificationResponse> {
    return await prisma.notification.update({
      where: {
        id: notificationId,
        userId,
        tenantId,
      },
      data: {
        isRead: true,
      },
    });
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string, tenantId: string): Promise<number> {
    const result = await prisma.notification.updateMany({
      where: {
        userId,
        tenantId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return result.count;
  }

  /**
   * Delete a notification
   */
  async deleteNotification(
    notificationId: string,
    userId: string,
    tenantId: string
  ): Promise<void> {
    await prisma.notification.delete({
      where: {
        id: notificationId,
        userId,
        tenantId,
      },
    });
  }

  /**
   * Delete all read notifications for a user
   */
  async deleteReadNotifications(
    userId: string,
    tenantId: string
  ): Promise<number> {
    const result = await prisma.notification.deleteMany({
      where: {
        userId,
        tenantId,
        isRead: true,
      },
    });

    return result.count;
  }

  /**
   * Helper: Create job assigned notification
   */
  async notifyJobAssigned(
    contractorId: string,
    tenantId: string,
    jobNumber: string,
    jobId: string
  ): Promise<void> {
    await this.createNotification({
      userId: contractorId,
      tenantId,
      title: 'New Job Assigned',
      message: `You've been assigned to job ${jobNumber}`,
      type: NotificationType.JOB_ASSIGNED,
      relatedEntityId: jobId,
      relatedEntityType: 'WorkOrder',
      actionUrl: `/admin/jobs/${jobId}`,
    });
  }

  /**
   * Helper: Create appointment scheduled notification
   */
  async notifyAppointmentScheduled(
    technicianId: string,
    tenantId: string,
    jobNumber: string,
    scheduledDate: Date
  ): Promise<void> {
    await this.createNotification({
      userId: technicianId,
      tenantId,
      title: 'New Appointment Scheduled',
      message: `Appointment scheduled for ${jobNumber} on ${scheduledDate.toLocaleDateString()}`,
      type: NotificationType.APPOINTMENT_SCHEDULED,
      relatedEntityType: 'Schedule',
      actionUrl: `/admin/schedule`,
    });
  }

  /**
   * Helper: Create payment received notification
   */
  async notifyPaymentReceived(
    contractorId: string,
    tenantId: string,
    invoiceNumber: string,
    amount: number
  ): Promise<void> {
    await this.createNotification({
      userId: contractorId,
      tenantId,
      title: 'Payment Received',
      message: `Payment of $${amount.toFixed(2)} received for Invoice ${invoiceNumber}`,
      type: NotificationType.PAYMENT_RECEIVED,
      relatedEntityType: 'Invoice',
      actionUrl: `/admin/invoices`,
    });
  }
}

export const notificationService = new NotificationService();
