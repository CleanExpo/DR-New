import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';
import { draftDataSchema } from '@/lib/validation/onboarding';

// POST: Create new draft
export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const body = await request.json();

    // Validate draft data
    const validatedData = draftDataSchema.parse(body);

    // Check if draft already exists for this user
    const existingDraft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (existingDraft) {
      // Update existing draft instead
      const updatedDraft = await prisma.onboardingDraft.update({
        where: { userId: user.id },
        data: {
          data: JSON.stringify(validatedData),
          step: validatedData.step || existingDraft.step,
          updatedAt: new Date()
        }
      });

      return NextResponse.json({
        success: true,
        data: {
          draftId: updatedDraft.id,
          message: 'Draft updated successfully'
        }
      });
    }

    // Create new draft
    const draft = await prisma.onboardingDraft.create({
      data: {
        userId: user.id,
        data: JSON.stringify(validatedData),
        step: validatedData.step || 0
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        draftId: draft.id,
        message: 'Draft created successfully'
      }
    });

  } catch (error) {
    console.error('Draft creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save draft'
      },
      { status: 500 }
    );
  }
}

// PATCH: Update existing draft
export async function PATCH(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const body = await request.json();

    // Find existing draft
    const existingDraft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (!existingDraft) {
      return NextResponse.json(
        {
          success: false,
          error: 'No draft found. Please create a draft first.'
        },
        { status: 404 }
      );
    }

    // Parse existing data
    let existingData = {};
    try {
      existingData = JSON.parse(existingDraft.data);
    } catch {
      // If parsing fails, start with empty object
      existingData = {};
    }

    // Merge new data with existing data
    const mergedData = {
      ...existingData,
      ...body.data,
      lastUpdated: new Date().toISOString()
    };

    // Update step if provided
    const newStep = body.step !== undefined ? body.step : existingDraft.step;

    // Update draft
    const updatedDraft = await prisma.onboardingDraft.update({
      where: { id: existingDraft.id },
      data: {
        data: JSON.stringify(mergedData),
        step: newStep,
        updatedAt: new Date()
      }
    });

    // Update onboarding progress if exists
    const progress = await prisma.onboardingProgress.findUnique({
      where: { contractorId: user.id }
    });

    if (progress && newStep > progress.currentStep) {
      await prisma.onboardingProgress.update({
        where: { contractorId: user.id },
        data: {
          currentStep: newStep
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        draftId: updatedDraft.id,
        step: updatedDraft.step,
        message: 'Draft updated successfully'
      }
    });

  } catch (error) {
    console.error('Draft update error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update draft'
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve draft
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    // Find draft for this user
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (!draft) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No draft found'
      });
    }

    // Parse draft data
    let draftData = {};
    try {
      draftData = JSON.parse(draft.data);
    } catch {
      draftData = {};
    }

    // Get onboarding progress
    const progress = await prisma.onboardingProgress.findUnique({
      where: { contractorId: user.id }
    });

    return NextResponse.json({
      success: true,
      data: {
        draftId: draft.id,
        step: draft.step,
        data: draftData,
        progress: progress ? {
          currentStep: progress.currentStep,
          totalSteps: progress.totalSteps,
          completed: progress.completed
        } : null,
        createdAt: draft.createdAt,
        updatedAt: draft.updatedAt
      }
    });

  } catch (error) {
    console.error('Draft retrieval error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve draft'
      },
      { status: 500 }
    );
  }
}

// DELETE: Clear draft (optional)
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    // Find and delete draft
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (!draft) {
      return NextResponse.json(
        {
          success: false,
          error: 'No draft found'
        },
        { status: 404 }
      );
    }

    await prisma.onboardingDraft.delete({
      where: { id: draft.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Draft deleted successfully'
    });

  } catch (error) {
    console.error('Draft deletion error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete draft'
      },
      { status: 500 }
    );
  }
}