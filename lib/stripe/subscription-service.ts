/**
 * Stripe Subscription Service
 * Handles Stripe subscription creation, updates, and management
 *
 * @module StripeSubscriptionService
 * @version 1.0.0
 */

import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { stripe, SUBSCRIPTION_PRICES, CURRENCY, SubscriptionTier } from './config';

const prisma = new PrismaClient();

/**
 * Create a Stripe customer for a contractor
 */
export async function createStripeCustomer(
  contractorId: string,
  email: string,
  name: string
): Promise<Stripe.Customer> {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        contractorId,
      },
    });

    return customer;
  } catch (error) {
    console.error('Failed to create Stripe customer:', error);
    throw new Error('Failed to create customer in payment system');
  }
}

/**
 * Create a Stripe subscription for a contractor
 */
export async function createSubscription(
  contractorId: string,
  tier: string
): Promise<{
  subscription: Stripe.Subscription;
  customer: Stripe.Customer;
}> {
  try {
    // Get contractor details
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        companyProfile: true,
      },
    });

    if (!contractor) {
      throw new Error('Contractor not found');
    }

    // Check if contractor already has a Stripe customer ID
    const subscription = await prisma.contractorSubscription.findUnique({
      where: { contractorId },
    });

    let customer: Stripe.Customer;
    let stripeCustomerId: string | null = null;

    // Extract customer ID from payment details if exists
    if (subscription?.paymentDetails) {
      try {
        const paymentDetails = JSON.parse(subscription.paymentDetails);
        stripeCustomerId = paymentDetails.stripeCustomerId;
      } catch (e) {
        // Invalid JSON, create new customer
      }
    }

    if (stripeCustomerId) {
      customer = await stripe.customers.retrieve(stripeCustomerId) as Stripe.Customer;
    } else {
      // Create new Stripe customer
      customer = await createStripeCustomer(
        contractorId,
        contractor.email,
        contractor.companyProfile?.companyName || contractor.username
      );

      // Update subscription with customer ID
      if (subscription) {
        await prisma.contractorSubscription.update({
          where: { id: subscription.id },
          data: {
            paymentDetails: JSON.stringify({
              stripeCustomerId: customer.id,
            }),
          },
        });
      }
    }

    // Get price for tier
    const priceAmount = SUBSCRIPTION_PRICES[tier as SubscriptionTier];
    if (!priceAmount) {
      throw new Error(`Invalid subscription tier: ${tier}`);
    }

    // Create Stripe subscription
    const stripeSubscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: `NRPG ${tier.replace('TIER_', '')} Subscription`,
              description: `Monthly subscription for ${tier.replace('TIER_', '')} coverage area`,
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: priceAmount,
          },
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        contractorId,
        tier,
      },
    });

    return {
      subscription: stripeSubscription,
      customer,
    };
  } catch (error) {
    console.error('Failed to create Stripe subscription:', error);
    throw new Error('Failed to create subscription in payment system');
  }
}

/**
 * Update subscription tier (upgrade/downgrade)
 */
export async function updateSubscription(
  stripeSubscriptionId: string,
  newTier: string
): Promise<Stripe.Subscription> {
  try {
    // Get existing subscription
    const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

    if (!subscription) {
      throw new Error('Stripe subscription not found');
    }

    // Get new price
    const newPriceAmount = SUBSCRIPTION_PRICES[newTier as SubscriptionTier];
    if (!newPriceAmount) {
      throw new Error(`Invalid subscription tier: ${newTier}`);
    }

    // Update subscription
    const updatedSubscription = await stripe.subscriptions.update(stripeSubscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: `NRPG ${newTier.replace('TIER_', '')} Subscription`,
              description: `Monthly subscription for ${newTier.replace('TIER_', '')} coverage area`,
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: newPriceAmount,
          },
        },
      ],
      proration_behavior: 'create_prorations',
      metadata: {
        ...subscription.metadata,
        tier: newTier,
      },
    });

    return updatedSubscription;
  } catch (error) {
    console.error('Failed to update Stripe subscription:', error);
    throw new Error('Failed to update subscription in payment system');
  }
}

