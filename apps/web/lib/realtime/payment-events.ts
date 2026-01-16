/**
 * Payment Real-time Events
 *
 * Emits WebSocket events for payment status changes
 * Integrates with real-time system and notifications
 */

import { emitEvent } from '@/lib/realtime/event-emitter';
import { sendNotification } from '@/lib/notifications';
import type { RealtimeEvent } from '@/lib/realtime/events';

/**
 * Emit payment created event
 */
export async function emitPaymentCreated(
  paymentId: string,
  bookingId: string,
  clientId: string,
  amount: number,
  currency: string = 'AUD'
) {
  try {
    const event: RealtimeEvent = {
      type: 'payment:created',
      id: paymentId,
      timestamp: new Date(),
      data: {
        paymentId,
        bookingId,
        clientId,
        amount,
        currency,
      },
      channel: `booking:${bookingId}`,
      priority: 'normal',
    };

    await emitEvent(event);

    // Create in-app notification
    await sendNotification({
      userId: clientId,
      type: 'payment_created',
      title: 'Payment Initiated',
      message: `Payment of $${amount.toFixed(2)} ${currency} has been initiated for your booking.`,
      data: {
        paymentId,
        bookingId,
      },
    });
  } catch (error) {
    console.error('Failed to emit payment:created event:', error);
  }
}

/**
 * Emit payment succeeded event
 */
export async function emitPaymentSucceeded(
  paymentId: string,
  bookingId: string,
  clientId: string,
  contractorId: string | null,
  amount: number,
  currency: string = 'AUD'
) {
  try {
    // Event for client
    const clientEvent: RealtimeEvent = {
      type: 'payment:succeeded',
      id: paymentId,
      timestamp: new Date(),
      data: {
        paymentId,
        bookingId,
        clientId,
        amount,
        currency,
        message: 'Your payment has been processed successfully',
      },
      channel: `booking:${bookingId}`,
      priority: 'high',
    };

    await emitEvent(clientEvent);

    // Send client notification
    await sendNotification({
      userId: clientId,
      type: 'payment_success',
      title: 'Payment Successful',
      message: `Your payment of $${amount.toFixed(2)} ${currency} has been processed successfully.`,
      data: {
        paymentId,
        bookingId,
      },
    });

    // Event for contractor (if assigned)
    if (contractorId) {
      const contractorEvent: RealtimeEvent = {
        type: 'payment:succeeded',
        id: paymentId,
        timestamp: new Date(),
        data: {
          paymentId,
          bookingId,
          clientId,
          amount,
          currency,
          message: 'Client payment processed - waiting for dispute window',
        },
        channel: `booking:${bookingId}`,
        priority: 'high',
      };

      await emitEvent(contractorEvent);

      // Send contractor notification
      await sendNotification({
        userId: contractorId,
        type: 'payment_success',
        title: 'Payment Received',
        message: `Client payment of $${amount.toFixed(2)} ${currency} has been received. Payout will process after 30-day dispute window.`,
        data: {
          paymentId,
          bookingId,
        },
      });
    }
  } catch (error) {
    console.error('Failed to emit payment:succeeded event:', error);
  }
}

/**
 * Emit payment failed event
 */
export async function emitPaymentFailed(
  paymentId: string,
  bookingId: string,
  clientId: string,
  amount: number,
  failureReason: string,
  currency: string = 'AUD'
) {
  try {
    const event: RealtimeEvent = {
      type: 'payment:failed',
      id: paymentId,
      timestamp: new Date(),
      data: {
        paymentId,
        bookingId,
        clientId,
        amount,
        currency,
        failureReason,
        message: 'Payment processing failed - please retry',
      },
      channel: `booking:${bookingId}`,
      priority: 'high',
    };

    await emitEvent(event);

    // Send client notification
    await sendNotification({
      userId: clientId,
      type: 'payment_failed',
      title: 'Payment Failed',
      message: `Payment of $${amount.toFixed(2)} ${currency} could not be processed. ${failureReason}`,
      data: {
        paymentId,
        bookingId,
        action: 'retry_payment',
      },
    });
  } catch (error) {
    console.error('Failed to emit payment:failed event:', error);
  }
}

