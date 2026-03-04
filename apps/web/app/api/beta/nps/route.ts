import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/auth-middleware'
import { getTenantDb } from '@/lib/get-tenant-db'
import { z } from 'zod'

// GET - Check if NPS survey is due and get past surveys
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { user } = authResult.context
    const db = getTenantDb(authResult.context)

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      include: {
        contractor: {
          select: { id: true },
        },
      },
    })

    if (!dbUser?.contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const programId = searchParams.get('programId')

    // Get active enrollments
    const enrollments = await db.betaEnrollment.findMany({
      where: {
        contractorId: dbUser.contractor.id,
        status: 'ACTIVE',
        program: {
          isActive: true,
        },
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (enrollments.length === 0) {
      return NextResponse.json({
        isDue: false,
        surveys: [],
        message: 'No active beta enrollments',
      })
    }

    // Filter by programId if provided
    const relevantEnrollments = programId
      ? enrollments.filter((e) => e.programId === programId)
      : enrollments

    // Check when last NPS was submitted for each program — single batch query
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const programIds = relevantEnrollments.map((e) => e.programId)
    const contractorId = dbUser.contractor!.id

    // Fetch the most recent survey per program in one query, then pick latest per program
    const recentSurveys = await db.betaNPSSurvey.findMany({
      where: { programId: { in: programIds }, contractorId },
      orderBy: { createdAt: 'desc' },
      select: { programId: true, createdAt: true, score: true },
    })

    // Build a Map of programId -> most recent survey (already sorted desc)
    const lastSurveyByProgram = new Map<string, typeof recentSurveys[0]>()
    for (const survey of recentSurveys) {
      if (!lastSurveyByProgram.has(survey.programId)) {
        lastSurveyByProgram.set(survey.programId, survey)
      }
    }

    const surveysWithDueStatus = relevantEnrollments.map((enrollment) => {
      const lastSurvey = lastSurveyByProgram.get(enrollment.programId) ?? null
      const isDue = !lastSurvey || lastSurvey.createdAt < oneWeekAgo
      return {
        program: enrollment.program,
        lastSurveyAt: lastSurvey?.createdAt ?? null,
        lastScore: lastSurvey?.score ?? null,
        isDue,
      }
    })

    // Get survey history
    const whereClause: Record<string, unknown> = {
      contractorId: dbUser.contractor.id,
    }

    if (programId) {
      whereClause.programId = programId
    }

    const pastSurveys = await db.betaNPSSurvey.findMany({
      where: whereClause,
      include: {
        program: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    const anyDue = surveysWithDueStatus.some((s) => s.isDue)

    return NextResponse.json({
      isDue: anyDue,
      programs: surveysWithDueStatus,
      surveys: pastSurveys.map((s) => ({
        id: s.id,
        program: s.program,
        score: s.score,
        followUpAnswer: s.followUpAnswer,
        surveyTrigger: s.surveyTrigger,
        createdAt: s.createdAt,
      })),
    })
  } catch (error) {
    console.error('Error checking NPS status:', error)
    return NextResponse.json(
      { error: 'Failed to check NPS status' },
      { status: 500 }
    )
  }
}

// NPS submission schema
const submitNpsSchema = z.object({
  programId: z.string().min(1, 'Program ID is required'),
  score: z.number().min(0).max(10),
  followUpAnswer: z.string().optional(),
  surveyTrigger: z.enum(['weekly', 'feature_use', 'manual']).optional(),
})

// POST - Submit NPS survey
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { user } = authResult.context
    const db = getTenantDb(authResult.context)

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      include: {
        contractor: {
          select: { id: true },
        },
      },
    })

    if (!dbUser?.contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 })
    }

    const body = await request.json()
    const validationResult = submitNpsSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { programId, score, followUpAnswer, surveyTrigger } = validationResult.data

    // Verify contractor is enrolled in this program
    const enrollment = await db.betaEnrollment.findFirst({
      where: {
        programId,
        contractorId: dbUser.contractor.id,
        status: 'ACTIVE',
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: 'You are not enrolled in this beta program' },
        { status: 403 }
      )
    }

    if (!enrollment.program.isActive) {
      return NextResponse.json(
        { error: 'Beta program is no longer active' },
        { status: 400 }
      )
    }

    // Create the NPS survey
    const survey = await db.betaNPSSurvey.create({
      data: {
        programId,
        contractorId: dbUser.contractor.id,
        score,
        followUpAnswer,
        surveyTrigger: surveyTrigger || 'manual',
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Determine NPS category
    let category: 'promoter' | 'passive' | 'detractor'
    if (score >= 9) {
      category = 'promoter'
    } else if (score >= 7) {
      category = 'passive'
    } else {
      category = 'detractor'
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'BETA_NPS_SUBMITTED',
        entityType: 'BetaNPSSurvey',
        entityId: survey.id,
        userId: user.id,
        newValues: {
          programId,
          score,
          category,
        },
      },
    })

    return NextResponse.json(
      {
        message: 'NPS survey submitted successfully',
        survey: {
          id: survey.id,
          program: survey.program,
          score: survey.score,
          category,
          createdAt: survey.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting NPS survey:', error)
    return NextResponse.json(
      { error: 'Failed to submit NPS survey' },
      { status: 500 }
    )
  }
}
