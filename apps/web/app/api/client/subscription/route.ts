/**
 * Client Subscription API
 *
 * GET /api/client/subscription
 * Fetch client's current subscription
 *
 * PUT /api/client/subscription
 * Update client's subscription plan
 *
 * NOTE: Client subscriptions are not yet implemented.
 * The platform uses Workspace-based subscriptions for businesses
 * and Contractor-based subscriptions for service providers.
 * This API is stubbed to return appropriate responses.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Client subscriptions not yet implemented
    // Clients currently have free access to submit service requests
    return NextResponse.json({
      success: true,
      subscription: null,
      message: 'Client subscriptions are not required. Clients have free access to submit service requests.',
      paymentHistory: [],
      availablePlans: [
        {
          name: 'FREE',
          price: 0,
          description: 'Free access for clients',
          features: [
            'Submit unlimited service requests',
            'Receive contractor quotes',
            'Track job progress',
            'Rate contractors',
          ],
        },
      ],
    });
  } catch (error) {
    console.error('Get subscription error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Client subscriptions not yet implemented
    return NextResponse.json(
      {
        error: 'Client subscription management is not available',
        message: 'Clients currently have free access to all features. Subscription management is available for contractors and workspace owners.',
      },
      { status: 501 }
    );
  } catch (error) {
    console.error('Update subscription error:', error);

    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}
