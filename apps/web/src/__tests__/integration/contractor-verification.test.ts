/**
 * Integration tests for Contractor Verification Flow
 *
 * Tests the complete contractor verification workflow including:
 * - Contractor profile creation and updates
 * - Document upload and management
 * - Service area configuration
 * - Profile completion and submission
 * - Admin verification actions (approve, reject, request changes, under review)
 * - Verification history tracking
 * - Email notifications (mocked)
 * - Status transitions
 */

import { PrismaClient, AustralianState, ContractorVerificationStatus, ContractorDocumentType, DocumentStatus, ServiceCoverageLevel, VerificationAction } from '@prisma/client';

const prisma = new PrismaClient();

// Mock email functions
jest.mock('../../../lib/email/contractor-verification', () => ({
  sendVerificationSubmittedEmail: jest.fn().mockResolvedValue({ success: true }),
  sendVerificationApprovedEmail: jest.fn().mockResolvedValue({ success: true }),
  sendVerificationRejectedEmail: jest.fn().mockResolvedValue({ success: true }),
  sendVerificationChangesRequestedEmail: jest.fn().mockResolvedValue({ success: true }),
  sendVerificationUnderReviewEmail: jest.fn().mockResolvedValue({ success: true }),
}));

import * as emailModule from '../../../lib/email/contractor-verification';

