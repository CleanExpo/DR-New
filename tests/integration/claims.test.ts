/**
 * Integration tests for Insurance Claims API routes
 *
 * Tests: POST /api/claims, GET /api/claims/[id],
 *        POST /api/claims/[id]/documents, GET /api/claims/[id]/report
 */

import { GET as LIST_CLAIMS, POST as CREATE_CLAIM } from '@/app/api/claims/route';
import { GET as GET_CLAIM } from '@/app/api/claims/[id]/route';
import { GET as GET_DOCUMENTS, POST as ADD_DOCUMENT } from '@/app/api/claims/[id]/documents/route';
import { GET as GET_REPORT } from '@/app/api/claims/[id]/report/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin } from '@tests/factories/userFactory';
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

const mockSubmitInsuranceClaim = jest.fn();
const mockGetInsuranceProviders = jest.fn();
const mockGetClaimStatus = jest.fn();
const mockUpdateClaimStatus = jest.fn();

jest.mock('@/lib/services/insurance.service', () => ({
  submitInsuranceClaim: (...args: any[]) => mockSubmitInsuranceClaim(...args),
  getInsuranceProviders: (...args: any[]) => mockGetInsuranceProviders(...args),
  getClaimStatus: (...args: any[]) => mockGetClaimStatus(...args),
  updateClaimStatus: (...args: any[]) => mockUpdateClaimStatus(...args),
}));

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

/** The claims/[id] routes use the older non-async params style */
function routeContext(id: string) {
  return { params: { id } };
}

// ---------------------------------------------------------------------------
// Shared Fixtures
// ---------------------------------------------------------------------------

