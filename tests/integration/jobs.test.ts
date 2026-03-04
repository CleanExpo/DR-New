/**
 * Integration tests for Jobs API routes
 *
 * Tests: POST /api/jobs, GET /api/jobs, PATCH /api/jobs/[id],
 *        POST /api/jobs/[id]/assign, POST /api/jobs/[id]/complete,
 *        POST /api/jobs/[id]/invoice
 */

import { GET, POST } from '@/app/api/jobs/route';
import { GET as GET_JOB, PATCH } from '@/app/api/jobs/[id]/route';
import { POST as ASSIGN } from '@/app/api/jobs/[id]/assign/route';
import { POST as COMPLETE } from '@/app/api/jobs/[id]/complete/route';
import { POST as INVOICE } from '@/app/api/jobs/[id]/invoice/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin, createMockContractor } from '@tests/factories/userFactory';
import { prismaMock } from '@tests/mocks/prisma';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
  getServerSession: () => mockGetServerSession(),
}));

jest.mock('@/lib/auth', () => ({
  authOptions: {},
  verifyToken: jest.fn(),
}));

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
  basePrisma: prismaMock,
}));

jest.mock('@/lib/get-tenant-db', () => ({
  getTenantDb: () => prismaMock,
}));

jest.mock('@/lib/tenant-resolver', () => ({
  resolveTenant: jest.fn().mockResolvedValue({ tenantId: 'tenant-1' }),
}));

