/**
 * Follow-up Automation Service
 *
 * Automated drip campaigns and follow-up sequences for lead nurturing
 */

import { sendEmail } from './email-notification';
import { sendSMS } from './sms-notification';

export interface FollowUpSequence {
  leadId: string;
  classification: 'hot' | 'warm' | 'cold';
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
  lastContactAt?: Date;
  nextFollowUpAt?: Date;
  sequence: FollowUpStep[];
}

export interface FollowUpStep {
  stepNumber: number;
  delayHours: number;
  channel: 'email' | 'sms' | 'call' | 'task';
  template: string;
  completed: boolean;
  completedAt?: Date;
  automated: boolean;
}

/**
 * Follow-up sequences by lead classification
 */
const SEQUENCES: Record<string, Omit<FollowUpStep, 'completed'>[]> = {
  hot_new: [
    { stepNumber: 1, delayHours: 0, channel: 'call' as const, template: 'immediate_callback', automated: false },
    { stepNumber: 2, delayHours: 0.25, channel: 'sms' as const, template: 'hot_lead_followup', automated: true },
    { stepNumber: 3, delayHours: 2, channel: 'email' as const, template: 'emergency_service_info', automated: true },
    { stepNumber: 4, delayHours: 4, channel: 'call' as const, template: 'second_attempt', automated: false },
    { stepNumber: 5, delayHours: 24, channel: 'email' as const, template: 'quote_ready', automated: true },
  ],
  warm_new: [
    { stepNumber: 1, delayHours: 1, channel: 'call' as const, template: 'initial_contact', automated: false },
    { stepNumber: 2, delayHours: 2, channel: 'email' as const, template: 'service_introduction', automated: true },
    { stepNumber: 3, delayHours: 24, channel: 'call' as const, template: 'follow_up_call', automated: false },
    { stepNumber: 4, delayHours: 48, channel: 'email' as const, template: 'value_proposition', automated: true },
    { stepNumber: 5, delayHours: 72, channel: 'sms' as const, template: 'check_in', automated: true },
  ],
  cold_new: [
    { stepNumber: 1, delayHours: 4, channel: 'email' as const, template: 'welcome_email', automated: true },
    { stepNumber: 2, delayHours: 48, channel: 'email' as const, template: 'education_content', automated: true },
    { stepNumber: 3, delayHours: 120, channel: 'email' as const, template: 'case_studies', automated: true },
    { stepNumber: 4, delayHours: 168, channel: 'call' as const, template: 'nurture_call', automated: false },
  ],
  quoted: [
    { stepNumber: 1, delayHours: 24, channel: 'call' as const, template: 'quote_follow_up', automated: false },
    { stepNumber: 2, delayHours: 48, channel: 'email' as const, template: 'quote_reminder', automated: true },
    { stepNumber: 3, delayHours: 96, channel: 'sms' as const, template: 'quote_expiring', automated: true },
    { stepNumber: 4, delayHours: 120, channel: 'call' as const, template: 'final_follow_up', automated: false },
  ],
};

/**
 * Get follow-up sequence for lead
 */
export function getFollowUpSequence(
  classification: 'hot' | 'warm' | 'cold',
  status: string
): FollowUpStep[] {
  const sequenceKey = `${classification}_${status}` as keyof typeof SEQUENCES;
  const sequence = SEQUENCES[sequenceKey] || SEQUENCES[`${classification}_new` as keyof typeof SEQUENCES];

  return sequence.map((step) => ({
    ...step,
    completed: false,
    automated: step.automated,
  }));
}

/**
 * Process automated follow-ups
 */
export async function processAutomatedFollowUps(
  leads: Array<{
    id: string;
    email: string;
    phone: string;
    name: string;
    serviceType: string;
    classification: 'hot' | 'warm' | 'cold';
    status: string;
    createdAt: Date;
    lastContactAt?: Date;
  }>
): Promise<Array<{ leadId: string; action: string; success: boolean }>> {
  const results = [];

  for (const lead of leads) {
    const sequence = getFollowUpSequence(lead.classification, lead.status);
    const now = new Date();

    // Find next automated step that needs to be executed
    for (const step of sequence) {
      if (!step.automated || step.completed) {continue;}

      const triggerTime = new Date(
        (lead.lastContactAt || lead.createdAt).getTime() + step.delayHours * 60 * 60 * 1000
      );

      if (now >= triggerTime) {
        // Execute the step
        const result = await executeFollowUpStep(lead, step);
        results.push({
          leadId: lead.id,
          action: `${step.channel}:${step.template}`,
          success: result.success,
        });

        // Only process one step per lead per run
        break;
      }
    }
  }

  return results;
}

/**
 * Execute a follow-up step
 */
async function executeFollowUpStep(
  lead: {
    id: string;
    email: string;
    phone: string;
    name: string;
    serviceType: string;
  },
  step: FollowUpStep
): Promise<{ success: boolean; error?: string }> {
  try {
    if (step.channel === 'email') {
      const emailContent = getEmailContent(step.template, lead);
      const result = await sendEmail({
        to: lead.email,
        subject: emailContent.subject,
        html: emailContent.html,
      });
      return { success: result.success, error: result.error };
    } else if (step.channel === 'sms') {
      const smsContent = getSMSContent(step.template, lead);
      const result = await sendSMS({
        to: lead.phone,
        message: smsContent,
        priority: 'normal',
      });
      return { success: result.success, error: result.error };
    } else if (step.channel === 'task') {
      // Create task for manual follow-up
      console.log(`[TASK] Created: ${step.template} for lead ${lead.id}`);
      return { success: true };
    }

    return { success: false, error: 'UNSUPPORTED_CHANNEL' };
  } catch (error) {
    console.error('[FOLLOWUP] Error executing step:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'EXECUTION_FAILED',
    };
  }
}

