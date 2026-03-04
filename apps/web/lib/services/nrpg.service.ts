/**
 * NRPG Contractor Verification Service
 *
 * Handles the admin workflow for verifying/suspending/rejecting contractors.
 * Called from the existing /api/contractors/[id]/verify route.
 */

import { prisma } from '@/lib/prisma';

export interface VerificationResult {
  success: boolean;
  message: string;
}

/**
 * Verify, suspend, or reject an NRPG contractor.
 */
export async function verifyNRPGContractor(
  contractorId: string,
  verificationLevel: 'VERIFIED' | 'SUSPENDED' | 'REJECTED',
  notes?: string
): Promise<VerificationResult> {
  const contractor = await prisma.contractor.findUnique({
    where: { id: contractorId },
  });

  if (!contractor) {
    return { success: false, message: 'Contractor not found' };
  }

  const now = new Date();

  switch (verificationLevel) {
    case 'VERIFIED': {
      const memberId =
        contractor.nrpgMemberId ?? `NRPG-${Date.now().toString(36).toUpperCase()}`;

      await prisma.contractor.update({
        where: { id: contractorId },
        data: {
          isVerified: true,
          verificationStatus: 'APPROVED',
          verificationDate: now,
          nrpgVerifiedAt: now,
          nrpgMemberId: memberId,
          nrpgVerificationLevel: 'FULL',
          reviewedAt: now,
          verificationNotes: notes ?? null,
          isSuspended: false,
          suspensionReason: null,
        },
      });

      return {
        success: true,
        message: `Contractor verified with NRPG member ID ${memberId}`,
      };
    }

    case 'SUSPENDED': {
      await prisma.contractor.update({
        where: { id: contractorId },
        data: {
          isSuspended: true,
          suspensionReason: notes ?? 'Suspended by admin',
          verificationStatus: 'SUSPENDED',
          reviewedAt: now,
          verificationNotes: notes ?? null,
        },
      });

      return {
        success: true,
        message: 'Contractor has been suspended',
      };
    }

    case 'REJECTED': {
      await prisma.contractor.update({
        where: { id: contractorId },
        data: {
          isVerified: false,
          verificationStatus: 'REJECTED',
          reviewedAt: now,
          rejectionReason: notes ?? 'Application rejected by admin',
          verificationNotes: notes ?? null,
        },
      });

      return {
        success: true,
        message: 'Contractor verification has been rejected',
      };
    }

    default:
      return { success: false, message: 'Invalid verification level' };
  }
}
