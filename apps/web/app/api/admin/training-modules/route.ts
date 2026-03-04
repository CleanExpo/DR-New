/**
 * Admin API - Training Modules CRUD Management
 *
 * Provides full CRUD operations for managing training modules
 * GET    /api/admin/training-modules - List all modules
 * POST   /api/admin/training-modules - Create new module
 * PATCH  /api/admin/training-modules/:id - Update module
 * DELETE /api/admin/training-modules/:id - Delete module
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

// Validation schema for creating/updating training modules
const trainingModuleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  category: z.string().min(1, 'Category is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  isPublished: z.boolean().optional().default(false),
});

// GET /api/admin/training-modules
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isPublished = searchParams.get('isPublished');
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = Math.min(parseInt(searchParams.get('take') || '20'), 100);

    const { prisma } = await import('@/lib/prisma');

    // Build where clause
    const where: any = { isDeleted: false };
    if (category) where.category = category;
    if (isPublished !== null) where.isPublished = isPublished === 'true';

    const [modules, total] = await Promise.all([
      prisma.trainingModule.findMany({
        where,
        skip,
        take,
        include: {
          progress: {
            select: {
              userId: true,
              completed: true,
              progress: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.trainingModule.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      modules: modules.map(module => {
        const total = module.progress.length;
        let completed = 0;
        for (const p of module.progress) { if (p.completed) completed++; }
        return {
          ...module,
          totalEnrollments: total,
          completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      }),
      pagination: {
        total,
        skip,
        take,
        hasMore: skip + take < total,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

// POST /api/admin/training-modules
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();

    // Validate request
    let validatedData;
    try {
      validatedData = trainingModuleSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            details: error.errors,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    const { prisma } = await import('@/lib/prisma');

    // Check if slug already exists
    const existingModule = await prisma.trainingModule.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingModule) {
      return NextResponse.json(
        {
          success: false,
          error: 'A module with this slug already exists',
        },
        { status: 409 }
      );
    }

    // Create module
    const newModule = await prisma.trainingModule.create({
      data: {
        ...validatedData,
        level: validatedData.level || 'beginner',
        createdBy: user.id,
      },
    });

    console.log('=== TRAINING MODULE CREATED ===');
    console.log('Module ID:', newModule.id);
    console.log('Title:', validatedData.title);
    console.log('Slug:', validatedData.slug);
    console.log('Category:', validatedData.category);
    console.log('=====================================');

    return NextResponse.json(
      {
        success: true,
        message: 'Training module created successfully',
        module: newModule,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

// PATCH /api/admin/training-modules/[id]
export async function PATCH(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Module ID is required' },
        { status: 400 }
      );
    }

    // Validate updateable fields
    let validatedData;
    try {
      validatedData = trainingModuleSchema.partial().parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            details: error.errors,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    const { prisma } = await import('@/lib/prisma');

    // Update module
    const updatedModule = await prisma.trainingModule.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    console.log('=== TRAINING MODULE UPDATED ===');
    console.log('Module ID:', id);
    console.log('Updated fields:', Object.keys(validatedData));
    console.log('=====================================');

    return NextResponse.json({
      success: true,
      message: 'Training module updated successfully',
      module: updatedModule,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { success: false, error: 'Training module not found' },
        { status: 404 }
      );
    }
    return handleUnexpectedError(error);
  }
}

// DELETE /api/admin/training-modules/[id]
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Module ID is required' },
        { status: 400 }
      );
    }

    const { prisma } = await import('@/lib/prisma');

    // Soft delete (mark as deleted)
    const deletedModule = await prisma.trainingModule.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    console.log('=== TRAINING MODULE DELETED ===');
    console.log('Module ID:', id);
    console.log('Title:', deletedModule.title);
    console.log('====================================');

    return NextResponse.json({
      success: true,
      message: 'Training module deleted successfully',
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { success: false, error: 'Training module not found' },
        { status: 404 }
      );
    }
    return handleUnexpectedError(error);
  }
}