/**
 * Get email content for template
 */
function getEmailContent(
  template: string,
  lead: { name: string; serviceType: string }
): { subject: string; html: string } {
  const templates: Record<string, { subject: string; html: string }> = {
    emergency_service_info: {
      subject: 'Your Emergency Restoration Request - Disaster Recovery Brisbane',
      html: `
        <h2>Hi ${lead.name},</h2>
        <p>Thank you for contacting Disaster Recovery Brisbane for your ${lead.serviceType} emergency.</p>
        <p>Our IICRC Master Restorer team is reviewing your request and will be in touch shortly.</p>
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>We'll call you within the next few hours to discuss your situation</li>
          <li>Schedule an on-site assessment (usually within 24 hours)</li>
          <li>Provide a detailed quote and timeline</li>
          <li>Begin work immediately upon approval</li>
        </ul>
        <p><strong>Emergency Contact: 1300 309 361</strong></p>
      `,
    },
    service_introduction: {
      subject: `Professional ${lead.name} Restoration Services - Free Quote`,
      html: `
        <h2>Hi ${lead.name},</h2>
        <p>Thank you for your inquiry about our ${lead.serviceType} restoration services.</p>
        <p><strong>Why choose Disaster Recovery Brisbane?</strong></p>
        <ul>
          <li>IICRC Master Restorer certified (one of few in QLD)</li>
          <li>24/7 emergency response</li>
          <li>Direct insurance billing</li>
          <li>Comprehensive restoration services</li>
        </ul>
        <p>I'd love to discuss your needs and provide a free, no-obligation quote.</p>
        <p>Call us: 1300 309 361</p>
      `,
    },
    quote_reminder: {
      subject: 'Your Restoration Quote - Disaster Recovery Brisbane',
      html: `
        <h2>Hi ${lead.name},</h2>
        <p>I wanted to follow up on the quote we sent for your ${lead.serviceType} restoration project.</p>
        <p>Do you have any questions about our proposal?</p>
        <p>Our team is ready to start work immediately once approved.</p>
        <p>View your quote: [QUOTE_LINK]</p>
        <p>Questions? Call 1300 309 361</p>
      `,
    },
    welcome_email: {
      subject: 'Welcome to Disaster Recovery Brisbane',
      html: `
        <h2>Hi ${lead.name},</h2>
        <p>Thank you for your interest in Disaster Recovery Brisbane.</p>
        <p>We're Brisbane's trusted IICRC Master Restorer for all restoration needs.</p>
        <p>I'll be reaching out soon to discuss how we can help with your ${lead.serviceType} needs.</p>
        <p>In the meantime, feel free to browse our case studies and client testimonials.</p>
      `,
    },
  };

  return (
    templates[template] || {
      subject: 'Disaster Recovery Brisbane',
      html: '<p>Follow-up from Disaster Recovery Brisbane</p>',
    }
  );
}

/**
 * Get SMS content for template
 */
function getSMSContent(template: string, lead: { name: string }): string {
  const templates: Record<string, string> = {
    hot_lead_followup: `Hi ${lead.name}, thanks for contacting Disaster Recovery Brisbane. We'll call you shortly to discuss your emergency. Need immediate help? Call 1300 309 361`,
    check_in: `Hi ${lead.name}, just checking in from Disaster Recovery Brisbane. Ready to move forward with your project? Call us: 1300 309 361`,
    quote_expiring: `Hi ${lead.name}, your quote from Disaster Recovery Brisbane expires soon. Accept now or call to discuss: 1300 309 361`,
  };

  return templates[template] || `Follow-up from Disaster Recovery Brisbane: 1300 309 361`;
}

/**
 * Update follow-up completion
 */
export function markStepComplete(
  sequence: FollowUpSequence,
  stepNumber: number
): FollowUpSequence {
  const step = sequence.sequence.find((s) => s.stepNumber === stepNumber);
  if (step) {
    step.completed = true;
    step.completedAt = new Date();
  }

  // Calculate next follow-up time
  const nextStep = sequence.sequence.find((s) => !s.completed);
  if (nextStep) {
    sequence.nextFollowUpAt = new Date(
      Date.now() + nextStep.delayHours * 60 * 60 * 1000
    );
  }

  return sequence;
}

/**
 * Get overdue follow-ups
 */
export function getOverdueFollowUps(
  sequences: FollowUpSequence[]
): FollowUpSequence[] {
  const now = new Date();
  return sequences.filter((seq) => {
    return seq.nextFollowUpAt && seq.nextFollowUpAt <= now;
  });
}

/**
 * Schedule follow-up for specific time
 */
export function scheduleFollowUp(
  leadId: string,
  followUpTime: Date,
  channel: 'email' | 'sms' | 'call',
  notes?: string
): FollowUpStep {
  const delayHours = (followUpTime.getTime() - Date.now()) / (1000 * 60 * 60);

  return {
    stepNumber: 999, // Custom step
    delayHours: Math.max(0, delayHours),
    channel,
    template: 'custom',
    completed: false,
    automated: false,
  };
}
