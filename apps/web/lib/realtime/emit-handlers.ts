/**
 * Real-time Event Emission Handlers
 *
 * Functions to emit events to WebSocket subscribers
 * and trigger associated notifications/emails
 */

import {
  RealtimeEvent,
  REALTIME_CHANNELS,
  EVENT_METADATA,
  ClaimSubmittedEvent,
  BookingCreatedEvent,
  BookingStatusChangedEvent,
  BidSubmittedEvent,
  BidAcceptedEvent,
  ContractorMatchedEvent,
  ContractorsAvailableEvent,
} from './events';
import { prisma } from '@/lib/prisma';
import { sendNotification } from '@/lib/notifications';

// ============================================================================
// Event Emitter (placeholder for Socket.io integration)
// ============================================================================

/**
 * Emit event to WebSocket subscribers
 * In production, this would emit via Socket.io/Redis
 */
export async function emitRealtimeEvent(event: RealtimeEvent, channels: string[]) {
  // TODO: Implement Socket.io emission
  // io.to(channel).emit('event', event);
  console.log(`📡 Event emitted: ${event.type} to ${channels.length} channel(s)`);
  console.log(`   Event:`, JSON.stringify(event, null, 2));

  // For now, just log the event
  // In production, emit via Socket.io:
  // channels.forEach(channel => {
  //   io.to(channel).emit(event.type, event);
  // });
}

// ============================================================================
// Claim & Booking Events
// ============================================================================

export async function emitClaimSubmitted(
  claimId: string,
  clientId: string,
  clientEmail: string,
  clientName: string,
  disasterType: string,
  location: string,
  priority: string,
  isEmergency: boolean
) {
  const event: ClaimSubmittedEvent = {
    type: 'claim:submitted',
    claimId,
    clientId,
    clientEmail,
    clientName,
    disasterType,
    location,
    priority,
    isEmergency,
    timestamp: new Date().toISOString(),
  };

  const metadata = EVENT_METADATA[event.type];
  const channels = [
    REALTIME_CHANNELS.ADMIN_DASHBOARD,
    REALTIME_CHANNELS.ADMIN_CLAIMS,
  ];

  // Emit to WebSocket
  await emitRealtimeEvent(event, channels);

  // Store notification
  if (metadata.storeInDb) {
    await storeNotification({
      userId: clientId,
      type: 'claim_submitted',
      title: 'Claim Submitted',
      message: `Your ${disasterType} claim has been received. We're reviewing it now.`,
      data: { claimId, priority, isEmergency },
      read: false,
    });
  }

  // Send email (already done in Phase 02)
}

export async function emitBookingCreated(
  bookingId: string,
  claimId: string,
  clientId: string,
  clientName: string,
  disasterType: string,
  location: string,
  estimatedBudget: number,
  contractorCount: number
) {
  const event: BookingCreatedEvent = {
    type: 'booking:created',
    bookingId,
    claimId,
    clientId,
    clientName,
    disasterType,
    location,
    estimatedBudget,
    timestamp: new Date().toISOString(),
  };

  const metadata = EVENT_METADATA[event.type];
  const channels = [
    REALTIME_CHANNELS.CLIENT_DASHBOARD(clientId),
    REALTIME_CHANNELS.CLAIM_BIDS(bookingId),
    REALTIME_CHANNELS.ADMIN_BOOKINGS,
  ];

  // Emit to WebSocket
  await emitRealtimeEvent(event, channels);

  // Store notification
  if (metadata.storeInDb) {
    await storeNotification({
      userId: clientId,
      type: 'booking_created',
      title: 'Your Claim is Being Matched',
      message: `Your claim has been converted to a booking. We've found ${contractorCount} contractors to bid on your job.`,
      data: { bookingId, contractorCount },
      read: false,
    });
  }

  // Send email
  if (metadata.sendEmail) {
    await sendNotification({
      userId: clientId,
      type: 'booking_created',
      subject: 'Your Claim Has Been Matched with Contractors',
      template: 'booking_created',
      data: {
        clientName,
        bookingId,
        disasterType,
        location,
        estimatedBudget,
        contractorCount,
      },
    });
  }
}

export async function emitBookingStatusChanged(
  bookingId: string,
  clientId: string,
  previousStatus: string,
  newStatus: string
) {
  const event: BookingStatusChangedEvent = {
    type: 'booking:status_changed',
    bookingId,
    clientId,
    previousStatus,
    newStatus,
    timestamp: new Date().toISOString(),
  };

  const metadata = EVENT_METADATA[event.type];
  const channels = [
    REALTIME_CHANNELS.CLAIM_STATUS(bookingId),
    REALTIME_CHANNELS.CLIENT_DASHBOARD(clientId),
  ];

  // Emit to WebSocket
  await emitRealtimeEvent(event, channels);

  // Store notification
  if (metadata.storeInDb) {
    await storeNotification({
      userId: clientId,
      type: 'booking_status_changed',
      title: `Status: ${newStatus}`,
      message: `Your booking status has changed to ${newStatus.replace('_', ' ')}.`,
      data: { bookingId, newStatus },
      read: false,
    });
  }
}

// ============================================================================
// Contractor Matching Events
// ============================================================================

