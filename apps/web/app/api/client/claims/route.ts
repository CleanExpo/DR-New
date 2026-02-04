/**
 * Client API: Claims Management
 *
 * GET /api/client/claims
 * Returns all bookings (claims) for the authenticated client
 *
 * POST /api/client/claims
 * Create a new claim with categorized damage photos
 *
 * Required role: CLIENT
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // 2. Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // 3. Get user's bookings (claims) - automatically tenant-scoped
    const bookings = await db.booking.findMany({
      where: {
        clientId: user.id,
      },
      select: {
        id: true,
        australianServiceType: true,
        description: true,
        servicePostcode: true,
        serviceSuburb: true,
        status: true,
        emergencyResponseLevel: true,
        estimatedCostAUD: true,
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        ratings: {
          select: {
            rating: true,
            review: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        createdAt: true,
        updatedAt: true,
        completedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // 3. Format response
    const claims = bookings.map((booking) => ({
      id: booking.id,
      serviceType: booking.australianServiceType,
      description: booking.description,
      location: `${booking.serviceSuburb} ${booking.servicePostcode}`,
      suburb: booking.serviceSuburb,
      postcode: booking.servicePostcode,
      status: booking.status,
      emergencyLevel: booking.emergencyResponseLevel,
      estimatedCost: Number(booking.estimatedCostAUD),
      contractor: booking.contractor
        ? {
            id: booking.contractor.id,
            name: booking.contractor.user.name,
            email: booking.contractor.user.email,
            businessName: booking.contractor.businessName,
            rating: Number(booking.contractor.averageRating),
          }
        : null,
      rating: booking.ratings[0]
        ? {
            rating: booking.ratings[0].rating,
            review: booking.ratings[0].review,
          }
        : null,
      submittedAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      completedAt: booking.completedAt,
    }));

    return NextResponse.json({
      success: true,
      claims,
      total: claims.length,
    });
  } catch (error) {
    console.error('Error fetching claims:', error);

    return NextResponse.json(
      { error: 'Failed to fetch claims' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/client/claims
 * Create a new claim with categorized damage photos
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // 2. Parse request body
    const body = await request.json();
    const {
      serviceType,
      damageDescription,
      hasInsurance,
      insuranceProvider,
      policyNumber,
      damagePhotos = [],
    } = body;

    // 3. Validate required fields
    if (!serviceType || !damageDescription) {
      return NextResponse.json(
        { error: 'Service type and damage description are required', success: false },
        { status: 400 }
      );
    }

    // 4. Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // 5. Create inspection report if there are photos
    let inspectionReportId: string | undefined;
    if (damagePhotos.length > 0) {
      // Create inspection report
      const inspectionReport = await db.inspectionReport.create({
        data: {
          bookingId: null, // Will be linked after booking creation
          inspectorUserId: user.id,
          inspectionDate: new Date(),
          reportType: 'INITIAL',
          overallCondition: 'NEEDS_ASSESSMENT',
          recommendations: [damageDescription],
          totalEstimatedCost: 0,
          urgencyLevel: serviceType === 'emergency' ? 'HIGH' : 'MEDIUM',
          tenantId: authResult.context.tenantId,
        },
      });

      inspectionReportId = inspectionReport.id;

      // Group photos by room location to create damage areas
      const photosByRoom = damagePhotos.reduce((acc: any, photo: any) => {
        const room = photo.roomLocation || 'Other';
        if (!acc[room]) {
          acc[room] = [];
        }
        acc[room].push(photo);
        return {};
      }, {});

      // Create damage areas and photos
      for (const [roomName, roomPhotos] of Object.entries(photosByRoom) as [string, any][]) {
        // Create damage area
        const damageArea = await db.damageArea.create({
          data: {
            reportId: inspectionReport.id,
            areaName: roomName,
            floor: '1', // Default
            roomType: roomName,
            damageCategory: 'CATEGORY_1', // Will be properly categorized later
            affectedArea: 0,
            affectedMaterials: [],
            description: `Damage in ${roomName}`,
            severity: 'MODERATE',
            requiredActions: [],
            equipmentNeeded: [],
            tenantId: authResult.context.tenantId,
          },
        });

        // Create photos for this damage area
        for (const photo of roomPhotos) {
          await db.inspectionPhoto.create({
            data: {
              reportId: inspectionReport.id,
              damageAreaId: damageArea.id,
              photoUrl: photo.url,
              filename: photo.filename,
              fileSize: photo.fileSize,
              mimeType: photo.mimeType,
              photoType: photo.damageType || 'Other',
              caption: photo.caption || '',
              capturedAt: new Date(),
              tenantId: authResult.context.tenantId,
            },
          });
        }
      }
    }

    // 6. Create booking (claim)
    const booking = await db.booking.create({
      data: {
        clientId: user.id,
        australianServiceType: serviceType.toUpperCase(),
        description: damageDescription,
        serviceAddress: '', // Will be updated from user profile
        serviceSuburb: '', // Will be updated from user profile
        serviceState: 'NSW', // Default
        servicePostcode: '',  // Will be updated from user profile
        status: 'PENDING',
        emergencyResponseLevel: serviceType === 'emergency' ? 'CRITICAL' : 'NORMAL',
        propertyType: 'RESIDENTIAL',
        estimatedCostAUD: 0,
        hasInsurance: hasInsurance === 'yes',
        insuranceProvider: insuranceProvider || null,
        insurancePolicyNumber: policyNumber || null,
        tenantId: authResult.context.tenantId,
      },
    });

    // 7. Link inspection report to booking if created
    if (inspectionReportId) {
      await db.inspectionReport.update({
        where: { id: inspectionReportId },
        data: { bookingId: booking.id },
      });
    }

    // 8. Return success response
    return NextResponse.json({
      success: true,
      claimId: booking.id,
      message: 'Claim created successfully',
    });
  } catch (error) {
    console.error('Error creating claim:', error);

    return NextResponse.json(
      {
        error: 'Failed to create claim',
        message: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      },
      { status: 500 }
    );
  }
}
