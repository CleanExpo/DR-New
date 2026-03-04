import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware'
import { getTenantDb } from '@/lib/get-tenant-db'

// GET - Beta program analytics dashboard
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

    // Fetch all active programs with their data
    const programs = await db.betaProgram.findMany({
      where: { isActive: true },
      include: {
        enrollments: {
          include: {
            contractor: {
              select: {
                id: true,
                businessName: true,
              },
            },
          },
        },
        feedback: true,
        npsSurveys: true,
      },
    })

    // Calculate overall NPS — single pass
    const allNpsScores = programs.flatMap((p) => p.npsSurveys.map((s) => s.score))
    const totalResponses = allNpsScores.length
    let promoters = 0, passives = 0, detractors = 0
    for (const s of allNpsScores) {
      if (s >= 9) promoters++
      else if (s >= 7) passives++
      else detractors++
    }
    const overallNps = totalResponses > 0
      ? Math.round(((promoters - detractors) / totalResponses) * 100)
      : null

    // Calculate NPS trend (last 4 weeks)
    const fourWeeksAgo = new Date()
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28)

    const weeklyNps: { week: string; score: number | null; responses: number }[] = []
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7)
      const weekEnd = new Date()
      weekEnd.setDate(weekEnd.getDate() - i * 7)

      const weekScores = allNpsScores.length > 0
        ? programs.flatMap((p) =>
            p.npsSurveys
              .filter((s) => s.createdAt >= weekStart && s.createdAt < weekEnd)
              .map((s) => s.score)
          )
        : []

      let weekPromoters = 0, weekDetractors = 0
      for (const s of weekScores) {
        if (s >= 9) weekPromoters++
        else if (s <= 6) weekDetractors++
      }
      const weekTotal = weekScores.length
      const weekNps = weekTotal > 0
        ? Math.round(((weekPromoters - weekDetractors) / weekTotal) * 100)
        : null

      weeklyNps.push({
        week: `Week ${4 - i}`,
        score: weekNps,
        responses: weekTotal,
      })
    }

    // Aggregate feedback stats — single pass
    const allFeedback = programs.flatMap((p) => p.feedback)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    let fbUnreviewed = 0, fbThisWeek = 0
    let fbBug = 0, fbFeature = 0, fbUsability = 0, fbGeneral = 0
    let fbNew = 0, fbInReview = 0, fbResolved = 0, fbWontFix = 0
    let fbCritical = 0, fbHigh = 0, fbMedium = 0, fbLow = 0
    for (const f of allFeedback) {
      if (!f.isReviewed) fbUnreviewed++
      if (f.createdAt >= oneWeekAgo) fbThisWeek++
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
    const feedbackStats = {
      total: allFeedback.length,
      unreviewed: fbUnreviewed,
      thisWeek: fbThisWeek,
      byCategory: {
        BUG_REPORT: fbBug,
        FEATURE_REQUEST: fbFeature,
        USABILITY_ISSUE: fbUsability,
        GENERAL_FEEDBACK: fbGeneral,
      },
      byStatus: { new: fbNew, in_review: fbInReview, resolved: fbResolved, wont_fix: fbWontFix },
      byPriority: { critical: fbCritical, high: fbHigh, medium: fbMedium, low: fbLow },
    }

    // Enrollment stats — single pass
    const allEnrollments = programs.flatMap((p) => p.enrollments)
    let enInvited = 0, enActive = 0, enCompleted = 0, enWithdrawn = 0
    for (const e of allEnrollments) {
      if (e.status === 'INVITED') enInvited++
      else if (e.status === 'ACTIVE') enActive++
      else if (e.status === 'COMPLETED') enCompleted++
      else if (e.status === 'WITHDRAWN') enWithdrawn++
    }
    const enrollmentStats = {
      total: allEnrollments.length,
      invited: enInvited,
      active: enActive,
      completed: enCompleted,
      withdrawn: enWithdrawn,
    }

    // Per-program stats — single pass per program
    const programStats = programs.map((program) => {
      let pPromoters = 0, pDetractors = 0
      for (const s of program.npsSurveys) {
        if (s.score >= 9) pPromoters++
        else if (s.score <= 6) pDetractors++
      }
      const pTotal = program.npsSurveys.length
      const programNps = pTotal > 0
        ? Math.round(((pPromoters - pDetractors) / pTotal) * 100)
        : null

      let enActiveP = 0, enInvitedP = 0, fbUnreviewedP = 0
      for (const e of program.enrollments) {
        if (e.status === 'ACTIVE') enActiveP++
        else if (e.status === 'INVITED') enInvitedP++
      }
      for (const f of program.feedback) {
        if (!f.isReviewed) fbUnreviewedP++
      }

      return {
        id: program.id,
        name: program.name,
        featureArea: program.featureArea,
        startDate: program.startDate,
        endDate: program.endDate,
        stats: {
          enrollments: { total: program.enrollments.length, active: enActiveP, invited: enInvitedP },
          feedback: { total: program.feedback.length, unreviewed: fbUnreviewedP },
          nps: { score: programNps, responses: pTotal },
        },
      }
    })

    // Top contributors (most feedback submitted)
    const contributorMap = new Map<string, { contractor: { id: string; businessName: string }; feedbackCount: number; npsCount: number }>()

    for (const program of programs) {
      for (const feedback of program.feedback) {
        const enrollment = program.enrollments.find((e) => e.contractorId === feedback.contractorId)
        if (enrollment?.contractor) {
          const key = enrollment.contractor.id
          const existing = contributorMap.get(key)
          if (existing) {
            existing.feedbackCount++
          } else {
            contributorMap.set(key, {
              contractor: enrollment.contractor,
              feedbackCount: 1,
              npsCount: 0,
            })
          }
        }
      }

      for (const nps of program.npsSurveys) {
        const enrollment = program.enrollments.find((e) => e.contractorId === nps.contractorId)
        if (enrollment?.contractor) {
          const key = enrollment.contractor.id
          const existing = contributorMap.get(key)
          if (existing) {
            existing.npsCount++
          } else {
            contributorMap.set(key, {
              contractor: enrollment.contractor,
              feedbackCount: 0,
              npsCount: 1,
            })
          }
        }
      }
    }

    const topContributors = Array.from(contributorMap.values())
      .sort((a, b) => (b.feedbackCount + b.npsCount) - (a.feedbackCount + a.npsCount))
      .slice(0, 5)

    // Recent feedback
    const recentFeedback = allFeedback
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map((f) => ({
        id: f.id,
        title: f.title,
        category: f.category,
        priority: f.priority,
        status: f.status,
        isReviewed: f.isReviewed,
        createdAt: f.createdAt,
        programId: f.programId,
      }))

    return NextResponse.json({
      overview: {
        activePrograms: programs.length,
        totalParticipants: enrollmentStats.active,
        pendingInvitations: enrollmentStats.invited,
        totalFeedback: feedbackStats.total,
        unreviewedFeedback: feedbackStats.unreviewed,
      },
      nps: {
        overall: overallNps,
        promoters,
        passives,
        detractors,
        totalResponses,
        trend: weeklyNps,
      },
      feedback: feedbackStats,
      enrollments: enrollmentStats,
      programs: programStats,
      topContributors,
      recentFeedback,
    })
  } catch (error) {
    console.error('Error fetching beta analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch beta analytics' },
      { status: 500 }
    )
  }
}
