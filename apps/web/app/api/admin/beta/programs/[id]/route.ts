import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware'
import { getTenantDb } from '@/lib/get-tenant-db'
import { z } from 'zod'

// GET - Get program details with enrollments
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const program = await db.betaProgram.findUnique({
      where: { id: params.id },
      include: {
        enrollments: {
          include: {
            contractor: {
              select: {
                id: true,
                businessName: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        feedback: {
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
        npsSurveys: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Calculate NPS stats — single pass
    let promoters = 0, passives = 0, detractors = 0
    for (const s of program.npsSurveys) {
      if (s.score >= 9) promoters++
      else if (s.score >= 7) passives++
      else detractors++
    }
    const total = program.npsSurveys.length
    const npsScore = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : null

    // Calculate feedback stats — single pass
    let fbBug = 0, fbFeature = 0, fbUsability = 0, fbGeneral = 0
    let fbNew = 0, fbInReview = 0, fbResolved = 0, fbWontFix = 0
    let fbUnreviewed = 0
    for (const f of program.feedback) {
      if (f.category === 'BUG_REPORT') fbBug++
      else if (f.category === 'FEATURE_REQUEST') fbFeature++
      else if (f.category === 'USABILITY_ISSUE') fbUsability++
      else if (f.category === 'GENERAL_FEEDBACK') fbGeneral++
      if (f.status === 'new') fbNew++
      else if (f.status === 'in_review') fbInReview++
      else if (f.status === 'resolved') fbResolved++
      else if (f.status === 'wont_fix') fbWontFix++
      if (!f.isReviewed) fbUnreviewed++
    }
    let enActive = 0, enInvited = 0
    for (const e of program.enrollments) {
      if (e.status === 'ACTIVE') enActive++
      else if (e.status === 'INVITED') enInvited++
    }

    return NextResponse.json({
      program: {
        ...program,
        stats: {
          activeParticipants: enActive,
          invitedParticipants: enInvited,
          totalFeedback: program.feedback.length,
          unreviewedFeedback: fbUnreviewed,
          nps: { score: npsScore, promoters, passives, detractors, total },
          feedbackByCategory: { BUG_REPORT: fbBug, FEATURE_REQUEST: fbFeature, USABILITY_ISSUE: fbUsability, GENERAL_FEEDBACK: fbGeneral },
          feedbackByStatus: { new: fbNew, in_review: fbInReview, resolved: fbResolved, wont_fix: fbWontFix },
        },
      },
    })
  } catch (error) {
    console.error('Error fetching beta program:', error)
    return NextResponse.json(
      { error: 'Failed to fetch beta program' },
      { status: 500 }
    )
  }
}

// Update program schema
const updateProgramSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  startDate: z.string().transform((s) => new Date(s)).optional(),
  endDate: z.string().transform((s) => new Date(s)).optional(),
  isActive: z.boolean().optional(),
  maxParticipants: z.number().min(1).max(100).optional(),
})

// PATCH - Update program settings
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existing = await db.betaProgram.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    const body = await request.json()
    const validationResult = updateProgramSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const program = await db.betaProgram.update({
      where: { id: params.id },
      data: validationResult.data,
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'BETA_PROGRAM_UPDATED',
        entityType: 'BetaProgram',
        entityId: program.id,
        performedBy: user.id,
        oldValues: existing as any,
        newValues: validationResult.data as any,
      },
    })

    return NextResponse.json({ program })
  } catch (error) {
    console.error('Error updating beta program:', error)
    return NextResponse.json(
      { error: 'Failed to update beta program' },
      { status: 500 }
    )
  }
}

// DELETE - Archive/delete program
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existing = await db.betaProgram.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // If there are enrollments, just deactivate instead of delete
    if (existing._count.enrollments > 0) {
      await db.betaProgram.update({
        where: { id: params.id },
        data: { isActive: false },
      })

      return NextResponse.json({
        message: 'Program deactivated (has enrollments)',
        archived: true,
      })
    }

    // No enrollments, safe to delete
    await db.betaProgram.delete({
      where: { id: params.id },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'BETA_PROGRAM_DELETED',
        entityType: 'BetaProgram',
        entityId: params.id,
        performedBy: user.id,
        oldValues: existing as any,
      },
    })

    return NextResponse.json({ message: 'Program deleted', deleted: true })
  } catch (error) {
    console.error('Error deleting beta program:', error)
    return NextResponse.json(
      { error: 'Failed to delete beta program' },
      { status: 500 }
    )
  }
}
