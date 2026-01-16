/**
 * Blog Publishing Cron Job
 * Automatically publishes scheduled articles
 * Runs every 30 minutes via Vercel cron
 *
 * Add to vercel.json crons array:
 * path: /api/blog/cron/publish
 * schedule: every 30 minutes
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/blog/cron/publish
 * Publish all scheduled articles that are ready
 */
export async function GET(request: NextRequest) {
  // Verify request is from Vercel cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const now = new Date();

    // Find all SCHEDULED articles where scheduledFor <= now
    const articlesToPublish = await prisma.blogPost.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledFor: {
          lte: now
        }
      }
    });

    if (articlesToPublish.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No articles scheduled for publishing',
        published: 0
      });
    }

    // Publish all articles
    const publishedArticles = await Promise.all(
      articlesToPublish.map(article =>
        prisma.blogPost.update({
          where: { id: article.id },
          data: {
            status: 'PUBLISHED',
            publishedAt: now
          }
        })
      )
    );

    console.log(`✅ Published ${publishedArticles.length} articles`);

    // Trigger sitemap update and Search Console notification
    try {
      // Revalidate sitemap
      if (process.env.VERCEL_ENV === 'production') {
        // Could add logic to notify Google Search Console
        console.log('Triggering sitemap revalidation...');
      }
    } catch (error) {
      console.warn('Failed to trigger sitemap update:', error);
    }

    return NextResponse.json({
      success: true,
      message: `Published ${publishedArticles.length} articles`,
      published: publishedArticles.length,
      articles: publishedArticles.map(a => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        publishedAt: a.publishedAt
      }))
    });
  } catch (error) {
    console.error('Cron job failed:', error);

    return NextResponse.json(
      {
        error: 'Publishing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blog/cron/publish
 * Manual trigger for publishing (dev/testing)
 */
export async function POST(request: NextRequest) {
  // Only allow in development or with auth
  if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { force = false } = body;

    const now = new Date();

    // Find scheduled articles
    const query: any = {
      status: 'SCHEDULED',
      scheduledFor: {
        lte: now
      }
    };

    // Optional: force publish all scheduled articles regardless of date
    if (force) {
      query.status = 'SCHEDULED';
      delete query.scheduledFor;
    }

    const articlesToPublish = await prisma.blogPost.findMany({
      where: query
    });

    // Publish articles
    const publishedArticles = await Promise.all(
      articlesToPublish.map(article =>
        prisma.blogPost.update({
          where: { id: article.id },
          data: {
            status: 'PUBLISHED',
            publishedAt: now
          }
        })
      )
    );

    return NextResponse.json({
      success: true,
      published: publishedArticles.length,
      articles: publishedArticles.map(a => ({
        title: a.title,
        slug: a.slug
      }))
    });
  } catch (error) {
    console.error('Manual publishing failed:', error);
    return NextResponse.json(
      { error: 'Publishing failed' },
      { status: 500 }
    );
  }
}
