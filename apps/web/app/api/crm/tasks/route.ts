/**
 * Tasks API
 *
 * POST /api/crm/tasks - Create task
 * GET /api/crm/tasks - List tasks
 *
 * @route /api/crm/tasks
 */

import { NextRequest, NextResponse } from 'next/server';
import { TaskStatus, TaskPriority } from '@prisma/client';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { TaskService } from '@/lib/crm/task.service';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const taskService = new TaskService(db);

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.assignedToId || !body.createdById) {
      return NextResponse.json(
        {
          success: false,
          error: 'title, assignedToId, and createdById are required',
        },
        { status: 400 }
      );
    }

    const task = await taskService.createTask(body);

    return NextResponse.json({
      success: true,
      data: task,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const taskService = new TaskService(db);

    const { searchParams } = new URL(request.url);
    const assignedToId = searchParams.get('assignedToId');
    const status = searchParams.get('status') as TaskStatus | null;
    const priority = searchParams.get('priority') as TaskPriority | null;

    if (!assignedToId) {
      return NextResponse.json(
        {
          success: false,
          error: 'assignedToId is required',
        },
        { status: 400 }
      );
    }

    const tasks = await taskService.getUserTasks(assignedToId, {
      status: status || undefined,
      priority: priority || undefined,
    });

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
