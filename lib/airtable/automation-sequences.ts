import { Lead, MarketingCampaign } from './airtable-client';

export interface AutomationSequence {
  id: string;
  name: string;
  trigger: string;
  steps: AutomationStep[];
  isActive: boolean;
}

export interface AutomationStep {
  id: string;
  type: 'email' | 'sms' | 'task' | 'delay' | 'campaign';
  delay?: number; // in hours
  content?: string;
  templateId?: string;
  conditions?: AutomationCondition[];
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string | number;
}

export class MarketingAutomationEngine {
  private sequences: AutomationSequence[] = [
    {
      id: 'emergency_response',
      name: 'Emergency Response Sequence',
      trigger: 'lead_created_emergency',
      isActive: true,
      steps: [
        {
          id: 'emergency_notification',
          type: 'sms',
          content: 'EMERGENCY LEAD: Immediate response required for {emergency_type} at {location}',
          delay: 0
        },
        {
          id: 'emergency_email',
          type: 'email',
          templateId: 'emergency_response_template',
          delay: 0.25 // 15 minutes
        },
        {
          id: 'follow_up_call',
          type: 'task',
          content: 'Schedule follow-up call within 1 hour',
          delay: 1
        }
      ]
    },
    {
      id: 'standard_nurture',
      name: 'Standard Lead Nurture',
      trigger: 'lead_created_standard',
      isActive: true,
      steps: [
        {
          id: 'welcome_email',
          type: 'email',
          templateId: 'welcome_template',
          delay: 0.5 // 30 minutes
        },
        {
          id: 'service_info',
          type: 'email',
          templateId: 'service_overview_template',
          delay: 24
        },
        {
          id: 'case_studies',
          type: 'email',
          templateId: 'case_studies_template',
          delay: 72,
          conditions: [
            { field: 'property_type', operator: 'equals', value: 'commercial' }
          ]
        },
        {
          id: 'follow_up_task',
          type: 'task',
          content: 'Follow up with quote if no response',
          delay: 168 // 1 week
        }
      ]
    },
    {
      id: 'commercial_nurture',
      name: 'Commercial Lead Nurture',
      trigger: 'lead_created_commercial',
      isActive: true,
      steps: [
        {
          id: 'commercial_welcome',
          type: 'email',
          templateId: 'commercial_welcome_template',
          delay: 1
        },
        {
          id: 'capabilities_presentation',
          type: 'email',
          templateId: 'commercial_capabilities_template',
          delay: 24
        },
        {
          id: 'insurance_partnership',
          type: 'email',
          templateId: 'insurance_partnership_template',
          delay: 48
        },
        {
          id: 'schedule_consultation',
          type: 'task',
          content: 'Schedule commercial consultation',
          delay: 72
        }
      ]
    },
    {
      id: 'mould_education',
      name: 'Mould Remediation Education',
      trigger: 'emergency_type_mould',
      isActive: true,
      steps: [
        {
          id: 'mould_urgency',
          type: 'email',
          templateId: 'mould_urgency_template',
          delay: 2
        },
        {
          id: 'health_risks',
          type: 'email',
          templateId: 'mould_health_risks_template',
          delay: 24
        },
        {
          id: 'remediation_process',
          type: 'email',
          templateId: 'mould_process_template',
          delay: 48
        },
        {
          id: 'prevention_tips',
          type: 'email',
          templateId: 'mould_prevention_template',
          delay: 168
        }
      ]
    },
    {
      id: 'post_conversion',
      name: 'Post-Conversion Customer Journey',
      trigger: 'lead_status_converted',
      isActive: true,
      steps: [
        {
          id: 'welcome_customer',
          type: 'email',
          templateId: 'customer_welcome_template',
          delay: 1
        },
        {
          id: 'project_timeline',
          type: 'email',
          templateId: 'project_timeline_template',
          delay: 24
        },
        {
          id: 'satisfaction_survey',
          type: 'email',
          templateId: 'satisfaction_survey_template',
          delay: 168 // 1 week after completion
        },
        {
          id: 'review_request',
          type: 'email',
          templateId: 'review_request_template',
          delay: 240 // 10 days after completion
        },
        {
          id: 'maintenance_tips',
          type: 'email',
          templateId: 'maintenance_tips_template',
          delay: 720 // 30 days after completion
        }
      ]
    }
  ];

  async triggerSequence(sequenceId: string, lead: Lead): Promise<void> {
    const sequence = this.sequences.find(s => s.id === sequenceId);
    if (!sequence || !sequence.isActive) {
      console.log(`Sequence ${sequenceId} not found or inactive`);
      return;
    }

    console.log(`🔄 Starting automation sequence: ${sequence.name} for lead ${lead.id}`);

    for (const step of sequence.steps) {
      await this.scheduleStep(step, lead, sequence);
    }
  }

  private async scheduleStep(step: AutomationStep, lead: Lead, sequence: AutomationSequence): Promise<void> {
    // Check conditions before scheduling
    if (step.conditions && !this.evaluateConditions(step.conditions, lead)) {
      console.log(`Skipping step ${step.id} - conditions not met`);
      return;
    }

    const executeAt = new Date(Date.now() + (step.delay || 0) * 60 * 60 * 1000);

    console.log(`📅 Scheduling ${step.type} step: ${step.id} for ${executeAt.toISOString()}`);

    // In a real implementation, you would:
    // 1. Store this in a job queue (Redis, database, etc.)
    // 2. Use a cron job or background worker to execute at the scheduled time
    // 3. Integrate with email services (SendGrid, Mailchimp, etc.)
    // 4. Integrate with SMS services (Twilio, etc.)

    const stepData = {
      sequenceId: sequence.id,
      stepId: step.id,
      leadId: lead.id,
      executeAt: executeAt.toISOString(),
      type: step.type,
      content: this.personalizeContent(step.content || '', lead),
      templateId: step.templateId
    };

    // Store in automation queue (this would typically be a database or queue system)
    await this.storeAutomationStep(stepData);
  }

