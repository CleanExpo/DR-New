import { NextRequest, NextResponse } from 'next/server';
import { getAirtableClient, Lead } from '@/lib/airtable/airtable-client';
import { automationEngine, MarketingAutomationEngine } from '@/lib/airtable/automation-sequences';

// GET - Fetch all leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const urgency = searchParams.get('urgency');

    const airtableClient = getAirtableClient();

    // Build filter formula for Airtable
    let filterFormula = '';
    const filters = [];

    if (status && status !== 'all') {
      filters.push(`{Status} = '${status}'`);
    }

    if (urgency && urgency !== 'all') {
      filters.push(`{Urgency} = '${urgency}'`);
    }

    if (filters.length > 0) {
      filterFormula = filters.length === 1 ? filters[0] : `AND(${filters.join(', ')})`;
    }

    const leads = await airtableClient.getLeads(filterFormula);

    return NextResponse.json({
      success: true,
      data: leads,
      count: leads.length
    });

  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch leads from Airtable'
    }, { status: 500 });
  }
}

// POST - Create new lead
export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'property_type', 'emergency_type', 'location', 'description'];
    const missingFields = requiredFields.filter(field => !leadData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    const airtableClient = getAirtableClient();

    // Add metadata
    const enrichedLeadData: Omit<Lead, 'id' | 'created_at'> = {
      ...leadData,
      source: leadData.source || 'website',
      status: 'new',
      urgency: leadData.urgency || 'standard'
    };

    const createdLead = await airtableClient.createLead(enrichedLeadData);

    // Trigger automation workflows
    await triggerLeadAutomation(createdLead);

    // Trigger marketing automation sequences
    const sequences = MarketingAutomationEngine.determineSequences(createdLead);
    for (const sequenceId of sequences) {
      await automationEngine.triggerSequence(sequenceId, createdLead);
    }

    return NextResponse.json({
      success: true,
      data: createdLead,
      message: 'Lead created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to create lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create lead in Airtable'
    }, { status: 500 });
  }
}

// PUT - Update existing lead
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Lead ID is required'
      }, { status: 400 });
    }

    const airtableClient = getAirtableClient();
    const updatedLead = await airtableClient.updateLead(id, updateData);

    // Trigger status change automation if status was updated
    if (updateData.status) {
      await triggerStatusChangeAutomation(updatedLead);

      // Trigger post-conversion sequence if lead was converted
      if (updateData.status === 'converted') {
        await automationEngine.triggerSequence('post_conversion', updatedLead);
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedLead,
      message: 'Lead updated successfully'
    });

  } catch (error) {
    console.error('Failed to update lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update lead in Airtable'
    }, { status: 500 });
  }
}

// Automation workflow triggers
async function triggerLeadAutomation(lead: Lead) {
  try {
    // 1. Send immediate notification for emergency leads
    if (lead.urgency === 'emergency') {
      await sendEmergencyNotification(lead);
    }

    // 2. Add to appropriate marketing automation sequence
    await addToMarketingSequence(lead);

    // 3. Assign to contractor if available
    if (lead.urgency === 'emergency' || lead.urgency === 'urgent') {
      await assignContractor(lead);
    }

    // 4. Log activity
    await logActivity('lead_created', lead.id, {
      source: lead.source,
      urgency: lead.urgency,
      emergency_type: lead.emergency_type
    });

  } catch (error) {
    console.error('Lead automation failed:', error);
  }
}

async function triggerStatusChangeAutomation(lead: Lead) {
  try {
    switch (lead.status) {
      case 'contacted':
        await scheduleFollowUp(lead);
        break;
      case 'qualified':
        await sendQuoteRequest(lead);
        break;
      case 'converted':
        await triggerWelcomeSequence(lead);
        break;
      case 'closed':
        await requestReview(lead);
        break;
    }

    await logActivity('status_changed', lead.id, {
      new_status: lead.status,
      previous_status: 'unknown' // Would need to track this
    });

  } catch (error) {
    console.error('Status change automation failed:', error);
  }
}

async function sendEmergencyNotification(lead: Lead) {
  // This would integrate with your notification system
  console.log(`🚨 EMERGENCY LEAD: ${lead.name} - ${lead.emergency_type} in ${lead.suburb}`);

  // Could integrate with:
  // - SMS alerts to on-call team
  // - Slack/Teams notifications
  // - Push notifications to mobile app
  // - Email alerts with escalation
}

async function addToMarketingSequence(lead: Lead) {
  // Add lead to appropriate marketing automation sequence
  const sequenceType = determineMarketingSequence(lead);
  console.log(`Adding ${lead.name} to ${sequenceType} marketing sequence`);

  // Could integrate with:
  // - Mailchimp automation
  // - HubSpot sequences
  // - Custom email automation
}

function determineMarketingSequence(lead: Lead): string {
  if (lead.urgency === 'emergency') return 'emergency_response';
  if (lead.property_type === 'commercial') return 'commercial_nurture';
  if (lead.emergency_type === 'mould') return 'mould_education';
  return 'general_nurture';
}

async function assignContractor(lead: Lead) {
  // Logic to assign available contractor based on location and specialty
  console.log(`Assigning contractor for ${lead.emergency_type} in ${lead.suburb}`);

  // Could integrate with:
  // - Contractor management system
  // - GPS-based assignment
  // - Specialty matching
  // - Workload balancing
}

async function scheduleFollowUp(lead: Lead) {
  // Schedule appropriate follow-up based on lead characteristics
  const followUpDays = lead.urgency === 'emergency' ? 1 : 3;
  console.log(`Scheduling follow-up for ${lead.name} in ${followUpDays} days`);
}

async function sendQuoteRequest(lead: Lead) {
  // Trigger quote generation process
  console.log(`Sending quote request for ${lead.name} - estimated value: $${lead.estimated_value}`);
}

async function triggerWelcomeSequence(lead: Lead) {
  // Start customer onboarding process
  console.log(`Starting welcome sequence for new customer: ${lead.name}`);
}

async function requestReview(lead: Lead) {
  // Request customer review and testimonial
  console.log(`Requesting review from ${lead.name}`);
}

async function logActivity(action: string, leadId: string | undefined, metadata: any) {
  // Log all activities for analytics and tracking
  console.log(`Activity logged: ${action} for lead ${leadId}`, metadata);

  // Could integrate with:
  // - Analytics platforms
  // - Custom activity tracking
  // - Performance dashboards
}