/**
 * Scheduling Service Tests
 */

import { createMockJob } from '../factories/job.factory';

const mockPrisma = { job: { findMany: jest.fn() } };
jest.mock('@/lib/prisma', () => ({ __esModule: true, default: mockPrisma }));

describe('SchedulingService', () => {
  it('should detect overlapping schedules', () => {
    const job1 = createMockJob({ scheduledStart: new Date('2025-11-05T09:00:00Z'), scheduledEnd: new Date('2025-11-05T17:00:00Z') });
    const job2 = { scheduledStart: new Date('2025-11-05T14:00:00Z'), scheduledEnd: new Date('2025-11-05T20:00:00Z') };
    
    const hasConflict = (j1, j2) => {
      const start1 = new Date(j1.scheduledStart).getTime();
      const end1 = new Date(j1.scheduledEnd).getTime();
      const start2 = new Date(j2.scheduledStart).getTime();
      const end2 = new Date(j2.scheduledEnd).getTime();
      return start1 < end2 && start2 < end1;
    };
    
    expect(hasConflict(job1, job2)).toBe(true);
  });
});
