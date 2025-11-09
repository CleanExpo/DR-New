// SEO Monitoring Dashboard Utilities
// Track keyword rankings, Core Web Vitals, organic traffic, and conversion rates

export interface KeywordRanking {
  keyword: string;
  position: number;
  previousPosition: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  lastUpdated: string;
}

export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint (ms)
  fid: number; // First Input Delay (ms)
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint (ms)
  ttfb: number; // Time to First Byte (ms)
  timestamp: string;
  url: string;
}

export interface OrganicTrafficMetrics {
  date: string;
  sessions: number;
  users: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
  newUsers: number;
}

export interface ConversionMetrics {
  date: string;
  formSubmissions: number;
  phoneClicks: number;
  emailClicks: number;
  conversionRate: number;
  goalCompletions: number;
}

export const TARGET_KEYWORDS: KeywordRanking[] = [
  {
    keyword: 'water damage restoration Brisbane',
    position: 0,
    previousPosition: 0,
    searchVolume: 1200,
    difficulty: 45,
    url: '/services/water-damage',
    lastUpdated: new Date().toISOString()
  },
  {
    keyword: 'emergency restoration Brisbane',
    position: 0,
    previousPosition: 0,
    searchVolume: 800,
    difficulty: 42,
    url: '/services/emergency-response',
    lastUpdated: new Date().toISOString()
  },
  {
    keyword: 'IICRC master restorer Brisbane',
    position: 0,
    previousPosition: 0,
    searchVolume: 150,
    difficulty: 28,
    url: '/about-phil-mcgurk',
    lastUpdated: new Date().toISOString()
  },
  {
    keyword: 'fire damage restoration Brisbane',
    position: 0,
    previousPosition: 0,
    searchVolume: 650,
    difficulty: 48,
    url: '/services/fire-damage',
    lastUpdated: new Date().toISOString()
  },
  {
    keyword: 'mould removal Brisbane',
    position: 0,
    previousPosition: 0,
    searchVolume: 900,
    difficulty: 40,
    url: '/services/mould-remediation',
    lastUpdated: new Date().toISOString()
  },
  {
    keyword: 'water damage Hamilton Brisbane',
    position: 0,
    previousPosition: 0,
    searchVolume: 120,
    difficulty: 22,
    url: '/locations/hamilton',
    lastUpdated: new Date().toISOString()
  },
  {
    keyword: 'biohazard cleanup Brisbane',
    position: 0,
    previousPosition: 0,
    searchVolume: 200,
    difficulty: 35,
    url: '/services/biohazard-cleanup',
    lastUpdated: new Date().toISOString()
  },
  {
    keyword: '24/7 emergency water removal Brisbane',
    position: 0,
    previousPosition: 0,
    searchVolume: 450,
    difficulty: 38,
    url: '/emergency/water-damage-brisbane',
    lastUpdated: new Date().toISOString()
  }
];

export const CORE_WEB_VITALS_TARGETS = {
  lcp: {
    good: 2500,
    needsImprovement: 4000,
    poor: 4001
  },
  fid: {
    good: 100,
    needsImprovement: 300,
    poor: 301
  },
  cls: {
    good: 0.1,
    needsImprovement: 0.25,
    poor: 0.26
  },
  fcp: {
    good: 1800,
    needsImprovement: 3000,
    poor: 3001
  },
  ttfb: {
    good: 800,
    needsImprovement: 1800,
    poor: 1801
  }
};

// Evaluate Core Web Vitals status
export function evaluateCoreWebVitals(metrics: CoreWebVitals): {
  lcp: 'good' | 'needs-improvement' | 'poor';
  fid: 'good' | 'needs-improvement' | 'poor';
  cls: 'good' | 'needs-improvement' | 'poor';
  fcp: 'good' | 'needs-improvement' | 'poor';
  ttfb: 'good' | 'needs-improvement' | 'poor';
  overall: 'pass' | 'fail';
} {
  const lcpStatus = metrics.lcp <= CORE_WEB_VITALS_TARGETS.lcp.good
    ? 'good'
    : metrics.lcp <= CORE_WEB_VITALS_TARGETS.lcp.needsImprovement
    ? 'needs-improvement'
    : 'poor';

  const fidStatus = metrics.fid <= CORE_WEB_VITALS_TARGETS.fid.good
    ? 'good'
    : metrics.fid <= CORE_WEB_VITALS_TARGETS.fid.needsImprovement
    ? 'needs-improvement'
    : 'poor';

  const clsStatus = metrics.cls <= CORE_WEB_VITALS_TARGETS.cls.good
    ? 'good'
    : metrics.cls <= CORE_WEB_VITALS_TARGETS.cls.needsImprovement
    ? 'needs-improvement'
    : 'poor';

  const fcpStatus = metrics.fcp <= CORE_WEB_VITALS_TARGETS.fcp.good
    ? 'good'
    : metrics.fcp <= CORE_WEB_VITALS_TARGETS.fcp.needsImprovement
    ? 'needs-improvement'
    : 'poor';

  const ttfbStatus = metrics.ttfb <= CORE_WEB_VITALS_TARGETS.ttfb.good
    ? 'good'
    : metrics.ttfb <= CORE_WEB_VITALS_TARGETS.ttfb.needsImprovement
    ? 'needs-improvement'
    : 'poor';

  const overall = lcpStatus === 'good' && fidStatus === 'good' && clsStatus === 'good'
    ? 'pass'
    : 'fail';

  return {
    lcp: lcpStatus,
    fid: fidStatus,
    cls: clsStatus,
    fcp: fcpStatus,
    ttfb: ttfbStatus,
    overall
  };
}

