/**
 * Job Notification Service (DR-164)
 *
 * Sends email and SMS notifications on job status changes.
 * Uses existing Resend email service. SMS via Twilio if configured, otherwise logs to console.
 * All notifications are logged to the NotificationLog table.
 */

import { sendEmail } from '@/lib/email/resend';
import { basePrisma } from '@/lib/prisma';
import {
  getJobCreatedTemplate,
  getContractorAssignedTemplate,
  getWorkStartedJobTemplate,
  getJobCompletedTemplate,
  getInvoiceGeneratedTemplate,
  getContractorAssignedSmsText,
} from './templates/job-emails';

const JOB_TYPE_LABELS: Record<string, string> = {
  water: 'Water Damage',
  fire: 'Fire Damage',
  mould: 'Mould Remediation',
  storm: 'Storm Damage',
  asbestos: 'Asbestos Removal',
};

// ============================================================================
// SMS Service (Twilio stub)
// ============================================================================

async function sendSMS(to: string, message: string): Promise<{ success: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.log(`[SMS Stub] To: ${to} | Message: ${message}`);
    return { success: true, error: 'SMS service not configured — logged to console' };
  }

  try {
    // Dynamic import to avoid errors when twilio is not installed
    const twilio = await import('twilio');
    const client = twilio.default(accountSid, authToken);
    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to,
    });
    console.log(`[SMS] Sent to ${to}: SID ${result.sid}`);
    return { success: true };
  } catch (error) {
    console.error('[SMS] Failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SMS send failed',
    };
  }
}

// ============================================================================
// Notification Logger
// ============================================================================

async function logNotification(data: {
  type: 'email' | 'sms';
  channel: string;
  recipientId?: string;
  recipient: string;
  jobId?: string;
  jobNumber?: string;
  subject?: string;
  status: 'sent' | 'failed';
  errorMessage?: string;
}) {
  try {
    await basePrisma.notificationLog.create({ data });
  } catch (error) {
    console.error('[NotificationLog] Failed to log:', error);
  }
}

// ============================================================================
// Job Created — email to property owner
// ============================================================================

