// @ts-nocheck

/**
 * Contractor Notification Background Job Processor
 *
 * Sends email notifications to contractors when matched with claims.
 * Tracks notification delivery status and updates ContractorMatch records.
 */

import { basePrisma } from '@/lib/prisma';
import {
  sendContractorMatchNotificationEmail,
  sendBackupContractorNotificationEmail,
} from '@/lib/email/contractor-notifications';

// ============================================================================
// Types
// ============================================================================

interface ContractorNotificationInput {
  matchId: string;
  claimId: string;
  contractorId: string;
  urgency: 'emergency' | 'urgent' | 'standard' | 'flexible';
  isPrimary: boolean; // true = primary match, false = backup
}

interface ProcessorOutput {
  matchId: string;
  notificationSent: boolean;
  notificationStatus: string;
  contractorEmail: string;
  error?: string;
}

// ============================================================================
// Main Processor
// ============================================================================

/**
 * Process contractor notification job
 */
export async function processContractorNotificationJob(
  input: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const { matchId, claimId, contractorId, urgency, isPrimary } =
    input as ContractorNotificationInput;

  console.log(`[Contractor Notification] Processing for match ${matchId}`);

  // 1. Load contractor match with related data
  const match = await basePrisma.contractorMatch.findUnique({
    where: { id: matchId },
    include: {
      claim: {
        select: {
          id: true,
          clientName: true,
          suburb: true,
          postcode: true,
          disasterType: true,
          hasInsurance: true,
          priority: true,
        },
      },
    },
  });

  if (!match) {
    throw new Error(`ContractorMatch ${matchId} not found`);
  }

  if (!match.claim) {
    throw new Error(`Claim not found for match ${matchId}`);
  }

  // 2. Load contractor details
  const contractor = await basePrisma.contractor.findUnique({
    where: { id: contractorId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!contractor) {
    throw new Error(`Contractor ${contractorId} not found`);
  }

  if (!contractor.user) {
    throw new Error(`User not found for contractor ${contractorId}`);
  }

  // 3. Check if notification already sent
  if (match.notificationStatus === 'SENT' && match.notificationSentAt) {
    console.log(`[Contractor Notification] Already sent for match ${matchId}`);
    return {
      matchId,
      notificationSent: false,
      notificationStatus: 'ALREADY_SENT',
      contractorEmail: contractor.user.email,
    } as ProcessorOutput;
  }

  // 4. Mask client name for privacy (e.g., "John Smith" → "John S.")
  const maskClientName = (fullName: string): string => {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0];
    const lastName = parts[parts.length - 1];
    const maskedLastName = lastName.charAt(0) + '.';
    return [...parts.slice(0, -1), maskedLastName].join(' ');
  };

  const maskedClientName = maskClientName(match.claim.clientName);

  // 5. Determine estimated value (if available)
  // Note: Current schema doesn't have estimatedValue, future enhancement
  const estimatedValue = undefined;

  // 6. Send appropriate notification email
  console.log(
    `[Contractor Notification] Sending ${isPrimary ? 'primary' : 'backup'} notification to ${contractor.user.email}`
  );

  let emailResult: { success: boolean; error?: string };

  if (isPrimary) {
    // Primary match notification
    emailResult = await sendContractorMatchNotificationEmail({
      contractorName: contractor.user.name || 'Contractor',
      contractorEmail: contractor.user.email,
      businessName: contractor.businessName,
      claimId: match.claim.id,
      clientName: maskedClientName,
      propertySuburb: match.claim.suburb,
      propertyPostcode: match.claim.postcode,
      disasterType: match.claim.disasterType,
      urgency,
      matchScore: match.matchScore,
      matchReasons: match.matchReason,
      responseDeadline: match.responseDeadline!,
      estimatedValue,
      hasInsurance: match.claim.hasInsurance,
    });
  } else {
    // Backup contractor notification
    emailResult = await sendBackupContractorNotificationEmail({
      contractorName: contractor.user.name || 'Contractor',
      contractorEmail: contractor.user.email,
      businessName: contractor.businessName,
      claimId: match.claim.id,
      clientName: maskedClientName,
      propertySuburb: match.claim.suburb,
      propertyPostcode: match.claim.postcode,
      disasterType: match.claim.disasterType,
      urgency,
      matchScore: match.matchScore,
      responseDeadline: match.responseDeadline!,
    });
  }

  // 7. Update notification status
  const notificationStatus = emailResult.success ? 'SENT' : 'FAILED';

  await basePrisma.contractorMatch.update({
    where: { id: matchId },
    data: {
      notificationStatus,
      notificationSentAt: emailResult.success ? new Date() : null,
    },
  });

  if (!emailResult.success) {
    console.error(
      `[Contractor Notification] Failed to send email to ${contractor.user.email}:`,
      emailResult.error
    );
    throw new Error(`Email delivery failed: ${emailResult.error}`);
  }

  console.log(
    `[Contractor Notification] Successfully sent to ${contractor.user.email} for match ${matchId}`
  );

  // 8. Return processor output
  return {
    matchId,
    notificationSent: true,
    notificationStatus: 'SENT',
    contractorEmail: contractor.user.email,
  } as ProcessorOutput;
}
