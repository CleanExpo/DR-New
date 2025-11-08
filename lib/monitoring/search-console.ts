/**
 * Google Search Console Integration
 * Track search performance and SEO metrics
 */

export interface SearchConsoleMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  page?: string;
  query?: string;
  date: string;
}

export interface SearchPerformance {
  totalClicks: number;
  totalImpressions: number;
  avgCTR: number;
  avgPosition: number;
  topQueries: Array<{ query: string; clicks: number; impressions: number; position: number }>;
  topPages: Array<{ page: string; clicks: number; impressions: number; position: number }>;
}

/**
 * Fetch Search Console data via API
 * Requires Google Search Console API credentials
 */
export async function fetchSearchConsoleData(
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<SearchPerformance | null> {
  try {
    const accessToken = await getSearchConsoleAccessToken();
    if (!accessToken) {
      console.warn('[Search Console] No access token available');
      return null;
    }

    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ['query', 'page'],
          rowLimit: 100,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Search Console API error: ${response.statusText}`);
    }

    const data = await response.json();
    return processSearchConsoleData(data);
  } catch (error) {
    console.error('[Search Console] Failed to fetch data:', error);
    return null;
  }
}

/**
 * Process Search Console API response
 */
function processSearchConsoleData(data: any): SearchPerformance {
  const rows = data.rows || [];

  let totalClicks = 0;
  let totalImpressions = 0;
  let totalPosition = 0;

  const queryMap = new Map<string, { clicks: number; impressions: number; position: number }>();
  const pageMap = new Map<string, { clicks: number; impressions: number; position: number }>();

  rows.forEach((row: any) => {
    const query = row.keys[0];
    const page = row.keys[1];
    const clicks = row.clicks || 0;
    const impressions = row.impressions || 0;
    const position = row.position || 0;

    totalClicks += clicks;
    totalImpressions += impressions;
    totalPosition += position;

    // Aggregate by query
    if (!queryMap.has(query)) {
      queryMap.set(query, { clicks: 0, impressions: 0, position: 0 });
    }
    const queryData = queryMap.get(query)!;
    queryData.clicks += clicks;
    queryData.impressions += impressions;
    queryData.position = Math.min(queryData.position || position, position);

    // Aggregate by page
    if (!pageMap.has(page)) {
      pageMap.set(page, { clicks: 0, impressions: 0, position: 0 });
    }
    const pageData = pageMap.get(page)!;
    pageData.clicks += clicks;
    pageData.impressions += impressions;
    pageData.position = Math.min(pageData.position || position, position);
  });

  const topQueries = Array.from(queryMap.entries())
    .map(([query, data]) => ({ query, ...data }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  const topPages = Array.from(pageMap.entries())
    .map(([page, data]) => ({ page, ...data }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  return {
    totalClicks,
    totalImpressions,
    avgCTR: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
    avgPosition: rows.length > 0 ? totalPosition / rows.length : 0,
    topQueries,
    topPages,
  };
}

/**
 * Get Search Console access token
 */
async function getSearchConsoleAccessToken(): Promise<string | null> {
  // Implement OAuth2 flow or use service account
  // This is a placeholder - implement based on your authentication method

  if (process.env.GOOGLE_SEARCH_CONSOLE_API_KEY) {
    return process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  }

  // For service account authentication:
  // const { JWT } = require('google-auth-library');
  // const client = new JWT({
  //   email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  //   key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  //   scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  // });
  // const tokens = await client.authorize();
  // return tokens.access_token;

  return null;
}

/**
 * Track SEO performance locally
 */
export class SEOPerformanceTracker {
  private metrics: Map<string, SearchConsoleMetrics[]> = new Map();

  recordMetric(metric: SearchConsoleMetrics): void {
    const key = metric.page || 'site-wide';

    if (!this.metrics.has(key)) {
      this.metrics.set(key, []);
    }

    this.metrics.get(key)!.push(metric);

    // Keep only last 30 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);

    this.metrics.set(
      key,
      this.metrics.get(key)!.filter(m => new Date(m.date) > cutoffDate)
    );
  }

  getMetrics(page?: string): SearchConsoleMetrics[] {
    if (page) {
      return this.metrics.get(page) || [];
    }

    // Return all metrics
    return Array.from(this.metrics.values()).flat();
  }

  getPerformanceSummary(page?: string): SearchPerformance | null {
    const metrics = this.getMetrics(page);

    if (metrics.length === 0) return null;

    const totalClicks = metrics.reduce((sum, m) => sum + m.clicks, 0);
    const totalImpressions = metrics.reduce((sum, m) => sum + m.impressions, 0);
    const avgCTR = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
    const avgPosition = metrics.reduce((sum, m) => sum + m.position, 0) / metrics.length;

    return {
      totalClicks,
      totalImpressions,
      avgCTR,
      avgPosition,
      topQueries: [],
      topPages: [],
    };
  }
}

/**
 * Initialize Search Console tracking
 */
export function initSearchConsole(siteUrl: string): void {
  console.log('[Search Console] Initializing for:', siteUrl);

  // Verify site ownership via meta tag (already in layout.tsx)
  const verificationMeta = document.querySelector('meta[name="google-site-verification"]');
  if (verificationMeta) {
    console.log('[Search Console] Site verification meta tag found');
  }

  // Track search impressions from organic search
  if (typeof window !== 'undefined' && document.referrer) {
    const referrer = new URL(document.referrer);
    if (isSearchEngine(referrer.hostname)) {
      const query = extractSearchQuery(referrer);
      if (query) {
        console.log('[Search Console] Organic search detected:', query);

        // Track in analytics
        if (window.gtag) {
          window.gtag('event', 'organic_search_landing', {
            search_engine: referrer.hostname,
            search_query: query,
            landing_page: window.location.pathname,
            event_category: 'SEO',
          });
        }
      }
    }
  }
}

/**
 * Check if hostname is a search engine
 */
function isSearchEngine(hostname: string): boolean {
  const searchEngines = [
    'google.com',
    'google.com.au',
    'bing.com',
    'yahoo.com',
    'duckduckgo.com',
    'baidu.com',
  ];

  return searchEngines.some(engine => hostname.includes(engine));
}

/**
 * Extract search query from referrer URL
 */
function extractSearchQuery(url: URL): string | null {
  // Google
  if (url.hostname.includes('google')) {
    return url.searchParams.get('q');
  }

  // Bing
  if (url.hostname.includes('bing')) {
    return url.searchParams.get('q');
  }

  // Yahoo
  if (url.hostname.includes('yahoo')) {
    return url.searchParams.get('p');
  }

  // DuckDuckGo
  if (url.hostname.includes('duckduckgo')) {
    return url.searchParams.get('q');
  }

  return null;
}

/**
 * Track page indexing status
 */
export async function checkIndexingStatus(url: string): Promise<{
  indexed: boolean;
  lastCrawled?: string;
  issues?: string[];
}> {
  try {
    // Use Google Search Console API to check indexing status
    const accessToken = await getSearchConsoleAccessToken();
    if (!accessToken) {
      return { indexed: false, issues: ['No API access'] };
    }

    const response = await fetch(
      `https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl: new URL(url).origin,
        }),
      }
    );

    const data = await response.json();

    return {
      indexed: data.inspectionResult?.indexStatusResult?.verdict === 'PASS',
      lastCrawled: data.inspectionResult?.indexStatusResult?.lastCrawlTime,
      issues: data.inspectionResult?.indexStatusResult?.coverageState === 'Submitted and indexed'
        ? []
        : ['Not indexed'],
    };
  } catch (error) {
    console.error('[Search Console] Failed to check indexing status:', error);
    return { indexed: false, issues: ['API error'] };
  }
}

// Export singleton tracker
export const seoTracker = new SEOPerformanceTracker();

