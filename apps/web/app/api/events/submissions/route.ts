import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// ── GET /api/events/submissions ────────────────────────────────────────────────
// Admin: list event submissions with optional status filter

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? 'PENDING'
  const country = searchParams.get('country')
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '20'))

  const where: Record<string, unknown> = {}
  if (status !== 'all') where.status = status.toUpperCase()
  if (country) where.country = country.toUpperCase()

  const [submissions, total] = await Promise.all([
    prisma.eventSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.eventSubmission.count({ where }),
  ])

  return NextResponse.json({ submissions, total, page, limit })
}

// ── PATCH /api/events/submissions ─────────────────────────────────────────────
// Admin: approve or reject a submission

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { id, status, adminNotes } = body

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 })
  }
  if (!status || !['APPROVED', 'REJECTED'].includes(status as string)) {
    return NextResponse.json({ error: 'Status must be APPROVED or REJECTED' }, { status: 400 })
  }

  try {
    const updated = await prisma.eventSubmission.update({
      where: { id: id as string },
      data: {
        status: status as string,
        adminNotes: adminNotes ? (adminNotes as string).trim() : null,
        reviewedAt: new Date(),
        reviewedBy: session.user.email ?? 'admin',
      },
      select: { id: true, eventName: true, status: true, reviewedAt: true },
    })

    return NextResponse.json({ success: true, submission: updated })
  } catch {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
  }
}
