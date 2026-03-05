/**
 * Marketing Intelligence Types
 * Used by Synthex campaign creation engine and CARSI marketing system
 *
 * Disaster Recovery Pty Ltd | ABN: 85 151 794 142
 */

export type PersonaId =
  | 'insurance-loss-adjuster'
  | 'property-manager'
  | 'strata-manager'
  | 'homeowner-post-disaster'
  | 'facility-manager'
  | 'restoration-contractor'
  | 'carsi-training-candidate'

export type CampaignChannel =
  | 'linkedin-ads'
  | 'linkedin-organic'
  | 'google-search'
  | 'google-display'
  | 'facebook-ads'
  | 'facebook-groups'
  | 'email-nurture'
  | 'direct-mail'
  | 'industry-events'
  | 'trade-publications'
  | 'youtube'
  | 'podcast'
  | 'webinar'
  | 'sms'

export type ContentType =
  | 'case-study'
  | 'whitepaper'
  | 'checklist'
  | 'video-testimonial'
  | 'how-to-guide'
  | 'comparison-table'
  | 'roi-calculator'
  | 'compliance-guide'
  | 'cpd-module'
  | 'webinar'
  | 'email-sequence'
  | 'social-proof-post'
  | 'before-after'
  | 'stat-infographic'

export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Brand = 'disaster-recovery' | 'nrpg' | 'restore-assist' | 'carsi'
export type BuyingStage = 'unaware' | 'problem-aware' | 'solution-aware' | 'comparing' | 'ready-to-buy'

export interface Association {
  name: string
  acronym: string
  url: string
  relevance: string
  memberCount?: string
}

export interface OnlineCommunity {
  platform: 'linkedin' | 'facebook' | 'reddit' | 'slack' | 'discord' | 'forum'
  name: string
  url?: string
  memberCount?: string
  activity: 'very-high' | 'high' | 'medium' | 'low'
}

export interface Publication {
  name: string
  type: 'magazine' | 'newsletter' | 'website' | 'podcast' | 'journal'
  url?: string
  frequency?: string
  audience: string
}

export interface SearchIntent {
  query: string
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  volume: 'very-high' | 'high' | 'medium' | 'low'
  stage: BuyingStage
}

export interface PainPoint {
  id: string
  pain: string
  severity: Severity
  frequency: 'daily' | 'weekly' | 'monthly' | 'situational'
  currentWorkaround: string
  emotionalImpact: string
}

export interface CampaignHook {
  id: string
  headline: string
  subheadline: string
  angle: string
  cta: string
  channel: CampaignChannel[]
  brand: Brand
  stage: BuyingStage
  keyMessage: string
}

export interface DecisionMaker {
  id: PersonaId
  name: string
  description: string
  brands: Brand[]

  // Demographics & Role
  jobTitles: string[]
  industries: string[]
  companySizes: string[]
  seniority: 'C-suite' | 'Director' | 'Manager' | 'Senior' | 'Mid-level'
  annualRevenue?: string
  locationBias?: string[]

  // Psychographics
  goals: string[]
  painPoints: PainPoint[]
  buyingTriggers: string[]
  objections: string[]
  values: string[]

  // Behaviour
  searchIntents: SearchIntent[]
  contentPreferences: ContentType[]
  preferredChannels: CampaignChannel[]

  // Where they hang out
  associations: Association[]
  onlineCommunities: OnlineCommunity[]
  publications: Publication[]
  events: string[]

  // Campaign intelligence
  messagingFramework: {
    primaryHook: string
    supportingPoints: string[]
    socialProof: string
    urgencyTrigger: string
    trustSignals: string[]
  }
  campaignHooks: CampaignHook[]

  // Synthex metadata
  synthex: {
    segmentPriority: 1 | 2 | 3 | 4 | 5
    estimatedAudienceSize: string
    averageDealValue: string
    salesCycle: string
    cpaTarget: string
    keyQualifyingQuestions: string[]
    disqualifiers: string[]
    tags: string[]
  }
}

export interface DecisionMakerDatabase {
  version: string
  lastUpdated: string
  brand: string
  abn: string
  personas: DecisionMaker[]
}
