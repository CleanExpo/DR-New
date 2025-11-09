/**
 * Enhanced Conversion Tracking with Database Persistence
 * Production-grade revenue attribution for Disaster Recovery Brisbane
 */

interface ConversionData {
  conversionType: string;
  value: number;
  source: string;
  medium: string;
  campaign: string | null;
  keyword: string | null;
  page: string;
  referrer: string;
  serviceArea: string | null;
  suburb?: string | null;
  serviceType: string | null;
  leadScore?: number;
  leadQuality: string;
  urgencyLevel: string;
  deviceType: string;
}

/**
 * Persist conversion to database
 */
export async function persistConversion(data: ConversionData): Promise<void> {
  try {
    await fetch('/api/monitoring/conversions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Conversion Tracking] Failed to persist:', error);
    }
  }
}

/**
 * Get traffic source from URL parameters or referrer
 */
export function getTrafficSource(): string {
  if (typeof window === 'undefined') return 'direct';

  const params = new URLSearchParams(window.location.search);

  // UTM source
  if (params.has('utm_source')) {
    return params.get('utm_source')!;
  }

  // Referrer-based detection
  const referrer = document.referrer;
  if (!referrer) return 'direct';

  try {
    const referrerHost = new URL(referrer).hostname;

    if (referrerHost.includes('google')) return 'google';
    if (referrerHost.includes('facebook')) return 'facebook';
    if (referrerHost.includes('instagram')) return 'instagram';
    if (referrerHost.includes('linkedin')) return 'linkedin';
    if (referrerHost.includes('bing')) return 'bing';
    if (referrerHost.includes('yahoo')) return 'yahoo';

    return 'referral';
  } catch (e) {
    return 'referral';
  }
}

/**
 * Get traffic medium
 */
export function getTrafficMedium(): string {
  if (typeof window === 'undefined') return 'none';

  const params = new URLSearchParams(window.location.search);

  if (params.has('utm_medium')) {
    return params.get('utm_medium')!;
  }

  const source = getTrafficSource();
  if (source === 'google' || source === 'bing' || source === 'yahoo') return 'organic';
  if (source === 'direct') return 'none';

  return 'referral';
}

/**
 * Get campaign name
 */
export function getCampaign(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get('utm_campaign');
}

/**
 * Extract keyword from referrer (Google search)
 */
export function getReferrerKeyword(): string | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  const referrer = document.referrer;
  if (!referrer) return null;

  try {
    const url = new URL(referrer);
    if (url.hostname.includes('google')) {
      return url.searchParams.get('q');
    }
    if (url.hostname.includes('bing')) {
      return url.searchParams.get('q');
    }
    if (url.hostname.includes('yahoo')) {
      return url.searchParams.get('p');
    }
  } catch (e) {
    return null;
  }

  return null;
}

/**
 * Get device type
 */
export function getDeviceTypeUtil(): string {
  if (typeof window === 'undefined') return 'unknown';

  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Extract service area from pathname
 */
export function extractServiceArea(pathname: string): string | null {
  const areas = ['brisbane', 'ipswich', 'logan', 'gold-coast'];
  const path = pathname.toLowerCase();

  for (const area of areas) {
    if (path.includes(area)) {
      return area;
    }
  }

  return null;
}

/**
 * Extract suburb from pathname
 */
export function extractSuburb(pathname: string): string | null {
  const suburbs = [
    'hamilton', 'ascot', 'new-farm', 'toowong', 'milton', 'fortitude-valley',
    'karalee', 'brookwater', 'springfield-lakes', 'ipswich-cbd',
    'logan-central', 'springwood', 'shailer-park'
  ];
  const path = pathname.toLowerCase();

  for (const suburb of suburbs) {
    if (path.includes(suburb)) {
      return suburb;
    }
  }

  return null;
}

/**
 * Extract service type from pathname
 */
export function extractServiceType(pathname: string): string | null {
  const services = ['water', 'fire', 'mould', 'mold', 'storm', 'flood', 'biohazard'];
  const path = pathname.toLowerCase();

  for (const service of services) {
    if (path.includes(service)) {
      return service === 'mold' ? 'mould' : service;
    }
  }

  return null;
}

/**
 * Calculate lead score based on context
 */
export function calculateLeadScore(data: {
  conversionType: string;
  urgencyLevel: string;
  serviceArea: string | null;
  serviceType: string | null;
  source: string;
}): number {
  let score = 50; // Base score

  // Conversion type scoring
  if (data.conversionType === 'emergency_call') score += 40;
  else if (data.conversionType === 'contact_form') score += 20;
  else if (data.conversionType === 'quote_request') score += 30;

  // Urgency scoring
  if (data.urgencyLevel === 'emergency') score += 30;
  else if (data.urgencyLevel === 'urgent') score += 20;

  // Service area scoring (Brisbane is highest priority)
  if (data.serviceArea === 'brisbane') score += 10;
  else if (data.serviceArea === 'ipswich') score += 8;
  else if (data.serviceArea === 'logan') score += 8;

  // Service type scoring (water and fire are highest value)
  if (data.serviceType === 'water' || data.serviceType === 'fire') score += 10;

  // Traffic source scoring
  if (data.source === 'google' || data.source === 'bing') score += 10;
  else if (data.source === 'direct') score += 5;

  return Math.min(100, score);
}

/**
 * Determine lead quality
 */
export function determineLeadQuality(leadScore: number): string {
  if (leadScore >= 80) return 'very_high';
  if (leadScore >= 65) return 'high';
  if (leadScore >= 50) return 'medium';
  if (leadScore >= 35) return 'low';
  return 'very_low';
}