/**
 * Cancel subscription at period end
 */
export async function cancelSubscription(stripeSubscriptionId: string): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    return subscription;
  } catch (error) {
    console.error('Failed to cancel Stripe subscription:', error);
    throw new Error('Failed to cancel subscription in payment system');
  }
}

/**
 * Resume a cancelled subscription
 */
export async function resumeSubscription(stripeSubscriptionId: string): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    return subscription;
  } catch (error) {
    console.error('Failed to resume Stripe subscription:', error);
    throw new Error('Failed to resume subscription in payment system');
  }
}

/**
 * Get subscription status from Stripe
 */
export async function getSubscriptionStatus(stripeSubscriptionId: string): Promise<{
  status: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}> {
  try {
    const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

    return {
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
  } catch (error) {
    console.error('Failed to get Stripe subscription status:', error);
    throw new Error('Failed to retrieve subscription status');
  }
}

/**
 * Handle subscription webhook events
 */
export async function handleSubscriptionWebhook(event: Stripe.Event): Promise<void> {
  try {
    switch (event.type) {
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const contractorId = subscription.metadata.contractorId;

        if (contractorId) {
          await prisma.contractorSubscription.updateMany({
            where: { contractorId },
            data: {
              status: 'ACTIVE',
              paymentDetails: JSON.stringify({
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
              }),
            },
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.contractorSubscription.updateMany({
          where: {
            paymentDetails: {
              contains: subscription.id,
            },
          },
          data: {
            status: subscription.status === 'active' ? 'ACTIVE' : 'INACTIVE',
            nextBillingDate: new Date(subscription.current_period_end * 1000),
          },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.contractorSubscription.updateMany({
          where: {
            paymentDetails: {
              contains: subscription.id,
            },
          },
          data: {
            status: 'CANCELLED',
            cancelledAt: new Date(),
            endDate: new Date(),
          },
        });
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (subscriptionId) {
          // Find contractor subscription
          const subscription = await prisma.contractorSubscription.findFirst({
            where: {
              paymentDetails: {
                contains: subscriptionId,
              },
            },
          });

          if (subscription) {
            // Record payment
            await prisma.contractorPayment.create({
              data: {
                subscriptionId: subscription.id,
                amount: invoice.amount_paid / 100, // Convert from cents
                type: 'SUBSCRIPTION',
                status: 'COMPLETED',
                paymentMethod: 'CREDIT_CARD',
                transactionId: invoice.payment_intent as string,
                paidAt: new Date(invoice.status_transitions.paid_at! * 1000),
                dueDate: new Date(invoice.due_date! * 1000),
              },
            });

            // Update invoice if exists in our system
            await prisma.contractorInvoice.updateMany({
              where: {
                subscriptionId: subscription.id,
                status: 'ISSUED',
              },
              data: {
                status: 'PAID',
                paidAt: new Date(),
              },
            });
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (subscriptionId) {
          // Find contractor subscription
          const subscription = await prisma.contractorSubscription.findFirst({
            where: {
              paymentDetails: {
                contains: subscriptionId,
              },
            },
          });

          if (subscription) {
            // Create notification
            await prisma.contractorNotification.create({
              data: {
                contractorId: subscription.contractorId,
                type: 'PAYMENT',
                priority: 'URGENT',
                subject: 'Payment Failed',
                message: `Your subscription payment of $${(invoice.amount_due / 100).toFixed(2)} failed. Please update your payment method.`,
                actionRequired: true,
                actionUrl: '/contractor/subscription',
              },
            });

            // Update subscription status to past_due
            await prisma.contractorSubscription.update({
              where: { id: subscription.id },
              data: {
                status: 'PAST_DUE',
              },
            });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled subscription event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling subscription webhook:', error);
    throw error;
  }
}