// Calculate keyword ranking changes
export function calculateRankingChange(keywords: KeywordRanking[]): {
  improved: number;
  declined: number;
  unchanged: number;
} {
  const improved = keywords.filter(k => k.position < k.previousPosition && k.previousPosition > 0).length;
  const declined = keywords.filter(k => k.position > k.previousPosition && k.previousPosition > 0).length;
  const unchanged = keywords.filter(k => k.position === k.previousPosition).length;

  return { improved, declined, unchanged };
}

// Calculate traffic growth
export function calculateTrafficGrowth(current: OrganicTrafficMetrics, previous: OrganicTrafficMetrics): {
  sessionsGrowth: number;
  usersGrowth: number;
  pageviewsGrowth: number;
} {
  const sessionsGrowth = previous.sessions > 0
    ? ((current.sessions - previous.sessions) / previous.sessions) * 100
    : 0;

  const usersGrowth = previous.users > 0
    ? ((current.users - previous.users) / previous.users) * 100
    : 0;

  const pageviewsGrowth = previous.pageviews > 0
    ? ((current.pageviews - previous.pageviews) / previous.pageviews) * 100
    : 0;

  return {
    sessionsGrowth: Math.round(sessionsGrowth * 10) / 10,
    usersGrowth: Math.round(usersGrowth * 10) / 10,
    pageviewsGrowth: Math.round(pageviewsGrowth * 10) / 10
  };
}

// Get SEO health score (0-100)
export function calculateSEOHealthScore(data: {
  keywordRankings: KeywordRanking[];
  coreWebVitals: CoreWebVitals;
  trafficMetrics: OrganicTrafficMetrics;
  conversionMetrics: ConversionMetrics;
}): {
  score: number;
  breakdown: {
    rankings: number;
    performance: number;
    traffic: number;
    conversions: number;
  };
} {
  // Rankings score (0-25 points)
  const top3Keywords = data.keywordRankings.filter(k => k.position > 0 && k.position <= 3).length;
  const top10Keywords = data.keywordRankings.filter(k => k.position > 0 && k.position <= 10).length;
  const rankingsScore = Math.min(25, (top3Keywords * 5) + (top10Keywords * 2));

  // Performance score (0-25 points)
  const vitalsEval = evaluateCoreWebVitals(data.coreWebVitals);
  const performanceScore = vitalsEval.overall === 'pass' ? 25 : 15;

  // Traffic score (0-25 points)
  const trafficScore = Math.min(25, (data.trafficMetrics.sessions / 100));

  // Conversions score (0-25 points)
  const conversionScore = Math.min(25, data.conversionMetrics.conversionRate * 5);

  const totalScore = Math.round(rankingsScore + performanceScore + trafficScore + conversionScore);

  return {
    score: totalScore,
    breakdown: {
      rankings: Math.round(rankingsScore),
      performance: Math.round(performanceScore),
      traffic: Math.round(trafficScore),
      conversions: Math.round(conversionScore)
    }
  };
}

// Priority pages for monitoring (high-value, high-traffic)
export const PRIORITY_PAGES = [
  { url: '/', name: 'Homepage' },
  { url: '/services/water-damage', name: 'Water Damage Service' },
  { url: '/services/fire-damage', name: 'Fire Damage Service' },
  { url: '/services/mould-remediation', name: 'Mould Remediation Service' },
  { url: '/services/emergency-response', name: 'Emergency Response' },
  { url: '/locations/hamilton', name: 'Hamilton Location' },
  { url: '/locations/ascot', name: 'Ascot Location' },
  { url: '/contact', name: 'Contact Page' }
];

// Integration placeholders for third-party tools
// These functions would integrate with Google Analytics, Search Console, etc.

export async function fetchGoogleAnalyticsData(startDate: string, endDate: string): Promise<OrganicTrafficMetrics[]> {
  // Placeholder - would integrate with GA4 API
  console.log('Fetching GA data for', startDate, 'to', endDate);
  return [];
}

export async function fetchSearchConsoleData(startDate: string, endDate: string): Promise<KeywordRanking[]> {
  // Placeholder - would integrate with Search Console API
  console.log('Fetching Search Console data for', startDate, 'to', endDate);
  return [];
}

export async function fetchPageSpeedInsights(url: string): Promise<CoreWebVitals> {
  // Placeholder - would integrate with PageSpeed Insights API
  console.log('Fetching PageSpeed data for', url);
  return {
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    ttfb: 0,
    timestamp: new Date().toISOString(),
    url
  };
}