export async function emitContractorMatched(
  bookingId: string,
  contractorId: string,
  contractorName: string,
  businessName: string,
  matchScore: number
) {
  const event: ContractorMatchedEvent = {
    type: 'contractor:matched',
    bookingId,
    contractorId,
    contractorName,
    businessName,
    matchScore,
    timestamp: new Date().toISOString(),
  };

  const metadata = EVENT_METADATA[event.type];
  const channels = [
    REALTIME_CHANNELS.CONTRACTOR_DASHBOARD(contractorId),
    REALTIME_CHANNELS.CONTRACTOR_JOBS(contractorId),
  ];

  // Emit to WebSocket
  await emitRealtimeEvent(event, channels);

  // Store notification
  if (metadata.storeInDb) {
    await storeNotification({
      userId: contractorId,
      type: 'job_available',
      title: 'New Job Available',
      message: `You've been matched for a new job opportunity (${matchScore}% match).`,
      data: { bookingId, matchScore },
      read: false,
    });
  }

  // Send email
  if (metadata.sendEmail) {
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: { user: { select: { email: true } } },
    });

    if (contractor?.user.email) {
      await sendNotification({
        userId: contractorId,
        type: 'job_matched',
        subject: `New Job Opportunity - ${businessName}`,
        template: 'job_matched',
        data: {
          contractorName,
          businessName,
          matchScore,
          bookingId,
        },
        email: contractor.user.email,
      });
    }
  }
}

export async function emitContractorsAvailable(
  bookingId: string,
  contractorCount: number,
  topMatches: Array<{ contractorId: string; businessName: string; matchScore: number }>
) {
  const event: ContractorsAvailableEvent = {
    type: 'contractors:available',
    bookingId,
    contractorCount,
    topMatches,
    timestamp: new Date().toISOString(),
  };

  const metadata = EVENT_METADATA[event.type];
  const channels = [REALTIME_CHANNELS.ADMIN_BOOKINGS];

  // Emit to WebSocket
  await emitRealtimeEvent(event, channels);
}

// ============================================================================
// Bidding Events
// ============================================================================

export async function emitBidSubmitted(
  bookingId: string,
  matchId: string,
  contractorId: string,
  contractorName: string,
  businessName: string,
  proposedBudget: number,
  estimatedHours: number | null,
  message: string | null,
  clientId: string
) {
  const event: BidSubmittedEvent = {
    type: 'bid:submitted',
    bookingId,
    matchId,
    contractorId,
    contractorName,
    businessName,
    proposedBudget,
    estimatedHours,
    message,
    clientId,
    timestamp: new Date().toISOString(),
  };

  const metadata = EVENT_METADATA[event.type];
  const channels = [
    REALTIME_CHANNELS.CLAIM_BIDS(bookingId),
    REALTIME_CHANNELS.CLIENT_DASHBOARD(clientId),
    REALTIME_CHANNELS.CONTRACTOR_BIDS(contractorId),
  ];

  // Emit to WebSocket
  await emitRealtimeEvent(event, channels);

  // Store notification for client
  if (metadata.storeInDb) {
    await storeNotification({
      userId: clientId,
      type: 'bid_received',
      title: `New Bid from ${businessName}`,
      message: `${contractorName} submitted a bid of ${proposedBudget.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}.`,
      data: { bookingId, matchId, contractorId, proposedBudget },
      read: false,
    });
  }

  // Send email to client
  if (metadata.sendEmail) {
    const client = await prisma.user.findUnique({
      where: { id: clientId },
    });

    if (client?.email) {
      await sendNotification({
        userId: clientId,
        type: 'bid_received',
        subject: `New Bid Received from ${businessName}`,
        template: 'bid_received',
        data: {
          clientName: client.name,
          businessName,
          contractorName,
          proposedBudget,
          estimatedHours,
          message,
          bookingId,
        },
        email: client.email,
      });
    }
  }
}

export async function emitBidAccepted(
  bookingId: string,
  matchId: string,
  contractorId: string,
  contractorName: string,
  businessName: string,
  clientId: string,
  clientName: string
) {
  const event: BidAcceptedEvent = {
    type: 'bid:accepted',
    bookingId,
    matchId,
    contractorId,
    contractorName,
    businessName,
    clientId,
    clientName,
    timestamp: new Date().toISOString(),
  };

  const metadata = EVENT_METADATA[event.type];
  const channels = [
    REALTIME_CHANNELS.CONTRACTOR_BIDS(contractorId),
    REALTIME_CHANNELS.CONTRACTOR_DASHBOARD(contractorId),
    REALTIME_CHANNELS.CLAIM_STATUS(bookingId),
  ];

  // Emit to WebSocket
  await emitRealtimeEvent(event, channels);

  // Store notification for contractor
  if (metadata.storeInDb) {
    await storeNotification({
      userId: contractorId,
      type: 'bid_accepted',
      title: `Bid Accepted from ${clientName}`,
      message: `Your bid for the ${businessName} job has been accepted. Ready to get started?`,
      data: { bookingId, matchId },
      read: false,
    });
  }

  // Send email to contractor
  if (metadata.sendEmail) {
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: { user: { select: { email: true } } },
    });

    if (contractor?.user.email) {
      await sendNotification({
        userId: contractorId,
        type: 'bid_accepted',
        subject: `Your Bid Has Been Accepted!`,
        template: 'bid_accepted',
        data: {
          contractorName,
          businessName,
          clientName,
          bookingId,
        },
        email: contractor.user.email,
      });
    }
  }
}

// ============================================================================
// Helper: Store notification in database
// ============================================================================

interface NotificationData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, any>;
  read: boolean;
}

async function storeNotification(notification: NotificationData) {
  try {
    await prisma.notification.create({
      data: {
        userId: notification.userId,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        read: notification.read,
      },
    });

    console.log(`✅ Notification stored for user ${notification.userId}: ${notification.type}`);
  } catch (error) {
    console.error('Failed to store notification:', error);
  }
}
