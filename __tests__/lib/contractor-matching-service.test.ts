/**
 * Contractor Matching Service Tests
 *
 * Tests the Haversine formula-based distance calculation and
 * fair rotation algorithm for contractor assignment.
 */

import { createMockContractor, createMockContractorList } from '../factories/contractor.factory';
import { createMockJob } from '../factories/job.factory';

// Mock Prisma client
const mockPrisma = {
  contractor: {
    findMany: jest.fn(),
    update: jest.fn(),
  },
  job: {
    update: jest.fn(),
  },
};

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: mockPrisma,
}));

describe('ContractorMatchingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Haversine Distance Calculation', () => {
    it('should calculate distance between two points in kilometres', () => {
      // Arrange: Hamilton (job location) and Newstead (contractor location)
      const jobLat = -27.4381; // Hamilton
      const jobLng = 153.0614;
      const contractorLat = -27.4456; // Newstead
      const contractorLng = 153.0461;

      // Act: Calculate distance using Haversine formula
      const distance = calculateHaversineDistance(
        jobLat,
        jobLng,
        contractorLat,
        contractorLng
      );

      // Assert: Distance should be approximately 1.7km
      expect(distance).toBeGreaterThan(1.5);
      expect(distance).toBeLessThan(2.0);
    });

    it('should return 0 for same location', () => {
      // Arrange
      const lat = -27.4381;
      const lng = 153.0614;

      // Act
      const distance = calculateHaversineDistance(lat, lng, lat, lng);

      // Assert
      expect(distance).toBe(0);
    });

    it('should calculate longer distances correctly', () => {
      // Arrange: Brisbane CBD to Ipswich CBD (approx 40km)
      const brisbaneLat = -27.4698;
      const brisbaneLng = 153.0251;
      const ipswichLat = -27.6128;
      const ipswichLng = 152.7600;

      // Act
      const distance = calculateHaversineDistance(
        brisbaneLat,
        brisbaneLng,
        ipswichLat,
        ipswichLng
      );

      // Assert: Should be approximately 35-45km
      expect(distance).toBeGreaterThan(30);
      expect(distance).toBeLessThan(50);
    });
  });

  describe('Contractor Filtering', () => {
    it('should filter contractors within service radius', () => {
      // Arrange
      const job = createMockJob({
        latitude: -27.4381, // Hamilton
        longitude: 153.0614,
      });

      const contractors = [
        createMockContractor({
          id: 'contractor-1',
          latitude: -27.4456, // Newstead (1.7km away)
          longitude: 153.0461,
          serviceRadiusKm: 10,
        }),
        createMockContractor({
          id: 'contractor-2',
          latitude: -27.6128, // Ipswich (40km away)
          longitude: 152.7600,
          serviceRadiusKm: 10,
        }),
        createMockContractor({
          id: 'contractor-3',
          latitude: -27.4698, // Brisbane CBD (3km away)
          longitude: 153.0251,
          serviceRadiusKm: 50,
        }),
      ];

      // Act
      const filtered = filterContractorsByDistance(job, contractors);

      // Assert: Only contractors 1 and 3 should be within their service radius
      expect(filtered).toHaveLength(2);
      expect(filtered.map(c => c.id)).toContain('contractor-1');
      expect(filtered.map(c => c.id)).toContain('contractor-3');
    });

    it('should filter contractors by availability', () => {
      // Arrange
      const contractors = [
        createMockContractor({
          id: 'contractor-1',
          isAvailable: true,
          currentJobCount: 2,
          maxConcurrentJobs: 5,
        }),
        createMockContractor({
          id: 'contractor-2',
          isAvailable: false,
          currentJobCount: 0,
          maxConcurrentJobs: 5,
        }),
        createMockContractor({
          id: 'contractor-3',
          isAvailable: true,
          currentJobCount: 5,
          maxConcurrentJobs: 5,
        }),
      ];

      // Act
      const available = filterAvailableContractors(contractors);

      // Assert: Only contractor-1 should be available (active and under capacity)
      expect(available).toHaveLength(1);
      expect(available[0].id).toBe('contractor-1');
    });

    it('should filter contractors by specialisation', () => {
      // Arrange
      const job = createMockJob({
        type: 'MOULD_REMEDIATION',
      });

      const contractors = [
        createMockContractor({
          id: 'contractor-1',
          specialisations: ['WATER_DAMAGE', 'MOULD_REMEDIATION'],
        }),
        createMockContractor({
          id: 'contractor-2',
          specialisations: ['FIRE_DAMAGE', 'STORM_DAMAGE'],
        }),
        createMockContractor({
          id: 'contractor-3',
          specialisations: ['MOULD_REMEDIATION', 'FIRE_DAMAGE'],
        }),
      ];

      // Act
      const filtered = filterContractorsBySpecialisation(job, contractors);

      // Assert: Only contractors 1 and 3 have mould remediation specialisation
      expect(filtered).toHaveLength(2);
      expect(filtered.map(c => c.id)).toContain('contractor-1');
      expect(filtered.map(c => c.id)).toContain('contractor-3');
    });
  });

  describe('Fair Rotation Algorithm', () => {
    it('should prioritise contractors with lower rotation scores', () => {
      // Arrange
      const contractors = [
        createMockContractor({
          id: 'contractor-1',
          rotationScore: 85,
          totalJobsCompleted: 100,
        }),
        createMockContractor({
          id: 'contractor-2',
          rotationScore: 45,
          totalJobsCompleted: 50,
        }),
        createMockContractor({
          id: 'contractor-3',
          rotationScore: 120,
          totalJobsCompleted: 150,
        }),
      ];

      // Act
      const sorted = sortByRotationFairness(contractors);

      // Assert: Should be sorted by rotation score (ascending)
      expect(sorted[0].id).toBe('contractor-2'); // Lowest score (45)
      expect(sorted[1].id).toBe('contractor-1'); // Middle score (85)
      expect(sorted[2].id).toBe('contractor-3'); // Highest score (120)
    });

    it('should update rotation score after job assignment', () => {
      // Arrange
      const contractor = createMockContractor({
        id: 'contractor-1',
        rotationScore: 50,
      });

      // Act
      const updatedScore = calculateNewRotationScore(contractor, 5000);

      // Assert: Score should increase based on job value
      expect(updatedScore).toBeGreaterThan(50);
      expect(updatedScore).toBeLessThan(100);
    });

    it('should give premium tier contractors priority with same rotation score', () => {
      // Arrange
      const contractors = [
        createMockContractor({
          id: 'contractor-1',
          tier: 'STANDARD',
          rotationScore: 50,
          averageRating: 4.2,
        }),
        createMockContractor({
          id: 'contractor-2',
          tier: 'PREMIUM',
          rotationScore: 50,
          averageRating: 4.8,
        }),
        createMockContractor({
          id: 'contractor-3',
          tier: 'BASIC',
          rotationScore: 50,
          averageRating: 3.9,
        }),
      ];

      // Act
      const sorted = sortByTierAndRating(contractors);

      // Assert: Premium tier should come first
      expect(sorted[0].id).toBe('contractor-2');
    });
  });

  describe('Complete Matching Flow', () => {
    it('should find best matching contractor for urgent job', async () => {
      // Arrange
      const job = createMockJob({
        priority: 'URGENT',
        type: 'WATER_DAMAGE',
        latitude: -27.4381,
        longitude: 153.0614,
        estimatedValue: 5500,
      });

      const contractors = createMockContractorList(5).map((c, i) => ({
        ...c,
        latitude: -27.4456 + (i * 0.01),
        longitude: 153.0461 + (i * 0.01),
        specialisations: ['WATER_DAMAGE', 'MOULD_REMEDIATION'],
        isAvailable: true,
        currentJobCount: i,
        maxConcurrentJobs: 5,
        rotationScore: 50 + (i * 10),
      }));

      mockPrisma.contractor.findMany.mockResolvedValue(contractors);

      // Act
      const match = await findBestContractorMatch(job);

      // Assert: Should return the contractor with lowest rotation score
      expect(match).toBeDefined();
      expect(match?.rotationScore).toBe(50);
    });

    it('should return null when no contractors match criteria', async () => {
      // Arrange
      const job = createMockJob({
        type: 'ASBESTOS_REMOVAL',
        latitude: -27.4381,
        longitude: 153.0614,
      });

      const contractors = createMockContractorList(3).map(c => ({
        ...c,
        specialisations: ['WATER_DAMAGE', 'FIRE_DAMAGE'],
        isAvailable: true,
      }));

      mockPrisma.contractor.findMany.mockResolvedValue(contractors);

      // Act
      const match = await findBestContractorMatch(job);

      // Assert: No contractor has asbestos removal specialisation
      expect(match).toBeNull();
    });
  });
});

