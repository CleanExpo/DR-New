import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIImageEnhancementService } from '@/lib/services/ai-image-enhancement.service';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering (required for Next.js 14 App Router)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/admin/ai-enhancement/stats
 * Get overall enhancement statistics
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

    // 2. Get stats from service
    const service = new AIImageEnhancementService();
    const stats = await service.getEnhancementStats();

    // 3. Get tenant-specific stats if not super admin
    if (user.userType !== 'SUPER_ADMIN' && user.tenantId) {
      // Override with tenant-specific counts
      const [totalPhotos, enhancedPhotos, lastLog, costStats] = await Promise.all([
        prisma.inspectionPhoto.count({
          where: { tenantId: user.tenantId },
        }),
        prisma.inspectionPhoto.count({
          where: { tenantId: user.tenantId, aiEnhanced: true },
        }),
        prisma.aIImageEnhancementLog.findFirst({
          where: { tenantId: user.tenantId, success: true },
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true },
        }),
        prisma.aIImageEnhancementLog.aggregate({
          where: { tenantId: user.tenantId, success: true },
          _avg: { costUSD: true, processingMs: true },
          _sum: { costUSD: true },
          _count: true,
        }),
      ]);

      const successCount = costStats._count || 0;
      const totalAttempts = await prisma.aIImageEnhancementLog.count({
        where: { tenantId: user.tenantId },
      });

      return NextResponse.json({
        totalPhotos,
        enhancedPhotos,
        pendingPhotos: totalPhotos - enhancedPhotos,
        totalCostUSD: Number(costStats._sum.costUSD || 0),
        avgCostPerImage: Number(costStats._avg.costUSD || 0),
        avgProcessingTime: costStats._avg.processingMs || 0,
        successRate: totalAttempts > 0 ? (successCount / totalAttempts) * 100 : 0,
        lastProcessedAt: lastLog?.createdAt,
      });
    }

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