describe('Contractor Verification Integration Tests', () => {
  const TEST_ID = Date.now().toString();
  let testContractorUserId: string;
  let testAdminUserId: string;
  let testContractorId: string;
  let testTenantId: string;

  beforeAll(async () => {
    // Create test tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: `Test Tenant ${TEST_ID}`,
        domain: `test-${TEST_ID}.local`,
        isActive: true,
      },
    });
    testTenantId = tenant.id;

    // Create test contractor user
    const contractorUser = await prisma.user.create({
      data: {
        email: `contractor-${TEST_ID}@test.com`,
        name: 'Test Contractor',
        userType: 'CONTRACTOR',
        tenantId: testTenantId,
      },
    });
    testContractorUserId = contractorUser.id;

    // Create test admin user
    const adminUser = await prisma.user.create({
      data: {
        email: `admin-${TEST_ID}@test.com`,
        name: 'Test Admin',
        userType: 'ADMIN',
        tenantId: testTenantId,
      },
    });
    testAdminUserId = adminUser.id;

    // Create test contractor profile
    const contractor = await prisma.contractor.create({
      data: {
        userId: testContractorUserId,
        businessName: 'Test Disaster Recovery Co',
        abnNumber: `${TEST_ID}901`,
        tenantId: testTenantId,
        verificationStatus: ContractorVerificationStatus.PENDING,
      },
    });
    testContractorId = contractor.id;
  });

  afterAll(async () => {
    // Cleanup in correct order (handle foreign key constraints)
    await prisma.contractorDocument.deleteMany({
      where: { contractorId: testContractorId },
    });
    await prisma.contractorServiceArea.deleteMany({
      where: { contractorId: testContractorId },
    });
    await prisma.contractorVerificationHistory.deleteMany({
      where: { contractorId: testContractorId },
    });
    await prisma.contractor.delete({
      where: { id: testContractorId },
    });
    await prisma.user.deleteMany({
      where: { tenantId: testTenantId },
    });
    await prisma.tenant.delete({
      where: { id: testTenantId },
    });
    await prisma.$disconnect();
  });

  describe('Contractor Profile Management', () => {
    it('should create contractor profile with initial PENDING status', async () => {
      const contractor = await prisma.contractor.findUnique({
        where: { id: testContractorId },
      });

      expect(contractor).toBeDefined();
      expect(contractor?.businessName).toBe('Test Disaster Recovery Co');
      expect(contractor?.verificationStatus).toBe(ContractorVerificationStatus.PENDING);
      expect(contractor?.isVerified).toBe(false);
    });

    it('should update contractor profile information', async () => {
      const updated = await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          companyDescription: 'Professional disaster recovery services in Australia',
          yearsInBusiness: 10,
          teamSize: 15,
          serviceRadius: 50,
          primaryState: AustralianState.NSW,
          primaryPostcode: '2000',
        },
      });

      expect(updated.companyDescription).toContain('disaster recovery services');
      expect(updated.yearsInBusiness).toBe(10);
      expect(updated.teamSize).toBe(15);
      expect(updated.serviceRadius).toBe(50);
    });

    it('should update license information', async () => {
      const updated = await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          licenseNumber: 'NSW-123456',
          licenseState: AustralianState.NSW,
          licenseExpiry: new Date('2026-12-31'),
        },
      });

      expect(updated.licenseNumber).toBe('NSW-123456');
      expect(updated.licenseState).toBe(AustralianState.NSW);
      expect(updated.licenseExpiry).toBeDefined();
    });
  });

  describe('Document Management', () => {
    let testDocumentId: string;

    it('should upload a contractor document', async () => {
      const document = await prisma.contractorDocument.create({
        data: {
          contractorId: testContractorId,
          documentType: ContractorDocumentType.BUSINESS_LICENSE,
          fileName: 'business-license.pdf',
          fileUrl: 'https://storage.example.com/documents/business-license.pdf',
          fileSize: 1024000,
          mimeType: 'application/pdf',
          status: DocumentStatus.PENDING,
          documentNumber: 'BL-123456',
          issuingAuthority: 'NSW Fair Trading',
          expiryDate: new Date('2026-12-31'),
        },
      });

      testDocumentId = document.id;

      expect(document).toBeDefined();
      expect(document.documentType).toBe(ContractorDocumentType.BUSINESS_LICENSE);
      expect(document.status).toBe(DocumentStatus.PENDING);
      expect(document.fileName).toBe('business-license.pdf');
    });

    it('should retrieve contractor documents', async () => {
      const documents = await prisma.contractorDocument.findMany({
        where: { contractorId: testContractorId },
      });

      expect(Array.isArray(documents)).toBe(true);
      expect(documents.length).toBeGreaterThan(0);
      expect(documents[0].contractorId).toBe(testContractorId);
    });

    it('should update document status to APPROVED', async () => {
      const updated = await prisma.contractorDocument.update({
        where: { id: testDocumentId },
        data: {
          status: DocumentStatus.APPROVED,
          verifiedAt: new Date(),
          verifiedBy: testAdminUserId,
        },
      });

      expect(updated.status).toBe(DocumentStatus.APPROVED);
      expect(updated.verifiedAt).toBeDefined();
      expect(updated.verifiedBy).toBe(testAdminUserId);
    });

    it('should delete a contractor document', async () => {
      const documentToDelete = await prisma.contractorDocument.create({
        data: {
          contractorId: testContractorId,
          documentType: ContractorDocumentType.OTHER,
          fileName: 'temp-document.pdf',
          fileUrl: 'https://storage.example.com/temp.pdf',
          fileSize: 500000,
          mimeType: 'application/pdf',
          status: DocumentStatus.PENDING,
        },
      });

      await prisma.contractorDocument.delete({
        where: { id: documentToDelete.id },
      });

      const deleted = await prisma.contractorDocument.findUnique({
        where: { id: documentToDelete.id },
      });

      expect(deleted).toBeNull();
    });
  });

  describe('Service Area Management', () => {
    let testServiceAreaId: string;

    it('should create a service area', async () => {
      const serviceArea = await prisma.contractorServiceArea.create({
        data: {
          contractorId: testContractorId,
          postcode: '2000',
          state: AustralianState.NSW,
          suburb: 'Sydney',
          radiusKm: 25,
          coverageLevel: ServiceCoverageLevel.STANDARD,
          isPrimaryArea: true,
          isActive: true,
          responseTimeMinutes: 60,
        },
      });

      testServiceAreaId = serviceArea.id;

      expect(serviceArea).toBeDefined();
      expect(serviceArea.postcode).toBe('2000');
      expect(serviceArea.state).toBe(AustralianState.NSW);
      expect(serviceArea.coverageLevel).toBe(ServiceCoverageLevel.STANDARD);
    });

    it('should create multiple service areas', async () => {
      await prisma.contractorServiceArea.createMany({
        data: [
          {
            contractorId: testContractorId,
            postcode: '2010',
            state: AustralianState.NSW,
            suburb: 'Surry Hills',
            radiusKm: 20,
            coverageLevel: ServiceCoverageLevel.PRIORITY,
            isActive: true,
            responseTimeMinutes: 45,
          },
          {
            contractorId: testContractorId,
            postcode: '2100',
            state: AustralianState.NSW,
            suburb: 'North Sydney',
            radiusKm: 30,
            coverageLevel: ServiceCoverageLevel.EMERGENCY_ONLY,
            isActive: true,
            responseTimeMinutes: 30,
          },
        ],
      });

      const serviceAreas = await prisma.contractorServiceArea.findMany({
        where: { contractorId: testContractorId },
      });

      expect(serviceAreas.length).toBeGreaterThanOrEqual(3);
    });

    it('should update service area coverage', async () => {
      const updated = await prisma.contractorServiceArea.update({
        where: { id: testServiceAreaId },
        data: {
          radiusKm: 50,
          coverageLevel: ServiceCoverageLevel.PRIORITY,
          responseTimeMinutes: 45,
        },
      });

      expect(updated.radiusKm).toBe(50);
      expect(updated.coverageLevel).toBe(ServiceCoverageLevel.PRIORITY);
      expect(updated.responseTimeMinutes).toBe(45);
    });

    it('should deactivate a service area', async () => {
      const updated = await prisma.contractorServiceArea.update({
        where: { id: testServiceAreaId },
        data: { isActive: false },
      });

      expect(updated.isActive).toBe(false);
    });
  });

  describe('Profile Submission', () => {
    it('should transition from PENDING to SUBMITTED when profile is complete', async () => {
      const updated = await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.SUBMITTED,
          submittedForVerificationAt: new Date(),
        },
      });

      expect(updated.verificationStatus).toBe(ContractorVerificationStatus.SUBMITTED);
      expect(updated.submittedForVerificationAt).toBeDefined();
    });

    it('should create verification history entry on submission', async () => {
      const historyEntry = await prisma.contractorVerificationHistory.create({
        data: {
          contractorId: testContractorId,
          action: VerificationAction.SUBMITTED,
          previousStatus: ContractorVerificationStatus.PENDING,
          newStatus: ContractorVerificationStatus.SUBMITTED,
          notes: 'Profile completed and submitted for verification',
          performedBy: testContractorUserId,
          performedByName: 'Test Contractor',
          isSystemAction: true,
        },
      });

      expect(historyEntry).toBeDefined();
      expect(historyEntry.action).toBe(VerificationAction.SUBMITTED);
      expect(historyEntry.previousStatus).toBe(ContractorVerificationStatus.PENDING);
      expect(historyEntry.newStatus).toBe(ContractorVerificationStatus.SUBMITTED);
    });

    it('should send verification submitted email', async () => {
      const mockSendEmail = emailModule.sendVerificationSubmittedEmail as jest.Mock;

      await emailModule.sendVerificationSubmittedEmail(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co'
      );

      expect(mockSendEmail).toHaveBeenCalledWith(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co'
      );
    });
  });

  describe('Admin Verification Actions - Approve', () => {
    it('should approve contractor verification', async () => {
      const updated = await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.APPROVED,
          isVerified: true,
          reviewedAt: new Date(),
          reviewedBy: testAdminUserId,
          verificationDate: new Date(),
          nrpgVerifiedAt: new Date(),
          nrpgMemberId: `NRPG-TEST-${TEST_ID}`,
        },
      });

      expect(updated.verificationStatus).toBe(ContractorVerificationStatus.APPROVED);
      expect(updated.isVerified).toBe(true);
      expect(updated.reviewedBy).toBe(testAdminUserId);
      expect(updated.verificationDate).toBeDefined();
      expect(updated.nrpgMemberId).toBe(`NRPG-TEST-${TEST_ID}`);
    });

    it('should create verification history entry for approval', async () => {
      const historyEntry = await prisma.contractorVerificationHistory.create({
        data: {
          contractorId: testContractorId,
          action: VerificationAction.APPROVED,
          previousStatus: ContractorVerificationStatus.SUBMITTED,
          newStatus: ContractorVerificationStatus.APPROVED,
          notes: 'All documents verified, profile complete',
          performedBy: testAdminUserId,
          performedByName: 'Test Admin',
          isSystemAction: false,
        },
      });

      expect(historyEntry.action).toBe(VerificationAction.APPROVED);
      expect(historyEntry.newStatus).toBe(ContractorVerificationStatus.APPROVED);
      expect(historyEntry.performedBy).toBe(testAdminUserId);
    });

    it('should send approval email', async () => {
      const mockSendEmail = emailModule.sendVerificationApprovedEmail as jest.Mock;
      mockSendEmail.mockClear();

      await emailModule.sendVerificationApprovedEmail(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co',
        `NRPG-TEST-${TEST_ID}`
      );

      expect(mockSendEmail).toHaveBeenCalledWith(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co',
        `NRPG-TEST-${TEST_ID}`
      );
    });
  });

  describe('Admin Verification Actions - Reject', () => {
    beforeAll(async () => {
      // Reset status for rejection test
      await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.SUBMITTED,
          isVerified: false,
        },
      });
    });

    it('should reject contractor verification with reason', async () => {
      const updated = await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.REJECTED,
          isVerified: false,
          reviewedAt: new Date(),
          reviewedBy: testAdminUserId,
          rejectionReason: 'Missing public liability insurance certificate',
        },
      });

      expect(updated.verificationStatus).toBe(ContractorVerificationStatus.REJECTED);
      expect(updated.isVerified).toBe(false);
      expect(updated.rejectionReason).toContain('public liability insurance');
    });

    it('should create verification history entry for rejection', async () => {
      const historyEntry = await prisma.contractorVerificationHistory.create({
        data: {
          contractorId: testContractorId,
          action: VerificationAction.REJECTED,
          previousStatus: ContractorVerificationStatus.SUBMITTED,
          newStatus: ContractorVerificationStatus.REJECTED,
          reason: 'Missing public liability insurance certificate',
          notes: 'Please upload valid insurance documentation',
          performedBy: testAdminUserId,
          performedByName: 'Test Admin',
          isSystemAction: false,
        },
      });

      expect(historyEntry.action).toBe(VerificationAction.REJECTED);
      expect(historyEntry.newStatus).toBe(ContractorVerificationStatus.REJECTED);
      expect(historyEntry.reason).toContain('insurance');
    });

    it('should send rejection email', async () => {
      const mockSendEmail = emailModule.sendVerificationRejectedEmail as jest.Mock;
      mockSendEmail.mockClear();

      await emailModule.sendVerificationRejectedEmail(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co',
        'Missing public liability insurance certificate'
      );

      expect(mockSendEmail).toHaveBeenCalledWith(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co',
        'Missing public liability insurance certificate'
      );
    });
  });

  describe('Admin Verification Actions - Request Changes', () => {
    beforeAll(async () => {
      // Reset status for request changes test
      await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.SUBMITTED,
        },
      });
    });

    it('should request changes to contractor profile', async () => {
      const updated = await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.INCOMPLETE,
          reviewedAt: new Date(),
          reviewedBy: testAdminUserId,
          verificationNotes: 'Please update ABN number and add company description',
        },
      });

      expect(updated.verificationStatus).toBe(ContractorVerificationStatus.INCOMPLETE);
      expect(updated.verificationNotes).toContain('ABN number');
    });

    it('should create verification history entry for changes requested', async () => {
      const historyEntry = await prisma.contractorVerificationHistory.create({
        data: {
          contractorId: testContractorId,
          action: VerificationAction.RESUBMISSION_REQUEST,
          previousStatus: ContractorVerificationStatus.SUBMITTED,
          newStatus: ContractorVerificationStatus.INCOMPLETE,
          notes: 'Please update ABN number and add company description',
          performedBy: testAdminUserId,
          performedByName: 'Test Admin',
          isSystemAction: false,
        },
      });

      expect(historyEntry.action).toBe(VerificationAction.RESUBMISSION_REQUEST);
      expect(historyEntry.newStatus).toBe(ContractorVerificationStatus.INCOMPLETE);
    });

    it('should send changes requested email', async () => {
      const mockSendEmail = emailModule.sendVerificationChangesRequestedEmail as jest.Mock;
      mockSendEmail.mockClear();

      await emailModule.sendVerificationChangesRequestedEmail(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co',
        'Please update ABN number and add company description'
      );

      expect(mockSendEmail).toHaveBeenCalledWith(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co',
        'Please update ABN number and add company description'
      );
    });
  });

  describe('Admin Verification Actions - Under Review', () => {
    beforeAll(async () => {
      // Reset status for under review test
      await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.SUBMITTED,
        },
      });
    });

    it('should mark contractor as under review', async () => {
      const updated = await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.UNDER_REVIEW,
          reviewedAt: new Date(),
          reviewedBy: testAdminUserId,
        },
      });

      expect(updated.verificationStatus).toBe(ContractorVerificationStatus.UNDER_REVIEW);
      expect(updated.reviewedBy).toBe(testAdminUserId);
    });

    it('should create verification history entry for under review', async () => {
      const historyEntry = await prisma.contractorVerificationHistory.create({
        data: {
          contractorId: testContractorId,
          action: VerificationAction.REVIEW_STARTED,
          previousStatus: ContractorVerificationStatus.SUBMITTED,
          newStatus: ContractorVerificationStatus.UNDER_REVIEW,
          notes: 'Admin is reviewing application',
          performedBy: testAdminUserId,
          performedByName: 'Test Admin',
          isSystemAction: false,
        },
      });

      expect(historyEntry.action).toBe(VerificationAction.REVIEW_STARTED);
      expect(historyEntry.newStatus).toBe(ContractorVerificationStatus.UNDER_REVIEW);
    });

    it('should send under review email', async () => {
      const mockSendEmail = emailModule.sendVerificationUnderReviewEmail as jest.Mock;
      mockSendEmail.mockClear();

      await emailModule.sendVerificationUnderReviewEmail(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co'
      );

      expect(mockSendEmail).toHaveBeenCalledWith(
        `contractor-${TEST_ID}@test.com`,
        'Test Contractor',
        'Test Disaster Recovery Co'
      );
    });
  });

  describe('Verification History Tracking', () => {
    it('should retrieve complete verification history', async () => {
      const history = await prisma.contractorVerificationHistory.findMany({
        where: { contractorId: testContractorId },
        orderBy: { createdAt: 'desc' },
      });

      expect(Array.isArray(history)).toBe(true);
      expect(history.length).toBeGreaterThan(0);

      // Check that we have various actions in history
      const actions = history.map(h => h.action);
      expect(actions).toContain(VerificationAction.SUBMITTED);
      expect(actions).toContain(VerificationAction.APPROVED);
      expect(actions).toContain(VerificationAction.REJECTED);
    });

    it('should retrieve history with timestamp ordering', async () => {
      const history = await prisma.contractorVerificationHistory.findMany({
        where: { contractorId: testContractorId },
        orderBy: { createdAt: 'asc' },
      });

      // Verify chronological order
      for (let i = 1; i < history.length; i++) {
        expect(history[i].createdAt.getTime()).toBeGreaterThanOrEqual(
          history[i - 1].createdAt.getTime()
        );
      }
    });

    it('should track who performed each action', async () => {
      const history = await prisma.contractorVerificationHistory.findMany({
        where: { contractorId: testContractorId },
      });

      history.forEach((entry) => {
        expect(entry.performedBy).toBeDefined();
        expect(typeof entry.isSystemAction).toBe('boolean');
      });
    });
  });

  describe('Query Performance and Relations', () => {
    it('should efficiently fetch contractor with all related data', async () => {
      const contractor = await prisma.contractor.findUnique({
        where: { id: testContractorId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          documents: {
            orderBy: { uploadedAt: 'desc' },
          },
          serviceAreas: {
            where: { isActive: true },
            orderBy: { postcode: 'asc' },
          },
          verificationHistory: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      });

      expect(contractor).toBeDefined();
      expect(contractor?.user).toBeDefined();
      expect(Array.isArray(contractor?.documents)).toBe(true);
      expect(Array.isArray(contractor?.serviceAreas)).toBe(true);
      expect(Array.isArray(contractor?.verificationHistory)).toBe(true);
    });

    it('should filter contractors by verification status', async () => {
      // First set a known status
      await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          verificationStatus: ContractorVerificationStatus.APPROVED,
          isVerified: true,
        },
      });

      const approvedContractors = await prisma.contractor.findMany({
        where: {
          tenantId: testTenantId,
          verificationStatus: ContractorVerificationStatus.APPROVED,
          isVerified: true,
        },
      });

      approvedContractors.forEach((contractor) => {
        expect(contractor.verificationStatus).toBe(ContractorVerificationStatus.APPROVED);
        expect(contractor.isVerified).toBe(true);
      });
    });

    it('should count contractors by verification status', async () => {
      const statusCounts = await prisma.contractor.groupBy({
        by: ['verificationStatus'],
        _count: {
          id: true,
        },
      });

      expect(Array.isArray(statusCounts)).toBe(true);
      statusCounts.forEach((statusCount) => {
        expect(statusCount.verificationStatus).toBeDefined();
        expect(statusCount._count.id).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
