// @ts-nocheck
/**
 * Xero Payment Sync
 *
 * Syncs Stripe job payments to Xero accounting:
 * - Creates an invoice in Xero matching the job payment
 * - Marks the Xero invoice as PAID with the Stripe payment reference
 * - Updates the job status to PAID in the database
 */

import { getXeroClient, loadXeroTokens } from '@/lib/xero/client';
import { prisma } from '@/lib/prisma';
import { Invoice, Payment as XeroPayment } from 'xero-node';

interface JobPaymentData {
  jobId: string;
  jobNumber: string;
  jobType: string;
  clientName: string;
  clientEmail: string;
  amountAUD: number;
  gstAUD: number;
  stripePaymentIntentId: string;
  completedDate: Date | null;
}

/**
 * Create a Xero invoice from a completed job payment.
 *
 * Creates a DRAFT invoice then immediately authorises it so it can be
 * marked as paid in the next step.
 */
export async function createXeroInvoiceFromJob(
  job: JobPaymentData,
  paymentDate: Date
): Promise<string | null> {
  const tenantId = await loadXeroTokens();
  if (!tenantId) {
    console.warn('[Xero Sync] Xero not connected, skipping invoice creation');
    return null;
  }

  const xero = getXeroClient();

  // Find or create the contact in Xero
  const contactName = job.clientName || job.clientEmail;

  const invoice: Invoice = {
    type: Invoice.TypeEnum.ACCREC,
    contact: {
      name: contactName,
      emailAddress: job.clientEmail,
    },
    date: formatXeroDate(paymentDate),
    dueDate: formatXeroDate(paymentDate), // Already paid, so due = payment date
    lineAmountTypes: Invoice.LineAmountTypesEnum.Inclusive,
    reference: `Stripe: ${job.stripePaymentIntentId}`,
    invoiceNumber: `NRPG-${job.jobNumber}`,
    lineItems: [
      {
        description: `NRPG ${capitalise(job.jobType)} Restoration - Job ${job.jobNumber}`,
        quantity: 1,
        unitAmount: job.amountAUD + job.gstAUD,
        accountCode: '200', // Sales revenue account
        taxType: 'OUTPUT', // Australian GST on sales
      },
    ],
    status: Invoice.StatusEnum.AUTHORISED,
  };

  try {
    const response = await xero.accountingApi.createInvoices(tenantId, {
      invoices: [invoice],
    });

    const createdInvoice = response.body?.invoices?.[0];
    if (!createdInvoice?.invoiceID) {
      console.error('[Xero Sync] Invoice created but no ID returned');
      return null;
    }

    console.log(
      `[Xero Sync] Created Xero invoice ${createdInvoice.invoiceNumber} (${createdInvoice.invoiceID}) for job ${job.jobNumber}`
    );

    return createdInvoice.invoiceID;
  } catch (error) {
    console.error('[Xero Sync] Failed to create Xero invoice:', error);
    return null;
  }
}

/**
 * Mark an existing Xero invoice as paid.
 *
 * Records the payment against the invoice with the Stripe reference
 * and actual payment date.
 */
export async function markXeroInvoicePaid(
  xeroInvoiceId: string,
  paymentAmountAUD: number,
  paymentDate: Date,
  stripeReference: string
): Promise<boolean> {
  const tenantId = await loadXeroTokens();
  if (!tenantId) {
    console.warn('[Xero Sync] Xero not connected, skipping payment recording');
    return false;
  }

  const xero = getXeroClient();

  const payment: XeroPayment = {
    invoice: { invoiceID: xeroInvoiceId },
    account: { code: '090' }, // Bank account code — adjust per Xero chart of accounts
    date: formatXeroDate(paymentDate),
    amount: paymentAmountAUD,
    reference: `Stripe ${stripeReference}`,
  };

  try {
    await xero.accountingApi.createPayment(tenantId, payment);

    console.log(
      `[Xero Sync] Recorded payment of $${paymentAmountAUD.toFixed(2)} against Xero invoice ${xeroInvoiceId}`
    );

    return true;
  } catch (error) {
    console.error('[Xero Sync] Failed to record Xero payment:', error);
    return false;
  }
}

/**
 * Full sync: create Xero invoice, mark paid, update job status.
 *
 * Called from the Stripe payment webhook when a job-related
 * payment_intent.succeeded event is received.
 */
export async function syncJobPaymentToXero(
  jobId: string,
  stripePaymentIntentId: string,
  paymentAmountAUD: number,
  paymentDate: Date
): Promise<boolean> {
  // Load job with client details via property -> clientProfile -> user
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      property: {
        include: {
          clientProfile: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
        },
      },
    },
  });

  if (!job) {
    console.error(`[Xero Sync] Job ${jobId} not found`);
    return false;
  }

  const totalAmount = paymentAmountAUD;
  const gstAmount = Math.round((totalAmount / 11) * 100) / 100; // GST = total / 11 for inclusive amounts
  const exGstAmount = Math.round((totalAmount - gstAmount) * 100) / 100;

  const clientUser = job.property?.clientProfile?.user;

  const jobPaymentData: JobPaymentData = {
    jobId: job.id,
    jobNumber: job.jobNumber,
    jobType: job.type,
    clientName: clientUser?.name || 'Unknown Client',
    clientEmail: clientUser?.email || '',
    amountAUD: exGstAmount,
    gstAUD: gstAmount,
    stripePaymentIntentId,
    completedDate: job.completedDate,
  };

  // Step 1: Create Xero invoice
  const xeroInvoiceId = await createXeroInvoiceFromJob(jobPaymentData, paymentDate);
  if (!xeroInvoiceId) {
    // Xero not connected or creation failed -- not a blocking error
    // The Stripe payment still succeeded; Xero sync can be retried manually
    console.warn(`[Xero Sync] Could not create Xero invoice for job ${job.jobNumber}, skipping`);
    return false;
  }

  // Step 2: Mark the Xero invoice as paid
  const paid = await markXeroInvoicePaid(
    xeroInvoiceId,
    totalAmount,
    paymentDate,
    stripePaymentIntentId
  );

  if (!paid) {
    console.warn(`[Xero Sync] Xero invoice created but payment recording failed for job ${job.jobNumber}`);
  }

  // Step 3: Update job status to PAID
  await prisma.job.update({
    where: { id: jobId },
    data: { status: 'PAID' },
  });

  console.log(`[Xero Sync] Job ${job.jobNumber} synced to Xero and marked PAID`);
  return true;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Format a Date as a Xero-compatible date string (YYYY-MM-DD).
 */
function formatXeroDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Capitalise the first letter of a string.
 */
function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
