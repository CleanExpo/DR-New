import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware'
import { getTenantDb } from '@/lib/get-tenant-db'
import { z } from 'zod'

// Update enrollment schema
const updateEnrollmentSchema = z.object({
  status: z.enum(['INVITED', 'ACTIVE', 'COMPLETED', 'WITHDRAWN']).optional(),
  tierOverride: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
  adminNotes: z.string().optional(),
  withdrawReason: z.string().optional(),
})

// PATCH - Update enrollment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { user: adminUser } = authResult.context

    if (!requireRole(adminUser, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN'])
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context)

    const existing = await db.betaEnrollment.findUnique({
      where: { id: params.id },
      include: {
        contractor: {
          include: {
            user: { select: { email: true } },
          },
        },
      },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    const body = await request.json()
    const validationResult = updateEnrollmentSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { status, tierOverride, adminNotes, withdrawReason } = validationResult.data

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (status) {
      updateData.status = status

      // Set timestamps based on status change
      if (status === 'ACTIVE' && existing.status === 'INVITED') {
        updateData.acceptedAt = new Date()
      } else if (status === 'COMPLETED') {
        updateData.completedAt = new Date()
      } else if (status === 'WITHDRAWN') {
        updateData.withdrawnAt = new Date()
        if (withdrawReason) {
          updateData.withdrawReason = withdrawReason
        }
      }
    }

    if (tierOverride !== undefined) {
      updateData.tierOverride = tierOverride
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes
    }

    const enrollment = await db.betaEnrollment.update({
      where: { id: params.id },
      data: updateData,
      include: {
        program: true,
        contractor: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'BETA_ENROLLMENT_UPDATED',
        entityType: 'BetaEnrollment',
        entityId: enrollment.id,
        performedBy: adminUser.id,
        oldValues: {
          status: existing.status,
          tierOverride: existing.tierOverride,
        } as any,
        newValues: updateData as any,
      },
    })

    // TODO: Send status change emails
    if (status === 'ACTIVE' && existing.status === 'INVITED') {
      console.log(`Would send beta welcome email to ${existing.contractor.user.email}`)
    }

    return NextResponse.json({ enrollment })
  } catch (error) {
    console.error('Error updating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    )
  }
}

// DELETE - Remove enrollment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { user: adminUser } = authResult.context

    if (!requireRole(adminUser, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN'])
    }

    const db = getTenantDb(authResult.context)

    const existing = await db.betaEnrollment.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // If enrollment is active, just mark as withdrawn instead of deleting
    if (existing.status === 'ACTIVE') {
      await db.betaEnrollment.update({
        where: { id: params.id },
        data: {
          status: 'WITHDRAWN',
          withdrawnAt: new Date(),
          withdrawReason: 'Removed by admin',
        },
      })

      return NextResponse.json({
        message: 'Enrollment withdrawn',
        withdrawn: true,
      })
    }

    // For invited/completed/withdrawn, delete entirely
    await db.betaEnrollment.delete({
      where: { id: params.id },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'BETA_ENROLLMENT_DELETED',
        entityType: 'BetaEnrollment',
        entityId: params.id,
        performedBy: adminUser.id,
        oldValues: existing as any,
      },
    })

    return NextResponse.json({ message: 'Enrollment deleted', deleted: true })
  } catch (error) {
    console.error('Error deleting enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    )
  }
}
