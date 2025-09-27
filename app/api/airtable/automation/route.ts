import { NextRequest, NextResponse } from 'next/server';
import { automationEngine } from '@/lib/airtable/automation-sequences';

// GET - Fetch active automation sequences
export async function GET(request: NextRequest) {
  try {
    const activeSequences = await automationEngine.getActiveSequences();

    return NextResponse.json({
      success: true,
      data: activeSequences,
      count: activeSequences.length
    });

  } catch (error) {
    console.error('Failed to fetch automation sequences:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch automation sequences'
    }, { status: 500 });
  }
}

// POST - Trigger manual automation sequence
export async function POST(request: NextRequest) {
  try {
    const { sequenceId, leadId, leadData } = await request.json();

    if (!sequenceId || (!leadId && !leadData)) {
      return NextResponse.json({
        success: false,
        error: 'Sequence ID and either lead ID or lead data is required'
      }, { status: 400 });
    }

    // If leadData is provided, use it directly; otherwise fetch from Airtable
    let lead = leadData;
    if (leadId && !leadData) {
      // In a real implementation, you would fetch the lead from Airtable
      // const airtableClient = getAirtableClient();
      // lead = await airtableClient.getLead(leadId);
      return NextResponse.json({
        success: false,
        error: 'Lead fetching not implemented - provide leadData instead'
      }, { status: 400 });
    }

    await automationEngine.triggerSequence(sequenceId, lead);

    return NextResponse.json({
      success: true,
      message: `Automation sequence ${sequenceId} triggered successfully`,
      data: {
        sequenceId,
        leadId: lead.id,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Failed to trigger automation sequence:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to trigger automation sequence'
    }, { status: 500 });
  }
}

// PUT - Update automation sequence
export async function PUT(request: NextRequest) {
  try {
    const { sequenceId, updates } = await request.json();

    if (!sequenceId) {
      return NextResponse.json({
        success: false,
        error: 'Sequence ID is required'
      }, { status: 400 });
    }

    await automationEngine.updateSequence(sequenceId, updates);

    return NextResponse.json({
      success: true,
      message: `Automation sequence ${sequenceId} updated successfully`,
      data: {
        sequenceId,
        updates,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Failed to update automation sequence:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update automation sequence'
    }, { status: 500 });
  }
}