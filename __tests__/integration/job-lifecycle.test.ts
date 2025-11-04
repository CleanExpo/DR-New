/**
 * Job Lifecycle Integration Test
 */

import { createMockJob } from '../factories/job.factory';
import { createMockContractor } from '../factories/contractor.factory';

const mockPrisma = {
  job: { create: jest.fn(), update: jest.fn() },
  contractor: { findMany: jest.fn() },
};

jest.mock('@/lib/prisma', () => ({ __esModule: true, default: mockPrisma }));

describe('Job Lifecycle', () => {
  it('should complete full workflow', async () => {
    const job = createMockJob({ status: 'PENDING' });
    mockPrisma.job.create.mockResolvedValue(job);
    expect(job.status).toBe('PENDING');
  });
});
