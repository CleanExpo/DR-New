/**
 * DR-7 — Unite-Hub API Route
 * GET  /api/unite-hub        → health/status payload for Unite-Hub
 * POST /api/unite-hub/events → push an event to Unite-Hub (internal use)
 */

import { NextRequest, NextResponse } from 'next/server'
import { uniteHub } from '@/lib/unite-hub-connector'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/** GET /api/unite-hub — build and return the health payload */
export async function GET() {
  try {
    const [partnerCounts, publishedContentCount, eventsThisMonth] = await Promise.all([
      prisma.partner.groupBy({
        by: ['tier'],
        _count: { tier: true },
      }),
      prisma.contentPost.count({ where: { status: 'published' } }),
      prisma.event.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ])

    const counts = { community: 0, standard: 0, premium: 0 }
    for (const row of partnerCounts) {
      const tier = row.tier as keyof typeof counts
      if (tier in counts) counts[tier] = row._count.tier
    }

    const payload = await uniteHub.buildHealthPayload({
      partnerCounts: counts,
      publishedContentCount,
      eventsThisMonth,
      nrpgJobsInProgress: 0,
      nrpgJobRevenueThisMonth: 0,
      eventSponsorshipThisMonth: 0,
    })

    return NextResponse.json(payload)
  } catch (err) {
    console.error('[unite-hub] GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/** POST /api/unite-hub — push a single event to Unite-Hub */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { event?: string; data?: Record<string, unknown> }
    const { event, data } = body

    if (!event || typeof event !== 'string') {
      return NextResponse.json({ error: 'Missing event field' }, { status: 400 })
    }

    const ok = await uniteHub.pushEvent(
      event as Parameters<typeof uniteHub.pushEvent>[0],
      data ?? {},
    )

    return NextResponse.json({ ok })
  } catch (err) {
    console.error('[unite-hub] POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
