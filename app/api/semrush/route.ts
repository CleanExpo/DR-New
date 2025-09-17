import { NextRequest, NextResponse } from 'next/server';

const SEMRUSH_API_KEY = process.env.SEMRUSH_API_KEY;
const SEMRUSH_BASE_URL = 'https://api.semrush.com';

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competitive_density: number;
  results: number;
  intent: string;
  position?: number;
}

interface DomainAnalytics {
  domain: string;
  organic_keywords: number;
  organic_traffic: number;
  organic_cost: number;
  adwords_keywords: number;
  adwords_traffic: number;
  adwords_cost: number;
}

interface CompetitorData {
  domain: string;
  common_keywords: number;
  se_keywords: number;
  se_traffic: number;
  competition_level: number;
}

class SEMRushAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, params: Record<string, string>) {
    const url = new URL(endpoint, SEMRUSH_BASE_URL);
    url.searchParams.set('key', this.apiKey);
    url.searchParams.set('export_columns', params.export_columns || '');

    Object.entries(params).forEach(([key, value]) => {
      if (key !== 'export_columns') {
        url.searchParams.set(key, value);
      }
    });

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`SEMRUSH API error: ${response.status}`);
      }
      const text = await response.text();
      return this.parseCSVResponse(text);
    } catch (error) {
      console.error('SEMRUSH API request failed:', error);
      throw error;
    }
  }

  private parseCSVResponse(csvText: string): any[] {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(';');
    return lines.slice(1).map(line => {
      const values = line.split(';');
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
  }

  async getKeywordResearch(keywords: string[]): Promise<KeywordData[]> {
    const results: KeywordData[] = [];

    for (const keyword of keywords) {
      try {
        const data = await this.makeRequest('/', {
          type: 'phrase_all',
          phrase: keyword,
          database: 'au',
          export_columns: 'Ph,Nq,Cp,Kd,Co,Nr,Td'
        });

        if (data.length > 0) {
          const row = data[0];
          results.push({
            keyword: keyword,
            volume: parseInt(row.Nq) || 0,
            difficulty: parseFloat(row.Kd) || 0,
            cpc: parseFloat(row.Cp) || 0,
            competitive_density: parseFloat(row.Co) || 0,
            results: parseInt(row.Nr) || 0,
            intent: this.determineSearchIntent(keyword)
          });
        }
      } catch (error) {
        console.error(`Error fetching data for keyword: ${keyword}`, error);
      }
    }

    return results;
  }

  async getDomainAnalytics(domain: string): Promise<DomainAnalytics | null> {
    try {
      const data = await this.makeRequest('/', {
        type: 'domain_overview',
        domain: domain,
        database: 'au',
        export_columns: 'Dn,Or,Ot,Oc,Ad,At,Ac'
      });

      if (data.length > 0) {
        const row = data[0];
        return {
          domain: domain,
          organic_keywords: parseInt(row.Or) || 0,
          organic_traffic: parseInt(row.Ot) || 0,
          organic_cost: parseFloat(row.Oc) || 0,
          adwords_keywords: parseInt(row.Ad) || 0,
          adwords_traffic: parseInt(row.At) || 0,
          adwords_cost: parseFloat(row.Ac) || 0
        };
      }
    } catch (error) {
      console.error(`Error fetching domain analytics for: ${domain}`, error);
    }

    return null;
  }

  async getCompetitorAnalysis(domain: string, competitors: string[]): Promise<CompetitorData[]> {
    const results: CompetitorData[] = [];

    for (const competitor of competitors) {
      try {
        const data = await this.makeRequest('/', {
          type: 'domain_vs_domain',
          domain: domain,
          domain2: competitor,
          database: 'au',
          export_columns: 'Dn,Cr,Or,Ot,Cl'
        });

        if (data.length > 0) {
          const row = data[0];
          results.push({
            domain: competitor,
            common_keywords: parseInt(row.Cr) || 0,
            se_keywords: parseInt(row.Or) || 0,
            se_traffic: parseInt(row.Ot) || 0,
            competition_level: parseFloat(row.Cl) || 0
          });
        }
      } catch (error) {
        console.error(`Error fetching competitor data for: ${competitor}`, error);
      }
    }

    return results;
  }

  async getBacklinkAudit(domain: string): Promise<any[]> {
    try {
      const data = await this.makeRequest('/', {
        type: 'backlinks',
        target: domain,
        target_type: 'root_domain',
        export_columns: 'source_url,target_url,anchor,external_links,internal_links,source_size,source_title,first_seen,last_seen'
      });

      return data.slice(0, 100); // Limit to first 100 backlinks
    } catch (error) {
      console.error(`Error fetching backlinks for: ${domain}`, error);
      return [];
    }
  }

  private determineSearchIntent(keyword: string): string {
    const transactionalWords = ['buy', 'price', 'cost', 'hire', 'service', 'emergency', 'call', 'contact'];
    const informationalWords = ['what', 'how', 'why', 'guide', 'tips', 'causes', 'prevent'];
    const commercialWords = ['best', 'top', 'review', 'compare', 'vs'];

    const lowerKeyword = keyword.toLowerCase();

    if (transactionalWords.some(word => lowerKeyword.includes(word))) {
      return 'Transactional';
    }
    if (informationalWords.some(word => lowerKeyword.includes(word))) {
      return 'Informational';
    }
    if (commercialWords.some(word => lowerKeyword.includes(word))) {
      return 'Commercial';
    }

    return 'Navigational';
  }
}

export async function GET(request: NextRequest) {
  if (!SEMRUSH_API_KEY) {
    return NextResponse.json(
      { error: 'SEMRUSH API key not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const domain = searchParams.get('domain');
  const keywords = searchParams.get('keywords')?.split(',') || [];
  const competitors = searchParams.get('competitors')?.split(',') || [];

  const semrush = new SEMRushAPI(SEMRUSH_API_KEY);

  try {
    switch (action) {
      case 'keyword_research':
        if (keywords.length === 0) {
          return NextResponse.json({ error: 'Keywords parameter required' }, { status: 400 });
        }
        const keywordData = await semrush.getKeywordResearch(keywords);
        return NextResponse.json({ keywords: keywordData });

      case 'domain_analytics':
        if (!domain) {
          return NextResponse.json({ error: 'Domain parameter required' }, { status: 400 });
        }
        const domainData = await semrush.getDomainAnalytics(domain);
        return NextResponse.json({ domain: domainData });

      case 'competitor_analysis':
        if (!domain || competitors.length === 0) {
          return NextResponse.json({
            error: 'Domain and competitors parameters required'
          }, { status: 400 });
        }
        const competitorData = await semrush.getCompetitorAnalysis(domain, competitors);
        return NextResponse.json({ competitors: competitorData });

      case 'backlink_audit':
        if (!domain) {
          return NextResponse.json({ error: 'Domain parameter required' }, { status: 400 });
        }
        const backlinkData = await semrush.getBacklinkAudit(domain);
        return NextResponse.json({ backlinks: backlinkData });

      case 'disaster_recovery_analysis':
        // Comprehensive analysis for disaster recovery keywords
        const drKeywords = [
          'disaster recovery brisbane',
          'water damage restoration brisbane',
          'fire damage restoration brisbane',
          'mould removal brisbane',
          'flood restoration brisbane',
          'emergency restoration brisbane',
          'water damage restoration ipswich',
          'fire damage restoration ipswich',
          'mould removal logan',
          'emergency restoration wacol',
          'biohazard cleaning brisbane',
          'storm damage restoration brisbane'
        ];

        const drCompetitors = [
          'steamatic.com.au',
          'servpro.com.au',
          'allstate.com.au',
          'waterdamagerestoration.com.au',
          'disasterrestorers.com.au'
        ];

        const [drKeywordAnalysis, drDomainAnalysis, drCompetitorAnalysis] = await Promise.all([
          semrush.getKeywordResearch(drKeywords),
          domain ? semrush.getDomainAnalytics(domain) : null,
          domain ? semrush.getCompetitorAnalysis(domain, drCompetitors) : []
        ]);

        return NextResponse.json({
          keyword_analysis: drKeywordAnalysis,
          domain_analysis: drDomainAnalysis,
          competitor_analysis: drCompetitorAnalysis
        });

      default:
        return NextResponse.json({
          error: 'Invalid action. Available actions: keyword_research, domain_analytics, competitor_analysis, backlink_audit, disaster_recovery_analysis'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('SEMRUSH API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEMRUSH data' },
      { status: 500 }
    );
  }
}

function generateSEORecommendations(keywordData: KeywordData[]): any {
  const highVolumeKeywords = keywordData.filter(k => k.volume > 500);
  const lowCompetitionKeywords = keywordData.filter(k => k.difficulty < 30);
  const transactionalKeywords = keywordData.filter(k => k.intent === 'Transactional');

  return {
    priority_keywords: highVolumeKeywords.slice(0, 5),
    quick_wins: lowCompetitionKeywords.slice(0, 5),
    conversion_focused: transactionalKeywords.slice(0, 5),
    content_strategy: {
      create_pages: [
        '/services/water-damage-restoration-brisbane',
        '/services/fire-damage-restoration-brisbane',
        '/locations/brisbane-cbd',
        '/locations/ipswich',
        '/locations/logan'
      ],
      optimize_for: highVolumeKeywords.map(k => k.keyword),
      content_clusters: [
        'Emergency Restoration Services',
        'Water Damage Solutions',
        'Fire & Smoke Damage',
        'Mould Prevention & Removal',
        'Insurance Claims Process'
      ]
    }
  };
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}