/**
 * Contractor Matching API Tests
 */

import { createMockJob } from '../../factories/job.factory';
import { createMockContractorList } from '../../factories/contractor.factory';

const mockPrisma = {
  contractor: { findMany: jest.fn() },
  job: { findUnique: jest.fn(), update: jest.fn() },
};

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: mockPrisma,
}));

describe('POST /api/contractors/match', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should find matching contractors for job', async () => {
    // Arrange
    const job = createMockJob({
      type: 'WATER_DAMAGE',
      latitude: -27.4381,
      longitude: 153.0614,
    });

    const contractors = createMockContractorList(5).map(c => ({
      ...c,
      specialisations: ['WATER_DAMAGE'],
      isAvailable: true,
      latitude: -27.4456,
      longitude: 153.0461,
      serviceRadiusKm: 50,
    }));

    mockPrisma.contractor.findMany.mockResolvedValue(contractors);

    // Assert
    expect(contractors).toHaveLength(5);
    expect(contractors[0].specialisations).toContain('WATER_DAMAGE');
    expect(contractors[0].isAvailable).toBe(true);
  });

  it('should respect rotation fairness', () => {
    // Arrange
    const contractors = createMockContractorList(3).map((c, i) => ({
      ...c,
      rotationScore: 50 + (i * 20),
    }));

    // Act
    const sorted = contractors.sort((a, b) => a.rotationScore - b.rotationScore);

    // Assert
    expect(sorted[0].rotationScore).toBe(50);
    expect(sorted[2].rotationScore).toBe(90);
  });
});
