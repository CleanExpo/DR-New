/**
 * Subscription Management Service
 * Handles contractor subscription lifecycle, billing, and tier management
 *
 * @module SubscriptionService
 * @version 1.0.0
 */

import { PrismaClient, ContractorSubscription, Contractor } from '@prisma/client';
import { addMonths, addDays, isAfter, isBefore, differenceInDays } from 'date-fns';
import Stripe from 'stripe';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Stripe (placeholder for future integration)
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
  : null;

/**
 * Subscription Tier Definitions
 */
export enum SubscriptionTier {
  RADIUS_25KM = 'TIER_25KM',
  RADIUS_50KM = 'TIER_50KM',
  RADIUS_100KM = 'TIER_100KM',
  RURAL = 'RURAL'
}

/**
 * Subscription Status
 */
export enum SubscriptionStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PAST_DUE = 'PAST_DUE'
}

/**
 * Billing Frequency
 */
export enum BillingFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL'
}

/**
 * Tier Pricing Configuration
 */
export const TIER_PRICING: Record<SubscriptionTier, number> = {
  [SubscriptionTier.RADIUS_25KM]: 99,
  [SubscriptionTier.RADIUS_50KM]: 199,
  [SubscriptionTier.RADIUS_100KM]: 349,
  [SubscriptionTier.RURAL]: 499
};

/**
 * Tier Coverage Radius (in kilometers)
 */
export const TIER_RADIUS: Record<SubscriptionTier, number> = {
  [SubscriptionTier.RADIUS_25KM]: 25,
  [SubscriptionTier.RADIUS_50KM]: 50,
  [SubscriptionTier.RADIUS_100KM]: 100,
  [SubscriptionTier.RURAL]: 200 // Rural covers wider area
};

/**
 * Billing Frequency Multipliers
 */
const BILLING_MULTIPLIERS = {
  [BillingFrequency.MONTHLY]: 1,
  [BillingFrequency.QUARTERLY]: 3,
  [BillingFrequency.ANNUAL]: 12
};

/**
 * Billing Frequency Discounts
 */
const BILLING_DISCOUNTS = {
  [BillingFrequency.MONTHLY]: 0,
  [BillingFrequency.QUARTERLY]: 0.05, // 5% discount
  [BillingFrequency.ANNUAL]: 0.10 // 10% discount
};

/**
 * Subscription creation input
 */
export interface CreateSubscriptionInput {
  contractorId: string;
  tier: SubscriptionTier;
  baseLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  billingFrequency?: BillingFrequency;
  paymentMethodId?: string;
  startDate?: Date;
  additionalTerritories?: string[];
}

/**
 * Subscription update input
 */
export interface UpdateSubscriptionInput {
  tier?: SubscriptionTier;
  baseLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  billingFrequency?: BillingFrequency;
  paymentMethodId?: string;
  additionalTerritories?: string[];
  status?: SubscriptionStatus;
}

/**
 * Billing calculation result
 */
export interface BillingCalculation {
  baseAmount: number;
  discount: number;
  discountAmount: number;
  subtotal: number;
  gst: number;
  total: number;
  nextBillingDate: Date;
  billingPeriod: {
    start: Date;
    end: Date;
  };
}

/**
 * Subscription Service Class
 * Manages all subscription-related operations
 */
export class SubscriptionService {
  private prisma: PrismaClient;
  private stripe: Stripe | null;

  constructor() {
    this.prisma = prisma;
    this.stripe = stripe;
  }

  /**
   * Create a new subscription for a contractor
   */
  async createSubscription(input: CreateSubscriptionInput): Promise<ContractorSubscription> {
    const {
      contractorId,
      tier,
      baseLocation,
      billingFrequency = BillingFrequency.MONTHLY,
      paymentMethodId,
      startDate = new Date(),
      additionalTerritories = []
    } = input;

    // Validate contractor exists and is approved
    const contractor = await this.prisma.contractor.findUnique({
      where: { id: contractorId }
    });

    if (!contractor) {
      throw new Error('Contractor not found');
    }

    if (contractor.status !== 'APPROVED') {
      throw new Error('Contractor must be approved before creating a subscription');
    }

    // Check for existing active subscription
    const existingSubscription = await this.prisma.contractorSubscription.findFirst({
      where: {
        contractorId,
        status: {
          in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING]
        }
      }
    });

