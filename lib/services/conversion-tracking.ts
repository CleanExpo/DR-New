/**
 * Conversion Tracking Service
 *
 * Track goal completions and conversion events
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ConversionEvent {
  conversionType: 'emergency_call' | 'contact_form' | 'quote_request' | 'quote_accepted' | 'job_completed' | 'insurance_claim';
  value: number; // AUD value
  source?: string;
  medium?: string;
  campaign?: string;
  keyword?: string;
  page: string;
  referrer?: string;
  serviceArea?: string;
  suburb?: string;
  serviceType?: string;
  leadScore?: number;
  leadQuality?: 'high' | 'medium' | 'low';
  urgencyLevel?: 'emergency' | 'urgent' | 'standard';
  deviceType?: 'mobile' | 'desktop' | 'tablet';
  userAgent?: string;
  ipAddress?: string;
}

export interface ConversionMetrics {
  totalConversions: number;
  totalValue: number;
  averageValue: number;
  conversionRate: number;
  byType: Record<string, { count: number; value: number }>;
  bySource: Record<string, { count: number; value: number; conversionRate: number }>;
  byServiceType: Record<string, { count: number; value: number }>;
  topPerformingPages: Array<{ page: string; conversions: number; value: number }>;
}

/**
 * Track conversion event
 */
export async function trackConversion(event: ConversionEvent): Promise<boolean> {
  try {
    await prisma.conversionMetric.create({
      data: {
        conversionType: event.conversionType,
        value: event.value,
        source: event.source || 'direct',
        medium: event.medium || 'none',
        campaign: event.campaign,
        keyword: event.keyword,
        page: event.page,
        referrer: event.referrer,
        serviceArea: event.serviceArea,
        suburb: event.suburb,
        serviceType: event.serviceType,
        leadScore: event.leadScore,
        leadQuality: event.leadQuality,
        urgencyLevel: event.urgencyLevel,
        deviceType: event.deviceType,
        userAgent: event.userAgent,
        ipAddress: event.ipAddress,
        timestamp: new Date(),
      },
    });

    // Also track in analytics
    await trackAnalyticsEvent({
      eventName: `conversion_${event.conversionType}`,
      eventValue: event.value,
      page: event.page,
      properties: {
        source: event.source,
        serviceType: event.serviceType,
        urgencyLevel: event.urgencyLevel,
      },
    });

    return true;
  } catch (error) {
    console.error('[CONVERSION] Tracking error:', error);
    return false;
  }
}

/**
 * Get conversion metrics for date range
 */
