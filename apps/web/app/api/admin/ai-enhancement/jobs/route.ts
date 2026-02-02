import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering (required for Next.js 14 App Router)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/admin/ai-enhancement/jobs
 * List all batch processing jobs with pagination
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate and authorize
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin or super admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { userType: true, tenantId: true },
    });

    if (!user || (user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // 2. Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    // 3. Build query filters
    const where: any = {
      jobType: 'IMAGE_ENHANCEMENT',
    };

    // Filter by tenant if not super admin
    if (user.userType !== 'SUPER_ADMIN' && user.tenantId) {
      where.tenantId = user.tenantId;
    }

    if (status) {
      where.status = status;
    }

    // 4. Fetch jobs with pagination
    const [jobs, total] = await Promise.all([
      prisma.aIBatchProcessingJob.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          initiator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.aIBatchProcessingJob.count({ where }),
    ]);

    // 5. Calculate estimated completion for active jobs
    const jobsWithEstimates = jobs.map((job) => {
      let estimatedCompletion = null;

      if (job.status === 'PROCESSING' && job.startedAt) {
        const elapsedMs = Date.now() - new Date(job.startedAt).getTime();
        const processedCount = job.processedImages;
        const totalCount = job.totalImages;

        if (processedCount > 0) {
          const avgTimePerImage = elapsedMs / processedCount;
          const remainingImages = totalCount - processedCount;
          const estimatedRemainingMs = remainingImages * avgTimePerImage;
          estimatedCompletion = new Date(Date.now() + estimatedRemainingMs);
        }
      }

      return {
        ...job,
        estimatedCompletion,
      };
    });

    return NextResponse.json({
      jobs: jobsWithEstimates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Jobs list error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
