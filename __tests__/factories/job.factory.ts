import { JobPriority, JobStatus, JobType } from '@prisma/client';

export const createMockJob = (overrides = {}) => ({
  id: 'job-123',
  jobNumber: 'JOB-2025-001',
  type: JobType.WATER_DAMAGE,
  priority: JobPriority.HIGH,
  status: JobStatus.PENDING,
  title: 'Emergency Water Damage - Hamilton Residence',
  description: 'Burst pipe in master bathroom causing ceiling damage',
  
  // Location details
  addressLine1: '15 Riverside Drive',
  addressLine2: '',
  suburb: 'Hamilton',
  state: 'QLD',
  postcode: '4007',
  latitude: -27.4381,
  longitude: 153.0614,
  
  // Contact details
  clientName: 'John Smith',
  clientPhone: '0412345678',
  clientEmail: 'john.smith@example.com',
  
  // Scheduling
  scheduledStart: new Date('2025-11-05T09:00:00Z'),
  scheduledEnd: new Date('2025-11-05T17:00:00Z'),
  estimatedDuration: 8,
  
  // Financial
  estimatedValue: 5500.00,
  actualCost: null,
  
  // Insurance
  insuranceClaimNumber: 'INS-2025-12345',
  insuranceCompany: 'Suncorp',
  excessAmount: 500.00,
  
  // Metadata
  createdAt: new Date('2025-11-04T08:00:00Z'),
  updatedAt: new Date('2025-11-04T08:00:00Z'),
  createdBy: 'user-admin',
  assignedContractorId: null,
  notes: [],
  photos: [],
  
  ...overrides,
});

export const createMockJobList = (count: number = 5) => {
  const jobs = [];
  const suburbs = ['Hamilton', 'Ascot', 'New Farm', 'Toowong', 'Karalee'];
  const types = [JobType.WATER_DAMAGE, JobType.FIRE_DAMAGE, JobType.MOULD_REMEDIATION, JobType.STORM_DAMAGE];
  const priorities = [JobPriority.URGENT, JobPriority.HIGH, JobPriority.MEDIUM, JobPriority.LOW];
  
  for (let i = 0; i < count; i++) {
    jobs.push(createMockJob({
      id: `job-${i + 1}`,
      jobNumber: `JOB-2025-${String(i + 1).padStart(3, '0')}`,
      suburb: suburbs[i % suburbs.length],
      type: types[i % types.length],
      priority: priorities[i % priorities.length],
      estimatedValue: 2000 + (i * 1000),
    }));
  }
  
  return jobs;
};
