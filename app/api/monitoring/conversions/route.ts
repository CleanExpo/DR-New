import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await prisma.conversionMetric.create({
      data: {
        conversionType: data.conversionType,
        value: parseFloat(data.value),
        source: data.source || 'unknown',
        medium: data.medium || 'unknown',
        campaign: data.campaign || null,
        keyword: data.keyword || null,
        page: data.page,
        referrer: data.referrer || null,
        serviceArea: data.serviceArea || null,
        suburb: data.suburb || null,
        serviceType: data.serviceType || null,
        leadScore: data.leadScore ? parseInt(data.leadScore) : null,
        leadQuality: data.leadQuality || null,
        urgencyLevel: data.urgencyLevel || null,
        deviceType: data.deviceType || null,
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: request.headers.get('x-forwarded-for') || request.ip || undefined,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to persist conversion:', error);
    return NextResponse.json(
      { error: 'Failed to persist conversion' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const conversionType = searchParams.get('type');
    const serviceArea = searchParams.get('serviceArea');

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const where: any = {
      timestamp: { gte: startDate }
    };

    if (conversionType) where.conversionType = conversionType;
    if (serviceArea) where.serviceArea = serviceArea;

    const conversions = await prisma.conversionMetric.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    // Calculate revenue by source
    const bySource = await prisma.conversionMetric.groupBy({
      by: ['source'],
      where,
      _sum: { value: true },
      _count: true,
    });

    return NextResponse.json({
      conversions,
      bySource: bySource.map(s => ({
        source: s.source,
        totalValue: s._sum.value || 0,
        count: s._count,
      })),
      totalValue: conversions.reduce((sum, c) => sum + c.value, 0),
    });
  } catch (error) {
    console.error('Failed to fetch conversions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversions' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