jest.mock('@/lib/notifications/job-notifications', () => ({
  notifyJobCreated: jest.fn().mockResolvedValue(undefined),
  notifyContractorAssigned: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/lib/jobs', () => {
  const { z } = jest.requireActual('zod');
  return {
    generateJobNumber: jest.fn().mockResolvedValue('NRP-2026-12345'),
    createJobSchema: z.object({
      type: z.enum(['water', 'fire', 'mould', 'storm', 'asbestos']),
      propertyId: z.string().min(1),
      estimatedCost: z.number().positive().optional(),
      scheduledDate: z.string().datetime().optional(),
      notes: z.string().max(2000).optional(),
      insuranceClaimId: z.string().optional(),
    }),
    updateJobSchema: z.object({
      status: z.enum(['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'INVOICED', 'PAID']).optional(),
      notes: z.string().max(2000).optional(),
      estimatedCost: z.number().positive().optional(),
      actualCost: z.number().positive().optional(),
      scheduledDate: z.string().datetime().optional(),
    }),
    assignContractorSchema: z.object({
      contractorId: z.string().min(1),
    }),
    completeJobSchema: z.object({
      hoursWorked: z.number().positive(),
      materialsUsed: z.string().max(2000).optional(),
      actualCost: z.number().positive(),
      completedDate: z.string().datetime().optional(),
    }),
  };
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function authenticateAs(user: ReturnType<typeof createMockUser>) {
  mockGetServerSession.mockResolvedValue({
    user: { id: user.id, email: user.email, role: user.role },
  });
  prismaMock.user.findUnique.mockResolvedValue({
    ...user,
    userType: user.role,
    tenantId: 'tenant-1',
  } as any);
}

/** Wraps params into the Next.js 15 async-params shape */
function routeContext(id: string) {
  return { params: Promise.resolve({ id }) };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Jobs API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================================================================
  // POST /api/jobs
  // =========================================================================

  describe('POST /api/jobs', () => {
    it('should create a job and return 201 with NRP-YYYY-XXXXX format jobNumber', async () => {
      const user = createMockUser();
      authenticateAs(user);

      const propertyId = 'prop-1';
      prismaMock.clientProperty.findUnique.mockResolvedValue({ id: propertyId } as any);
      prismaMock.job.create.mockResolvedValue({
        id: 'job-1',
        jobNumber: 'NRP-2026-12345',
        type: 'water',
        propertyId,
        clientId: user.id,
        status: 'PENDING',
        property: {
          id: propertyId,
          streetAddress: '42 Wallaby Way',
          suburb: 'Sydney',
          state: 'NSW',
          postcode: '2000',
        },
      } as any);
      prismaMock.auditLog.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs',
        body: {
          type: 'water',
          propertyId,
          estimatedCost: 1500,
          notes: 'Water damage in kitchen',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.jobNumber).toMatch(/^NRP-\d{4}-\d{5}$/);
    });

    it('should return 400 when required fields are missing', async () => {
      const user = createMockUser();
      authenticateAs(user);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs',
        body: {
          // missing type and propertyId
          notes: 'Incomplete request',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
      expect(data.details).toBeDefined();
      expect(data.details.length).toBeGreaterThan(0);
    });

    it('should return 401 when unauthenticated', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs',
        body: {
          type: 'fire',
          propertyId: 'prop-1',
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(401);
    });

    it('should return 404 when property does not exist', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.clientProperty.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs',
        body: {
          type: 'water',
          propertyId: 'nonexistent-prop',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Property not found');
    });
  });

  // =========================================================================
  // GET /api/jobs
  // =========================================================================

  describe('GET /api/jobs', () => {
    it('should return paginated job list', async () => {
      const user = createMockUser();
      authenticateAs(user);

      const mockJobs = [
        { id: 'job-1', jobNumber: 'NRP-2026-10001', status: 'PENDING', type: 'water' },
        { id: 'job-2', jobNumber: 'NRP-2026-10002', status: 'COMPLETED', type: 'fire' },
      ];

      prismaMock.job.findMany.mockResolvedValue(mockJobs as any);
      prismaMock.job.count.mockResolvedValue(2);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/jobs',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.pagination).toBeDefined();
      expect(data.pagination.total).toBe(2);
    });

    it('should filter by status', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findMany.mockResolvedValue([]);
      prismaMock.job.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/jobs?status=COMPLETED',
      });

      await GET(request);

      expect(prismaMock.job.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 'COMPLETED',
          }),
        })
      );
    });

    it('should filter by type', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findMany.mockResolvedValue([]);
      prismaMock.job.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/jobs?type=water',
      });

      await GET(request);

      expect(prismaMock.job.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            type: 'water',
          }),
        })
      );
    });

    it('should reject unauthenticated requests', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/jobs',
      });

      const response = await GET(request);
      expect(response.status).toBe(401);
    });
  });

  // =========================================================================
  // PATCH /api/jobs/[id]
  // =========================================================================

  describe('PATCH /api/jobs/[id]', () => {
    it('should update job status and return 200', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'PENDING',
      } as any);
      prismaMock.job.update.mockResolvedValue({
        id: 'job-1',
        status: 'IN_PROGRESS',
      } as any);
      prismaMock.auditLog.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/jobs/job-1',
        body: { status: 'IN_PROGRESS' },
      });

      const response = await PATCH(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.status).toBe('IN_PROGRESS');
    });

    it('should return 400 for invalid status value', async () => {
      const user = createMockUser();
      authenticateAs(user);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/jobs/job-1',
        body: { status: 'INVALID_STATUS' },
      });

      const response = await PATCH(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
    });

    it('should return 404 for non-existent job', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/jobs/no-such-job',
        body: { status: 'IN_PROGRESS' },
      });

      const response = await PATCH(request, routeContext('no-such-job'));
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Job not found');
    });
  });

  // =========================================================================
  // POST /api/jobs/[id]/assign
  // =========================================================================

  describe('POST /api/jobs/[id]/assign', () => {
    it('should assign a verified contractor and return 200', async () => {
      const admin = createMockAdmin();
      authenticateAs(admin);

      const contractorId = 'contractor-1';
      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'PENDING',
        jobNumber: 'NRP-2026-10001',
      } as any);
      prismaMock.contractor.findUnique.mockResolvedValue({
        id: contractorId,
        businessName: 'Acme Restoration',
        isVerified: true,
        isActive: true,
        isSuspended: false,
      } as any);
      prismaMock.job.update.mockResolvedValue({
        id: 'job-1',
        status: 'ASSIGNED',
        contractorId,
        contractor: {
          id: contractorId,
          businessName: 'Acme Restoration',
          isVerified: true,
        },
      } as any);
      prismaMock.auditLog.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/assign',
        body: { contractorId },
      });

      const response = await ASSIGN(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.contractorId).toBe(contractorId);
    });

    it('should return 400 for suspended contractor', async () => {
      const admin = createMockAdmin();
      authenticateAs(admin);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'PENDING',
        jobNumber: 'NRP-2026-10001',
      } as any);
      prismaMock.contractor.findUnique.mockResolvedValue({
        id: 'contractor-suspended',
        businessName: 'Dodgy Builders',
        isVerified: true,
        isActive: true,
        isSuspended: true,
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/assign',
        body: { contractorId: 'contractor-suspended' },
      });

      const response = await ASSIGN(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('not currently active');
    });

    it('should return 400 for unverified contractor', async () => {
      const admin = createMockAdmin();
      authenticateAs(admin);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'PENDING',
        jobNumber: 'NRP-2026-10001',
      } as any);
      prismaMock.contractor.findUnique.mockResolvedValue({
        id: 'contractor-unverified',
        businessName: 'New Builders',
        isVerified: false,
        isActive: true,
        isSuspended: false,
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/assign',
        body: { contractorId: 'contractor-unverified' },
      });

      const response = await ASSIGN(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('verified');
    });

    it('should return 400 when job is not in PENDING status', async () => {
      const admin = createMockAdmin();
      authenticateAs(admin);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'COMPLETED',
        jobNumber: 'NRP-2026-10001',
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/assign',
        body: { contractorId: 'contractor-1' },
      });

      const response = await ASSIGN(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Cannot assign');
    });
  });

  // =========================================================================
  // POST /api/jobs/[id]/complete
  // =========================================================================

  describe('POST /api/jobs/[id]/complete', () => {
    it('should complete a job with valid data and return 200', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'IN_PROGRESS',
        jobNumber: 'NRP-2026-10001',
        contractorId: 'contractor-1',
      } as any);
      prismaMock.job.update.mockResolvedValue({
        id: 'job-1',
        status: 'COMPLETED',
        hoursWorked: 8,
        actualCost: 2400,
        materialsUsed: 'Dehumidifiers, drying fans',
      } as any);
      prismaMock.auditLog.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/complete',
        body: {
          hoursWorked: 8,
          actualCost: 2400,
          materialsUsed: 'Dehumidifiers, drying fans',
        },
      });

      const response = await COMPLETE(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.status).toBe('COMPLETED');
    });

    it('should return 400 when hoursWorked is missing', async () => {
      const user = createMockUser();
      authenticateAs(user);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/complete',
        body: {
          actualCost: 2400,
          // hoursWorked missing
        },
      });

      const response = await COMPLETE(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: expect.arrayContaining(['hoursWorked']) }),
        ])
      );
    });

    it('should return 400 when job is in PENDING status', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'PENDING',
        jobNumber: 'NRP-2026-10001',
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/complete',
        body: {
          hoursWorked: 8,
          actualCost: 2400,
        },
      });

      const response = await COMPLETE(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Cannot complete');
    });
  });

  // =========================================================================
  // POST /api/jobs/[id]/invoice
  // =========================================================================

  describe('POST /api/jobs/[id]/invoice', () => {
    it('should generate invoice with GST for a completed job', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        jobNumber: 'NRP-2026-10001',
        type: 'water',
        status: 'COMPLETED',
        contractorId: 'contractor-1',
        actualCost: 2000,
        hoursWorked: 10,
        materialsUsed: 'Drying equipment',
        completedDate: new Date('2026-03-01'),
        property: {
          streetAddress: '42 Wallaby Way',
          suburb: 'Sydney',
          state: 'NSW',
          postcode: '2000',
        },
        contractor: {
          id: 'contractor-1',
          businessName: 'Acme Restoration',
          abnNumber: '12345678901',
        },
      } as any);
      prismaMock.job.update.mockResolvedValue({} as any);
      prismaMock.auditLog.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/invoice',
      });

      const response = await INVOICE(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      // Verify GST calculation (10% in Australia)
      expect(data.data.subtotalAUD).toBe(2000);
      expect(data.data.gstAUD).toBe(200);
      expect(data.data.totalAUD).toBe(2200);

      // Verify contractor details
      expect(data.data.contractor.name).toBe('Acme Restoration');
      expect(data.data.contractor.abn).toBe('12345678901');

      // Verify job number in response
      expect(data.data.jobNumber).toBe('NRP-2026-10001');
    });

    it('should return 400 when job is not completed', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'IN_PROGRESS',
        contractor: { id: 'c1', businessName: 'Test' },
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/invoice',
      });

      const response = await INVOICE(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('completed');
    });

    it('should return 400 when job has no actual cost', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findUnique.mockResolvedValue({
        id: 'job-1',
        status: 'COMPLETED',
        contractorId: 'contractor-1',
        actualCost: null,
        contractor: { id: 'contractor-1', businessName: 'Test', abnNumber: '123' },
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/job-1/invoice',
      });

      const response = await INVOICE(request, routeContext('job-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('actual cost');
    });

    it('should return 404 when job does not exist', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.job.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/jobs/nonexistent/invoice',
      });

      const response = await INVOICE(request, routeContext('nonexistent'));
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Job not found');
    });
  });
});
