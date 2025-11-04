/**
 * Job Management Service Tests
 *
 * Tests job creation, updates, status transitions, and business logic.
 */

import { createMockJob, createMockJobList } from '../factories/job.factory';
import { createMockContractor } from '../factories/contractor.factory';

// Mock Prisma client
const mockPrisma = {
  job: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  contractor: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: mockPrisma,
}));

describe('JobManagementService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Job Creation', () => {
    it('should create a new job with valid data', async () => {
      // Arrange
      const jobData = {
        type: 'WATER_DAMAGE',
        priority: 'URGENT',
        title: 'Emergency water damage',
        addressLine1: '15 Riverside Drive',
        suburb: 'Hamilton',
        state: 'QLD',
        postcode: '4007',
        clientName: 'John Smith',
        clientPhone: '0412345678',
        estimatedValue: 5500,
      };

      const createdJob = createMockJob(jobData);
      mockPrisma.job.create.mockResolvedValue(createdJob);

      // Act
      const result = await createJob(jobData);

      // Assert
      expect(mockPrisma.job.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: jobData.type,
          priority: jobData.priority,
          status: 'PENDING',
        }),
      });
      expect(result.jobNumber).toMatch(/^JOB-\d{4}-\d{3}$/);
    });
  });
});
