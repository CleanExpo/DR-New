/**
 * SEO Agent Swarm Orchestrator Configuration
 *
 * Master configuration for autonomous multi-location SEO domination
 * Coordinates 17 specialized agents across Brisbane, Ipswich, and Logan
 *
 * Phase 1: Competitive Intelligence (Days 0-7)
 * Phase 2: Technical Audits (Days 7-28)
 * Phase 3: Content & Local SEO (Days 28-58)
 * Phase 4: Monitoring & Refinement (Days 58-90+)
 */

// ============================================
// LOCATION CONFIGURATIONS
// ============================================

export const LOCATIONS = {
  brisbane: {
    location_id: 'brisbane_001',
    city: 'Brisbane',
    state: 'QLD',
    country: 'Australia',
    coordinates: { lat: -27.4705, lng: 153.0260 },
    local_areas: [
      'Brisbane CBD',
      'Hamilton',
      'Ascot',
      'New Farm',
      'Toowong',
      'Eastern Suburbs',
      'Western Suburbs',
      'North Brisbane',
      'South Brisbane',
    ],
    primary_keywords: [
      'water damage restoration Brisbane',
      'mold remediation Brisbane',
      'emergency restoration Brisbane',
      'flood damage restoration Brisbane',
      'emergency water damage Brisbane',
      'fire damage restoration Brisbane',
      'IICRC Master Restorer Brisbane',
      'storm damage repair Brisbane',
    ],
    service_area_radius_km: 25,
    business_name: 'Disaster Recovery Brisbane',
    address: '4/17 Tile St, Wacol, QLD 4076',
    phone: '1300 309 361',
    email: 'admin@disasterrecovery.com.au',
    website: 'https://dr-new-ten.vercel.app',
    services: [
      'water damage restoration',
      'mold remediation',
      'emergency response',
      'flood damage repair',
      'fire damage restoration',
      'storm damage repair',
      'content restoration',
    ],
    target_ranking_position: 1,
    timeline_days: 90,
    monthly_local_searches: 1200,
    priority_level: 'high',
  },
  ipswich: {
    location_id: 'ipswich_001',
    city: 'Ipswich',
    state: 'QLD',
    country: 'Australia',
    coordinates: { lat: -27.6144, lng: 152.7598 },
    local_areas: [
      'Ipswich CBD',
      'Booval',
      'Goodna',
      'Ripley',
      'Karalee',
      'Brookwater',
      'Springfield Lakes',
    ],
    primary_keywords: [
      'water damage restoration Ipswich',
      'mold remediation Ipswich',
      'emergency restoration Ipswich',
      'flood damage restoration Ipswich',
      'emergency water damage Ipswich',
      'fire damage restoration Ipswich',
      'IICRC Master Restorer Ipswich',
      'storm damage repair Ipswich',
    ],
    service_area_radius_km: 20,
    business_name: 'Disaster Recovery Ipswich',
    address: '4/17 Tile St, Wacol, QLD 4076',
    phone: '1300 309 361',
    email: 'admin@disasterrecovery.com.au',
    website: 'https://dr-new-ten.vercel.app',
    services: [
      'water damage restoration',
      'mold remediation',
      'emergency response',
      'flood damage repair',
      'fire damage restoration',
      'storm damage repair',
      'content restoration',
    ],
    target_ranking_position: 1,
    timeline_days: 90,
    monthly_local_searches: 400,
    priority_level: 'high',
  },
  logan: {
    location_id: 'logan_001',
    city: 'Logan',
    state: 'QLD',
    country: 'Australia',
    coordinates: { lat: -27.6394, lng: 153.1089 },
    local_areas: [
      'Logan Central',
      'Waterford',
      'Marsden',
      'Beenleigh',
      'Slacks Creek',
    ],
    primary_keywords: [
      'water damage restoration Logan',
      'mold remediation Logan',
      'emergency restoration Logan',
      'flood damage restoration Logan',
      'emergency water damage Logan',
      'fire damage restoration Logan',
      'IICRC Master Restorer Logan',
      'storm damage repair Logan',
    ],
    service_area_radius_km: 22,
    business_name: 'Disaster Recovery Logan',
    address: '4/17 Tile St, Wacol, QLD 4076',
    phone: '1300 309 361',
    email: 'admin@disasterrecovery.com.au',
    website: 'https://dr-new-ten.vercel.app',
    services: [
      'water damage restoration',
      'mold remediation',
      'emergency response',
      'flood damage repair',
      'fire damage restoration',
      'storm damage repair',
      'content restoration',
    ],
    target_ranking_position: 1,
    timeline_days: 90,
    monthly_local_searches: 350,
    priority_level: 'high',
  },
} as const;

