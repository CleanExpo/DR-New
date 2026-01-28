import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware'
import { getTenantDb } from '@/lib/get-tenant-db'
import { z } from 'zod'

// GET - List all beta programs with participant counts
export async function GET(request: Request) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { user } = authResult.context

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN'])
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context)

    const programs = await db.betaProgram.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            enrollments: true,
            feedback: true,
            npsSurveys: true,
          },
        },
        enrollments: {
          where: { status: 'ACTIVE' },
          select: { id: true },
        },
      },
    })

    // Transform to include active participant count
    const programsWithStats = programs.map((program) => ({
      id: program.id,
      name: program.name,
      description: program.description,
      featureArea: program.featureArea,
      startDate: program.startDate,
      endDate: program.endDate,
      isActive: program.isActive,
      maxParticipants: program.maxParticipants,
      createdAt: program.createdAt,
      stats: {
        totalEnrollments: program._count.enrollments,
        activeParticipants: program.enrollments.length,
        totalFeedback: program._count.feedback,
        totalNpsSurveys: program._count.npsSurveys,
      },
    }))

    return NextResponse.json({ programs: programsWithStats })
  } catch (error) {
    console.error('Error fetching beta programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch beta programs' },
      { status: 500 }
    )
  }
}

// Validation schema for creating a program
const createProgramSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  featureArea: z.string().min(1, 'Feature area is required'),
  startDate: z.string().transform((s) => new Date(s)),
  endDate: z.string().transform((s) => new Date(s)),
  maxParticipants: z.number().min(1).max(100).default(10),
})

// POST - Create a new beta program
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { user } = authResult.context

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN'])
    }

    const db = getTenantDb(authResult.context)

    const body = await request.json()
    const validationResult = createProgramSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { name, description, featureArea, startDate, endDate, maxParticipants } =
      validationResult.data

    // Validate dates
    if (endDate <= startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    const program = await db.betaProgram.create({
      data: {
        name,
        description,
        featureArea,
        startDate,
        endDate,
        maxParticipants,
        isActive: true,
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'BETA_PROGRAM_CREATED',
        entityType: 'BetaProgram',
        entityId: program.id,
        performedBy: user.id,
        newValues: {
          name,
          featureArea,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          maxParticipants,
        } as any,
      },
    })

    return NextResponse.json({ program }, { status: 201 })
  } catch (error) {
    console.error('Error creating beta program:', error)
    return NextResponse.json(
      { error: 'Failed to create beta program' },
      { status: 500 }
    )
  }
}
