import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getWorkerService } from '@/lib/services/autonomousWorker.service';

export async function POST(request: NextRequest) {
    try {
          // Authenticate user
          const authResult = await authenticateRequest(request);
          if (!authResult.success) {
            return authResult.response;
          }

          const { user } = authResult.context;
          const { text } = await request.json();

      if (!text) {
              return NextResponse.json(
                { error: 'Missing required field: text' },
                { status: 400 }
                      );
      }

      const workerService = getWorkerService();
          const jobId = await workerService.enqueueTask(
                  user.id,
                  'extraction',
            {
                      taskType: 'extraction',
                      input: text,
            },
                  8
                );

      return NextResponse.json({
              success: true,
              jobId,
              status: 'queued',
      });
    } catch (error) {
          return NextResponse.json(
            { error: 'Failed to process' },
            { status: 500 }
                );
    }
}
