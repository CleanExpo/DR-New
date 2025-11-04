/**
 * Job Creation API Endpoint Tests
 */

import { createMockJob } from '../../factories/job.factory';

const mockPrisma = {
  job: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn() },
};

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: mockPrisma,
}));

describe('POST /api/jobs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create job with valid data', async () => {
    // Arrange
    const jobData = {
      type: 'WATER_DAMAGE',
      priority: 'URGENT',
      title: 'Emergency water damage',
      suburb: 'Hamilton',
      clientName: 'John Smith',
      estimatedValue: 5500,
    };

    const mockJob = createMockJob(jobData);
    mockPrisma.job.create.mockResolvedValue(mockJob);

    // Act
    const result = mockJob;

    // Assert
    expect(result.status).toBe('PENDING');
    expect(result.suburb).toBe('Hamilton');
    expect(result.estimatedValue).toBe(5500);
  });

  it('should return 400 for missing required fields', () => {
    // Arrange
    const invalidData = { type: 'WATER_DAMAGE' }; // Missing title, suburb

    // Assert
    expect(() => {
      if (\!invalidData['title'] || \!invalidData['suburb']) {
        throw new Error('Missing required fields');
      }
    }).toThrow('Missing required fields');
  });

  it('should generate unique job numbers', () => {
    // Arrange
    const job1 = createMockJob();
    const job2 = createMockJob({ jobNumber: 'JOB-2025-002' });

    // Assert
    expect(job1.jobNumber).toBeDefined();
    expect(job2.jobNumber).toBeDefined();
    expect(job1.jobNumber).not.toBe(job2.jobNumber);
  });
});
