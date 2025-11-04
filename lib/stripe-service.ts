import { stripe } from './stripe';
import { prisma } from './prisma';
import Stripe from 'stripe';

// Pricing structure in cents (AUD)
const SUBSCRIPTION_PRICES = {
  RADIUS_25KM: 9900,   // $99/month
  RADIUS_50KM: 19900,  // $199/month
  RADIUS_100KM: 34900, // $349/month
  RURAL: 49900,        // $499/month
};

// Store Stripe Price IDs (these will be set up via setup script)
const STRIPE_PRICE_IDS: Record<string, string> = {
  RADIUS_25KM: process.env.STRIPE_PRICE_25KM || '',
  RADIUS_50KM: process.env.STRIPE_PRICE_50KM || '',
  RADIUS_100KM: process.env.STRIPE_PRICE_100KM || '',
  RURAL: process.env.STRIPE_PRICE_RURAL || '',
};

export class StripeService {
  /**
   * Create Stripe customer for contractor
   */
  static async createCustomer(
    contractorId: string,
    email: string,
    name: string
  ): Promise<string> {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          contractorId,
        },
      });

      // Update contractor with Stripe customer ID
      await prisma.contractor.update({
        where: { id: contractorId },
        data: { stripeCustomerId: customer.id },
      });

      return customer.id;
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw new Error('Failed to create Stripe customer');
    }
  }

  /**
   * Create subscription with pricing tiers
   */
  static async createSubscription(params: {
    contractorId: string;
    tier: 'RADIUS_25KM' | 'RADIUS_50KM' | 'RADIUS_100KM' | 'RURAL';
    customerId?: string;
  }): Promise<{ subscriptionId: string; clientSecret: string }> {
    try {
      const { contractorId, tier, customerId } = params;

      // Get contractor details
      const contractor = await prisma.contractor.findUnique({
        where: { id: contractorId },
      });

      if (!contractor) {
        throw new Error('Contractor not found');
      }

      // Create Stripe customer if not exists
      let stripeCustomerId = customerId || contractor.stripeCustomerId;
      if (!stripeCustomerId) {
        stripeCustomerId = await this.createCustomer(
          contractorId,
          contractor.email,
          contractor.name
        );
      }

      // Get price ID for tier (or create price on-the-fly if not configured)
      let priceId = STRIPE_PRICE_IDS[tier];

      if (!priceId) {
        // Create price on-the-fly if not configured
        const price = await stripe.prices.create({
          unit_amount: SUBSCRIPTION_PRICES[tier],
          currency: 'aud',
          recurring: { interval: 'month' },
          product_data: {
            name: `NRPG ${tier.replace('RADIUS_', '').replace('KM', 'km')} Coverage`,
          },
        });
        priceId = price.id;
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          contractorId,
          tier,
        },
      });

      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

      // Create or update ContractorSubscription in database
      const existingSubscription = await prisma.contractorSubscription.findUnique({
        where: { contractorId },
      });

      if (existingSubscription) {
        await prisma.contractorSubscription.update({
          where: { contractorId },
          data: {
            stripeSubscriptionId: subscription.id,
            tier,
            status: 'ACTIVE',
            startDate: new Date(),
            nextBillingDate: new Date(subscription.current_period_end * 1000),
          },
        });
      } else {
        await prisma.contractorSubscription.create({
          data: {
            contractorId,
            tier,
            status: 'ACTIVE',
            stripeSubscriptionId: subscription.id,
            startDate: new Date(),
            nextBillingDate: new Date(subscription.current_period_end * 1000),
          },
        });
      }

      return {
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret!,
      };
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Failed to create subscription');
    }
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      // Cancel subscription at period end (no refund)
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      // Update database
      const subscription = await prisma.contractorSubscription.findFirst({
        where: { stripeSubscriptionId: subscriptionId },
      });

      if (subscription) {
        await prisma.contractorSubscription.update({
          where: { id: subscription.id },
          data: {
            status: 'CANCELLED',
            endDate: new Date(),
          },
        });
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw new Error('Failed to cancel subscription');
    }
  }

  /**
   * Update subscription tier (upgrade/downgrade)
   */
  static async updateSubscription(
    subscriptionId: string,
    newTier: 'RADIUS_25KM' | 'RADIUS_50KM' | 'RADIUS_100KM' | 'RURAL'
  ): Promise<void> {
    try {
      // Get current subscription
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      // Get new price ID
      let priceId = STRIPE_PRICE_IDS[newTier];

      if (!priceId) {
        // Create price on-the-fly if not configured
        const price = await stripe.prices.create({
          unit_amount: SUBSCRIPTION_PRICES[newTier],
          currency: 'aud',
          recurring: { interval: 'month' },
          product_data: {
            name: `NRPG ${newTier.replace('RADIUS_', '').replace('KM', 'km')} Coverage`,
          },
        });
        priceId = price.id;
      }

      // Update subscription with proration
      await stripe.subscriptions.update(subscriptionId, {
        items: [
          {
            id: subscription.items.data[0].id,
            price: priceId,
          },
        ],
        proration_behavior: 'create_prorations',
        metadata: {
          ...subscription.metadata,
          tier: newTier,
        },
      });

      // Update database
      const dbSubscription = await prisma.contractorSubscription.findFirst({
        where: { stripeSubscriptionId: subscriptionId },
      });

      if (dbSubscription) {
        await prisma.contractorSubscription.update({
          where: { id: dbSubscription.id },
          data: { tier: newTier },
        });
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw new Error('Failed to update subscription');
    }
  }

  /**
   * Create payment intent for invoice
   */
  static async createPaymentIntent(invoiceId: string): Promise<{
    paymentIntentId: string;
    clientSecret: string;
  }> {
    try {
      // Get invoice details
      const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: { contractor: true },
      });

      if (!invoice) {
        throw new Error('Invoice not found');
      }

      if (invoice.status === 'PAID') {
        throw new Error('Invoice already paid');
      }

      // Create or get Stripe customer
      let customerId = invoice.contractor.stripeCustomerId;
      if (!customerId) {
        customerId = await this.createCustomer(
          invoice.contractorId,
          invoice.contractor.email,
          invoice.contractor.name
        );
      }

      // Calculate amount in cents
      const amountInCents = Math.round(invoice.totalAmount * 100);

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'aud',
        customer: customerId,
        metadata: {
          invoiceId: invoice.id,
          contractorId: invoice.contractorId,
        },
        description: `Invoice ${invoice.invoiceNumber} - ${invoice.description}`,
      });

      // Update invoice with payment intent ID
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: { stripePaymentIntentId: paymentIntent.id },
      });

      return {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret!,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  /**
   * Confirm payment and update invoice
   */
  static async confirmPayment(paymentIntentId: string): Promise<void> {
    try {
      // Get payment intent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment not successful');
      }

      // Get invoice
      const invoice = await prisma.invoice.findFirst({
        where: { stripePaymentIntentId: paymentIntentId },
      });

      if (!invoice) {
        throw new Error('Invoice not found');
      }

      // Update invoice status
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          status: 'PAID',
          paidDate: new Date(),
        },
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: invoice.totalAmount,
          paymentMethod: 'STRIPE',
          stripePaymentIntentId: paymentIntentId,
          paymentDate: new Date(),
        },
      });
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new Error('Failed to confirm payment');
    }
  }

  /**
   * Process refund
   */
  static async processRefund(
    paymentIntentId: string,
    amount?: number
  ): Promise<void> {
    try {
      const refundParams: Stripe.RefundCreateParams = {
        payment_intent: paymentIntentId,
      };

      if (amount) {
        refundParams.amount = Math.round(amount * 100); // Convert to cents
      }

      const refund = await stripe.refunds.create(refundParams);

      // Update payment record
      const payment = await prisma.payment.findFirst({
        where: { stripePaymentIntentId: paymentIntentId },
      });

      if (payment) {
        // Create refund record or update payment
        await prisma.invoice.update({
          where: { id: payment.invoiceId },
          data: {
            status: 'REFUNDED',
          },
        });
      }
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }

  /**
   * Get subscription status
   */
  static async getSubscriptionStatus(
    subscriptionId: string
  ): Promise<Stripe.Subscription> {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Error getting subscription status:', error);
      throw new Error('Failed to get subscription status');
    }
  }

  /**
   * Get customer portal URL
   */
  static async createCustomerPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<string> {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      return session.url;
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      throw new Error('Failed to create customer portal session');
    }
  }
}
