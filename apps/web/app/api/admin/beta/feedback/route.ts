import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware'
import { getTenantDb } from '@/lib/get-tenant-db'
import { z } from 'zod'

// GET - List all feedback with filtering
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const programId = searchParams.get('programId')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const isReviewed = searchParams.get('isReviewed')
    const priority = searchParams.get('priority')

    const whereClause: Record<string, unknown> = {}

    if (programId) {
      whereClause.programId = programId
    }

    if (category) {
      whereClause.category = category
    }

    if (status) {
      whereClause.status = status
    }

    if (isReviewed !== null && isReviewed !== undefined) {
      whereClause.isReviewed = isReviewed === 'true'
    }

    if (priority) {
      whereClause.priority = priority
    }

    const feedback = await db.betaFeedback.findMany({
      where: whereClause,
      include: {
        program: {
          select: {
            id: true,
            name: true,
            featureArea: true,
          },
        },
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
      orderBy: [
        { isReviewed: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    // Calculate summary stats — single pass
    let fbUnreviewed = 0
    let fbBug = 0, fbFeature = 0, fbUsability = 0, fbGeneral = 0
    let fbNew = 0, fbInReview = 0, fbResolved = 0, fbWontFix = 0
    let fbCritical = 0, fbHigh = 0, fbMedium = 0, fbLow = 0
    for (const f of feedback) {
      if (!f.isReviewed) fbUnreviewed++
      if (f.category === 'BUG_REPORT') fbBug++
      else if (f.category === 'FEATURE_REQUEST') fbFeature++
      else if (f.category === 'USABILITY_ISSUE') fbUsability++
      else if (f.category === 'GENERAL_FEEDBACK') fbGeneral++
      if (f.status === 'new') fbNew++
      else if (f.status === 'in_review') fbInReview++
      else if (f.status === 'resolved') fbResolved++
      else if (f.status === 'wont_fix') fbWontFix++
      if (f.priority === 'critical') fbCritical++
      else if (f.priority === 'high') fbHigh++
      else if (f.priority === 'medium') fbMedium++
      else if (f.priority === 'low') fbLow++
    }
    const stats = {
      total: feedback.length,
      unreviewed: fbUnreviewed,
      byCategory: { BUG_REPORT: fbBug, FEATURE_REQUEST: fbFeature, USABILITY_ISSUE: fbUsability, GENERAL_FEEDBACK: fbGeneral },
      byStatus: { new: fbNew, in_review: fbInReview, resolved: fbResolved, wont_fix: fbWontFix },
      byPriority: { critical: fbCritical, high: fbHigh, medium: fbMedium, low: fbLow },
    }

    return NextResponse.json({ feedback, stats })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

// Update feedback schema
const updateFeedbackSchema = z.object({
  id: z.string().min(1, 'Feedback ID is required'),
  status: z.enum(['new', 'in_review', 'resolved', 'wont_fix']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  isReviewed: z.boolean().optional(),
  adminResponse: z.string().optional(),
})

// PATCH - Update feedback status
export async function PATCH(request: NextRequest) {
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
    const validationResult = updateFeedbackSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { id, status, priority, isReviewed, adminResponse } = validationResult.data

    const existing = await db.betaFeedback.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
    }

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (status !== undefined) {
      updateData.status = status
    }

    if (priority !== undefined) {
      updateData.priority = priority
    }

    if (isReviewed !== undefined) {
      updateData.isReviewed = isReviewed
      if (isReviewed) {
        updateData.reviewedBy = user.id
      }
    }

    if (adminResponse !== undefined) {
      updateData.adminResponse = adminResponse
    }

    const feedback = await db.betaFeedback.update({
      where: { id },
      data: updateData,
      include: {
        program: {
          select: {
            id: true,
            name: true,
          },
        },
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
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'BETA_FEEDBACK_UPDATED',
        entityType: 'BetaFeedback',
        entityId: feedback.id,
        performedBy: user.id,
        oldValues: {
          status: existing.status,
          priority: existing.priority,
          isReviewed: existing.isReviewed,
        } as any,
        newValues: updateData as any,
      },
    })

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('Error updating feedback:', error)
    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    )
  }
}
