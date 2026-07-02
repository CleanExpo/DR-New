/**
 * @jest-environment node
 *
 * DR-929 — NRPG_CONTRACTOR_GO_LIVE kill switch, admin claims-matching.
 *
 * Rollback proof driven against the REAL `matchContractorsToBooking`
 * (mirrors the DR-925 claims-match-eligibility-delegation suite's pattern:
 * no jest.mock of '@prisma/client' — claim-intake imports it type-only, so
 * nothing here resolves the (CI-absent) generated client at runtime).
 *
 *   1. Flag OFF -> returns [] immediately; no booking lookup, no candidate
 *      query, no ContractorMatch row created (claim intake itself keeps
 *      working — only contractor matching/notification is skipped).
 *   2. Flag back ON -> the pre-existing DR-925 matching behaviour is restored.
 */

const mockPrisma = {
  booking: { findUnique: jest.fn() },
  contractor: { findMany: jest.fn() },
  contractorMatch: { create: jest.fn() },
};
jest.mock('@/lib/prisma', () => ({
  get prisma() {
    return mockPrisma;
  },
}));

jest.mock('@/lib/email/contractor-notifications', () => ({
  sendContractorMatchNotificationEmail: jest.fn(),
  sendBackupContractorNotificationEmail: jest.fn(),
}));

const mockFilterDispatchEligible = jest.fn();
jest.mock('@/lib/services/dispatch-eligibility', () => ({
  isDispatchEligible: jest.fn(),
  filterDispatchEligible: (...args: unknown[]) => mockFilterDispatchEligible(...args),
}));

import { matchContractorsToBooking } from '@/lib/claim-intake';

const ORIGINAL_FLAG = process.env.NRPG_CONTRACTOR_GO_LIVE;

function candidate(id: string, userId: string, businessName: string) {
  return {
    id,
    businessName,
    primaryPostcode: '4000',
    primaryState: 'QLD',
    averageRating: 4.8,
    averageResponseTimeMinutes: 20,
    completedJobs: 12,
    australianSpecialties: ['WATER_DAMAGE_RESTORATION'],
    supportedEmergencyLevels: ['URGENT'],
    serviceAreas: [{ postcode: '4000', state: 'QLD', isActive: true }],
    iicrcCertifications: [{ certificationLevel: 'MASTER', isActive: true }],
    user: { id: userId, name: `${businessName} Owner`, email: `${id}@example.com` },
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  mockPrisma.booking.findUnique.mockResolvedValue({
    servicePostcode: '4000',
    serviceState: 'QLD',
    australianServiceType: 'WATER_DAMAGE_RESTORATION',
    emergencyResponseLevel: 'URGENT',
  });
  mockPrisma.contractorMatch.create.mockResolvedValue({ id: 'cm_1' });
  mockPrisma.contractor.findMany.mockResolvedValue([
    candidate('c_1', 'user_1', 'Eligible Restorations'),
  ]);
  mockFilterDispatchEligible.mockResolvedValue(new Set(['user_1']));
});

afterEach(() => {
  if (ORIGINAL_FLAG === undefined) {
    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
  } else {
    process.env.NRPG_CONTRACTOR_GO_LIVE = ORIGINAL_FLAG;
  }
});

describe('DR-929 rollback proof — matchContractorsToBooking', () => {
  it('flag OFF: returns [] immediately, no booking lookup, no candidate query, no match rows', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';

    const matches = await matchContractorsToBooking('booking_1');

    expect(matches).toEqual([]);
    expect(mockPrisma.booking.findUnique).not.toHaveBeenCalled();
    expect(mockPrisma.contractor.findMany).not.toHaveBeenCalled();
    expect(mockFilterDispatchEligible).not.toHaveBeenCalled();
    expect(mockPrisma.contractorMatch.create).not.toHaveBeenCalled();
  });

  it('rollback: flag back ON restores the pre-existing matching behaviour', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    const killed = await matchContractorsToBooking('booking_1');
    expect(killed).toEqual([]);

    delete process.env.NRPG_CONTRACTOR_GO_LIVE;

    const restored = await matchContractorsToBooking('booking_1');

    expect(restored).toHaveLength(1);
    expect(restored[0].contractorId).toBe('c_1');
    expect(mockPrisma.contractorMatch.create).toHaveBeenCalledTimes(1);
  });
});