    if (existingSubscription) {
      throw new Error('Contractor already has an active or pending subscription');
    }

    // Calculate subscription amount
    const amount = this.calculateSubscriptionAmount(tier, billingFrequency);
    const nextBillingDate = this.calculateNextBillingDate(startDate, billingFrequency);

    // Create subscription record
    const subscription = await this.prisma.contractorSubscription.create({
      data: {
        contractorId,
        tier,
        status: SubscriptionStatus.PENDING,
        baseRadius: TIER_RADIUS[tier],
        billingFrequency,
        amount,
        nextBillingDate,
        startDate,
        additionalTerritories: additionalTerritories.length > 0
          ? JSON.stringify(additionalTerritories)
          : null,
        paymentMethod: paymentMethodId ? 'CREDIT_CARD' : null,
        paymentDetails: paymentMethodId
          ? JSON.stringify({ paymentMethodId })
          : null,
        bondAmount: 5000, // Default performance bond
        bondStatus: 'PENDING'
      }
    });

    // If Stripe is configured, create subscription in Stripe
    if (this.stripe && paymentMethodId) {
      await this.createStripeSubscription(subscription, contractor, paymentMethodId);
    }

    // Create audit log
    await this.createAuditLog(contractorId, 'SUBSCRIPTION_CREATED', {
      subscriptionId: subscription.id,
      tier,
      amount,
      billingFrequency
    });