export async function notifyJobCreated(job: {
  id: string;
  jobNumber: string;
  type: string;
  clientId?: string | null;
  estimatedCost?: number | string | null;
  property: {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}) {
  if (!job.clientId) return;

  try {
    const user = await basePrisma.user.findUnique({
      where: { id: job.clientId },
      select: { email: true, name: true },
    });
    if (!user?.email) return;

    const propertyAddress = `${job.property.streetAddress}, ${job.property.suburb}, ${job.property.state} ${job.property.postcode}`;
    const jobTypeLabel = JOB_TYPE_LABELS[job.type] || job.type;

    const html = getJobCreatedTemplate({
      clientName: user.name || 'Valued Client',
      jobNumber: job.jobNumber,
      jobType: jobTypeLabel,
      propertyAddress,
      estimatedCost: job.estimatedCost ? Number(job.estimatedCost).toLocaleString('en-AU') : undefined,
    });

    const subject = `Job ${job.jobNumber} Created — ${jobTypeLabel}`;
    const result = await sendEmail({ to: user.email, subject, html });

    await logNotification({
      type: 'email',
      channel: 'job_created',
      recipientId: job.clientId,
      recipient: user.email,
      jobId: job.id,
      jobNumber: job.jobNumber,
      subject,
      status: result.success ? 'sent' : 'failed',
      errorMessage: result.error,
    });
  } catch (error) {
    console.error('[Notify] jobCreated error:', error);
  }
}

// ============================================================================
// Contractor Assigned — email + SMS to contractor
// ============================================================================

export async function notifyContractorAssigned(job: {
  id: string;
  jobNumber: string;
  type: string;
  clientId?: string | null;
  contractor: {
    id: string;
    businessName: string;
    user: { name: string; email: string };
  };
  property: {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}) {
  const propertyAddress = `${job.property.streetAddress}, ${job.property.suburb}, ${job.property.state} ${job.property.postcode}`;
  const jobTypeLabel = JOB_TYPE_LABELS[job.type] || job.type;
  const contractorName = job.contractor.user.name || job.contractor.businessName;
  const contractorEmail = job.contractor.user.email;

  // Fetch client name for the contractor email
  let clientName: string | undefined;
  if (job.clientId) {
    const client = await basePrisma.user.findUnique({
      where: { id: job.clientId },
      select: { name: true },
    });
    clientName = client?.name || undefined;
  }

  try {
    // Email to contractor
    const html = getContractorAssignedTemplate({
      contractorName,
      jobNumber: job.jobNumber,
      jobType: jobTypeLabel,
      propertyAddress,
      clientName,
    });

    const subject = `You've Been Assigned to Job ${job.jobNumber}`;
    const emailResult = await sendEmail({ to: contractorEmail, subject, html });

    await logNotification({
      type: 'email',
      channel: 'contractor_assigned',
      recipientId: job.contractor.id,
      recipient: contractorEmail,
      jobId: job.id,
      jobNumber: job.jobNumber,
      subject,
      status: emailResult.success ? 'sent' : 'failed',
      errorMessage: emailResult.error,
    });

    // SMS to contractor (if phone available)
    const notifPrefs = await basePrisma.notificationPreference.findUnique({
      where: { contractorId: job.contractor.id },
      select: { smsEnabled: true, smsPhone: true },
    });

    if (notifPrefs?.smsEnabled && notifPrefs.smsPhone) {
      const smsText = getContractorAssignedSmsText({
        contractorName,
        jobNumber: job.jobNumber,
        jobType: jobTypeLabel,
        propertyAddress,
      });

      const smsResult = await sendSMS(notifPrefs.smsPhone, smsText);

      await logNotification({
        type: 'sms',
        channel: 'contractor_assigned',
        recipientId: job.contractor.id,
        recipient: notifPrefs.smsPhone,
        jobId: job.id,
        jobNumber: job.jobNumber,
        subject: 'Assignment SMS',
        status: smsResult.success ? 'sent' : 'failed',
        errorMessage: smsResult.error,
      });
    }
  } catch (error) {
    console.error('[Notify] contractorAssigned error:', error);
  }
}

// ============================================================================
// Work Started — email to property owner
// ============================================================================

export async function notifyWorkStarted(job: {
  id: string;
  jobNumber: string;
  type: string;
  clientId?: string | null;
  contractor: {
    businessName: string;
  } | null;
  property: {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}) {
  if (!job.clientId) return;

  try {
    const user = await basePrisma.user.findUnique({
      where: { id: job.clientId },
      select: { email: true, name: true },
    });
    if (!user?.email) return;

    const propertyAddress = `${job.property.streetAddress}, ${job.property.suburb}, ${job.property.state} ${job.property.postcode}`;
    const jobTypeLabel = JOB_TYPE_LABELS[job.type] || job.type;

    const html = getWorkStartedJobTemplate({
      clientName: user.name || 'Valued Client',
      jobNumber: job.jobNumber,
      jobType: jobTypeLabel,
      contractorName: job.contractor?.businessName || 'Your contractor',
      propertyAddress,
    });

    const subject = `Work Has Started — Job ${job.jobNumber}`;
    const result = await sendEmail({ to: user.email, subject, html });

    await logNotification({
      type: 'email',
      channel: 'work_started',
      recipientId: job.clientId,
      recipient: user.email,
      jobId: job.id,
      jobNumber: job.jobNumber,
      subject,
      status: result.success ? 'sent' : 'failed',
      errorMessage: result.error,
    });
  } catch (error) {
    console.error('[Notify] workStarted error:', error);
  }
}

// ============================================================================
// Job Completed — email to property owner
// ============================================================================

export async function notifyJobCompleted(job: {
  id: string;
  jobNumber: string;
  type: string;
  clientId?: string | null;
  insuranceClaimId?: string | null;
  hoursWorked?: number | string | null;
  actualCost?: number | string | null;
  contractor: {
    businessName: string;
  } | null;
  property: {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
  };
}) {
  if (!job.clientId) return;

  try {
    const user = await basePrisma.user.findUnique({
      where: { id: job.clientId },
      select: { email: true, name: true },
    });
    if (!user?.email) return;

    const propertyAddress = `${job.property.streetAddress}, ${job.property.suburb}, ${job.property.state} ${job.property.postcode}`;
    const jobTypeLabel = JOB_TYPE_LABELS[job.type] || job.type;

    const html = getJobCompletedTemplate({
      clientName: user.name || 'Valued Client',
      jobNumber: job.jobNumber,
      jobType: jobTypeLabel,
      contractorName: job.contractor?.businessName || 'Your contractor',
      propertyAddress,
      hoursWorked: job.hoursWorked ? String(Number(job.hoursWorked)) : undefined,
      actualCost: job.actualCost ? Number(job.actualCost).toLocaleString('en-AU') : undefined,
    });

    const subject = `Job ${job.jobNumber} Completed`;
    const recipients: string[] = [user.email];

    // Note: In future, if insuranceClaimId is present, we would look up the
    // insurer's email and CC them. For now we log the intent.
    if (job.insuranceClaimId) {
      console.log(`[Notify] Job ${job.jobNumber} has insurance claim ${job.insuranceClaimId} — insurer CC would go here`);
    }

    const result = await sendEmail({ to: recipients, subject, html });

    await logNotification({
      type: 'email',
      channel: 'job_completed',
      recipientId: job.clientId,
      recipient: user.email,
      jobId: job.id,
      jobNumber: job.jobNumber,
      subject,
      status: result.success ? 'sent' : 'failed',
      errorMessage: result.error,
    });
  } catch (error) {
    console.error('[Notify] jobCompleted error:', error);
  }
}

// ============================================================================
// Invoice Generated — email to property owner
// ============================================================================

export async function notifyInvoiceGenerated(job: {
  id: string;
  jobNumber: string;
  type: string;
  clientId?: string | null;
  contractor: {
    businessName: string;
  } | null;
  subtotalAUD: number;
  gstAUD: number;
  totalAUD: number;
}) {
  if (!job.clientId) return;

  try {
    const user = await basePrisma.user.findUnique({
      where: { id: job.clientId },
      select: { email: true, name: true },
    });
    if (!user?.email) return;

    const jobTypeLabel = JOB_TYPE_LABELS[job.type] || job.type;

    const html = getInvoiceGeneratedTemplate({
      clientName: user.name || 'Valued Client',
      jobNumber: job.jobNumber,
      jobType: jobTypeLabel,
      contractorName: job.contractor?.businessName || 'Your contractor',
      subtotalAUD: job.subtotalAUD.toLocaleString('en-AU'),
      gstAUD: job.gstAUD.toLocaleString('en-AU'),
      totalAUD: job.totalAUD.toLocaleString('en-AU'),
    });

    const subject = `Invoice for Job ${job.jobNumber} — $${job.totalAUD.toLocaleString('en-AU')} AUD`;
    const result = await sendEmail({ to: user.email, subject, html });

    await logNotification({
      type: 'email',
      channel: 'invoice_generated',
      recipientId: job.clientId,
      recipient: user.email,
      jobId: job.id,
      jobNumber: job.jobNumber,
      subject,
      status: result.success ? 'sent' : 'failed',
      errorMessage: result.error,
    });
  } catch (error) {
    console.error('[Notify] invoiceGenerated error:', error);
  }
}
