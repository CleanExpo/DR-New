import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleValidationError, handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';
import { ZodError, z } from 'zod';

// Validation schema for service area
const serviceAreaSchema = z.object({
  postcode: z.string().regex(/^\d{4}$/, 'Must be a valid 4-digit Australian postcode'),
  state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']),
  suburb: z.string().min(2).max(100).optional().nullable(),
  city: z.string().min(2).max(100).optional().nullable(),
  radiusKm: z.number().int().min(1).max(500).default(25),
  responseTimeMinutes: z.number().int().min(1).max(1440).default(60),
  isPrimaryArea: z.boolean().default(false),
  coverageLevel: z.enum(['STANDARD', 'PRIORITY', 'EMERGENCY_ONLY', 'LIMITED']).default('STANDARD'),
  priorityLevel: z.number().int().min(1).max(10).default(1),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
});

const serviceAreaUpdateSchema = serviceAreaSchema.partial();

/**
 * GET /api/contractor/verification/service-areas
 * Retrieves all service areas for authenticated contractor
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    // Fetch all service areas
    const serviceAreas = await db.contractorServiceArea.findMany({
      where: { contractorId: contractor.id },
      orderBy: [
        { isPrimaryArea: 'desc' },
        { priorityLevel: 'desc' },
        { postcode: 'asc' },
      ],
    });

    return NextResponse.json({
      success: true,
      serviceAreas,
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
}

/**
 * POST /api/contractor/verification/service-areas
 * Creates a new service area
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = serviceAreaSchema.parse(body);

    // Check if service area already exists
    const existing = await db.contractorServiceArea.findFirst({
      where: {
        contractorId: contractor.id,
        postcode: validatedData.postcode,
      },
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        error: 'Service area for this postcode already exists',
      }, { status: 409 });
    }

    // Create service area
    const serviceArea = await db.contractorServiceArea.create({
      data: {
        contractorId: contractor.id,
        ...validatedData,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      serviceArea,
      message: 'Service area added successfully',
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * PUT /api/contractor/verification/service-areas
 * Updates an existing service area
 */
export async function PUT(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get service area ID from query
    const { searchParams } = new URL(request.url);
    const serviceAreaId = searchParams.get('id');

    if (!serviceAreaId) {
      return NextResponse.json({
        success: false,
        error: 'Service area ID is required',
      }, { status: 400 });
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    // Verify ownership
    const existing = await db.contractorServiceArea.findFirst({
      where: {
        id: serviceAreaId,
        contractorId: contractor.id,
      },
    });

    if (!existing) {
      return NextResponse.json({
        success: false,
        error: 'Service area not found',
      }, { status: 404 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = serviceAreaUpdateSchema.parse(body);

    // Update service area
    const serviceArea = await db.contractorServiceArea.update({
      where: { id: serviceAreaId },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      serviceArea,
      message: 'Service area updated successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * DELETE /api/contractor/verification/service-areas
 * Deletes a service area
 */
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get service area ID from query
    const { searchParams } = new URL(request.url);
    const serviceAreaId = searchParams.get('id');

    if (!serviceAreaId) {
      return NextResponse.json({
        success: false,
        error: 'Service area ID is required',
      }, { status: 400 });
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    // Verify ownership
    const existing = await db.contractorServiceArea.findFirst({
      where: {
        id: serviceAreaId,
        contractorId: contractor.id,
      },
    });

    if (!existing) {
      return NextResponse.json({
        success: false,
        error: 'Service area not found',
      }, { status: 404 });
    }

    // Delete service area
    await db.contractorServiceArea.delete({
      where: { id: serviceAreaId },
    });

    return NextResponse.json({
      success: true,
      message: 'Service area deleted successfully',
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
