/**
 * Real-time Event Type Definitions
 *
 * Defines all events that can be emitted via WebSocket
 * for real-time dashboard updates
 */

// ============================================================================
// Claim & Booking Events
// ============================================================================

export interface ClaimSubmittedEvent {
  type: 'claim:submitted';
  claimId: string;
  clientId: string;
  clientEmail: string;
  clientName: string;
  disasterType: string;
  location: string;
  priority: string;
  isEmergency: boolean;
  timestamp: string;
}

export interface BookingCreatedEvent {
  type: 'booking:created';
  bookingId: string;
  claimId: string;
  clientId: string;
  clientName: string;
  disasterType: string;
  location: string;
  estimatedBudget: number;
  timestamp: string;
}

export interface BookingStatusChangedEvent {
  type: 'booking:status_changed';
  bookingId: string;
  clientId: string;
  previousStatus: string;
  newStatus: string;
  timestamp: string;
}

// ============================================================================
// Contractor Matching Events
// ============================================================================

export interface ContractorMatchedEvent {
  type: 'contractor:matched';
  bookingId: string;
  contractorId: string;
  contractorName: string;
  businessName: string;
  matchScore: number;
  timestamp: string;
}

export interface ContractorsAvailableEvent {
  type: 'contractors:available';
  bookingId: string;
  contractorCount: number;
  topMatches: Array<{
    contractorId: string;
    businessName: string;
    matchScore: number;
  }>;
  timestamp: string;
}

// ============================================================================
// Bidding Events
// ============================================================================

export interface BidSubmittedEvent {
  type: 'bid:submitted';
  bookingId: string;
  matchId: string;
  contractorId: string;
  contractorName: string;
  businessName: string;
  proposedBudget: number;
  estimatedHours: number | null;
  message: string | null;
  clientId: string;
  timestamp: string;
}

export interface BidAcceptedEvent {
  type: 'bid:accepted';
  bookingId: string;
  matchId: string;
  contractorId: string;
  contractorName: string;
  businessName: string;
  clientId: string;
  clientName: string;
  timestamp: string;
}

export interface BidRejectedEvent {
  type: 'bid:rejected';
  bookingId: string;
  matchId: string;
  contractorId: string;
  contractorName: string;
  businessName: string;
  clientId: string;
  timestamp: string;
}

// ============================================================================
// Work Progress Events
// ============================================================================

export interface WorkStartedEvent {
  type: 'work:started';
  bookingId: string;
  contractorId: string;
  contractorName: string;
  clientId: string;
  estimatedCompletionTime: string | null;
  timestamp: string;
}

export interface WorkProgressEvent {
  type: 'work:progress';
  bookingId: string;
  contractorId: string;
  progressPercentage: number;
  status: string;
  notes: string | null;
  timestamp: string;
}

export interface WorkCompletedEvent {
  type: 'work:completed';
  bookingId: string;
  contractorId: string;
  contractorName: string;
  clientId: string;
  finalCostAUD: number;
  timestamp: string;
}

// ============================================================================
// Communication Events
// ============================================================================

export interface MessageReceivedEvent {
  type: 'message:received';
  bookingId: string;
  senderId: string;
  senderName: string;
  senderRole: 'CLIENT' | 'CONTRACTOR' | 'ADMIN';
  message: string;
  timestamp: string;
}

// ============================================================================
// Payment Events
// ============================================================================

export interface PaymentCreatedEvent {
  type: 'payment:created';
  id: string;
  timestamp: Date;
  data: {
    paymentId: string;
    bookingId: string;
    clientId: string;
    amount: number;
    currency: string;
  };
  channel: string;
  priority: 'normal' | 'high';
}

export interface PaymentSucceededEvent {
  type: 'payment:succeeded';
  id: string;
  timestamp: Date;
  data: {
    paymentId: string;
    bookingId: string;
    clientId: string;
    amount: number;
    currency: string;
    message: string;
  };
  channel: string;
  priority: 'normal' | 'high';
}

export interface PaymentFailedEvent {
  type: 'payment:failed';
  id: string;
  timestamp: Date;
  data: {
    paymentId: string;
    bookingId: string;
    clientId: string;
    amount: number;
    currency: string;
    failureReason: string;
    message: string;
  };
  channel: string;
  priority: 'normal' | 'high';
}

export interface PaymentRefundedEvent {
  type: 'payment:refunded';
  id: string;
  timestamp: Date;
  data: {
    paymentId: string;
    bookingId: string;
    clientId?: string;
    refundAmount: number;
    originalAmount?: number;
    stripeRefundId?: string;
    refundType: 'partial' | 'full';
    currency: string;
    message: string;
  };
  channel: string;
  priority: 'normal' | 'high';
}

export interface InvoiceGeneratedEvent {
  type: 'invoice:generated';
  id: string;
  timestamp: Date;
  data: {
    invoiceId: string;
    paymentId: string;
    bookingId: string;
    invoiceNumber: string;
    totalAmount: number;
    message: string;
  };
  channel: string;
  priority: 'normal' | 'high';
}

