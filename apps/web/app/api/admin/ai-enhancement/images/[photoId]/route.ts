import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIImageEnhancementService } from '@/lib/services/ai-image-enhancement.service';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/ai-enhancement/images/[photoId]
 * Enhance a single image by ID
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { photoId: string } }
) {
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

    // 2. Get photoId from params
    const { photoId } = params;

    if (!photoId) {
      return NextResponse.json({ error: 'Photo ID is required' }, { status: 400 });
    }

    // 3. Check if photo exists
    const photo = await prisma.inspectionPhoto.findUnique({
      where: { id: photoId },
      select: { id: true, aiEnhanced: true, photoUrl: true },
    });

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    if (!photo.photoUrl) {
      return NextResponse.json({ error: 'Photo has no URL' }, { status: 400 });
    }

    // 4. Enhance the image
    const service = new AIImageEnhancementService();
    const result = await service.enhanceSingleImage(photoId);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error || 'Enhancement failed',
          photoId,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      photoId: result.photoId,
      description: result.description,
      cost: result.cost,
      processingTime: result.processingTime,
    });
  } catch (error: any) {
    console.error('Single image enhancement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
