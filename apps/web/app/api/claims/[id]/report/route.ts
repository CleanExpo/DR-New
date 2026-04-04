/**
 * Insurance Claim Summary Report API
 * GET /api/claims/[id]/report - Generate claim summary report
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const claim = await db.insuranceClaimAU.findUnique({
      where: { id: params.id },
      include: {
        insuranceProvider: {
          select: {
            name: true,
            code: true,
            contactEmail: true,
            contactPhone: true,
          },
        },
        booking: {
          select: {
            id: true,
            australianServiceType: true,
            description: true,
            streetAddress: true,
            serviceSuburb: true,
            servicePostcode: true,
            serviceState: true,
            estimatedCostAUD: true,
            finalCostAUD: true,
            status: true,
            scheduledDate: true,
            startedAt: true,
            completedAt: true,
            contractor: {
              select: {
                businessName: true,
                licenseNumber: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        client: {
          select: {
            name: true,
            email: true,
            streetAddress: true,
            suburb: true,
            australianPostcode: true,
            australianState: true,
          },
        },
        inspectionReports: {
          select: {
            reportNumber: true,
            inspectionDate: true,
            scopeOfWork: true,
            findings: true,
            recommendations: true,
          },
        },
      },
    });

    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    if (claim.clientId !== user.id && user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
    }

    // Build claim summary report
    const report = {
      generatedAt: new Date().toISOString(),
      claimId: claim.id,
      claimNumber: claim.claimNumber,
      status: claim.status,

      client: {
        name: claim.client.name,
        email: claim.client.email,
        address: [
          claim.client.streetAddress,
          claim.client.suburb,
          claim.client.australianState,
          claim.client.australianPostcode,
        ]
          .filter(Boolean)
          .join(', '),
      },

      insurance: {
        provider: claim.insuranceProvider.name,
        providerCode: claim.insuranceProvider.code,
        policyNumber: claim.policyNumber,
        contactEmail: claim.insuranceProvider.contactEmail,
        contactPhone: claim.insuranceProvider.contactPhone,
      },

      damage: {
        description: claim.damageDescription,
        photoCount: claim.damagePhotos.length,
        photos: claim.damagePhotos,
      },

      financials: {
        totalClaimAmount: Number(claim.totalClaimAmountAUD),
        approvedAmount: claim.approvedAmountAUD ? Number(claim.approvedAmountAUD) : null,
        paymentAmount: claim.paymentAmountAUD ? Number(claim.paymentAmountAUD) : null,
        estimatedJobCost: claim.booking ? Number(claim.booking.estimatedCostAUD) : null,
        finalJobCost: claim.booking?.finalCostAUD ? Number(claim.booking.finalCostAUD) : null,
      },

      job: claim.booking
        ? {
            id: claim.booking.id,
            serviceType: claim.booking.australianServiceType,
            description: claim.booking.description,
            address: [
              claim.booking.streetAddress,
              claim.booking.serviceSuburb,
              claim.booking.serviceState,
              claim.booking.servicePostcode,
            ]
              .filter(Boolean)
              .join(', '),
            status: claim.booking.status,
            contractor: claim.booking.contractor
              ? {
                  businessName: claim.booking.contractor.businessName,
                  licenceNumber: claim.booking.contractor.licenseNumber,
                  contactName: claim.booking.contractor.user.name,
                  contactEmail: claim.booking.contractor.user.email,
                }
              : null,
            scheduledDate: claim.booking.scheduledDate,
            startedAt: claim.booking.startedAt,
            completedAt: claim.booking.completedAt,
          }
        : null,

      inspectionReports: claim.inspectionReports.map((r) => ({
        reportNumber: r.reportNumber,
        date: r.inspectionDate,
        scopeOfWork: r.scopeOfWork,
        findings: r.findings,
        recommendations: r.recommendations,
      })),

      documents: {
        invoiceUrl: claim.invoiceUrl,
        estimateUrl: claim.estimateUrl,
        additionalDocuments: claim.additionalDocuments,
      },

      timeline: {
        created: claim.createdAt,
        submitted: claim.submittedAt,
        reviewed: claim.reviewedAt,
        approved: claim.approvedAt,
        denied: claim.deniedAt,
        paid: claim.paidAt,
        denialReason: claim.denialReason,
      },
    };

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error('Error generating claim report:', error);
    return NextResponse.json({ error: 'Error generating report' }, { status: 500 });
  }
}
