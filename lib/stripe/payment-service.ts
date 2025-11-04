/**
 * Stripe Payment Service
 * Handles one-time payments, refunds, and checkout sessions
 *
 * @module StripePaymentService
 * @version 1.0.0
 */

import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { stripe, CURRENCY, getCheckoutUrls } from './config';

const prisma = new PrismaClient();

/**
 * Create a payment intent for an invoice
 */
export async function createPaymentIntent(
  invoiceId: string,
  amount: number
): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        invoiceId,
      },
    });

    return paymentIntent;
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    throw new Error('Failed to create payment intent');
  }
}

/**
 * Create a Stripe Checkout session for invoice payment
 */
export async function createCheckoutSession(invoiceId: string): Promise<Stripe.Checkout.Session> {
  try {
    // Get invoice details
    const invoice = await prisma.contractorInvoice.findUnique({
      where: { id: invoiceId },
      include: {
        subscription: {
          include: {
            contractor: {
              include: {
                companyProfile: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (invoice.status === 'PAID') {
      throw new Error('Invoice is already paid');
    }

    // Parse invoice items
    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    try {
      const items = JSON.parse(invoice.items);
      lineItems = items.map((item: any) => ({
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: item.description,
            description: `Invoice ${invoice.invoiceNumber}`,
          },
          unit_amount: Math.round(item.unitPrice * 100), // Convert to cents
        },
        quantity: item.quantity || 1,
      }));
    } catch (e) {
      // Fallback to simple line item
      lineItems = [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: `Invoice ${invoice.invoiceNumber}`,
              description: 'Subscription Payment',
            },
            unit_amount: Math.round(invoice.total * 100), // Convert to cents
          },
          quantity: 1,
        },
      ];
    }

    // Get or create Stripe customer
    let customerId: string | null = null;

    try {
      const paymentDetails = JSON.parse(invoice.subscription.paymentDetails || '{}');
      customerId = paymentDetails.stripeCustomerId;
    } catch (e) {
      // No existing customer
    }

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: invoice.subscription.contractor.email,
        name: invoice.subscription.contractor.companyProfile?.companyName || invoice.subscription.contractor.username,
        metadata: {
          contractorId: invoice.subscription.contractorId,
        },
      });
      customerId = customer.id;

      // Update subscription with customer ID
      await prisma.contractorSubscription.update({
        where: { id: invoice.subscriptionId },
        data: {
          paymentDetails: JSON.stringify({
            stripeCustomerId: customerId,
          }),
        },
      });
    }

    // Create checkout session
    const { success, cancel } = getCheckoutUrls(invoiceId);

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: success,
      cancel_url: cancel,
      metadata: {
        invoiceId,
        subscriptionId: invoice.subscriptionId,
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Invoice ${invoice.invoiceNumber}`,
          metadata: {
            invoiceId,
          },
        },
      },
    });

    // Update invoice with Stripe invoice ID
    await prisma.contractorInvoice.update({
      where: { id: invoiceId },
      data: {
        status: 'ISSUED',
      },
    });

    return session;
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

/**
 * Refund a payment
 */
export async function refundPayment(
  paymentIntentId: string,
  amount?: number
): Promise<Stripe.Refund> {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined, // Convert to cents if partial refund
    });

    return refund;
  } catch (error) {
    console.error('Failed to process refund:', error);
    throw new Error('Failed to process refund');
  }
}

/**
 * Handle payment webhook events
 */
export async function handlePaymentWebhook(event: Stripe.Event): Promise<void> {
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const invoiceId = paymentIntent.metadata.invoiceId;

        if (invoiceId) {
          // Update invoice
          await prisma.contractorInvoice.update({
            where: { id: invoiceId },
            data: {
              status: 'PAID',
              paidAt: new Date(),
            },
          });

          // Create payment record
          const invoice = await prisma.contractorInvoice.findUnique({
            where: { id: invoiceId },
          });

          if (invoice) {
            await prisma.contractorPayment.create({
              data: {
                subscriptionId: invoice.subscriptionId,
                amount: paymentIntent.amount / 100, // Convert from cents
                type: 'SUBSCRIPTION',
                status: 'COMPLETED',
                paymentMethod: 'CREDIT_CARD',
                transactionId: paymentIntent.id,
                paidAt: new Date(),
                dueDate: invoice.dueDate,
              },
            });
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const invoiceId = paymentIntent.metadata.invoiceId;

        if (invoiceId) {
          const invoice = await prisma.contractorInvoice.findUnique({
            where: { id: invoiceId },
            include: {
              subscription: true,
            },
          });

          if (invoice) {
            // Create notification
            await prisma.contractorNotification.create({
              data: {
                contractorId: invoice.subscription.contractorId,
                type: 'PAYMENT',
                priority: 'HIGH',
                subject: 'Payment Failed',
                message: `Payment for invoice ${invoice.invoiceNumber} failed. Please try again or update your payment method.`,
                actionRequired: true,
                actionUrl: `/invoices/${invoiceId}/pay`,
              },
            });
          }
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const invoiceId = session.metadata?.invoiceId;

        if (invoiceId) {
          // Payment successful - update invoice
          await prisma.contractorInvoice.update({
            where: { id: invoiceId },
            data: {
              status: 'PAID',
              paidAt: new Date(),
            },
          });
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId = charge.payment_intent as string;

        if (paymentIntentId) {
          // Find payment by transaction ID
          const payment = await prisma.contractorPayment.findFirst({
            where: {
              transactionId: paymentIntentId,
            },
            include: {
              subscription: true,
            },
          });

          if (payment) {
            // Update payment status
            await prisma.contractorPayment.update({
              where: { id: payment.id },
              data: {
                status: 'REFUNDED',
              },
            });

            // Create notification
            await prisma.contractorNotification.create({
              data: {
                contractorId: payment.subscription.contractorId,
                type: 'PAYMENT',
                priority: 'NORMAL',
                subject: 'Payment Refunded',
                message: `A payment of $${(charge.amount_refunded / 100).toFixed(2)} has been refunded to your account.`,
                actionRequired: false,
              },
            });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled payment event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling payment webhook:', error);
    throw error;
  }
}