function createMockClaim(overrides: Record<string, any> = {}) {
  return {
    id: 'claim-1',
    claimNumber: 'CLM-2026-00001',
    clientId: 'user-1',
    policyNumber: 'POL-123456',
    status: 'SUBMITTED',
    damageDescription: 'Water damage to kitchen ceiling',
    damagePhotos: ['https://storage.example.com/photo1.jpg', 'https://storage.example.com/photo2.jpg'],
    invoiceUrl: 'https://storage.example.com/invoice.pdf',
    estimateUrl: 'https://storage.example.com/estimate.pdf',
    additionalDocuments: ['https://storage.example.com/report.pdf'],
    totalClaimAmountAUD: 15000,
    approvedAmountAUD: null,
    paymentAmountAUD: null,
    denialReason: null,
    createdAt: new Date('2026-02-15'),
    submittedAt: new Date('2026-02-15'),
    reviewedAt: null,
    approvedAt: null,
    deniedAt: null,
    paidAt: null,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Claims API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================================================================
  // POST /api/claims
  // =========================================================================

  describe('POST /api/claims', () => {
    it('should create a claim and return 201', async () => {
      const user = createMockUser({ id: 'user-1' });
      authenticateAs(user);

      mockSubmitInsuranceClaim.mockResolvedValue({
        success: true,
        claimId: 'claim-1',
        claimNumber: 'CLM-2026-00001',
        message: 'Insurance claim submitted successfully',
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/claims',
        body: {
          bookingId: 'booking-1',
          insuranceProvider: 'NRMA',
          policyNumber: 'POL-123456',
          totalClaimAmountAUD: 15000,
          damageDescription: 'Water damage to kitchen ceiling',
          damagePhotos: ['https://storage.example.com/photo1.jpg'],
        },
      });

      const response = await CREATE_CLAIM(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.claimId).toBe('claim-1');
      expect(data.data.claimNumber).toBe('CLM-2026-00001');
    });

    it('should return 400 when required fields are missing', async () => {
      const user = createMockUser();
      authenticateAs(user);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/claims',
        body: {
          bookingId: 'booking-1',
          // missing insuranceProvider, policyNumber, etc.
        },
      });

      const response = await CREATE_CLAIM(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
      expect(data.details).toEqual(
        expect.arrayContaining(['insuranceProvider', 'policyNumber', 'totalClaimAmountAUD', 'damageDescription', 'damagePhotos'])
      );
    });

    it('should return 401 when unauthenticated', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/claims',
        body: {
          bookingId: 'booking-1',
          insuranceProvider: 'NRMA',
          policyNumber: 'POL-123456',
          totalClaimAmountAUD: 15000,
          damageDescription: 'Water damage',
          damagePhotos: ['https://storage.example.com/photo1.jpg'],
        },
      });

      const response = await CREATE_CLAIM(request);
      expect(response.status).toBe(401);
    });

    it('should return 400 when service returns failure', async () => {
      const user = createMockUser();
      authenticateAs(user);

      mockSubmitInsuranceClaim.mockResolvedValue({
        success: false,
        message: 'Booking not found or already has an active claim',
        error: 'DUPLICATE_CLAIM',
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/claims',
        body: {
          bookingId: 'booking-1',
          insuranceProvider: 'NRMA',
          policyNumber: 'POL-123456',
          totalClaimAmountAUD: 15000,
          damageDescription: 'Water damage',
          damagePhotos: ['https://storage.example.com/photo1.jpg'],
        },
      });

      const response = await CREATE_CLAIM(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Booking not found');
    });
  });

  // =========================================================================
  // GET /api/claims/[id]
  // =========================================================================

  describe('GET /api/claims/[id]', () => {
    it('should return claim with linked job data', async () => {
      const user = createMockUser({ id: 'user-1' });
      authenticateAs(user);

      const claim = createMockClaim({
        clientId: user.id,
        insuranceProvider: {
          name: 'NRMA Insurance',
          code: 'NRMA',
          contactEmail: 'claims@nrma.com.au',
          contactPhone: '1300 123 456',
        },
        booking: {
          id: 'booking-1',
          australianServiceType: 'WATER_DAMAGE',
          description: 'Kitchen flooding',
          estimatedCostAUD: 12000,
          finalCostAUD: 14500,
          contractor: {
            businessName: 'Acme Restoration',
          },
        },
      });

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue(claim as any);
      mockGetClaimStatus.mockResolvedValue({
        currentStatus: 'SUBMITTED',
        lastUpdated: new Date().toISOString(),
      });

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/claims/claim-1',
      });

      const response = await GET_CLAIM(request, routeContext('claim-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.claimNumber).toBe('CLM-2026-00001');
      expect(data.data.booking).toBeDefined();
      expect(data.data.booking.contractor.businessName).toBe('Acme Restoration');
      expect(data.data.insuranceProvider.name).toBe('NRMA Insurance');
    });

    it('should return 404 for non-existent claim', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/claims/nonexistent',
      });

      const response = await GET_CLAIM(request, routeContext('nonexistent'));
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Claim not found');
    });

    it('should return 403 when user is not claim owner or admin', async () => {
      const user = createMockUser({ id: 'user-2' });
      authenticateAs(user);
      // Override userType to ensure it's not admin
      prismaMock.user.findUnique.mockResolvedValue({
        ...user,
        userType: 'USER',
        tenantId: 'tenant-1',
      } as any);

      const claim = createMockClaim({ clientId: 'user-1' }); // different owner
      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue(claim as any);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/claims/claim-1',
      });

      const response = await GET_CLAIM(request, routeContext('claim-1'));
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toContain('Not authorized');
    });

    it('should allow admin to view any claim', async () => {
      const admin = createMockAdmin({ id: 'admin-1' });
      authenticateAs(admin);
      // Set userType to ADMIN
      prismaMock.user.findUnique.mockResolvedValue({
        ...admin,
        userType: 'ADMIN',
        tenantId: 'tenant-1',
      } as any);

      const claim = createMockClaim({ clientId: 'user-1' }); // different owner
      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue(claim as any);
      mockGetClaimStatus.mockResolvedValue({ currentStatus: 'SUBMITTED' });

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/claims/claim-1',
      });

      const response = await GET_CLAIM(request, routeContext('claim-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  // =========================================================================
  // POST /api/claims/[id]/documents
  // =========================================================================

  describe('POST /api/claims/[id]/documents', () => {
    it('should add a photo document and return 200', async () => {
      const user = createMockUser({ id: 'user-1' });
      authenticateAs(user);
      prismaMock.user.findUnique.mockResolvedValue({
        ...user,
        userType: 'USER',
        tenantId: 'tenant-1',
      } as any);

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue({
        clientId: user.id,
        damagePhotos: ['https://storage.example.com/photo1.jpg'],
        additionalDocuments: [],
      } as any);
      prismaMock.insuranceClaimAU.update.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/claims/claim-1/documents',
        body: {
          url: 'https://storage.example.com/photo2.jpg',
          category: 'photo',
        },
      });

      const response = await ADD_DOCUMENT(request, routeContext('claim-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Document added');

      // Verify the photo was appended
      expect(prismaMock.insuranceClaimAU.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            damagePhotos: ['https://storage.example.com/photo1.jpg', 'https://storage.example.com/photo2.jpg'],
          }),
        })
      );
    });

    it('should add an invoice document and return 200', async () => {
      const user = createMockUser({ id: 'user-1' });
      authenticateAs(user);
      prismaMock.user.findUnique.mockResolvedValue({
        ...user,
        userType: 'USER',
        tenantId: 'tenant-1',
      } as any);

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue({
        clientId: user.id,
        damagePhotos: [],
        additionalDocuments: [],
      } as any);
      prismaMock.insuranceClaimAU.update.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/claims/claim-1/documents',
        body: {
          url: 'https://storage.example.com/invoice.pdf',
          category: 'invoice',
        },
      });

      const response = await ADD_DOCUMENT(request, routeContext('claim-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      expect(prismaMock.insuranceClaimAU.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            invoiceUrl: 'https://storage.example.com/invoice.pdf',
          }),
        })
      );
    });

    it('should return 400 when URL is missing', async () => {
      const user = createMockUser({ id: 'user-1' });
      authenticateAs(user);
      prismaMock.user.findUnique.mockResolvedValue({
        ...user,
        userType: 'USER',
        tenantId: 'tenant-1',
      } as any);

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue({
        clientId: user.id,
        damagePhotos: [],
        additionalDocuments: [],
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/claims/claim-1/documents',
        body: {
          category: 'photo',
          // url missing
        },
      });

      const response = await ADD_DOCUMENT(request, routeContext('claim-1'));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('URL is required');
    });

    it('should return 404 when claim does not exist', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/claims/nonexistent/documents',
        body: {
          url: 'https://storage.example.com/photo.jpg',
          category: 'photo',
        },
      });

      const response = await ADD_DOCUMENT(request, routeContext('nonexistent'));
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Claim not found');
    });
  });

  // =========================================================================
  // GET /api/claims/[id]/report
  // =========================================================================

  describe('GET /api/claims/[id]/report', () => {
    it('should return structured report data', async () => {
      const user = createMockUser({ id: 'user-1' });
      authenticateAs(user);
      prismaMock.user.findUnique.mockResolvedValue({
        ...user,
        userType: 'USER',
        tenantId: 'tenant-1',
      } as any);

      const claim = createMockClaim({
        clientId: user.id,
        totalClaimAmountAUD: 15000,
        approvedAmountAUD: 13500,
        paymentAmountAUD: null,
        insuranceProvider: {
          name: 'NRMA Insurance',
          code: 'NRMA',
          contactEmail: 'claims@nrma.com.au',
          contactPhone: '1300 123 456',
        },
        booking: {
          id: 'booking-1',
          australianServiceType: 'WATER_DAMAGE',
          description: 'Kitchen flooding from burst pipe',
          streetAddress: '42 Wallaby Way',
          serviceSuburb: 'Sydney',
          servicePostcode: '2000',
          serviceState: 'NSW',
          estimatedCostAUD: 12000,
          finalCostAUD: 14500,
          status: 'COMPLETED',
          scheduledDate: new Date('2026-02-20'),
          startedAt: new Date('2026-02-20'),
          completedAt: new Date('2026-02-22'),
          contractor: {
            businessName: 'Acme Restoration',
            licenceNumber: 'LIC-NSW-12345',
            user: {
              name: 'John Smith',
              email: 'john@acme.com.au',
            },
          },
        },
        client: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          streetAddress: '10 Martin Place',
          suburb: 'Sydney',
          australianPostcode: '2000',
          australianState: 'NSW',
        },
        inspectionReports: [
          {
            reportNumber: 'RPT-001',
            inspectionDate: new Date('2026-02-18'),
            overallCondition: 'Significant water damage',
            scopeOfWork: 'Full kitchen restoration',
            findings: 'Burst pipe under sink, water spread to subfloor',
            recommendations: 'Replace subfloor, treat for mould',
          },
        ],
      });

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue(claim as any);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/claims/claim-1/report',
      });

      const response = await GET_REPORT(request, routeContext('claim-1'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      const report = data.report;

      // Verify report structure
      expect(report.claimNumber).toBe('CLM-2026-00001');
      expect(report.generatedAt).toBeDefined();

      // Client info
      expect(report.client.name).toBe('Jane Doe');
      expect(report.client.email).toBe('jane@example.com');

      // Insurance info
      expect(report.insurance.provider).toBe('NRMA Insurance');
      expect(report.insurance.policyNumber).toBe('POL-123456');

      // Financials
      expect(report.financials.totalClaimAmount).toBe(15000);
      expect(report.financials.approvedAmount).toBe(13500);
      expect(report.financials.estimatedJobCost).toBe(12000);
      expect(report.financials.finalJobCost).toBe(14500);

      // Job/booking info
      expect(report.job).toBeDefined();
      expect(report.job.contractor.businessName).toBe('Acme Restoration');
      expect(report.job.contractor.licenceNumber).toBe('LIC-NSW-12345');

      // Inspection reports
      expect(report.inspectionReports).toHaveLength(1);
      expect(report.inspectionReports[0].reportNumber).toBe('RPT-001');

      // Documents
      expect(report.documents.invoiceUrl).toBeDefined();
      expect(report.documents.estimateUrl).toBeDefined();

      // Timeline
      expect(report.timeline.created).toBeDefined();
      expect(report.timeline.submitted).toBeDefined();
    });

    it('should return 404 for non-existent claim', async () => {
      const user = createMockUser();
      authenticateAs(user);

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/claims/nonexistent/report',
      });

      const response = await GET_REPORT(request, routeContext('nonexistent'));
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Claim not found');
    });

    it('should return 403 when user is not authorised', async () => {
      const user = createMockUser({ id: 'user-2' });
      authenticateAs(user);
      prismaMock.user.findUnique.mockResolvedValue({
        ...user,
        userType: 'USER',
        tenantId: 'tenant-1',
      } as any);

      const claim = createMockClaim({ clientId: 'user-1' }); // different owner
      // Add required nested includes for the report query
      (claim as any).insuranceProvider = { name: 'Test', code: 'T', contactEmail: '', contactPhone: '' };
      (claim as any).booking = null;
      (claim as any).client = { name: 'Other', email: 'other@test.com', streetAddress: '', suburb: '', australianPostcode: '', australianState: '' };
      (claim as any).inspectionReports = [];

      prismaMock.insuranceClaimAU.findUnique.mockResolvedValue(claim as any);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/claims/claim-1/report',
      });

      const response = await GET_REPORT(request, routeContext('claim-1'));
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toContain('Not authorised');
    });
  });
});