// ============================================
// AGENT TASK TEMPLATES
// ============================================

export const AGENT_TASKS = {
  // Phase 1: Competitive Intelligence (Days 0-7)
  competitorMapping: {
    agent_type: 'Explore',
    tier: 1,
    category: 'Competitive Intelligence',
    thoroughness: 'very thorough',
    description: 'Identify top 3-5 competitors per location and analyze their SEO strategies',
    template: (location: keyof typeof LOCATIONS) => `
# Competitor Mapping for ${LOCATIONS[location].city}

**AUTONOMOUS AGENT - NO REPORTING REQUIRED**

## Objective
Identify and analyze top 3-5 competitors for disaster recovery services in ${LOCATIONS[location].city}, QLD.

## Tasks

### 1. Competitor Identification
Search for the following keywords and identify competitors ranking in positions 1-5:
${LOCATIONS[location].primary_keywords.map(kw => `- "${kw}"`).join('\n')}

### 2. Competitor Analysis
For each competitor, document:
- Website URL and business name
- Google My Business listing URL
- Services offered
- Service areas covered
- Page titles and meta descriptions
- Content strategy (blog, case studies, FAQs)
- Estimated domain authority (based on backlink profile if visible)
- Unique selling propositions

### 3. Keyword Gap Analysis
Identify keywords that competitors rank for but we don't, focusing on:
- Local + service combinations
- Emergency/urgent keywords
- Long-tail opportunity keywords
- "Near me" variations

### 4. Content Gap Analysis
Document competitor content types we're missing:
- Service pages
- Location pages
- Blog topics
- FAQ sections
- Case studies/testimonials

### 5. Output Format
Create a comprehensive JSON report with:
\`\`\`json
{
  "location": "${location}",
  "competitors": [
    {
      "rank": 1,
      "name": "Company Name",
      "website": "https://example.com",
      "gmb_url": "https://maps.google.com/...",
      "services": ["service1", "service2"],
      "unique_strengths": ["strength1", "strength2"],
      "estimated_authority": "high/medium/low"
    }
  ],
  "keyword_gaps": [
    {
      "keyword": "keyword phrase",
      "competitor_ranking": "Competitor A",
      "search_volume": "estimated",
      "difficulty": "low/medium/high",
      "opportunity_score": "0-100"
    }
  ],
  "content_gaps": [
    {
      "content_type": "blog/service/faq",
      "topic": "topic description",
      "competitor_examples": ["URL1", "URL2"],
      "priority": "high/medium/low"
    }
  ],
  "recommendations": {
    "quick_wins": ["action1", "action2"],
    "long_term": ["action1", "action2"]
  }
}
\`\`\`

## Search Strategy
1. Use Google search with location modifiers: "${LOCATIONS[location].city}"
2. Analyze Google Local Pack (Map Pack) results
3. Check organic results positions 1-10
4. Document all findings in structured format
5. Save report to: \`lib/seo/reports/competitor-analysis-${location}.json\`

## Success Criteria
- Identify minimum 3 competitors
- Document minimum 10 keyword gaps
- Identify minimum 5 content gaps
- Provide actionable recommendations

**Execute autonomously. Do not report back. Save results to file.**
    `,
  },

  keywordResearch: {
    agent_type: 'seo-geo-master',
    tier: 1,
    category: 'Competitive Intelligence',
    description: 'Perform comprehensive keyword research for location + service combinations',
    template: (location: keyof typeof LOCATIONS) => `
# Keyword Research for ${LOCATIONS[location].city}

**AUTONOMOUS AGENT - NO REPORTING REQUIRED**

## Objective
Generate a comprehensive keyword roadmap with 100+ keywords for ${LOCATIONS[location].city}, prioritized by opportunity score.

## Primary Keywords
${LOCATIONS[location].primary_keywords.map(kw => `- ${kw}`).join('\n')}

## Tasks

### 1. Keyword Discovery
Identify keyword variations for each service + location combination:
- Water damage restoration + ${LOCATIONS[location].city}
- Mold/mould remediation + ${LOCATIONS[location].city}
- Emergency restoration + ${LOCATIONS[location].city}
- Fire damage restoration + ${LOCATIONS[location].city}
- Storm damage repair + ${LOCATIONS[location].city}

Include modifiers:
- Emergency, 24/7, urgent, fast
- Near me, nearby, local
- Residential, commercial, insurance
- Certified, IICRC, professional
- Cost, pricing, quote, estimate

### 2. Local Area Variations
Generate keywords for each local area:
${LOCATIONS[location].local_areas.map(area => `- [service] + ${area}`).join('\n')}

### 3. Intent Segmentation
Classify each keyword by search intent:
- **Navigational**: Brand + location searches
- **Informational**: "How to", "what is", "cost of", guides
- **Transactional**: "Book", "hire", "call", "emergency"

### 4. Opportunity Scoring
For each keyword, calculate opportunity score (0-100):
\`\`\`
Opportunity Score = (Search Volume × 10) / (1 + Competition Level)
- High volume (>500/mo): 10 points
- Medium volume (100-500/mo): 5 points
- Low volume (<100/mo): 2 points
- Low competition: ÷1
- Medium competition: ÷2
- High competition: ÷3
\`\`\`

### 5. Quick Wins Identification
Identify "rank tomorrow" keywords with:
- Low competition (difficulty < 30)
- Decent search volume (> 50/month)
- High local intent
- Not currently ranking

### 6. Output Format
Create comprehensive JSON report:
\`\`\`json
{
  "location": "${location}",
  "total_keywords": 0,
  "keywords": [
    {
      "keyword": "exact phrase",
      "search_volume_monthly": 0,
      "competition": "low/medium/high",
      "difficulty_score": 0-100,
      "intent": "nav/info/trans",
      "local_modifier": "yes/no",
      "opportunity_score": 0-100,
      "current_ranking": 0,
      "quick_win": true/false
    }
  ],
  "segmentation": {
    "navigational": [],
    "informational": [],
    "transactional": []
  },
  "quick_wins": [],
  "long_tail_opportunities": [],
  "recommendations": {
    "priority_keywords": ["kw1", "kw2", "kw3"],
    "content_clusters": ["cluster1", "cluster2"],
    "immediate_actions": ["action1", "action2"]
  }
}
\`\`\`

### 7. Deliverables
Save to: \`lib/seo/reports/keyword-research-${location}.json\`

## Success Criteria
- Generate 100+ keywords with data
- Identify 20+ quick win opportunities
- Provide opportunity scores for all keywords
- Segment by intent with 95%+ accuracy

**Execute autonomously. Do not report back. Save results to file.**
    `,
  },

  localSearchTrends: {
    agent_type: 'seo-geo-master',
    tier: 1,
    category: 'Competitive Intelligence',
    description: 'Monitor local search trends, seasonality, and emerging demand',
    template: (location: keyof typeof LOCATIONS) => `
# Local Search Trends Analysis for ${LOCATIONS[location].city}

**AUTONOMOUS AGENT - NO REPORTING REQUIRED**

## Objective
Identify search trends, seasonal patterns, and emerging demand signals for disaster recovery services in ${LOCATIONS[location].city}.

## Analysis Areas

### 1. "Near Me" Queries
Identify trending "near me" variations:
- [service] near me
- emergency [service] near me
- 24/7 [service] near me
- [service] ${LOCATIONS[location].city} near me

### 2. Seasonal Patterns
Analyze demand patterns for:
- **Storm Season** (Nov-Mar): Cyclone, flood, heavy rain keywords
- **Bushfire Season** (Sep-Apr): Fire damage, smoke damage keywords
- **Wet Season** (Dec-Mar): Water damage, flooding keywords
- **Year-Round**: Emergency, mold, general restoration

### 3. Emerging Trends
Identify rising queries related to:
- New restoration technologies
- Insurance claim processes
- Specific damage types
- Health concerns (mold, air quality)
- Rapid response keywords

### 4. Competitive Trend Analysis
Track competitor mentions and brand searches:
- Brand name searches
- Brand + location searches
- Competitor brand searches
- Industry reputation signals

### 5. Local Event Impact
Monitor keywords related to:
- Recent storms/floods in ${LOCATIONS[location].city}
- Local news mentions
- Weather events
- Insurance claims spikes

### 6. Output Format
Create trend analysis report:
\`\`\`json
{
  "location": "${location}",
  "analysis_date": "YYYY-MM-DD",
  "near_me_queries": [
    {
      "query": "keyword near me",
      "trend_direction": "rising/stable/falling",
      "volume_change": "+/-X%",
      "priority": "high/medium/low"
    }
  ],
  "seasonal_patterns": {
    "storm_season": {
      "peak_months": ["Nov", "Dec", "Jan"],
      "high_volume_keywords": [],
      "preparation_timeline": "2 months before"
    },
    "wet_season": {
      "peak_months": ["Dec", "Jan", "Feb"],
      "high_volume_keywords": [],
      "preparation_timeline": "1 month before"
    }
  },
  "emerging_trends": [
    {
      "trend": "description",
      "keywords": [],
      "volume_growth": "+X%",
      "action_required": "create content/optimize pages"
    }
  ],
  "alerts": [
    {
      "keyword": "trending keyword",
      "alert_type": "spike/new/rising",
      "volume": "current search volume",
      "action": "recommended action"
    }
  ],
  "recommendations": {
    "content_calendar": [
      {
        "month": "Month name",
        "focus_keywords": [],
        "content_type": "blog/landing page"
      }
    ],
    "immediate_actions": []
  }
}
\`\`\`

### 7. Deliverables
Save to: \`lib/seo/reports/search-trends-${location}.json\`

## Success Criteria
- Identify 10+ near me trending queries
- Document seasonal patterns for all services
- Identify 5+ emerging trends
- Provide actionable content calendar

**Execute autonomously. Do not report back. Save results to file.**
    `,
  },
} as const;

