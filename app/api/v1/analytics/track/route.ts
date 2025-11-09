/**
 * Analytics Tracking API Endpoint
 *
 * Custom event tracking for conversion analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TrackingEventSchema = z.object({
  eventName: z.string().min(1),
  eventCategory: z.enum(['pageview', 'engagement', 'conversion', 'error', 'custom']),
  eventValue: z.number().optional(),
  page: z.string().min(1),
  properties: z.record(z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = TrackingEventSchema.parse(body);

    // Extract device and location information
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');

    const deviceType = userAgent.includes('Mobile')
      ? 'mobile'
      : userAgent.includes('Tablet')
      ? 'tablet'
      : 'desktop';

    // Log event
    console.log('[ANALYTICS] Event tracked:', {
      event: validatedData.eventName,
      category: validatedData.eventCategory,
      page: validatedData.page,
      deviceType,
    });

    // In production, send to analytics platforms:
    // - Google Analytics 4
    // - Mixpanel
    // - Segment
    // - Custom data warehouse

    return NextResponse.json({
      success: true,
      tracked: validatedData.eventName,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Analytics tracking error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid tracking data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'TRACKING_ERROR',
        message: 'Failed to track event',
      },
      { status: 500 }
    );
  }
}

// Next.js 14 App Router Route Segment Config
export const runtime = 'nodejs';
export const maxDuration = 5;