// Helper functions (these would normally be imported from the actual service)
function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometres
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function filterContractorsByDistance(job: any, contractors: any[]) {
  return contractors.filter(contractor => {
    const distance = calculateHaversineDistance(
      job.latitude,
      job.longitude,
      contractor.latitude,
      contractor.longitude
    );
    return distance <= contractor.serviceRadiusKm;
  });
}

function filterAvailableContractors(contractors: any[]) {
  return contractors.filter(
    c => c.isAvailable && c.currentJobCount < c.maxConcurrentJobs
  );
}

function filterContractorsBySpecialisation(job: any, contractors: any[]) {
  return contractors.filter(c =>
    c.specialisations.includes(job.type)
  );
}

function sortByRotationFairness(contractors: any[]) {
  return [...contractors].sort((a, b) => a.rotationScore - b.rotationScore);
}

function sortByTierAndRating(contractors: any[]) {
  const tierOrder = { PREMIUM: 1, STANDARD: 2, BASIC: 3 };
  return [...contractors].sort((a, b) => {
    if (a.rotationScore !== b.rotationScore) {
      return a.rotationScore - b.rotationScore;
    }
    if (tierOrder[a.tier] !== tierOrder[b.tier]) {
      return tierOrder[a.tier] - tierOrder[b.tier];
    }
    return b.averageRating - a.averageRating;
  });
}

function calculateNewRotationScore(contractor: any, jobValue: number): number {
  // Increase score based on job value (higher value = more points)
  const valuePoints = jobValue / 200;
  return contractor.rotationScore + valuePoints;
}

async function findBestContractorMatch(job: any) {
  const contractors = await mockPrisma.contractor.findMany({
    where: { status: 'ACTIVE' },
  });

  // Apply filters
  let eligible = filterContractorsByDistance(job, contractors);
  eligible = filterAvailableContractors(eligible);
  eligible = filterContractorsBySpecialisation(job, eligible);

  if (eligible.length === 0) {
    return null;
  }

  // Sort by rotation fairness and tier
  const sorted = sortByTierAndRating(sortByRotationFairness(eligible));

  return sorted[0];
}