    return subscription;
  }

  /**
   * Update an existing subscription
   */
  async updateSubscription(
    subscriptionId: string,
    input: UpdateSubscriptionInput
  ): Promise<ContractorSubscription> {
    const subscription = await this.prisma.contractorSubscription.findUnique({
      where: { id: subscriptionId }
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const updateData: any = {};

    // Update tier and recalculate amount if changed
    if (input.tier && input.tier !== subscription.tier) {
      updateData.tier = input.tier;
      updateData.baseRadius = TIER_RADIUS[input.tier];
      updateData.amount = this.calculateSubscriptionAmount(
        input.tier,
        (input.billingFrequency || subscription.billingFrequency) as BillingFrequency
      );
    }

    // Update billing frequency and recalculate amount if changed
    if (input.billingFrequency && input.billingFrequency !== subscription.billingFrequency) {
      updateData.billingFrequency = input.billingFrequency;
      updateData.amount = this.calculateSubscriptionAmount(
        (input.tier || subscription.tier) as SubscriptionTier,
        input.billingFrequency
      );
      updateData.nextBillingDate = this.calculateNextBillingDate(
        new Date(),
        input.billingFrequency
      );
    }

    // Update additional territories
    if (input.additionalTerritories !== undefined) {
      updateData.additionalTerritories = input.additionalTerritories.length > 0
        ? JSON.stringify(input.additionalTerritories)
        : null;
    }

    // Update payment method
    if (input.paymentMethodId) {
      updateData.paymentMethod = 'CREDIT_CARD';
      updateData.paymentDetails = JSON.stringify({ paymentMethodId: input.paymentMethodId });
    }

    // Update status
    if (input.status) {
      updateData.status = input.status;
    }

    // Perform the update
    const updatedSubscription = await this.prisma.contractorSubscription.update({
      where: { id: subscriptionId },
      data: updateData
    });

    // Create audit log
    await this.createAuditLog(subscription.contractorId, 'SUBSCRIPTION_UPDATED', {
      subscriptionId,
      changes: updateData
    });

    return updatedSubscription;
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(
    subscriptionId: string,
    reason?: string
  ): Promise<ContractorSubscription> {
    const subscription = await this.prisma.contractorSubscription.findUnique({
      where: { id: subscriptionId }
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    if (subscription.status === SubscriptionStatus.CANCELLED) {
      throw new Error('Subscription is already cancelled');
    }

    // Cancel in Stripe if configured
    if (this.stripe && subscription.paymentDetails) {
      await this.cancelStripeSubscription(subscription);
    }

    // Update subscription status
    const cancelledSubscription = await this.prisma.contractorSubscription.update({
      where: { id: subscriptionId },
      data: {
        status: SubscriptionStatus.CANCELLED,
        cancelledAt: new Date(),
        endDate: new Date()
      }
    });

    // Create audit log
    await this.createAuditLog(subscription.contractorId, 'SUBSCRIPTION_CANCELLED', {
      subscriptionId,
      reason,
      previousStatus: subscription.status
    });

    // Send cancellation notification
    await this.sendCancellationNotification(subscription.contractorId, reason);

    return cancelledSubscription;
  }

  /**
   * Process monthly billing for a subscription
   */
  async processMonthlyBilling(subscriptionId: string): Promise<BillingCalculation> {
    const subscription = await this.prisma.contractorSubscription.findUnique({
      where: { id: subscriptionId },
      include: {
        contractor: true
      }
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new Error('Subscription is not active');
    }

    // Check if billing is due
    const today = new Date();
    if (subscription.nextBillingDate && isAfter(subscription.nextBillingDate, today)) {
      throw new Error('Billing is not due yet');
    }

    // Calculate billing details
    const billing = this.calculateBilling(subscription);

    // Create payment record
    const payment = await this.prisma.contractorPayment.create({
      data: {
        subscriptionId,
        amount: billing.total,
        type: 'SUBSCRIPTION',
        status: 'PENDING',
        paymentMethod: subscription.paymentMethod || 'DIRECT_DEBIT',
        dueDate: billing.nextBillingDate
      }
    });

    // Process payment through Stripe if configured
    if (this.stripe && subscription.paymentDetails) {
      await this.processStripePayment(subscription, payment.id, billing.total);
    }

    // Update subscription next billing date
    await this.prisma.contractorSubscription.update({
      where: { id: subscriptionId },
      data: {
        nextBillingDate: billing.nextBillingDate
      }
    });

    // Create invoice
    await this.createInvoice(subscription, billing);

    // Create audit log
    await this.createAuditLog(subscription.contractorId, 'BILLING_PROCESSED', {
      subscriptionId,
      paymentId: payment.id,
      amount: billing.total,
      nextBillingDate: billing.nextBillingDate
    });

    return billing;
  }

  /**
   * Get active subscriptions for a contractor
   */
  async getActiveSubscriptions(contractorId: string): Promise<ContractorSubscription[]> {
    return await this.prisma.contractorSubscription.findMany({
      where: {
        contractorId,
        status: {
          in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING]
        }
      },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });
  }

  /**
   * Check if a contractor has an active subscription
   */
  async checkSubscriptionStatus(contractorId: string): Promise<{
    hasActiveSubscription: boolean;
    subscription: ContractorSubscription | null;
    daysUntilExpiry: number | null;
    isExpiringSoon: boolean;
  }> {
    const subscription = await this.prisma.contractorSubscription.findFirst({
      where: {
        contractorId,
        status: SubscriptionStatus.ACTIVE
      }
    });

    if (!subscription) {
      return {
        hasActiveSubscription: false,
        subscription: null,
        daysUntilExpiry: null,
        isExpiringSoon: false
      };
    }

    const today = new Date();
    const daysUntilExpiry = subscription.endDate
      ? differenceInDays(subscription.endDate, today)
      : null;

    return {
      hasActiveSubscription: true,
      subscription,
      daysUntilExpiry,
      isExpiringSoon: daysUntilExpiry !== null && daysUntilExpiry <= 7
    };
  }

  /**
   * Calculate monthly subscription fee based on tier and billing frequency
   */
  calculateMonthlyFee(tier: SubscriptionTier): number {
    return TIER_PRICING[tier];
  }

  /**
   * Calculate subscription amount with discounts
   */
  private calculateSubscriptionAmount(
    tier: SubscriptionTier,
    billingFrequency: BillingFrequency
  ): number {
    const baseMonthlyAmount = TIER_PRICING[tier];
    const multiplier = BILLING_MULTIPLIERS[billingFrequency];
    const discount = BILLING_DISCOUNTS[billingFrequency];

    const subtotal = baseMonthlyAmount * multiplier;
    const discountAmount = subtotal * discount;

    return subtotal - discountAmount;
  }

  /**
   * Calculate next billing date based on frequency
   */
  private calculateNextBillingDate(
    startDate: Date,
    billingFrequency: BillingFrequency
  ): Date {
    switch (billingFrequency) {
      case BillingFrequency.MONTHLY:
        return addMonths(startDate, 1);
      case BillingFrequency.QUARTERLY:
        return addMonths(startDate, 3);
      case BillingFrequency.ANNUAL:
        return addMonths(startDate, 12);
      default:
        return addMonths(startDate, 1);
    }
  }

  /**
   * Calculate billing details including GST
   */
  private calculateBilling(subscription: ContractorSubscription): BillingCalculation {
    const tier = subscription.tier as SubscriptionTier;
    const frequency = subscription.billingFrequency as BillingFrequency;

    const baseAmount = TIER_PRICING[tier] * BILLING_MULTIPLIERS[frequency];
    const discountRate = BILLING_DISCOUNTS[frequency];
    const discountAmount = baseAmount * discountRate;
    const subtotal = baseAmount - discountAmount;
    const gst = subtotal * 0.1; // 10% GST in Australia
    const total = subtotal + gst;

    const startDate = subscription.nextBillingDate || new Date();
    const endDate = this.calculateNextBillingDate(startDate, frequency);

    return {
      baseAmount,
      discount: discountRate * 100,
      discountAmount,
      subtotal,
      gst,
      total,
      nextBillingDate: endDate,
      billingPeriod: {
        start: startDate,
        end: endDate
      }
    };
  }

  /**
   * Create Stripe subscription (placeholder for future implementation)
   */
  private async createStripeSubscription(
    subscription: ContractorSubscription,
    contractor: Contractor,
    paymentMethodId: string
  ): Promise<void> {
    if (!this.stripe) return;

    try {
      // TODO: Implement Stripe subscription creation
      console.log('Stripe subscription creation placeholder', {
        subscriptionId: subscription.id,
        contractorId: contractor.id,
        paymentMethodId
      });
    } catch (error) {
      console.error('Failed to create Stripe subscription:', error);
      throw new Error('Failed to process payment setup');
    }
  }

  /**
   * Cancel Stripe subscription (placeholder for future implementation)
   */
  private async cancelStripeSubscription(subscription: ContractorSubscription): Promise<void> {
    if (!this.stripe) return;

    try {
      // TODO: Implement Stripe subscription cancellation
      console.log('Stripe subscription cancellation placeholder', {
        subscriptionId: subscription.id
      });
    } catch (error) {
      console.error('Failed to cancel Stripe subscription:', error);
    }
  }

  /**
   * Process Stripe payment (placeholder for future implementation)
   */
  private async processStripePayment(
    subscription: ContractorSubscription,
    paymentId: string,
    amount: number
  ): Promise<void> {
    if (!this.stripe) return;

    try {
      // TODO: Implement Stripe payment processing
      console.log('Stripe payment processing placeholder', {
        subscriptionId: subscription.id,
        paymentId,
        amount
      });

      // Update payment status to completed (mock)
      await this.prisma.contractorPayment.update({
        where: { id: paymentId },
        data: {
          status: 'COMPLETED',
          paidAt: new Date(),
          transactionId: `stripe_${Date.now()}`
        }
      });
    } catch (error) {
      console.error('Failed to process Stripe payment:', error);
      throw new Error('Payment processing failed');
    }
  }

  /**
   * Create invoice for billing
   */
  private async createInvoice(
    subscription: ContractorSubscription,
    billing: BillingCalculation
  ): Promise<void> {
    const invoiceNumber = `INV-${Date.now()}`;

    await this.prisma.contractorInvoice.create({
      data: {
        subscriptionId: subscription.id,
        invoiceNumber,
        amount: billing.subtotal,
        gst: billing.gst,
        total: billing.total,
        status: 'ISSUED',
        issueDate: new Date(),
        dueDate: addDays(new Date(), 7),
        items: JSON.stringify([
          {
            description: `${subscription.tier} Subscription (${subscription.billingFrequency})`,
            quantity: 1,
            unitPrice: billing.baseAmount,
            discount: billing.discountAmount,
            subtotal: billing.subtotal,
            gst: billing.gst,
            total: billing.total
          }
        ])
      }
    });
  }

  /**
   * Create audit log entry
   */
  private async createAuditLog(
    contractorId: string,
    action: string,
    details: any
  ): Promise<void> {
    await this.prisma.contractorAuditLog.create({
      data: {
        contractorId,
        action,
        category: 'SUBSCRIPTION',
        details: JSON.stringify(details),
        performedBy: contractorId,
        performedByType: 'SYSTEM'
      }
    });
  }

  /**
   * Send cancellation notification
   */
  private async sendCancellationNotification(
    contractorId: string,
    reason?: string
  ): Promise<void> {
    await this.prisma.contractorNotification.create({
      data: {
        contractorId,
        type: 'SUBSCRIPTION',
        priority: 'HIGH',
        subject: 'Subscription Cancelled',
        message: reason
          ? `Your subscription has been cancelled. Reason: ${reason}`
          : 'Your subscription has been cancelled.',
        actionRequired: false
      }
    });
  }

  /**
   * Get subscription by ID
   */
  async getSubscription(subscriptionId: string): Promise<ContractorSubscription | null> {
    return await this.prisma.contractorSubscription.findUnique({
      where: { id: subscriptionId },
      include: {
        contractor: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });
  }

  /**
   * Renew a subscription manually
   */
  async renewSubscription(subscriptionId: string): Promise<ContractorSubscription> {
    const subscription = await this.prisma.contractorSubscription.findUnique({
      where: { id: subscriptionId }
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    if (subscription.status === SubscriptionStatus.ACTIVE) {
      throw new Error('Subscription is already active');
    }

    const newEndDate = this.calculateNextBillingDate(
      new Date(),
      subscription.billingFrequency as BillingFrequency
    );

    const renewedSubscription = await this.prisma.contractorSubscription.update({
      where: { id: subscriptionId },
      data: {
        status: SubscriptionStatus.ACTIVE,
        startDate: new Date(),
        endDate: newEndDate,
        nextBillingDate: newEndDate
      }
    });

    // Process billing for renewal
    await this.processMonthlyBilling(subscriptionId);

    // Create audit log
    await this.createAuditLog(subscription.contractorId, 'SUBSCRIPTION_RENEWED', {
      subscriptionId,
      newEndDate
    });

    return renewedSubscription;
  }

  /**
   * List all subscriptions with filters
   */
  async listSubscriptions(filters?: {
    status?: SubscriptionStatus;
    tier?: SubscriptionTier;
    contractorId?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    subscriptions: ContractorSubscription[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.tier) {
      where.tier = filters.tier;
    }

    if (filters?.contractorId) {
      where.contractorId = filters.contractorId;
    }

    const [subscriptions, total] = await Promise.all([
      this.prisma.contractorSubscription.findMany({
        where,
        skip,
        take: limit,
        include: {
          contractor: {
            include: {
              companyProfile: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.contractorSubscription.count({ where })
    ]);

    return {
      subscriptions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Check for expiring subscriptions and send notifications
   */
  async checkExpiringSubscriptions(): Promise<void> {
    const sevenDaysFromNow = addDays(new Date(), 7);

    const expiringSubscriptions = await this.prisma.contractorSubscription.findMany({
      where: {
        status: SubscriptionStatus.ACTIVE,
        endDate: {
          lte: sevenDaysFromNow,
          gte: new Date()
        }
      }
    });

    for (const subscription of expiringSubscriptions) {
      await this.prisma.contractorNotification.create({
        data: {
          contractorId: subscription.contractorId,
          type: 'SUBSCRIPTION',
          priority: 'HIGH',
          subject: 'Subscription Expiring Soon',
          message: `Your subscription will expire on ${subscription.endDate?.toLocaleDateString()}. Please renew to continue accessing services.`,
          actionRequired: true,
          actionUrl: '/dashboard/subscription/renew',
          actionDeadline: subscription.endDate || undefined
        }
      });
    }
  }

  /**
   * Process overdue payments
   */
  async processOverduePayments(): Promise<void> {
    const overduePayments = await this.prisma.contractorPayment.findMany({
      where: {
        status: 'PENDING',
        dueDate: {
          lt: new Date()
        }
      },
      include: {
        subscription: true
      }
    });

    for (const payment of overduePayments) {
      // Suspend subscription if payment is overdue by more than 7 days
      const daysOverdue = differenceInDays(new Date(), payment.dueDate);

      if (daysOverdue > 7 && payment.subscription.status === SubscriptionStatus.ACTIVE) {
        await this.prisma.contractorSubscription.update({
          where: { id: payment.subscriptionId },
          data: { status: SubscriptionStatus.SUSPENDED }
        });

        await this.prisma.contractorNotification.create({
          data: {
            contractorId: payment.subscription.contractorId,
            type: 'PAYMENT',
            priority: 'URGENT',
            subject: 'Subscription Suspended - Payment Overdue',
            message: `Your subscription has been suspended due to overdue payment. Amount due: $${payment.amount}`,
            actionRequired: true,
            actionUrl: '/dashboard/billing/pay'
          }
        });
      }
    }
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();

// Export default
export default SubscriptionService;