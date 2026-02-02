import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIImageEnhancementService } from '@/lib/services/ai-image-enhancement.service';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/ai-enhancement/images
 * Trigger batch enhancement for unprocessed images
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate and authorize
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin or super admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { userType: true },
    });

    if (!user || (user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // 2. Parse request body
    const body = await req.json();
    const {
      limit = 100,
      reportId,
      claimId,
      damageCategory,
      minDate,
    } = body;

    // 3. Validate limit
    const maxBatchSize = parseInt(process.env.AI_IMAGE_ENHANCEMENT_MAX_BATCH_SIZE || '100');
    if (limit > maxBatchSize) {
      return NextResponse.json(
        { error: `Batch size cannot exceed ${maxBatchSize}` },
        { status: 400 }
      );
    }

    // 4. Build query filters
    const where: any = {
      aiEnhanced: false,
      photoUrl: { not: null },
    };

    if (reportId) {
      where.reportId = reportId;
    }

    if (damageCategory) {
      where.damageArea = {
        damageCategory,
      };
    }

    if (minDate) {
      where.createdAt = {
        gte: new Date(minDate),
      };
    }

    if (claimId) {
      where.report = {
        booking: {
          auClaims: {
            some: {
              id: claimId,
            },
          },
        },
      };
    }

    // 5. Fetch unprocessed photos
    const unprocessedPhotos = await prisma.inspectionPhoto.findMany({
      where,
      take: limit,
      select: { id: true },
    });

    if (unprocessedPhotos.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No unprocessed images found matching criteria',
        totalImages: 0,
      });
    }

    // 6. Estimate cost
    const estimatedCostPerImage = 0.0024; // GPT-4o average cost
    const estimatedCost = unprocessedPhotos.length * estimatedCostPerImage;

    const maxCost = parseFloat(process.env.AI_IMAGE_ENHANCEMENT_MAX_COST_USD || '100');
    if (estimatedCost > maxCost) {
      return NextResponse.json(
        {
          error: `Estimated cost $${estimatedCost.toFixed(2)} exceeds maximum budget $${maxCost.toFixed(2)}`,
          totalImages: unprocessedPhotos.length,
          estimatedCost,
        },
        { status: 400 }
      );
    }

    // 7. Create batch job record
    const job = await prisma.aIBatchProcessingJob.create({
      data: {
        jobType: 'IMAGE_ENHANCEMENT',
        status: 'PENDING',
        totalImages: unprocessedPhotos.length,
        initiatedBy: session.user.id,
        tenantId: session.user.tenantId || null,
        metadata: {
          filters: {
            reportId,
            claimId,
            damageCategory,
            minDate,
          },
        },
      },
    });

    // 8. Process images (synchronously for MVP, can be moved to queue later)
    // Note: In production, this should be done via background queue
    const service = new AIImageEnhancementService();
    const photoIds = unprocessedPhotos.map((p) => p.id);

    // Start processing in background (fire and forget for now)
    processBatchAsync(job.id, photoIds, service).catch(console.error);

    return NextResponse.json({
      success: true,
      jobId: job.id,
      totalImages: unprocessedPhotos.length,
      estimatedCost,
      message: 'Batch job started',
    });
  } catch (error: any) {
    console.error('Batch enhancement error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Process batch asynchronously
 */
async function processBatchAsync(
  jobId: string,
  photoIds: string[],
  service: AIImageEnhancementService
) {
  // Update job status to processing
  await prisma.aIBatchProcessingJob.update({
    where: { id: jobId },
    data: {
      status: 'PROCESSING',
      startedAt: new Date(),
    },
  });

  let successCount = 0;
  let failureCount = 0;
  let totalCost = 0;

  try {
    for (const photoId of photoIds) {
      try {
        const result = await service.enhanceSingleImage(photoId);

        if (result.success) {
          successCount++;
          totalCost += result.cost;
        } else {
          failureCount++;
        }

        // Update job progress
        await prisma.aIBatchProcessingJob.update({
          where: { id: jobId },
          data: {
            processedImages: successCount + failureCount,
            successCount,
            failureCount,
            totalCostUSD: totalCost,
          },
        });
      } catch (error) {
        console.error(`Failed to enhance photo ${photoId}:`, error);
        failureCount++;
      }
    }

    // Mark job as completed
    await prisma.aIBatchProcessingJob.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });
  } catch (error) {
    // Mark job as failed
    await prisma.aIBatchProcessingJob.update({
      where: { id: jobId },
      data: {
        status: 'FAILED',
        completedAt: new Date(),
      },
    });

    throw error;
  }
}
