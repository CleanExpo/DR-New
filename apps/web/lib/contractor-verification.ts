/**
 * Contractor Licence Verification Service
 *
 * Provides licence validation, expiry checking, and status management
 * for NRPG contractors. Uses Australian English in user-facing output
 * (licence, not license).
 */

import { prisma } from '@/lib/prisma';

export type LicenceStatus = 'unverified' | 'verified' | 'expired' | 'suspended';

export interface LicenceVerificationResult {
  success: boolean;
  status: LicenceStatus;
  message: string;
  isExpired: boolean;
  daysUntilExpiry: number | null;
  contractorId: string;
}

export interface ContractorLicenceInfo {
  id: string;
  licenseNumber: string | null;
  licenseState: string | null;
  licenseType: string | null;
  licenseExpiry: Date | null;
  licenseStatus: string;
  licenseVerifiedAt: Date | null;
  isVerified: boolean;
  businessName: string;
}

/**
 * Check whether a licence expiry date has passed.
 */
export function checkLicenceExpiry(expiry: Date | null): {
  isExpired: boolean;
  daysUntilExpiry: number | null;
} {
  if (!expiry) {
    return { isExpired: false, daysUntilExpiry: null };
  }

  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const daysUntilExpiry = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return {
    isExpired: daysUntilExpiry < 0,
    daysUntilExpiry,
  };
}

/**
 * Return a human-readable verification status string.
 */
export function getVerificationStatus(contractor: ContractorLicenceInfo): string {
  const { licenseStatus, licenseNumber, licenseExpiry } = contractor;

  if (!licenseNumber) {
    return 'No licence on file';
  }

  if (licenseStatus === 'suspended') {
    return 'Licence suspended';
  }

  if (licenseExpiry) {
    const { isExpired, daysUntilExpiry } = checkLicenceExpiry(licenseExpiry);

    if (isExpired) {
      return 'Licence expired';
    }

    if (daysUntilExpiry !== null && daysUntilExpiry <= 30) {
      return `Licence expiring in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}`;
    }
  }

  if (licenseStatus === 'verified') {
    return 'Licence verified';
  }

  return 'Licence not yet verified';
}

/**
 * Verify a contractor's licence.
 *
 * This is currently a mock implementation. When a real state-based API or
 * ABN Lookup integration is available, the mock call can be replaced without
 * changing the surrounding logic.
 */
export async function verifyLicence(
  contractorId: string
): Promise<LicenceVerificationResult> {
  const contractor = await prisma.contractor.findUnique({
    where: { id: contractorId },
    select: {
      id: true,
      licenseNumber: true,
      licenseState: true,
      licenseType: true,
      licenseExpiry: true,
      licenseStatus: true,
      licenseVerifiedAt: true,
      isVerified: true,
      businessName: true,
    },
  });

  if (!contractor) {
    return {
      success: false,
      status: 'unverified',
      message: 'Contractor not found',
      isExpired: false,
      daysUntilExpiry: null,
      contractorId,
    };
  }

  if (!contractor.licenseNumber) {
    return {
      success: false,
      status: 'unverified',
      message: 'No licence number on file for this contractor',
      isExpired: false,
      daysUntilExpiry: null,
      contractorId,
    };
  }

  // Check expiry first
  const { isExpired, daysUntilExpiry } = checkLicenceExpiry(
    contractor.licenseExpiry
  );

  if (isExpired) {
    await prisma.contractor.update({
      where: { id: contractorId },
      data: {
        licenseStatus: 'expired',
        verificationStatus: 'EXPIRED',
      },
    });

    return {
      success: true,
      status: 'expired',
      message: `Licence ${contractor.licenseNumber} has expired`,
      isExpired: true,
      daysUntilExpiry,
      contractorId,
    };
  }

  // --- Mock verification ---
  // In production this would call an external API such as:
  //   - ABN Lookup (abr.business.gov.au)
  //   - NSW Fair Trading licence check
  //   - VIC VBA licence register
  //   - QLD QBCC licence search
  const mockVerified = await mockLicenceCheck(
    contractor.licenseNumber,
    contractor.licenseState
  );

  const newStatus: LicenceStatus = mockVerified ? 'verified' : 'unverified';

  await prisma.contractor.update({
    where: { id: contractorId },
    data: {
      licenseStatus: newStatus,
      licenseVerifiedAt: mockVerified ? new Date() : undefined,
      verificationStatus: mockVerified ? 'APPROVED' : undefined,
    },
  });

  return {
    success: true,
    status: newStatus,
    message: mockVerified
      ? `Licence ${contractor.licenseNumber} verified successfully`
      : `Licence ${contractor.licenseNumber} could not be verified`,
    isExpired: false,
    daysUntilExpiry,
    contractorId,
  };
}

/**
 * Mock licence check — simulates an external API call.
 * Returns true when the licence number is non-empty.
 */
async function mockLicenceCheck(
  licenceNumber: string | null,
  _state: string | null
): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Basic validation: licence number must be at least 4 characters
  if (!licenceNumber || licenceNumber.trim().length < 4) {
    return false;
  }

  return true;
}

/**
 * Batch-check all contractors for expired licences and flag them.
 * Useful as a scheduled job / cron task.
 *
 * Complexity: O(n) — two DB calls total (findMany + updateMany) regardless of n.
 * Avoids N+1 pattern by collecting expired IDs then issuing a single updateMany.
 */
export async function flagExpiredLicences(): Promise<{
  flagged: number;
  total: number;
}> {
  const contractors = await prisma.contractor.findMany({
    where: {
      licenseExpiry: { not: null },
      licenseStatus: { not: 'expired' },
    },
    select: {
      id: true,
      licenseExpiry: true,
    },
  });

  const expiredIds: string[] = contractors
    .filter((c) => checkLicenceExpiry(c.licenseExpiry).isExpired)
    .map((c) => c.id);

  if (expiredIds.length > 0) {
    await prisma.contractor.updateMany({
      where: { id: { in: expiredIds } },
      data: {
        licenseStatus: 'expired',
        verificationStatus: 'EXPIRED',
      },
    });
  }

  return { flagged: expiredIds.length, total: contractors.length };
}
