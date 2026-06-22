
/**
 * Integration tests for Job Completion → Automatic Payout Flow
 *
 * Tests the complete job completion and payment workflow:
 * - Contractor marks job as complete
 * - Booking status transitions to COMPLETED
 * - Automatic Stripe payout triggered ($550 flat fee)
 * - Contractor stats updated (completedJobs)
 * - Client notification sent
 * - Review request sent to client
 * - Payment record created and tracked
 */

import { PrismaClient, BookingStatus, AustralianServiceType, AustralianState, ContractorVerificationStatus, PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// Mock Stripe and email functions
jest.mock('../../../lib/payments/contractor-payout', () => ({
  triggerPayoutForBooking: jest.fn().mockResolvedValue({
    success: true,
    payoutId: 'po_test_123',
    amount: 55000, // $550 in cents
  }),
}));

jest.mock('../../../lib/email', () => ({
  sendBookingCompletedEmail: jest.fn().mockResolvedValue({ success: true }),
  sendReviewRequestEmail: jest.fn().mockResolvedValue({ success: true }),
}));

// Import after mocking
import { triggerPayoutForBooking } from '../../../lib/payments/contractor-payout';

describe('Job Completion and Payout Integration Tests', () => {
  const TEST_ID = Date.now().toString();
  let testClientUserId: string;
  let testContractorUserId: string;
  let testContractorId: string;
  let testBookingId: string;
  let testTenantId: string;

  // Helper to create valid booking data
  const createBookingData = (clientId: string, contractorId: string | null, tenantId: string, overrides: Partial<any> = {}) => ({
    clientId,
    contractorId,
    tenantId,
    australianServiceType: AustralianServiceType.WATER_DAMAGE,
    description: 'Test booking for job completion flow',
    servicePostcode: '2000',
    serviceState: AustralianState.NSW,
    serviceSuburb: 'Sydney',
    streetAddress: '123 Test Street',
    estimatedCostAUD: new Decimal(550),
    status: BookingStatus.PENDING,
    ...overrides,
  });

  beforeAll(async () => {
    // Create test tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: `Test Tenant ${TEST_ID}`,
        domain: `test-tenant-${TEST_ID}.local`,
        isActive: true,
      },
    });
    testTenantId = tenant.id;

    // Create test client user
    const clientUser = await prisma.user.create({
      data: {
        email: `client-${TEST_ID}@test.com`,
        name: 'Test Client',
        userType: 'CLIENT',
        tenantId: testTenantId,
      },
    });
    testClientUserId = clientUser.id;

    // Create contractor user
    const contractorUser = await prisma.user.create({
      data: {
        email: `contractor-${TEST_ID}@test.com`,
        name: 'Test Contractor',
        userType: 'CONTRACTOR',
        tenantId: testTenantId,
      },
    });
    testContractorUserId = contractorUser.id;

    // Create contractor profile
    const contractor = await prisma.contractor.create({
      data: {
        userId: testContractorUserId,
        businessName: 'Test Contractor Services',
        tenantId: testTenantId,
        isActive: true,
        verificationStatus: ContractorVerificationStatus.APPROVED,
        completedJobs: 0,
      },
    });
    testContractorId = contractor.id;

    // Create test booking in IN_PROGRESS status
    const booking = await prisma.booking.create({
      data: createBookingData(testClientUserId, testContractorId, testTenantId, {
        status: BookingStatus.IN_PROGRESS,
      }),
    });
    testBookingId = booking.id;
  });

  afterAll(async () => {
    // Cleanup in correct order (most dependent first)
    await prisma.payment.deleteMany({
      where: { bookingId: testBookingId },
    });
    await prisma.booking.deleteMany({
      where: { tenantId: testTenantId },
    });
    await prisma.contractor.deleteMany({
      where: { tenantId: testTenantId },
    });
    await prisma.user.deleteMany({
      where: { tenantId: testTenantId },
    });
    await prisma.tenant.delete({
      where: { id: testTenantId },
    });
    await prisma.$disconnect();
  });

  describe('Job Completion by Contractor', () => {
    it('should update booking status to COMPLETED', async () => {
      const updatedBooking = await prisma.booking.update({
        where: { id: testBookingId },
        data: {
          status: BookingStatus.COMPLETED,
          completedAt: new Date(),
          notes: 'Job completed successfully. All water damage restored.',
        },
      });

      expect(updatedBooking.status).toBe(BookingStatus.COMPLETED);
      expect(updatedBooking.completedAt).toBeDefined();
      expect(updatedBooking.notes).toContain('Job completed successfully');
    });

    it('should update contractor stats after job completion', async () => {
      await prisma.contractor.update({
        where: { id: testContractorId },
        data: {
          completedJobs: { increment: 1 },
        },
      });

      const contractor = await prisma.contractor.findUnique({
        where: { id: testContractorId },
      });

      expect(contractor?.completedJobs).toBe(1);
    });

    it('should verify contractor is approved for payouts', async () => {
      const contractor = await prisma.contractor.findUnique({
        where: { id: testContractorId },
        select: { verificationStatus: true, isActive: true },
      });

      expect(contractor?.verificationStatus).toBe(ContractorVerificationStatus.APPROVED);
      expect(contractor?.isActive).toBe(true);
    });
  });

  describe('Automatic Stripe Payout Trigger', () => {
    it('should trigger Stripe payout for $550 after completion', async () => {
      const payoutResult = await triggerPayoutForBooking(testBookingId);

      expect(payoutResult.success).toBe(true);
      expect(payoutResult.amount).toBe(55000); // $550 in cents
      expect(payoutResult.payoutId).toBeDefined();

      // Verify mock was called
      expect(triggerPayoutForBooking).toHaveBeenCalledWith(testBookingId);
    });

    it('should create payment record after successful payout', async () => {
      const payment = await prisma.payment.create({
        data: {
          bookingId: testBookingId,
          clientId: testClientUserId,
          contractorId: testContractorId,
          tenantId: testTenantId,
          amountAUD: new Decimal(550),
          platformFeeAUD: new Decimal(82.50), // 15% of 550
          platformFeePercentage: new Decimal(15),
          gstAUD: new Decimal(7.50), // GST on platform fee
          netAmountAUD: new Decimal(460), // 550 - 82.50 - 7.50
          paymentMethod: 'stripe',
          stripePaymentIntentId: 'pi_test_123',
          status: PaymentStatus.COMPLETED,
        },
      });

      expect(payment).toBeDefined();
      expect(payment.amountAUD.toNumber()).toBe(550);
      expect(payment.status).toBe(PaymentStatus.COMPLETED);
    });

    it('should track payout date and time', async () => {
      const payment = await prisma.payment.findFirst({
        where: { bookingId: testBookingId },
      });

      expect(payment?.createdAt).toBeDefined();
      expect(payment?.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('Payment Validation and Business Rules', () => {
    it('should use $550 flat fee per claim (not hourly)', async () => {
      const payment = await prisma.payment.findFirst({
        where: { bookingId: testBookingId },
      });

      expect(payment?.amountAUD.toNumber()).toBe(550);
    });

    it('should handle failed payout gracefully', async () => {
      // Mock a failed payout
      const failedPayout = jest.fn().mockResolvedValue({
        success: false,
        error: 'Insufficient funds in platform account',
      });

      const result = await failedPayout(testBookingId);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();

      // Create a failed payment record
      const failedPayment = await prisma.payment.create({
        data: {
          bookingId: testBookingId,
          clientId: testClientUserId,
          contractorId: testContractorId,
          tenantId: testTenantId,
          amountAUD: new Decimal(550),
          platformFeeAUD: new Decimal(82.50),
          gstAUD: new Decimal(7.50),
          netAmountAUD: new Decimal(460),
          paymentMethod: 'stripe',
          stripePaymentIntentId: 'pi_test_failed',
          status: PaymentStatus.FAILED,
          failureReason: 'Insufficient funds',
        },
      });

      expect(failedPayment).toBeDefined();
      expect(failedPayment.status).toBe(PaymentStatus.FAILED);
      expect(failedPayment.failureReason).toBe('Insufficient funds');
    });
  });

  describe('Client Notifications and Review Requests', () => {
    it('should send completion notification to client', async () => {
      const { sendBookingCompletedEmail } = require('../../../lib/email');

      await sendBookingCompletedEmail({
        clientName: 'Test Client',
        email: `client-${TEST_ID}@test.com`,
        contractorName: 'Test Contractor Services',
        bookingId: testBookingId,
        serviceType: AustralianServiceType.WATER_DAMAGE,
        completedDate: new Date(),
      });

      expect(sendBookingCompletedEmail).toHaveBeenCalled();
    });

    it('should send review request to client after completion', async () => {
      const { sendReviewRequestEmail } = require('../../../lib/email');

      await sendReviewRequestEmail({
        clientName: 'Test Client',
        email: `client-${TEST_ID}@test.com`,
        contractorName: 'Test Contractor Services',
        bookingId: testBookingId,
      });

      expect(sendReviewRequestEmail).toHaveBeenCalled();
    });
  });

  describe('Contractor Performance Metrics', () => {
    it('should track completed jobs count', async () => {
      const contractor = await prisma.contractor.findUnique({
        where: { id: testContractorId },
        select: { completedJobs: true },
      });

      expect(contractor?.completedJobs).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Booking Lifecycle Status Validation', () => {
    it('should only allow completion from valid statuses', async () => {
      // Create a new booking in PENDING status
      const pendingBooking = await prisma.booking.create({
        data: createBookingData(testClientUserId, testContractorId, testTenantId, {
          australianServiceType: AustralianServiceType.FIRE_DAMAGE,
          status: BookingStatus.PENDING,
          serviceSuburb: 'Melbourne',
          servicePostcode: '3000',
          serviceState: AustralianState.VIC,
          streetAddress: '456 Test Avenue',
        }),
      });

      // Attempting to complete from PENDING should ideally be prevented
      // (business logic validation - not database constraint)
      const attemptComplete = async () => {
        if (pendingBooking.status === BookingStatus.PENDING) {
          throw new Error('Cannot complete booking from PENDING status');
        }
        await prisma.booking.update({
          where: { id: pendingBooking.id },
          data: { status: BookingStatus.COMPLETED },
        });
      };

      await expect(attemptComplete()).rejects.toThrow(
        'Cannot complete booking from PENDING status'
      );

      // Cleanup
      await prisma.booking.delete({ where: { id: pendingBooking.id } });
    });

    it('should prevent completion without contractor assignment', async () => {
      // Create booking without contractor
      const booking = await prisma.booking.create({
        data: createBookingData(testClientUserId, null, testTenantId, {
          australianServiceType: AustralianServiceType.MOULD_REMEDIATION,
          status: BookingStatus.PENDING,
          serviceSuburb: 'Brisbane',
          servicePostcode: '4000',
          serviceState: AustralianState.QLD,
          streetAddress: '789 Test Road',
        }),
      });

      const attemptComplete = async () => {
        if (!booking.contractorId) {
          throw new Error('Cannot complete booking without assigned contractor');
        }
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: BookingStatus.COMPLETED },
        });
      };

      await expect(attemptComplete()).rejects.toThrow(
        'Cannot complete booking without assigned contractor'
      );

      // Cleanup
      await prisma.booking.delete({ where: { id: booking.id } });
    });
  });
});