/**
 * Emit invoice generated event
 */
export async function emitInvoiceGenerated(
  invoiceId: string,
  paymentId: string,
  bookingId: string,
  clientId: string,
  contractorId: string,
  invoiceNumber: string,
  totalAmount: number
) {
  try {
    // Event for client
    const clientEvent: RealtimeEvent = {
      type: 'invoice:generated',
      id: invoiceId,
      timestamp: new Date(),
      data: {
        invoiceId,
        paymentId,
        bookingId,
        invoiceNumber,
        totalAmount,
        message: 'Your invoice has been generated',
      },
      channel: `booking:${bookingId}`,
      priority: 'normal',
    };

    await emitEvent(clientEvent);

    // Send client notification
    await sendNotification({
      userId: clientId,
      type: 'invoice_generated',
      title: 'Invoice Generated',
      message: `Invoice #${invoiceNumber} for $${totalAmount.toFixed(2)} AUD has been generated and emailed to you.`,
      data: {
        invoiceId,
        invoiceNumber,
        bookingId,
      },
    });

    // Event for contractor
    const contractorEvent: RealtimeEvent = {
      type: 'invoice:generated',
      id: invoiceId,
      timestamp: new Date(),
      data: {
        invoiceId,
        paymentId,
        bookingId,
        invoiceNumber,
        totalAmount,
        message: 'Client invoice generated',
      },
      channel: `booking:${bookingId}`,
      priority: 'normal',
    };

    await emitEvent(contractorEvent);

    // Send contractor notification
    await sendNotification({
      userId: contractorId,
      type: 'invoice_generated',
      title: 'Client Invoice Generated',
      message: `Invoice #${invoiceNumber} for booking has been sent to client.`,
      data: {
        invoiceId,
        invoiceNumber,
        bookingId,
      },
    });
  } catch (error) {
    console.error('Failed to emit invoice:generated event:', error);
  }
}

/**
 * Emit payout initiated event
 */
export async function emitPayoutInitiated(
  payoutId: string,
  bookingId: string,
  contractorId: string,
  payoutAmount: number,
  platformFee: number
) {
  try {
    const event: RealtimeEvent = {
      type: 'payout:initiated',
      id: payoutId,
      timestamp: new Date(),
      data: {
        payoutId,
        bookingId,
        contractorId,
        payoutAmount,
        platformFee,
        message: 'Payout initiated to contractor',
      },
      channel: `contractor:${contractorId}`,
      priority: 'high',
    };

    await emitEvent(event);

    // Send contractor notification
    await sendNotification({
      userId: contractorId,
      type: 'payout_initiated',
      title: 'Payout Initiated',
      message: `Your payout of $${payoutAmount.toFixed(2)} AUD has been initiated. You will receive it within 2-3 business days.`,
      data: {
        payoutId,
        bookingId,
        payoutAmount,
      },
    });
  } catch (error) {
    console.error('Failed to emit payout:initiated event:', error);
  }
}

/**
 * Emit payout completed event
 */
export async function emitPayoutCompleted(
  payoutId: string,
  bookingId: string,
  contractorId: string,
  payoutAmount: number
) {
  try {
    const event: RealtimeEvent = {
      type: 'payout:completed',
      id: payoutId,
      timestamp: new Date(),
      data: {
        payoutId,
        bookingId,
        contractorId,
        payoutAmount,
        message: 'Payout completed to contractor',
      },
      channel: `contractor:${contractorId}`,
      priority: 'high',
    };

    await emitEvent(event);

    // Send contractor notification
    await sendNotification({
      userId: contractorId,
      type: 'payout_completed',
      title: 'Payout Completed',
      message: `Your payout of $${payoutAmount.toFixed(2)} AUD has been completed and deposited into your bank account.`,
      data: {
        payoutId,
        bookingId,
      },
    });
  } catch (error) {
    console.error('Failed to emit payout:completed event:', error);
  }
}
