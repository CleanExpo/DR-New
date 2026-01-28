import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getWorkerService } from '@/lib/services/autonomousWorker.service';

interface ProcessRequest {
    taskType: 'summarization' | 'qa' | 'generation' | 'extraction';
    input: string;
    context?: string;
    userId: string;
    disasterId?: string;
}

export async function POST(request: NextRequest) {
    try {
          const authResult = await authenticateRequest(request);
          if (!authResult.success) {
            return authResult.response;
          }

          const { user } = authResult.context;

          const body: ProcessRequest = await request.json();
          const { taskType, input, context, disasterId } = body;

      if (!input || !taskType) {
              return NextResponse.json(
                { error: 'Missing required fields: input, taskType' },
                { status: 400 }
                      );
      }

      console.log(`Processing T5Gemma task: ${taskType} for user: ${user.id}`);

      const workerService = getWorkerService();
          const jobId = await workerService.enqueueTask(
                  // userId,
                  taskType,
            {
                      taskType,
                      input,
                      context,
            },
                  8
                );

      return NextResponse.json({
              success: true,
              jobId,
              status: 'queued',
              message: `Task queued successfully`,
      });
    } catch (error) {
          console.error('API error:', error);
          return NextResponse.json(
            {
                      error: error instanceof Error ? error.message : 'Processing failed',
            },
            { status: 500 }
                );
    }
}

export async function GET(request: NextRequest) {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const jobId = request.nextUrl.searchParams.get('jobId');

  if (!jobId) {
        return NextResponse.json(
          { error: 'Missing jobId parameter' },
          { status: 400 }
              );
  }

  const workerService = getWorkerService();
    const status = await workerService.getJobStatus(jobId);

  return NextResponse.json(status);
}