export async function getConversionMetrics(
  startDate: Date,
  endDate: Date
): Promise<ConversionMetrics> {
  const conversions = await prisma.conversionMetric.findMany({
    where: {
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const totalConversions = conversions.length;
  const totalValue = conversions.reduce((sum, c) => sum + c.value, 0);
  const averageValue = totalConversions > 0 ? totalValue / totalConversions : 0;

  // Group by type
  const byType: Record<string, { count: number; value: number }> = {};
  conversions.forEach((c) => {
    if (!byType[c.conversionType]) {
      byType[c.conversionType] = { count: 0, value: 0 };
    }
    byType[c.conversionType].count++;
    byType[c.conversionType].value += c.value;
  });

  // Group by source
  const bySource: Record<string, { count: number; value: number; conversionRate: number }> = {};
  conversions.forEach((c) => {
    const source = c.source || 'direct';
    if (!bySource[source]) {
      bySource[source] = { count: 0, value: 0, conversionRate: 0 };
    }
    bySource[source].count++;
    bySource[source].value += c.value;
  });

  // Group by service type
  const byServiceType: Record<string, { count: number; value: number }> = {};
  conversions.forEach((c) => {
    if (c.serviceType) {
      if (!byServiceType[c.serviceType]) {
        byServiceType[c.serviceType] = { count: 0, value: 0 };
      }
      byServiceType[c.serviceType].count++;
      byServiceType[c.serviceType].value += c.value;
    }
  });

  // Top performing pages
  const pageMap: Record<string, { conversions: number; value: number }> = {};
  conversions.forEach((c) => {
    if (!pageMap[c.page]) {
      pageMap[c.page] = { conversions: 0, value: 0 };
    }
    pageMap[c.page].conversions++;
    pageMap[c.page].value += c.value;
  });

  const topPerformingPages = Object.entries(pageMap)
    .map(([page, data]) => ({ page, ...data }))
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 10);

  // Calculate conversion rate (need session data)
  const sessions = await prisma.userSession.count({
    where: {
      startTime: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const conversionRate = sessions > 0 ? totalConversions / sessions : 0;

  return {
    totalConversions,
    totalValue,
    averageValue,
    conversionRate,
    byType,
    bySource,
    byServiceType,
    topPerformingPages,
  };
}

/**
 * Calculate ROI for marketing campaigns
 */
export async function calculateROI(
  campaign: string,
  startDate: Date,
  endDate: Date
): Promise<{
  revenue: number;
  cost: number;
  roi: number;
  conversions: number;
  costPerConversion: number;
}> {
  const conversions = await prisma.conversionMetric.findMany({
    where: {
      campaign,
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const revenue = conversions.reduce((sum, c) => sum + c.value, 0);
  const conversionCount = conversions.length;

  // Mock cost data (in production, fetch from campaign management system)
  const cost = 5000; // Example: $5000 spend

  const roi = cost > 0 ? ((revenue - cost) / cost) * 100 : 0;
  const costPerConversion = conversionCount > 0 ? cost / conversionCount : 0;

  return {
    revenue,
    cost,
    roi,
    conversions: conversionCount,
    costPerConversion,
  };
}

/**
 * Track custom analytics event
 */
async function trackAnalyticsEvent(event: {
  eventName: string;
  eventValue?: number;
  page: string;
  properties?: Record<string, unknown>;
}): Promise<boolean> {
  try {
    // In production, send to analytics platform (Google Analytics, Mixpanel, etc.)
    console.log('[ANALYTICS] Event tracked:', event.eventName, event);
    return true;
  } catch (error) {
    console.error('[ANALYTICS] Event tracking error:', error);
    return false;
  }
}

/**
 * Get conversion funnel data
 */
export async function getConversionFunnel(
  startDate: Date,
  endDate: Date
): Promise<
  Array<{
    stage: string;
    count: number;
    conversionRate: number;
    dropoffRate: number;
  }>
> {
  const sessions = await prisma.userSession.count({
    where: {
      startTime: { gte: startDate, lte: endDate },
    },
  });

  const contactForms = await prisma.conversionMetric.count({
    where: {
      conversionType: 'contact_form',
      timestamp: { gte: startDate, lte: endDate },
    },
  });

  const quoteRequests = await prisma.conversionMetric.count({
    where: {
      conversionType: 'quote_request',
      timestamp: { gte: startDate, lte: endDate },
    },
  });

  const quotesAccepted = await prisma.conversionMetric.count({
    where: {
      conversionType: 'quote_accepted',
      timestamp: { gte: startDate, lte: endDate },
    },
  });

  const jobsCompleted = await prisma.conversionMetric.count({
    where: {
      conversionType: 'job_completed',
      timestamp: { gte: startDate, lte: endDate },
    },
  });

  return [
    {
      stage: 'Sessions',
      count: sessions,
      conversionRate: 100,
      dropoffRate: 0,
    },
    {
      stage: 'Contact Forms',
      count: contactForms,
      conversionRate: sessions > 0 ? (contactForms / sessions) * 100 : 0,
      dropoffRate: sessions > 0 ? ((sessions - contactForms) / sessions) * 100 : 0,
    },
    {
      stage: 'Quote Requests',
      count: quoteRequests,
      conversionRate: contactForms > 0 ? (quoteRequests / contactForms) * 100 : 0,
      dropoffRate: contactForms > 0 ? ((contactForms - quoteRequests) / contactForms) * 100 : 0,
    },
    {
      stage: 'Quotes Accepted',
      count: quotesAccepted,
      conversionRate: quoteRequests > 0 ? (quotesAccepted / quoteRequests) * 100 : 0,
      dropoffRate: quoteRequests > 0 ? ((quoteRequests - quotesAccepted) / quoteRequests) * 100 : 0,
    },
    {
      stage: 'Jobs Completed',
      count: jobsCompleted,
      conversionRate: quotesAccepted > 0 ? (jobsCompleted / quotesAccepted) * 100 : 0,
      dropoffRate: quotesAccepted > 0 ? ((quotesAccepted - jobsCompleted) / quotesAccepted) * 100 : 0,
    },
  ];
}

/**
 * Attribution tracking
 */
export async function getAttributionData(
  startDate: Date,
  endDate: Date
): Promise<
  Array<{
    source: string;
    medium: string;
    campaign?: string;
    sessions: number;
    conversions: number;
    revenue: number;
    conversionRate: number;
  }>
> {
  const conversions = await prisma.conversionMetric.findMany({
    where: {
      timestamp: { gte: startDate, lte: endDate },
    },
  });

  const attributionMap: Record<
    string,
    {
      sessions: number;
      conversions: number;
      revenue: number;
    }
  > = {};

  for (const conversion of conversions) {
    const key = `${conversion.source}_${conversion.medium}_${conversion.campaign || 'none'}`;

    if (!attributionMap[key]) {
      attributionMap[key] = {
        sessions: 0,
        conversions: 0,
        revenue: 0,
      };
    }

    attributionMap[key].conversions++;
    attributionMap[key].revenue += conversion.value;
  }

  // Get session counts
  const sessions = await prisma.userSession.groupBy({
    by: ['source', 'medium', 'campaign'],
    where: {
      startTime: { gte: startDate, lte: endDate },
    },
    _count: true,
  });

  for (const session of sessions) {
    const key = `${session.source}_${session.medium}_${session.campaign || 'none'}`;
    if (attributionMap[key]) {
      attributionMap[key].sessions = session._count;
    }
  }

  return Object.entries(attributionMap).map(([key, data]) => {
    const [source, medium, campaign] = key.split('_');
    return {
      source,
      medium,
      campaign: campaign !== 'none' ? campaign : undefined,
      sessions: data.sessions,
      conversions: data.conversions,
      revenue: data.revenue,
      conversionRate: data.sessions > 0 ? (data.conversions / data.sessions) * 100 : 0,
    };
  });
}
