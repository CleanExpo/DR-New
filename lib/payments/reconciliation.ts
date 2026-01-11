/**
 * Payment Reconciliation System
 *
 * Verifies that database Payment records match Stripe API records
 * Identifies discrepancies and generates reconciliation reports
 */

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    })
  : null;

export interface ReconciliationIssue {
  type: 'MISSING_IN_STRIPE' | 'MISSING_IN_DB' | 'AMOUNT_MISMATCH' | 'STATUS_MISMATCH';
  paymentId?: string;
  stripeId?: string;
  dbAmount?: number;
  stripeAmount?: number;
  dbStatus?: string;
  stripeStatus?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
}

export interface ReconciliationReport {
  generatedAt: Date;
  period: {
    startDate: Date;
    endDate: Date;
  };
  statistics: {
    totalPaymentsInDB: number;
    totalPaymentsInStripe: number;
    totalAmountInDB: number;
    totalAmountInStripe: number;
    matchingPayments: number;
    discrepancies: number;
  };
  issues: ReconciliationIssue[];
  summary: {
    reconciliationRate: number; // 0-100%
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  };
}

/**
 * Reconcile payments between database and Stripe
 */
export async function reconcilePayments(
  startDate: Date,
  endDate: Date
): Promise<ReconciliationReport> {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const issues: ReconciliationIssue[] = [];
  let matchingPayments = 0;

  // Get all payments from database in date range
  const dbPayments = await prisma.payment.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      amountAUD: true,
      gstAUD: true,
      status: true,
      stripePaymentIntentId: true,
      createdAt: true,
    },
  });

  // Get all payment intents from Stripe
  const stripePayments: Stripe.PaymentIntent[] = [];
  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const result = await stripe.paymentIntents.list({
      limit: 100,
      starting_after: startingAfter,
      created: {
        gte: Math.floor(startDate.getTime() / 1000),
        lte: Math.floor(endDate.getTime() / 1000),
      },
    });

    stripePayments.push(...result.data);
    hasMore = result.has_more;
    if (result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
  }

  // Check each database payment against Stripe
  for (const dbPayment of dbPayments) {
    if (!dbPayment.stripePaymentIntentId) {
      // Database payment has no Stripe ID - potential issue
      if (dbPayment.status !== 'PENDING') {
        issues.push({
          type: 'MISSING_IN_STRIPE',
          paymentId: dbPayment.id,
          dbAmount: parseFloat(
            (
              parseFloat(dbPayment.amountAUD.toString()) +
              parseFloat(dbPayment.gstAUD.toString())
            ).toString()
          ),
          dbStatus: dbPayment.status,
          severity: 'MEDIUM',
          description: `Database payment ${dbPayment.id} has no Stripe ID`,
        });
      }
      continue;
    }

    // Find matching Stripe payment
    const stripePayment = stripePayments.find(
      (sp) => sp.id === dbPayment.stripePaymentIntentId
    );

    if (!stripePayment) {
      issues.push({
        type: 'MISSING_IN_STRIPE',
        paymentId: dbPayment.id,
        stripeId: dbPayment.stripePaymentIntentId,
        dbAmount: parseFloat(
          (
            parseFloat(dbPayment.amountAUD.toString()) +
            parseFloat(dbPayment.gstAUD.toString())
          ).toString()
        ),
        dbStatus: dbPayment.status,
        severity: 'HIGH',
        description: `Stripe payment ${dbPayment.stripePaymentIntentId} not found`,
      });
      continue;
    }

    // Verify amounts match
    const dbTotal = parseFloat(
      (
        parseFloat(dbPayment.amountAUD.toString()) +
        parseFloat(dbPayment.gstAUD.toString())
      ).toString()
    );
    const stripeAmount = stripePayment.amount / 100; // Convert cents to AUD

    if (Math.abs(dbTotal - stripeAmount) > 0.01) {
      // Allow 1 cent difference for rounding
      issues.push({
        type: 'AMOUNT_MISMATCH',
        paymentId: dbPayment.id,
        stripeId: stripePayment.id,
        dbAmount: dbTotal,
        stripeAmount,
        severity: 'MEDIUM',
        description: `Amount mismatch: DB ${dbTotal} vs Stripe ${stripeAmount}`,
      });
    }

    // Verify status matches
    const dbStatusMap: Record<string, string> = {
      PENDING: 'processing',
      PROCESSING: 'processing',
      COMPLETED: 'succeeded',
      FAILED: 'failed',
      REFUNDED: 'requires_action',
    };

    const expectedStripeStatus = dbStatusMap[dbPayment.status];
    if (
      expectedStripeStatus &&
      stripePayment.status !== expectedStripeStatus
    ) {
      issues.push({
        type: 'STATUS_MISMATCH',
        paymentId: dbPayment.id,
        stripeId: stripePayment.id,
        dbStatus: dbPayment.status,
        stripeStatus: stripePayment.status,
        severity: 'LOW',
        description: `Status mismatch: DB ${dbPayment.status} vs Stripe ${stripePayment.status}`,
      });
    }

    // This payment matches
    matchingPayments++;
  }

  // Check for payments in Stripe but not in database
  for (const stripePayment of stripePayments) {
    const dbPayment = dbPayments.find(
      (p) => p.stripePaymentIntentId === stripePayment.id
    );

    if (!dbPayment) {
      const stripeAmount = stripePayment.amount / 100;
      issues.push({
        type: 'MISSING_IN_DB',
        stripeId: stripePayment.id,
        stripeAmount,
        stripeStatus: stripePayment.status,
        severity: 'HIGH',
        description: `Stripe payment ${stripePayment.id} not found in database`,
      });
    }
  }

  // Calculate statistics
  const totalAmountInDB = dbPayments.reduce(
    (sum, p) =>
      sum +
      parseFloat(p.amountAUD.toString()) +
      parseFloat(p.gstAUD.toString()),
    0
  );

  const totalAmountInStripe = stripePayments.reduce(
    (sum, p) => sum + p.amount / 100,
    0
  );

  const reconciliationRate =
    dbPayments.length > 0
      ? (matchingPayments / dbPayments.length) * 100
      : 100;

  const status =
    issues.filter((i) => i.severity === 'HIGH').length > 0
      ? 'CRITICAL'
      : issues.filter((i) => i.severity === 'MEDIUM').length > 0
      ? 'WARNING'
      : 'HEALTHY';

  console.log('=== RECONCILIATION REPORT GENERATED ===');
  console.log('Period:', startDate, 'to', endDate);
  console.log('DB Payments:', dbPayments.length);
  console.log('Stripe Payments:', stripePayments.length);
  console.log('Matching:', matchingPayments);
  console.log('Issues:', issues.length);
  console.log('Status:', status);

  return {
    generatedAt: new Date(),
    period: {
      startDate,
      endDate,
    },
    statistics: {
      totalPaymentsInDB: dbPayments.length,
      totalPaymentsInStripe: stripePayments.length,
      totalAmountInDB,
      totalAmountInStripe,
      matchingPayments,
      discrepancies: issues.length,
    },
    issues,
    summary: {
      reconciliationRate,
      status,
    },
  };
}

/**
 * Get latest reconciliation report
 */
export async function getLatestReconciliationReport() {
  // Generate report for last 30 days
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

  return reconcilePayments(startDate, endDate);
}

/**
 * Get reconciliation issues needing attention
 */
export async function getReconciliationIssues(severity?: 'LOW' | 'MEDIUM' | 'HIGH') {
  const report = await getLatestReconciliationReport();

  let filtered = report.issues;
  if (severity) {
    filtered = filtered.filter((i) => i.severity === severity);
  }

  return {
    issues: filtered,
    totalIssues: report.issues.length,
    reconciliationRate: report.summary.reconciliationRate,
    status: report.summary.status,
  };
}
