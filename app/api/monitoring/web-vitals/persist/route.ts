import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.metricName || !data.value || !data.page) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store in database
    await prisma.webVitalMetric.create({
      data: {
        metricName: data.metricName,
        value: parseFloat(data.value),
        rating: data.rating || 'unknown',
        page: data.page,
        deviceType: data.deviceType || 'unknown',
        userAgent: request.headers.get('user-agent') || undefined,
        timestamp: new Date(data.timestamp || Date.now()),
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to persist web vital:', error);
    return NextResponse.json(
      { error: 'Failed to persist metric' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
