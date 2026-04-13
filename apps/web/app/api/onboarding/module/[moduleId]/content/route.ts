/**
 * NRPG Module Content API
 * GET: Retrieve module training content (markdown)
 */

import { NextRequest, NextResponse } from 'next/server';
import { ModuleStatus, NRPGTrainingProgress } from '@prisma/client';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { getModuleById, parseModuleId } from '@/lib/nrpg/course-loader';

export async function GET(
  request: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const { moduleId } = params;

    // Validate module ID format
    const parsed = parseModuleId(moduleId);
    if (!parsed) {
      return NextResponse.json(
        { success: false, error: 'Invalid module ID format. Expected CSE-XX or WRT-XX' },
        { status: 400 }
      );
    }

    // Get module info and content
    const courseModule = getModuleById(moduleId);
    if (!courseModule) {
      return NextResponse.json(
        { success: false, error: 'Module not found' },
        { status: 404 }
      );
    }

    // Get user's progress for this module
    const contractor = await db.contractor.findFirst({
      where: { userId: user.id },
      select: { id: true },
    });

    let progress: NRPGTrainingProgress | null = null;
    if (contractor) {
      progress = await db.nRPGTrainingProgress.findUnique({
        where: {
          contractorId_moduleId: {
            contractorId: contractor.id,
            moduleId,
          },
        },
      });

      // If no progress exists, create it and mark content as viewed
      if (!progress) {
        progress = await db.nRPGTrainingProgress.create({
          data: {
            contractorId: contractor.id,
            courseId: parsed.courseId,
            moduleId,
            moduleName: courseModule.info.title,
            moduleOrder: courseModule.info.moduleOrder,
            status: ModuleStatus.IN_PROGRESS,
            progress: 10, // Started
            startedAt: new Date(),
            contentViewedAt: new Date(),
            estimatedMinutes: courseModule.info.estimatedMinutes,
          },
        });
      } else if (!progress.contentViewedAt) {
        // Update content viewed timestamp
        progress = await db.nRPGTrainingProgress.update({
          where: { id: progress.id },
          data: {
            contentViewedAt: new Date(),
            status: progress.status === ModuleStatus.NOT_STARTED ? ModuleStatus.IN_PROGRESS : progress.status,
            progress: Math.max(progress.progress, 10),
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        moduleInfo: courseModule.info,
        content: {
          trainingContent: courseModule.content.trainingContent,
          hasAssessment: !!courseModule.content.assessment,
          hasExercises: !!courseModule.content.exercises,
          hasResources: !!courseModule.content.resources,
        },
        progress,
      },
    });
  } catch (error) {
    console.error('Error fetching module content:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Update progress (mark sections as complete, record time spent)
export async function POST(
  request: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const { moduleId } = params;
    const body = await request.json();

    const parsed = parseModuleId(moduleId);
    if (!parsed) {
      return NextResponse.json(
        { success: false, error: 'Invalid module ID format' },
        { status: 400 }
      );
    }

    const contractor = await db.contractor.findFirst({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
    }

    interface ProgressUpdate {
      actualMinutes?: number;
      exercisesComplete?: boolean;
      resourcesViewed?: boolean;
      progress?: number;
      status?: ModuleStatus;
      completedAt?: Date;
    }
    const updateData: ProgressUpdate = {};

    // Update time spent
    if (body.timeSpentMinutes !== undefined) {
      const current = await db.nRPGTrainingProgress.findUnique({
        where: {
          contractorId_moduleId: {
            contractorId: contractor.id,
            moduleId,
          },
        },
        select: { actualMinutes: true },
      });
      updateData.actualMinutes = (current?.actualMinutes || 0) + body.timeSpentMinutes;
    }

    // Update section completion
    if (body.exercisesComplete !== undefined) {
      updateData.exercisesComplete = body.exercisesComplete;
    }
    if (body.resourcesViewed !== undefined) {
      updateData.resourcesViewed = body.resourcesViewed;
    }

    // Calculate progress percentage
    if (Object.keys(updateData).length > 0) {
      const current = await db.nRPGTrainingProgress.findUnique({
        where: {
          contractorId_moduleId: {
            contractorId: contractor.id,
            moduleId,
          },
        },
      });

      if (current) {
        let progressPercent = 10; // Base for viewing content
        if (current.contentViewedAt) progressPercent += 20;
        if (updateData.exercisesComplete ?? current.exercisesComplete) progressPercent += 20;
        if (updateData.resourcesViewed ?? current.resourcesViewed) progressPercent += 10;
        if (current.quizPassed) progressPercent += 40;

        updateData.progress = Math.min(progressPercent, 100);

        // Mark as completed if all done
        if (updateData.progress >= 100) {
          updateData.status = ModuleStatus.COMPLETED;
          updateData.completedAt = new Date();
        }
      }
    }

    const progress = await db.nRPGTrainingProgress.update({
      where: {
        contractorId_moduleId: {
          contractorId: contractor.id,
          moduleId,
        },
      },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error('Error updating module progress:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
