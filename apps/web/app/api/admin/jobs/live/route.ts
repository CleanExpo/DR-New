import { NextRequest, NextResponse } from 'next/server'
import { getTenantDb } from '@/lib/get-tenant-db'
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware'
import { handleUnexpectedError } from '@/lib/api-errors'

export const dynamic = 'force-dynamic'

// GET - Fetch all active jobs with real-time status
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) return authResult.response
    const { user } = authResult.context

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN'])
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context)

    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const statusFilter = searchParams.get('status')?.split(',') || []
    const urgencyFilter = searchParams.get('urgency')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    // Build where clause
    const where: Record<string, unknown> = {
      // Active jobs: not completed or cancelled
      status: statusFilter.length > 0
        ? { in: statusFilter }
        : { notIn: ['COMPLETED', 'CANCELLED'] },
    }

    if (urgencyFilter) {
      where.urgency = urgencyFilter
    }

    if (search) {
      where.OR = [
        { serviceTitle: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
      ]
    }

    // Fetch jobs with related data
    const [jobs, totalCount] = await Promise.all([
      db.serviceRequest.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              australianPhoneNumber: true,
            },
          },
          matches: {
            where: {
              status: { in: ['PENDING', 'ACCEPTED'] },
            },
            include: {
              contractor: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      australianPhoneNumber: true,
                    },
                  },
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: [
          { urgentResponse: 'desc' },
          { createdAt: 'desc' },
        ],
        take: limit,
        skip: offset,
      }),
      db.serviceRequest.count({ where }),
    ])

    // Get latest location for jobs with assigned contractors
    const jobIds = jobs.map(j => j.id)
    const latestLocations = await db.contractorLocationHistory.findMany({
      where: {
        jobId: { in: jobIds },
      },
      orderBy: { timestamp: 'desc' },
      distinct: ['jobId'],
    })

    const locationMap = new Map(latestLocations.map(loc => [loc.jobId, loc]))

    // Format response
    const formattedJobs = jobs.map(job => {
      const activeMatch = job.matches[0]
      const location = locationMap.get(job.id)

      return {
        id: job.id,
        serviceTitle: job.serviceTitle,
        serviceCategory: job.serviceCategory,
        description: job.description,
        location: job.location,
        urgency: job.urgency,
        status: job.status,
        urgentResponse: job.urgentResponse,
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString(),
        client: {
          id: job.user.id,
          name: job.user.name,
          email: job.user.email,
          phone: job.user.australianPhoneNumber,
        },
        contractor: activeMatch?.contractor ? {
          id: activeMatch.contractor.id,
          userId: activeMatch.contractor.user.id,
          name: activeMatch.contractor.user.name,
          email: activeMatch.contractor.user.email,
          phone: activeMatch.contractor.user.australianPhoneNumber,
          matchStatus: activeMatch.status,
        } : null,
        contractorLocation: location ? {
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: location.timestamp.toISOString(),
        } : null,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        jobs: formattedJobs,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + jobs.length < totalCount,
        },
      },
    })
  } catch (error) {
    return handleUnexpectedError(error)
  }
}
