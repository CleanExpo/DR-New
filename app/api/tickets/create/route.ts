import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock database for tickets
const tickets = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate unique ticket ID
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create ticket object with all customer data
    const ticket = {
      id: ticketId,
      customerId: uuidv4(),
      status: 'NEW',
      priority: calculatePriority(body),
      createdAt: new Date().toISOString(),
      
      // Customer Information
      customer: {
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
      },
      
      // Property Information
      property: {
        type: body.propertyType,
        address: body.propertyAddress,
        suburb: body.suburb,
        state: body.state,
        postcode: body.postcode,
        value: body.propertyValue,
        isBusinessProperty: body.isBusinessProperty,
      },
      
      // Damage Information
      damage: {
        types: body.damageType,
        date: body.damageDate,
        description: body.damageDescription,
        areaAffected: body.estimatedAreaAffected,
        urgencyLevel: body.urgencyLevel,
        requiresAccommodation: body.requiresAccommodation,
        hasPhotos: body.hasPhotos,
      },
      
      // Insurance Information
      insurance: {
        hasInsurance: body.hasInsurance,
        company: body.insuranceCompany,
        claimNumber: body.claimNumber,
        excessAmount: body.excessAmount,
      },
      
      // Business Metrics
      metrics: {
        leadScore: body.leadScore || calculateLeadScore(body),
        leadValue: calculateLeadValue(body),
        readyToStart: body.readyToStart,
        budget: body.budget,
        decisionMaker: body.decisionMaker,
      },
      
      // Tracking Information
      tracking: {
        source: body.source || 'website',
        ipAddress: (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '').split(',')[0].trim(),
        userAgent: request.headers.get('user-agent') || '',
      },
      
      // Workflow Status
      workflow: {
        crmConnected: false,
        contractorAssigned: false,
        contractorNotified: false,
        jobAccepted: false,
        contractorContacted: false,
        serviceStarted: false,
        serviceCompleted: false,
        fundsReleased: false,
      },
    };
    
    // Store ticket in memory (in production, this would be a database)
    tickets.set(ticketId, ticket);
    
    // Trigger CRM integration (async)
    setTimeout(() => connectToCRM(ticketId), 2000);
    
    return NextResponse.json({
      success: true,
      ticketId: ticketId,
      message: 'Ticket created successfully. A specialist will contact you within 30 minutes.',
      estimatedResponse: '30 minutes',
      trackingUrl: `/track/${ticketId}`,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create ticket',
      message: 'Please try again or contact support',
    }, { status: 500 });
  }
}

// Get ticket by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('id');
  
  if (!ticketId) {
    return NextResponse.json({
      success: false,
      error: 'Ticket ID required',
    }, { status: 400 });
  }
  
  const ticket = tickets.get(ticketId);
  
  if (!ticket) {
    return NextResponse.json({
      success: false,
      error: 'Ticket not found',
    }, { status: 404 });
  }
  
  return NextResponse.json({
    success: true,
    ticket: ticket,
  });
}

// Helper functions
function calculatePriority(data: any): string {
  if (data.urgencyLevel === 'emergency') return 'CRITICAL';
  if (data.urgencyLevel === 'urgent') return 'HIGH';
  if (data.isBusinessProperty) return 'HIGH';
  if (data.requiresAccommodation) return 'HIGH';
  if (data.urgencyLevel === 'soon') return 'MEDIUM';
  return 'LOW';
}

function calculateLeadScore(data: any): number {
  let score = 0;
  
  // Insurance (30 points)
  if (data.hasInsurance) score += 30;
  
  // Urgency (20 points)
  if (data.urgencyLevel === 'emergency') score += 20;
  else if (data.urgencyLevel === 'urgent') score += 15;
  else if (data.urgencyLevel === 'soon') score += 10;
  
  // Property Value (20 points)
  const value = parseInt(data.propertyValue || '0');
  if (value > 1000000) score += 20;
  else if (value > 500000) score += 15;
  else if (value > 250000) score += 10;
  
  // Business Property (15 points)
  if (data.isBusinessProperty) score += 15;
  
  // Ready to Start (10 points)
  if (data.readyToStart === 'immediately') score += 10;
  else if (data.readyToStart === 'within_week') score += 7;
  
  // Decision Maker (5 points)
  if (data.decisionMaker) score += 5;
  
  return score;
}