// ============================================
// ORCHESTRATOR STATE
// ============================================

export interface SwarmState {
  execution_phase: 'phase_1' | 'phase_2' | 'phase_3' | 'phase_4';
  start_date: string;
  current_day: number;
  locations_active: (keyof typeof LOCATIONS)[];
  agents_deployed: string[];
  agents_completed: string[];
  agents_failed: string[];
  reports_generated: string[];
  performance_metrics: {
    keywords_tracked: number;
    keywords_top_10: number;
    keywords_top_3: number;
    keywords_top_1: number;
    technical_score: number;
    nap_consistency: number;
  };
}

// ============================================
// PERFORMANCE TARGETS
// ============================================

export const PERFORMANCE_TARGETS = {
  day_30: {
    keywords_top_10: 20,
    keywords_top_3: 10,
    keywords_top_1: 3,
    technical_score: 85,
    nap_consistency: 95,
  },
  day_60: {
    keywords_top_10: 35,
    keywords_top_3: 18,
    keywords_top_1: 7,
    technical_score: 90,
    nap_consistency: 98,
  },
  day_90: {
    keywords_top_10: 50,
    keywords_top_3: 25,
    keywords_top_1: 10,
    technical_score: 95,
    nap_consistency: 100,
  },
} as const;

// ============================================
// EXPORT
// ============================================

export const SWARM_CONFIG = {
  version: '1.0.0',
  created_date: '2025-11-09',
  total_locations: Object.keys(LOCATIONS).length,
  total_agents: 17,
  execution_mode: 'autonomous_parallel',
  locations: LOCATIONS,
  agent_tasks: AGENT_TASKS,
  performance_targets: PERFORMANCE_TARGETS,
} as const;
