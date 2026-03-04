/**
 * Client Properties API Route
 * GET /api/client/properties - List the authenticated client's properties
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Get client profile to find properties
    const clientProfile = await db.clientProfile.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!clientProfile) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const properties = await db.clientProperty.findMany({
      where: { clientProfileId: clientProfile.id },
      select: {
        id: true,
        streetAddress: true,
        suburb: true,
        state: true,
        postcode: true,
        propertyType: true,
        isPrimary: true,
      },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error('Error fetching client properties:', error);
    return NextResponse.json(
      { error: 'Error fetching properties' },
      { status: 500 }
    );
  }
}