function calculateLeadValue(data: any): number {
  const baseValue = 550; // Base value per lead
  let multiplier = 1;
  
  if (data.isBusinessProperty) multiplier += 0.5;
  if (data.hasInsurance) multiplier += 0.3;
  if (parseInt(data.propertyValue || '0') > 1000000) multiplier += 0.4;
  if (data.urgencyLevel === 'emergency') multiplier += 0.3;
  
  return Math.round(baseValue * multiplier);
}

// CRM Integration (Mock)
async function connectToCRM(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) {
    console.error('Ticket not found for CRM connection:', ticketId);
    return;
  }
  
  // Update workflow status
  ticket.workflow.crmConnected = true;
  ticket.crmConnectedAt = new Date().toISOString();
  tickets.set(ticketId, ticket);
  console.log('CRM connected for ticket:', ticketId);
  
  // Trigger contractor matching after 2 seconds
  setTimeout(() => findContractor(ticketId), 2000);
}

// Contractor Matching (Mock)
async function findContractor(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) {
    console.error('Ticket not found for contractor matching:', ticketId);
    return;
  }
  
  // Mock contractor assignment
  ticket.contractorId = `CTR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  ticket.contractorName = 'Premium Restoration Services';
  ticket.contractorPhone = '1300 RESTORE';
  ticket.workflow.contractorAssigned = true;
  ticket.contractorAssignedAt = new Date().toISOString();
  
  tickets.set(ticketId, ticket);
  console.log('Contractor assigned for ticket:', ticketId);
  
  // Simulate contractor notification after 2 seconds
  setTimeout(() => notifyContractor(ticketId), 2000);
}

// Contractor Notification (Mock)
async function notifyContractor(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  ticket.workflow.contractorNotified = true;
  ticket.contractorNotifiedAt = new Date().toISOString();
  tickets.set(ticketId, ticket);
  console.log('Contractor notified for ticket:', ticketId);
  
  // Simulate contractor accepting job after 3 seconds
  setTimeout(() => acceptJob(ticketId), 3000);
}

// Job Acceptance (Mock)
async function acceptJob(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) {
    console.error('Ticket not found for job acceptance:', ticketId);
    return;
  }
  
  ticket.workflow.jobAccepted = true;
  ticket.jobAcceptedAt = new Date().toISOString();
  tickets.set(ticketId, ticket);
  console.log('Job accepted for ticket:', ticketId);
  
  // Contractor contacts client after 2 seconds
  setTimeout(() => contractorContactsClient(ticketId), 2000);
}

// Contractor Contacts Client (Mock)
async function contractorContactsClient(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  ticket.workflow.contractorContacted = true;
  ticket.contactedAt = new Date().toISOString();
  ticket.status = 'CONTRACTOR_ASSIGNED';
  tickets.set(ticketId, ticket);
  
  // Contractor begins service delivery
  setTimeout(() => contractorBeginsService(ticketId), 3000);
}

// Contractor Begins Service (Mock)
async function contractorBeginsService(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  ticket.workflow.serviceStarted = true;
  ticket.serviceStartedAt = new Date().toISOString();
  ticket.status = 'IN_PROGRESS';
  ticket.serviceDetails = {
    inspectionCompleted: true,
    makeSafeCompleted: true,
    documentationStarted: true,
    insuranceLiaisonStarted: ticket.insurance.hasInsurance
  };
  tickets.set(ticketId, ticket);
  
  // Service completion
  setTimeout(() => contractorCompletesService(ticketId), 4000);
}

// Contractor Completes Service (Mock)
async function contractorCompletesService(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  ticket.workflow.serviceCompleted = true;
  ticket.serviceCompletedAt = new Date().toISOString();
  ticket.status = 'COMPLETED';
  ticket.serviceDetails = {
    ...ticket.serviceDetails,
    inspectionCompleted: true,
    makeSafeCompleted: true,
    documentationCompleted: true,
    insuranceLiaisonCompleted: ticket.insurance.hasInsurance,
    finalReportSubmitted: true
  };
  tickets.set(ticketId, ticket);
  
  // Release funds
  setTimeout(() => releaseFunds(ticketId), 2000);
}

// Release Funds (Mock)
async function releaseFunds(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  ticket.workflow.fundsReleased = true;
  ticket.fundsReleasedAt = new Date().toISOString();
  ticket.status = 'FUNDS_RELEASED';
  ticket.payment = {
    contractorPaid: true,
    totalAmount: 2750,
    platformFee: 550, // $550 for marketing and advertising
    contractorAmount: 2200, // $2,200 to contractor
    paymentDate: new Date().toISOString(),
    paymentMethod: 'Direct Deposit'
  };
  tickets.set(ticketId, ticket);
}