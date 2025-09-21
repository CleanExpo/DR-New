import { NextResponse } from 'next/server';
import { GMBOptimizer } from '@/lib/gmb/gmb-optimizer';

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    const optimizer = new GMBOptimizer();

    switch (action) {
      case 'optimize-profile':
        const profileData = await optimizer.optimizeBusinessInfo();
        return NextResponse.json({
          success: true,
          message: 'Profile optimization data generated',
          data: profileData
        });

      case 'generate-posts':
        const posts = await optimizer.generateLocalPosts();
        return NextResponse.json({
          success: true,
          message: 'GMB posts generated',
          data: posts
        });

      case 'generate-qa':
        const questions = await optimizer.generateOptimizedQA();
        return NextResponse.json({
          success: true,
          message: 'Q&A content generated',
          data: questions
        });

      case 'review-templates':
        const templates = await optimizer.generateReviewResponses();
        return NextResponse.json({
          success: true,
          message: 'Review response templates generated',
          data: templates
        });

      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('GMB optimization error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error optimizing GMB profile'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'GMB Optimization API',
    endpoints: {
      'POST /api/gmb/optimize': {
        actions: [
          'optimize-profile',
          'generate-posts',
          'generate-qa',
          'review-templates'
        ]
      }
    }
  });
}