/**
 * @jest-environment node
 *
 * DR-925 — matchContractorsToBooking delegates to the canonical dispatch
 * gate (spec N-04) instead of its previous inline partial gate
 * (isActive/isSuspended fragments in the Prisma where-clause).
 *
 * Proves, against the REAL claim-intake service:
 *   1. filterDispatchEligible is consulted with every candidate's User.id
 *      (contractor lifecycle is keyed on the owning User.id — Option B);
 *   2. an ineligible candidate is excluded from results AND no
 *      ContractorMatch row is created for them;
 *   3. the inline where-clause no longer carries the partial eligibility
 *      fragments (only the match-path-specific isVerified + availability).
 */

// claim-intake imports enum VALUES from @prisma/client; the generated client
// is absent on CI, so a virtual mock keeps module load off that path.
jest.mock(
  '@prisma/client',
  () => ({
    AustralianServiceType: { WATER_DAMAGE_RESTORATION: 'WATER_DAMAGE_RESTORATION' },
    AustralianState: { QLD: 'QLD' },
    BookingStatus: { PENDING: 'PENDING' },
    EmergencyResponseLevel: { URGENT: 'URGENT' },
  }),
  { virtual: true }
);

const mockPrisma = {
  booking: { findUnique: jest.fn() },
  contractor: { findMany: jest.fn() },
  contractorMatch: { create: jest.fn() },
};
// Lazy getter: the factory runs while claim-intake is being imported (hoisted),
// before the const above is initialized — dereference at call time instead.
jest.mock('@/lib/prisma', () => ({
  get prisma() {
    return mockPrisma;
  },
}));

// Email boundary — never exercised here, but imported at module load.
jest.mock('@/lib/email/contractor-notifications', () => ({
  sendContractorMatchNotificationEmail: jest.fn(),
  sendBackupContractorNotificationEmail: jest.fn(),
}));

// The canonical gate, spied.
const mockFilterDispatchEligible = jest.fn();
jest.mock('@/lib/services/dispatch-eligibility', () => ({
  isDispatchEligible: jest.fn(),
  filterDispatchEligible: (...args: unknown[]) => mockFilterDispatchEligible(...args),
}));

import { matchContractorsToBooking } from '@/lib/claim-intake';

/** A candidate who scores well above the 30-point inclusion floor. */
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
  mockPrisma.booking.findUnique.mockResolvedValue({
    servicePostcode: '4000',
    serviceState: 'QLD',
    australianServiceType: 'WATER_DAMAGE_RESTORATION',
    emergencyResponseLevel: 'URGENT',
  });
  mockPrisma.contractorMatch.create.mockResolvedValue({ id: 'cm_1' });
});

describe('DR-925 — matchContractorsToBooking uses the canonical dispatch gate', () => {
  it('filters candidates through filterDispatchEligible and drops the ineligible one entirely', async () => {
    const eligible = candidate('c_eligible', 'user_eligible', 'Eligible Restorations');
    const ineligible = candidate('c_ineligible', 'user_ineligible', 'No Gates Pass');
    mockPrisma.contractor.findMany.mockResolvedValue([eligible, ineligible]);
    mockFilterDispatchEligible.mockResolvedValue(new Set(['user_eligible']));

    const matches = await matchContractorsToBooking('booking_1');

    // Canonical gate consulted with every candidate's OWNING User.id.
    expect(mockFilterDispatchEligible).toHaveBeenCalledTimes(1);
    expect(mockFilterDispatchEligible).toHaveBeenCalledWith(['user_eligible', 'user_ineligible']);

    // Only the eligible contractor survives, and only they get a match row.
    expect(matches).toHaveLength(1);
    expect(matches[0].contractorId).toBe('c_eligible');
    expect(mockPrisma.contractorMatch.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.contractorMatch.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ contractorId: 'c_eligible' }),
      })
    );
  });

  it('no longer carries the inline partial eligibility gate in the candidate query', async () => {
    mockPrisma.contractor.findMany.mockResolvedValue([]);
    mockFilterDispatchEligible.mockResolvedValue(new Set());

    await matchContractorsToBooking('booking_1');

    const where = mockPrisma.contractor.findMany.mock.calls[0][0].where;
    // Eligibility lives in the canonical gate now — not inline.
    expect(where.isActive).toBeUndefined();
    expect(where.isSuspended).toBeUndefined();
    // Match-path-specific filters that are NOT eligibility remain inline:
    // admin verification (pending owner decision on the canonical gate) and
    // availability.
    expect(where.isVerified).toBe(true);
    expect(where.OR).toEqual([
      { unavailableUntil: null },
      expect.objectContaining({ unavailableUntil: expect.anything() }),
    ]);
  });

  it('returns an empty match set when the canonical gate rejects everyone', async () => {
    mockPrisma.contractor.findMany.mockResolvedValue([
      candidate('c_1', 'user_1', 'Blocked One'),
      candidate('c_2', 'user_2', 'Blocked Two'),
    ]);
    mockFilterDispatchEligible.mockResolvedValue(new Set());

    const matches = await matchContractorsToBooking('booking_1');

    expect(matches).toEqual([]);
    expect(mockPrisma.contractorMatch.create).not.toHaveBeenCalled();
  });
});