  private evaluateConditions(conditions: AutomationCondition[], lead: Lead): boolean {
    return conditions.every(condition => {
      const leadValue = this.getLeadFieldValue(lead, condition.field);

      switch (condition.operator) {
        case 'equals':
          return leadValue === condition.value;
        case 'contains':
          return typeof leadValue === 'string' && leadValue.includes(condition.value as string);
        case 'greater_than':
          return typeof leadValue === 'number' && leadValue > (condition.value as number);
        case 'less_than':
          return typeof leadValue === 'number' && leadValue < (condition.value as number);
        default:
          return false;
      }
    });
  }

  private getLeadFieldValue(lead: Lead, field: string): any {
    const fieldMap: { [key: string]: any } = {
      'property_type': lead.property_type,
      'emergency_type': lead.emergency_type,
      'urgency': lead.urgency,
      'status': lead.status,
      'estimated_value': lead.estimated_value,
      'source': lead.source
    };

    return fieldMap[field];
  }

  private personalizeContent(content: string, lead: Lead): string {
    return content
      .replace('{name}', lead.name)
      .replace('{emergency_type}', lead.emergency_type)
      .replace('{location}', `${lead.suburb}, ${lead.state}`)
      .replace('{property_type}', lead.property_type)
      .replace('{phone}', lead.phone || '')
      .replace('{email}', lead.email);
  }

  private async storeAutomationStep(stepData: any): Promise<void> {
    // This would integrate with your preferred job queue system
    console.log('Storing automation step:', stepData);

    // Example implementations:
    // - Store in database with scheduled execution time
    // - Add to Redis queue with delay
    // - Use cloud functions with scheduled triggers
    // - Integrate with automation platforms like Zapier/Make
  }

  async getActiveSequences(): Promise<AutomationSequence[]> {
    return this.sequences.filter(s => s.isActive);
  }

  async updateSequence(sequenceId: string, updates: Partial<AutomationSequence>): Promise<void> {
    const index = this.sequences.findIndex(s => s.id === sequenceId);
    if (index !== -1) {
      this.sequences[index] = { ...this.sequences[index], ...updates };
      console.log(`Updated automation sequence: ${sequenceId}`);
    }
  }

  // Predefined sequence triggers based on lead characteristics
  static determineSequences(lead: Lead): string[] {
    const sequences: string[] = [];

    // Emergency response for urgent leads
    if (lead.urgency === 'emergency') {
      sequences.push('emergency_response');
    }

    // Commercial nurture for commercial properties
    if (lead.property_type === 'commercial') {
      sequences.push('commercial_nurture');
    }

    // Mould education for mould-related emergencies
    if (lead.emergency_type === 'mould') {
      sequences.push('mould_education');
    }

    // Standard nurture for regular leads
    if (lead.urgency === 'standard' && lead.property_type !== 'commercial') {
      sequences.push('standard_nurture');
    }

    return sequences;
  }
}

// Email templates for automation sequences
export const emailTemplates = {
  emergency_response_template: {
    subject: 'Emergency Response Team Activated - {emergency_type}',
    content: `
      Dear {name},

      Thank you for contacting Disaster Recovery Brisbane for your {emergency_type} emergency.

      🚨 EMERGENCY RESPONSE ACTIVATED 🚨
      Our emergency response team has been notified and will contact you within the next 30 minutes.

      What happens next:
      1. Emergency assessment within 1 hour
      2. Immediate containment measures
      3. Full restoration plan within 24 hours

      Emergency Contact: 1300 123 456 (24/7)

      Location: {location}
      Property Type: {property_type}

      Phill McGurk - Master Restorer
      Disaster Recovery Brisbane
    `
  },

  welcome_template: {
    subject: 'Welcome to Disaster Recovery Brisbane - Your Restoration Experts',
    content: `
      Dear {name},

      Thank you for contacting Disaster Recovery Brisbane regarding your {emergency_type} situation.

      As one of Brisbane's limited Master Restorers, Phill McGurk and our team are here to help restore your property to its pre-damage condition.

      Our Process:
      ✓ Immediate assessment and containment
      ✓ Insurance liaison and documentation
      ✓ Professional restoration using industry-leading equipment
      ✓ Final inspection and certification

      We'll be in touch within 24 hours to discuss your specific needs.

      Best regards,
      Disaster Recovery Brisbane Team
    `
  },

  commercial_welcome_template: {
    subject: 'Commercial Disaster Recovery Partnership - Immediate Response Available',
    content: `
      Dear {name},

      Thank you for considering Disaster Recovery Brisbane for your commercial property restoration needs.

      COMMERCIAL CAPABILITIES:
      • 24/7 Emergency Response
      • Large-scale restoration projects
      • Insurance company partnerships
      • Minimal business disruption protocols
      • Certified Master Restorer leadership

      Property: {property_type} in {location}
      Issue: {emergency_type}

      Our commercial team will contact you within 2 hours to discuss your specific requirements and provide a comprehensive assessment.

      Phill McGurk - Master Restorer
      Commercial Division Leader
    `
  }
};

export const automationEngine = new MarketingAutomationEngine();