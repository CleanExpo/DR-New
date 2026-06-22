
import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/auth-middleware'
import { getTenantDb } from '@/lib/get-tenant-db'

// Get all active jobs for current user
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { user: authUser } = authResult.context
    const db = getTenantDb(authResult.context)

    const user = await db.user.findUnique({
      where: { id: authUser.id },
      include: { contractor: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get jobs based on user type
    let jobs

    if (user.contractor) {
      // Contractor: Get assigned jobs
      jobs = await db.serviceRequest.findMany({
        where: {
          // Add contractor assignment filter when schema supports it
          // contractorId: user.contractor.id,
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
          client: {
            select: {
              id: true,
              name: true,
              australianPhoneNumber: true,
              suburb: true,
              australianState: true,
            },
          },
        },
      })
    } else {
      // Client: Get their own requests
      jobs = await db.serviceRequest.findMany({
        where: {
          userId: user.id,
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      })
    }

    return NextResponse.json({
      jobs,
      userType: user.contractor ? 'contractor' : 'client',
      userId: user.id,
    })
  } catch (error) {
    console.error('Error fetching live jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}