export interface PayoutInitiatedEvent {
  type: 'payout:initiated';
  id: string;
  timestamp: Date;
  data: {
    payoutId: string;
    bookingId: string;
    contractorId: string;
    payoutAmount: number;
    platformFee: number;
    message: string;
  };
  channel: string;
  priority: 'normal' | 'high';
}

export interface PayoutCompletedEvent {
  type: 'payout:completed';
  id: string;
  timestamp: Date;
  data: {
    payoutId: string;
    bookingId: string;
    contractorId: string;
    payoutAmount: number;
    message: string;
  };
  channel: string;
  priority: 'normal' | 'high';
}

// ============================================================================
// Union Type for All Events
// ============================================================================

export type RealtimeEvent =
  | ClaimSubmittedEvent
  | BookingCreatedEvent
  | BookingStatusChangedEvent
  | ContractorMatchedEvent
  | ContractorsAvailableEvent
  | BidSubmittedEvent
  | BidAcceptedEvent
  | BidRejectedEvent
  | WorkStartedEvent
  | WorkProgressEvent
  | WorkCompletedEvent
  | MessageReceivedEvent
  | PaymentCreatedEvent
  | PaymentSucceededEvent
  | PaymentFailedEvent
  | PaymentRefundedEvent
  | InvoiceGeneratedEvent
  | PayoutInitiatedEvent
  | PayoutCompletedEvent;

// ============================================================================
// Event Channels (subscription targets)
// ============================================================================

export const REALTIME_CHANNELS = {
  // Client dashboard
  CLIENT_DASHBOARD: (userId: string) => `client:${userId}:dashboard`,
  CLAIM_STATUS: (bookingId: string) => `claim:${bookingId}:status`,
  CLAIM_BIDS: (bookingId: string) => `claim:${bookingId}:bids`,

  // Contractor dashboard
  CONTRACTOR_DASHBOARD: (userId: string) => `contractor:${userId}:dashboard`,
  CONTRACTOR_JOBS: (contractorId: string) => `contractor:${contractorId}:jobs`,
  CONTRACTOR_BIDS: (contractorId: string) => `contractor:${contractorId}:bids`,

  // Admin dashboard
  ADMIN_DASHBOARD: 'admin:dashboard',
  ADMIN_CLAIMS: 'admin:claims',
  ADMIN_BOOKINGS: 'admin:bookings',

  // Direct messaging
  BOOKING_CHAT: (bookingId: string) => `booking:${bookingId}:chat`,
};

// ============================================================================
// Event Priority Levels
// ============================================================================

export enum EventPriority {
  CRITICAL = 'critical', // Immediate action required (e.g., emergency claim)
  HIGH = 'high', // Important update (e.g., bid received)
  NORMAL = 'normal', // Regular update (e.g., status change)
  LOW = 'low', // Informational (e.g., progress update)
}

export interface EventMetadata {
  priority: EventPriority;
  requiresAction: boolean; // Whether user action is needed
  broadcastToAll: boolean; // Broadcast to all subscribers or specific channels
  storeInDb: boolean; // Store as notification in database
  sendEmail: boolean; // Send email notification
  emailTemplate?: string; // Which email template to use
}

// ============================================================================
// Event Mapping to Metadata
// ============================================================================

export const EVENT_METADATA: Record<RealtimeEvent['type'], EventMetadata> = {
  'claim:submitted': {
    priority: EventPriority.HIGH,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'claim_confirmation',
  },
  'booking:created': {
    priority: EventPriority.HIGH,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'booking_created',
  },
  'booking:status_changed': {
    priority: EventPriority.NORMAL,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: false,
  },
  'contractor:matched': {
    priority: EventPriority.HIGH,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'job_matched',
  },
  'contractors:available': {
    priority: EventPriority.HIGH,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: false,
  },
  'bid:submitted': {
    priority: EventPriority.HIGH,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'bid_received',
  },
  'bid:accepted': {
    priority: EventPriority.HIGH,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'bid_accepted',
  },
  'bid:rejected': {
    priority: EventPriority.NORMAL,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'bid_rejected',
  },
  'work:started': {
    priority: EventPriority.HIGH,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'work_started',
  },
  'work:progress': {
    priority: EventPriority.LOW,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: false,
    sendEmail: false,
  },
  'work:completed': {
    priority: EventPriority.HIGH,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'work_completed',
  },
  'message:received': {
    priority: EventPriority.NORMAL,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: false,
  },
  'payment:created': {
    priority: EventPriority.NORMAL,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: false,
  },
  'payment:succeeded': {
    priority: EventPriority.HIGH,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'payment_success',
  },
  'payment:failed': {
    priority: EventPriority.HIGH,
    requiresAction: true,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'payment_failed',
  },
  'payment:refunded': {
    priority: EventPriority.HIGH,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'payment_refunded',
  },
  'invoice:generated': {
    priority: EventPriority.NORMAL,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: false,
  },
  'payout:initiated': {
    priority: EventPriority.HIGH,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'payout_initiated',
  },
  'payout:completed': {
    priority: EventPriority.HIGH,
    requiresAction: false,
    broadcastToAll: false,
    storeInDb: true,
    sendEmail: true,
    emailTemplate: 'payout_completed',
  },
};
